import { Flame, Trophy, Star, Award, Crown, Zap, Target, Medal } from 'lucide-react';
import { useStreak } from '@/hooks/useStreak';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requiredStreak: number;
  color: string;
}

const badges: Badge[] = [
  {
    id: 'starter',
    name: 'Getting Started',
    description: 'Complete your first day of learning',
    icon: <Zap className="w-4 h-4" />,
    requiredStreak: 1,
    color: 'text-blue-500',
  },
  {
    id: 'consistent',
    name: 'Consistent Learner',
    description: '3 days in a row!',
    icon: <Star className="w-4 h-4" />,
    requiredStreak: 3,
    color: 'text-yellow-500',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Student',
    description: 'A full week of learning!',
    icon: <Target className="w-4 h-4" />,
    requiredStreak: 7,
    color: 'text-green-500',
  },
  {
    id: 'committed',
    name: 'Committed',
    description: '2 weeks strong!',
    icon: <Award className="w-4 h-4" />,
    requiredStreak: 14,
    color: 'text-purple-500',
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'A whole month of dedication!',
    icon: <Trophy className="w-4 h-4" />,
    requiredStreak: 30,
    color: 'text-orange-500',
  },
  {
    id: 'legend',
    name: 'Legend',
    description: '100 days of mastery!',
    icon: <Crown className="w-4 h-4" />,
    requiredStreak: 100,
    color: 'text-rose-500',
  },
];

const StudyStreak = () => {
  const { streak } = useStreak();

  const earnedBadges = badges.filter((badge) => streak.longestStreak >= badge.requiredStreak);
  const nextBadge = badges.find((badge) => streak.currentStreak < badge.requiredStreak);

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-foreground">Study Streak</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-4 border border-orange-500/20">
          <div className="flex items-center gap-2 text-orange-500 mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">Current</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{streak.currentStreak}</p>
          <p className="text-xs text-muted-foreground">days</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 text-purple-500 mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Best</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{streak.longestStreak}</p>
          <p className="text-xs text-muted-foreground">days</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Total Days</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{streak.totalDaysActive}</p>
          <p className="text-xs text-muted-foreground">active</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center gap-2 text-green-500 mb-1">
            <Medal className="w-4 h-4" />
            <span className="text-sm font-medium">Badges</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{earnedBadges.length}</p>
          <p className="text-xs text-muted-foreground">earned</p>
        </div>
      </div>

      {nextBadge && (
        <div className="mb-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`${nextBadge.color} opacity-50`}>{nextBadge.icon}</span>
              <span className="text-sm text-muted-foreground">
                Next: <span className="font-medium text-foreground">{nextBadge.name}</span>
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {nextBadge.requiredStreak - streak.currentStreak} days to go
            </span>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
              style={{
                width: `${Math.min((streak.currentStreak / nextBadge.requiredStreak) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {earnedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Earned Badges</h4>
          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border hover:border-primary/50 transition-colors cursor-default ${badge.color}`}
                    >
                      {badge.icon}
                      <span className="text-sm font-medium text-foreground">{badge.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      )}

      {earnedBadges.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p className="text-sm">Keep learning to earn your first badge! 🎯</p>
        </div>
      )}
    </div>
  );
};

export default StudyStreak;
