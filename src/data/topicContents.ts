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

export const topicContents: Record<string, TopicContent> = {
  'what-is-algorithm': algorithmContent,
  'what-is-data-structure': dataStructureContent,
  'pseudo-code': pseudoCodeContent,
  'programming-constructs': programmingConstructsContent,
  'time-complexity': timeComplexityContent,
  'space-complexity': spaceComplexityContent,
  'big-o-notation': bigOContent,
  'case-analysis': caseAnalysisContent,
  'recursion-basics': recursionBasicsContent,
  'iteration-vs-recursion': iterationVsRecursionContent,
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
  'trees': treeContent,
  'binary-search-trees': bstContent,
  'heaps': heapContent,
  'hash-tables': hashTableContent,
  'graphs': graphContent,
};

export const getTopicContent = (id: string): TopicContent | undefined => {
  return topicContents[id];
};
