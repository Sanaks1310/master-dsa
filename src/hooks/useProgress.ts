import { useState, useEffect, useCallback } from 'react';

export interface TopicProgress {
  completed: boolean;
  quizScore: number | null;
  quizTotal: number | null;
  lastAttempt: string | null;
  bestScore: number | null;
}

export interface UserProgress {
  topics: Record<string, TopicProgress>;
  totalQuizzesTaken: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'dsa-user-progress';

const defaultProgress: UserProgress = {
  topics: {},
  totalQuizzesTaken: 0,
  lastUpdated: new Date().toISOString(),
};

const getInitialProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
  }
  return defaultProgress;
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  // Sync to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }, [progress]);

  const markTopicCompleted = useCallback((topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicId]: {
          ...prev.topics[topicId],
          completed: true,
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const saveQuizScore = useCallback((topicId: string, score: number, total: number) => {
    setProgress((prev) => {
      const existingTopic = prev.topics[topicId];
      const currentBest = existingTopic?.bestScore ?? 0;
      const newBest = Math.max(currentBest, score);

      return {
        ...prev,
        topics: {
          ...prev.topics,
          [topicId]: {
            completed: existingTopic?.completed ?? false,
            quizScore: score,
            quizTotal: total,
            lastAttempt: new Date().toISOString(),
            bestScore: newBest,
          },
        },
        totalQuizzesTaken: prev.totalQuizzesTaken + 1,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const getTopicProgress = useCallback((topicId: string): TopicProgress | null => {
    return progress.topics[topicId] ?? null;
  }, [progress.topics]);

  const getCompletedTopicsCount = useCallback((): number => {
    return Object.values(progress.topics).filter((t) => t.completed).length;
  }, [progress.topics]);

  const getQuizzesTakenCount = useCallback((): number => {
    return Object.values(progress.topics).filter((t) => t.quizScore !== null).length;
  }, [progress.topics]);

  const getAverageScore = useCallback((): number => {
    const topicsWithScores = Object.values(progress.topics).filter(
      (t) => t.bestScore !== null && t.quizTotal !== null
    );
    if (topicsWithScores.length === 0) return 0;
    
    const totalPercentage = topicsWithScores.reduce((acc, t) => {
      return acc + ((t.bestScore! / t.quizTotal!) * 100);
    }, 0);
    
    return Math.round(totalPercentage / topicsWithScores.length);
  }, [progress.topics]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return {
    progress,
    markTopicCompleted,
    saveQuizScore,
    getTopicProgress,
    getCompletedTopicsCount,
    getQuizzesTakenCount,
    getAverageScore,
    resetProgress,
  };
};
