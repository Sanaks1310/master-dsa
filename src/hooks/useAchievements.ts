import { useMemo } from 'react';
import { useProgress } from './useProgress';
import { useStreak } from './useStreak';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'topics' | 'streak' | 'quizzes';
  requirement: number;
  isUnlocked: boolean;
  progress: number;
}

export const useAchievements = () => {
  const { getCompletedTopicsCount, getQuizzesTakenCount, getAverageScore } = useProgress();
  const { streak } = useStreak();

  const completedTopics = getCompletedTopicsCount();
  const quizzesTaken = getQuizzesTakenCount();
  const averageScore = getAverageScore();
  const currentStreak = streak.currentStreak;
  const longestStreak = streak.longestStreak;

  const achievements = useMemo((): Achievement[] => {
    return [
      // Topic completion achievements
      {
        id: 'first-step',
        title: 'First Step',
        description: 'Complete your first topic',
        icon: '🎯',
        category: 'topics',
        requirement: 1,
        isUnlocked: completedTopics >= 1,
        progress: Math.min(completedTopics, 1),
      },
      {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Complete 5 topics',
        icon: '📚',
        category: 'topics',
        requirement: 5,
        isUnlocked: completedTopics >= 5,
        progress: Math.min(completedTopics, 5),
      },
      {
        id: 'dedicated-learner',
        title: 'Dedicated Learner',
        description: 'Complete 10 topics',
        icon: '🌟',
        category: 'topics',
        requirement: 10,
        isUnlocked: completedTopics >= 10,
        progress: Math.min(completedTopics, 10),
      },
      {
        id: 'topic-master',
        title: 'Topic Master',
        description: 'Complete 25 topics',
        icon: '🏆',
        category: 'topics',
        requirement: 25,
        isUnlocked: completedTopics >= 25,
        progress: Math.min(completedTopics, 25),
      },
      {
        id: 'dsa-expert',
        title: 'DSA Expert',
        description: 'Complete 50 topics',
        icon: '👑',
        category: 'topics',
        requirement: 50,
        isUnlocked: completedTopics >= 50,
        progress: Math.min(completedTopics, 50),
      },
      // Streak achievements
      {
        id: 'streak-starter',
        title: 'Streak Starter',
        description: 'Reach a 3-day streak',
        icon: '🔥',
        category: 'streak',
        requirement: 3,
        isUnlocked: longestStreak >= 3,
        progress: Math.min(longestStreak, 3),
      },
      {
        id: 'week-warrior',
        title: 'Week Warrior',
        description: 'Reach a 7-day streak',
        icon: '⚡',
        category: 'streak',
        requirement: 7,
        isUnlocked: longestStreak >= 7,
        progress: Math.min(longestStreak, 7),
      },
      {
        id: 'two-week-titan',
        title: 'Two Week Titan',
        description: 'Reach a 14-day streak',
        icon: '💪',
        category: 'streak',
        requirement: 14,
        isUnlocked: longestStreak >= 14,
        progress: Math.min(longestStreak, 14),
      },
      {
        id: 'month-master',
        title: 'Month Master',
        description: 'Reach a 30-day streak',
        icon: '🌙',
        category: 'streak',
        requirement: 30,
        isUnlocked: longestStreak >= 30,
        progress: Math.min(longestStreak, 30),
      },
      // Quiz achievements
      {
        id: 'quiz-taker',
        title: 'Quiz Taker',
        description: 'Complete your first quiz',
        icon: '✍️',
        category: 'quizzes',
        requirement: 1,
        isUnlocked: quizzesTaken >= 1,
        progress: Math.min(quizzesTaken, 1),
      },
      {
        id: 'quiz-enthusiast',
        title: 'Quiz Enthusiast',
        description: 'Complete 10 quizzes',
        icon: '🧠',
        category: 'quizzes',
        requirement: 10,
        isUnlocked: quizzesTaken >= 10,
        progress: Math.min(quizzesTaken, 10),
      },
      {
        id: 'quiz-champion',
        title: 'Quiz Champion',
        description: 'Complete 25 quizzes',
        icon: '🎓',
        category: 'quizzes',
        requirement: 25,
        isUnlocked: quizzesTaken >= 25,
        progress: Math.min(quizzesTaken, 25),
      },
      {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Achieve 90%+ average quiz score',
        icon: '💯',
        category: 'quizzes',
        requirement: 90,
        isUnlocked: quizzesTaken > 0 && averageScore >= 90,
        progress: Math.min(averageScore, 90),
      },
    ];
  }, [completedTopics, longestStreak, quizzesTaken, averageScore]);

  const unlockedAchievements = useMemo(() => {
    return achievements.filter((a) => a.isUnlocked);
  }, [achievements]);

  const lockedAchievements = useMemo(() => {
    return achievements.filter((a) => !a.isUnlocked);
  }, [achievements]);

  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;

  return {
    achievements,
    unlockedAchievements,
    lockedAchievements,
    totalAchievements,
    unlockedCount,
  };
};
