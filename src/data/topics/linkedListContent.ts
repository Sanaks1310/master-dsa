import { TopicContent } from '../topicContents';

export const linkedListContent: TopicContent = {
  id: 'linked-lists',
  definition: 'A Linked List is a linear data structure where elements (nodes) are stored in non-contiguous memory locations. Each node contains data and a pointer/reference to the next node in the sequence, forming a chain-like structure.',
  keyPoints: [
    'Each node contains data and pointer(s) to other nodes',
    'Dynamic size - can grow or shrink during runtime',
    'No contiguous memory requirement',
    'Sequential access only - no direct indexing',
    'Efficient insertion and deletion at known positions',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Insert at beginning
void insertAtHead(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
}

// Insert at end
void insertAtEnd(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

// Traverse and print
void printList(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
using namespace std;

// Node class
class Node {
public:
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

// LinkedList class
class LinkedList {
public:
    Node* head;
    
    LinkedList() : head(nullptr) {}
    
    // Insert at beginning
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    
    // Insert at end
    void insertAtEnd(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
    
    // Delete a node
    void deleteNode(int key) {
        Node* temp = head;
        Node* prev = nullptr;
        
        if (temp != nullptr && temp->data == key) {
            head = temp->next;
            delete temp;
            return;
        }
        
        while (temp != nullptr && temp->data != key) {
            prev = temp;
            temp = temp->next;
        }
        
        if (temp == nullptr) return;
        prev->next = temp->next;
        delete temp;
    }
    
    // Print list
    void printList() {
        Node* temp = head;
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
};`,
    },
    {
      language: 'Java',
      code: `// Node class
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

// LinkedList class
class LinkedList {
    Node head;
    
    // Insert at beginning
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    // Insert at end
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }
    
    // Delete a node
    public void deleteNode(int key) {
        Node temp = head, prev = null;
        
        if (temp != null && temp.data == key) {
            head = temp.next;
            return;
        }
        
        while (temp != null && temp.data != key) {
            prev = temp;
            temp = temp.next;
        }
        
        if (temp == null) return;
        prev.next = temp.next;
    }
    
    // Print list
    public void printList() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
    }
    
    // Insert at beginning
    insertAtHead(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }
    
    // Insert at end
    insertAtEnd(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next !== null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }
    
    // Delete a node
    deleteNode(key) {
        let temp = this.head;
        let prev = null;
        
        if (temp !== null && temp.data === key) {
            this.head = temp.next;
            return;
        }
        
        while (temp !== null && temp.data !== key) {
            prev = temp;
            temp = temp.next;
        }
        
        if (temp === null) return;
        prev.next = temp.next;
    }
    
    // Print list
    printList() {
        let temp = this.head;
        let result = [];
        while (temp !== null) {
            result.push(temp.data);
            temp = temp.next;
        }
        console.log(result.join(" -> ") + " -> NULL");
    }
}`,
    },
    {
      language: 'Python',
      code: `# Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# LinkedList class
class LinkedList:
    def __init__(self):
        self.head = None
    
    # Insert at beginning
    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    # Insert at end
    def insert_at_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node
    
    # Delete a node
    def delete_node(self, key):
        temp = self.head
        prev = None
        
        if temp and temp.data == key:
            self.head = temp.next
            return
        
        while temp and temp.data != key:
            prev = temp
            temp = temp.next
        
        if temp is None:
            return
        prev.next = temp.next
    
    # Print list
    def print_list(self):
        temp = self.head
        result = []
        while temp:
            result.append(str(temp.data))
            temp = temp.next
        print(" -> ".join(result) + " -> NULL")`,
    },
  ],
  types: [
    {
      name: 'Singly Linked List',
      description: 'Each node has data and one pointer to the next node. Traversal only in forward direction.',
    },
    {
      name: 'Doubly Linked List',
      description: 'Each node has pointers to both next and previous nodes. Bi-directional traversal.',
    },
    {
      name: 'Circular Linked List',
      description: 'Last node points back to the first node, forming a circle.',
    },
    {
      name: 'Circular Doubly Linked List',
      description: 'Doubly linked list where the last node connects back to the first.',
    },
  ],
  operations: [
    { name: 'Insert at Head', description: 'Add element at the beginning', timeComplexity: 'O(1)' },
    { name: 'Insert at End', description: 'Add element at the end', timeComplexity: 'O(n)' },
    { name: 'Insert at Position', description: 'Add element at specific position', timeComplexity: 'O(n)' },
    { name: 'Delete at Head', description: 'Remove first element', timeComplexity: 'O(1)' },
    { name: 'Delete at End', description: 'Remove last element', timeComplexity: 'O(n)' },
    { name: 'Search', description: 'Find element in list', timeComplexity: 'O(n)' },
    { name: 'Access by Index', description: 'Get element at position', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Dynamic size - grows and shrinks as needed',
    'Efficient insertion and deletion at beginning O(1)',
    'No memory wastage (allocates as needed)',
    'Easy implementation of stacks and queues',
    'No need for contiguous memory allocation',
  ],
  disadvantages: [
    'No random access - must traverse from head',
    'Extra memory for storing pointers',
    'Not cache-friendly due to non-contiguous memory',
    'Reverse traversal not possible in singly linked list',
    'More complex implementation than arrays',
  ],
  applications: [
    'Implementation of stacks and queues',
    'Undo functionality in applications',
    'Hash table chaining for collision handling',
    'Browser history (back/forward navigation)',
    'Music playlist management',
    'Memory allocation in operating systems',
  ],
};
