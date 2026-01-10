import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, GitBranch } from 'lucide-react';

type Complexity = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(2ⁿ)' | 'O(n!)' | 'O(V+E)' | 'O(V)' | 'O(E)' | 'O(V log V)' | 'O(V²)' | 'O(E log V)' | 'O(E log E)' | 'N/A';

interface DataStructureComplexity {
  name: string;
  access: Complexity;
  search: Complexity;
  insertion: Complexity;
  deletion: Complexity;
  spaceComplexity: Complexity;
}

interface AlgorithmComplexity {
  name: string;
  category: string;
  bestCase: Complexity;
  averageCase: Complexity;
  worstCase: Complexity;
  spaceComplexity: Complexity;
}

const dataStructures: DataStructureComplexity[] = [
  { name: 'Array', access: 'O(1)', search: 'O(n)', insertion: 'O(n)', deletion: 'O(n)', spaceComplexity: 'O(n)' },
  { name: 'Stack', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', spaceComplexity: 'O(n)' },
  { name: 'Queue', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', spaceComplexity: 'O(n)' },
  { name: 'Singly Linked List', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', spaceComplexity: 'O(n)' },
  { name: 'Doubly Linked List', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', spaceComplexity: 'O(n)' },
  { name: 'Hash Table', access: 'N/A', search: 'O(1)', insertion: 'O(1)', deletion: 'O(1)', spaceComplexity: 'O(n)' },
  { name: 'Binary Search Tree', access: 'O(log n)', search: 'O(log n)', insertion: 'O(log n)', deletion: 'O(log n)', spaceComplexity: 'O(n)' },
  { name: 'AVL Tree', access: 'O(log n)', search: 'O(log n)', insertion: 'O(log n)', deletion: 'O(log n)', spaceComplexity: 'O(n)' },
  { name: 'Heap', access: 'N/A', search: 'O(n)', insertion: 'O(log n)', deletion: 'O(log n)', spaceComplexity: 'O(n)' },
  { name: 'Graph (Adjacency List)', access: 'O(1)', search: 'O(V)', insertion: 'O(1)', deletion: 'O(E)', spaceComplexity: 'O(n)' },
];

const algorithms: AlgorithmComplexity[] = [
  { name: 'Bubble Sort', category: 'Sorting', bestCase: 'O(n)', averageCase: 'O(n²)', worstCase: 'O(n²)', spaceComplexity: 'O(1)' },
  { name: 'Selection Sort', category: 'Sorting', bestCase: 'O(n²)', averageCase: 'O(n²)', worstCase: 'O(n²)', spaceComplexity: 'O(1)' },
  { name: 'Insertion Sort', category: 'Sorting', bestCase: 'O(n)', averageCase: 'O(n²)', worstCase: 'O(n²)', spaceComplexity: 'O(1)' },
  { name: 'Merge Sort', category: 'Sorting', bestCase: 'O(n log n)', averageCase: 'O(n log n)', worstCase: 'O(n log n)', spaceComplexity: 'O(n)' },
  { name: 'Quick Sort', category: 'Sorting', bestCase: 'O(n log n)', averageCase: 'O(n log n)', worstCase: 'O(n²)', spaceComplexity: 'O(log n)' },
  { name: 'Heap Sort', category: 'Sorting', bestCase: 'O(n log n)', averageCase: 'O(n log n)', worstCase: 'O(n log n)', spaceComplexity: 'O(1)' },
  { name: 'Linear Search', category: 'Searching', bestCase: 'O(1)', averageCase: 'O(n)', worstCase: 'O(n)', spaceComplexity: 'O(1)' },
  { name: 'Binary Search', category: 'Searching', bestCase: 'O(1)', averageCase: 'O(log n)', worstCase: 'O(log n)', spaceComplexity: 'O(1)' },
  { name: 'BFS', category: 'Graph', bestCase: 'O(V+E)', averageCase: 'O(V+E)', worstCase: 'O(V+E)', spaceComplexity: 'O(n)' },
  { name: 'DFS', category: 'Graph', bestCase: 'O(V+E)', averageCase: 'O(V+E)', worstCase: 'O(V+E)', spaceComplexity: 'O(n)' },
  { name: "Dijkstra's", category: 'Graph', bestCase: 'O(V+E)', averageCase: 'O(V log V)', worstCase: 'O(V²)', spaceComplexity: 'O(n)' },
  { name: "Prim's MST", category: 'Graph', bestCase: 'O(E log V)', averageCase: 'O(E log V)', worstCase: 'O(E log V)', spaceComplexity: 'O(n)' },
  { name: "Kruskal's MST", category: 'Graph', bestCase: 'O(E log E)', averageCase: 'O(E log E)', worstCase: 'O(E log E)', spaceComplexity: 'O(n)' },
];

const getComplexityColor = (complexity: Complexity): string => {
  if (complexity === 'O(1)') return 'bg-green/20 text-green border-green/30';
  if (complexity === 'O(log n)') return 'bg-cyan/20 text-cyan border-cyan/30';
  if (complexity === 'O(n)' || complexity === 'O(V)' || complexity === 'O(E)') return 'bg-yellow/20 text-yellow border-yellow/30';
  if (complexity === 'O(n log n)' || complexity === 'O(V+E)' || complexity === 'O(V log V)' || complexity === 'O(E log V)' || complexity === 'O(E log E)') 
    return 'bg-orange/20 text-orange border-orange/30';
  if (complexity === 'O(n²)' || complexity === 'O(V²)') return 'bg-pink/20 text-pink border-pink/30';
  if (complexity === 'O(2ⁿ)' || complexity === 'O(n!)') return 'bg-destructive/20 text-destructive border-destructive/30';
  return 'bg-muted text-muted-foreground border-border';
};
const ComplexityBadge = ({ complexity }: { complexity: Complexity }) => (
  <Badge variant="outline" className={`font-mono text-xs ${getComplexityColor(complexity)}`}>
    {complexity}
  </Badge>
);

const ComplexityTable = () => {
  const [activeTab, setActiveTab] = useState('data-structures');

  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Complexity Comparison</h2>
        <p className="text-muted-foreground">
          Compare time and space complexity across data structures and algorithms
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="data-structures" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Structures
            </TabsTrigger>
            <TabsTrigger value="algorithms" className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Algorithms
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="data-structures" className="p-6 pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Data Structure</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Access</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Search</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Insertion</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Deletion</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Space</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataStructures.map((ds) => (
                  <TableRow key={ds.name} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{ds.name}</TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={ds.access} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={ds.search} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={ds.insertion} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={ds.deletion} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={ds.spaceComplexity} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="algorithms" className="p-6 pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Algorithm</TableHead>
                  <TableHead className="text-foreground font-semibold">Category</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Best</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Average</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Worst</TableHead>
                  <TableHead className="text-foreground font-semibold text-center">Space</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {algorithms.map((algo) => (
                  <TableRow key={algo.name} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{algo.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {algo.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={algo.bestCase} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={algo.averageCase} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={algo.worstCase} />
                    </TableCell>
                    <TableCell className="text-center">
                      <ComplexityBadge complexity={algo.spaceComplexity} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <div className="p-6 border-t border-border bg-muted/30">
        <p className="text-sm text-muted-foreground mb-3">Complexity Legend:</p>
        <div className="flex flex-wrap gap-2">
          {(['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'] as Complexity[]).map((c) => (
            <ComplexityBadge key={c} complexity={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplexityTable;
