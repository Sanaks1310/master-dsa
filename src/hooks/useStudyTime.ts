import { useState, useEffect, useCallback, useRef } from 'react';

export interface StudySession {
  id: string;
  startTime: string;
  endTime: string | null;
  durationMinutes: number;
  topicId?: string;
  date: string; // YYYY-MM-DD format
}

export interface StudyTimeData {
  sessions: StudySession[];
  totalMinutes: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'dsa-study-time';
const CURRENT_SESSION_KEY = 'dsa-current-session';

const defaultData: StudyTimeData = {
  sessions: [],
  totalMinutes: 0,
  lastUpdated: new Date().toISOString(),
};

const getInitialData = (): StudyTimeData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading study time from localStorage:', error);
  }
  return defaultData;
};

const getDateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

export const useStudyTime = (topicId?: string) => {
  const [data, setData] = useState<StudyTimeData>(getInitialData);
  const sessionStartRef = useRef<Date | null>(null);
  const currentSessionIdRef = useRef<string | null>(null);

  // Load any existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(CURRENT_SESSION_KEY);
    if (storedSession) {
      try {
        const { startTime, sessionId } = JSON.parse(storedSession);
        sessionStartRef.current = new Date(startTime);
        currentSessionIdRef.current = sessionId;
      } catch {
        localStorage.removeItem(CURRENT_SESSION_KEY);
      }
    }
  }, []);

  // Sync to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving study time to localStorage:', error);
    }
  }, [data]);

  const startSession = useCallback(() => {
    if (sessionStartRef.current) return; // Already have an active session
    
    const now = new Date();
    const sessionId = `session-${now.getTime()}`;
    sessionStartRef.current = now;
    currentSessionIdRef.current = sessionId;
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify({
      startTime: now.toISOString(),
      sessionId,
      topicId,
    }));
  }, [topicId]);

  const endSession = useCallback(() => {
    if (!sessionStartRef.current || !currentSessionIdRef.current) return;

    const now = new Date();
    const durationMs = now.getTime() - sessionStartRef.current.getTime();
    const durationMinutes = Math.round(durationMs / 60000);

    // Only record sessions longer than 30 seconds
    if (durationMinutes >= 1 || durationMs >= 30000) {
      const session: StudySession = {
        id: currentSessionIdRef.current,
        startTime: sessionStartRef.current.toISOString(),
        endTime: now.toISOString(),
        durationMinutes: Math.max(1, durationMinutes),
        topicId,
        date: getDateString(sessionStartRef.current),
      };

      setData((prev) => ({
        sessions: [...prev.sessions, session],
        totalMinutes: prev.totalMinutes + session.durationMinutes,
        lastUpdated: now.toISOString(),
      }));
    }

    sessionStartRef.current = null;
    currentSessionIdRef.current = null;
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }, [topicId]);

  // Auto-start session on mount, end on unmount
  useEffect(() => {
    startSession();
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        endSession();
      } else {
        startSession();
      }
    };

    const handleBeforeUnload = () => {
      endSession();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      endSession();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [startSession, endSession]);

  const getTimeByDate = useCallback((days: number = 30): { date: string; minutes: number }[] => {
    const today = new Date();
    const result: { date: string; minutes: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      
      const minutesForDay = data.sessions
        .filter((s) => s.date === dateStr)
        .reduce((sum, s) => sum + s.durationMinutes, 0);
      
      result.push({ date: dateStr, minutes: minutesForDay });
    }

    return result;
  }, [data.sessions]);

  const getTodayMinutes = useCallback((): number => {
    const today = getDateString();
    return data.sessions
      .filter((s) => s.date === today)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
  }, [data.sessions]);

  const getWeekMinutes = useCallback((): number => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return data.sessions
      .filter((s) => new Date(s.date) >= weekAgo)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
  }, [data.sessions]);

  const getLastWeekMinutes = useCallback((): number => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    return data.sessions
      .filter((s) => {
        const sessionDate = new Date(s.date);
        return sessionDate >= twoWeeksAgo && sessionDate < weekAgo;
      })
      .reduce((sum, s) => sum + s.durationMinutes, 0);
  }, [data.sessions]);

  const getWeeklyComparison = useCallback((): { day: string; thisWeek: number; lastWeek: number }[] => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result: { day: string; thisWeek: number; lastWeek: number }[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const thisWeekDate = new Date(today);
      thisWeekDate.setDate(thisWeekDate.getDate() - i);
      const thisWeekStr = getDateString(thisWeekDate);
      
      const lastWeekDate = new Date(today);
      lastWeekDate.setDate(lastWeekDate.getDate() - i - 7);
      const lastWeekStr = getDateString(lastWeekDate);
      
      const thisWeekMinutes = data.sessions
        .filter((s) => s.date === thisWeekStr)
        .reduce((sum, s) => sum + s.durationMinutes, 0);
      
      const lastWeekMinutes = data.sessions
        .filter((s) => s.date === lastWeekStr)
        .reduce((sum, s) => sum + s.durationMinutes, 0);
      
      result.push({
        day: dayNames[thisWeekDate.getDay()],
        thisWeek: thisWeekMinutes,
        lastWeek: lastWeekMinutes,
      });
    }
    
    return result;
  }, [data.sessions]);

  const getAverageSessionLength = useCallback((): number => {
    if (data.sessions.length === 0) return 0;
    return Math.round(data.totalMinutes / data.sessions.length);
  }, [data.sessions.length, data.totalMinutes]);

  return {
    data,
    sessions: data.sessions,
    totalMinutes: data.totalMinutes,
    startSession,
    endSession,
    getTimeByDate,
    getTodayMinutes,
    getWeekMinutes,
    getLastWeekMinutes,
    getWeeklyComparison,
    getAverageSessionLength,
  };
};
