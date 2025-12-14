import { TopicContent } from '../topicContents';

export const bstContent: TopicContent = {
  id: 'binary-search-trees',
  definition: 'A Binary Search Tree (BST) is a binary tree where each node follows the BST property: all values in the left subtree are less than the node, and all values in the right subtree are greater. This ordering enables efficient searching, insertion, and deletion operations.',
  keyPoints: [
    'Left subtree values < Node value < Right subtree values',
    'Inorder traversal gives sorted order',
    'Search, insert, delete are O(log n) on average',
    'Can degenerate to O(n) if unbalanced',
    'Foundation for self-balancing trees (AVL, Red-Black)',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

// BST Node
struct BSTNode {
    int data;
    struct BSTNode* left;
    struct BSTNode* right;
};

// Create new node
struct BSTNode* createNode(int data) {
    struct BSTNode* node = (struct BSTNode*)malloc(sizeof(struct BSTNode));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

// Insert a value
struct BSTNode* insert(struct BSTNode* root, int data) {
    if (root == NULL) return createNode(data);
    
    if (data < root->data)
        root->left = insert(root->left, data);
    else if (data > root->data)
        root->right = insert(root->right, data);
    
    return root;
}

// Search for a value
struct BSTNode* search(struct BSTNode* root, int key) {
    if (root == NULL || root->data == key)
        return root;
    
    if (key < root->data)
        return search(root->left, key);
    return search(root->right, key);
}

// Find minimum value node
struct BSTNode* minValueNode(struct BSTNode* node) {
    struct BSTNode* current = node;
    while (current && current->left != NULL)
        current = current->left;
    return current;
}

// Delete a value
struct BSTNode* deleteNode(struct BSTNode* root, int key) {
    if (root == NULL) return root;
    
    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        // Node with one child or no child
        if (root->left == NULL) {
            struct BSTNode* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct BSTNode* temp = root->left;
            free(root);
            return temp;
        }
        
        // Node with two children
        struct BSTNode* temp = minValueNode(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

// Inorder traversal (sorted order)
void inorder(struct BSTNode* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
using namespace std;

class BSTNode {
public:
    int data;
    BSTNode* left;
    BSTNode* right;
    
    BSTNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BST {
public:
    BSTNode* root;
    
    BST() : root(nullptr) {}
    
    // Insert
    BSTNode* insert(BSTNode* node, int data) {
        if (node == nullptr) return new BSTNode(data);
        
        if (data < node->data)
            node->left = insert(node->left, data);
        else if (data > node->data)
            node->right = insert(node->right, data);
        
        return node;
    }
    
    void insert(int data) {
        root = insert(root, data);
    }
    
    // Search
    bool search(BSTNode* node, int key) {
        if (node == nullptr) return false;
        if (node->data == key) return true;
        
        if (key < node->data)
            return search(node->left, key);
        return search(node->right, key);
    }
    
    bool search(int key) {
        return search(root, key);
    }
    
    // Find minimum
    BSTNode* findMin(BSTNode* node) {
        while (node && node->left)
            node = node->left;
        return node;
    }
    
    // Find maximum
    BSTNode* findMax(BSTNode* node) {
        while (node && node->right)
            node = node->right;
        return node;
    }
    
    // Delete
    BSTNode* deleteNode(BSTNode* node, int key) {
        if (node == nullptr) return nullptr;
        
        if (key < node->data)
            node->left = deleteNode(node->left, key);
        else if (key > node->data)
            node->right = deleteNode(node->right, key);
        else {
            if (node->left == nullptr) {
                BSTNode* temp = node->right;
                delete node;
                return temp;
            } else if (node->right == nullptr) {
                BSTNode* temp = node->left;
                delete node;
                return temp;
            }
            
            BSTNode* temp = findMin(node->right);
            node->data = temp->data;
            node->right = deleteNode(node->right, temp->data);
        }
        return node;
    }
    
    // Inorder (sorted)
    void inorder(BSTNode* node) {
        if (node) {
            inorder(node->left);
            cout << node->data << " ";
            inorder(node->right);
        }
    }
};`,
    },
    {
      language: 'Java',
      code: `class BSTNode {
    int data;
    BSTNode left, right;
    
    BSTNode(int data) {
        this.data = data;
        left = right = null;
    }
}

class BST {
    BSTNode root;
    
    // Insert
    BSTNode insert(BSTNode node, int data) {
        if (node == null) return new BSTNode(data);
        
        if (data < node.data)
            node.left = insert(node.left, data);
        else if (data > node.data)
            node.right = insert(node.right, data);
        
        return node;
    }
    
    void insert(int data) {
        root = insert(root, data);
    }
    
    // Search
    boolean search(BSTNode node, int key) {
        if (node == null) return false;
        if (node.data == key) return true;
        
        if (key < node.data)
            return search(node.left, key);
        return search(node.right, key);
    }
    
    boolean search(int key) {
        return search(root, key);
    }
    
    // Find minimum
    BSTNode findMin(BSTNode node) {
        while (node != null && node.left != null)
            node = node.left;
        return node;
    }
    
    // Delete
    BSTNode deleteNode(BSTNode node, int key) {
        if (node == null) return null;
        
        if (key < node.data)
            node.left = deleteNode(node.left, key);
        else if (key > node.data)
            node.right = deleteNode(node.right, key);
        else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            
            BSTNode temp = findMin(node.right);
            node.data = temp.data;
            node.right = deleteNode(node.right, temp.data);
        }
        return node;
    }
    
    void delete(int key) {
        root = deleteNode(root, key);
    }
    
    // Inorder
    void inorder(BSTNode node) {
        if (node != null) {
            inorder(node.left);
            System.out.print(node.data + " ");
            inorder(node.right);
        }
    }
    
    // Validate BST
    boolean isValidBST(BSTNode node, Integer min, Integer max) {
        if (node == null) return true;
        if ((min != null && node.data <= min) || (max != null && node.data >= max))
            return false;
        return isValidBST(node.left, min, node.data) && 
               isValidBST(node.right, node.data, max);
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `class BSTNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    // Insert
    insert(data) {
        const newNode = new BSTNode(data);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }
    
    _insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) node.left = newNode;
            else this._insertNode(node.left, newNode);
        } else {
            if (node.right === null) node.right = newNode;
            else this._insertNode(node.right, newNode);
        }
    }
    
    // Search
    search(data) {
        return this._searchNode(this.root, data);
    }
    
    _searchNode(node, data) {
        if (node === null) return false;
        if (data === node.data) return true;
        
        if (data < node.data)
            return this._searchNode(node.left, data);
        return this._searchNode(node.right, data);
    }
    
    // Find minimum
    findMin(node = this.root) {
        while (node && node.left) node = node.left;
        return node ? node.data : null;
    }
    
    // Find maximum
    findMax(node = this.root) {
        while (node && node.right) node = node.right;
        return node ? node.data : null;
    }
    
    // Delete
    delete(data) {
        this.root = this._deleteNode(this.root, data);
    }
    
    _deleteNode(node, data) {
        if (node === null) return null;
        
        if (data < node.data) {
            node.left = this._deleteNode(node.left, data);
        } else if (data > node.data) {
            node.right = this._deleteNode(node.right, data);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            
            let minRight = node.right;
            while (minRight.left) minRight = minRight.left;
            node.data = minRight.data;
            node.right = this._deleteNode(node.right, minRight.data);
        }
        return node;
    }
    
    // Inorder (sorted)
    inorder(node = this.root, result = []) {
        if (node) {
            this.inorder(node.left, result);
            result.push(node.data);
            this.inorder(node.right, result);
        }
        return result;
    }
}`,
    },
    {
      language: 'Python',
      code: `class BSTNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    # Insert
    def insert(self, data):
        if self.root is None:
            self.root = BSTNode(data)
        else:
            self._insert(self.root, data)
    
    def _insert(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = BSTNode(data)
            else:
                self._insert(node.left, data)
        else:
            if node.right is None:
                node.right = BSTNode(data)
            else:
                self._insert(node.right, data)
    
    # Search
    def search(self, data):
        return self._search(self.root, data)
    
    def _search(self, node, data):
        if node is None:
            return False
        if node.data == data:
            return True
        if data < node.data:
            return self._search(node.left, data)
        return self._search(node.right, data)
    
    # Find minimum
    def find_min(self, node=None):
        if node is None:
            node = self.root
        while node and node.left:
            node = node.left
        return node.data if node else None
    
    # Find maximum
    def find_max(self, node=None):
        if node is None:
            node = self.root
        while node and node.right:
            node = node.right
        return node.data if node else None
    
    # Delete
    def delete(self, data):
        self.root = self._delete(self.root, data)
    
    def _delete(self, node, data):
        if node is None:
            return None
        
        if data < node.data:
            node.left = self._delete(node.left, data)
        elif data > node.data:
            node.right = self._delete(node.right, data)
        else:
            if node.left is None:
                return node.right
            if node.right is None:
                return node.left
            
            # Find inorder successor
            min_node = node.right
            while min_node.left:
                min_node = min_node.left
            node.data = min_node.data
            node.right = self._delete(node.right, min_node.data)
        
        return node
    
    # Inorder (sorted)
    def inorder(self, node=None, result=None):
        if result is None:
            result = []
        if node is None:
            node = self.root
        if node:
            self.inorder(node.left, result)
            result.append(node.data)
            self.inorder(node.right, result)
        return result
    
    # Validate BST
    def is_valid_bst(self, node=None, min_val=float('-inf'), max_val=float('inf')):
        if node is None:
            node = self.root
        if node is None:
            return True
        if node.data <= min_val or node.data >= max_val:
            return False
        return (self.is_valid_bst(node.left, min_val, node.data) and
                self.is_valid_bst(node.right, node.data, max_val))`,
    },
  ],
  types: [
    {
      name: 'Standard BST',
      description: 'Basic BST without self-balancing, can degenerate to O(n).',
    },
    {
      name: 'AVL Tree',
      description: 'Self-balancing BST maintaining height balance factor ≤ 1.',
    },
    {
      name: 'Red-Black Tree',
      description: 'Self-balancing BST using color properties for balance.',
    },
    {
      name: 'Splay Tree',
      description: 'Self-adjusting BST that moves accessed nodes to root.',
    },
  ],
  operations: [
    { name: 'Search', description: 'Find a value in the tree', timeComplexity: 'O(log n) avg, O(n) worst' },
    { name: 'Insert', description: 'Add a new value', timeComplexity: 'O(log n) avg, O(n) worst' },
    { name: 'Delete', description: 'Remove a value', timeComplexity: 'O(log n) avg, O(n) worst' },
    { name: 'Find Min', description: 'Find minimum value', timeComplexity: 'O(log n) avg, O(n) worst' },
    { name: 'Find Max', description: 'Find maximum value', timeComplexity: 'O(log n) avg, O(n) worst' },
    { name: 'Inorder', description: 'Get sorted sequence', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Efficient search, insert, delete O(log n) average',
    'Maintains sorted order automatically',
    'Inorder traversal gives sorted sequence',
    'Can find min/max efficiently',
    'Foundation for many advanced trees',
  ],
  disadvantages: [
    'Can become unbalanced (O(n) worst case)',
    'No random access like arrays',
    'More complex than linear structures',
    'Requires extra memory for pointers',
    'Performance depends on insertion order',
  ],
  applications: [
    'Database indexing and searching',
    'Symbol tables in compilers',
    'Priority queues implementation',
    'Implementing sets and maps',
    'Range queries and order statistics',
    'Auto-complete and spell checkers',
  ],
};
