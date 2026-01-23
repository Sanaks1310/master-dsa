import { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAchievements, Achievement } from '@/hooks/useAchievements';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AchievementBadge = ({ achievement }: { achievement: Achievement }) => {
  const progressPercent = Math.round((achievement.progress / achievement.requirement) * 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 min-w-[80px]',
              achievement.isUnlocked
                ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/40 hover:border-primary/60 hover:scale-105'
                : 'bg-muted/30 border-border/50 opacity-60 hover:opacity-80'
            )}
          >
            <span className={cn('text-3xl mb-1', !achievement.isUnlocked && 'grayscale')}>
              {achievement.icon}
            </span>
            {!achievement.isUnlocked && (
              <div className="absolute top-1 right-1">
                <Lock className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
            <span
              className={cn(
                'text-xs font-medium text-center leading-tight',
                achievement.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {achievement.title}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <div className="space-y-2">
            <p className="font-semibold">{achievement.title}</p>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
            {!achievement.isUnlocked && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>
                    {achievement.progress}/{achievement.requirement}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </div>
            )}
            {achievement.isUnlocked && (
              <p className="text-xs text-green font-medium">✓ Unlocked!</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const AchievementBadges = () => {
  const { achievements, unlockedCount, totalAchievements } = useAchievements();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showLocked, setShowLocked] = useState(false);

  const displayedAchievements = showLocked
    ? achievements
    : achievements.filter((a) => a.isUnlocked);

  const categories = [
    { id: 'topics', label: 'Topics', color: 'cyan' },
    { id: 'streak', label: 'Streak', color: 'orange' },
    { id: 'quizzes', label: 'Quizzes', color: 'purple' },
  ] as const;

  return (
    <div className="mb-8">
      <div className="rounded-xl border border-border bg-card/50">
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Achievements</h3>
              <p className="text-sm text-muted-foreground">
                {unlockedCount} of {totalAchievements} unlocked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress
              value={(unlockedCount / totalAchievements) * 100}
              className="w-24 h-2"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4">
            {/* Toggle locked achievements */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLocked(!showLocked);
                }}
                className="text-xs"
              >
                {showLocked ? 'Hide locked' : 'Show all'}
              </Button>
            </div>

            {/* Achievement categories */}
            {categories.map((category) => {
              const categoryAchievements = displayedAchievements.filter(
                (a) => a.category === category.id
              );
              if (categoryAchievements.length === 0) return null;

              return (
                <div key={category.id}>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {category.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryAchievements.map((achievement) => (
                      <AchievementBadge key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </div>
              );
            })}

            {displayedAchievements.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">
                No achievements unlocked yet. Start learning to earn badges!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadges;
