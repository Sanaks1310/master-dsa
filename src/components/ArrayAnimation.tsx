import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimationStep {
  description: string;
  highlightedIndices: number[];
  values: number[];
  pointers?: { index: number; label: string }[];
}

interface ArrayAnimationProps {
  title: string;
  description: string;
  steps: AnimationStep[];
}

const ArrayAnimation = ({ title, description, steps }: ArrayAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentData = steps[currentStep];
  const maxValue = Math.max(...currentData.values, 1);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Visualization */}
      <div className="relative mb-6">
        <div className="flex items-end justify-center gap-3 h-40 p-4 bg-muted/30 rounded-lg border border-border">
          {currentData.values.map((value, index) => {
            const height = (value / maxValue) * 100;
            const isHighlighted = currentData.highlightedIndices.includes(index);
            const pointer = currentData.pointers?.find(p => p.index === index);
            
            return (
              <div key={index} className="flex flex-col items-center gap-2 relative">
                {pointer && (
                  <div className="absolute -top-8 text-xs font-mono text-primary bg-primary/20 px-2 py-1 rounded">
                    {pointer.label}
                  </div>
                )}
                <div
                  className={`w-10 md:w-14 rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2 ${
                    isHighlighted
                      ? 'bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
                      : 'bg-cyan/40'
                  }`}
                  style={{ height: `${Math.max(height, 15)}%` }}
                >
                  <span className="text-xs font-bold text-background">{value}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">[{index}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Description */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
        <p className="text-sm text-foreground">
          <span className="text-primary font-mono mr-2">Step {currentStep + 1}/{steps.length}:</span>
          {currentData.description}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="border-border"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="border-border"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="border-border"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-border"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Speed:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSpeed(prev => Math.min(2000, prev + 250))}
            className="text-xs"
          >
            0.5x
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSpeed(1000)}
            className="text-xs"
          >
            1x
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSpeed(500)}
            className="text-xs"
          >
            2x
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ArrayAnimation;
