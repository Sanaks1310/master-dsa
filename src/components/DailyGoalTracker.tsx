import { useState, useEffect, useRef } from 'react';
import { Target, BookOpen, Brain, Settings, Check, ChevronDown, ChevronUp } from 'lucide-react';
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
import { useDailyGoal } from '@/hooks/useDailyGoal';
import { useConfetti } from '@/hooks/useConfetti';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const DailyGoalTracker = () => {
  const {
    goalData,
    setTopicsGoal,
    setQuizzesGoal,
    topicsProgress,
    quizzesProgress,
    isTopicsGoalMet,
    isQuizzesGoalMet,
    isDailyGoalComplete,
  } = useDailyGoal();
  const { triggerConfetti } = useConfetti();

  const [isExpanded, setIsExpanded] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempTopicsGoal, setTempTopicsGoal] = useState(goalData.topicsGoal);
  const [tempQuizzesGoal, setTempQuizzesGoal] = useState(goalData.quizzesGoal);
  
  // Track if we've already celebrated today's completion
  const hasTriggeredConfettiRef = useRef(false);

  // Trigger confetti when daily goal is completed
  useEffect(() => {
    if (isDailyGoalComplete && !hasTriggeredConfettiRef.current) {
      hasTriggeredConfettiRef.current = true;
      triggerConfetti('goal');
      toast.success('🎉 Daily Goal Complete!', {
        description: "Amazing work! You've crushed your learning goals for today!",
        duration: 5000,
      });
    }
    
    // Reset the flag when goal is no longer complete (new day)
    if (!isDailyGoalComplete) {
      hasTriggeredConfettiRef.current = false;
    }
  }, [isDailyGoalComplete, triggerConfetti]);

  const handleSaveSettings = () => {
    setTopicsGoal(tempTopicsGoal);
    setQuizzesGoal(tempQuizzesGoal);
    setSettingsOpen(false);
  };

  const handleOpenSettings = () => {
    setTempTopicsGoal(goalData.topicsGoal);
    setTempQuizzesGoal(goalData.quizzesGoal);
  };

  return (
    <div className="mb-8">
      <div
        className={cn(
          'rounded-xl border transition-all duration-300',
          isDailyGoalComplete
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
                isDailyGoalComplete ? 'bg-green/20 text-green' : 'bg-primary/20 text-primary'
              )}
            >
              {isDailyGoalComplete ? <Check className="w-5 h-5" /> : <Target className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {isDailyGoalComplete ? "Today's Goals Complete! 🎉" : "Today's Learning Goals"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {goalData.todayTopicsCompleted}/{goalData.topicsGoal} topics •{' '}
                {goalData.todayQuizzesTaken}/{goalData.quizzesGoal} quizzes
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
                  <DialogTitle>Set Daily Goals</DialogTitle>
                  <DialogDescription>
                    Adjust your daily learning targets. Goals reset at midnight.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan" />
                        <span className="font-medium">Topics to complete</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{tempTopicsGoal}</span>
                    </div>
                    <Slider
                      value={[tempTopicsGoal]}
                      onValueChange={(value) => setTempTopicsGoal(value[0])}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple" />
                        <span className="font-medium">Quizzes to take</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{tempQuizzesGoal}</span>
                    </div>
                    <Slider
                      value={[tempQuizzesGoal]}
                      onValueChange={(value) => setTempQuizzesGoal(value[0])}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} className="w-full">
                  Save Goals
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
            {/* Topics Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan" />
                  <span className="text-muted-foreground">Topics</span>
                </div>
                <span className={cn('font-medium', isTopicsGoalMet ? 'text-green' : 'text-foreground')}>
                  {goalData.todayTopicsCompleted} / {goalData.topicsGoal}
                  {isTopicsGoalMet && ' ✓'}
                </span>
              </div>
              <Progress
                value={topicsProgress}
                className={cn('h-2', isTopicsGoalMet && '[&>div]:bg-green')}
              />
            </div>

            {/* Quizzes Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple" />
                  <span className="text-muted-foreground">Quizzes</span>
                </div>
                <span className={cn('font-medium', isQuizzesGoalMet ? 'text-green' : 'text-foreground')}>
                  {goalData.todayQuizzesTaken} / {goalData.quizzesGoal}
                  {isQuizzesGoalMet && ' ✓'}
                </span>
              </div>
              <Progress
                value={quizzesProgress}
                className={cn('h-2', isQuizzesGoalMet && '[&>div]:bg-green')}
              />
            </div>

            {!isDailyGoalComplete && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                Keep going! Complete topics and quizzes to reach your daily goals.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyGoalTracker;
