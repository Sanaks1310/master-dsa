import { TopicContent } from '../topicContents';

export const graphContent: TopicContent = {
  id: 'graphs',
  definition: 'A Graph is a non-linear data structure consisting of vertices (nodes) connected by edges. Graphs are used to represent networks, relationships, and connections between objects. They can be directed or undirected, weighted or unweighted.',
  keyPoints: [
    'Vertices (nodes) connected by edges',
    'Can be directed (one-way) or undirected (two-way)',
    'Can be weighted (edges have values) or unweighted',
    'Represented using adjacency matrix or adjacency list',
    'Foundation for many important algorithms',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_VERTICES 100

// Adjacency List Node
typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

// Graph structure
typedef struct {
    int numVertices;
    Node* adjList[MAX_VERTICES];
    int visited[MAX_VERTICES];
} Graph;

// Create graph
Graph* createGraph(int vertices) {
    Graph* graph = (Graph*)malloc(sizeof(Graph));
    graph->numVertices = vertices;
    for (int i = 0; i < vertices; i++) {
        graph->adjList[i] = NULL;
        graph->visited[i] = 0;
    }
    return graph;
}

// Add edge
void addEdge(Graph* graph, int src, int dest) {
    // Add edge from src to dest
    Node* node = (Node*)malloc(sizeof(Node));
    node->vertex = dest;
    node->next = graph->adjList[src];
    graph->adjList[src] = node;
    
    // For undirected graph, add edge from dest to src
    node = (Node*)malloc(sizeof(Node));
    node->vertex = src;
    node->next = graph->adjList[dest];
    graph->adjList[dest] = node;
}

// DFS traversal
void DFS(Graph* graph, int vertex) {
    graph->visited[vertex] = 1;
    printf("%d ", vertex);
    
    Node* temp = graph->adjList[vertex];
    while (temp) {
        int adjVertex = temp->vertex;
        if (!graph->visited[adjVertex]) {
            DFS(graph, adjVertex);
        }
        temp = temp->next;
    }
}

// BFS traversal
void BFS(Graph* graph, int startVertex) {
    int queue[MAX_VERTICES];
    int front = 0, rear = 0;
    
    graph->visited[startVertex] = 1;
    queue[rear++] = startVertex;
    
    while (front < rear) {
        int currentVertex = queue[front++];
        printf("%d ", currentVertex);
        
        Node* temp = graph->adjList[currentVertex];
        while (temp) {
            int adjVertex = temp->vertex;
            if (!graph->visited[adjVertex]) {
                graph->visited[adjVertex] = 1;
                queue[rear++] = adjVertex;
            }
            temp = temp->next;
        }
    }
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
using namespace std;

class Graph {
    int V;  // Number of vertices
    vector<vector<int>> adj;  // Adjacency list
    
public:
    Graph(int V) : V(V), adj(V) {}
    
    // Add edge (undirected)
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // Add directed edge
    void addDirectedEdge(int u, int v) {
        adj[u].push_back(v);
    }
    
    // BFS traversal
    void BFS(int start) {
        vector<bool> visited(V, false);
        queue<int> q;
        
        visited[start] = true;
        q.push(start);
        
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            cout << u << " ";
            
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.push(v);
                }
            }
        }
        cout << endl;
    }
    
    // DFS traversal (recursive)
    void DFSUtil(int u, vector<bool>& visited) {
        visited[u] = true;
        cout << u << " ";
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                DFSUtil(v, visited);
            }
        }
    }
    
    void DFS(int start) {
        vector<bool> visited(V, false);
        DFSUtil(start, visited);
        cout << endl;
    }
    
    // DFS iterative (using stack)
    void DFSIterative(int start) {
        vector<bool> visited(V, false);
        stack<int> s;
        
        s.push(start);
        
        while (!s.empty()) {
            int u = s.top();
            s.pop();
            
            if (!visited[u]) {
                visited[u] = true;
                cout << u << " ";
                
                for (int v : adj[u]) {
                    if (!visited[v]) {
                        s.push(v);
                    }
                }
            }
        }
        cout << endl;
    }
    
    // Check if path exists between two vertices
    bool hasPath(int src, int dest) {
        vector<bool> visited(V, false);
        queue<int> q;
        
        visited[src] = true;
        q.push(src);
        
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            
            if (u == dest) return true;
            
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.push(v);
                }
            }
        }
        return false;
    }
};`,
    },
    {
      language: 'Java',
      code: `import java.util.*;

class Graph {
    private int V;
    private List<List<Integer>> adj;
    
    public Graph(int V) {
        this.V = V;
        adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    // Add undirected edge
    public void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);
    }
    
    // Add directed edge
    public void addDirectedEdge(int u, int v) {
        adj.get(u).add(v);
    }
    
    // BFS traversal
    public void BFS(int start) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            System.out.print(u + " ");
            
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    queue.offer(v);
                }
            }
        }
        System.out.println();
    }
    
    // DFS traversal (recursive)
    private void DFSUtil(int u, boolean[] visited) {
        visited[u] = true;
        System.out.print(u + " ");
        
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                DFSUtil(v, visited);
            }
        }
    }
    
    public void DFS(int start) {
        boolean[] visited = new boolean[V];
        DFSUtil(start, visited);
        System.out.println();
    }
    
    // Shortest path (unweighted) using BFS
    public int shortestPath(int src, int dest) {
        if (src == dest) return 0;
        
        boolean[] visited = new boolean[V];
        int[] distance = new int[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[src] = true;
        queue.offer(src);
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    distance[v] = distance[u] + 1;
                    queue.offer(v);
                    
                    if (v == dest) return distance[v];
                }
            }
        }
        return -1;  // No path
    }
    
    // Detect cycle (undirected graph)
    public boolean hasCycle() {
        boolean[] visited = new boolean[V];
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (hasCycleUtil(i, visited, -1)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean hasCycleUtil(int u, boolean[] visited, int parent) {
        visited[u] = true;
        
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                if (hasCycleUtil(v, visited, u)) return true;
            } else if (v != parent) {
                return true;
            }
        }
        return false;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    
    // Add vertex
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    // Add undirected edge
    addEdge(v1, v2) {
        this.addVertex(v1);
        this.addVertex(v2);
        this.adjacencyList.get(v1).push(v2);
        this.adjacencyList.get(v2).push(v1);
    }
    
    // Add directed edge
    addDirectedEdge(from, to) {
        this.addVertex(from);
        this.addVertex(to);
        this.adjacencyList.get(from).push(to);
    }
    
    // BFS traversal
    BFS(start) {
        const visited = new Set();
        const queue = [start];
        const result = [];
        
        visited.add(start);
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            result.push(vertex);
            
            for (const neighbor of this.adjacencyList.get(vertex) || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
    
    // DFS traversal (recursive)
    DFS(start) {
        const visited = new Set();
        const result = [];
        
        const dfsHelper = (vertex) => {
            visited.add(vertex);
            result.push(vertex);
            
            for (const neighbor of this.adjacencyList.get(vertex) || []) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };
        
        dfsHelper(start);
        return result;
    }
    
    // DFS iterative
    DFSIterative(start) {
        const visited = new Set();
        const stack = [start];
        const result = [];
        
        while (stack.length > 0) {
            const vertex = stack.pop();
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);
                
                for (const neighbor of this.adjacencyList.get(vertex) || []) {
                    stack.push(neighbor);
                }
            }
        }
        return result;
    }
    
    // Check if path exists
    hasPath(start, end) {
        const visited = new Set();
        const queue = [start];
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            if (vertex === end) return true;
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                for (const neighbor of this.adjacencyList.get(vertex) || []) {
                    queue.push(neighbor);
                }
            }
        }
        return false;
    }
}

// Usage
const graph = new Graph();
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
console.log(graph.BFS(0));  // [0, 1, 2, 3]
console.log(graph.DFS(0));  // [0, 1, 3, 2]`,
    },
    {
      language: 'Python',
      code: `from collections import defaultdict, deque

class Graph:
    def __init__(self):
        self.adj_list = defaultdict(list)
    
    # Add undirected edge
    def add_edge(self, u, v):
        self.adj_list[u].append(v)
        self.adj_list[v].append(u)
    
    # Add directed edge
    def add_directed_edge(self, u, v):
        self.adj_list[u].append(v)
    
    # BFS traversal
    def bfs(self, start):
        visited = set()
        queue = deque([start])
        result = []
        
        visited.add(start)
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            for neighbor in self.adj_list[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    # DFS traversal (recursive)
    def dfs(self, start, visited=None):
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor in self.adj_list[start]:
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        
        return result
    
    # DFS iterative
    def dfs_iterative(self, start):
        visited = set()
        stack = [start]
        result = []
        
        while stack:
            vertex = stack.pop()
            
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                
                for neighbor in self.adj_list[vertex]:
                    stack.append(neighbor)
        
        return result
    
    # Shortest path (unweighted)
    def shortest_path(self, start, end):
        if start == end:
            return 0
        
        visited = set()
        queue = deque([(start, 0)])
        visited.add(start)
        
        while queue:
            vertex, dist = queue.popleft()
            
            for neighbor in self.adj_list[vertex]:
                if neighbor == end:
                    return dist + 1
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, dist + 1))
        
        return -1  # No path
    
    # Detect cycle (undirected)
    def has_cycle(self):
        visited = set()
        
        def dfs_cycle(vertex, parent):
            visited.add(vertex)
            
            for neighbor in self.adj_list[vertex]:
                if neighbor not in visited:
                    if dfs_cycle(neighbor, vertex):
                        return True
                elif neighbor != parent:
                    return True
            return False
        
        for vertex in self.adj_list:
            if vertex not in visited:
                if dfs_cycle(vertex, -1):
                    return True
        return False

# Usage
graph = Graph()
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 3)
print(graph.bfs(0))  # [0, 1, 2, 3]
print(graph.dfs(0))  # [0, 1, 3, 2]`,
    },
  ],
  types: [
    {
      name: 'Undirected Graph',
      description: 'Edges have no direction; connection is bidirectional.',
    },
    {
      name: 'Directed Graph (Digraph)',
      description: 'Edges have direction; connection is one-way.',
    },
    {
      name: 'Weighted Graph',
      description: 'Edges have associated weights or costs.',
    },
    {
      name: 'Unweighted Graph',
      description: 'All edges are considered equal.',
    },
    {
      name: 'Cyclic Graph',
      description: 'Contains at least one cycle (path back to starting vertex).',
    },
    {
      name: 'Acyclic Graph (DAG)',
      description: 'Directed graph with no cycles.',
    },
  ],
  operations: [
    { name: 'Add Vertex', description: 'Add a new node', timeComplexity: 'O(1)' },
    { name: 'Add Edge', description: 'Connect two vertices', timeComplexity: 'O(1)' },
    { name: 'Remove Vertex', description: 'Delete a node and its edges', timeComplexity: 'O(V + E)' },
    { name: 'Remove Edge', description: 'Delete connection between vertices', timeComplexity: 'O(E)' },
    { name: 'BFS', description: 'Level-order traversal', timeComplexity: 'O(V + E)' },
    { name: 'DFS', description: 'Depth-first traversal', timeComplexity: 'O(V + E)' },
  ],
  advantages: [
    'Models real-world relationships naturally',
    'Flexible structure for various problems',
    'Foundation for pathfinding algorithms',
    'Can represent complex networks',
    'Supports both directed and undirected relationships',
  ],
  disadvantages: [
    'Can consume significant memory for dense graphs',
    'Some operations are computationally expensive',
    'Adjacency matrix wastes space for sparse graphs',
    'Finding all paths can be exponential',
    'Cycle detection adds complexity',
  ],
  applications: [
    'Social networks (friend connections)',
    'GPS and navigation (shortest path)',
    'Web page ranking (PageRank)',
    'Network routing protocols',
    'Dependency resolution in build systems',
    'Recommendation systems',
  ],
};
