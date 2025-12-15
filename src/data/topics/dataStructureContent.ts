import { TopicContent } from '../topicContents';

export const dataStructureContent: TopicContent = {
  id: 'what-is-data-structure',
  definition: 'A data structure is a way to organize, store, and manage data so that it can be used efficiently. Think of it like organizing your closet - you can throw clothes anywhere (messy and slow to find), or organize by type (shirts, pants, etc.) making it easy to find what you need. The right data structure makes your program faster and uses less memory.',
  keyPoints: [
    'Data structures help organize data for efficient access and modification',
    'Different structures are better for different tasks (like arrays for lists, trees for hierarchies)',
    'Choosing the right data structure can make your program 100x faster',
    'Data structures can be simple (arrays) or complex (graphs)',
    'Every programming language provides built-in data structures',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Example: Different Data Structures in C

#include <stdio.h>
#include <stdlib.h>

// 1. ARRAY - Like a row of lockers
int main() {
    // Array: stores 5 numbers in a row
    int scores[5] = {85, 90, 78, 92, 88};
    
    // Access is super fast using index
    printf("Third score: %d\\n", scores[2]); // 78
    
    // 2. STRUCT - Group related data together
    struct Student {
        char name[50];
        int age;
        float gpa;
    };
    
    struct Student john = {"John Doe", 20, 3.8};
    printf("Student: %s, Age: %d\\n", john.name, john.age);
    
    // 3. LINKED STRUCTURE (using pointers)
    struct Node {
        int data;
        struct Node* next;
    };
    
    // Create two connected nodes
    struct Node* first = malloc(sizeof(struct Node));
    struct Node* second = malloc(sizeof(struct Node));
    
    first->data = 10;
    first->next = second;
    second->data = 20;
    second->next = NULL;
    
    printf("Chain: %d -> %d\\n", first->data, first->next->data);
    
    free(first);
    free(second);
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Example: Different Data Structures in C++

#include <iostream>
#include <vector>
#include <map>
#include <stack>
using namespace std;

int main() {
    // 1. ARRAY (vector) - Dynamic list
    vector<int> scores = {85, 90, 78, 92, 88};
    cout << "Third score: " << scores[2] << endl; // 78
    scores.push_back(95); // Easy to add more
    
    // 2. MAP - Like a dictionary (key-value pairs)
    map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 28;
    cout << "Alice's age: " << ages["Alice"] << endl;
    
    // 3. STACK - Last In, First Out (like plates)
    stack<string> plates;
    plates.push("Red Plate");
    plates.push("Blue Plate");
    plates.push("Green Plate");
    
    cout << "Top plate: " << plates.top() << endl; // Green
    plates.pop(); // Remove Green
    cout << "New top: " << plates.top() << endl;   // Blue
    
    // 4. STRUCT - Custom data type
    struct Student {
        string name;
        int age;
        float gpa;
    };
    
    Student john = {"John Doe", 20, 3.8};
    cout << "Student: " << john.name << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Example: Different Data Structures in Java

import java.util.*;

public class DataStructures {
    public static void main(String[] args) {
        // 1. ARRAY - Fixed size list
        int[] scores = {85, 90, 78, 92, 88};
        System.out.println("Third score: " + scores[2]); // 78
        
        // 2. ARRAYLIST - Dynamic list (grows as needed)
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        System.out.println("Fruits: " + fruits);
        
        // 3. HASHMAP - Key-Value pairs (like dictionary)
        HashMap<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 28);
        System.out.println("Alice's age: " + ages.get("Alice"));
        
        // 4. STACK - Last In, First Out
        Stack<String> plates = new Stack<>();
        plates.push("Red Plate");
        plates.push("Blue Plate");
        plates.push("Green Plate");
        System.out.println("Top plate: " + plates.peek()); // Green
        
        // 5. QUEUE - First In, First Out
        Queue<String> line = new LinkedList<>();
        line.add("Person 1");
        line.add("Person 2");
        line.add("Person 3");
        System.out.println("First in line: " + line.peek()); // Person 1
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Example: Different Data Structures in JavaScript

// 1. ARRAY - Ordered list of items
const scores = [85, 90, 78, 92, 88];
console.log("Third score:", scores[2]); // 78
scores.push(95); // Add to end
console.log("All scores:", scores);

// 2. OBJECT - Key-Value pairs (like dictionary)
const student = {
    name: "John Doe",
    age: 20,
    gpa: 3.8,
    courses: ["Math", "Science", "English"]
};
console.log("Student name:", student.name);
console.log("First course:", student.courses[0]);

// 3. MAP - Better key-value with any key type
const ages = new Map();
ages.set("Alice", 25);
ages.set("Bob", 30);
ages.set(123, "Number key works too!");
console.log("Alice's age:", ages.get("Alice"));

// 4. SET - Unique values only (no duplicates)
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 3]);
console.log("Unique:", [...uniqueNumbers]); // [1, 2, 3]

// 5. Using ARRAY as STACK (LIFO)
const stack = [];
stack.push("First");
stack.push("Second");
stack.push("Third");
console.log("Pop:", stack.pop()); // "Third"

// 6. Using ARRAY as QUEUE (FIFO)
const queue = [];
queue.push("First");
queue.push("Second");
console.log("Dequeue:", queue.shift()); // "First"`,
    },
    {
      language: 'Python',
      code: `# Example: Different Data Structures in Python

# 1. LIST - Ordered, changeable collection
scores = [85, 90, 78, 92, 88]
print(f"Third score: {scores[2]}")  # 78
scores.append(95)  # Add to end
print(f"All scores: {scores}")

# 2. DICTIONARY - Key-Value pairs
student = {
    "name": "John Doe",
    "age": 20,
    "gpa": 3.8,
    "courses": ["Math", "Science", "English"]
}
print(f"Student name: {student['name']}")
print(f"First course: {student['courses'][0]}")

# 3. SET - Unique values only (no duplicates)
unique_numbers = {1, 2, 2, 3, 3, 3}
print(f"Unique: {unique_numbers}")  # {1, 2, 3}

# 4. TUPLE - Ordered, unchangeable (immutable)
coordinates = (10, 20)
print(f"X: {coordinates[0]}, Y: {coordinates[1]}")

# 5. Using LIST as STACK (LIFO)
stack = []
stack.append("First")
stack.append("Second")
stack.append("Third")
print(f"Pop: {stack.pop()}")  # "Third"

# 6. Using COLLECTIONS for QUEUE (FIFO)
from collections import deque
queue = deque()
queue.append("First")
queue.append("Second")
print(f"Dequeue: {queue.popleft()}")  # "First"

# 7. NAMED TUPLE - Like a simple class
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(f"Point: ({p.x}, {p.y})")`,
    },
  ],
  types: [
    { 
      name: 'Linear Data Structures', 
      description: 'Data arranged in a sequence, one after another. Examples: Arrays, Linked Lists, Stacks, Queues' 
    },
    { 
      name: 'Non-Linear Data Structures', 
      description: 'Data arranged in hierarchical or networked form. Examples: Trees, Graphs' 
    },
    { 
      name: 'Static Data Structures', 
      description: 'Fixed size, memory allocated at creation. Example: Arrays with fixed size' 
    },
    { 
      name: 'Dynamic Data Structures', 
      description: 'Size can grow or shrink during runtime. Examples: Linked Lists, Dynamic Arrays' 
    },
  ],
  operations: [
    { name: 'Traversal', description: 'Visit every element once', timeComplexity: 'O(n)' },
    { name: 'Search', description: 'Find a specific element', timeComplexity: 'O(n) to O(log n)' },
    { name: 'Insertion', description: 'Add a new element', timeComplexity: 'O(1) to O(n)' },
    { name: 'Deletion', description: 'Remove an element', timeComplexity: 'O(1) to O(n)' },
    { name: 'Sorting', description: 'Arrange elements in order', timeComplexity: 'O(n log n)' },
    { name: 'Access', description: 'Get element at position', timeComplexity: 'O(1) to O(n)' },
  ],
  advantages: [
    'Efficient data organization saves time and memory',
    'Right structure makes operations much faster',
    'Helps solve complex problems systematically',
    'Code becomes cleaner and more maintainable',
    'Reusable patterns across different problems',
  ],
  disadvantages: [
    'Choosing wrong structure can slow down your program',
    'Some structures use more memory than others',
    'Complex structures have steep learning curve',
    'Implementation can be error-prone',
    'May be overkill for simple problems',
  ],
  applications: [
    'Contact List on Phone - Array or List to store contacts',
    'Undo Feature in Apps - Stack to remember previous states',
    'Print Queue - Queue to manage print jobs in order',
    'File System - Tree structure for folders and files',
    'Social Networks - Graph to represent friendships',
  ],
};
