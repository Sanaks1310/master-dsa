import { useState, useMemo, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, ChevronRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizSectionProps {
  title?: string;
  questions: QuizQuestion[];
  topicId?: string;
  onQuizComplete?: (score: number, total: number) => void;
  bestScore?: number | null;
}

const QuizSection = ({ 
  title = "Test Your Knowledge",
  questions,
  topicId,
  onQuizComplete,
  bestScore
}: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [quizComplete, setQuizComplete] = useState(false);

  const progress = useMemo(() => 
    (answeredQuestions.size / questions.length) * 100
  , [answeredQuestions.size, questions.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error('Not quite right');
    }

    setShowResult(true);
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      onQuizComplete?.(score, questions.length);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect! You are a DSA master!' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent work! Great understanding!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Keep practicing!' };
    if (percentage >= 40) return { emoji: '📚', message: 'Not bad! Review the concepts and try again.' };
    return { emoji: '💪', message: 'Keep learning! Practice makes perfect.' };
  };

  if (quizComplete) {
    const { emoji, message } = getScoreMessage();
    const isNewBest = bestScore !== null && bestScore !== undefined && score > bestScore;
    
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-3xl font-bold text-primary">
            {score} / {questions.length}
          </span>
        </div>
        {isNewBest && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green/20 text-green rounded-full text-sm mb-4">
            <Award className="w-4 h-4" />
            New Best Score!
          </div>
        )}
        {bestScore !== null && bestScore !== undefined && !isNewBest && (
          <p className="text-sm text-muted-foreground mb-2">
            Your best: {bestScore} / {questions.length}
          </p>
        )}
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button onClick={resetQuiz} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple" />
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="text-lg font-medium text-foreground mb-6">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQ.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  showCorrect
                    ? 'border-green bg-green/10 text-foreground'
                    : showIncorrect
                    ? 'border-destructive bg-destructive/10 text-foreground'
                    : isSelected
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary/50 text-foreground'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showCorrect
                      ? 'bg-green text-white'
                      : showIncorrect
                      ? 'bg-destructive text-white'
                      : isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {showCorrect ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : showIncorrect ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedAnswer === currentQ.correctAnswer
              ? 'bg-green/10 border border-green/30'
              : 'bg-orange/10 border border-orange/30'
          }`}>
            <p className="text-sm text-foreground">
              <span className="font-semibold">Explanation: </span>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Score: <span className="font-bold text-primary">{score}</span> / {answeredQuestions.size}
          </div>
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-1">
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                'See Results'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
