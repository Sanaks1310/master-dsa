import { TopicContent } from '../topicContents';

export const binaryTreeContent: TopicContent = {
  id: 'binary-tree',
  definition: 'A binary tree is a hierarchical data structure where each node has at most two children, referred to as left child and right child. It is the foundation for many advanced tree structures like BST, AVL, and Heaps.',
  keyPoints: [
    'Each node has at most two children',
    'Left subtree and right subtree are distinct',
    'Can be empty (null) or have one root node',
    'Maximum nodes at level i is 2^i',
    'Maximum total nodes with height h is 2^(h+1) - 1',
    'Minimum height for n nodes is ⌊log₂n⌋',
    'Three main traversals: Inorder, Preorder, Postorder',
    'Level order traversal uses BFS approach',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Binary Tree Implementation in C
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

struct Node* createNode(int data) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

// Inorder Traversal: Left -> Root -> Right
void inorder(struct Node* node) {
    if (node == NULL) return;
    inorder(node->left);
    printf("%d ", node->data);
    inorder(node->right);
}

// Preorder Traversal: Root -> Left -> Right
void preorder(struct Node* node) {
    if (node == NULL) return;
    printf("%d ", node->data);
    preorder(node->left);
    preorder(node->right);
}

// Postorder Traversal: Left -> Right -> Root
void postorder(struct Node* node) {
    if (node == NULL) return;
    postorder(node->left);
    postorder(node->right);
    printf("%d ", node->data);
}

int main() {
    struct Node* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    
    printf("Inorder: "); inorder(root);
    printf("\\nPreorder: "); preorder(root);
    printf("\\nPostorder: "); postorder(root);
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Binary Tree Implementation in C++
#include <iostream>
#include <queue>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BinaryTree {
public:
    Node* root;
    BinaryTree() : root(nullptr) {}
    
    // Inorder: Left -> Root -> Right
    void inorder(Node* node) {
        if (!node) return;
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
    }
    
    // Preorder: Root -> Left -> Right
    void preorder(Node* node) {
        if (!node) return;
        cout << node->data << " ";
        preorder(node->left);
        preorder(node->right);
    }
    
    // Level Order (BFS)
    void levelOrder(Node* root) {
        if (!root) return;
        queue<Node*> q;
        q.push(root);
        
        while (!q.empty()) {
            Node* curr = q.front();
            q.pop();
            cout << curr->data << " ";
            
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
    }
    
    // Check if tree is full binary tree
    bool isFullBinaryTree(Node* node) {
        if (!node) return true;
        if (!node->left && !node->right) return true;
        if (node->left && node->right)
            return isFullBinaryTree(node->left) && 
                   isFullBinaryTree(node->right);
        return false;
    }
};`,
    },
    {
      language: 'Java',
      code: `// Binary Tree Implementation in Java
import java.util.*;

class Node {
    int data;
    Node left, right;
    
    Node(int data) {
        this.data = data;
        left = right = null;
    }
}

class BinaryTree {
    Node root;
    
    // Inorder: Left -> Root -> Right
    void inorder(Node node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.data + " ");
        inorder(node.right);
    }
    
    // Preorder: Root -> Left -> Right
    void preorder(Node node) {
        if (node == null) return;
        System.out.print(node.data + " ");
        preorder(node.left);
        preorder(node.right);
    }
    
    // Postorder: Left -> Right -> Root
    void postorder(Node node) {
        if (node == null) return;
        postorder(node.left);
        postorder(node.right);
        System.out.print(node.data + " ");
    }
    
    // Level Order Traversal (BFS)
    void levelOrder(Node root) {
        if (root == null) return;
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            Node curr = queue.poll();
            System.out.print(curr.data + " ");
            
            if (curr.left != null) queue.add(curr.left);
            if (curr.right != null) queue.add(curr.right);
        }
    }
    
    // Check if tree is complete
    boolean isComplete(Node root) {
        if (root == null) return true;
        Queue<Node> q = new LinkedList<>();
        q.add(root);
        boolean foundNull = false;
        
        while (!q.isEmpty()) {
            Node curr = q.poll();
            if (curr == null) {
                foundNull = true;
            } else {
                if (foundNull) return false;
                q.add(curr.left);
                q.add(curr.right);
            }
        }
        return true;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Binary Tree Implementation in JavaScript
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // Inorder: Left -> Root -> Right
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.data);
      this.inorder(node.right, result);
    }
    return result;
  }
  
  // Preorder: Root -> Left -> Right
  preorder(node = this.root, result = []) {
    if (node) {
      result.push(node.data);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }
  
  // Postorder: Left -> Right -> Root
  postorder(node = this.root, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.data);
    }
    return result;
  }
  
  // Level Order (BFS)
  levelOrder() {
    if (!this.root) return [];
    const result = [];
    const queue = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }
  
  // Check if perfect binary tree
  isPerfect(node = this.root, depth = 0, level = 0) {
    if (!node) return true;
    if (!node.left && !node.right) 
      return depth === level || depth === 0;
    if (!node.left || !node.right) return false;
    return this.isPerfect(node.left, depth, level + 1) &&
           this.isPerfect(node.right, depth, level + 1);
  }
}`,
    },
    {
      language: 'Python',
      code: `# Binary Tree Implementation in Python
from collections import deque

class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    # Inorder: Left -> Root -> Right
    def inorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.data)
            self.inorder(node.right, result)
        return result
    
    # Preorder: Root -> Left -> Right
    def preorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            result.append(node.data)
            self.preorder(node.left, result)
            self.preorder(node.right, result)
        return result
    
    # Postorder: Left -> Right -> Root
    def postorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.postorder(node.left, result)
            self.postorder(node.right, result)
            result.append(node.data)
        return result
    
    # Level Order (BFS)
    def level_order(self):
        if not self.root:
            return []
        result = []
        queue = deque([self.root])
        
        while queue:
            node = queue.popleft()
            result.append(node.data)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return result
    
    # Mirror the tree
    def mirror(self, node):
        if node is None:
            return None
        node.left, node.right = node.right, node.left
        self.mirror(node.left)
        self.mirror(node.right)
        return node`,
    },
  ],
  types: [
    {
      name: 'Full Binary Tree',
      description: 'Every node has 0 or 2 children, no node has only one child',
    },
    {
      name: 'Complete Binary Tree',
      description: 'All levels completely filled except possibly the last level, which is filled from left',
    },
    {
      name: 'Perfect Binary Tree',
      description: 'All internal nodes have exactly 2 children and all leaves are at the same level',
    },
    {
      name: 'Balanced Binary Tree',
      description: 'Height of left and right subtrees differ by at most 1 for every node',
    },
    {
      name: 'Degenerate Tree',
      description: 'Each parent has only one child, essentially becomes a linked list',
    },
  ],
  operations: [
    {
      name: 'Insertion',
      description: 'Add a new node to the tree',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Deletion',
      description: 'Remove a node from the tree',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Inorder Traversal',
      description: 'Visit left subtree, root, then right subtree',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Preorder Traversal',
      description: 'Visit root, left subtree, then right subtree',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Postorder Traversal',
      description: 'Visit left subtree, right subtree, then root',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Level Order Traversal',
      description: 'Visit nodes level by level using BFS',
      timeComplexity: 'O(n)',
    },
  ],
  advantages: [
    'Simple structure with maximum two children',
    'Foundation for BST, AVL, Heap structures',
    'Easy to implement and understand',
    'Efficient for expression parsing',
    'Natural recursive structure',
  ],
  disadvantages: [
    'No ordering guarantee (unlike BST)',
    'Can become skewed (degenerate)',
    'Search is O(n) in worst case',
    'Memory overhead for pointers',
    'Balancing not automatic',
  ],
  applications: [
    'Expression trees for arithmetic expressions',
    'Huffman coding for data compression',
    'Syntax trees in compilers',
    'Decision trees',
    'Heap implementation',
    'Binary space partitioning in graphics',
  ],
};
