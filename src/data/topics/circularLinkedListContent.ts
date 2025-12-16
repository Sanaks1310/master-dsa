import { TopicContent } from '../topicContents';

export const circularLinkedListContent: TopicContent = {
  id: 'circular-linked-list',
  definition: 'A Circular Linked List is a variation of linked list where the last node points back to the first node instead of NULL, forming a circle. This allows continuous traversal from any node. Think of it like people sitting in a circle - from any person, you can reach everyone by going around.',
  keyPoints: [
    'Last node points to the first node (no NULL)',
    'Can traverse entire list starting from any node',
    'No clear beginning or end (circular structure)',
    'Can be singly or doubly linked',
    'Useful for round-robin scheduling',
    'Must be careful to avoid infinite loops when traversing',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = newNode;  // Points to itself initially
    return newNode;
}

// Insert at the beginning
void insertAtHead(struct Node** tail, int data) {
    struct Node* newNode = createNode(data);
    
    if (*tail == NULL) {
        *tail = newNode;
    } else {
        newNode->next = (*tail)->next;  // Point to current head
        (*tail)->next = newNode;         // Tail points to new head
    }
}

// Insert at the end
void insertAtEnd(struct Node** tail, int data) {
    struct Node* newNode = createNode(data);
    
    if (*tail == NULL) {
        *tail = newNode;
    } else {
        newNode->next = (*tail)->next;  // Point to head
        (*tail)->next = newNode;         // Old tail points to new node
        *tail = newNode;                 // Update tail
    }
}

// Delete a node by value
void deleteNode(struct Node** tail, int key) {
    if (*tail == NULL) return;
    
    struct Node* head = (*tail)->next;
    struct Node* curr = head;
    struct Node* prev = *tail;
    
    // If head is to be deleted
    if (head->data == key) {
        if (head == *tail) {
            // Only one node
            *tail = NULL;
        } else {
            (*tail)->next = head->next;
        }
        free(head);
        return;
    }
    
    // Search for the node
    do {
        prev = curr;
        curr = curr->next;
    } while (curr != head && curr->data != key);
    
    // If found
    if (curr->data == key) {
        prev->next = curr->next;
        if (curr == *tail) {
            *tail = prev;
        }
        free(curr);
    }
}

// Search for an element
int search(struct Node* tail, int key) {
    if (tail == NULL) return -1;
    
    struct Node* head = tail->next;
    struct Node* temp = head;
    int pos = 0;
    
    do {
        if (temp->data == key) return pos;
        temp = temp->next;
        pos++;
    } while (temp != head);
    
    return -1;  // Not found
}

// Get length of list
int getLength(struct Node* tail) {
    if (tail == NULL) return 0;
    
    struct Node* head = tail->next;
    struct Node* temp = head;
    int count = 0;
    
    do {
        count++;
        temp = temp->next;
    } while (temp != head);
    
    return count;
}

// Print the list
void printList(struct Node* tail) {
    if (tail == NULL) {
        printf("List is empty\\n");
        return;
    }
    
    struct Node* head = tail->next;
    struct Node* temp = head;
    
    printf("Circular List: ");
    do {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(back to %d)\\n", head->data);
}

int main() {
    struct Node* tail = NULL;
    
    insertAtEnd(&tail, 10);
    insertAtEnd(&tail, 20);
    insertAtHead(&tail, 5);
    insertAtEnd(&tail, 30);
    
    printList(tail);  // 5 -> 10 -> 20 -> 30 -> (back to 5)
    
    printf("Length: %d\\n", getLength(tail));  // 4
    printf("Position of 20: %d\\n", search(tail, 20));  // 2
    
    deleteNode(&tail, 20);
    printList(tail);  // 5 -> 10 -> 30 -> (back to 5)
    
    return 0;
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
    
    Node(int val) : data(val), next(this) {}  // Points to itself
};

// Circular Linked List class
class CircularLinkedList {
private:
    Node* tail;  // Using tail pointer for O(1) operations
    int size;
    
public:
    CircularLinkedList() : tail(nullptr), size(0) {}
    
    // Insert at head - O(1)
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        
        if (tail == nullptr) {
            tail = newNode;
        } else {
            newNode->next = tail->next;  // Point to current head
            tail->next = newNode;         // Tail points to new head
        }
        size++;
    }
    
    // Insert at tail - O(1)
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        
        if (tail == nullptr) {
            tail = newNode;
        } else {
            newNode->next = tail->next;  // Point to head
            tail->next = newNode;         // Old tail points to new node
            tail = newNode;               // Update tail
        }
        size++;
    }
    
    // Delete from head - O(1)
    void deleteFromHead() {
        if (tail == nullptr) return;
        
        Node* head = tail->next;
        
        if (head == tail) {
            // Only one node
            tail = nullptr;
        } else {
            tail->next = head->next;
        }
        
        delete head;
        size--;
    }
    
    // Delete by value - O(n)
    void deleteByValue(int key) {
        if (tail == nullptr) return;
        
        Node* head = tail->next;
        
        // If head is to be deleted
        if (head->data == key) {
            deleteFromHead();
            return;
        }
        
        // Search for the node
        Node* curr = head;
        while (curr->next != head && curr->next->data != key) {
            curr = curr->next;
        }
        
        // If found
        if (curr->next->data == key) {
            Node* toDelete = curr->next;
            curr->next = toDelete->next;
            if (toDelete == tail) {
                tail = curr;
            }
            delete toDelete;
            size--;
        }
    }
    
    // Search - O(n)
    int search(int key) {
        if (tail == nullptr) return -1;
        
        Node* head = tail->next;
        Node* temp = head;
        int pos = 0;
        
        do {
            if (temp->data == key) return pos;
            temp = temp->next;
            pos++;
        } while (temp != head);
        
        return -1;
    }
    
    // Get head element
    int getHead() {
        if (tail == nullptr) return -1;
        return tail->next->data;
    }
    
    // Get tail element
    int getTail() {
        if (tail == nullptr) return -1;
        return tail->data;
    }
    
    // Rotate the list (move head to tail)
    void rotate() {
        if (tail == nullptr || tail->next == tail) return;
        tail = tail->next;
    }
    
    // Print list
    void print() {
        if (tail == nullptr) {
            cout << "List is empty" << endl;
            return;
        }
        
        Node* head = tail->next;
        Node* temp = head;
        
        cout << "Circular List: ";
        do {
            cout << temp->data << " -> ";
            temp = temp->next;
        } while (temp != head);
        cout << "(back to " << head->data << ")" << endl;
    }
    
    int getSize() { return size; }
    bool isEmpty() { return tail == nullptr; }
    
    ~CircularLinkedList() {
        while (tail != nullptr) {
            deleteFromHead();
        }
    }
};

int main() {
    CircularLinkedList list;
    
    list.insertAtTail(10);
    list.insertAtTail(20);
    list.insertAtHead(5);
    list.insertAtTail(30);
    
    list.print();  // 5 -> 10 -> 20 -> 30 -> (back to 5)
    
    cout << "Head: " << list.getHead() << endl;  // 5
    cout << "Tail: " << list.getTail() << endl;  // 30
    
    list.rotate();
    list.print();  // 10 -> 20 -> 30 -> 5 -> (back to 10)
    
    list.deleteByValue(20);
    list.print();  // 10 -> 30 -> 5 -> (back to 10)
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Node class
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = this;  // Points to itself initially
    }
}

// Circular Linked List class
public class CircularLinkedList {
    private Node tail;
    private int size;
    
    public CircularLinkedList() {
        tail = null;
        size = 0;
    }
    
    // Insert at head - O(1)
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        
        if (tail == null) {
            tail = newNode;
        } else {
            newNode.next = tail.next;  // Point to current head
            tail.next = newNode;        // Tail points to new head
        }
        size++;
    }
    
    // Insert at tail - O(1)
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        
        if (tail == null) {
            tail = newNode;
        } else {
            newNode.next = tail.next;  // Point to head
            tail.next = newNode;        // Old tail points to new node
            tail = newNode;             // Update tail
        }
        size++;
    }
    
    // Delete from head - O(1)
    public void deleteFromHead() {
        if (tail == null) return;
        
        Node head = tail.next;
        
        if (head == tail) {
            tail = null;  // Only one node
        } else {
            tail.next = head.next;
        }
        size--;
    }
    
    // Delete by value - O(n)
    public void deleteByValue(int key) {
        if (tail == null) return;
        
        Node head = tail.next;
        
        // If head is to be deleted
        if (head.data == key) {
            deleteFromHead();
            return;
        }
        
        // Search for the node
        Node curr = head;
        while (curr.next != head && curr.next.data != key) {
            curr = curr.next;
        }
        
        // If found
        if (curr.next.data == key) {
            if (curr.next == tail) {
                tail = curr;
            }
            curr.next = curr.next.next;
            size--;
        }
    }
    
    // Search - O(n)
    public int search(int key) {
        if (tail == null) return -1;
        
        Node head = tail.next;
        Node temp = head;
        int pos = 0;
        
        do {
            if (temp.data == key) return pos;
            temp = temp.next;
            pos++;
        } while (temp != head);
        
        return -1;
    }
    
    // Rotate list (move head to tail)
    public void rotate() {
        if (tail == null || tail.next == tail) return;
        tail = tail.next;
    }
    
    // Print list
    public void print() {
        if (tail == null) {
            System.out.println("List is empty");
            return;
        }
        
        Node head = tail.next;
        Node temp = head;
        
        System.out.print("Circular List: ");
        do {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        } while (temp != head);
        System.out.println("(back to " + head.data + ")");
    }
    
    public int getSize() { return size; }
    public boolean isEmpty() { return tail == null; }
    public int getHead() { return tail == null ? -1 : tail.next.data; }
    public int getTail() { return tail == null ? -1 : tail.data; }
    
    // Josephus Problem - Find survivor position
    public static int josephus(int n, int k) {
        CircularLinkedList list = new CircularLinkedList();
        for (int i = 1; i <= n; i++) {
            list.insertAtTail(i);
        }
        
        Node current = list.tail.next;
        Node prev = list.tail;
        
        while (list.size > 1) {
            // Count k-1 nodes
            for (int i = 1; i < k; i++) {
                prev = current;
                current = current.next;
            }
            
            // Remove current node
            prev.next = current.next;
            if (current == list.tail) {
                list.tail = prev;
            }
            current = prev.next;
            list.size--;
        }
        
        return list.tail.data;
    }
    
    public static void main(String[] args) {
        CircularLinkedList list = new CircularLinkedList();
        
        list.insertAtTail(10);
        list.insertAtTail(20);
        list.insertAtHead(5);
        list.insertAtTail(30);
        
        list.print();  // 5 -> 10 -> 20 -> 30 -> (back to 5)
        
        list.rotate();
        list.print();  // 10 -> 20 -> 30 -> 5 -> (back to 10)
        
        // Josephus problem: 7 people, eliminate every 3rd
        System.out.println("Josephus(7, 3) survivor: " + josephus(7, 3));  // 4
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.next = this;  // Points to itself initially
    }
}

// Circular Linked List class
class CircularLinkedList {
    constructor() {
        this.tail = null;
        this.size = 0;
    }
    
    // Insert at head - O(1)
    insertAtHead(data) {
        const newNode = new Node(data);
        
        if (this.tail === null) {
            this.tail = newNode;
        } else {
            newNode.next = this.tail.next;  // Point to current head
            this.tail.next = newNode;        // Tail points to new head
        }
        this.size++;
    }
    
    // Insert at tail - O(1)
    insertAtTail(data) {
        const newNode = new Node(data);
        
        if (this.tail === null) {
            this.tail = newNode;
        } else {
            newNode.next = this.tail.next;  // Point to head
            this.tail.next = newNode;        // Old tail points to new node
            this.tail = newNode;             // Update tail
        }
        this.size++;
    }
    
    // Delete from head - O(1)
    deleteFromHead() {
        if (this.tail === null) return null;
        
        const head = this.tail.next;
        const data = head.data;
        
        if (head === this.tail) {
            this.tail = null;  // Only one node
        } else {
            this.tail.next = head.next;
        }
        
        this.size--;
        return data;
    }
    
    // Delete by value - O(n)
    deleteByValue(key) {
        if (this.tail === null) return;
        
        const head = this.tail.next;
        
        // If head is to be deleted
        if (head.data === key) {
            this.deleteFromHead();
            return;
        }
        
        // Search for the node
        let curr = head;
        while (curr.next !== head && curr.next.data !== key) {
            curr = curr.next;
        }
        
        // If found
        if (curr.next.data === key) {
            if (curr.next === this.tail) {
                this.tail = curr;
            }
            curr.next = curr.next.next;
            this.size--;
        }
    }
    
    // Search - O(n)
    search(key) {
        if (this.tail === null) return -1;
        
        const head = this.tail.next;
        let temp = head;
        let pos = 0;
        
        do {
            if (temp.data === key) return pos;
            temp = temp.next;
            pos++;
        } while (temp !== head);
        
        return -1;
    }
    
    // Rotate (move head to tail) - O(1)
    rotate() {
        if (this.tail === null || this.tail.next === this.tail) return;
        this.tail = this.tail.next;
    }
    
    // Convert to array
    toArray() {
        if (this.tail === null) return [];
        
        const result = [];
        const head = this.tail.next;
        let temp = head;
        
        do {
            result.push(temp.data);
            temp = temp.next;
        } while (temp !== head);
        
        return result;
    }
    
    // Print list
    print() {
        if (this.tail === null) {
            console.log("List is empty");
            return;
        }
        
        const arr = this.toArray();
        const head = this.tail.next.data;
        console.log(\`Circular List: \${arr.join(" -> ")} -> (back to \${head})\`);
    }
    
    getSize() { return this.size; }
    isEmpty() { return this.tail === null; }
    getHead() { return this.tail === null ? null : this.tail.next.data; }
    getTail() { return this.tail === null ? null : this.tail.data; }
}

// Josephus Problem
function josephus(n, k) {
    const list = new CircularLinkedList();
    for (let i = 1; i <= n; i++) {
        list.insertAtTail(i);
    }
    
    let current = list.tail.next;
    let prev = list.tail;
    
    while (list.size > 1) {
        // Count k-1 nodes
        for (let i = 1; i < k; i++) {
            prev = current;
            current = current.next;
        }
        
        // Remove current
        prev.next = current.next;
        if (current === list.tail) {
            list.tail = prev;
        }
        current = prev.next;
        list.size--;
    }
    
    return list.tail.data;
}

// Usage
const list = new CircularLinkedList();

list.insertAtTail(10);
list.insertAtTail(20);
list.insertAtHead(5);
list.insertAtTail(30);

list.print();  // 5 -> 10 -> 20 -> 30 -> (back to 5)

list.rotate();
list.print();  // 10 -> 20 -> 30 -> 5 -> (back to 10)

console.log("Josephus(7, 3):", josephus(7, 3));  // 4`,
    },
    {
      language: 'Python',
      code: `# Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = self  # Points to itself initially

# Circular Linked List class
class CircularLinkedList:
    def __init__(self):
        self.tail = None
        self.size = 0
    
    # Insert at head - O(1)
    def insert_at_head(self, data):
        new_node = Node(data)
        
        if self.tail is None:
            self.tail = new_node
        else:
            new_node.next = self.tail.next  # Point to current head
            self.tail.next = new_node        # Tail points to new head
        self.size += 1
    
    # Insert at tail - O(1)
    def insert_at_tail(self, data):
        new_node = Node(data)
        
        if self.tail is None:
            self.tail = new_node
        else:
            new_node.next = self.tail.next  # Point to head
            self.tail.next = new_node        # Old tail points to new node
            self.tail = new_node             # Update tail
        self.size += 1
    
    # Delete from head - O(1)
    def delete_from_head(self):
        if self.tail is None:
            return None
        
        head = self.tail.next
        data = head.data
        
        if head == self.tail:
            self.tail = None  # Only one node
        else:
            self.tail.next = head.next
        
        self.size -= 1
        return data
    
    # Delete by value - O(n)
    def delete_by_value(self, key):
        if self.tail is None:
            return
        
        head = self.tail.next
        
        # If head is to be deleted
        if head.data == key:
            self.delete_from_head()
            return
        
        # Search for the node
        curr = head
        while curr.next != head and curr.next.data != key:
            curr = curr.next
        
        # If found
        if curr.next.data == key:
            if curr.next == self.tail:
                self.tail = curr
            curr.next = curr.next.next
            self.size -= 1
    
    # Search - O(n)
    def search(self, key):
        if self.tail is None:
            return -1
        
        head = self.tail.next
        temp = head
        pos = 0
        
        while True:
            if temp.data == key:
                return pos
            temp = temp.next
            pos += 1
            if temp == head:
                break
        
        return -1
    
    # Rotate (move head to tail) - O(1)
    def rotate(self):
        if self.tail is None or self.tail.next == self.tail:
            return
        self.tail = self.tail.next
    
    # Convert to list
    def to_list(self):
        if self.tail is None:
            return []
        
        result = []
        head = self.tail.next
        temp = head
        
        while True:
            result.append(temp.data)
            temp = temp.next
            if temp == head:
                break
        
        return result
    
    # Print list
    def print_list(self):
        if self.tail is None:
            print("List is empty")
            return
        
        arr = self.to_list()
        head = self.tail.next.data
        print(f"Circular List: {' -> '.join(map(str, arr))} -> (back to {head})")
    
    def get_size(self):
        return self.size
    
    def is_empty(self):
        return self.tail is None
    
    def get_head(self):
        return None if self.tail is None else self.tail.next.data
    
    def get_tail(self):
        return None if self.tail is None else self.tail.data
    
    # Iterator
    def __iter__(self):
        if self.tail is None:
            return
        
        head = self.tail.next
        temp = head
        while True:
            yield temp.data
            temp = temp.next
            if temp == head:
                break


# Josephus Problem
def josephus(n, k):
    lst = CircularLinkedList()
    for i in range(1, n + 1):
        lst.insert_at_tail(i)
    
    current = lst.tail.next
    prev = lst.tail
    
    while lst.size > 1:
        # Count k-1 nodes
        for _ in range(k - 1):
            prev = current
            current = current.next
        
        # Remove current
        prev.next = current.next
        if current == lst.tail:
            lst.tail = prev
        current = prev.next
        lst.size -= 1
    
    return lst.tail.data


# Usage
if __name__ == "__main__":
    lst = CircularLinkedList()
    
    lst.insert_at_tail(10)
    lst.insert_at_tail(20)
    lst.insert_at_head(5)
    lst.insert_at_tail(30)
    
    lst.print_list()  # 5 -> 10 -> 20 -> 30 -> (back to 5)
    
    print(f"Head: {lst.get_head()}")  # 5
    print(f"Tail: {lst.get_tail()}")  # 30
    
    lst.rotate()
    lst.print_list()  # 10 -> 20 -> 30 -> 5 -> (back to 10)
    
    # Using iterator
    print("Elements:", list(lst))  # [10, 20, 30, 5]
    
    # Josephus problem: 7 people, eliminate every 3rd
    print(f"Josephus(7, 3) survivor: {josephus(7, 3)}")  # 4`,
    },
  ],
  types: [
    {
      name: 'Circular Singly Linked List',
      description: 'Each node points to next, last points to first. One-way traversal in a circle.',
    },
    {
      name: 'Circular Doubly Linked List',
      description: 'Each node has prev and next pointers. Last\'s next points to first, first\'s prev points to last.',
    },
  ],
  operations: [
    { name: 'Insert at Head', description: 'Add element at the beginning', timeComplexity: 'O(1)' },
    { name: 'Insert at Tail', description: 'Add element at the end (using tail pointer)', timeComplexity: 'O(1)' },
    { name: 'Delete from Head', description: 'Remove first element', timeComplexity: 'O(1)' },
    { name: 'Delete by Value', description: 'Remove element with specific value', timeComplexity: 'O(n)' },
    { name: 'Search', description: 'Find element by value', timeComplexity: 'O(n)' },
    { name: 'Rotate', description: 'Move head to tail position', timeComplexity: 'O(1)' },
    { name: 'Traverse', description: 'Visit all elements', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Can traverse entire list from any node',
    'O(1) insertion at both head and tail (with tail pointer)',
    'Natural fit for circular/cyclic problems',
    'No NULL checks during traversal',
    'Easy to implement round-robin scheduling',
  ],
  disadvantages: [
    'Infinite loop risk if not handled carefully',
    'Slightly more complex than regular linked list',
    'Traversal must track starting point',
    'Extra care needed when list has one element',
    'Debugging can be harder',
  ],
  applications: [
    'Round-robin CPU scheduling',
    'Circular buffers in audio/video streaming',
    'Multiplayer turn-based games',
    'Music/video playlist repeat mode',
    'Josephus problem (elimination games)',
    'Token ring network protocols',
    'Circular queues implementation',
    'Managing multiple running applications',
  ],
};
