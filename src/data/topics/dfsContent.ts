import { TopicContent } from '../topicContents';

export const dfsContent: TopicContent = {
  id: 'dfs',
  definition: 'Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) and is ideal for problems requiring complete path exploration, cycle detection, and topological sorting.',
  keyPoints: [
    'Uses Stack (LIFO) or recursion',
    'Goes deep before going wide',
    'Explores one complete path before backtracking',
    'Time Complexity: O(V + E)',
    'Space Complexity: O(V) for recursion stack',
    'Three types: Pre-order, In-order, Post-order',
    'Essential for cycle detection',
    'Used in topological sorting',
  ],
  syntax: [
    {
      language: 'C',
      code: `// DFS Implementation in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 100

int adj[MAX][MAX];
bool visited[MAX];
int n;  // Number of vertices

// Recursive DFS
void dfs(int v) {
    visited[v] = true;
    printf("%d ", v);
    
    for (int i = 0; i < n; i++) {
        if (adj[v][i] && !visited[i]) {
            dfs(i);
        }
    }
}

// Iterative DFS using explicit stack
void dfsIterative(int start) {
    int stack[MAX], top = -1;
    
    // Reset visited
    for (int i = 0; i < n; i++) visited[i] = false;
    
    stack[++top] = start;
    
    while (top >= 0) {
        int v = stack[top--];
        
        if (!visited[v]) {
            visited[v] = true;
            printf("%d ", v);
            
            // Push all adjacent vertices
            for (int i = n - 1; i >= 0; i--) {
                if (adj[v][i] && !visited[i]) {
                    stack[++top] = i;
                }
            }
        }
    }
}

// Check if path exists using DFS
bool hasPath(int src, int dest) {
    if (src == dest) return true;
    visited[src] = true;
    
    for (int i = 0; i < n; i++) {
        if (adj[src][i] && !visited[i]) {
            if (hasPath(i, dest)) return true;
        }
    }
    return false;
}`,
    },
    {
      language: 'C++',
      code: `// DFS Implementation in C++
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
    
public:
    Graph(int v) : V(v), adj(v) {}
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);  // Undirected
    }
    
    // Recursive DFS
    void dfsRecursive(int v, vector<bool>& visited, vector<int>& result) {
        visited[v] = true;
        result.push_back(v);
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                dfsRecursive(neighbor, visited, result);
            }
        }
    }
    
    vector<int> dfs(int start) {
        vector<int> result;
        vector<bool> visited(V, false);
        dfsRecursive(start, visited, result);
        return result;
    }
    
    // Iterative DFS
    vector<int> dfsIterative(int start) {
        vector<int> result;
        vector<bool> visited(V, false);
        stack<int> s;
        
        s.push(start);
        
        while (!s.empty()) {
            int curr = s.top();
            s.pop();
            
            if (!visited[curr]) {
                visited[curr] = true;
                result.push_back(curr);
                
                for (int i = adj[curr].size() - 1; i >= 0; i--) {
                    if (!visited[adj[curr][i]]) {
                        s.push(adj[curr][i]);
                    }
                }
            }
        }
        return result;
    }
    
    // Find all paths between two nodes
    void findAllPaths(int src, int dest, vector<bool>& visited,
                      vector<int>& path, vector<vector<int>>& allPaths) {
        visited[src] = true;
        path.push_back(src);
        
        if (src == dest) {
            allPaths.push_back(path);
        } else {
            for (int neighbor : adj[src]) {
                if (!visited[neighbor]) {
                    findAllPaths(neighbor, dest, visited, path, allPaths);
                }
            }
        }
        
        path.pop_back();
        visited[src] = false;
    }
};`,
    },
    {
      language: 'Java',
      code: `// DFS Implementation in Java
import java.util.*;

class Graph {
    private int V;
    private List<List<Integer>> adj;
    
    Graph(int v) {
        V = v;
        adj = new ArrayList<>();
        for (int i = 0; i < v; i++)
            adj.add(new ArrayList<>());
    }
    
    void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);
    }
    
    // Recursive DFS helper
    private void dfsHelper(int v, boolean[] visited, List<Integer> result) {
        visited[v] = true;
        result.add(v);
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                dfsHelper(neighbor, visited, result);
            }
        }
    }
    
    // DFS traversal
    List<Integer> dfs(int start) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        dfsHelper(start, visited, result);
        return result;
    }
    
    // Iterative DFS
    List<Integer> dfsIterative(int start) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int curr = stack.pop();
            
            if (!visited[curr]) {
                visited[curr] = true;
                result.add(curr);
                
                List<Integer> neighbors = adj.get(curr);
                for (int i = neighbors.size() - 1; i >= 0; i--) {
                    if (!visited[neighbors.get(i)]) {
                        stack.push(neighbors.get(i));
                    }
                }
            }
        }
        return result;
    }
    
    // Count connected components
    int countComponents() {
        boolean[] visited = new boolean[V];
        int count = 0;
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfsHelper(i, visited, new ArrayList<>());
                count++;
            }
        }
        return count;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// DFS Implementation in JavaScript
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  
  addEdge(v1, v2) {
    this.adjacencyList.get(v1).push(v2);
    this.adjacencyList.get(v2).push(v1);
  }
  
  // Recursive DFS
  dfsRecursive(start) {
    const result = [];
    const visited = new Set();
    
    const dfs = (vertex) => {
      visited.add(vertex);
      result.push(vertex);
      
      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };
    
    dfs(start);
    return result;
  }
  
  // Iterative DFS
  dfsIterative(start) {
    const result = [];
    const visited = new Set();
    const stack = [start];
    
    while (stack.length > 0) {
      const curr = stack.pop();
      
      if (!visited.has(curr)) {
        visited.add(curr);
        result.push(curr);
        
        // Add neighbors in reverse for correct order
        const neighbors = this.adjacencyList.get(curr);
        for (let i = neighbors.length - 1; i >= 0; i--) {
          if (!visited.has(neighbors[i])) {
            stack.push(neighbors[i]);
          }
        }
      }
    }
    return result;
  }
  
  // Find all paths between two vertices
  findAllPaths(start, end) {
    const paths = [];
    const visited = new Set();
    
    const dfs = (curr, path) => {
      if (curr === end) {
        paths.push([...path]);
        return;
      }
      
      visited.add(curr);
      
      for (const neighbor of this.adjacencyList.get(curr)) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, [...path, neighbor]);
        }
      }
      
      visited.delete(curr);
    };
    
    dfs(start, [start]);
    return paths;
  }
}`,
    },
    {
      language: 'Python',
      code: `# DFS Implementation in Python
from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
        self.graph[v].append(u)  # Undirected
    
    # Recursive DFS
    def dfs_recursive(self, start):
        result = []
        visited = set()
        
        def dfs(vertex):
            visited.add(vertex)
            result.append(vertex)
            
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    dfs(neighbor)
        
        dfs(start)
        return result
    
    # Iterative DFS
    def dfs_iterative(self, start):
        result = []
        visited = set()
        stack = [start]
        
        while stack:
            curr = stack.pop()
            
            if curr not in visited:
                visited.add(curr)
                result.append(curr)
                
                # Add neighbors in reverse
                for neighbor in reversed(self.graph[curr]):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return result
    
    # Find all paths between source and destination
    def find_all_paths(self, start, end):
        paths = []
        visited = set()
        
        def dfs(curr, path):
            if curr == end:
                paths.append(path[:])
                return
            
            visited.add(curr)
            
            for neighbor in self.graph[curr]:
                if neighbor not in visited:
                    path.append(neighbor)
                    dfs(neighbor, path)
                    path.pop()
            
            visited.remove(curr)
        
        dfs(start, [start])
        return paths
    
    # Check if graph has cycle (undirected)
    def has_cycle(self):
        visited = set()
        
        def dfs(node, parent):
            visited.add(node)
            
            for neighbor in self.graph[node]:
                if neighbor not in visited:
                    if dfs(neighbor, node):
                        return True
                elif neighbor != parent:
                    return True
            
            return False
        
        for node in self.graph:
            if node not in visited:
                if dfs(node, -1):
                    return True
        return False`,
    },
  ],
  types: [
    {
      name: 'Pre-order DFS',
      description: 'Process node before visiting children (root first)',
    },
    {
      name: 'Post-order DFS',
      description: 'Process node after visiting all children',
    },
    {
      name: 'In-order DFS',
      description: 'Process left child, node, then right child (for binary trees)',
    },
    {
      name: 'Iterative DFS',
      description: 'Using explicit stack instead of recursion',
    },
  ],
  operations: [
    {
      name: 'Traversal',
      description: 'Visit all reachable vertices depth-first',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Path Finding',
      description: 'Find any path between two vertices',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Cycle Detection',
      description: 'Detect if graph contains a cycle',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Topological Sort',
      description: 'Linear ordering of vertices in DAG',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Connected Components',
      description: 'Find all connected components',
      timeComplexity: 'O(V + E)',
    },
  ],
  advantages: [
    'Memory efficient compared to BFS',
    'Natural for exploring all paths',
    'Easy to implement with recursion',
    'Good for topological sorting',
    'Efficient for cycle detection',
  ],
  disadvantages: [
    'May not find shortest path',
    'Can get stuck in infinite paths',
    'Stack overflow risk with deep recursion',
    'Not optimal for nearest neighbor problems',
    'May explore unnecessary branches',
  ],
  applications: [
    'Topological sorting',
    'Detecting cycles in graphs',
    'Path finding in mazes',
    'Solving puzzles (Sudoku, N-Queens)',
    'Finding strongly connected components',
    'Generating mazes',
    'Tree traversals',
  ],
};
