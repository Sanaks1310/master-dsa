import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStudyTime } from './useStudyTime';

export interface WeeklyStudyGoalData {
  weeklyMinutesGoal: number;
  lastNotifiedAt: string | null;
  goalMetNotified: boolean;
  weekStartDate: string; // Monday of current week
}

const STORAGE_KEY = 'dsa-weekly-study-goal';

const getWeekStartDate = (date: Date = new Date()): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
};

const defaultData: WeeklyStudyGoalData = {
  weeklyMinutesGoal: 120, // 2 hours default
  lastNotifiedAt: null,
  goalMetNotified: false,
  weekStartDate: getWeekStartDate(),
};

const getInitialData = (): WeeklyStudyGoalData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: WeeklyStudyGoalData = JSON.parse(stored);
      const currentWeekStart = getWeekStartDate();
      
      // Reset notification flags if it's a new week
      if (parsed.weekStartDate !== currentWeekStart) {
        return {
          ...parsed,
          goalMetNotified: false,
          lastNotifiedAt: null,
          weekStartDate: currentWeekStart,
        };
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error reading weekly study goal from localStorage:', error);
  }
  return defaultData;
};

export const useWeeklyStudyGoal = () => {
  const [data, setData] = useState<WeeklyStudyGoalData>(getInitialData);
  const { getWeekMinutes } = useStudyTime();
  
  const currentWeekMinutes = getWeekMinutes();

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving weekly study goal to localStorage:', error);
    }
  }, [data]);

  // Check for new week and reset flags
  useEffect(() => {
    const currentWeekStart = getWeekStartDate();
    if (data.weekStartDate !== currentWeekStart) {
      setData((prev) => ({
        ...prev,
        goalMetNotified: false,
        lastNotifiedAt: null,
        weekStartDate: currentWeekStart,
      }));
    }
  }, [data.weekStartDate]);

  const setWeeklyGoal = useCallback((minutes: number) => {
    setData((prev) => ({
      ...prev,
      weeklyMinutesGoal: Math.max(30, Math.min(600, minutes)), // 30 min to 10 hours
      goalMetNotified: false, // Reset when goal changes
    }));
  }, []);

  const markGoalNotified = useCallback(() => {
    setData((prev) => ({
      ...prev,
      goalMetNotified: true,
      lastNotifiedAt: new Date().toISOString(),
    }));
  }, []);

  const progress = useMemo(() => {
    return Math.min(100, Math.round((currentWeekMinutes / data.weeklyMinutesGoal) * 100));
  }, [currentWeekMinutes, data.weeklyMinutesGoal]);

  const isGoalMet = useMemo(() => {
    return currentWeekMinutes >= data.weeklyMinutesGoal;
  }, [currentWeekMinutes, data.weeklyMinutesGoal]);

  const remainingMinutes = useMemo(() => {
    return Math.max(0, data.weeklyMinutesGoal - currentWeekMinutes);
  }, [currentWeekMinutes, data.weeklyMinutesGoal]);

  const daysLeftInWeek = useMemo(() => {
    const today = new Date();
    const day = today.getDay();
    // Days until Sunday (end of week)
    return day === 0 ? 0 : 7 - day;
  }, []);

  const dailyTargetRemaining = useMemo(() => {
    if (daysLeftInWeek === 0 || remainingMinutes === 0) return 0;
    return Math.ceil(remainingMinutes / (daysLeftInWeek + 1)); // +1 to include today
  }, [remainingMinutes, daysLeftInWeek]);

  // Milestone notifications (25%, 50%, 75%, 100%)
  const getMilestone = useMemo(() => {
    if (progress >= 100) return 100;
    if (progress >= 75) return 75;
    if (progress >= 50) return 50;
    if (progress >= 25) return 25;
    return 0;
  }, [progress]);

  return {
    data,
    weeklyMinutesGoal: data.weeklyMinutesGoal,
    currentWeekMinutes,
    progress,
    isGoalMet,
    remainingMinutes,
    daysLeftInWeek,
    dailyTargetRemaining,
    getMilestone,
    goalMetNotified: data.goalMetNotified,
    setWeeklyGoal,
    markGoalNotified,
  };
};
