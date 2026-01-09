import { useState, useCallback } from 'react';
import { Plus, Trash2, RotateCcw, ArrowDown, Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type HeapType = 'max' | 'min';

interface AnimationStep {
  heap: number[];
  highlightedIndices: number[];
  swapIndices: [number, number] | null;
  description: string;
}

const HeapVisualizer = () => {
  const [heap, setHeap] = useState<number[]>([90, 80, 70, 40, 50, 60, 30, 10, 20]);
  const [heapType, setHeapType] = useState<HeapType>('max');
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState<[number, number] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const getParentIndex = (i: number) => Math.floor((i - 1) / 2);
  const getLeftChildIndex = (i: number) => 2 * i + 1;
  const getRightChildIndex = (i: number) => 2 * i + 2;

  const compare = (a: number, b: number) => {
    return heapType === 'max' ? a > b : a < b;
  };

  const generateInsertSteps = (value: number, currentHeap: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const newHeap = [...currentHeap, value];
    
    steps.push({
      heap: [...newHeap],
      highlightedIndices: [newHeap.length - 1],
      swapIndices: null,
      description: `Insert ${value} at the end of the heap (index ${newHeap.length - 1})`
    });

    let i = newHeap.length - 1;
    while (i > 0) {
      const parentIdx = getParentIndex(i);
      const shouldSwap = heapType === 'max' 
        ? newHeap[i] > newHeap[parentIdx]
        : newHeap[i] < newHeap[parentIdx];

      if (shouldSwap) {
        steps.push({
          heap: [...newHeap],
          highlightedIndices: [i, parentIdx],
          swapIndices: [i, parentIdx],
          description: `Compare ${newHeap[i]} with parent ${newHeap[parentIdx]} - needs swap (${heapType === 'max' ? 'child > parent' : 'child < parent'})`
        });

        [newHeap[i], newHeap[parentIdx]] = [newHeap[parentIdx], newHeap[i]];
        
        steps.push({
          heap: [...newHeap],
          highlightedIndices: [parentIdx],
          swapIndices: null,
          description: `Swapped! ${value} moved up to index ${parentIdx}`
        });

        i = parentIdx;
      } else {
        steps.push({
          heap: [...newHeap],
          highlightedIndices: [i, parentIdx],
          swapIndices: null,
          description: `${newHeap[i]} is in correct position (${heapType === 'max' ? 'child ≤ parent' : 'child ≥ parent'})`
        });
        break;
      }
    }

    if (i === 0) {
      steps.push({
        heap: [...newHeap],
        highlightedIndices: [0],
        swapIndices: null,
        description: `${value} is now the root of the heap!`
      });
    }

    return steps;
  };

  const generateDeleteSteps = (currentHeap: number[]): AnimationStep[] => {
    if (currentHeap.length === 0) return [];
    
    const steps: AnimationStep[] = [];
    const newHeap = [...currentHeap];
    const rootValue = newHeap[0];

    steps.push({
      heap: [...newHeap],
      highlightedIndices: [0],
      swapIndices: null,
      description: `Remove root element ${rootValue} (${heapType === 'max' ? 'maximum' : 'minimum'})`
    });

    if (newHeap.length === 1) {
      steps.push({
        heap: [],
        highlightedIndices: [],
        swapIndices: null,
        description: 'Heap is now empty'
      });
      return steps;
    }

    const lastValue = newHeap.pop()!;
    newHeap[0] = lastValue;

    steps.push({
      heap: [...newHeap],
      highlightedIndices: [0],
      swapIndices: null,
      description: `Move last element ${lastValue} to root position`
    });

    let i = 0;
    while (true) {
      const leftIdx = getLeftChildIndex(i);
      const rightIdx = getRightChildIndex(i);
      let targetIdx = i;

      if (leftIdx < newHeap.length) {
        const shouldSwapLeft = heapType === 'max'
          ? newHeap[leftIdx] > newHeap[targetIdx]
          : newHeap[leftIdx] < newHeap[targetIdx];
        if (shouldSwapLeft) targetIdx = leftIdx;
      }

      if (rightIdx < newHeap.length) {
        const shouldSwapRight = heapType === 'max'
          ? newHeap[rightIdx] > newHeap[targetIdx]
          : newHeap[rightIdx] < newHeap[targetIdx];
        if (shouldSwapRight) targetIdx = rightIdx;
      }

      if (targetIdx === i) {
        steps.push({
          heap: [...newHeap],
          highlightedIndices: [i],
          swapIndices: null,
          description: `${newHeap[i]} is in correct position - heapify complete!`
        });
        break;
      }

      steps.push({
        heap: [...newHeap],
        highlightedIndices: [i, targetIdx],
        swapIndices: [i, targetIdx],
        description: `Compare ${newHeap[i]} with ${heapType === 'max' ? 'larger' : 'smaller'} child ${newHeap[targetIdx]} - needs swap`
      });

      [newHeap[i], newHeap[targetIdx]] = [newHeap[targetIdx], newHeap[i]];

      steps.push({
        heap: [...newHeap],
        highlightedIndices: [targetIdx],
        swapIndices: null,
        description: `Swapped! Element moved down to index ${targetIdx}`
      });

      i = targetIdx;
    }

    return steps;
  };

  const runAnimation = useCallback(async (steps: AnimationStep[]) => {
    setIsAnimating(true);
    setAnimationSteps(steps);
    setCurrentStepIndex(0);
    setIsPlaying(true);

    for (let i = 0; i < steps.length; i++) {
      if (!isPlaying) break;
      setCurrentStepIndex(i);
      setHeap(steps[i].heap);
      setHighlightedIndices(steps[i].highlightedIndices);
      setSwapIndices(steps[i].swapIndices);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    setIsAnimating(false);
    setIsPlaying(false);
    setHighlightedIndices([]);
    setSwapIndices(null);
  }, [animationSpeed, isPlaying]);

  const handleInsert = async () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      toast.error('Please enter a valid number');
      return;
    }
    if (heap.length >= 15) {
      toast.error('Maximum heap size reached (15 elements)');
      return;
    }

    const steps = generateInsertSteps(num, heap);
    setInputValue('');
    await runAnimation(steps);
    toast.success(`Inserted ${num} into the heap`);
  };

  const handleDelete = async () => {
    if (heap.length === 0) {
      toast.error('Heap is empty');
      return;
    }

    const rootValue = heap[0];
    const steps = generateDeleteSteps(heap);
    await runAnimation(steps);
    toast.success(`Removed ${rootValue} from the heap`);
  };

  const handleReset = () => {
    setHeap(heapType === 'max' 
      ? [90, 80, 70, 40, 50, 60, 30, 10, 20]
      : [10, 20, 30, 40, 50, 60, 70, 80, 90]
    );
    setHighlightedIndices([]);
    setSwapIndices(null);
    setIsAnimating(false);
    setIsPlaying(false);
    toast.info('Heap reset to default');
  };

  const handleClear = () => {
    setHeap([]);
    setHighlightedIndices([]);
    setSwapIndices(null);
    toast.info('Heap cleared');
  };

  const toggleHeapType = () => {
    const newType = heapType === 'max' ? 'min' : 'max';
    setHeapType(newType);
    setHeap(newType === 'max' 
      ? [90, 80, 70, 40, 50, 60, 30, 10, 20]
      : [10, 20, 30, 40, 50, 60, 70, 80, 90]
    );
    toast.info(`Switched to ${newType}-heap`);
  };

  const nextStep = () => {
    if (currentStepIndex < animationSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setHeap(animationSteps[nextIdx].heap);
      setHighlightedIndices(animationSteps[nextIdx].highlightedIndices);
      setSwapIndices(animationSteps[nextIdx].swapIndices);
    }
  };

  // Calculate tree layout positions
  const getNodePosition = (index: number, totalWidth: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelStart = Math.pow(2, level) - 1;
    const positionInLevel = index - levelStart;
    const nodesInLevel = Math.pow(2, level);
    const spacing = totalWidth / nodesInLevel;
    const x = spacing * (positionInLevel + 0.5);
    const y = level * 80 + 40;
    return { x, y, level };
  };

  const renderTreeView = () => {
    if (heap.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Heap is empty. Insert a value to start!
        </div>
      );
    }

    const width = 600;
    const height = Math.floor(Math.log2(heap.length)) * 80 + 120;

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Draw edges first */}
        {heap.map((_, index) => {
          if (index === 0) return null;
          const parentIdx = getParentIndex(index);
          const parentPos = getNodePosition(parentIdx, width);
          const childPos = getNodePosition(index, width);
          
          const isSwapEdge = swapIndices && 
            ((swapIndices[0] === index && swapIndices[1] === parentIdx) ||
             (swapIndices[1] === index && swapIndices[0] === parentIdx));

          return (
            <line
              key={`edge-${index}`}
              x1={parentPos.x}
              y1={parentPos.y + 20}
              x2={childPos.x}
              y2={childPos.y - 20}
              stroke={isSwapEdge ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
              strokeWidth={isSwapEdge ? 3 : 2}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Draw nodes */}
        {heap.map((value, index) => {
          const pos = getNodePosition(index, width);
          const isHighlighted = highlightedIndices.includes(index);
          const isSwapping = swapIndices?.includes(index);

          return (
            <g key={`node-${index}`} className="transition-all duration-300">
              <circle
                cx={pos.x}
                cy={pos.y}
                r={24}
                fill={isSwapping ? 'hsl(var(--primary))' : isHighlighted ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--card))'}
                stroke={isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                strokeWidth={isHighlighted ? 3 : 2}
                className={isSwapping ? 'animate-pulse' : ''}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fill={isSwapping ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'}
                fontSize="14"
                fontWeight="bold"
              >
                {value}
              </text>
              <text
                x={pos.x}
                y={pos.y + 45}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="10"
              >
                [{index}]
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderArrayView = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {heap.map((value, index) => {
          const isHighlighted = highlightedIndices.includes(index);
          const isSwapping = swapIndices?.includes(index);

          return (
            <div
              key={index}
              className={`relative flex flex-col items-center transition-all duration-300 ${
                isSwapping ? 'scale-110' : ''
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg border-2 ${
                  isSwapping
                    ? 'bg-primary border-primary text-primary-foreground animate-pulse'
                    : isHighlighted
                    ? 'bg-primary/20 border-primary text-foreground'
                    : 'bg-card border-border text-foreground'
                }`}
              >
                {value}
              </div>
              <span className="text-xs text-muted-foreground mt-1">{index}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const currentStep = animationSteps[currentStepIndex];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-foreground">Interactive Heap Visualizer</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleHeapType}
            className={`border-2 ${heapType === 'max' ? 'border-primary text-primary' : 'border-cyan text-cyan'}`}
          >
            {heapType === 'max' ? 'Max-Heap' : 'Min-Heap'}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="border-border hover:border-destructive text-destructive"
          >
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-border hover:border-primary"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Tree View</h4>
        <div className="min-h-[280px] p-4 bg-muted/30 rounded-lg border border-border flex items-center justify-center overflow-x-auto">
          {renderTreeView()}
        </div>
      </div>

      {/* Array Representation */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Array Representation</h4>
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          {heap.length > 0 ? renderArrayView() : (
            <div className="text-center text-muted-foreground">Array is empty</div>
          )}
        </div>
      </div>

      {/* Animation Status */}
      {isAnimating && currentStep && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground">
              <strong>Step {currentStepIndex + 1}/{animationSteps.length}:</strong> {currentStep.description}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextStep}
              disabled={currentStepIndex >= animationSteps.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Heap Property Info */}
      <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{heapType === 'max' ? 'Max-Heap' : 'Min-Heap'} Property:</strong> 
          {heapType === 'max' 
            ? ' Parent nodes are always greater than or equal to their children. Root is the maximum.'
            : ' Parent nodes are always less than or equal to their children. Root is the minimum.'
          }
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Array Formula:</strong> For node at index i → Left child: 2i+1, Right child: 2i+2, Parent: ⌊(i-1)/2⌋
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Insert Value</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value (1-99)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
              className="bg-muted/50 border-border"
              disabled={isAnimating}
            />
            <Button 
              onClick={handleInsert} 
              className="bg-primary hover:bg-primary/90"
              disabled={isAnimating}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Extract {heapType === 'max' ? 'Maximum' : 'Minimum'} (Delete Root)
          </label>
          <Button
            onClick={handleDelete}
            disabled={isAnimating || heap.length === 0}
            className="w-full bg-destructive hover:bg-destructive/90"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Extract {heap[0] !== undefined ? heap[0] : '-'}
          </Button>
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

export default HeapVisualizer;
