// Code snippets for each topic in the code playground
export const topicCodeSnippets: Record<string, string> = {
  'arrays': `// Array Operations in JavaScript
const arr = [10, 20, 30, 40, 50];

// Access by index - O(1)
console.log("Element at index 2:", arr[2]);

// Insert at end - O(1)
arr.push(60);
console.log("After push:", arr);

// Insert at beginning - O(n)
arr.unshift(5);
console.log("After unshift:", arr);

// Delete from end - O(1)
arr.pop();
console.log("After pop:", arr);

// Find element - O(n)
const index = arr.indexOf(30);
console.log("Index of 30:", index);

// Iterate through array
console.log("All elements:");
arr.forEach((val, i) => console.log(\`  [\${i}]: \${val}\`));`,

  'linked-lists': `// Linked List Implementation
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Insert at beginning - O(1)
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }
  
  // Insert at end - O(n)
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }
  
  // Print list
  print() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(" -> ") + " -> null");
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
console.log("Linked List:");
list.print();
console.log("Size:", list.size);`,

  'stacks': `// Stack Implementation (LIFO)
class Stack {
  constructor() {
    this.items = [];
  }
  
  // Push - O(1)
  push(item) {
    this.items.push(item);
    console.log(\`Pushed: \${item}\`);
  }
  
  // Pop - O(1)
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow!");
      return null;
    }
    const item = this.items.pop();
    console.log(\`Popped: \${item}\`);
    return item;
  }
  
  // Peek - O(1)
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  print() {
    console.log("Stack (top to bottom):", [...this.items].reverse().join(" <- "));
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.print();
console.log("Top element:", stack.peek());
stack.pop();
stack.print();`,

  'queues': `// Queue Implementation (FIFO)
class Queue {
  constructor() {
    this.items = [];
  }
  
  // Enqueue - O(1)
  enqueue(item) {
    this.items.push(item);
    console.log(\`Enqueued: \${item}\`);
  }
  
  // Dequeue - O(n) with array, O(1) with linked list
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue Underflow!");
      return null;
    }
    const item = this.items.shift();
    console.log(\`Dequeued: \${item}\`);
    return item;
  }
  
  // Front - O(1)
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  print() {
    console.log("Queue (front to rear):", this.items.join(" <- "));
  }
}

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
queue.print();
console.log("Front:", queue.front());
queue.dequeue();
queue.print();`,

  'bubble-sort': `// Bubble Sort Implementation
function bubbleSort(arr) {
  const n = arr.length;
  const sorted = [...arr];
  let swaps = 0;
  
  console.log("Original:", sorted.join(", "));
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        // Swap adjacent elements
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        swapped = true;
        swaps++;
      }
    }
    
    console.log(\`Pass \${i + 1}:\`, sorted.join(", "));
    
    // Optimization: if no swaps, array is sorted
    if (!swapped) {
      console.log("No swaps needed, array is sorted!");
      break;
    }
  }
  
  console.log("\\nTotal swaps:", swaps);
  return sorted;
}

const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("\\nBubble Sort Demo\\n");
const result = bubbleSort(arr);
console.log("\\nSorted:", result.join(", "));`,

  'selection-sort': `// Selection Sort Implementation
function selectionSort(arr) {
  const n = arr.length;
  const sorted = [...arr];
  
  console.log("Original:", sorted.join(", "));
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find minimum in unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (sorted[j] < sorted[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap minimum with first unsorted element
    if (minIdx !== i) {
      [sorted[i], sorted[minIdx]] = [sorted[minIdx], sorted[i]];
      console.log(\`Swap \${sorted[minIdx]} with \${sorted[i]}\`);
    }
    
    console.log(\`Pass \${i + 1}:\`, sorted.join(", "));
  }
  
  return sorted;
}

const arr = [64, 25, 12, 22, 11];
console.log("\\nSelection Sort Demo\\n");
const result = selectionSort(arr);
console.log("\\nSorted:", result.join(", "));`,

  'binary-search': `// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let steps = 0;
  
  console.log("Searching for:", target);
  console.log("Array:", arr.join(", "));
  console.log("");
  
  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
    
    console.log(\`Step \${steps}: left=\${left}, right=\${right}, mid=\${mid}, arr[mid]=\${arr[mid]}\`);
    
    if (arr[mid] === target) {
      console.log(\`\\nFound \${target} at index \${mid} in \${steps} steps!\`);
      return mid;
    }
    
    if (arr[mid] < target) {
      console.log(\`\${arr[mid]} < \${target}, search right half\`);
      left = mid + 1;
    } else {
      console.log(\`\${arr[mid]} > \${target}, search left half\`);
      right = mid - 1;
    }
  }
  
  console.log(\`\\n\${target} not found after \${steps} steps\`);
  return -1;
}

// Array must be sorted!
const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log("Binary Search Demo\\n");
binarySearch(arr, 23);`,

  'bfs': `// Breadth-First Search (BFS)
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const order = [];
  
  console.log("Starting BFS from node:", start);
  console.log("");
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    if (!visited.has(node)) {
      visited.add(node);
      order.push(node);
      console.log(\`Visit: \${node}, Queue: [\${queue.join(", ")}]\`);
      
      // Add unvisited neighbors to queue
      for (const neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
  
  return order;
}

// Graph represented as adjacency list
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log("Graph:");
for (const [node, neighbors] of Object.entries(graph)) {
  console.log(\`  \${node} -> \${neighbors.join(", ")}\`);
}
console.log("");

const result = bfs(graph, 'A');
console.log("\\nBFS Order:", result.join(" -> "));`,

  'dfs': `// Depth-First Search (DFS)
function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log("Visit:", start);
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
  
  return visited;
}

// Iterative DFS with explicit stack
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];
  
  console.log("\\nIterative DFS from:", start);
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      order.push(node);
      console.log(\`Visit: \${node}, Stack: [\${stack.join(", ")}]\`);
      
      // Add neighbors in reverse order for correct traversal
      const neighbors = graph[node] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
  
  return order;
}

const graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': ['F'],
  'F': []
};

console.log("Graph:");
for (const [node, neighbors] of Object.entries(graph)) {
  console.log(\`  \${node} -> [\${neighbors.join(", ")}]\`);
}

console.log("\\nRecursive DFS:");
dfs(graph, 'A');

const result = dfsIterative(graph, 'A');
console.log("\\nDFS Order:", result.join(" -> "));`,

  'dynamic-programming': `// Dynamic Programming Examples

// 1. Fibonacci with Memoization (Top-Down)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 2. Fibonacci with Tabulation (Bottom-Up)
function fibTab(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 3. Climbing Stairs (How many ways to climb n stairs, 1 or 2 steps)
function climbStairs(n) {
  if (n <= 2) return n;
  
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log("Dynamic Programming Demo\\n");

console.log("Fibonacci (Memoization):");
for (let i = 0; i <= 10; i++) {
  console.log(\`  F(\${i}) = \${fibMemo(i)}\`);
}

console.log("\\nFibonacci (Tabulation):");
console.log(\`  F(20) = \${fibTab(20)}\`);
console.log(\`  F(30) = \${fibTab(30)}\`);

console.log("\\nClimbing Stairs:");
for (let n = 1; n <= 6; n++) {
  console.log(\`  Ways to climb \${n} stairs: \${climbStairs(n)}\`);
}`,

  'bit-manipulation': `// Bit Manipulation Examples

// Basic operations
console.log("Basic Bit Operations:");
console.log("5 & 3 (AND):", 5 & 3);   // 101 & 011 = 001 = 1
console.log("5 | 3 (OR):", 5 | 3);    // 101 | 011 = 111 = 7
console.log("5 ^ 3 (XOR):", 5 ^ 3);   // 101 ^ 011 = 110 = 6
console.log("~5 (NOT):", ~5);          // Flips all bits
console.log("5 << 1 (Left Shift):", 5 << 1);  // 10 (multiply by 2)
console.log("5 >> 1 (Right Shift):", 5 >> 1); // 2 (divide by 2)

// Check if power of 2
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

console.log("\\nPower of 2 check:");
[1, 2, 3, 4, 8, 15, 16, 32].forEach(n => {
  console.log(\`  \${n}: \${isPowerOfTwo(n)}\`);
});

// Count set bits
function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

console.log("\\nCount set bits:");
[7, 8, 15, 16].forEach(n => {
  console.log(\`  \${n} (binary: \${n.toString(2)}): \${countSetBits(n)} bits\`);
});

// Find single number (all others appear twice)
function findSingle(arr) {
  return arr.reduce((xor, num) => xor ^ num, 0);
}

console.log("\\nFind single number:");
const arr = [4, 1, 2, 1, 2];
console.log(\`  Array: [\${arr.join(", ")}]\`);
console.log(\`  Single: \${findSingle(arr)}\`);`,

  'hashing': `// Hash Table Implementation
class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []);
    this.count = 0;
  }
  
  // Simple hash function
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * (i + 1)) % this.size;
    }
    return hash;
  }
  
  // Insert - O(1) average
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        console.log(\`Updated: \${key} = \${value} at index \${index}\`);
        return;
      }
    }
    
    bucket.push([key, value]);
    this.count++;
    console.log(\`Inserted: \${key} = \${value} at index \${index}\`);
  }
  
  // Lookup - O(1) average
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }
  
  print() {
    console.log("\\nHash Table Contents:");
    this.buckets.forEach((bucket, i) => {
      if (bucket.length > 0) {
        const items = bucket.map(([k, v]) => \`\${k}:\${v}\`).join(", ");
        console.log(\`  [\${i}]: \${items}\`);
      }
    });
  }
}

const ht = new HashTable(7);
console.log("Hash Table Demo\\n");

ht.set("apple", 5);
ht.set("banana", 8);
ht.set("cherry", 3);
ht.set("date", 12);
ht.set("elderberry", 7);

ht.print();

console.log("\\nLookups:");
console.log("  apple:", ht.get("apple"));
console.log("  cherry:", ht.get("cherry"));
console.log("  grape:", ht.get("grape"));`,

  'default': `// Data Structures & Algorithms Playground
// Try out different algorithms here!

// Example: Check if a string is a palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log("Palindrome Check:");
["racecar", "hello", "A man a plan a canal Panama"].forEach(s => {
  console.log(\`  "\${s}": \${isPalindrome(s)}\`);
});

// Example: Find all pairs that sum to target
function findPairs(arr, target) {
  const pairs = [];
  const seen = new Set();
  
  for (const num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    seen.add(num);
  }
  return pairs;
}

console.log("\\nFind pairs summing to 10:");
const nums = [2, 4, 3, 5, 6, 8, 7, 1];
console.log("  Array:", nums.join(", "));
console.log("  Pairs:", JSON.stringify(findPairs(nums, 10)));

// Example: Reverse a linked list (array simulation)
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  const result = [...arr];
  
  while (left < right) {
    [result[left], result[right]] = [result[right], result[left]];
    left++;
    right--;
  }
  return result;
}

console.log("\\nReverse Array:");
console.log("  Original: [1, 2, 3, 4, 5]");
console.log("  Reversed:", reverseArray([1, 2, 3, 4, 5]).join(", "));`
};

export const getTopicCode = (topicId: string): string => {
  return topicCodeSnippets[topicId] || topicCodeSnippets['default'];
};
