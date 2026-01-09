import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, Zap, BookOpen, Code, Play, Wrench, GitBranch, Brain, Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CodeBlock from '@/components/CodeBlock';
import ArrayVisualizer from '@/components/ArrayVisualizer';
import TreeVisualizer from '@/components/TreeVisualizer';
import GraphVisualizer from '@/components/GraphVisualizer';
import HeapVisualizer from '@/components/HeapVisualizer';
import ArrayAnimation from '@/components/ArrayAnimation';
import AlgorithmAnimation from '@/components/AlgorithmAnimation';
import FlowchartDiagram from '@/components/FlowchartDiagram';
import CodePlayground from '@/components/CodePlayground';
import QuizSection from '@/components/QuizSection';
import { getTopicById, getCategoryByTopicId } from '@/data/dsaTopics';
import { getTopicContent } from '@/data/topicContents';
import { getTopicQuiz } from '@/data/topicQuizzes';
import { getTopicCode } from '@/data/topicCodeSnippets';
import {
  algorithmAnimationSteps, 
  dataStructureAnimationSteps, 
  pseudoCodeAnimationSteps, 
  programmingConstructsAnimationSteps,
  timeComplexityAnimationSteps,
  recursionAnimationSteps,
  arrayAnimationSteps,
  stringAnimationSteps,
  linkedListAnimationSteps,
  stackAnimationSteps,
  queueAnimationSteps,
  linearSearchAnimationSteps,
  binarySearchAnimationSteps,
  bubbleSortAnimationSteps,
  selectionSortAnimationSteps,
  mergeSortAnimationSteps,
  quickSortAnimationSteps,
  bfsAnimationSteps,
  dfsAnimationSteps,
  treeAnimationSteps,
  divideAndConquerAnimationSteps,
  greedyAnimationSteps,
  backtrackingAnimationSteps,
  dynamicProgrammingAnimationSteps,
  bitManipulationAnimationSteps,
  hashingAnimationSteps,
  shortestPathAnimationSteps,
  mstAnimationSteps,
  disjointSetAnimationSteps,
  topicFlowcharts 
} from '@/data/topicAnimations';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const insertionAnimationSteps = [
  {
    description: 'Initial array with 5 elements. We want to insert value 4 at index 2.',
    highlightedIndices: [],
    values: [1, 3, 5, 7, 9],
    pointers: [{ index: 2, label: 'insert here' }],
  },
  {
    description: 'Shift element at index 4 to index 5 to make room.',
    highlightedIndices: [4],
    values: [1, 3, 5, 7, 9],
  },
  {
    description: 'Shift element at index 3 to index 4.',
    highlightedIndices: [3],
    values: [1, 3, 5, 7, 9, 9],
  },
  {
    description: 'Shift element at index 2 to index 3.',
    highlightedIndices: [2],
    values: [1, 3, 5, 5, 7, 9],
  },
  {
    description: 'Now index 2 is free. Insert value 4 at index 2.',
    highlightedIndices: [2],
    values: [1, 3, 5, 5, 7, 9],
    pointers: [{ index: 2, label: 'insert 4' }],
  },
  {
    description: 'Insertion complete! Value 4 is now at index 2.',
    highlightedIndices: [2],
    values: [1, 3, 4, 5, 7, 9],
  },
];

const getTopicAnimation = (topicId: string) => {
  switch (topicId) {
    case 'what-is-algorithm': return algorithmAnimationSteps;
    case 'what-is-data-structure': return dataStructureAnimationSteps;
    case 'pseudo-code': return pseudoCodeAnimationSteps;
    case 'programming-constructs': return programmingConstructsAnimationSteps;
    case 'time-complexity': return timeComplexityAnimationSteps;
    case 'space-complexity': return timeComplexityAnimationSteps;
    case 'big-o-notation': return timeComplexityAnimationSteps;
    case 'recursion-basics': return recursionAnimationSteps;
    case 'iteration-vs-recursion': return recursionAnimationSteps;
    case 'arrays': return arrayAnimationSteps;
    case 'strings': return stringAnimationSteps;
    case 'linked-lists': return linkedListAnimationSteps;
    case 'singly-linked-list': return linkedListAnimationSteps;
    case 'doubly-linked-list': return linkedListAnimationSteps;
    case 'circular-linked-list': return linkedListAnimationSteps;
    case 'stacks': return stackAnimationSteps;
    case 'queues': return queueAnimationSteps;
    case 'simple-queue': return queueAnimationSteps;
    case 'circular-queue': return queueAnimationSteps;
    case 'deque': return queueAnimationSteps;
    case 'priority-queue': return queueAnimationSteps;
    case 'linear-search': return linearSearchAnimationSteps;
    case 'binary-search': return binarySearchAnimationSteps;
    case 'bubble-sort': return bubbleSortAnimationSteps;
    case 'selection-sort': return selectionSortAnimationSteps;
    case 'insertion-sort': return selectionSortAnimationSteps;
    case 'merge-sort': return mergeSortAnimationSteps;
    case 'quick-sort': return quickSortAnimationSteps;
    case 'heap-sort': return selectionSortAnimationSteps;
    // Level 4 - Non-Linear Data Structures
    case 'tree-terminology': return treeAnimationSteps;
    case 'binary-tree': return treeAnimationSteps;
    case 'binary-search-trees': return treeAnimationSteps;
    case 'heaps': return treeAnimationSteps;
    case 'graph-basics': return bfsAnimationSteps;
    case 'bfs': return bfsAnimationSteps;
    case 'dfs': return dfsAnimationSteps;
    case 'cycle-detection': return dfsAnimationSteps;
    case 'topological-sort': return dfsAnimationSteps;
    // Level 5 - Algorithm Techniques
    case 'divide-and-conquer': return divideAndConquerAnimationSteps;
    case 'greedy-algorithms': return greedyAnimationSteps;
    case 'backtracking': return backtrackingAnimationSteps;
    case 'dynamic-programming': return dynamicProgrammingAnimationSteps;
    // Level 6 - Advanced Topics
    case 'bit-manipulation': return bitManipulationAnimationSteps;
    case 'hashing': return hashingAnimationSteps;
    case 'shortest-path': return shortestPathAnimationSteps;
    case 'minimum-spanning-tree': return mstAnimationSteps;
    case 'disjoint-set': return disjointSetAnimationSteps;
    default: return null;
  }
};

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId || '');
  const category = getCategoryByTopicId(topicId || '');
  const content = getTopicContent(topicId || '');

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Topic Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumb & Header */}
          <div className="mb-12">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </Link>
            
            <div className="flex items-start gap-6">
              <span className="text-6xl">{topic.icon}</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-muted-foreground">{category?.name}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    topic.difficulty === 'beginner' ? 'bg-green/20 text-green' :
                    topic.difficulty === 'intermediate' ? 'bg-orange/20 text-orange' :
                    'bg-pink/20 text-pink'
                  }`}>
                    {topic.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                  {topic.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {topic.description}
                </p>
              </div>
            </div>
          </div>

          {content ? (
            <div className="space-y-12">
              {/* Definition Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Definition</h2>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <p className="text-foreground leading-relaxed text-lg">
                    {content.definition}
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Types Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Types</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.types.map((type, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
                      <h3 className="font-bold text-foreground mb-2">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Syntax Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Syntax & Code Examples</h2>
                </div>
                <Tabs defaultValue={content.syntax[0]?.language} className="w-full">
                  <TabsList className="bg-muted/50 border border-border mb-4">
                    {content.syntax.map((syn) => (
                      <TabsTrigger 
                        key={syn.language} 
                        value={syn.language}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {syn.language}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {content.syntax.map((syn) => (
                    <TabsContent key={syn.language} value={syn.language}>
                      <CodeBlock code={syn.code} language={syn.language} />
                    </TabsContent>
                  ))}
                </Tabs>
              </section>

              {/* Operations & Time Complexity */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Operations & Time Complexity</h2>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="text-left py-4 px-6 text-foreground font-semibold">Operation</th>
                        <th className="text-left py-4 px-6 text-foreground font-semibold">Description</th>
                        <th className="text-left py-4 px-6 text-foreground font-semibold">Time Complexity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.operations.map((op, index) => (
                        <tr key={index} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6 font-medium text-foreground">{op.name}</td>
                          <td className="py-4 px-6 text-muted-foreground">{op.description}</td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                              {op.timeComplexity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Advantages & Disadvantages */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-green/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Advantages</h3>
                  </div>
                  <div className="bg-card border border-green/20 rounded-xl p-5 space-y-3">
                    {content.advantages.map((adv, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Disadvantages</h3>
                  </div>
                  <div className="bg-card border border-destructive/20 rounded-xl p-5 space-y-3">
                    {content.disadvantages.map((dis, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{dis}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Flowchart Section */}
              {topicId && topicFlowcharts[topicId] && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-purple" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Flowchart</h2>
                  </div>
                  <FlowchartDiagram {...topicFlowcharts[topicId]} />
                </section>
              )}

              {/* Animation Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-pink/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-pink" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">How It Works - Animation</h2>
                </div>
                {topicId && getTopicAnimation(topicId) ? (
                  <AlgorithmAnimation
                    title={`${topic.title} Animation`}
                    description="Watch step-by-step how this concept works"
                    steps={getTopicAnimation(topicId)!}
                  />
                ) : (
                  <ArrayAnimation
                    title="Array Insertion Animation"
                    description="Watch how insertion works in an array - elements are shifted to make room for the new element."
                    steps={insertionAnimationSteps}
                  />
                )}
              </section>

              {/* Interactive Visualizers */}
              {topicId === 'arrays' && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-cyan" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Build Your Own Array</h2>
                  </div>
                  <ArrayVisualizer />
                </section>
              )}

              {/* Tree Visualizer for tree-related topics */}
              {(topicId === 'binary-tree' || topicId === 'binary-search-trees' || topicId === 'tree-terminology') && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-orange/20 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-orange" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Build Your Own Tree</h2>
                  </div>
                  <TreeVisualizer />
                </section>
              )}

              {/* Heap Visualizer for heap topic */}
              {topicId === 'heaps' && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-purple" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Build Your Own Heap</h2>
                  </div>
                  <HeapVisualizer />
                </section>
              )}

              {/* Graph Visualizer for graph-related topics */}
              {(topicId === 'graph-basics' || topicId === 'bfs' || topicId === 'dfs' || topicId === 'cycle-detection' || topicId === 'topological-sort') && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-pink/20 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-pink" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Build Your Own Graph</h2>
                  </div>
                  <GraphVisualizer />
                </section>
              )}

              {/* Code Playground */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Code Playground</h2>
                </div>
                <CodePlayground 
                  initialCode={getTopicCode(topicId || '')}
                  title={`${topic.title} - Try It Yourself`}
                  description="Experiment with the code below. Modify it and run to see results!"
                />
              </section>

              {/* Quiz Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Test Your Knowledge</h2>
                </div>
                <QuizSection 
                  title={`${topic.title} Quiz`}
                  questions={getTopicQuiz(topicId || '')}
                />
              </section>

              {/* Applications */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Real-World Applications</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.applications.map((app, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{app}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                Detailed content for this topic is coming soon!
              </p>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Explore Other Topics
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicPage;
