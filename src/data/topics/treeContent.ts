import { TopicContent } from '../topicContents';

export const treeContent: TopicContent = {
  id: 'trees',
  definition: 'A Tree is a hierarchical, non-linear data structure consisting of nodes connected by edges. It has a root node at the top, and each node can have zero or more child nodes. Trees are used to represent hierarchical relationships and enable efficient searching, insertion, and deletion.',
  keyPoints: [
    'Hierarchical structure with root at the top',
    'Each node has at most one parent (except root)',
    'Nodes with no children are called leaves',
    'Height is the longest path from root to leaf',
    'Depth is the distance from root to a node',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

// Tree Node structure
struct TreeNode {
    int data;
    struct TreeNode* left;
    struct TreeNode* right;
};

// Create new node
struct TreeNode* createNode(int data) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

// Inorder Traversal (Left, Root, Right)
void inorder(struct TreeNode* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

// Preorder Traversal (Root, Left, Right)
void preorder(struct TreeNode* root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorder(root->left);
        preorder(root->right);
    }
}

// Postorder Traversal (Left, Right, Root)
void postorder(struct TreeNode* root) {
    if (root != NULL) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->data);
    }
}

// Calculate height
int height(struct TreeNode* root) {
    if (root == NULL) return -1;
    int leftHeight = height(root->left);
    int rightHeight = height(root->right);
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

// Usage
int main() {
    struct TreeNode* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    
    printf("Inorder: ");
    inorder(root);  // 4 2 5 1 3
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <queue>
using namespace std;

// Tree Node class
class TreeNode {
public:
    int data;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Binary Tree class
class BinaryTree {
public:
    TreeNode* root;
    
    BinaryTree() : root(nullptr) {}
    
    // Inorder Traversal
    void inorder(TreeNode* node) {
        if (node == nullptr) return;
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
    }
    
    // Preorder Traversal
    void preorder(TreeNode* node) {
        if (node == nullptr) return;
        cout << node->data << " ";
        preorder(node->left);
        preorder(node->right);
    }
    
    // Postorder Traversal
    void postorder(TreeNode* node) {
        if (node == nullptr) return;
        postorder(node->left);
        postorder(node->right);
        cout << node->data << " ";
    }
    
    // Level Order Traversal (BFS)
    void levelOrder(TreeNode* node) {
        if (node == nullptr) return;
        queue<TreeNode*> q;
        q.push(node);
        
        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            cout << current->data << " ";
            
            if (current->left) q.push(current->left);
            if (current->right) q.push(current->right);
        }
    }
    
    // Calculate height
    int height(TreeNode* node) {
        if (node == nullptr) return -1;
        return 1 + max(height(node->left), height(node->right));
    }
    
    // Count nodes
    int countNodes(TreeNode* node) {
        if (node == nullptr) return 0;
        return 1 + countNodes(node->left) + countNodes(node->right);
    }
};`,
    },
    {
      language: 'Java',
      code: `import java.util.LinkedList;
import java.util.Queue;

// Tree Node class
class TreeNode {
    int data;
    TreeNode left, right;
    
    TreeNode(int data) {
        this.data = data;
        left = right = null;
    }
}

// Binary Tree class
class BinaryTree {
    TreeNode root;
    
    // Inorder Traversal
    void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.data + " ");
        inorder(node.right);
    }
    
    // Preorder Traversal
    void preorder(TreeNode node) {
        if (node == null) return;
        System.out.print(node.data + " ");
        preorder(node.left);
        preorder(node.right);
    }
    
    // Postorder Traversal
    void postorder(TreeNode node) {
        if (node == null) return;
        postorder(node.left);
        postorder(node.right);
        System.out.print(node.data + " ");
    }
    
    // Level Order Traversal (BFS)
    void levelOrder(TreeNode node) {
        if (node == null) return;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(node);
        
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            System.out.print(current.data + " ");
            
            if (current.left != null) queue.add(current.left);
            if (current.right != null) queue.add(current.right);
        }
    }
    
    // Calculate height
    int height(TreeNode node) {
        if (node == null) return -1;
        return 1 + Math.max(height(node.left), height(node.right));
    }
    
    // Check if balanced
    boolean isBalanced(TreeNode node) {
        if (node == null) return true;
        int diff = Math.abs(height(node.left) - height(node.right));
        return diff <= 1 && isBalanced(node.left) && isBalanced(node.right);
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Tree Node class
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Binary Tree class
class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // Inorder Traversal
    inorder(node, result = []) {
        if (node === null) return result;
        this.inorder(node.left, result);
        result.push(node.data);
        this.inorder(node.right, result);
        return result;
    }
    
    // Preorder Traversal
    preorder(node, result = []) {
        if (node === null) return result;
        result.push(node.data);
        this.preorder(node.left, result);
        this.preorder(node.right, result);
        return result;
    }
    
    // Postorder Traversal
    postorder(node, result = []) {
        if (node === null) return result;
        this.postorder(node.left, result);
        this.postorder(node.right, result);
        result.push(node.data);
        return result;
    }
    
    // Level Order Traversal (BFS)
    levelOrder(node) {
        if (node === null) return [];
        const result = [];
        const queue = [node];
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.data);
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return result;
    }
    
    // Calculate height
    height(node) {
        if (node === null) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
}

// Usage
const tree = new BinaryTree();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
console.log(tree.inorder(tree.root));  // [2, 1, 3]`,
    },
    {
      language: 'Python',
      code: `from collections import deque

# Tree Node class
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# Binary Tree class
class BinaryTree:
    def __init__(self):
        self.root = None
    
    # Inorder Traversal
    def inorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.data)
            self.inorder(node.right, result)
        return result
    
    # Preorder Traversal
    def preorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            result.append(node.data)
            self.preorder(node.left, result)
            self.preorder(node.right, result)
        return result
    
    # Postorder Traversal
    def postorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.postorder(node.left, result)
            self.postorder(node.right, result)
            result.append(node.data)
        return result
    
    # Level Order Traversal (BFS)
    def level_order(self, node):
        if not node:
            return []
        result = []
        queue = deque([node])
        
        while queue:
            current = queue.popleft()
            result.append(current.data)
            
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
        return result
    
    # Calculate height
    def height(self, node):
        if not node:
            return -1
        return 1 + max(self.height(node.left), self.height(node.right))
    
    # Check if balanced
    def is_balanced(self, node):
        if not node:
            return True
        diff = abs(self.height(node.left) - self.height(node.right))
        return diff <= 1 and self.is_balanced(node.left) and self.is_balanced(node.right)

# Usage
tree = BinaryTree()
tree.root = TreeNode(1)
tree.root.left = TreeNode(2)
tree.root.right = TreeNode(3)
print(tree.inorder(tree.root))  # [2, 1, 3]`,
    },
  ],
  types: [
    {
      name: 'Binary Tree',
      description: 'Each node has at most two children (left and right).',
    },
    {
      name: 'Binary Search Tree (BST)',
      description: 'Binary tree with left child < parent < right child property.',
    },
    {
      name: 'AVL Tree',
      description: 'Self-balancing BST where height difference is at most 1.',
    },
    {
      name: 'Red-Black Tree',
      description: 'Self-balancing BST with color properties for balance.',
    },
    {
      name: 'B-Tree',
      description: 'Multi-way tree used in databases and file systems.',
    },
    {
      name: 'Heap',
      description: 'Complete binary tree with heap property (min or max).',
    },
  ],
  operations: [
    { name: 'Insert', description: 'Add a new node', timeComplexity: 'O(log n) - O(n)' },
    { name: 'Delete', description: 'Remove a node', timeComplexity: 'O(log n) - O(n)' },
    { name: 'Search', description: 'Find a node', timeComplexity: 'O(log n) - O(n)' },
    { name: 'Traversal', description: 'Visit all nodes', timeComplexity: 'O(n)' },
    { name: 'Height', description: 'Calculate tree height', timeComplexity: 'O(n)' },
    { name: 'Count Nodes', description: 'Count all nodes', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Represents hierarchical data naturally',
    'Efficient search in balanced trees O(log n)',
    'Flexible structure for various applications',
    'Easy to insert and delete in BST',
    'Can model many real-world scenarios',
  ],
  disadvantages: [
    'Can become unbalanced (degenerate to O(n))',
    'More complex than linear structures',
    'Requires more memory for pointers',
    'Traversal is not as simple as arrays',
    'Balancing adds complexity',
  ],
  applications: [
    'File system directory structure',
    'DOM tree in web browsers',
    'Decision trees in machine learning',
    'Expression parsing and evaluation',
    'Database indexing (B-trees)',
    'Network routing algorithms',
  ],
};
