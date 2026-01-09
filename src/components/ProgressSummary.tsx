import { Trophy, Target, TrendingUp, RotateCcw } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ProgressSummary = () => {
  const { getQuizzesTakenCount, getAverageScore, progress, resetProgress } = useProgress();
  
  const quizzesTaken = getQuizzesTakenCount();
  const averageScore = getAverageScore();
  
  if (quizzesTaken === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Your Progress</h3>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your quiz scores and progress. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetProgress} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Reset Progress
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Target className="w-4 h-4" />
            <span className="text-sm">Quizzes Taken</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{quizzesTaken}</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Average Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Topics Mastered</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Object.values(progress.topics).filter(t => t.bestScore === t.quizTotal && t.quizTotal !== null).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
