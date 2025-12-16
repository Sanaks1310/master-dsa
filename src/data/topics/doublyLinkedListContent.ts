import { TopicContent } from '../topicContents';

export const doublyLinkedListContent: TopicContent = {
  id: 'doubly-linked-list',
  definition: 'A Doubly Linked List is a linear data structure where each node contains data and TWO pointers - one pointing to the next node and one pointing to the previous node. This allows traversal in both directions (forward and backward). Think of it like a two-way street where you can travel in either direction.',
  keyPoints: [
    'Each node has three parts: data, next pointer, prev pointer',
    'Bidirectional traversal - can go forward or backward',
    'First node\'s prev points to NULL, last node\'s next points to NULL',
    'Deletion of a known node is O(1) - no need to find previous',
    'More memory per node (extra pointer)',
    'More flexible but more complex than singly linked list',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

// Node structure with prev and next pointers
struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

// Create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

// Insert at the beginning
void insertAtHead(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    newNode->next = *head;
    
    if (*head != NULL) {
        (*head)->prev = newNode;
    }
    *head = newNode;
}

// Insert at the end
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
    newNode->prev = temp;
}

// Insert after a given node
void insertAfter(struct Node* prevNode, int data) {
    if (prevNode == NULL) return;
    
    struct Node* newNode = createNode(data);
    newNode->next = prevNode->next;
    newNode->prev = prevNode;
    prevNode->next = newNode;
    
    if (newNode->next != NULL) {
        newNode->next->prev = newNode;
    }
}

// Delete a node
void deleteNode(struct Node** head, struct Node* delNode) {
    if (*head == NULL || delNode == NULL) return;
    
    // If deleting head
    if (*head == delNode) {
        *head = delNode->next;
    }
    
    // Update next's prev
    if (delNode->next != NULL) {
        delNode->next->prev = delNode->prev;
    }
    
    // Update prev's next
    if (delNode->prev != NULL) {
        delNode->prev->next = delNode->next;
    }
    
    free(delNode);
}

// Print forward
void printForward(struct Node* head) {
    printf("Forward: ");
    while (head != NULL) {
        printf("%d <-> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

// Print backward
void printBackward(struct Node* head) {
    if (head == NULL) return;
    
    // Go to end
    while (head->next != NULL) {
        head = head->next;
    }
    
    printf("Backward: ");
    while (head != NULL) {
        printf("%d <-> ", head->data);
        head = head->prev;
    }
    printf("NULL\\n");
}

// Reverse the list
void reverse(struct Node** head) {
    struct Node* temp = NULL;
    struct Node* current = *head;
    
    while (current != NULL) {
        temp = current->prev;
        current->prev = current->next;
        current->next = temp;
        current = current->prev;
    }
    
    if (temp != NULL) {
        *head = temp->prev;
    }
}

int main() {
    struct Node* head = NULL;
    
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtHead(&head, 5);
    insertAtEnd(&head, 30);
    
    printForward(head);   // 5 <-> 10 <-> 20 <-> 30 <-> NULL
    printBackward(head);  // 30 <-> 20 <-> 10 <-> 5 <-> NULL
    
    reverse(&head);
    printForward(head);   // 30 <-> 20 <-> 10 <-> 5 <-> NULL
    
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
    Node* prev;
    Node* next;
    
    Node(int val) : data(val), prev(nullptr), next(nullptr) {}
};

// Doubly Linked List class
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
    int size;
    
public:
    DoublyLinkedList() : head(nullptr), tail(nullptr), size(0) {}
    
    // Insert at head - O(1)
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        
        if (head == nullptr) {
            head = tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
        size++;
    }
    
    // Insert at tail - O(1) with tail pointer
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        
        if (tail == nullptr) {
            head = tail = newNode;
        } else {
            newNode->prev = tail;
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    // Insert at position - O(n)
    void insertAt(int position, int data) {
        if (position < 0 || position > size) {
            cout << "Invalid position!" << endl;
            return;
        }
        if (position == 0) {
            insertAtHead(data);
            return;
        }
        if (position == size) {
            insertAtTail(data);
            return;
        }
        
        Node* newNode = new Node(data);
        Node* temp = head;
        
        for (int i = 0; i < position - 1; i++) {
            temp = temp->next;
        }
        
        newNode->next = temp->next;
        newNode->prev = temp;
        temp->next->prev = newNode;
        temp->next = newNode;
        size++;
    }
    
    // Delete from head - O(1)
    void deleteFromHead() {
        if (head == nullptr) return;
        
        Node* temp = head;
        head = head->next;
        
        if (head != nullptr) {
            head->prev = nullptr;
        } else {
            tail = nullptr;
        }
        
        delete temp;
        size--;
    }
    
    // Delete from tail - O(1)
    void deleteFromTail() {
        if (tail == nullptr) return;
        
        Node* temp = tail;
        tail = tail->prev;
        
        if (tail != nullptr) {
            tail->next = nullptr;
        } else {
            head = nullptr;
        }
        
        delete temp;
        size--;
    }
    
    // Delete specific node - O(1)
    void deleteNode(Node* node) {
        if (node == nullptr) return;
        
        if (node == head) {
            deleteFromHead();
            return;
        }
        if (node == tail) {
            deleteFromTail();
            return;
        }
        
        node->prev->next = node->next;
        node->next->prev = node->prev;
        delete node;
        size--;
    }
    
    // Search - O(n)
    Node* search(int key) {
        Node* temp = head;
        while (temp != nullptr) {
            if (temp->data == key) return temp;
            temp = temp->next;
        }
        return nullptr;
    }
    
    // Reverse - O(n)
    void reverse() {
        Node* temp = nullptr;
        Node* current = head;
        
        tail = head;
        
        while (current != nullptr) {
            temp = current->prev;
            current->prev = current->next;
            current->next = temp;
            current = current->prev;
        }
        
        if (temp != nullptr) {
            head = temp->prev;
        }
    }
    
    // Print forward
    void printForward() {
        Node* temp = head;
        cout << "Forward: NULL <-> ";
        while (temp != nullptr) {
            cout << temp->data << " <-> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
    
    // Print backward
    void printBackward() {
        Node* temp = tail;
        cout << "Backward: NULL <-> ";
        while (temp != nullptr) {
            cout << temp->data << " <-> ";
            temp = temp->prev;
        }
        cout << "NULL" << endl;
    }
    
    int getSize() { return size; }
    bool isEmpty() { return head == nullptr; }
    
    ~DoublyLinkedList() {
        while (head != nullptr) {
            deleteFromHead();
        }
    }
};

int main() {
    DoublyLinkedList list;
    
    list.insertAtTail(10);
    list.insertAtTail(20);
    list.insertAtHead(5);
    list.insertAtTail(30);
    
    list.printForward();   // NULL <-> 5 <-> 10 <-> 20 <-> 30 <-> NULL
    list.printBackward();  // NULL <-> 30 <-> 20 <-> 10 <-> 5 <-> NULL
    
    list.insertAt(2, 15);
    list.printForward();   // NULL <-> 5 <-> 10 <-> 15 <-> 20 <-> 30 <-> NULL
    
    list.deleteFromTail();
    list.printForward();   // NULL <-> 5 <-> 10 <-> 15 <-> 20 <-> NULL
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Node class
class Node {
    int data;
    Node prev;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// Doubly Linked List class
public class DoublyLinkedList {
    private Node head;
    private Node tail;
    private int size;
    
    public DoublyLinkedList() {
        head = null;
        tail = null;
        size = 0;
    }
    
    // Insert at head - O(1)
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
        size++;
    }
    
    // Insert at tail - O(1)
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        
        if (tail == null) {
            head = tail = newNode;
        } else {
            newNode.prev = tail;
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    // Insert at position - O(n)
    public void insertAt(int position, int data) {
        if (position < 0 || position > size) {
            System.out.println("Invalid position!");
            return;
        }
        if (position == 0) {
            insertAtHead(data);
            return;
        }
        if (position == size) {
            insertAtTail(data);
            return;
        }
        
        Node newNode = new Node(data);
        Node temp = head;
        
        for (int i = 0; i < position - 1; i++) {
            temp = temp.next;
        }
        
        newNode.next = temp.next;
        newNode.prev = temp;
        temp.next.prev = newNode;
        temp.next = newNode;
        size++;
    }
    
    // Delete from head - O(1)
    public void deleteFromHead() {
        if (head == null) return;
        
        head = head.next;
        
        if (head != null) {
            head.prev = null;
        } else {
            tail = null;
        }
        size--;
    }
    
    // Delete from tail - O(1)
    public void deleteFromTail() {
        if (tail == null) return;
        
        tail = tail.prev;
        
        if (tail != null) {
            tail.next = null;
        } else {
            head = null;
        }
        size--;
    }
    
    // Delete specific node - O(1)
    public void deleteNode(Node node) {
        if (node == null) return;
        
        if (node == head) {
            deleteFromHead();
            return;
        }
        if (node == tail) {
            deleteFromTail();
            return;
        }
        
        node.prev.next = node.next;
        node.next.prev = node.prev;
        size--;
    }
    
    // Search - O(n)
    public Node search(int key) {
        Node temp = head;
        while (temp != null) {
            if (temp.data == key) return temp;
            temp = temp.next;
        }
        return null;
    }
    
    // Reverse - O(n)
    public void reverse() {
        Node temp = null;
        Node current = head;
        
        tail = head;
        
        while (current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        
        if (temp != null) {
            head = temp.prev;
        }
    }
    
    // Print forward
    public void printForward() {
        Node temp = head;
        System.out.print("Forward: NULL <-> ");
        while (temp != null) {
            System.out.print(temp.data + " <-> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
    
    // Print backward
    public void printBackward() {
        Node temp = tail;
        System.out.print("Backward: NULL <-> ");
        while (temp != null) {
            System.out.print(temp.data + " <-> ");
            temp = temp.prev;
        }
        System.out.println("NULL");
    }
    
    public int getSize() { return size; }
    public boolean isEmpty() { return head == null; }
    
    public static void main(String[] args) {
        DoublyLinkedList list = new DoublyLinkedList();
        
        list.insertAtTail(10);
        list.insertAtTail(20);
        list.insertAtHead(5);
        list.insertAtTail(30);
        
        list.printForward();   // NULL <-> 5 <-> 10 <-> 20 <-> 30 <-> NULL
        list.printBackward();  // NULL <-> 30 <-> 20 <-> 10 <-> 5 <-> NULL
        
        list.reverse();
        list.printForward();   // NULL <-> 30 <-> 20 <-> 10 <-> 5 <-> NULL
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// Doubly Linked List class
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Insert at head - O(1)
    insertAtHead(data) {
        const newNode = new Node(data);
        
        if (this.head === null) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }
    
    // Insert at tail - O(1)
    insertAtTail(data) {
        const newNode = new Node(data);
        
        if (this.tail === null) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    
    // Insert at position - O(n)
    insertAt(position, data) {
        if (position < 0 || position > this.size) {
            console.log("Invalid position!");
            return;
        }
        if (position === 0) {
            this.insertAtHead(data);
            return;
        }
        if (position === this.size) {
            this.insertAtTail(data);
            return;
        }
        
        const newNode = new Node(data);
        let temp = this.head;
        
        for (let i = 0; i < position - 1; i++) {
            temp = temp.next;
        }
        
        newNode.next = temp.next;
        newNode.prev = temp;
        temp.next.prev = newNode;
        temp.next = newNode;
        this.size++;
    }
    
    // Delete from head - O(1)
    deleteFromHead() {
        if (this.head === null) return null;
        
        const data = this.head.data;
        this.head = this.head.next;
        
        if (this.head !== null) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }
        
        this.size--;
        return data;
    }
    
    // Delete from tail - O(1)
    deleteFromTail() {
        if (this.tail === null) return null;
        
        const data = this.tail.data;
        this.tail = this.tail.prev;
        
        if (this.tail !== null) {
            this.tail.next = null;
        } else {
            this.head = null;
        }
        
        this.size--;
        return data;
    }
    
    // Search - O(n)
    search(key) {
        let temp = this.head;
        let pos = 0;
        while (temp !== null) {
            if (temp.data === key) return { node: temp, position: pos };
            temp = temp.next;
            pos++;
        }
        return null;
    }
    
    // Reverse - O(n)
    reverse() {
        let temp = null;
        let current = this.head;
        
        this.tail = this.head;
        
        while (current !== null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        
        if (temp !== null) {
            this.head = temp.prev;
        }
    }
    
    // Print forward
    printForward() {
        const elements = [];
        let temp = this.head;
        while (temp !== null) {
            elements.push(temp.data);
            temp = temp.next;
        }
        console.log("Forward: NULL <-> " + elements.join(" <-> ") + " <-> NULL");
    }
    
    // Print backward
    printBackward() {
        const elements = [];
        let temp = this.tail;
        while (temp !== null) {
            elements.push(temp.data);
            temp = temp.prev;
        }
        console.log("Backward: NULL <-> " + elements.join(" <-> ") + " <-> NULL");
    }
    
    getSize() { return this.size; }
    isEmpty() { return this.head === null; }
}

// Usage
const list = new DoublyLinkedList();

list.insertAtTail(10);
list.insertAtTail(20);
list.insertAtHead(5);
list.insertAtTail(30);

list.printForward();   // NULL <-> 5 <-> 10 <-> 20 <-> 30 <-> NULL
list.printBackward();  // NULL <-> 30 <-> 20 <-> 10 <-> 5 <-> NULL

list.insertAt(2, 15);
list.printForward();   // NULL <-> 5 <-> 10 <-> 15 <-> 20 <-> 30 <-> NULL

list.reverse();
list.printForward();   // NULL <-> 30 <-> 20 <-> 15 <-> 10 <-> 5 <-> NULL`,
    },
    {
      language: 'Python',
      code: `# Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

# Doubly Linked List class
class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    # Insert at head - O(1)
    def insert_at_head(self, data):
        new_node = Node(data)
        
        if self.head is None:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.size += 1
    
    # Insert at tail - O(1)
    def insert_at_tail(self, data):
        new_node = Node(data)
        
        if self.tail is None:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1
    
    # Insert at position - O(n)
    def insert_at(self, position, data):
        if position < 0 or position > self.size:
            print("Invalid position!")
            return
        if position == 0:
            self.insert_at_head(data)
            return
        if position == self.size:
            self.insert_at_tail(data)
            return
        
        new_node = Node(data)
        temp = self.head
        
        for _ in range(position - 1):
            temp = temp.next
        
        new_node.next = temp.next
        new_node.prev = temp
        temp.next.prev = new_node
        temp.next = new_node
        self.size += 1
    
    # Delete from head - O(1)
    def delete_from_head(self):
        if self.head is None:
            return None
        
        data = self.head.data
        self.head = self.head.next
        
        if self.head is not None:
            self.head.prev = None
        else:
            self.tail = None
        
        self.size -= 1
        return data
    
    # Delete from tail - O(1)
    def delete_from_tail(self):
        if self.tail is None:
            return None
        
        data = self.tail.data
        self.tail = self.tail.prev
        
        if self.tail is not None:
            self.tail.next = None
        else:
            self.head = None
        
        self.size -= 1
        return data
    
    # Delete specific node - O(1)
    def delete_node(self, node):
        if node is None:
            return
        
        if node == self.head:
            self.delete_from_head()
            return
        if node == self.tail:
            self.delete_from_tail()
            return
        
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1
    
    # Search - O(n)
    def search(self, key):
        temp = self.head
        pos = 0
        while temp:
            if temp.data == key:
                return (temp, pos)
            temp = temp.next
            pos += 1
        return None
    
    # Reverse - O(n)
    def reverse(self):
        temp = None
        current = self.head
        
        self.tail = self.head
        
        while current:
            temp = current.prev
            current.prev = current.next
            current.next = temp
            current = current.prev
        
        if temp:
            self.head = temp.prev
    
    # Print forward
    def print_forward(self):
        elements = []
        temp = self.head
        while temp:
            elements.append(str(temp.data))
            temp = temp.next
        print("Forward: NULL <-> " + " <-> ".join(elements) + " <-> NULL")
    
    # Print backward
    def print_backward(self):
        elements = []
        temp = self.tail
        while temp:
            elements.append(str(temp.data))
            temp = temp.prev
        print("Backward: NULL <-> " + " <-> ".join(elements) + " <-> NULL")
    
    def get_size(self):
        return self.size
    
    def is_empty(self):
        return self.head is None
    
    # Iterator for forward traversal
    def __iter__(self):
        temp = self.head
        while temp:
            yield temp.data
            temp = temp.next
    
    # Reverse iterator
    def reverse_iter(self):
        temp = self.tail
        while temp:
            yield temp.data
            temp = temp.prev


# Usage
if __name__ == "__main__":
    lst = DoublyLinkedList()
    
    lst.insert_at_tail(10)
    lst.insert_at_tail(20)
    lst.insert_at_head(5)
    lst.insert_at_tail(30)
    
    lst.print_forward()   # NULL <-> 5 <-> 10 <-> 20 <-> 30 <-> NULL
    lst.print_backward()  # NULL <-> 30 <-> 20 <-> 10 <-> 5 <-> NULL
    
    lst.insert_at(2, 15)
    lst.print_forward()   # NULL <-> 5 <-> 10 <-> 15 <-> 20 <-> 30 <-> NULL
    
    # Using iterators
    print("Forward:", list(lst))           # [5, 10, 15, 20, 30]
    print("Backward:", list(lst.reverse_iter()))  # [30, 20, 15, 10, 5]
    
    lst.reverse()
    lst.print_forward()   # NULL <-> 30 <-> 20 <-> 15 <-> 10 <-> 5 <-> NULL`,
    },
  ],
  types: [
    {
      name: 'Basic Doubly Linked List',
      description: 'Standard implementation with head and tail pointers. Both ends accessible in O(1).',
    },
    {
      name: 'Circular Doubly Linked List',
      description: 'Last node\'s next points to head, head\'s prev points to last. Forms a circle.',
    },
    {
      name: 'Doubly Linked List with Sentinel',
      description: 'Uses dummy head and tail nodes to simplify edge cases in insertion/deletion.',
    },
  ],
  operations: [
    { name: 'Insert at Head', description: 'Add element at the beginning', timeComplexity: 'O(1)' },
    { name: 'Insert at Tail', description: 'Add element at the end', timeComplexity: 'O(1)' },
    { name: 'Insert at Position', description: 'Add element at specific position', timeComplexity: 'O(n)' },
    { name: 'Delete from Head', description: 'Remove first element', timeComplexity: 'O(1)' },
    { name: 'Delete from Tail', description: 'Remove last element', timeComplexity: 'O(1)' },
    { name: 'Delete Node', description: 'Remove a specific node (given reference)', timeComplexity: 'O(1)' },
    { name: 'Search', description: 'Find element by value', timeComplexity: 'O(n)' },
    { name: 'Reverse', description: 'Reverse the entire list', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Bidirectional traversal - can go forward or backward',
    'O(1) deletion when node reference is known',
    'O(1) insertion and deletion at both ends',
    'Easier to implement certain algorithms (e.g., LRU cache)',
    'Can find previous node without traversal',
  ],
  disadvantages: [
    'Extra memory for prev pointer in each node',
    'More complex implementation than singly linked list',
    'More pointer updates needed for operations',
    'Still no random access',
    'Not cache-friendly (non-contiguous memory)',
  ],
  applications: [
    'Browser history (back/forward navigation)',
    'Undo/Redo functionality in applications',
    'LRU (Least Recently Used) cache implementation',
    'Music/video playlist (next/previous)',
    'Text editor cursor movement',
    'Deck of cards in card games',
    'Navigation systems (route history)',
  ],
};
