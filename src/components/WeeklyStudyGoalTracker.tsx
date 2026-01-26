import { useState, useEffect, useRef } from 'react';
import { Clock, Settings, Check, ChevronDown, ChevronUp, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useWeeklyStudyGoal } from '@/hooks/useWeeklyStudyGoal';
import { useConfetti } from '@/hooks/useConfetti';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const formatMinutes = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const GOAL_PRESETS = [
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
  { label: '5 hours', value: 300 },
];

const WeeklyStudyGoalTracker = () => {
  const {
    weeklyMinutesGoal,
    currentWeekMinutes,
    progress,
    isGoalMet,
    remainingMinutes,
    daysLeftInWeek,
    dailyTargetRemaining,
    getMilestone,
    goalMetNotified,
    setWeeklyGoal,
    markGoalNotified,
  } = useWeeklyStudyGoal();
  const { triggerConfetti } = useConfetti();

  const [isExpanded, setIsExpanded] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(weeklyMinutesGoal);
  
  const hasTriggeredConfettiRef = useRef(false);
  const lastMilestoneRef = useRef(0);

  // Trigger celebration when goal is met
  useEffect(() => {
    if (isGoalMet && !goalMetNotified && !hasTriggeredConfettiRef.current) {
      hasTriggeredConfettiRef.current = true;
      triggerConfetti('goal');
      markGoalNotified();
      toast.success('🎉 Weekly Study Goal Complete!', {
        description: `Amazing! You've studied ${formatMinutes(currentWeekMinutes)} this week!`,
        duration: 5000,
      });
    }
    
    if (!isGoalMet) {
      hasTriggeredConfettiRef.current = false;
    }
  }, [isGoalMet, goalMetNotified, triggerConfetti, markGoalNotified, currentWeekMinutes]);

  // Milestone notifications
  useEffect(() => {
    if (getMilestone > lastMilestoneRef.current && getMilestone < 100) {
      toast.info(`📊 ${getMilestone}% of weekly goal reached!`, {
        description: `You've studied ${formatMinutes(currentWeekMinutes)} of ${formatMinutes(weeklyMinutesGoal)} this week.`,
        duration: 4000,
      });
    }
    lastMilestoneRef.current = getMilestone;
  }, [getMilestone, currentWeekMinutes, weeklyMinutesGoal]);

  const handleSaveSettings = () => {
    setWeeklyGoal(tempGoal);
    setSettingsOpen(false);
    toast.success('Weekly goal updated!');
  };

  const handleOpenSettings = () => {
    setTempGoal(weeklyMinutesGoal);
  };

  return (
    <div className="mb-6">
      <div
        className={cn(
          'rounded-xl border transition-all duration-300',
          isGoalMet
            ? 'border-green/40 bg-gradient-to-r from-green/10 to-transparent'
            : 'border-border bg-card/50'
        )}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                isGoalMet ? 'bg-green/20 text-green' : 'bg-cyan/20 text-cyan'
              )}
            >
              {isGoalMet ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {isGoalMet ? "Weekly Goal Complete! 🎉" : "Weekly Study Goal"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatMinutes(currentWeekMinutes)} / {formatMinutes(weeklyMinutesGoal)} this week
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenSettings();
                  }}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                  <DialogTitle>Set Weekly Study Goal</DialogTitle>
                  <DialogDescription>
                    Choose how much time you want to spend learning each week. Goals reset every Monday.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Quick Presets */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Quick select</span>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_PRESETS.map((preset) => (
                        <Button
                          key={preset.value}
                          variant={tempGoal === preset.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTempGoal(preset.value)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan" />
                        <span className="font-medium">Weekly study time</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{formatMinutes(tempGoal)}</span>
                    </div>
                    <Slider
                      value={[tempGoal]}
                      onValueChange={(value) => setTempGoal(value[0])}
                      min={30}
                      max={600}
                      step={15}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      That's about {Math.round(tempGoal / 7)} minutes per day
                    </p>
                  </div>
                </div>
                <Button onClick={handleSaveSettings} className="w-full">
                  Save Goal
                </Button>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Progress Details */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan" />
                  <span className="text-muted-foreground">Progress</span>
                </div>
                <span className={cn('font-medium', isGoalMet ? 'text-green' : 'text-foreground')}>
                  {progress}%
                  {isGoalMet && ' ✓'}
                </span>
              </div>
              <Progress
                value={progress}
                className={cn('h-2', isGoalMet && '[&>div]:bg-green')}
              />
            </div>

            {/* Stats Grid */}
            {!isGoalMet && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{formatMinutes(remainingMinutes)}</p>
                  <p className="text-xs text-muted-foreground">remaining</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">
                    {daysLeftInWeek > 0 ? `${formatMinutes(dailyTargetRemaining)}/day` : 'Today!'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {daysLeftInWeek > 0 ? `${daysLeftInWeek + 1} days left` : 'Last day of week'}
                  </p>
                </div>
              </div>
            )}

            {isGoalMet && (
              <div className="flex items-center justify-center gap-2 text-green text-sm py-2">
                <TrendingUp className="w-4 h-4" />
                <span>You've exceeded your goal by {formatMinutes(currentWeekMinutes - weeklyMinutesGoal)}!</span>
              </div>
            )}

            {!isGoalMet && progress >= 50 && (
              <p className="text-xs text-muted-foreground text-center">
                Great progress! You're {progress >= 75 ? 'almost there' : 'over halfway'}!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyStudyGoalTracker;
