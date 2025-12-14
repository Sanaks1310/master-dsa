import { TopicContent } from '../topicContents';

export const stackContent: TopicContent = {
  id: 'stacks',
  definition: 'A Stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Elements are added and removed from the same end called the "top". Think of it like a stack of plates - you can only add or remove plates from the top.',
  keyPoints: [
    'LIFO (Last In, First Out) principle',
    'Elements added and removed from the same end (top)',
    'Push operation adds element to top',
    'Pop operation removes element from top',
    'Peek/Top operation views top element without removing',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>
#define MAX 100

// Stack structure
struct Stack {
    int arr[MAX];
    int top;
};

// Initialize stack
void init(struct Stack* s) {
    s->top = -1;
}

// Check if stack is empty
int isEmpty(struct Stack* s) {
    return s->top == -1;
}

// Check if stack is full
int isFull(struct Stack* s) {
    return s->top == MAX - 1;
}

// Push element
void push(struct Stack* s, int data) {
    if (isFull(s)) {
        printf("Stack Overflow!\\n");
        return;
    }
    s->arr[++s->top] = data;
}

// Pop element
int pop(struct Stack* s) {
    if (isEmpty(s)) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    return s->arr[s->top--];
}

// Peek top element
int peek(struct Stack* s) {
    if (isEmpty(s)) {
        printf("Stack is empty!\\n");
        return -1;
    }
    return s->arr[s->top];
}

// Usage
int main() {
    struct Stack s;
    init(&s);
    
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    
    printf("Top: %d\\n", peek(&s));  // 30
    printf("Popped: %d\\n", pop(&s)); // 30
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <stack>
using namespace std;

// Using STL stack
int main() {
    stack<int> s;
    
    // Push elements
    s.push(10);
    s.push(20);
    s.push(30);
    
    // Top element
    cout << "Top: " << s.top() << endl;  // 30
    
    // Pop element
    s.pop();
    cout << "After pop, Top: " << s.top() << endl;  // 20
    
    // Check size and empty
    cout << "Size: " << s.size() << endl;  // 2
    cout << "Is empty: " << s.empty() << endl;  // 0 (false)
    
    return 0;
}

// Custom Stack Implementation
class Stack {
private:
    int* arr;
    int top;
    int capacity;
    
public:
    Stack(int size = 100) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }
    
    ~Stack() { delete[] arr; }
    
    void push(int data) {
        if (top == capacity - 1) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = data;
    }
    
    int pop() {
        if (top == -1) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        return arr[top--];
    }
    
    int peek() { return (top == -1) ? -1 : arr[top]; }
    bool isEmpty() { return top == -1; }
    int size() { return top + 1; }
};`,
    },
    {
      language: 'Java',
      code: `import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        // Using Java Stack class
        Stack<Integer> stack = new Stack<>();
        
        // Push elements
        stack.push(10);
        stack.push(20);
        stack.push(30);
        
        // Peek top element
        System.out.println("Top: " + stack.peek());  // 30
        
        // Pop element
        System.out.println("Popped: " + stack.pop());  // 30
        
        // Check size and empty
        System.out.println("Size: " + stack.size());  // 2
        System.out.println("Is empty: " + stack.isEmpty());  // false
        
        // Search element (returns 1-based position from top)
        stack.push(40);
        System.out.println("Position of 20: " + stack.search(20));  // 2
    }
}

// Custom Stack Implementation
class CustomStack {
    private int[] arr;
    private int top;
    private int capacity;
    
    public CustomStack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }
    
    public void push(int data) {
        if (top == capacity - 1) {
            System.out.println("Stack Overflow!");
            return;
        }
        arr[++top] = data;
    }
    
    public int pop() {
        if (top == -1) {
            System.out.println("Stack Underflow!");
            return -1;
        }
        return arr[top--];
    }
    
    public int peek() {
        return (top == -1) ? -1 : arr[top];
    }
    
    public boolean isEmpty() { return top == -1; }
    public int size() { return top + 1; }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Using Array as Stack
const stack = [];

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);

// Peek top element
console.log("Top:", stack[stack.length - 1]);  // 30

// Pop element
console.log("Popped:", stack.pop());  // 30

// Check size and empty
console.log("Size:", stack.length);  // 2
console.log("Is empty:", stack.length === 0);  // false

// Custom Stack Class
class Stack {
    constructor() {
        this.items = [];
    }
    
    // Push element
    push(element) {
        this.items.push(element);
    }
    
    // Pop element
    pop() {
        if (this.isEmpty()) {
            return "Stack Underflow!";
        }
        return this.items.pop();
    }
    
    // Peek top element
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty!";
        }
        return this.items[this.items.length - 1];
    }
    
    // Check if empty
    isEmpty() {
        return this.items.length === 0;
    }
    
    // Get size
    size() {
        return this.items.length;
    }
    
    // Clear stack
    clear() {
        this.items = [];
    }
    
    // Print stack
    print() {
        console.log(this.items.toString());
    }
}

// Usage
const myStack = new Stack();
myStack.push(10);
myStack.push(20);
console.log(myStack.peek());  // 20`,
    },
    {
      language: 'Python',
      code: `# Using list as stack
stack = []

# Push elements
stack.append(10)
stack.append(20)
stack.append(30)

# Peek top element
print("Top:", stack[-1])  # 30

# Pop element
print("Popped:", stack.pop())  # 30

# Check size and empty
print("Size:", len(stack))  # 2
print("Is empty:", len(stack) == 0)  # False

# Custom Stack Class
class Stack:
    def __init__(self):
        self.items = []
    
    # Push element
    def push(self, item):
        self.items.append(item)
    
    # Pop element
    def pop(self):
        if self.is_empty():
            return "Stack Underflow!"
        return self.items.pop()
    
    # Peek top element
    def peek(self):
        if self.is_empty():
            return "Stack is empty!"
        return self.items[-1]
    
    # Check if empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Get size
    def size(self):
        return len(self.items)
    
    # Clear stack
    def clear(self):
        self.items = []
    
    # String representation
    def __str__(self):
        return str(self.items)

# Using deque for better performance
from collections import deque
stack = deque()
stack.append(10)  # Push
stack.pop()       # Pop`,
    },
  ],
  types: [
    {
      name: 'Array-based Stack',
      description: 'Implemented using arrays with fixed or dynamic size.',
    },
    {
      name: 'Linked List Stack',
      description: 'Implemented using linked list for dynamic memory allocation.',
    },
    {
      name: 'Two Stacks in Array',
      description: 'Two stacks implemented in a single array, growing from opposite ends.',
    },
    {
      name: 'Min/Max Stack',
      description: 'Stack that tracks minimum or maximum element in O(1) time.',
    },
  ],
  operations: [
    { name: 'Push', description: 'Add element to the top', timeComplexity: 'O(1)' },
    { name: 'Pop', description: 'Remove element from the top', timeComplexity: 'O(1)' },
    { name: 'Peek/Top', description: 'View top element without removing', timeComplexity: 'O(1)' },
    { name: 'isEmpty', description: 'Check if stack is empty', timeComplexity: 'O(1)' },
    { name: 'Size', description: 'Get number of elements', timeComplexity: 'O(1)' },
    { name: 'Search', description: 'Find element in stack', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Simple and easy to implement',
    'All operations are O(1) time complexity',
    'Memory efficient for LIFO operations',
    'Helps in function call management (call stack)',
    'Useful for reversing data',
  ],
  disadvantages: [
    'Limited access - only top element accessible',
    'Fixed size in array implementation (can overflow)',
    'No random access to elements',
    'Memory management needed in dynamic implementation',
    'Not suitable for searching operations',
  ],
  applications: [
    'Function call stack and recursion',
    'Undo/Redo operations in editors',
    'Expression evaluation and parsing',
    'Backtracking algorithms',
    'Browser back button history',
    'Balanced parenthesis checking',
  ],
};
