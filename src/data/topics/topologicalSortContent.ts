import { TopicContent } from '../topicContents';

export const topologicalSortContent: TopicContent = {
  id: 'topological-sort',
  definition: 'Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v. It is used for scheduling tasks with dependencies.',
  keyPoints: [
    'Only works on DAGs (no cycles allowed)',
    'May have multiple valid orderings',
    'Used for dependency resolution',
    'DFS-based: Uses finishing times',
    "Kahn's Algorithm: Uses in-degree",
    'Time Complexity: O(V + E)',
    'Space Complexity: O(V)',
    'Fails if cycle exists (not a DAG)',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Topological Sort in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 100

int adj[MAX][MAX];
bool visited[MAX];
int stack[MAX], top = -1;
int inDegree[MAX];
int V;

// DFS-based Topological Sort
void dfsTopSort(int v) {
    visited[v] = true;
    
    for (int i = 0; i < V; i++) {
        if (adj[v][i] && !visited[i]) {
            dfsTopSort(i);
        }
    }
    
    stack[++top] = v;  // Push to stack after all descendants
}

void topologicalSortDFS() {
    for (int i = 0; i < V; i++) visited[i] = false;
    top = -1;
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            dfsTopSort(i);
        }
    }
    
    printf("Topological Order: ");
    while (top >= 0) {
        printf("%d ", stack[top--]);
    }
    printf("\\n");
}

// Kahn's Algorithm (BFS-based)
void topologicalSortKahn() {
    int queue[MAX], front = 0, rear = 0;
    int result[MAX], count = 0;
    
    // Calculate in-degrees
    for (int i = 0; i < V; i++) {
        inDegree[i] = 0;
        for (int j = 0; j < V; j++) {
            if (adj[j][i]) inDegree[i]++;
        }
    }
    
    // Enqueue vertices with in-degree 0
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            queue[rear++] = i;
        }
    }
    
    while (front < rear) {
        int u = queue[front++];
        result[count++] = u;
        
        for (int v = 0; v < V; v++) {
            if (adj[u][v]) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    queue[rear++] = v;
                }
            }
        }
    }
    
    if (count != V) {
        printf("Graph has cycle - topological sort not possible\\n");
        return;
    }
    
    printf("Topological Order: ");
    for (int i = 0; i < count; i++) {
        printf("%d ", result[i]);
    }
    printf("\\n");
}`,
    },
    {
      language: 'C++',
      code: `// Topological Sort in C++
#include <vector>
#include <stack>
#include <queue>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
    
public:
    Graph(int v) : V(v), adj(v) {}
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
    }
    
    // DFS-based Topological Sort
    void dfsUtil(int v, vector<bool>& visited, stack<int>& st) {
        visited[v] = true;
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                dfsUtil(neighbor, visited, st);
            }
        }
        
        st.push(v);  // Push after visiting all descendants
    }
    
    vector<int> topologicalSortDFS() {
        stack<int> st;
        vector<bool> visited(V, false);
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfsUtil(i, visited, st);
            }
        }
        
        vector<int> result;
        while (!st.empty()) {
            result.push_back(st.top());
            st.pop();
        }
        return result;
    }
    
    // Kahn's Algorithm (BFS-based)
    vector<int> topologicalSortKahn() {
        vector<int> inDegree(V, 0);
        
        // Calculate in-degrees
        for (int u = 0; u < V; u++) {
            for (int v : adj[u]) {
                inDegree[v]++;
            }
        }
        
        queue<int> q;
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }
        
        vector<int> result;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            result.push_back(u);
            
            for (int v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        
        // Check for cycle
        if (result.size() != V) {
            return {};  // Cycle exists
        }
        return result;
    }
    
    // Get all topological orderings
    void allTopologicalSorts(vector<int>& result, vector<bool>& visited,
                             vector<int>& inDegree) {
        bool flag = false;
        
        for (int i = 0; i < V; i++) {
            if (!visited[i] && inDegree[i] == 0) {
                visited[i] = true;
                result.push_back(i);
                
                for (int j : adj[i]) inDegree[j]--;
                
                allTopologicalSorts(result, visited, inDegree);
                
                // Backtrack
                visited[i] = false;
                result.pop_back();
                for (int j : adj[i]) inDegree[j]++;
                
                flag = true;
            }
        }
        
        if (!flag && result.size() == V) {
            for (int x : result) cout << x << " ";
            cout << endl;
        }
    }
};`,
    },
    {
      language: 'Java',
      code: `// Topological Sort in Java
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
    
    // DFS-based approach
    private void dfsUtil(int v, boolean[] visited, Stack<Integer> stack) {
        visited[v] = true;
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                dfsUtil(neighbor, visited, stack);
            }
        }
        
        stack.push(v);
    }
    
    List<Integer> topologicalSortDFS() {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[V];
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfsUtil(i, visited, stack);
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!stack.isEmpty()) {
            result.add(stack.pop());
        }
        return result;
    }
    
    // Kahn's Algorithm
    List<Integer> topologicalSortKahn() {
        int[] inDegree = new int[V];
        
        // Calculate in-degrees
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) {
                inDegree[v]++;
            }
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result.add(u);
            
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        
        // Cycle check
        if (result.size() != V) {
            return new ArrayList<>();  // Has cycle
        }
        return result;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Topological Sort in JavaScript
class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.adj = Array.from({ length: vertices }, () => []);
  }
  
  addEdge(u, v) {
    this.adj[u].push(v);
  }
  
  // DFS-based Topological Sort
  topologicalSortDFS() {
    const visited = new Array(this.V).fill(false);
    const stack = [];
    
    const dfs = (v) => {
      visited[v] = true;
      
      for (const neighbor of this.adj[v]) {
        if (!visited[neighbor]) {
          dfs(neighbor);
        }
      }
      
      stack.push(v);
    };
    
    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        dfs(i);
      }
    }
    
    return stack.reverse();
  }
  
  // Kahn's Algorithm (BFS-based)
  topologicalSortKahn() {
    const inDegree = new Array(this.V).fill(0);
    
    // Calculate in-degrees
    for (let u = 0; u < this.V; u++) {
      for (const v of this.adj[u]) {
        inDegree[v]++;
      }
    }
    
    const queue = [];
    for (let i = 0; i < this.V; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
      }
    }
    
    const result = [];
    while (queue.length > 0) {
      const u = queue.shift();
      result.push(u);
      
      for (const v of this.adj[u]) {
        inDegree[v]--;
        if (inDegree[v] === 0) {
          queue.push(v);
        }
      }
    }
    
    // Check for cycle
    if (result.length !== this.V) {
      return null; // Has cycle
    }
    return result;
  }
}

// Usage Example
const g = new Graph(6);
g.addEdge(5, 2);
g.addEdge(5, 0);
g.addEdge(4, 0);
g.addEdge(4, 1);
g.addEdge(2, 3);
g.addEdge(3, 1);

console.log("DFS:", g.topologicalSortDFS());
console.log("Kahn:", g.topologicalSortKahn());`,
    },
    {
      language: 'Python',
      code: `# Topological Sort in Python
from collections import deque, defaultdict

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
    
    # DFS-based Topological Sort
    def topological_sort_dfs(self):
        visited = set()
        stack = []
        
        def dfs(v):
            visited.add(v)
            
            for neighbor in self.graph[v]:
                if neighbor not in visited:
                    dfs(neighbor)
            
            stack.append(v)
        
        for i in range(self.V):
            if i not in visited:
                dfs(i)
        
        return stack[::-1]
    
    # Kahn's Algorithm (BFS-based)
    def topological_sort_kahn(self):
        in_degree = [0] * self.V
        
        # Calculate in-degrees
        for u in range(self.V):
            for v in self.graph[u]:
                in_degree[v] += 1
        
        # Enqueue vertices with in-degree 0
        queue = deque([i for i in range(self.V) if in_degree[i] == 0])
        
        result = []
        while queue:
            u = queue.popleft()
            result.append(u)
            
            for v in self.graph[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    queue.append(v)
        
        # Check for cycle
        if len(result) != self.V:
            return None  # Has cycle
        return result
    
    # Get all possible topological orderings
    def all_topological_sorts(self):
        in_degree = [0] * self.V
        for u in range(self.V):
            for v in self.graph[u]:
                in_degree[v] += 1
        
        visited = [False] * self.V
        result = []
        all_results = []
        
        def dfs():
            flag = False
            
            for i in range(self.V):
                if not visited[i] and in_degree[i] == 0:
                    visited[i] = True
                    result.append(i)
                    
                    for j in self.graph[i]:
                        in_degree[j] -= 1
                    
                    dfs()
                    
                    # Backtrack
                    visited[i] = False
                    result.pop()
                    for j in self.graph[i]:
                        in_degree[j] += 1
                    
                    flag = True
            
            if not flag and len(result) == self.V:
                all_results.append(result[:])
        
        dfs()
        return all_results`,
    },
  ],
  types: [
    {
      name: 'DFS-based',
      description: 'Use DFS and push to stack after visiting descendants',
    },
    {
      name: "Kahn's Algorithm",
      description: 'BFS-based using in-degree, also detects cycles',
    },
    {
      name: 'All Topological Sorts',
      description: 'Find all possible valid orderings using backtracking',
    },
  ],
  operations: [
    {
      name: 'DFS Sort',
      description: 'Sort using depth-first search',
      timeComplexity: 'O(V + E)',
    },
    {
      name: "Kahn's Algorithm",
      description: 'Sort using BFS with in-degree',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Cycle Detection',
      description: 'Detect if topological sort is possible',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'All Orderings',
      description: 'Find all valid topological orderings',
      timeComplexity: 'O(V! × V)',
    },
  ],
  advantages: [
    'Essential for dependency resolution',
    'Linear time complexity',
    "Kahn's algorithm also detects cycles",
    'Can handle multiple valid orderings',
    'Fundamental for scheduling problems',
  ],
  disadvantages: [
    'Only works on DAGs (no cycles)',
    'Multiple valid answers can be confusing',
    'Not applicable to undirected graphs',
    'Finding all orderings is expensive',
  ],
  applications: [
    'Build systems (Make, Maven, npm)',
    'Task scheduling with dependencies',
    'Course prerequisite planning',
    'Package dependency resolution',
    'Spreadsheet cell evaluation order',
    'Compiler instruction scheduling',
    'Data serialization order',
  ],
};
