import { TopicContent } from '../topicContents';

export const heapContent: TopicContent = {
  id: 'heaps',
  definition: 'A Heap is a complete binary tree-based data structure that satisfies the heap property. In a Max-Heap, parent nodes are always greater than or equal to their children. In a Min-Heap, parent nodes are always less than or equal to their children. Heaps are commonly implemented using arrays.',
  keyPoints: [
    'Complete binary tree structure',
    'Max-Heap: parent ≥ children, Min-Heap: parent ≤ children',
    'Root always contains max (Max-Heap) or min (Min-Heap)',
    'Efficiently implemented using arrays',
    'Parent at index i, children at 2i+1 and 2i+2',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

// Max Heap structure
typedef struct {
    int arr[MAX_SIZE];
    int size;
} MaxHeap;

// Initialize heap
void initHeap(MaxHeap* heap) {
    heap->size = 0;
}

// Get parent, left child, right child indices
int parent(int i) { return (i - 1) / 2; }
int leftChild(int i) { return 2 * i + 1; }
int rightChild(int i) { return 2 * i + 2; }

// Swap two elements
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Heapify up (for insertion)
void heapifyUp(MaxHeap* heap, int i) {
    while (i > 0 && heap->arr[parent(i)] < heap->arr[i]) {
        swap(&heap->arr[parent(i)], &heap->arr[i]);
        i = parent(i);
    }
}

// Heapify down (for deletion)
void heapifyDown(MaxHeap* heap, int i) {
    int largest = i;
    int left = leftChild(i);
    int right = rightChild(i);
    
    if (left < heap->size && heap->arr[left] > heap->arr[largest])
        largest = left;
    if (right < heap->size && heap->arr[right] > heap->arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(&heap->arr[i], &heap->arr[largest]);
        heapifyDown(heap, largest);
    }
}

// Insert element
void insert(MaxHeap* heap, int value) {
    if (heap->size >= MAX_SIZE) {
        printf("Heap Overflow!\\n");
        return;
    }
    heap->arr[heap->size] = value;
    heapifyUp(heap, heap->size);
    heap->size++;
}

// Extract maximum
int extractMax(MaxHeap* heap) {
    if (heap->size <= 0) {
        printf("Heap Underflow!\\n");
        return -1;
    }
    int max = heap->arr[0];
    heap->arr[0] = heap->arr[heap->size - 1];
    heap->size--;
    heapifyDown(heap, 0);
    return max;
}

// Get maximum without removing
int getMax(MaxHeap* heap) {
    return (heap->size > 0) ? heap->arr[0] : -1;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Using STL priority_queue (Max-Heap by default)
int main() {
    priority_queue<int> maxHeap;
    
    // Insert elements
    maxHeap.push(10);
    maxHeap.push(30);
    maxHeap.push(20);
    
    // Get max
    cout << "Max: " << maxHeap.top() << endl;  // 30
    
    // Extract max
    maxHeap.pop();
    cout << "After pop, Max: " << maxHeap.top() << endl;  // 20
    
    // Min-Heap using greater<int>
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(20);
    cout << "Min: " << minHeap.top() << endl;  // 10
    
    return 0;
}

// Custom Max-Heap Implementation
class MaxHeap {
private:
    vector<int> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
    void heapifyUp(int i) {
        while (i > 0 && heap[parent(i)] < heap[i]) {
            swap(heap[parent(i)], heap[i]);
            i = parent(i);
        }
    }
    
    void heapifyDown(int i) {
        int largest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < heap.size() && heap[left] > heap[largest])
            largest = left;
        if (right < heap.size() && heap[right] > heap[largest])
            largest = right;
        
        if (largest != i) {
            swap(heap[i], heap[largest]);
            heapifyDown(largest);
        }
    }
    
public:
    void insert(int value) {
        heap.push_back(value);
        heapifyUp(heap.size() - 1);
    }
    
    int extractMax() {
        if (heap.empty()) return -1;
        int max = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
        return max;
    }
    
    int getMax() { return heap.empty() ? -1 : heap[0]; }
    int size() { return heap.size(); }
    bool isEmpty() { return heap.empty(); }
};`,
    },
    {
      language: 'Java',
      code: `import java.util.PriorityQueue;
import java.util.Collections;
import java.util.ArrayList;

public class HeapExample {
    public static void main(String[] args) {
        // Min-Heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(30);
        minHeap.add(10);
        minHeap.add(20);
        
        System.out.println("Min: " + minHeap.peek());  // 10
        System.out.println("Extracted: " + minHeap.poll());  // 10
        
        // Max-Heap using Collections.reverseOrder()
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.add(10);
        maxHeap.add(30);
        maxHeap.add(20);
        
        System.out.println("Max: " + maxHeap.peek());  // 30
        System.out.println("Extracted: " + maxHeap.poll());  // 30
    }
}

// Custom Max-Heap Implementation
class MaxHeap {
    private ArrayList<Integer> heap;
    
    public MaxHeap() {
        heap = new ArrayList<>();
    }
    
    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }
    
    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
    
    private void heapifyUp(int i) {
        while (i > 0 && heap.get(parent(i)) < heap.get(i)) {
            swap(parent(i), i);
            i = parent(i);
        }
    }
    
    private void heapifyDown(int i) {
        int largest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < heap.size() && heap.get(left) > heap.get(largest))
            largest = left;
        if (right < heap.size() && heap.get(right) > heap.get(largest))
            largest = right;
        
        if (largest != i) {
            swap(i, largest);
            heapifyDown(largest);
        }
    }
    
    public void insert(int value) {
        heap.add(value);
        heapifyUp(heap.size() - 1);
    }
    
    public int extractMax() {
        if (heap.isEmpty()) return -1;
        int max = heap.get(0);
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);
        heapifyDown(0);
        return max;
    }
    
    public int getMax() { return heap.isEmpty() ? -1 : heap.get(0); }
    public int size() { return heap.size(); }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Custom Max-Heap Implementation
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }
    
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            this.swap(this.parent(i), i);
            i = this.parent(i);
        }
    }
    
    heapifyDown(i) {
        let largest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);
        
        if (left < this.heap.length && this.heap[left] > this.heap[largest])
            largest = left;
        if (right < this.heap.length && this.heap[right] > this.heap[largest])
            largest = right;
        
        if (largest !== i) {
            this.swap(i, largest);
            this.heapifyDown(largest);
        }
    }
    
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMax() {
        if (this.heap.length === 0) return null;
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        if (this.heap.length > 0) this.heapifyDown(0);
        return max;
    }
    
    getMax() { return this.heap[0] || null; }
    size() { return this.heap.length; }
    isEmpty() { return this.heap.length === 0; }
}

// Min-Heap (just change comparison operators)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    heapifyUp(i) {
        while (i > 0 && this.heap[Math.floor((i-1)/2)] > this.heap[i]) {
            [this.heap[Math.floor((i-1)/2)], this.heap[i]] = 
                [this.heap[i], this.heap[Math.floor((i-1)/2)]];
            i = Math.floor((i-1)/2);
        }
    }
    
    // ... similar structure with reversed comparisons
}

// Usage
const heap = new MaxHeap();
heap.insert(10);
heap.insert(30);
heap.insert(20);
console.log(heap.getMax());      // 30
console.log(heap.extractMax());  // 30`,
    },
    {
      language: 'Python',
      code: `import heapq  # Python's heapq is a Min-Heap

# Min-Heap using heapq
min_heap = []
heapq.heappush(min_heap, 30)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 20)

print("Min:", min_heap[0])  # 10
print("Extracted:", heapq.heappop(min_heap))  # 10

# Max-Heap using negative values
max_heap = []
heapq.heappush(max_heap, -30)
heapq.heappush(max_heap, -10)
heapq.heappush(max_heap, -20)

print("Max:", -max_heap[0])  # 30
print("Extracted:", -heapq.heappop(max_heap))  # 30

# Heapify existing list
arr = [5, 3, 8, 1, 2]
heapq.heapify(arr)  # Converts to min-heap in O(n)

# Custom Max-Heap Class
class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:
            self.heap[self.parent(i)], self.heap[i] = \\
                self.heap[i], self.heap[self.parent(i)]
            i = self.parent(i)
    
    def heapify_down(self, i):
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < len(self.heap) and self.heap[left] > self.heap[largest]:
            largest = left
        if right < len(self.heap) and self.heap[right] > self.heap[largest]:
            largest = right
        
        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self.heapify_down(largest)
    
    def insert(self, value):
        self.heap.append(value)
        self.heapify_up(len(self.heap) - 1)
    
    def extract_max(self):
        if not self.heap:
            return None
        max_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        if self.heap:
            self.heapify_down(0)
        return max_val
    
    def get_max(self):
        return self.heap[0] if self.heap else None
    
    def size(self):
        return len(self.heap)`,
    },
  ],
  types: [
    {
      name: 'Max-Heap',
      description: 'Parent node is always greater than or equal to children. Root has maximum value.',
    },
    {
      name: 'Min-Heap',
      description: 'Parent node is always less than or equal to children. Root has minimum value.',
    },
    {
      name: 'Binary Heap',
      description: 'Complete binary tree satisfying heap property, typically array-based.',
    },
    {
      name: 'Fibonacci Heap',
      description: 'Collection of trees with better amortized time for decrease-key and merge.',
    },
  ],
  operations: [
    { name: 'Insert', description: 'Add element and heapify up', timeComplexity: 'O(log n)' },
    { name: 'Extract Max/Min', description: 'Remove and return root', timeComplexity: 'O(log n)' },
    { name: 'Get Max/Min', description: 'View root without removing', timeComplexity: 'O(1)' },
    { name: 'Heapify', description: 'Convert array to heap', timeComplexity: 'O(n)' },
    { name: 'Decrease/Increase Key', description: 'Change priority of element', timeComplexity: 'O(log n)' },
    { name: 'Delete', description: 'Remove specific element', timeComplexity: 'O(log n)' },
  ],
  advantages: [
    'Efficient priority queue operations',
    'O(1) access to max/min element',
    'Array implementation is cache-friendly',
    'Foundation for heap sort O(n log n)',
    'Useful for scheduling and graph algorithms',
  ],
  disadvantages: [
    'Search for arbitrary element is O(n)',
    'Not stable (doesn\'t preserve insertion order)',
    'Not cache-efficient for very large heaps',
    'Decrease-key can be expensive in binary heap',
    'No efficient union/merge operation',
  ],
  applications: [
    'Priority queues implementation',
    'Heap Sort algorithm',
    'Dijkstra\'s shortest path algorithm',
    'Prim\'s minimum spanning tree',
    'Finding k largest/smallest elements',
    'Job scheduling systems',
  ],
};
