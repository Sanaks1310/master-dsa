import { TopicContent } from '../topicContents';

export const bfsContent: TopicContent = {
  id: 'bfs',
  definition: 'Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth level before moving to vertices at the next depth level. It uses a queue data structure and is ideal for finding the shortest path in unweighted graphs.',
  keyPoints: [
    'Uses a Queue (FIFO) data structure',
    'Explores neighbors before going deeper',
    'Visits nodes level by level',
    'Guarantees shortest path in unweighted graphs',
    'Time Complexity: O(V + E)',
    'Space Complexity: O(V)',
    'Must track visited nodes to avoid cycles',
    'Can be used on both trees and graphs',
  ],
  syntax: [
    {
      language: 'C',
      code: `// BFS Implementation in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 100

int adj[MAX][MAX];  // Adjacency matrix
bool visited[MAX];
int queue[MAX], front = 0, rear = 0;

void enqueue(int v) { queue[rear++] = v; }
int dequeue() { return queue[front++]; }
bool isEmpty() { return front == rear; }

void bfs(int start, int n) {
    // Initialize visited array
    for (int i = 0; i < n; i++) visited[i] = false;
    
    // Start BFS from source
    visited[start] = true;
    enqueue(start);
    
    printf("BFS Traversal: ");
    while (!isEmpty()) {
        int curr = dequeue();
        printf("%d ", curr);
        
        // Visit all adjacent vertices
        for (int i = 0; i < n; i++) {
            if (adj[curr][i] && !visited[i]) {
                visited[i] = true;
                enqueue(i);
            }
        }
    }
}

// Find shortest path using BFS
int shortestPath(int src, int dest, int n) {
    int dist[MAX];
    for (int i = 0; i < n; i++) {
        visited[i] = false;
        dist[i] = -1;
    }
    
    front = rear = 0;
    visited[src] = true;
    dist[src] = 0;
    enqueue(src);
    
    while (!isEmpty()) {
        int curr = dequeue();
        if (curr == dest) return dist[dest];
        
        for (int i = 0; i < n; i++) {
            if (adj[curr][i] && !visited[i]) {
                visited[i] = true;
                dist[i] = dist[curr] + 1;
                enqueue(i);
            }
        }
    }
    return -1;  // Not reachable
}`,
    },
    {
      language: 'C++',
      code: `// BFS Implementation in C++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
    
public:
    Graph(int v) : V(v), adj(v) {}
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);  // For undirected graph
    }
    
    // Basic BFS traversal
    vector<int> bfs(int start) {
        vector<int> result;
        vector<bool> visited(V, false);
        queue<int> q;
        
        visited[start] = true;
        q.push(start);
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            result.push_back(curr);
            
            for (int neighbor : adj[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        return result;
    }
    
    // BFS to find shortest path
    int shortestPath(int src, int dest) {
        vector<int> dist(V, -1);
        queue<int> q;
        
        dist[src] = 0;
        q.push(src);
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            
            if (curr == dest) return dist[dest];
            
            for (int neighbor : adj[curr]) {
                if (dist[neighbor] == -1) {
                    dist[neighbor] = dist[curr] + 1;
                    q.push(neighbor);
                }
            }
        }
        return -1;
    }
    
    // BFS to find all nodes at distance k
    vector<int> nodesAtDistanceK(int src, int k) {
        vector<int> result;
        vector<int> dist(V, -1);
        queue<int> q;
        
        dist[src] = 0;
        q.push(src);
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            
            if (dist[curr] == k) result.push_back(curr);
            if (dist[curr] > k) break;
            
            for (int neighbor : adj[curr]) {
                if (dist[neighbor] == -1) {
                    dist[neighbor] = dist[curr] + 1;
                    q.push(neighbor);
                }
            }
        }
        return result;
    }
};`,
    },
    {
      language: 'Java',
      code: `// BFS Implementation in Java
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
        adj.get(v).add(u);  // Undirected
    }
    
    // Basic BFS traversal
    List<Integer> bfs(int start) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.add(start);
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            result.add(curr);
            
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return result;
    }
    
    // Find shortest path between two nodes
    int shortestPath(int src, int dest) {
        int[] dist = new int[V];
        Arrays.fill(dist, -1);
        Queue<Integer> queue = new LinkedList<>();
        
        dist[src] = 0;
        queue.add(src);
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            
            if (curr == dest) return dist[dest];
            
            for (int neighbor : adj.get(curr)) {
                if (dist[neighbor] == -1) {
                    dist[neighbor] = dist[curr] + 1;
                    queue.add(neighbor);
                }
            }
        }
        return -1;
    }
    
    // Check if path exists
    boolean hasPath(int src, int dest) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[src] = true;
        queue.add(src);
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            if (curr == dest) return true;
            
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return false;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// BFS Implementation in JavaScript
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
    this.adjacencyList.get(v2).push(v1);  // Undirected
  }
  
  // Basic BFS traversal
  bfs(start) {
    const result = [];
    const visited = new Set();
    const queue = [start];
    
    visited.add(start);
    
    while (queue.length > 0) {
      const curr = queue.shift();
      result.push(curr);
      
      for (const neighbor of this.adjacencyList.get(curr)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
  
  // Find shortest path
  shortestPath(start, end) {
    const visited = new Set([start]);
    const queue = [[start, 0]];  // [node, distance]
    
    while (queue.length > 0) {
      const [curr, dist] = queue.shift();
      
      if (curr === end) return dist;
      
      for (const neighbor of this.adjacencyList.get(curr)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, dist + 1]);
        }
      }
    }
    return -1;
  }
  
  // Get all paths of length k
  pathsOfLengthK(start, k) {
    const paths = [];
    const queue = [[start, [start]]];  // [node, path]
    
    while (queue.length > 0) {
      const [curr, path] = queue.shift();
      
      if (path.length - 1 === k) {
        paths.push([...path]);
        continue;
      }
      
      for (const neighbor of this.adjacencyList.get(curr)) {
        if (!path.includes(neighbor)) {
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    return paths;
  }
}`,
    },
    {
      language: 'Python',
      code: `# BFS Implementation in Python
from collections import deque, defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
        self.graph[v].append(u)  # Undirected
    
    # Basic BFS traversal
    def bfs(self, start):
        result = []
        visited = set([start])
        queue = deque([start])
        
        while queue:
            curr = queue.popleft()
            result.append(curr)
            
            for neighbor in self.graph[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    # Find shortest path
    def shortest_path(self, start, end):
        visited = set([start])
        queue = deque([(start, 0)])  # (node, distance)
        
        while queue:
            curr, dist = queue.popleft()
            
            if curr == end:
                return dist
            
            for neighbor in self.graph[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, dist + 1))
        
        return -1
    
    # Get actual path between two nodes
    def get_path(self, start, end):
        visited = set([start])
        queue = deque([(start, [start])])  # (node, path)
        
        while queue:
            curr, path = queue.popleft()
            
            if curr == end:
                return path
            
            for neighbor in self.graph[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return []
    
    # Check if graph is bipartite using BFS
    def is_bipartite(self, start):
        color = {start: 0}
        queue = deque([start])
        
        while queue:
            curr = queue.popleft()
            
            for neighbor in self.graph[curr]:
                if neighbor not in color:
                    color[neighbor] = 1 - color[curr]
                    queue.append(neighbor)
                elif color[neighbor] == color[curr]:
                    return False
        
        return True`,
    },
  ],
  types: [
    {
      name: 'Standard BFS',
      description: 'Basic level-by-level traversal of graph',
    },
    {
      name: 'Multi-source BFS',
      description: 'Start BFS from multiple sources simultaneously',
    },
    {
      name: '0-1 BFS',
      description: 'BFS on graphs with edge weights of only 0 or 1',
    },
    {
      name: 'Bidirectional BFS',
      description: 'BFS from both source and destination, meeting in middle',
    },
  ],
  operations: [
    {
      name: 'Traversal',
      description: 'Visit all reachable vertices level by level',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Shortest Path',
      description: 'Find minimum edges path in unweighted graph',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Connected Components',
      description: 'Find all connected components in graph',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Bipartite Check',
      description: 'Check if graph can be 2-colored',
      timeComplexity: 'O(V + E)',
    },
    {
      name: 'Level Detection',
      description: 'Find nodes at specific distance from source',
      timeComplexity: 'O(V + E)',
    },
  ],
  advantages: [
    'Finds shortest path in unweighted graphs',
    'Complete - visits all reachable nodes',
    'Optimal for level-order problems',
    'Good for finding nearby nodes first',
    'Simple to implement with queue',
  ],
  disadvantages: [
    'High memory usage O(V) for queue',
    'Not suitable for weighted graphs shortest path',
    'Slower than DFS for some problems',
    'Cannot detect back edges easily',
    'May visit many unnecessary nodes',
  ],
  applications: [
    'Shortest path in unweighted graphs',
    'Web crawlers',
    'Social network friend suggestions',
    'GPS navigation systems',
    'Peer-to-peer networks',
    'Garbage collection (mark and sweep)',
    'Broadcasting in networks',
  ],
};
