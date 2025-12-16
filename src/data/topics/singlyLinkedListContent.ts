import { TopicContent } from '../topicContents';

export const singlyLinkedListContent: TopicContent = {
  id: 'singly-linked-list',
  definition: 'A Singly Linked List is a linear data structure where each element (node) contains data and a pointer to the next node. Unlike arrays, elements are not stored in contiguous memory locations. The list starts from a "head" pointer and ends when a node points to NULL. Think of it like a train where each car (node) is connected to the next car.',
  keyPoints: [
    'Each node has two parts: data and pointer to next node',
    'Only forward traversal is possible',
    'First node is called "head", last node points to NULL',
    'Dynamic size - grows and shrinks as needed',
    'No random access - must traverse from head',
    'Insertion/deletion at head is O(1)',
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
    newNode->next = NULL;
    return newNode;
}

// Insert at the beginning
void insertAtHead(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    newNode->next = *head;
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
}

// Insert after a specific node
void insertAfter(struct Node* prevNode, int data) {
    if (prevNode == NULL) {
        printf("Previous node cannot be NULL\\n");
        return;
    }
    struct Node* newNode = createNode(data);
    newNode->next = prevNode->next;
    prevNode->next = newNode;
}

// Delete a node by value
void deleteNode(struct Node** head, int key) {
    struct Node* temp = *head;
    struct Node* prev = NULL;
    
    // If head node contains the key
    if (temp != NULL && temp->data == key) {
        *head = temp->next;
        free(temp);
        return;
    }
    
    // Search for the key
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }
    
    // Key not found
    if (temp == NULL) return;
    
    // Unlink and free
    prev->next = temp->next;
    free(temp);
}

// Search for an element
int search(struct Node* head, int key) {
    struct Node* current = head;
    int position = 0;
    while (current != NULL) {
        if (current->data == key)
            return position;
        current = current->next;
        position++;
    }
    return -1; // Not found
}

// Get length of list
int getLength(struct Node* head) {
    int count = 0;
    struct Node* current = head;
    while (current != NULL) {
        count++;
        current = current->next;
    }
    return count;
}

// Print the list
void printList(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

// Reverse the list
void reverse(struct Node** head) {
    struct Node* prev = NULL;
    struct Node* current = *head;
    struct Node* next = NULL;
    
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    *head = prev;
}

int main() {
    struct Node* head = NULL;
    
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtHead(&head, 5);
    insertAtEnd(&head, 30);
    
    printf("List: ");
    printList(head);  // 5 -> 10 -> 20 -> 30 -> NULL
    
    printf("Length: %d\\n", getLength(head));  // 4
    printf("Position of 20: %d\\n", search(head, 20));  // 2
    
    reverse(&head);
    printf("Reversed: ");
    printList(head);  // 30 -> 20 -> 10 -> 5 -> NULL
    
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
    
    Node(int val) : data(val), next(nullptr) {}
};

// Singly Linked List class
class SinglyLinkedList {
private:
    Node* head;
    int size;
    
public:
    SinglyLinkedList() : head(nullptr), size(0) {}
    
    // Insert at head - O(1)
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    // Insert at tail - O(n)
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
        } else {
            Node* temp = head;
            while (temp->next != nullptr) {
                temp = temp->next;
            }
            temp->next = newNode;
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
        
        Node* newNode = new Node(data);
        Node* temp = head;
        for (int i = 0; i < position - 1; i++) {
            temp = temp->next;
        }
        newNode->next = temp->next;
        temp->next = newNode;
        size++;
    }
    
    // Delete from head - O(1)
    void deleteFromHead() {
        if (head == nullptr) return;
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
    }
    
    // Delete by value - O(n)
    void deleteByValue(int key) {
        if (head == nullptr) return;
        
        if (head->data == key) {
            deleteFromHead();
            return;
        }
        
        Node* temp = head;
        while (temp->next != nullptr && temp->next->data != key) {
            temp = temp->next;
        }
        
        if (temp->next == nullptr) return;
        
        Node* toDelete = temp->next;
        temp->next = temp->next->next;
        delete toDelete;
        size--;
    }
    
    // Search - O(n)
    int search(int key) {
        Node* temp = head;
        int pos = 0;
        while (temp != nullptr) {
            if (temp->data == key) return pos;
            temp = temp->next;
            pos++;
        }
        return -1;
    }
    
    // Reverse - O(n)
    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        Node* next = nullptr;
        
        while (current != nullptr) {
            next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
    
    // Get middle element - O(n)
    int getMiddle() {
        if (head == nullptr) return -1;
        Node* slow = head;
        Node* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow->data;
    }
    
    // Print list
    void print() {
        Node* temp = head;
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
    
    int getSize() { return size; }
    bool isEmpty() { return head == nullptr; }
    
    ~SinglyLinkedList() {
        while (head != nullptr) {
            deleteFromHead();
        }
    }
};

int main() {
    SinglyLinkedList list;
    
    list.insertAtTail(10);
    list.insertAtTail(20);
    list.insertAtHead(5);
    list.insertAt(2, 15);
    
    cout << "List: ";
    list.print();  // 5 -> 10 -> 15 -> 20 -> NULL
    
    cout << "Middle: " << list.getMiddle() << endl;  // 10 or 15
    
    list.reverse();
    cout << "Reversed: ";
    list.print();  // 20 -> 15 -> 10 -> 5 -> NULL
    
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
        this.next = null;
    }
}

// Singly Linked List class
public class SinglyLinkedList {
    private Node head;
    private int size;
    
    public SinglyLinkedList() {
        head = null;
        size = 0;
    }
    
    // Insert at head - O(1)
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    // Insert at tail - O(n)
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
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
        
        Node newNode = new Node(data);
        Node temp = head;
        for (int i = 0; i < position - 1; i++) {
            temp = temp.next;
        }
        newNode.next = temp.next;
        temp.next = newNode;
        size++;
    }
    
    // Delete from head - O(1)
    public void deleteFromHead() {
        if (head == null) return;
        head = head.next;
        size--;
    }
    
    // Delete by value - O(n)
    public void deleteByValue(int key) {
        if (head == null) return;
        
        if (head.data == key) {
            deleteFromHead();
            return;
        }
        
        Node temp = head;
        while (temp.next != null && temp.next.data != key) {
            temp = temp.next;
        }
        
        if (temp.next == null) return;
        temp.next = temp.next.next;
        size--;
    }
    
    // Search - O(n)
    public int search(int key) {
        Node temp = head;
        int pos = 0;
        while (temp != null) {
            if (temp.data == key) return pos;
            temp = temp.next;
            pos++;
        }
        return -1;
    }
    
    // Reverse - O(n)
    public void reverse() {
        Node prev = null;
        Node current = head;
        Node next = null;
        
        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
    
    // Get middle element - O(n)
    public int getMiddle() {
        if (head == null) return -1;
        Node slow = head;
        Node fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.data;
    }
    
    // Detect cycle - O(n)
    public boolean hasCycle() {
        if (head == null) return false;
        Node slow = head;
        Node fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    
    // Print list
    public void print() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
    
    public int getSize() { return size; }
    public boolean isEmpty() { return head == null; }
    
    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        
        list.insertAtTail(10);
        list.insertAtTail(20);
        list.insertAtHead(5);
        list.insertAt(2, 15);
        
        System.out.print("List: ");
        list.print();  // 5 -> 10 -> 15 -> 20 -> NULL
        
        System.out.println("Middle: " + list.getMiddle());
        
        list.reverse();
        System.out.print("Reversed: ");
        list.print();
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

// Singly Linked List class
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Insert at head - O(1)
    insertAtHead(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    // Insert at tail - O(n)
    insertAtTail(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next !== null) {
                temp = temp.next;
            }
            temp.next = newNode;
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
        
        const newNode = new Node(data);
        let temp = this.head;
        for (let i = 0; i < position - 1; i++) {
            temp = temp.next;
        }
        newNode.next = temp.next;
        temp.next = newNode;
        this.size++;
    }
    
    // Delete from head - O(1)
    deleteFromHead() {
        if (this.head === null) return null;
        const data = this.head.data;
        this.head = this.head.next;
        this.size--;
        return data;
    }
    
    // Delete by value - O(n)
    deleteByValue(key) {
        if (this.head === null) return;
        
        if (this.head.data === key) {
            this.deleteFromHead();
            return;
        }
        
        let temp = this.head;
        while (temp.next !== null && temp.next.data !== key) {
            temp = temp.next;
        }
        
        if (temp.next === null) return;
        temp.next = temp.next.next;
        this.size--;
    }
    
    // Search - O(n)
    search(key) {
        let temp = this.head;
        let pos = 0;
        while (temp !== null) {
            if (temp.data === key) return pos;
            temp = temp.next;
            pos++;
        }
        return -1;
    }
    
    // Reverse - O(n)
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current !== null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }
    
    // Get middle - O(n)
    getMiddle() {
        if (this.head === null) return null;
        let slow = this.head;
        let fast = this.head;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.data;
    }
    
    // Convert to array
    toArray() {
        const result = [];
        let temp = this.head;
        while (temp !== null) {
            result.push(temp.data);
            temp = temp.next;
        }
        return result;
    }
    
    // Print list
    print() {
        console.log(this.toArray().join(" -> ") + " -> NULL");
    }
    
    getSize() { return this.size; }
    isEmpty() { return this.head === null; }
}

// Usage
const list = new SinglyLinkedList();

list.insertAtTail(10);
list.insertAtTail(20);
list.insertAtHead(5);
list.insertAt(2, 15);

console.log("List:");
list.print();  // 5 -> 10 -> 15 -> 20 -> NULL

console.log("Middle:", list.getMiddle());  // 10 or 15

list.reverse();
console.log("Reversed:");
list.print();  // 20 -> 15 -> 10 -> 5 -> NULL`,
    },
    {
      language: 'Python',
      code: `# Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Singly Linked List class
class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    # Insert at head - O(1)
    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    # Insert at tail - O(n)
    def insert_at_tail(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = new_node
        self.size += 1
    
    # Insert at position - O(n)
    def insert_at(self, position, data):
        if position < 0 or position > self.size:
            print("Invalid position!")
            return
        if position == 0:
            self.insert_at_head(data)
            return
        
        new_node = Node(data)
        temp = self.head
        for _ in range(position - 1):
            temp = temp.next
        new_node.next = temp.next
        temp.next = new_node
        self.size += 1
    
    # Delete from head - O(1)
    def delete_from_head(self):
        if self.head is None:
            return None
        data = self.head.data
        self.head = self.head.next
        self.size -= 1
        return data
    
    # Delete by value - O(n)
    def delete_by_value(self, key):
        if self.head is None:
            return
        
        if self.head.data == key:
            self.delete_from_head()
            return
        
        temp = self.head
        while temp.next and temp.next.data != key:
            temp = temp.next
        
        if temp.next is None:
            return
        temp.next = temp.next.next
        self.size -= 1
    
    # Search - O(n)
    def search(self, key):
        temp = self.head
        pos = 0
        while temp:
            if temp.data == key:
                return pos
            temp = temp.next
            pos += 1
        return -1
    
    # Reverse - O(n)
    def reverse(self):
        prev = None
        current = self.head
        
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        self.head = prev
    
    # Get middle - O(n) using slow/fast pointers
    def get_middle(self):
        if self.head is None:
            return None
        slow = fast = self.head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow.data
    
    # Detect cycle - O(n)
    def has_cycle(self):
        if self.head is None:
            return False
        slow = fast = self.head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
    
    # Convert to list
    def to_list(self):
        result = []
        temp = self.head
        while temp:
            result.append(temp.data)
            temp = temp.next
        return result
    
    # Print list
    def print_list(self):
        print(" -> ".join(map(str, self.to_list())) + " -> NULL")
    
    def get_size(self):
        return self.size
    
    def is_empty(self):
        return self.head is None
    
    # Iterator support
    def __iter__(self):
        temp = self.head
        while temp:
            yield temp.data
            temp = temp.next
    
    def __len__(self):
        return self.size


# Usage
if __name__ == "__main__":
    lst = SinglyLinkedList()
    
    lst.insert_at_tail(10)
    lst.insert_at_tail(20)
    lst.insert_at_head(5)
    lst.insert_at(2, 15)
    
    print("List:")
    lst.print_list()  # 5 -> 10 -> 15 -> 20 -> NULL
    
    print(f"Middle: {lst.get_middle()}")  # 10 or 15
    print(f"Search 15: position {lst.search(15)}")  # 2
    
    lst.reverse()
    print("Reversed:")
    lst.print_list()  # 20 -> 15 -> 10 -> 5 -> NULL
    
    # Using iterator
    print("Elements:", list(lst))  # [20, 15, 10, 5]`,
    },
  ],
  types: [
    {
      name: 'Basic Singly Linked List',
      description: 'Simple implementation with head pointer only. Insertion at tail requires traversal.',
    },
    {
      name: 'Singly Linked List with Tail Pointer',
      description: 'Maintains both head and tail pointers. Insertion at tail becomes O(1).',
    },
    {
      name: 'Sorted Singly Linked List',
      description: 'Elements are kept in sorted order. Insertion finds correct position.',
    },
  ],
  operations: [
    { name: 'Insert at Head', description: 'Add element at the beginning', timeComplexity: 'O(1)' },
    { name: 'Insert at Tail', description: 'Add element at the end', timeComplexity: 'O(n)' },
    { name: 'Insert at Position', description: 'Add element at specific position', timeComplexity: 'O(n)' },
    { name: 'Delete from Head', description: 'Remove first element', timeComplexity: 'O(1)' },
    { name: 'Delete from Tail', description: 'Remove last element', timeComplexity: 'O(n)' },
    { name: 'Search', description: 'Find element by value', timeComplexity: 'O(n)' },
    { name: 'Reverse', description: 'Reverse the entire list', timeComplexity: 'O(n)' },
    { name: 'Get Middle', description: 'Find middle element', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Dynamic size - no need to specify size upfront',
    'Efficient insertion at head - O(1)',
    'No memory waste - allocates exactly what is needed',
    'Easy to implement basic operations',
    'Foundation for stacks and queues',
  ],
  disadvantages: [
    'No random access - must traverse from head',
    'Extra memory for storing pointers',
    'Not cache-friendly (non-contiguous memory)',
    'Cannot traverse backwards',
    'Insertion at tail is O(n) without tail pointer',
  ],
  applications: [
    'Implementation of stacks (LIFO)',
    'Implementation of queues (with tail pointer)',
    'Polynomial addition and multiplication',
    'Hash table chaining for collision handling',
    'Undo functionality (single level)',
    'Memory allocation in operating systems',
    'Symbol tables in compilers',
  ],
};
