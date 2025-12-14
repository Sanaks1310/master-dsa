import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Trash2, Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ArrayVisualizerProps {
  initialArray?: number[];
}

const ArrayVisualizer = ({ initialArray = [5, 2, 8, 1, 9, 3] }: ArrayVisualizerProps) => {
  const [array, setArray] = useState<number[]>(initialArray);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [searchIndex, setSearchIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(500);

  const maxValue = Math.max(...array, 1);

  const handleAdd = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      toast.error('Please enter a valid number');
      return;
    }
    if (array.length >= 12) {
      toast.error('Maximum array size reached (12 elements)');
      return;
    }
    setArray([...array, num]);
    setInputValue('');
    toast.success(`Added ${num} to the array`);
  };

  const handleRemove = (index: number) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
    toast.success(`Removed element at index ${index}`);
  };

  const handleSearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      toast.error('Please enter a valid number to search');
      return;
    }

    setIsAnimating(true);
    setSearchIndex(null);
    
    for (let i = 0; i < array.length; i++) {
      setHighlightedIndices([i]);
      setAnimationStep(i);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      if (array[i] === target) {
        setSearchIndex(i);
        setHighlightedIndices([i]);
        setIsAnimating(false);
        toast.success(`Found ${target} at index ${i}`);
        return;
      }
    }
    
    setHighlightedIndices([]);
    setIsAnimating(false);
    toast.error(`${target} not found in array`);
  };

  const handleReset = () => {
    setArray(initialArray);
    setHighlightedIndices([]);
    setSearchIndex(null);
    setAnimationStep(0);
    toast.info('Array reset to initial values');
  };

  const handleRandomize = () => {
    const randomArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(randomArray);
    setHighlightedIndices([]);
    setSearchIndex(null);
    toast.info('Generated random array');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Interactive Array Visualizer</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomize}
            className="border-border hover:border-primary"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Randomize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-border hover:border-primary"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="relative mb-8">
        <div className="flex items-end justify-center gap-2 h-48 p-4 bg-muted/30 rounded-lg border border-border">
          {array.map((value, index) => {
            const height = (value / maxValue) * 100;
            const isHighlighted = highlightedIndices.includes(index);
            const isFound = searchIndex === index;
            
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`relative w-12 md:w-16 rounded-t-lg transition-all duration-300 flex items-end justify-center pb-2 ${
                    isFound
                      ? 'bg-green shadow-[0_0_20px_hsl(150_70%_45%/0.5)]'
                      : isHighlighted
                      ? 'bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
                      : 'bg-gradient-to-t from-cyan/60 to-cyan/30'
                  }`}
                  style={{ height: `${Math.max(height, 20)}%` }}
                >
                  <span className="text-sm font-bold text-background">{value}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-destructive-foreground" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground font-mono">[{index}]</span>
              </div>
            );
          })}
        </div>
        
        {/* Memory representation */}
        <div className="mt-4 flex justify-center">
          <div className="flex border border-border rounded overflow-hidden">
            {array.map((value, index) => (
              <div
                key={index}
                className={`w-12 md:w-16 h-10 flex items-center justify-center border-r border-border last:border-r-0 font-mono text-sm ${
                  highlightedIndices.includes(index)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted/30 text-foreground'
                }`}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">Memory representation (contiguous allocation)</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Element */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Add Element</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              className="bg-muted/50 border-border"
            />
            <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Element */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Search Element (Linear Search)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value to search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-muted/50 border-border"
              disabled={isAnimating}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isAnimating}
              className="bg-primary hover:bg-primary/90"
            >
              {isAnimating ? (
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Animation Speed */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Animation Speed</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAnimationSpeed(Math.min(1000, animationSpeed + 100))}
              className="text-muted-foreground hover:text-foreground"
            >
              Slower
            </Button>
            <span className="text-sm font-mono text-foreground w-16 text-center">{animationSpeed}ms</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAnimationSpeed(Math.max(100, animationSpeed - 100))}
              className="text-muted-foreground hover:text-foreground"
            >
              Faster
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
