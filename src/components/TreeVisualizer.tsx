import { useState } from 'react';
import { Plus, Trash2, RotateCcw, Search, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TreeVisualizer = () => {
  const [root, setRoot] = useState<TreeNode | null>({
    value: 50,
    left: { value: 30, left: { value: 20, left: null, right: null }, right: { value: 40, left: null, right: null } },
    right: { value: 70, left: { value: 60, left: null, right: null }, right: { value: 80, left: null, right: null } }
  });
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [highlightedValue, setHighlightedValue] = useState<number | null>(null);
  const [searchPath, setSearchPath] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) return { value, left: null, right: null };
    if (value < node.value) {
      return { ...node, left: insertNode(node.left, value) };
    } else if (value > node.value) {
      return { ...node, right: insertNode(node.right, value) };
    }
    return node;
  };

  const findMin = (node: TreeNode): TreeNode => {
    return node.left ? findMin(node.left) : node;
  };

  const deleteNode = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;
    if (value < node.value) {
      return { ...node, left: deleteNode(node.left, value) };
    } else if (value > node.value) {
      return { ...node, right: deleteNode(node.right, value) };
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const minRight = findMin(node.right);
      return { ...node, value: minRight.value, right: deleteNode(node.right, minRight.value) };
    }
  };

  const countNodes = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  const handleAdd = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      toast.error('Please enter a valid number');
      return;
    }
    if (countNodes(root) >= 15) {
      toast.error('Maximum tree size reached (15 nodes)');
      return;
    }
    setRoot(insertNode(root, num));
    setInputValue('');
    setHighlightedValue(num);
    setTimeout(() => setHighlightedValue(null), 1500);
    toast.success(`Added ${num} to the tree`);
  };

  const handleDelete = (value: number) => {
    setRoot(deleteNode(root, value));
    toast.success(`Deleted ${value} from the tree`);
  };

  const handleSearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      toast.error('Please enter a valid number to search');
      return;
    }

    setIsAnimating(true);
    setSearchPath([]);
    const path: number[] = [];
    let current = root;

    while (current) {
      path.push(current.value);
      setSearchPath([...path]);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));

      if (current.value === target) {
        setHighlightedValue(target);
        setIsAnimating(false);
        toast.success(`Found ${target}!`);
        setTimeout(() => {
          setHighlightedValue(null);
          setSearchPath([]);
        }, 2000);
        return;
      }

      current = target < current.value ? current.left : current.right;
    }

    setIsAnimating(false);
    setSearchPath([]);
    toast.error(`${target} not found in tree`);
  };

  const handleReset = () => {
    setRoot({
      value: 50,
      left: { value: 30, left: { value: 20, left: null, right: null }, right: { value: 40, left: null, right: null } },
      right: { value: 70, left: { value: 60, left: null, right: null }, right: { value: 80, left: null, right: null } }
    });
    setHighlightedValue(null);
    setSearchPath([]);
    toast.info('Tree reset to default');
  };

  const handleClear = () => {
    setRoot(null);
    setHighlightedValue(null);
    setSearchPath([]);
    toast.info('Tree cleared');
  };

  const renderNode = (node: TreeNode | null, level: number = 0, position: 'root' | 'left' | 'right' = 'root'): JSX.Element | null => {
    if (!node) return null;

    const isHighlighted = highlightedValue === node.value;
    const isInPath = searchPath.includes(node.value);
    const isFound = isHighlighted && isInPath;

    return (
      <div className="flex flex-col items-center">
        <div
          className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 group cursor-pointer ${
            isFound
              ? 'bg-green border-2 border-green text-background shadow-[0_0_20px_hsl(150_70%_45%/0.5)]'
              : isHighlighted
              ? 'bg-primary border-2 border-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
              : isInPath
              ? 'bg-orange border-2 border-orange text-background animate-pulse'
              : 'bg-card border-2 border-border text-foreground hover:border-primary'
          }`}
        >
          {node.value}
          <button
            onClick={() => handleDelete(node.value)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-3 h-3 text-destructive-foreground" />
          </button>
        </div>

        {(node.left || node.right) && (
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col items-center">
              {node.left && (
                <>
                  <div className="w-px h-4 bg-border" />
                  <ArrowDown className="w-3 h-3 text-muted-foreground -mt-1" />
                </>
              )}
              {renderNode(node.left, level + 1, 'left')}
            </div>
            <div className="flex flex-col items-center">
              {node.right && (
                <>
                  <div className="w-px h-4 bg-border" />
                  <ArrowDown className="w-3 h-3 text-muted-foreground -mt-1" />
                </>
              )}
              {renderNode(node.right, level + 1, 'right')}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Interactive Binary Search Tree</h3>
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
      <div className="min-h-[300px] p-4 bg-muted/30 rounded-lg border border-border flex items-start justify-center overflow-x-auto mb-8">
        {root ? (
          <div className="pt-4">{renderNode(root)}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Tree is empty. Add a node to start!
          </div>
        )}
      </div>

      {/* BST Property Info */}
      <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">BST Property:</strong> Left child &lt; Parent &lt; Right child. 
          New values are automatically placed in the correct position.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Insert Node</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value (1-99)"
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

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Search Node (BST Search)</label>
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

export default TreeVisualizer;
