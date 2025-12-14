export interface DSATopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  color: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  description: string;
  topics: DSATopic[];
}

export const dsaCategories: TopicCategory[] = [
  {
    id: 'basic-ds',
    name: 'Basic Data Structures',
    description: 'Fundamental building blocks of programming',
    topics: [
      {
        id: 'arrays',
        title: 'Arrays',
        description: 'Linear data structure storing elements in contiguous memory',
        icon: '📊',
        category: 'basic-ds',
        difficulty: 'beginner',
        color: 'cyan',
      },
      {
        id: 'strings',
        title: 'Strings',
        description: 'Sequence of characters for text manipulation',
        icon: '📝',
        category: 'basic-ds',
        difficulty: 'beginner',
        color: 'green',
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        description: 'Dynamic data structure with nodes connected by pointers',
        icon: '🔗',
        category: 'basic-ds',
        difficulty: 'beginner',
        color: 'purple',
      },
      {
        id: 'stacks',
        title: 'Stacks',
        description: 'LIFO (Last In, First Out) data structure',
        icon: '📚',
        category: 'basic-ds',
        difficulty: 'beginner',
        color: 'orange',
      },
      {
        id: 'queues',
        title: 'Queues',
        description: 'FIFO (First In, First Out) data structure',
        icon: '🚶',
        category: 'basic-ds',
        difficulty: 'beginner',
        color: 'pink',
      },
    ],
  },
  {
    id: 'advanced-ds',
    name: 'Advanced Data Structures',
    description: 'Complex structures for efficient operations',
    topics: [
      {
        id: 'trees',
        title: 'Trees',
        description: 'Hierarchical data structure with root and child nodes',
        icon: '🌳',
        category: 'advanced-ds',
        difficulty: 'intermediate',
        color: 'green',
      },
      {
        id: 'binary-search-trees',
        title: 'Binary Search Trees',
        description: 'Ordered binary tree for fast search operations',
        icon: '🔍',
        category: 'advanced-ds',
        difficulty: 'intermediate',
        color: 'cyan',
      },
      {
        id: 'heaps',
        title: 'Heaps',
        description: 'Complete binary tree maintaining heap property',
        icon: '⛰️',
        category: 'advanced-ds',
        difficulty: 'intermediate',
        color: 'orange',
      },
      {
        id: 'hash-tables',
        title: 'Hash Tables',
        description: 'Key-value pairs with O(1) average access time',
        icon: '#️⃣',
        category: 'advanced-ds',
        difficulty: 'intermediate',
        color: 'purple',
      },
      {
        id: 'graphs',
        title: 'Graphs',
        description: 'Network of nodes connected by edges',
        icon: '🕸️',
        category: 'advanced-ds',
        difficulty: 'advanced',
        color: 'pink',
      },
    ],
  },
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    description: 'Techniques to arrange data in order',
    topics: [
      {
        id: 'bubble-sort',
        title: 'Bubble Sort',
        description: 'Simple comparison-based sorting algorithm',
        icon: '🫧',
        category: 'sorting',
        difficulty: 'beginner',
        color: 'cyan',
      },
      {
        id: 'selection-sort',
        title: 'Selection Sort',
        description: 'Find minimum and place at beginning',
        icon: '👆',
        category: 'sorting',
        difficulty: 'beginner',
        color: 'green',
      },
      {
        id: 'insertion-sort',
        title: 'Insertion Sort',
        description: 'Build sorted array one element at a time',
        icon: '📥',
        category: 'sorting',
        difficulty: 'beginner',
        color: 'orange',
      },
      {
        id: 'merge-sort',
        title: 'Merge Sort',
        description: 'Divide and conquer with O(n log n) complexity',
        icon: '🔀',
        category: 'sorting',
        difficulty: 'intermediate',
        color: 'purple',
      },
      {
        id: 'quick-sort',
        title: 'Quick Sort',
        description: 'Efficient divide and conquer using pivots',
        icon: '⚡',
        category: 'sorting',
        difficulty: 'intermediate',
        color: 'pink',
      },
    ],
  },
  {
    id: 'searching',
    name: 'Searching Algorithms',
    description: 'Efficient ways to find elements',
    topics: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        description: 'Sequential search through all elements',
        icon: '➡️',
        category: 'searching',
        difficulty: 'beginner',
        color: 'cyan',
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Efficient search in sorted arrays',
        icon: '✂️',
        category: 'searching',
        difficulty: 'beginner',
        color: 'green',
      },
      {
        id: 'bfs',
        title: 'Breadth First Search',
        description: 'Level-by-level graph traversal',
        icon: '🌊',
        category: 'searching',
        difficulty: 'intermediate',
        color: 'purple',
      },
      {
        id: 'dfs',
        title: 'Depth First Search',
        description: 'Deep traversal before backtracking',
        icon: '🏊',
        category: 'searching',
        difficulty: 'intermediate',
        color: 'orange',
      },
    ],
  },
];

export const getAllTopics = (): DSATopic[] => {
  return dsaCategories.flatMap(category => category.topics);
};

export const getTopicById = (id: string): DSATopic | undefined => {
  return getAllTopics().find(topic => topic.id === id);
};

export const getCategoryByTopicId = (topicId: string): TopicCategory | undefined => {
  return dsaCategories.find(category => 
    category.topics.some(topic => topic.id === topicId)
  );
};
