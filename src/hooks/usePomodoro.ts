import { useState, useEffect, useCallback, useRef } from 'react';
import { useStudyTime } from './useStudyTime';
import { useSoundEffects } from './useSoundEffects';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';
export type TimerState = 'idle' | 'running' | 'paused';

export interface PomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
}

export interface PomodoroData {
  settings: PomodoroSettings;
  totalPomodorosToday: number;
  totalPomodorosAllTime: number;
  lastResetDate: string;
}

const STORAGE_KEY = 'dsa-pomodoro';

const defaultSettings: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartWork: false,
};

const getDateString = () => new Date().toISOString().split('T')[0];

const getInitialData = (): PomodoroData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: PomodoroData = JSON.parse(stored);
      if (parsed.lastResetDate !== getDateString()) {
        return { ...parsed, totalPomodorosToday: 0, lastResetDate: getDateString() };
      }
      return parsed;
    }
  } catch {}
  return {
    settings: defaultSettings,
    totalPomodorosToday: 0,
    totalPomodorosAllTime: 0,
    lastResetDate: getDateString(),
  };
};

export const usePomodoro = (topicId?: string) => {
  const [data, setData] = useState<PomodoroData>(getInitialData);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [secondsLeft, setSecondsLeft] = useState(data.settings.workMinutes * 60);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { startSession, endSession } = useStudyTime(topicId);
  const { playSound } = useSoundEffects();
  const studySessionActiveRef = useRef(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Get total seconds for current mode
  const getTotalSeconds = useCallback((m: TimerMode) => {
    switch (m) {
      case 'work': return data.settings.workMinutes * 60;
      case 'shortBreak': return data.settings.shortBreakMinutes * 60;
      case 'longBreak': return data.settings.longBreakMinutes * 60;
    }
  }, [data.settings]);

  const progress = ((getTotalSeconds(mode) - secondsLeft) / getTotalSeconds(mode)) * 100;

  // Timer countdown
  useEffect(() => {
    if (timerState !== 'running') return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerState]);

  // Handle timer completion
  useEffect(() => {
    if (secondsLeft !== 0 || timerState !== 'running') return;

    setTimerState('idle');

    if (mode === 'work') {
      // End study session tracking
      if (studySessionActiveRef.current) {
        endSession();
        studySessionActiveRef.current = false;
      }

      const newCompleted = completedSessions + 1;
      setCompletedSessions(newCompleted);
      setData(prev => ({
        ...prev,
        totalPomodorosToday: prev.totalPomodorosToday + 1,
        totalPomodorosAllTime: prev.totalPomodorosAllTime + 1,
      }));

      // Determine next break type
      const isLongBreak = newCompleted % data.settings.sessionsBeforeLongBreak === 0;
      const nextMode = isLongBreak ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setSecondsLeft(getTotalSeconds(nextMode));

      if (data.settings.autoStartBreaks) {
        setTimerState('running');
      }

      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🍅 Pomodoro Complete!', {
          body: `Great work! Time for a ${isLongBreak ? 'long' : 'short'} break.`,
          icon: '/favicon.ico',
        });
      }
    } else {
      // Break ended
      setMode('work');
      setSecondsLeft(getTotalSeconds('work'));

      if (data.settings.autoStartWork) {
        setTimerState('running');
        startSession();
        studySessionActiveRef.current = true;
      }

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('⏰ Break Over!', {
          body: 'Ready to get back to studying?',
          icon: '/favicon.ico',
        });
      }
    }
  }, [secondsLeft, timerState, mode, completedSessions, data.settings, getTotalSeconds, startSession, endSession]);

  const start = useCallback(() => {
    if (timerState === 'idle') {
      setSecondsLeft(prev => prev > 0 ? prev : getTotalSeconds(mode));
    }
    setTimerState('running');

    if (mode === 'work' && !studySessionActiveRef.current) {
      startSession();
      studySessionActiveRef.current = true;
    }
  }, [timerState, mode, getTotalSeconds, startSession]);

  const pause = useCallback(() => {
    setTimerState('paused');
    if (studySessionActiveRef.current) {
      endSession();
      studySessionActiveRef.current = false;
    }
  }, [endSession]);

  const reset = useCallback(() => {
    setTimerState('idle');
    setSecondsLeft(getTotalSeconds(mode));
    if (studySessionActiveRef.current) {
      endSession();
      studySessionActiveRef.current = false;
    }
  }, [mode, getTotalSeconds, endSession]);

  const skipToNext = useCallback(() => {
    if (studySessionActiveRef.current) {
      endSession();
      studySessionActiveRef.current = false;
    }
    setTimerState('idle');
    if (mode === 'work') {
      const isLongBreak = (completedSessions + 1) % data.settings.sessionsBeforeLongBreak === 0;
      const nextMode = isLongBreak ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setSecondsLeft(getTotalSeconds(nextMode));
    } else {
      setMode('work');
      setSecondsLeft(getTotalSeconds('work'));
    }
  }, [mode, completedSessions, data.settings.sessionsBeforeLongBreak, getTotalSeconds, endSession]);

  const switchMode = useCallback((newMode: TimerMode) => {
    if (studySessionActiveRef.current) {
      endSession();
      studySessionActiveRef.current = false;
    }
    setTimerState('idle');
    setMode(newMode);
    setSecondsLeft(getTotalSeconds(newMode));
  }, [getTotalSeconds, endSession]);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setData(prev => {
      const updated = { ...prev, settings: { ...prev.settings, ...newSettings } };
      return updated;
    });
    // Reset timer with new settings if idle
    if (timerState === 'idle') {
      const merged = { ...data.settings, ...newSettings };
      switch (mode) {
        case 'work': setSecondsLeft(merged.workMinutes * 60); break;
        case 'shortBreak': setSecondsLeft(merged.shortBreakMinutes * 60); break;
        case 'longBreak': setSecondsLeft(merged.longBreakMinutes * 60); break;
      }
    }
  }, [timerState, mode, data.settings]);

  return {
    mode,
    timerState,
    secondsLeft,
    progress,
    completedSessions,
    totalPomodorosToday: data.totalPomodorosToday,
    totalPomodorosAllTime: data.totalPomodorosAllTime,
    settings: data.settings,
    start,
    pause,
    reset,
    skipToNext,
    switchMode,
    updateSettings,
  };
};
