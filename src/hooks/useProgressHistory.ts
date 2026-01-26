import { useState, useEffect, useCallback } from 'react';

export interface ProgressEvent {
  id: string;
  type: 'topic_completed' | 'quiz_taken';
  topicId: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  score?: number;
  total?: number;
}

export interface ProgressHistoryData {
  events: ProgressEvent[];
  lastUpdated: string;
}

const STORAGE_KEY = 'dsa-progress-history';

const defaultData: ProgressHistoryData = {
  events: [],
  lastUpdated: new Date().toISOString(),
};

const getInitialData = (): ProgressHistoryData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading progress history from localStorage:', error);
  }
  return defaultData;
};

const getDateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

export const useProgressHistory = () => {
  const [data, setData] = useState<ProgressHistoryData>(getInitialData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress history to localStorage:', error);
    }
  }, [data]);

  const recordTopicCompleted = useCallback((topicId: string) => {
    const now = new Date();
    const event: ProgressEvent = {
      id: `tc-${now.getTime()}`,
      type: 'topic_completed',
      topicId,
      timestamp: now.toISOString(),
      date: getDateString(now),
    };

    setData((prev) => ({
      events: [...prev.events, event],
      lastUpdated: now.toISOString(),
    }));
  }, []);

  const recordQuizTaken = useCallback((topicId: string, score: number, total: number) => {
    const now = new Date();
    const event: ProgressEvent = {
      id: `qt-${now.getTime()}`,
      type: 'quiz_taken',
      topicId,
      timestamp: now.toISOString(),
      date: getDateString(now),
      score,
      total,
    };

    setData((prev) => ({
      events: [...prev.events, event],
      lastUpdated: now.toISOString(),
    }));
  }, []);

  const getTopicsCompletedByDate = useCallback((days: number = 30): { date: string; count: number }[] => {
    const today = new Date();
    const result: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      
      const count = data.events.filter(
        (e) => e.type === 'topic_completed' && e.date === dateStr
      ).length;
      
      result.push({ date: dateStr, count });
    }

    return result;
  }, [data.events]);

  const getQuizScoresByDate = useCallback((days: number = 30): { date: string; avgScore: number; count: number }[] => {
    const today = new Date();
    const result: { date: string; avgScore: number; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateString(date);
      
      const quizzes = data.events.filter(
        (e) => e.type === 'quiz_taken' && e.date === dateStr && e.score !== undefined && e.total !== undefined
      );
      
      const avgScore = quizzes.length > 0
        ? Math.round(quizzes.reduce((sum, q) => sum + ((q.score! / q.total!) * 100), 0) / quizzes.length)
        : 0;
      
      result.push({ date: dateStr, avgScore, count: quizzes.length });
    }

    return result;
  }, [data.events]);

  const getRecentQuizzes = useCallback((limit: number = 10): ProgressEvent[] => {
    return data.events
      .filter((e) => e.type === 'quiz_taken')
      .slice(-limit)
      .reverse();
  }, [data.events]);

  const getTotalTopicsCompletedThisWeek = useCallback((): number => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = getDateString(weekAgo);

    return data.events.filter(
      (e) => e.type === 'topic_completed' && e.date >= weekAgoStr
    ).length;
  }, [data.events]);

  const getTotalQuizzesTakenThisWeek = useCallback((): number => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = getDateString(weekAgo);

    return data.events.filter(
      (e) => e.type === 'quiz_taken' && e.date >= weekAgoStr
    ).length;
  }, [data.events]);

  const getWeeklyQuizComparison = useCallback((): { day: string; thisWeek: number; lastWeek: number }[] => {
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
      
      const thisWeekQuizzes = data.events.filter(
        (e) => e.type === 'quiz_taken' && e.date === thisWeekStr && e.score !== undefined && e.total !== undefined
      );
      const thisWeekAvg = thisWeekQuizzes.length > 0
        ? Math.round(thisWeekQuizzes.reduce((sum, q) => sum + ((q.score! / q.total!) * 100), 0) / thisWeekQuizzes.length)
        : 0;
      
      const lastWeekQuizzes = data.events.filter(
        (e) => e.type === 'quiz_taken' && e.date === lastWeekStr && e.score !== undefined && e.total !== undefined
      );
      const lastWeekAvg = lastWeekQuizzes.length > 0
        ? Math.round(lastWeekQuizzes.reduce((sum, q) => sum + ((q.score! / q.total!) * 100), 0) / lastWeekQuizzes.length)
        : 0;
      
      result.push({
        day: dayNames[thisWeekDate.getDay()],
        thisWeek: thisWeekAvg,
        lastWeek: lastWeekAvg,
      });
    }
    
    return result;
  }, [data.events]);

  return {
    data,
    events: data.events,
    recordTopicCompleted,
    recordQuizTaken,
    getTopicsCompletedByDate,
    getQuizScoresByDate,
    getRecentQuizzes,
    getTotalTopicsCompletedThisWeek,
    getTotalQuizzesTakenThisWeek,
    getWeeklyQuizComparison,
  };
};
