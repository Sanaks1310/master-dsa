import { TopicContent } from '../topicContents';

export const queueContent: TopicContent = {
  id: 'queues',
  definition: 'A Queue is a linear data structure that follows the First In, First Out (FIFO) principle. Elements are added at one end (rear) and removed from the other end (front). Think of it like a line of people waiting - the first person in line is the first to be served.',
  keyPoints: [
    'FIFO (First In, First Out) principle',
    'Elements added at rear (enqueue)',
    'Elements removed from front (dequeue)',
    'Front and rear pointers track both ends',
    'Used in scheduling and buffering',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>
#define MAX 100

// Queue structure
struct Queue {
    int arr[MAX];
    int front, rear;
};

// Initialize queue
void init(struct Queue* q) {
    q->front = q->rear = -1;
}

// Check if empty
int isEmpty(struct Queue* q) {
    return q->front == -1;
}

// Check if full
int isFull(struct Queue* q) {
    return q->rear == MAX - 1;
}

// Enqueue (add element)
void enqueue(struct Queue* q, int data) {
    if (isFull(q)) {
        printf("Queue Overflow!\\n");
        return;
    }
    if (q->front == -1) q->front = 0;
    q->arr[++q->rear] = data;
}

// Dequeue (remove element)
int dequeue(struct Queue* q) {
    if (isEmpty(q)) {
        printf("Queue Underflow!\\n");
        return -1;
    }
    int item = q->arr[q->front];
    if (q->front == q->rear) {
        q->front = q->rear = -1;
    } else {
        q->front++;
    }
    return item;
}

// Peek front element
int peek(struct Queue* q) {
    if (isEmpty(q)) return -1;
    return q->arr[q->front];
}

// Circular Queue Implementation
struct CircularQueue {
    int arr[MAX];
    int front, rear, size;
};

void cqInit(struct CircularQueue* q) {
    q->front = q->rear = -1;
    q->size = 0;
}

void cqEnqueue(struct CircularQueue* q, int data) {
    if (q->size == MAX) {
        printf("Queue Full!\\n");
        return;
    }
    if (q->front == -1) q->front = 0;
    q->rear = (q->rear + 1) % MAX;
    q->arr[q->rear] = data;
    q->size++;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <queue>
using namespace std;

// Using STL queue
int main() {
    queue<int> q;
    
    // Enqueue elements
    q.push(10);
    q.push(20);
    q.push(30);
    
    // Front and back elements
    cout << "Front: " << q.front() << endl;  // 10
    cout << "Back: " << q.back() << endl;    // 30
    
    // Dequeue element
    q.pop();
    cout << "After pop, Front: " << q.front() << endl;  // 20
    
    // Check size and empty
    cout << "Size: " << q.size() << endl;  // 2
    cout << "Is empty: " << q.empty() << endl;  // 0
    
    return 0;
}

// Custom Queue Class
class Queue {
private:
    int* arr;
    int front, rear, capacity;
    
public:
    Queue(int size = 100) {
        arr = new int[size];
        capacity = size;
        front = rear = -1;
    }
    
    ~Queue() { delete[] arr; }
    
    void enqueue(int data) {
        if (rear == capacity - 1) {
            cout << "Queue Overflow!" << endl;
            return;
        }
        if (front == -1) front = 0;
        arr[++rear] = data;
    }
    
    int dequeue() {
        if (front == -1 || front > rear) {
            cout << "Queue Underflow!" << endl;
            return -1;
        }
        return arr[front++];
    }
    
    int peek() { return (front == -1) ? -1 : arr[front]; }
    bool isEmpty() { return front == -1 || front > rear; }
    int size() { return (front == -1) ? 0 : rear - front + 1; }
};

// Priority Queue
#include <queue>
priority_queue<int> maxHeap;  // Max at top
priority_queue<int, vector<int>, greater<int>> minHeap;  // Min at top`,
    },
    {
      language: 'Java',
      code: `import java.util.LinkedList;
import java.util.Queue;
import java.util.PriorityQueue;

public class QueueExample {
    public static void main(String[] args) {
        // Using LinkedList as Queue
        Queue<Integer> queue = new LinkedList<>();
        
        // Enqueue elements
        queue.add(10);      // Throws exception if full
        queue.offer(20);    // Returns false if full
        queue.offer(30);
        
        // Peek front element
        System.out.println("Front: " + queue.peek());  // 10
        
        // Dequeue element
        System.out.println("Removed: " + queue.poll());  // 10
        
        // Check size and empty
        System.out.println("Size: " + queue.size());  // 2
        System.out.println("Is empty: " + queue.isEmpty());  // false
        
        // Priority Queue (Min-Heap by default)
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(30);
        pq.add(10);
        pq.add(20);
        System.out.println("Priority Queue Poll: " + pq.poll());  // 10
    }
}

// Custom Queue Implementation
class CustomQueue {
    private int[] arr;
    private int front, rear, capacity;
    
    public CustomQueue(int size) {
        arr = new int[size];
        capacity = size;
        front = rear = -1;
    }
    
    public void enqueue(int data) {
        if (rear == capacity - 1) {
            System.out.println("Queue Overflow!");
            return;
        }
        if (front == -1) front = 0;
        arr[++rear] = data;
    }
    
    public int dequeue() {
        if (front == -1 || front > rear) {
            System.out.println("Queue Underflow!");
            return -1;
        }
        return arr[front++];
    }
    
    public int peek() {
        return (front == -1) ? -1 : arr[front];
    }
    
    public boolean isEmpty() { return front == -1 || front > rear; }
    public int size() { return (front == -1) ? 0 : rear - front + 1; }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Using Array as Queue (not efficient for dequeue)
const queue = [];

// Enqueue elements
queue.push(10);
queue.push(20);
queue.push(30);

// Peek front element
console.log("Front:", queue[0]);  // 10

// Dequeue element (O(n) - shifts all elements)
console.log("Removed:", queue.shift());  // 10

// Custom Queue Class (Efficient)
class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    
    // Enqueue element
    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
    }
    
    // Dequeue element (O(1))
    dequeue() {
        if (this.isEmpty()) {
            return "Queue Underflow!";
        }
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }
    
    // Peek front element
    peek() {
        if (this.isEmpty()) {
            return "Queue is empty!";
        }
        return this.items[this.frontIndex];
    }
    
    // Check if empty
    isEmpty() {
        return this.frontIndex === this.backIndex;
    }
    
    // Get size
    size() {
        return this.backIndex - this.frontIndex;
    }
}

// Usage
const myQueue = new Queue();
myQueue.enqueue(10);
myQueue.enqueue(20);
console.log(myQueue.dequeue());  // 10
console.log(myQueue.peek());     // 20`,
    },
    {
      language: 'Python',
      code: `# Using list as queue (not efficient)
queue = []

# Enqueue
queue.append(10)
queue.append(20)
queue.append(30)

# Dequeue (O(n) - shifts all elements)
print("Removed:", queue.pop(0))  # 10

# Using deque (Efficient - O(1) for both ends)
from collections import deque

queue = deque()

# Enqueue
queue.append(10)
queue.append(20)
queue.append(30)

# Dequeue
print("Removed:", queue.popleft())  # 10

# Peek front
print("Front:", queue[0])  # 20

# Size and empty
print("Size:", len(queue))  # 2
print("Is empty:", len(queue) == 0)  # False

# Custom Queue Class
class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if self.is_empty():
            return "Queue Underflow!"
        return self.items.popleft()
    
    def peek(self):
        if self.is_empty():
            return "Queue is empty!"
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Priority Queue
import heapq
pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 20)
print("Priority:", heapq.heappop(pq))  # 10 (min-heap)

# Using queue module
from queue import Queue, PriorityQueue
q = Queue()
q.put(10)
q.get()  # 10`,
    },
  ],
  types: [
    {
      name: 'Simple Queue',
      description: 'Basic FIFO queue with linear array implementation.',
    },
    {
      name: 'Circular Queue',
      description: 'Queue where rear connects back to front, utilizing space efficiently.',
    },
    {
      name: 'Priority Queue',
      description: 'Elements dequeued based on priority, not insertion order.',
    },
    {
      name: 'Double-ended Queue (Deque)',
      description: 'Elements can be added/removed from both front and rear.',
    },
  ],
  operations: [
    { name: 'Enqueue', description: 'Add element at rear', timeComplexity: 'O(1)' },
    { name: 'Dequeue', description: 'Remove element from front', timeComplexity: 'O(1)' },
    { name: 'Front/Peek', description: 'View front element', timeComplexity: 'O(1)' },
    { name: 'Rear', description: 'View rear element', timeComplexity: 'O(1)' },
    { name: 'isEmpty', description: 'Check if queue is empty', timeComplexity: 'O(1)' },
    { name: 'Size', description: 'Get number of elements', timeComplexity: 'O(1)' },
  ],
  advantages: [
    'Maintains order of insertion',
    'All operations are O(1) time complexity',
    'Natural fit for scheduling problems',
    'Fair processing - first come, first served',
    'Useful for BFS and level-order traversal',
  ],
  disadvantages: [
    'Fixed size in array implementation',
    'Memory waste in simple queue (need circular)',
    'No random access to middle elements',
    'Search operation is O(n)',
    'Less flexible than deque',
  ],
  applications: [
    'CPU and disk scheduling',
    'Print job spooling',
    'Breadth-First Search (BFS)',
    'Message queuing systems',
    'Call center phone systems',
    'Buffer for data streaming',
  ],
};
