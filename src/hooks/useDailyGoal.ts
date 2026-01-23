import { useState, useEffect, useCallback, useMemo } from 'react';

export interface DailyGoalData {
  topicsGoal: number;
  quizzesGoal: number;
  todayTopicsCompleted: number;
  todayQuizzesTaken: number;
  lastResetDate: string;
}

const STORAGE_KEY = 'dsa-daily-goal';

const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

const defaultGoalData: DailyGoalData = {
  topicsGoal: 3,
  quizzesGoal: 2,
  todayTopicsCompleted: 0,
  todayQuizzesTaken: 0,
  lastResetDate: getTodayDateString(),
};

const getInitialGoalData = (): DailyGoalData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: DailyGoalData = JSON.parse(stored);
      // Reset daily progress if it's a new day
      if (parsed.lastResetDate !== getTodayDateString()) {
        return {
          ...parsed,
          todayTopicsCompleted: 0,
          todayQuizzesTaken: 0,
          lastResetDate: getTodayDateString(),
        };
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error reading daily goal from localStorage:', error);
  }
  return defaultGoalData;
};

export const useDailyGoal = () => {
  const [goalData, setGoalData] = useState<DailyGoalData>(getInitialGoalData);

  // Sync to localStorage whenever goalData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goalData));
    } catch (error) {
      console.error('Error saving daily goal to localStorage:', error);
    }
  }, [goalData]);

  // Check and reset if new day on each render
  useEffect(() => {
    const today = getTodayDateString();
    if (goalData.lastResetDate !== today) {
      setGoalData((prev) => ({
        ...prev,
        todayTopicsCompleted: 0,
        todayQuizzesTaken: 0,
        lastResetDate: today,
      }));
    }
  }, [goalData.lastResetDate]);

  const setTopicsGoal = useCallback((goal: number) => {
    setGoalData((prev) => ({
      ...prev,
      topicsGoal: Math.max(1, Math.min(10, goal)),
    }));
  }, []);

  const setQuizzesGoal = useCallback((goal: number) => {
    setGoalData((prev) => ({
      ...prev,
      quizzesGoal: Math.max(1, Math.min(10, goal)),
    }));
  }, []);

  const incrementTopicsCompleted = useCallback(() => {
    setGoalData((prev) => ({
      ...prev,
      todayTopicsCompleted: prev.todayTopicsCompleted + 1,
      lastResetDate: getTodayDateString(),
    }));
  }, []);

  const incrementQuizzesTaken = useCallback(() => {
    setGoalData((prev) => ({
      ...prev,
      todayQuizzesTaken: prev.todayQuizzesTaken + 1,
      lastResetDate: getTodayDateString(),
    }));
  }, []);

  const topicsProgress = useMemo(() => {
    return Math.min(100, Math.round((goalData.todayTopicsCompleted / goalData.topicsGoal) * 100));
  }, [goalData.todayTopicsCompleted, goalData.topicsGoal]);

  const quizzesProgress = useMemo(() => {
    return Math.min(100, Math.round((goalData.todayQuizzesTaken / goalData.quizzesGoal) * 100));
  }, [goalData.todayQuizzesTaken, goalData.quizzesGoal]);

  const isTopicsGoalMet = useMemo(() => {
    return goalData.todayTopicsCompleted >= goalData.topicsGoal;
  }, [goalData.todayTopicsCompleted, goalData.topicsGoal]);

  const isQuizzesGoalMet = useMemo(() => {
    return goalData.todayQuizzesTaken >= goalData.quizzesGoal;
  }, [goalData.todayQuizzesTaken, goalData.quizzesGoal]);

  const isDailyGoalComplete = useMemo(() => {
    return isTopicsGoalMet && isQuizzesGoalMet;
  }, [isTopicsGoalMet, isQuizzesGoalMet]);

  return {
    goalData,
    setTopicsGoal,
    setQuizzesGoal,
    incrementTopicsCompleted,
    incrementQuizzesTaken,
    topicsProgress,
    quizzesProgress,
    isTopicsGoalMet,
    isQuizzesGoalMet,
    isDailyGoalComplete,
  };
};
