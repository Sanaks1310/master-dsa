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
  arrays: {
    id: 'arrays',
    definition: 'An array is a linear data structure that stores a collection of elements of the same data type in contiguous memory locations. Each element can be accessed directly using its index, making arrays one of the most fundamental and widely used data structures in programming.',
    keyPoints: [
      'Elements are stored in contiguous memory locations',
      'Each element is accessed using an index (0-based in most languages)',
      'Fixed size in static arrays, dynamic in dynamic arrays',
      'Homogeneous data type - all elements must be of same type',
      'Random access in O(1) time complexity',
    ],
    syntax: [
      {
        language: 'C',
        code: `// Declaration and Initialization
int arr[5];                    // Declaration
int arr[] = {1, 2, 3, 4, 5};   // Initialization
int arr[5] = {1, 2, 3};        // Partial initialization

// Accessing elements
arr[0] = 10;                   // Setting value
int x = arr[2];                // Getting value

// Dynamic array using malloc
#include <stdlib.h>
int *arr = (int*)malloc(5 * sizeof(int));
arr[0] = 1;
free(arr);                     // Free memory`,
      },
      {
        language: 'C++',
        code: `// Declaration and Initialization
int arr[5];                    // Declaration
int arr[] = {1, 2, 3, 4, 5};   // Initialization
int arr[5] = {1, 2, 3};        // Partial initialization

// Accessing elements
arr[0] = 10;                   // Setting value
int x = arr[2];                // Getting value

// Dynamic array using vector
#include <vector>
vector<int> vec = {1, 2, 3};
vec.push_back(4);              // Add element
vec.pop_back();                // Remove last element`,
      },
      {
        language: 'Java',
        code: `// Declaration and Initialization
int[] arr;                     // Declaration
int[] arr = {1, 2, 3, 4, 5};   // Initialization
int[] arr = new int[5];        // Fixed size

// Accessing elements
arr[0] = 10;                   // Setting value
int x = arr[2];                // Getting value

// Dynamic array using ArrayList
import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(6);                   // Add element
list.remove(0);                // Remove at index
list.get(0);                   // Get element`,
      },
      {
        language: 'JavaScript',
        code: `// Declaration and Initialization
let arr = [];                  // Empty array
let arr = [1, 2, 3, 4, 5];     // With values
let arr = new Array(5);        // Fixed size

// Accessing elements
arr[0] = 10;                   // Setting value
let x = arr[2];                // Getting value

// Common methods
arr.push(6);                   // Add to end
arr.pop();                     // Remove from end
arr.unshift(0);                // Add to beginning
arr.shift();                   // Remove from beginning`,
      },
      {
        language: 'Python',
        code: `# Declaration and Initialization
arr = []                       # Empty list
arr = [1, 2, 3, 4, 5]          # With values
arr = [0] * 5                  # Size 5 with zeros

# Accessing elements
arr[0] = 10                    # Setting value
x = arr[2]                     # Getting value

# Common methods
arr.append(6)                  # Add to end
arr.pop()                      # Remove from end
arr.insert(0, -1)              # Insert at index
arr.remove(3)                  # Remove by value`,
      },
    ],
    types: [
      { name: 'One-Dimensional Array', description: 'A simple linear array with elements arranged in a single row. Access using single index.' },
      { name: 'Two-Dimensional Array (Matrix)', description: 'Array with rows and columns, accessed using two indices (row, column).' },
      { name: 'Multi-Dimensional Array', description: 'Arrays with three or more dimensions, used for complex data representation.' },
      { name: 'Dynamic Array', description: 'Arrays that can grow or shrink in size (like vector in C++, ArrayList in Java).' },
      { name: 'Jagged Array', description: 'Array of arrays where each sub-array can have different lengths.' },
    ],
    operations: [
      { name: 'Access', description: 'Get element at specific index', timeComplexity: 'O(1)' },
      { name: 'Search', description: 'Find element in array', timeComplexity: 'O(n)' },
      { name: 'Insert at End', description: 'Add element at the end', timeComplexity: 'O(1) amortized' },
      { name: 'Insert at Index', description: 'Add element at specific position', timeComplexity: 'O(n)' },
      { name: 'Delete at End', description: 'Remove last element', timeComplexity: 'O(1)' },
      { name: 'Delete at Index', description: 'Remove element at specific position', timeComplexity: 'O(n)' },
      { name: 'Update', description: 'Modify element at index', timeComplexity: 'O(1)' },
    ],
    advantages: [
      'Fast access time O(1) using index',
      'Cache-friendly due to contiguous memory',
      'Simple and easy to understand',
      'Efficient memory usage (no extra pointers)',
      'Works well with iteration and loops',
    ],
    disadvantages: [
      'Fixed size (static arrays)',
      'Expensive insertion/deletion O(n)',
      'Memory waste if not fully utilized',
      'Cannot store different data types',
      'Shifting required for mid insertions',
    ],
    applications: [
      'Storing and accessing sequential data',
      'Implementing other data structures (stacks, queues, heaps)',
      'Matrix operations in graphics and ML',
      'Lookup tables and hash tables',
      'Buffer in I/O operations',
    ],
  },
  'linked-lists': linkedListContent,
  'stacks': stackContent,
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
