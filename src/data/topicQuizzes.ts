import { QuizQuestion } from '@/components/QuizSection';

export const topicQuizzes: Record<string, QuizQuestion[]> = {
  'arrays': [
    {
      question: 'What is the time complexity of accessing an element by index in an array?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 0,
      explanation: 'Arrays provide constant time O(1) access because elements are stored in contiguous memory locations, allowing direct calculation of memory address using the index.'
    },
    {
      question: 'What happens when you insert an element at the beginning of an array?',
      options: [
        'Only the first element is affected',
        'All elements need to be shifted right',
        'The array size doubles automatically',
        'Nothing, arrays cannot insert at the beginning'
      ],
      correctAnswer: 1,
      explanation: 'Inserting at the beginning requires shifting all existing elements one position to the right to make room for the new element, resulting in O(n) time complexity.'
    },
    {
      question: 'Which of the following is NOT a characteristic of arrays?',
      options: [
        'Fixed size in most languages',
        'Contiguous memory allocation',
        'Constant time insertion anywhere',
        'Index-based access'
      ],
      correctAnswer: 2,
      explanation: 'Insertion in arrays is O(1) only at the end (if space available). Inserting elsewhere requires shifting elements, making it O(n).'
    },
    {
      question: 'What is the space complexity of an array of n elements?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'An array of n elements requires O(n) space as each element occupies a fixed amount of memory.'
    },
    {
      question: 'In a 0-indexed array of size n, what is the index of the last element?',
      options: ['n', 'n-1', 'n+1', '1'],
      correctAnswer: 1,
      explanation: 'In 0-indexed arrays, indices range from 0 to n-1. Therefore, the last element is at index n-1.'
    }
  ],
  'linked-lists': [
    {
      question: 'What is the main advantage of linked lists over arrays?',
      options: [
        'Faster random access',
        'Dynamic size and efficient insertion/deletion',
        'Less memory usage',
        'Better cache performance'
      ],
      correctAnswer: 1,
      explanation: 'Linked lists can grow dynamically and allow O(1) insertion/deletion once you have a reference to the node, unlike arrays which may need to shift elements.'
    },
    {
      question: 'What is the time complexity of searching for an element in a singly linked list?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 2,
      explanation: 'Linked lists do not support random access, so you must traverse from the head, visiting each node until you find the element, resulting in O(n) time.'
    },
    {
      question: 'How much extra memory does each node in a singly linked list require compared to just storing the data?',
      options: [
        'None',
        'One pointer/reference',
        'Two pointers/references',
        'An array of pointers'
      ],
      correctAnswer: 1,
      explanation: 'Each node in a singly linked list stores one pointer to the next node, in addition to the data.'
    },
    {
      question: 'What is the time complexity of deleting the first node in a linked list?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 0,
      explanation: 'Deleting the first node only requires updating the head pointer to point to the second node, which is O(1).'
    },
    {
      question: 'In a doubly linked list, what additional information does each node contain compared to a singly linked list?',
      options: [
        'A pointer to the head',
        'A pointer to the previous node',
        'The size of the list',
        'A hash of the data'
      ],
      correctAnswer: 1,
      explanation: 'Doubly linked lists have both next and previous pointers, allowing traversal in both directions.'
    }
  ],
  'stacks': [
    {
      question: 'Which principle does a stack follow?',
      options: ['FIFO', 'LIFO', 'LILO', 'Priority-based'],
      correctAnswer: 1,
      explanation: 'Stack follows Last-In-First-Out (LIFO) principle. The last element added is the first one to be removed.'
    },
    {
      question: 'What is the time complexity of push and pop operations in a stack?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'Both push and pop operations are O(1) as they only involve the top of the stack.'
    },
    {
      question: 'Which data structure is typically used to implement function call management in programming languages?',
      options: ['Queue', 'Stack', 'Tree', 'Graph'],
      correctAnswer: 1,
      explanation: 'The call stack is used to manage function calls, local variables, and return addresses. Each function call pushes a frame, and returning pops it.'
    },
    {
      question: 'What happens when you try to pop from an empty stack?',
      options: [
        'Returns null',
        'Stack underflow error',
        'Returns 0',
        'Nothing happens'
      ],
      correctAnswer: 1,
      explanation: 'Attempting to pop from an empty stack causes a stack underflow error, as there is no element to remove.'
    },
    {
      question: 'Which application does NOT typically use a stack?',
      options: [
        'Undo functionality in editors',
        'Browser back button history',
        'Print job scheduling',
        'Expression evaluation'
      ],
      correctAnswer: 2,
      explanation: 'Print job scheduling typically uses a queue (FIFO) to process jobs in the order they were received.'
    }
  ],
  'queues': [
    {
      question: 'Which principle does a queue follow?',
      options: ['LIFO', 'FIFO', 'LILO', 'Random access'],
      correctAnswer: 1,
      explanation: 'Queue follows First-In-First-Out (FIFO) principle. The first element added is the first one to be removed.'
    },
    {
      question: 'In a queue, which end is used for insertion and which for deletion?',
      options: [
        'Front for both',
        'Rear for both',
        'Rear for insertion, Front for deletion',
        'Front for insertion, Rear for deletion'
      ],
      correctAnswer: 2,
      explanation: 'Elements are added (enqueued) at the rear and removed (dequeued) from the front, maintaining FIFO order.'
    },
    {
      question: 'What is the time complexity of enqueue and dequeue operations?',
      options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
      correctAnswer: 1,
      explanation: 'Both enqueue and dequeue are O(1) operations when implemented with linked lists or circular arrays.'
    },
    {
      question: 'Which type of queue allows insertion and deletion at both ends?',
      options: ['Simple Queue', 'Circular Queue', 'Priority Queue', 'Deque'],
      correctAnswer: 3,
      explanation: 'Deque (Double-Ended Queue) allows insertion and deletion at both front and rear ends.'
    },
    {
      question: 'What real-world scenario best represents a queue?',
      options: [
        'A pile of plates',
        'A line at a ticket counter',
        'A deck of cards being shuffled',
        'A recursive function call'
      ],
      correctAnswer: 1,
      explanation: 'A line at a ticket counter follows FIFO - the first person in line is served first, just like a queue.'
    }
  ],
  'binary-tree': [
    {
      question: 'What is the maximum number of children a node can have in a binary tree?',
      options: ['1', '2', '3', 'Unlimited'],
      correctAnswer: 1,
      explanation: 'In a binary tree, each node can have at most 2 children, referred to as the left and right child.'
    },
    {
      question: 'What is the height of a tree with only one node (the root)?',
      options: ['0', '1', '2', 'Undefined'],
      correctAnswer: 0,
      explanation: 'The height of a tree with only the root node is 0, as there are no edges in the longest path from root to leaf.'
    },
    {
      question: 'How many nodes are in a complete binary tree of height h?',
      options: ['h + 1', '2^h', '2^(h+1) - 1', 'h * 2'],
      correctAnswer: 2,
      explanation: 'A complete binary tree of height h has 2^(h+1) - 1 nodes. For example, height 2 has 2³ - 1 = 7 nodes.'
    },
    {
      question: 'Which traversal visits nodes in the order: Left, Root, Right?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
      correctAnswer: 1,
      explanation: 'Inorder traversal visits the left subtree first, then the root, then the right subtree (Left-Root-Right).'
    },
    {
      question: 'What is a leaf node?',
      options: [
        'The root of the tree',
        'A node with no children',
        'A node with one child',
        'A node at level 1'
      ],
      correctAnswer: 1,
      explanation: 'A leaf node is a node that has no children. It is at the end of a branch in the tree.'
    }
  ],
  'binary-search-trees': [
    {
      question: 'What property must all nodes in a BST satisfy?',
      options: [
        'Left child > Parent > Right child',
        'Left child < Parent < Right child',
        'All children are equal',
        'Parent is always the smallest'
      ],
      correctAnswer: 1,
      explanation: 'In a BST, all nodes in the left subtree must be less than the parent, and all nodes in the right subtree must be greater.'
    },
    {
      question: 'What is the time complexity of searching in a balanced BST?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'In a balanced BST, each comparison eliminates half of the remaining nodes, giving O(log n) search time.'
    },
    {
      question: 'What is the worst-case time complexity of BST operations when the tree is skewed?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 2,
      explanation: 'A skewed BST resembles a linked list, where all operations degrade to O(n) as you may need to traverse all nodes.'
    },
    {
      question: 'What traversal of a BST gives elements in sorted order?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
      correctAnswer: 1,
      explanation: 'Inorder traversal (Left-Root-Right) of a BST always produces elements in ascending sorted order.'
    },
    {
      question: 'When deleting a node with two children in a BST, what is typically used to replace it?',
      options: [
        'The left child',
        'The right child',
        'The inorder successor or predecessor',
        'A random node'
      ],
      correctAnswer: 2,
      explanation: 'The inorder successor (smallest in right subtree) or predecessor (largest in left subtree) maintains BST property.'
    }
  ],
  'bubble-sort': [
    {
      question: 'What is the time complexity of bubble sort in the worst case?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctAnswer: 2,
      explanation: 'Bubble sort has O(n²) worst-case time complexity as it may need to make n passes, each comparing n-1 pairs.'
    },
    {
      question: 'What is the best-case time complexity of bubble sort (with optimization)?',
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      correctAnswer: 1,
      explanation: 'With the optimization to detect no swaps in a pass, bubble sort can achieve O(n) for already sorted arrays.'
    },
    {
      question: 'Is bubble sort a stable sorting algorithm?',
      options: [
        'Yes, equal elements maintain their relative order',
        'No, it always swaps equal elements',
        'Only for integer arrays',
        'Only when optimized'
      ],
      correctAnswer: 0,
      explanation: 'Bubble sort is stable because it only swaps adjacent elements when the left one is greater, preserving order of equal elements.'
    },
    {
      question: 'What is the space complexity of bubble sort?',
      options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
      correctAnswer: 3,
      explanation: 'Bubble sort is an in-place algorithm that only uses a constant amount of extra space for the swap operation.'
    },
    {
      question: 'After the first complete pass of bubble sort, what can we guarantee?',
      options: [
        'The array is sorted',
        'The smallest element is in its correct position',
        'The largest element is in its correct position',
        'Half the array is sorted'
      ],
      correctAnswer: 2,
      explanation: 'After the first pass, the largest element "bubbles up" to the last position, which is its correct sorted position.'
    }
  ],
  'binary-search': [
    {
      question: 'What is the prerequisite for binary search to work correctly?',
      options: [
        'The array must be of even length',
        'The array must be sorted',
        'The array must contain unique elements',
        'The array must be of prime length'
      ],
      correctAnswer: 1,
      explanation: 'Binary search requires a sorted array because it relies on comparing the target with the middle element to eliminate half the search space.'
    },
    {
      question: 'What is the time complexity of binary search?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'Binary search halves the search space with each comparison, resulting in O(log n) time complexity.'
    },
    {
      question: 'If an array has 1024 elements, at most how many comparisons does binary search need?',
      options: ['1024', '512', '10', '11'],
      correctAnswer: 2,
      explanation: 'log₂(1024) = 10, so binary search needs at most 10 comparisons. With one more for the final check, it is about 10-11.'
    },
    {
      question: 'What is the space complexity of iterative binary search?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'Iterative binary search uses only a constant amount of extra space for variables like low, high, and mid.'
    },
    {
      question: 'In binary search, if the target is greater than the middle element, what do we do?',
      options: [
        'Search the left half',
        'Search the right half',
        'Return not found',
        'Start from the beginning'
      ],
      correctAnswer: 1,
      explanation: 'If target > middle, the target must be in the right half (since the array is sorted), so we search from mid+1 to high.'
    }
  ],
  'bfs': [
    {
      question: 'What data structure does BFS primarily use?',
      options: ['Stack', 'Queue', 'Heap', 'Array'],
      correctAnswer: 1,
      explanation: 'BFS uses a queue to process nodes level by level, ensuring all neighbors at the current depth are visited before going deeper.'
    },
    {
      question: 'What is the time complexity of BFS for a graph with V vertices and E edges?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
      correctAnswer: 2,
      explanation: 'BFS visits each vertex once O(V) and explores each edge once O(E), giving total time complexity of O(V + E).'
    },
    {
      question: 'BFS is guaranteed to find the shortest path in which type of graph?',
      options: [
        'Weighted graphs',
        'Unweighted graphs',
        'Only trees',
        'Only cyclic graphs'
      ],
      correctAnswer: 1,
      explanation: 'BFS finds the shortest path in unweighted graphs because it explores all nodes at distance d before nodes at distance d+1.'
    },
    {
      question: 'Which of the following is NOT a typical application of BFS?',
      options: [
        'Finding shortest path in unweighted graph',
        'Level order traversal of a tree',
        'Topological sorting',
        'Finding connected components'
      ],
      correctAnswer: 2,
      explanation: 'Topological sorting is typically done using DFS, not BFS. BFS is used for level-order traversals and shortest paths.'
    },
    {
      question: 'What is the space complexity of BFS in the worst case?',
      options: ['O(1)', 'O(V)', 'O(E)', 'O(V + E)'],
      correctAnswer: 1,
      explanation: 'BFS may need to store all vertices in the queue in the worst case (e.g., a star graph), giving O(V) space.'
    }
  ],
  'dfs': [
    {
      question: 'What data structure does DFS primarily use?',
      options: ['Queue', 'Stack', 'Heap', 'Hash Table'],
      correctAnswer: 1,
      explanation: 'DFS uses a stack (either explicitly or through recursion call stack) to backtrack and explore as deep as possible first.'
    },
    {
      question: 'What is the time complexity of DFS for a graph with V vertices and E edges?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
      correctAnswer: 2,
      explanation: 'DFS visits each vertex once O(V) and explores each edge once O(E), giving total time complexity of O(V + E).'
    },
    {
      question: 'Which traversal order does DFS NOT directly produce for trees?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
      correctAnswer: 3,
      explanation: 'Level order traversal requires BFS. DFS naturally produces preorder, inorder, and postorder traversals.'
    },
    {
      question: 'What is a key application of DFS?',
      options: [
        'Finding shortest path in weighted graphs',
        'Detecting cycles in graphs',
        'Finding minimum spanning tree',
        'Load balancing'
      ],
      correctAnswer: 1,
      explanation: 'DFS is excellent for detecting cycles by tracking visited nodes and nodes currently in the recursion stack.'
    },
    {
      question: 'What is the space complexity of recursive DFS in the worst case?',
      options: ['O(1)', 'O(V)', 'O(E)', 'O(log V)'],
      correctAnswer: 1,
      explanation: 'The recursion stack may grow to O(V) in the worst case (e.g., a linear graph or skewed tree).'
    }
  ],
  'dynamic-programming': [
    {
      question: 'What are the two key properties that a problem must have for DP to be applicable?',
      options: [
        'Divide and Conquer, Sorting',
        'Optimal Substructure, Overlapping Subproblems',
        'Greedy Choice, Local Optimal',
        'Recursion, Iteration'
      ],
      correctAnswer: 1,
      explanation: 'DP requires optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems (same subproblems solved multiple times).'
    },
    {
      question: 'What is memoization?',
      options: [
        'Storing results of subproblems to avoid recomputation',
        'Memorizing the algorithm steps',
        'Writing code without comments',
        'Compressing data'
      ],
      correctAnswer: 0,
      explanation: 'Memoization is a top-down approach where we store (cache) results of subproblems and look them up when needed again.'
    },
    {
      question: 'What is the difference between top-down and bottom-up DP?',
      options: [
        'Top-down is faster',
        'Bottom-up uses recursion, top-down uses iteration',
        'Top-down uses recursion with memoization, bottom-up builds solutions iteratively',
        'There is no difference'
      ],
      correctAnswer: 2,
      explanation: 'Top-down (memoization) solves problems recursively and caches results. Bottom-up (tabulation) builds solutions from smaller subproblems iteratively.'
    },
    {
      question: 'What is the time complexity of computing Fibonacci(n) using DP?',
      options: ['O(2^n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correctAnswer: 2,
      explanation: 'With DP, each Fibonacci number is computed once and stored, giving O(n) time instead of O(2^n) with naive recursion.'
    },
    {
      question: 'Which is NOT a classic DP problem?',
      options: [
        'Longest Common Subsequence',
        'Knapsack Problem',
        'Finding Maximum in Array',
        'Edit Distance'
      ],
      correctAnswer: 2,
      explanation: 'Finding maximum in an array is a simple O(n) problem that does not require DP. The others have overlapping subproblems.'
    }
  ],
  'bit-manipulation': [
    {
      question: 'What is the result of 5 & 3 (bitwise AND)?',
      options: ['1', '2', '7', '8'],
      correctAnswer: 0,
      explanation: '5 = 101, 3 = 011. AND: 101 & 011 = 001 = 1. Both bits must be 1 for the result to be 1.'
    },
    {
      question: 'What does n & (n-1) do?',
      options: [
        'Doubles the number',
        'Clears the rightmost set bit',
        'Sets all bits to 1',
        'Reverses the bits'
      ],
      correctAnswer: 1,
      explanation: 'n & (n-1) clears the rightmost set bit. This is useful for counting set bits or checking powers of 2.'
    },
    {
      question: 'How can you check if a number is a power of 2 using bit manipulation?',
      options: [
        'n & 1 == 0',
        'n | (n-1) == 0',
        'n & (n-1) == 0 and n > 0',
        'n ^ n == 0'
      ],
      correctAnswer: 2,
      explanation: 'Powers of 2 have exactly one set bit. n & (n-1) clears that bit, leaving 0. We also check n > 0 to exclude 0.'
    },
    {
      question: 'What is the result of left shifting 1 by 3 positions (1 << 3)?',
      options: ['3', '4', '8', '16'],
      correctAnswer: 2,
      explanation: '1 << 3 moves the bit 3 positions left: 0001 → 1000 = 8. Left shift by n is equivalent to multiplying by 2^n.'
    },
    {
      question: 'What is XOR useful for?',
      options: [
        'Finding the sum of two numbers',
        'Finding a number that appears once when others appear twice',
        'Multiplying numbers',
        'Sorting arrays'
      ],
      correctAnswer: 1,
      explanation: 'XOR of a number with itself is 0. So when all numbers appear twice except one, XORing all gives the unique number.'
    }
  ],
  'hashing': [
    {
      question: 'What is the average time complexity of search in a hash table?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'With a good hash function, hash tables provide O(1) average time for search, insert, and delete operations.'
    },
    {
      question: 'What is a collision in hashing?',
      options: [
        'When the hash table is full',
        'When two different keys hash to the same index',
        'When a key cannot be hashed',
        'When the hash function fails'
      ],
      correctAnswer: 1,
      explanation: 'A collision occurs when two different keys produce the same hash value, mapping to the same array index.'
    },
    {
      question: 'Which is NOT a collision resolution technique?',
      options: [
        'Chaining',
        'Linear Probing',
        'Quadratic Probing',
        'Binary Search'
      ],
      correctAnswer: 3,
      explanation: 'Binary search is a search algorithm, not a collision resolution technique. Chaining and probing handle collisions.'
    },
    {
      question: 'What is the load factor in a hash table?',
      options: [
        'Number of collisions',
        'Size of the hash table',
        'Ratio of filled slots to total slots',
        'Number of hash functions used'
      ],
      correctAnswer: 2,
      explanation: 'Load factor = (number of elements) / (table size). It indicates how full the hash table is and affects performance.'
    },
    {
      question: 'What is the worst-case time complexity of hash table operations?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'In the worst case (all keys hash to the same index), operations degrade to O(n) as we must search through a chain.'
    }
  ],
  'shortest-path': [
    {
      question: 'What is the time complexity of Dijkstra\'s algorithm with a min-heap?',
      options: ['O(V²)', 'O(E log V)', 'O((V + E) log V)', 'O(V × E)'],
      correctAnswer: 2,
      explanation: 'With a min-heap, Dijkstra processes each vertex O(V) times and each edge causes a heap update O(log V), giving O((V+E) log V).'
    },
    {
      question: 'Can Dijkstra\'s algorithm handle negative edge weights?',
      options: [
        'Yes, always',
        'No, it may give incorrect results',
        'Only if there are no cycles',
        'Only for undirected graphs'
      ],
      correctAnswer: 1,
      explanation: 'Dijkstra assumes once a node is visited with minimum distance, it is finalized. Negative edges can violate this, giving wrong results.'
    },
    {
      question: 'Which algorithm can handle negative edge weights (without negative cycles)?',
      options: [
        'Dijkstra\'s Algorithm',
        'BFS',
        'Bellman-Ford Algorithm',
        'Prim\'s Algorithm'
      ],
      correctAnswer: 2,
      explanation: 'Bellman-Ford can handle negative weights and also detect negative cycles. It relaxes all edges V-1 times.'
    },
    {
      question: 'What is the initial distance assigned to the source vertex in Dijkstra?',
      options: ['Infinity', '0', '1', '-1'],
      correctAnswer: 1,
      explanation: 'The source vertex has distance 0 to itself. All other vertices start with infinity (unknown/unreachable).'
    },
    {
      question: 'What does "relaxation" mean in shortest path algorithms?',
      options: [
        'Removing an edge from the graph',
        'Updating distance if a shorter path is found',
        'Adding a new vertex',
        'Reversing edge directions'
      ],
      correctAnswer: 1,
      explanation: 'Relaxation checks if going through an intermediate vertex gives a shorter path, and updates the distance if so.'
    }
  ],
  'minimum-spanning-tree': [
    {
      question: 'How many edges does a minimum spanning tree have for a graph with V vertices?',
      options: ['V', 'V - 1', 'V + 1', 'E'],
      correctAnswer: 1,
      explanation: 'A spanning tree connects all V vertices with the minimum number of edges, which is V - 1 (any fewer would disconnect the graph).'
    },
    {
      question: 'What is the main difference between Kruskal\'s and Prim\'s algorithms?',
      options: [
        'Kruskal works on directed graphs only',
        'Prim\'s is always faster',
        'Kruskal selects edges globally, Prim grows from a vertex',
        'There is no difference'
      ],
      correctAnswer: 2,
      explanation: 'Kruskal sorts all edges and adds smallest that do not form cycles. Prim starts from one vertex and grows the tree by adding nearest vertices.'
    },
    {
      question: 'Which data structure does Kruskal\'s algorithm use to detect cycles efficiently?',
      options: [
        'Stack',
        'Queue',
        'Union-Find (Disjoint Set)',
        'Hash Table'
      ],
      correctAnswer: 2,
      explanation: 'Union-Find efficiently checks if adding an edge would create a cycle (if both vertices are in the same set) in nearly O(1) time.'
    },
    {
      question: 'What is the time complexity of Kruskal\'s algorithm?',
      options: ['O(V²)', 'O(E log E)', 'O(V + E)', 'O(E²)'],
      correctAnswer: 1,
      explanation: 'Kruskal\'s algorithm is dominated by sorting edges O(E log E). The Union-Find operations are nearly O(1) with path compression.'
    },
    {
      question: 'Can a graph have multiple valid minimum spanning trees?',
      options: [
        'No, there is always exactly one MST',
        'Yes, if some edges have equal weights',
        'Only if the graph is disconnected',
        'Only for directed graphs'
      ],
      correctAnswer: 1,
      explanation: 'If a graph has edges with equal weights, different valid choices during the algorithm can produce different MSTs with the same total weight.'
    }
  ],
  'disjoint-set': [
    {
      question: 'What are the two main operations of a Disjoint Set (Union-Find)?',
      options: [
        'Push and Pop',
        'Insert and Delete',
        'Find and Union',
        'Search and Sort'
      ],
      correctAnswer: 2,
      explanation: 'Find determines which set an element belongs to (finds the root), and Union merges two sets together.'
    },
    {
      question: 'What optimization flattens the tree structure during Find operations?',
      options: [
        'Union by Rank',
        'Path Compression',
        'Balancing',
        'Hashing'
      ],
      correctAnswer: 1,
      explanation: 'Path compression makes all nodes on the find path point directly to the root, flattening the tree for faster future operations.'
    },
    {
      question: 'What is the time complexity of Find and Union with both optimizations?',
      options: ['O(log n)', 'O(n)', 'O(α(n)) ≈ O(1)', 'O(n log n)'],
      correctAnswer: 2,
      explanation: 'With path compression and union by rank, operations take O(α(n)) time, where α is the inverse Ackermann function, practically constant.'
    },
    {
      question: 'How does Union by Rank work?',
      options: [
        'Always attach the second tree to the first',
        'Attach the shorter tree under the taller one',
        'Randomly choose which tree to attach',
        'Sort elements before unioning'
      ],
      correctAnswer: 1,
      explanation: 'Union by rank attaches the tree with smaller rank (height) under the root of the tree with larger rank, keeping trees balanced.'
    },
    {
      question: 'What is a common application of Union-Find?',
      options: [
        'Sorting arrays',
        'Finding shortest paths',
        'Detecting cycles in undirected graphs',
        'Binary search'
      ],
      correctAnswer: 2,
      explanation: 'Union-Find can detect if adding an edge creates a cycle: if both vertices are already in the same set, the edge would form a cycle.'
    }
  ]
};

// Default quiz for topics without specific quizzes
export const defaultQuiz: QuizQuestion[] = [
  {
    question: 'What is the purpose of analyzing time complexity?',
    options: [
      'To make code look more professional',
      'To understand how algorithm performance scales with input size',
      'To reduce the number of lines of code',
      'To improve code readability'
    ],
    correctAnswer: 1,
    explanation: 'Time complexity analysis helps us understand how an algorithm\'s runtime grows as the input size increases, allowing us to choose efficient algorithms.'
  },
  {
    question: 'Which notation is commonly used to describe the upper bound of an algorithm\'s time complexity?',
    options: ['Omega (Ω)', 'Theta (Θ)', 'Big O (O)', 'Lambda (λ)'],
    correctAnswer: 2,
    explanation: 'Big O notation describes the upper bound (worst case) of an algorithm\'s time complexity, showing how it performs in the worst scenario.'
  },
  {
    question: 'What does O(1) time complexity mean?',
    options: [
      'The algorithm takes 1 second',
      'The algorithm runs once',
      'The algorithm takes constant time regardless of input size',
      'The algorithm has one operation'
    ],
    correctAnswer: 2,
    explanation: 'O(1) means constant time - the algorithm takes the same amount of time regardless of how large the input is.'
  },
  {
    question: 'Which is more efficient for large inputs: O(n) or O(n²)?',
    options: ['O(n²)', 'O(n)', 'They are the same', 'Depends on the machine'],
    correctAnswer: 1,
    explanation: 'O(n) is more efficient for large inputs. As n grows, n² grows much faster than n, making O(n²) algorithms slower.'
  },
  {
    question: 'What is space complexity?',
    options: [
      'The physical space the code takes on disk',
      'The amount of memory an algorithm uses relative to input size',
      'The number of variables in the code',
      'The size of the output'
    ],
    correctAnswer: 1,
    explanation: 'Space complexity measures how much memory an algorithm requires as the input size grows, including auxiliary space for variables and data structures.'
  }
];

export const getTopicQuiz = (topicId: string): QuizQuestion[] => {
  return topicQuizzes[topicId] || defaultQuiz;
};
