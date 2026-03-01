import { useState, useEffect, useCallback, useRef } from 'react';
import { useStudyTime } from './useStudyTime';
import { useWeeklyStudyGoal } from './useWeeklyStudyGoal';

interface ReminderSettings {
  enabled: boolean;
  inactivityHours: number; // hours without study before reminder
  behindGoalEnabled: boolean;
  lastReminderAt: string | null;
  lastStudyDate: string | null;
}

const STORAGE_KEY = 'dsa-study-reminders';
const CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour

const defaultSettings: ReminderSettings = {
  enabled: false,
  inactivityHours: 24,
  behindGoalEnabled: true,
  lastReminderAt: null,
  lastStudyDate: null,
};

const getInitialSettings = (): ReminderSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultSettings;
};

const getDateString = (date: Date = new Date()): string => date.toISOString().split('T')[0];

export const useStudyReminders = () => {
  const [settings, setSettings] = useState<ReminderSettings>(getInitialSettings);
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { getTodayMinutes, data: studyData } = useStudyTime();
  const { progress, daysLeftInWeek, dailyTargetRemaining, isGoalMet, weeklyMinutesGoal } = useWeeklyStudyGoal();

  // Check notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setPermissionState(Notification.permission);
    }
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Track last study date
  useEffect(() => {
    const todayMinutes = getTodayMinutes();
    if (todayMinutes > 0) {
      const today = getDateString();
      if (settings.lastStudyDate !== today) {
        setSettings(prev => ({ ...prev, lastStudyDate: today }));
      }
    }
  }, [getTodayMinutes, settings.lastStudyDate]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') {
      setPermissionState('granted');
      return true;
    }
    const result = await Notification.requestPermission();
    setPermissionState(result);
    return result === 'granted';
  }, []);

  const sendNotification = useCallback((title: string, body: string, icon?: string) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try {
      new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        badge: '/favicon.ico',
      });
      setSettings(prev => ({ ...prev, lastReminderAt: new Date().toISOString() }));
    } catch {}
  }, []);

  const checkAndNotify = useCallback(() => {
    if (!settings.enabled || Notification.permission !== 'granted') return;

    const now = new Date();
    // Don't send more than one notification per 4 hours
    if (settings.lastReminderAt) {
      const lastReminder = new Date(settings.lastReminderAt);
      if (now.getTime() - lastReminder.getTime() < 4 * 60 * 60 * 1000) return;
    }

    // Check inactivity
    if (settings.lastStudyDate) {
      const lastStudy = new Date(settings.lastStudyDate);
      const hoursSinceStudy = (now.getTime() - lastStudy.getTime()) / (1000 * 60 * 60);
      if (hoursSinceStudy >= settings.inactivityHours) {
        sendNotification(
          '📚 Time to Study!',
          `You haven't studied in ${Math.floor(hoursSinceStudy)} hours. Keep your streak alive!`
        );
        return;
      }
    } else if (getTodayMinutes() === 0) {
      // Never studied
      sendNotification(
        '🚀 Start Your Learning Journey!',
        'Open DSA Master and begin your first study session today!'
      );
      return;
    }

    // Check behind on weekly goal
    if (settings.behindGoalEnabled && !isGoalMet && daysLeftInWeek <= 2 && progress < 70) {
      sendNotification(
        '⏰ Weekly Goal Alert',
        `You're at ${progress}% of your weekly goal with ${daysLeftInWeek + 1} days left. Study ${dailyTargetRemaining}min/day to catch up!`
      );
    }
  }, [settings, sendNotification, getTodayMinutes, isGoalMet, daysLeftInWeek, progress, dailyTargetRemaining]);

  // Set up periodic check
  useEffect(() => {
    if (settings.enabled) {
      checkAndNotify();
      intervalRef.current = setInterval(checkAndNotify, CHECK_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [settings.enabled, checkAndNotify]);

  const toggleEnabled = useCallback(async () => {
    if (!settings.enabled) {
      const granted = await requestPermission();
      if (granted) {
        setSettings(prev => ({ ...prev, enabled: true }));
        return true;
      }
      return false;
    }
    setSettings(prev => ({ ...prev, enabled: false }));
    return true;
  }, [settings.enabled, requestPermission]);

  const setInactivityHours = useCallback((hours: number) => {
    setSettings(prev => ({ ...prev, inactivityHours: Math.max(1, Math.min(72, hours)) }));
  }, []);

  const toggleBehindGoal = useCallback(() => {
    setSettings(prev => ({ ...prev, behindGoalEnabled: !prev.behindGoalEnabled }));
  }, []);

  return {
    settings,
    permissionState,
    toggleEnabled,
    setInactivityHours,
    toggleBehindGoal,
    sendTestNotification: () => sendNotification('🔔 Test Notification', 'Study reminders are working!'),
  };
};
