import { TopicContent } from '../topicContents';

export const cycleDetectionContent: TopicContent = {
  id: 'cycle-detection',
  definition: 'Cycle detection is the algorithmic problem of finding a cycle in a graph or sequence. A cycle exists when there is a path from a vertex back to itself. This is crucial for detecting deadlocks, validating DAGs, and solving various graph problems.',
  keyPoints: [
    'Cycle: Path that starts and ends at same vertex',
    'Different algorithms for directed vs undirected graphs',
    'DFS with coloring is common approach for directed graphs',
    'Union-Find is efficient for undirected graphs',
    'Back edge indicates a cycle in DFS tree',
    'Time Complexity: O(V + E)',
    'Essential for topological sort validation',
    'Used in deadlock detection',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Cycle Detection in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 100

// For Directed Graph using DFS coloring
// WHITE = 0, GRAY = 1, BLACK = 2
int color[MAX];
int adj[MAX][MAX];
int V;

bool hasCycleDirectedUtil(int v) {
    color[v] = 1;  // Mark as being processed (GRAY)
    
    for (int i = 0; i < V; i++) {
        if (adj[v][i]) {
            if (color[i] == 1) return true;  // Back edge found
            if (color[i] == 0 && hasCycleDirectedUtil(i))
                return true;
        }
    }
    
    color[v] = 2;  // Mark as processed (BLACK)
    return false;
}

bool hasCycleDirected() {
    for (int i = 0; i < V; i++) color[i] = 0;
    
    for (int i = 0; i < V; i++) {
        if (color[i] == 0) {
            if (hasCycleDirectedUtil(i)) return true;
        }
    }
    return false;
}

// For Undirected Graph using DFS
bool visited[MAX];

bool hasCycleUndirectedUtil(int v, int parent) {
    visited[v] = true;
    
    for (int i = 0; i < V; i++) {
        if (adj[v][i]) {
            if (!visited[i]) {
                if (hasCycleUndirectedUtil(i, v)) return true;
            } else if (i != parent) {
                return true;  // Back edge to non-parent
            }
        }
    }
    return false;
}

bool hasCycleUndirected() {
    for (int i = 0; i < V; i++) visited[i] = false;
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            if (hasCycleUndirectedUtil(i, -1)) return true;
        }
    }
    return false;
}`,
    },
    {
      language: 'C++',
      code: `// Cycle Detection in C++
#include <vector>
#include <numeric>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
    
public:
    Graph(int v) : V(v), adj(v) {}
    
    void addEdge(int u, int v, bool directed = true) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);
    }
    
    // Directed graph cycle detection using DFS coloring
    bool hasCycleDirectedUtil(int v, vector<int>& color) {
        color[v] = 1;  // GRAY - being processed
        
        for (int neighbor : adj[v]) {
            if (color[neighbor] == 1) return true;  // Back edge
            if (color[neighbor] == 0 && 
                hasCycleDirectedUtil(neighbor, color))
                return true;
        }
        
        color[v] = 2;  // BLACK - done processing
        return false;
    }
    
    bool hasCycleDirected() {
        vector<int> color(V, 0);  // 0=WHITE, 1=GRAY, 2=BLACK
        
        for (int i = 0; i < V; i++) {
            if (color[i] == 0) {
                if (hasCycleDirectedUtil(i, color)) return true;
            }
        }
        return false;
    }
    
    // Undirected graph cycle detection
    bool hasCycleUndirectedUtil(int v, int parent, vector<bool>& visited) {
        visited[v] = true;
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                if (hasCycleUndirectedUtil(neighbor, v, visited))
                    return true;
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }
    
    bool hasCycleUndirected() {
        vector<bool> visited(V, false);
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (hasCycleUndirectedUtil(i, -1, visited))
                    return true;
            }
        }
        return false;
    }
};

// Union-Find for undirected graph cycle detection
class UnionFind {
    vector<int> parent, rank;
    
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);  // Path compression
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // Cycle found!
        
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};`,
    },
    {
      language: 'Java',
      code: `// Cycle Detection in Java
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
    }
    
    // Directed graph - DFS with colors
    private boolean hasCycleDirectedUtil(int v, int[] color) {
        color[v] = 1;  // GRAY
        
        for (int neighbor : adj.get(v)) {
            if (color[neighbor] == 1) return true;
            if (color[neighbor] == 0 && 
                hasCycleDirectedUtil(neighbor, color))
                return true;
        }
        
        color[v] = 2;  // BLACK
        return false;
    }
    
    boolean hasCycleDirected() {
        int[] color = new int[V];  // 0=WHITE, 1=GRAY, 2=BLACK
        
        for (int i = 0; i < V; i++) {
            if (color[i] == 0) {
                if (hasCycleDirectedUtil(i, color)) return true;
            }
        }
        return false;
    }
    
    // Undirected graph - DFS with parent tracking
    private boolean hasCycleUndirectedUtil(int v, int parent, 
                                           boolean[] visited) {
        visited[v] = true;
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                if (hasCycleUndirectedUtil(neighbor, v, visited))
                    return true;
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }
    
    boolean hasCycleUndirected() {
        boolean[] visited = new boolean[V];
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (hasCycleUndirectedUtil(i, -1, visited))
                    return true;
            }
        }
        return false;
    }
}

// Union-Find approach
class UnionFind {
    int[] parent, rank;
    
    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }
    
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // Cycle!
        
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Cycle Detection in JavaScript
class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.adj = Array.from({ length: vertices }, () => []);
  }
  
  addEdge(u, v, directed = true) {
    this.adj[u].push(v);
    if (!directed) this.adj[v].push(u);
  }
  
  // Directed graph cycle detection
  hasCycleDirected() {
    const color = new Array(this.V).fill(0); // WHITE
    
    const dfs = (v) => {
      color[v] = 1; // GRAY - processing
      
      for (const neighbor of this.adj[v]) {
        if (color[neighbor] === 1) return true; // Back edge
        if (color[neighbor] === 0 && dfs(neighbor)) return true;
      }
      
      color[v] = 2; // BLACK - done
      return false;
    };
    
    for (let i = 0; i < this.V; i++) {
      if (color[i] === 0 && dfs(i)) return true;
    }
    return false;
  }
  
  // Undirected graph cycle detection
  hasCycleUndirected() {
    const visited = new Array(this.V).fill(false);
    
    const dfs = (v, parent) => {
      visited[v] = true;
      
      for (const neighbor of this.adj[v]) {
        if (!visited[neighbor]) {
          if (dfs(neighbor, v)) return true;
        } else if (neighbor !== parent) {
          return true;
        }
      }
      return false;
    };
    
    for (let i = 0; i < this.V; i++) {
      if (!visited[i] && dfs(i, -1)) return true;
    }
    return false;
  }
}

// Union-Find for undirected graphs
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false; // Cycle detected!
    
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    return true;
  }
}`,
    },
    {
      language: 'Python',
      code: `# Cycle Detection in Python
from collections import defaultdict

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v, directed=True):
        self.graph[u].append(v)
        if not directed:
            self.graph[v].append(u)
    
    # Directed graph - DFS with colors
    def has_cycle_directed(self):
        # 0=WHITE, 1=GRAY, 2=BLACK
        color = [0] * self.V
        
        def dfs(v):
            color[v] = 1  # GRAY - processing
            
            for neighbor in self.graph[v]:
                if color[neighbor] == 1:  # Back edge
                    return True
                if color[neighbor] == 0 and dfs(neighbor):
                    return True
            
            color[v] = 2  # BLACK - done
            return False
        
        for i in range(self.V):
            if color[i] == 0 and dfs(i):
                return True
        return False
    
    # Undirected graph - DFS with parent
    def has_cycle_undirected(self):
        visited = [False] * self.V
        
        def dfs(v, parent):
            visited[v] = True
            
            for neighbor in self.graph[v]:
                if not visited[neighbor]:
                    if dfs(neighbor, v):
                        return True
                elif neighbor != parent:
                    return True
            return False
        
        for i in range(self.V):
            if not visited[i] and dfs(i, -1):
                return True
        return False

# Union-Find for undirected graphs
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Cycle detected!
        
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

# Usage
g = Graph(4)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 0)  # Creates cycle
print(g.has_cycle_directed())  # True`,
    },
  ],
  types: [
    {
      name: 'DFS Coloring',
      description: 'Track WHITE/GRAY/BLACK states for directed graphs',
    },
    {
      name: 'DFS with Parent',
      description: 'Track parent to detect back edges in undirected graphs',
    },
    {
      name: 'Union-Find',
      description: 'Efficient for undirected graphs, detects cycle on edge addition',
    },
    {
      name: "Floyd's Tortoise and Hare",
      description: 'Detect cycle in linked list or sequence',
    },
  ],
  operations: [
    {
      name: 'Detect Cycle (Directed)',
      description: 'Find if cycle exists in directed graph',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Detect Cycle (Undirected)',
      description: 'Find if cycle exists in undirected graph',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Find Cycle',
      description: 'Return the actual cycle path',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Union-Find Detection',
      description: 'Detect cycle using disjoint sets',
      timeComplexity: 'O(E × α(V))',
    },
  ],
  advantages: [
    'Essential for validating DAGs',
    'Helps detect deadlocks in systems',
    'Required for topological sorting',
    'Union-Find is very efficient',
    'Multiple algorithm choices available',
  ],
  disadvantages: [
    'Different algorithms for directed vs undirected',
    'Finding the actual cycle requires extra work',
    'Recursive solutions may cause stack overflow',
    'Cannot easily count all cycles',
  ],
  applications: [
    'Deadlock detection in operating systems',
    'Dependency resolution validation',
    'Detecting circular references',
    'Validating build systems',
    'Database transaction cycles',
    'Compiler dependency analysis',
  ],
};
