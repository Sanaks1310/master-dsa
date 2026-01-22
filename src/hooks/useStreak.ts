import { useState, useEffect, useCallback } from 'react';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: string | null;
  totalDaysActive: number;
}

const STORAGE_KEY = 'dsa-study-streak';

const getInitialStreak = (): StreakData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading streak from localStorage:', error);
  }
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastVisitDate: null,
    totalDaysActive: 0,
  };
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isConsecutiveDay = (lastDate: Date, currentDate: Date): boolean => {
  const diffTime = currentDate.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

export const useStreak = () => {
  const [streak, setStreak] = useState<StreakData>(getInitialStreak);

  useEffect(() => {
    const today = new Date();
    const lastVisit = streak.lastVisitDate ? new Date(streak.lastVisitDate) : null;

    if (!lastVisit) {
      // First visit ever
      const newStreak: StreakData = {
        currentStreak: 1,
        longestStreak: 1,
        lastVisitDate: today.toISOString(),
        totalDaysActive: 1,
      };
      setStreak(newStreak);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStreak));
    } else if (isSameDay(lastVisit, today)) {
      // Already visited today, do nothing
    } else if (isConsecutiveDay(lastVisit, today)) {
      // Consecutive day - increase streak
      const newCurrentStreak = streak.currentStreak + 1;
      const newStreak: StreakData = {
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(streak.longestStreak, newCurrentStreak),
        lastVisitDate: today.toISOString(),
        totalDaysActive: streak.totalDaysActive + 1,
      };
      setStreak(newStreak);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStreak));
    } else {
      // Streak broken - reset to 1
      const newStreak: StreakData = {
        currentStreak: 1,
        longestStreak: streak.longestStreak,
        lastVisitDate: today.toISOString(),
        totalDaysActive: streak.totalDaysActive + 1,
      };
      setStreak(newStreak);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStreak));
    }
  }, []);

  const resetStreak = useCallback(() => {
    const defaultStreak: StreakData = {
      currentStreak: 0,
      longestStreak: 0,
      lastVisitDate: null,
      totalDaysActive: 0,
    };
    setStreak(defaultStreak);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStreak));
  }, []);

  return { streak, resetStreak };
};
