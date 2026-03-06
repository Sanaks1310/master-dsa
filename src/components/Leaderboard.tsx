import { useMemo, useState } from 'react';
import { Trophy, Medal, Crown, Flame, BookOpen, Brain, TrendingUp, Star, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { useStudyTime } from '@/hooks/useStudyTime';
import { dsaCategories } from '@/data/dsaTopics';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  topicsCompleted: number;
  avgQuizScore: number;
  streak: number;
  studyHours: number;
  isCurrentUser: boolean;
}

const MOCK_LEARNERS: Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>[] = [
  { name: 'Alex Chen', avatar: '🧑‍💻', topicsCompleted: 42, avgQuizScore: 94, streak: 31, studyHours: 68 },
  { name: 'Priya Sharma', avatar: '👩‍🔬', topicsCompleted: 38, avgQuizScore: 91, streak: 22, studyHours: 55 },
  { name: 'Marcus Johnson', avatar: '👨‍🎓', topicsCompleted: 35, avgQuizScore: 88, streak: 18, studyHours: 47 },
  { name: 'Yuki Tanaka', avatar: '🧑‍🎓', topicsCompleted: 30, avgQuizScore: 85, streak: 15, studyHours: 40 },
  { name: 'Sofia Rodriguez', avatar: '👩‍💻', topicsCompleted: 27, avgQuizScore: 82, streak: 12, studyHours: 35 },
  { name: 'James Wright', avatar: '🧑‍🏫', topicsCompleted: 22, avgQuizScore: 79, streak: 9, studyHours: 28 },
  { name: 'Amara Obi', avatar: '👩‍🎓', topicsCompleted: 18, avgQuizScore: 76, streak: 7, studyHours: 22 },
  { name: 'Liam Murphy', avatar: '👨‍💻', topicsCompleted: 14, avgQuizScore: 72, streak: 5, studyHours: 16 },
  { name: 'Mei Lin', avatar: '👩‍🏫', topicsCompleted: 10, avgQuizScore: 68, streak: 3, studyHours: 11 },
];

const totalTopics = dsaCategories.reduce((sum, cat) => sum + cat.topics.length, 0);

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-orange" />;
  return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
};

type SortField = 'score' | 'topicsCompleted' | 'avgQuizScore' | 'streak' | 'studyHours';

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'score', label: 'Overall Score' },
  { value: 'topicsCompleted', label: 'Topics Completed' },
  { value: 'avgQuizScore', label: 'Quiz Score' },
  { value: 'streak', label: 'Streak' },
  { value: 'studyHours', label: 'Study Hours' },
];

const calculateScore = (entry: Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>) => {
  return (
    entry.topicsCompleted * 10 +
    entry.avgQuizScore * 2 +
    entry.streak * 5 +
    entry.studyHours * 3
  );
};

const Leaderboard = () => {
  const { getCompletedTopicsCount, getAverageScore } = useProgress();
  const { streak } = useStreak();
  const { totalMinutes } = useStudyTime();

  const [sortBy, setSortBy] = useState<SortField>('score');

  const leaderboard = useMemo((): LeaderboardEntry[] => {
    const currentUser = {
      name: 'You',
      avatar: '⭐',
      topicsCompleted: getCompletedTopicsCount(),
      avgQuizScore: getAverageScore(),
      streak: streak.currentStreak,
      studyHours: Math.round(totalMinutes / 60),
    };

    const allEntries = [
      ...MOCK_LEARNERS.map(e => ({ ...e, isCurrentUser: false })),
      { ...currentUser, isCurrentUser: true },
    ];

    allEntries.sort((a, b) => {
      if (sortBy === 'score') return calculateScore(b) - calculateScore(a);
      return (b[sortBy] as number) - (a[sortBy] as number);
    });

    return allEntries.map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [getCompletedTopicsCount, getAverageScore, streak.currentStreak, totalMinutes, sortBy]);

  const currentUserEntry = leaderboard.find(e => e.isCurrentUser)!;

  return (
    <div className="mb-6">
      <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Community Leaderboard</h3>
              <p className="text-sm text-muted-foreground">
                You're ranked <span className="font-bold text-primary">#{currentUserEntry.rank}</span> of {leaderboard.length} learners
              </p>
            </div>
          </div>
        </div>

        {/* Your Stats Summary */}
        <div className="grid grid-cols-4 gap-px bg-border/30">
          {[
            { icon: BookOpen, label: 'Topics', value: currentUserEntry.topicsCompleted, color: 'text-primary' },
            { icon: Brain, label: 'Avg Score', value: `${currentUserEntry.avgQuizScore}%`, color: 'text-accent' },
            { icon: Flame, label: 'Streak', value: `${currentUserEntry.streak}d`, color: 'text-orange' },
            { icon: TrendingUp, label: 'Hours', value: currentUserEntry.studyHours, color: 'text-green' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card/80 p-3 text-center">
              <stat.icon className={cn('w-4 h-4 mx-auto mb-1', stat.color)} />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="divide-y divide-border/30">
          {leaderboard.map((entry) => (
            <div
              key={entry.name}
              className={cn(
                'flex items-center gap-3 px-4 py-3 transition-colors',
                entry.isCurrentUser
                  ? 'bg-primary/10 border-l-2 border-l-primary'
                  : 'hover:bg-muted/30'
              )}
            >
              {/* Rank */}
              <div className="w-8 flex items-center justify-center shrink-0">
                {getRankIcon(entry.rank)}
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xl">{entry.avatar}</span>
                <div className="min-w-0">
                  <p className={cn(
                    'font-medium truncate text-sm',
                    entry.isCurrentUser ? 'text-primary' : 'text-foreground'
                  )}>
                    {entry.name}
                    {entry.isCurrentUser && (
                      <Star className="w-3 h-3 inline ml-1 text-primary fill-primary" />
                    )}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {entry.topicsCompleted}/{totalTopics}
                </span>
                <span className="flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  {entry.avgQuizScore}%
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {entry.streak}d
                </span>
              </div>

              {/* Score */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-foreground">
                  {calculateScore(entry).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-muted/20 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            Scores based on topics completed, quiz performance, streak, and study time.
            Keep learning to climb the ranks! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
