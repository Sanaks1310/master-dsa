import { TopicContent } from '../topicContents';

export const treeTerminologyContent: TopicContent = {
  id: 'tree-terminology',
  definition: 'A tree is a hierarchical data structure consisting of nodes connected by edges. It starts with a root node and branches out to child nodes, forming a parent-child relationship. Trees are used to represent hierarchical relationships like file systems, organization charts, and family trees.',
  keyPoints: [
    'Root: The topmost node with no parent',
    'Node: Each element in the tree containing data',
    'Edge: Connection between parent and child nodes',
    'Parent: Node with one or more children',
    'Child: Node directly connected below a parent',
    'Leaf: Node with no children (terminal node)',
    'Height: Longest path from root to any leaf',
    'Depth: Distance from root to a specific node',
    'Subtree: A node and all its descendants',
    'Siblings: Nodes sharing the same parent',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Tree Node Structure in C
struct TreeNode {
    int data;
    struct TreeNode* left;
    struct TreeNode* right;
};

// Create a new node
struct TreeNode* createNode(int data) {
    struct TreeNode* node = 
        (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// Calculate height of tree
int height(struct TreeNode* node) {
    if (node == NULL) return -1;
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

// Count total nodes
int countNodes(struct TreeNode* node) {
    if (node == NULL) return 0;
    return 1 + countNodes(node->left) + countNodes(node->right);
}

// Count leaf nodes
int countLeaves(struct TreeNode* node) {
    if (node == NULL) return 0;
    if (node->left == NULL && node->right == NULL) return 1;
    return countLeaves(node->left) + countLeaves(node->right);
}`,
    },
    {
      language: 'C++',
      code: `// Tree Node Structure in C++
#include <algorithm>
using namespace std;

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

class Tree {
public:
    TreeNode* root;
    
    Tree() : root(nullptr) {}
    
    // Calculate height of tree
    int height(TreeNode* node) {
        if (node == nullptr) return -1;
        return 1 + max(height(node->left), height(node->right));
    }
    
    // Calculate depth of a node
    int depth(TreeNode* node, int target, int d = 0) {
        if (node == nullptr) return -1;
        if (node->data == target) return d;
        
        int leftDepth = depth(node->left, target, d + 1);
        if (leftDepth != -1) return leftDepth;
        return depth(node->right, target, d + 1);
    }
    
    // Count total nodes
    int countNodes(TreeNode* node) {
        if (node == nullptr) return 0;
        return 1 + countNodes(node->left) + countNodes(node->right);
    }
    
    // Count leaf nodes
    int countLeaves(TreeNode* node) {
        if (node == nullptr) return 0;
        if (!node->left && !node->right) return 1;
        return countLeaves(node->left) + countLeaves(node->right);
    }
};`,
    },
    {
      language: 'Java',
      code: `// Tree Node Structure in Java
class TreeNode {
    int data;
    TreeNode left, right;
    
    TreeNode(int data) {
        this.data = data;
        left = right = null;
    }
}

class Tree {
    TreeNode root;
    
    // Calculate height of tree
    int height(TreeNode node) {
        if (node == null) return -1;
        return 1 + Math.max(height(node.left), height(node.right));
    }
    
    // Calculate depth of a node
    int depth(TreeNode node, int target, int d) {
        if (node == null) return -1;
        if (node.data == target) return d;
        
        int leftDepth = depth(node.left, target, d + 1);
        if (leftDepth != -1) return leftDepth;
        return depth(node.right, target, d + 1);
    }
    
    // Count total nodes
    int countNodes(TreeNode node) {
        if (node == null) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    }
    
    // Count leaf nodes
    int countLeaves(TreeNode node) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) return 1;
        return countLeaves(node.left) + countLeaves(node.right);
    }
    
    // Check if node is leaf
    boolean isLeaf(TreeNode node) {
        return node != null && node.left == null && node.right == null;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Tree Node Structure in JavaScript
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  
  // Calculate height of tree
  height(node = this.root) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }
  
  // Calculate depth of a node
  depth(target, node = this.root, d = 0) {
    if (node === null) return -1;
    if (node.data === target) return d;
    
    const leftDepth = this.depth(target, node.left, d + 1);
    if (leftDepth !== -1) return leftDepth;
    return this.depth(target, node.right, d + 1);
  }
  
  // Count total nodes
  countNodes(node = this.root) {
    if (node === null) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }
  
  // Count leaf nodes
  countLeaves(node = this.root) {
    if (node === null) return 0;
    if (!node.left && !node.right) return 1;
    return this.countLeaves(node.left) + this.countLeaves(node.right);
  }
  
  // Get all leaf nodes
  getLeaves(node = this.root, leaves = []) {
    if (node === null) return leaves;
    if (!node.left && !node.right) leaves.push(node.data);
    this.getLeaves(node.left, leaves);
    this.getLeaves(node.right, leaves);
    return leaves;
  }
}`,
    },
    {
      language: 'Python',
      code: `# Tree Node Structure in Python
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class Tree:
    def __init__(self):
        self.root = None
    
    # Calculate height of tree
    def height(self, node):
        if node is None:
            return -1
        return 1 + max(self.height(node.left), self.height(node.right))
    
    # Calculate depth of a node
    def depth(self, node, target, d=0):
        if node is None:
            return -1
        if node.data == target:
            return d
        
        left_depth = self.depth(node.left, target, d + 1)
        if left_depth != -1:
            return left_depth
        return self.depth(node.right, target, d + 1)
    
    # Count total nodes
    def count_nodes(self, node):
        if node is None:
            return 0
        return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)
    
    # Count leaf nodes
    def count_leaves(self, node):
        if node is None:
            return 0
        if node.left is None and node.right is None:
            return 1
        return self.count_leaves(node.left) + self.count_leaves(node.right)
    
    # Get all ancestors of a node
    def ancestors(self, root, target, path=[]):
        if root is None:
            return False
        if root.data == target:
            return True
        if (self.ancestors(root.left, target, path) or 
            self.ancestors(root.right, target, path)):
            path.append(root.data)
            return True
        return False`,
    },
  ],
  types: [
    {
      name: 'Binary Tree',
      description: 'Each node has at most two children (left and right)',
    },
    {
      name: 'Full Binary Tree',
      description: 'Every node has either 0 or 2 children',
    },
    {
      name: 'Complete Binary Tree',
      description: 'All levels filled except possibly the last, filled left to right',
    },
    {
      name: 'Perfect Binary Tree',
      description: 'All internal nodes have 2 children, all leaves at same level',
    },
    {
      name: 'N-ary Tree',
      description: 'Each node can have at most N children',
    },
  ],
  operations: [
    {
      name: 'Calculate Height',
      description: 'Find the longest path from root to leaf',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Calculate Depth',
      description: 'Find distance from root to a specific node',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Count Nodes',
      description: 'Count total number of nodes in tree',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Count Leaves',
      description: 'Count nodes with no children',
      timeComplexity: 'O(n)',
    },
    {
      name: 'Find Siblings',
      description: 'Find nodes sharing same parent',
      timeComplexity: 'O(n)',
    },
  ],
  advantages: [
    'Represents hierarchical relationships naturally',
    'Efficient searching when balanced (O(log n))',
    'Flexible structure for various applications',
    'Easy to implement recursive algorithms',
    'Foundation for more complex data structures',
  ],
  disadvantages: [
    'Can become unbalanced leading to O(n) operations',
    'More complex than linear data structures',
    'Pointer overhead for each node',
    'No constant-time access to arbitrary elements',
    'Deletion can be complex in some tree types',
  ],
  applications: [
    'File system directory structure',
    'HTML DOM (Document Object Model)',
    'Organization charts',
    'Family trees',
    'Decision trees in machine learning',
    'Syntax trees in compilers',
  ],
};
