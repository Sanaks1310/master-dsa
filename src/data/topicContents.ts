export interface TopicContent {
  id: string;
  definition: string;
  keyPoints: string[];
  syntax: {
    language: string;
    code: string;
  }[];
  types: {
    name: string;
    description: string;
  }[];
  operations: {
    name: string;
    description: string;
    timeComplexity: string;
  }[];
  advantages: string[];
  disadvantages: string[];
  applications: string[];
}

import { linkedListContent } from './topics/linkedListContent';
import { stackContent } from './topics/stackContent';
import { queueContent } from './topics/queueContent';
import { treeContent } from './topics/treeContent';
import { bstContent } from './topics/bstContent';
import { heapContent } from './topics/heapContent';
import { hashTableContent } from './topics/hashTableContent';
import { graphContent } from './topics/graphContent';
import { algorithmContent } from './topics/algorithmContent';
import { dataStructureContent } from './topics/dataStructureContent';
import { pseudoCodeContent } from './topics/pseudoCodeContent';
import { programmingConstructsContent } from './topics/programmingConstructsContent';
import { timeComplexityContent } from './topics/timeComplexityContent';
import { spaceComplexityContent } from './topics/spaceComplexityContent';
import { bigOContent } from './topics/bigOContent';
import { caseAnalysisContent } from './topics/caseAnalysisContent';
import { recursionBasicsContent } from './topics/recursionBasicsContent';
import { iterationVsRecursionContent } from './topics/iterationVsRecursionContent';
import { arrayContent } from './topics/arrayContent';
import { stringsContent } from './topics/stringsContent';
import { singlyLinkedListContent } from './topics/singlyLinkedListContent';
import { doublyLinkedListContent } from './topics/doublyLinkedListContent';
import { circularLinkedListContent } from './topics/circularLinkedListContent';
import { linearSearchContent } from './topics/linearSearchContent';
import { binarySearchContent } from './topics/binarySearchContent';
import { bubbleSortContent } from './topics/bubbleSortContent';
import { selectionSortContent } from './topics/selectionSortContent';
import { insertionSortContent } from './topics/insertionSortContent';
import { mergeSortContent } from './topics/mergeSortContent';
import { quickSortContent } from './topics/quickSortContent';
import { heapSortContent } from './topics/heapSortContent';
import { treeTerminologyContent } from './topics/treeTerminologyContent';
import { binaryTreeContent } from './topics/binaryTreeContent';
import { bfsContent } from './topics/bfsContent';
import { dfsContent } from './topics/dfsContent';
import { graphBasicsContent } from './topics/graphBasicsContent';
import { cycleDetectionContent } from './topics/cycleDetectionContent';
import { topologicalSortContent } from './topics/topologicalSortContent';
import { divideAndConquerContent } from './topics/divideAndConquerContent';
import { greedyAlgorithmsContent } from './topics/greedyAlgorithmsContent';
import { backtrackingContent } from './topics/backtrackingContent';
import { dynamicProgrammingContent } from './topics/dynamicProgrammingContent';
import { bitManipulationContent } from './topics/bitManipulationContent';
import { hashingContent } from './topics/hashingContent';
import { shortestPathContent } from './topics/shortestPathContent';
import { mstContent } from './topics/mstContent';
import { disjointSetContent } from './topics/disjointSetContent';

export const topicContents: Record<string, TopicContent> = {
  // Level 0 - Prerequisites
  'what-is-algorithm': algorithmContent,
  'what-is-data-structure': dataStructureContent,
  'pseudo-code': pseudoCodeContent,
  'programming-constructs': programmingConstructsContent,
  // Level 1 - DSA Basics
  'time-complexity': timeComplexityContent,
  'space-complexity': spaceComplexityContent,
  'big-o-notation': bigOContent,
  'case-analysis': caseAnalysisContent,
  'recursion-basics': recursionBasicsContent,
  'iteration-vs-recursion': iterationVsRecursionContent,
  // Level 2 - Linear Data Structures
  'arrays': arrayContent,
  'strings': stringsContent,
  'singly-linked-list': singlyLinkedListContent,
  'doubly-linked-list': doublyLinkedListContent,
  'circular-linked-list': circularLinkedListContent,
  'linked-lists': linkedListContent,
  'stacks': stackContent,
  'simple-queue': queueContent,
  'circular-queue': queueContent,
  'deque': queueContent,
  'priority-queue': queueContent,
  'queues': queueContent,
  // Level 3 - Searching & Sorting
  'linear-search': linearSearchContent,
  'binary-search': binarySearchContent,
  'bubble-sort': bubbleSortContent,
  'selection-sort': selectionSortContent,
  'insertion-sort': insertionSortContent,
  'merge-sort': mergeSortContent,
  'quick-sort': quickSortContent,
  'heap-sort': heapSortContent,
  // Level 4 - Non-Linear Data Structures
  'tree-terminology': treeTerminologyContent,
  'binary-tree': binaryTreeContent,
  'trees': treeContent,
  'binary-search-trees': bstContent,
  'heaps': heapContent,
  'hash-tables': hashTableContent,
  'graph-basics': graphBasicsContent,
  'graphs': graphContent,
  'bfs': bfsContent,
  'dfs': dfsContent,
  'cycle-detection': cycleDetectionContent,
  'topological-sort': topologicalSortContent,
  // Level 5 - Algorithm Techniques
  'divide-and-conquer': divideAndConquerContent,
  'greedy-algorithms': greedyAlgorithmsContent,
  'backtracking': backtrackingContent,
  'dynamic-programming': dynamicProgrammingContent,
  // Level 6 - Advanced Topics
  'bit-manipulation': bitManipulationContent,
  'hashing': hashingContent,
  'shortest-path': shortestPathContent,
  'minimum-spanning-tree': mstContent,
  'disjoint-set': disjointSetContent,
};

export const getTopicContent = (id: string): TopicContent | undefined => {
  return topicContents[id];
};
