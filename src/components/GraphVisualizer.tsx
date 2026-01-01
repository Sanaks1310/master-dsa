import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, RotateCcw, Play, Link2, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface GraphNode {
  id: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
}

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 'A', x: 200, y: 50 },
    { id: 'B', x: 100, y: 150 },
    { id: 'C', x: 300, y: 150 },
    { id: 'D', x: 50, y: 250 },
    { id: 'E', x: 150, y: 250 },
    { id: 'F', x: 250, y: 250 },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'F' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [traversalType, setTraversalType] = useState<'bfs' | 'dfs'>('bfs');
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);

  const getAdjacencyList = (): Map<string, string[]> => {
    const adj = new Map<string, string[]>();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(e => {
      adj.get(e.from)?.push(e.to);
      adj.get(e.to)?.push(e.from);
    });
    return adj;
  };

  const handleAddNode = () => {
    const label = inputValue.trim().toUpperCase();
    if (!label || label.length > 2) {
      toast.error('Enter a valid label (1-2 characters)');
      return;
    }
    if (nodes.find(n => n.id === label)) {
      toast.error('Node already exists');
      return;
    }
    if (nodes.length >= 10) {
      toast.error('Maximum 10 nodes allowed');
      return;
    }
    const x = 100 + Math.random() * 200;
    const y = 100 + Math.random() * 150;
    setNodes([...nodes, { id: label, x, y }]);
    setInputValue('');
    toast.success(`Added node ${label}`);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setEdges(edges.filter(e => e.from !== id && e.to !== id));
    if (selectedNode === id) setSelectedNode(null);
    toast.success(`Deleted node ${id}`);
  };

  const handleAddEdge = () => {
    const from = edgeFrom.trim().toUpperCase();
    const to = edgeTo.trim().toUpperCase();
    if (!from || !to) {
      toast.error('Enter both node labels');
      return;
    }
    if (from === to) {
      toast.error('Cannot connect node to itself');
      return;
    }
    if (!nodes.find(n => n.id === from) || !nodes.find(n => n.id === to)) {
      toast.error('One or both nodes do not exist');
      return;
    }
    const exists = edges.some(
      e => (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );
    if (exists) {
      toast.error('Edge already exists');
      return;
    }
    setEdges([...edges, { from, to }]);
    setEdgeFrom('');
    setEdgeTo('');
    toast.success(`Connected ${from} ↔ ${to}`);
  };

  const handleBFS = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    setVisitedNodes([]);
    setCurrentNode(null);

    const adj = getAdjacencyList();
    const startNode = nodes[0].id;
    const visited = new Set<string>();
    const queue = [startNode];

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (visited.has(node)) continue;

      visited.add(node);
      setCurrentNode(node);
      setVisitedNodes(Array.from(visited));
      await new Promise(resolve => setTimeout(resolve, animationSpeed));

      const neighbors = adj.get(node) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    setCurrentNode(null);
    setIsAnimating(false);
    toast.success('BFS traversal complete!');
  };

  const handleDFS = async () => {
    if (nodes.length === 0) return;
    setIsAnimating(true);
    setVisitedNodes([]);
    setCurrentNode(null);

    const adj = getAdjacencyList();
    const startNode = nodes[0].id;
    const visited = new Set<string>();

    const dfs = async (node: string) => {
      if (visited.has(node)) return;

      visited.add(node);
      setCurrentNode(node);
      setVisitedNodes(Array.from(visited));
      await new Promise(resolve => setTimeout(resolve, animationSpeed));

      const neighbors = adj.get(node) || [];
      for (const neighbor of neighbors) {
        await dfs(neighbor);
      }
    };

    await dfs(startNode);
    setCurrentNode(null);
    setIsAnimating(false);
    toast.success('DFS traversal complete!');
  };

  const handleReset = () => {
    setNodes([
      { id: 'A', x: 200, y: 50 },
      { id: 'B', x: 100, y: 150 },
      { id: 'C', x: 300, y: 150 },
      { id: 'D', x: 50, y: 250 },
      { id: 'E', x: 150, y: 250 },
      { id: 'F', x: 250, y: 250 },
    ]);
    setEdges([
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
    ]);
    setVisitedNodes([]);
    setCurrentNode(null);
    setSelectedNode(null);
    toast.info('Graph reset to default');
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setVisitedNodes([]);
    setCurrentNode(null);
    setSelectedNode(null);
    toast.info('Graph cleared');
  };

  const handleMouseDown = (id: string) => {
    if (!isAnimating) {
      setDraggingNode(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNode && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = Math.max(20, Math.min(380, e.clientX - rect.left));
      const y = Math.max(20, Math.min(280, e.clientY - rect.top));
      setNodes(nodes.map(n => (n.id === draggingNode ? { ...n, x, y } : n)));
    }
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Interactive Graph Visualizer</h3>
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

      {/* Graph Visualization */}
      <div className="mb-6 bg-muted/30 rounded-lg border border-border overflow-hidden">
        <svg
          ref={svgRef}
          width="100%"
          height="300"
          viewBox="0 0 400 300"
          className="cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Edges */}
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const isVisited =
              visitedNodes.includes(edge.from) && visitedNodes.includes(edge.to);
            return (
              <line
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isVisited ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                strokeWidth={isVisited ? 3 : 2}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isCurrent = currentNode === node.id;
            const isVisited = visitedNodes.includes(node.id);
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  fill={
                    isCurrent
                      ? 'hsl(var(--primary))'
                      : isVisited
                      ? 'hsl(150 70% 45%)'
                      : 'hsl(var(--card))'
                  }
                  stroke={
                    isCurrent
                      ? 'hsl(var(--primary))'
                      : isVisited
                      ? 'hsl(150 70% 45%)'
                      : 'hsl(var(--border))'
                  }
                  strokeWidth={2}
                  className={`cursor-grab transition-all duration-300 ${
                    isCurrent ? 'drop-shadow-[0_0_10px_hsl(var(--primary))]' : ''
                  }`}
                  onMouseDown={() => handleMouseDown(node.id)}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isCurrent || isVisited ? 'white' : 'hsl(var(--foreground))'}
                  fontSize="14"
                  fontWeight="bold"
                  className="pointer-events-none select-none"
                >
                  {node.id}
                </text>
                {!isAnimating && (
                  <g
                    onClick={() => handleDeleteNode(node.id)}
                    className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <circle cx={node.x + 15} cy={node.y - 15} r={8} fill="hsl(var(--destructive))" />
                    <text
                      x={node.x + 15}
                      y={node.y - 15}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="10"
                    >
                      ×
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Buttons */}
      <div className="flex gap-2 mb-6">
        <Button
          onClick={handleBFS}
          disabled={isAnimating || nodes.length === 0}
          variant={traversalType === 'bfs' ? 'default' : 'outline'}
          className="flex-1"
        >
          <Play className="w-4 h-4 mr-2" />
          Run BFS
        </Button>
        <Button
          onClick={handleDFS}
          disabled={isAnimating || nodes.length === 0}
          variant={traversalType === 'dfs' ? 'default' : 'outline'}
          className="flex-1"
        >
          <Play className="w-4 h-4 mr-2" />
          Run DFS
        </Button>
      </div>

      {/* Traversal Info */}
      {visitedNodes.length > 0 && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>Visited Order:</strong>{' '}
            {visitedNodes.map((n, i) => (
              <span key={n}>
                <span className={`font-mono ${currentNode === n ? 'text-primary font-bold' : ''}`}>
                  {n}
                </span>
                {i < visitedNodes.length - 1 && ' → '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Add Node</label>
          <div className="flex gap-2">
            <Input
              placeholder="Label (A-Z)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, 2))}
              onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
              className="bg-muted/50 border-border uppercase"
              maxLength={2}
            />
            <Button onClick={handleAddNode} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Add Edge</label>
          <div className="flex gap-2">
            <Input
              placeholder="From"
              value={edgeFrom}
              onChange={(e) => setEdgeFrom(e.target.value.slice(0, 2))}
              className="bg-muted/50 border-border uppercase w-20"
              maxLength={2}
            />
            <Input
              placeholder="To"
              value={edgeTo}
              onChange={(e) => setEdgeTo(e.target.value.slice(0, 2))}
              onKeyPress={(e) => e.key === 'Enter' && handleAddEdge()}
              className="bg-muted/50 border-border uppercase w-20"
              maxLength={2}
            />
            <Button onClick={handleAddEdge} className="bg-primary hover:bg-primary/90">
              <Link2 className="w-4 h-4" />
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
            <span className="text-sm font-mono text-foreground w-16 text-center">
              {animationSpeed}ms
            </span>
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

      {/* Instructions */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Drag nodes to reposition them. Click the × on a node to delete it.
        </p>
      </div>
    </div>
  );
};

export default GraphVisualizer;
