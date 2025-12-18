import { TopicContent } from '../topicContents';

export const graphBasicsContent: TopicContent = {
  id: 'graph-basics',
  definition: 'A graph is a non-linear data structure consisting of vertices (nodes) and edges that connect pairs of vertices. Graphs can represent relationships between objects, networks, maps, and many real-world scenarios where connections between entities matter.',
  keyPoints: [
    'Vertex (Node): Entity in the graph',
    'Edge: Connection between two vertices',
    'Directed vs Undirected: Edges with or without direction',
    'Weighted vs Unweighted: Edges with or without values',
    'Adjacent: Vertices connected by an edge',
    'Degree: Number of edges connected to a vertex',
    'Path: Sequence of vertices connected by edges',
    'Cycle: Path that starts and ends at same vertex',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Graph Representations in C
#include <stdio.h>
#include <stdlib.h>

#define MAX 100

// 1. Adjacency Matrix Representation
int adjMatrix[MAX][MAX];
int vertices;

void initMatrix(int v) {
    vertices = v;
    for (int i = 0; i < v; i++)
        for (int j = 0; j < v; j++)
            adjMatrix[i][j] = 0;
}

void addEdgeMatrix(int u, int v) {
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1;  // For undirected graph
}

// 2. Adjacency List Representation
struct Node {
    int vertex;
    struct Node* next;
};

struct Node* adjList[MAX];

void initList(int v) {
    vertices = v;
    for (int i = 0; i < v; i++)
        adjList[i] = NULL;
}

void addEdgeList(int u, int v) {
    // Add v to u's list
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->vertex = v;
    newNode->next = adjList[u];
    adjList[u] = newNode;
    
    // Add u to v's list (undirected)
    newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->vertex = u;
    newNode->next = adjList[v];
    adjList[v] = newNode;
}

// Print adjacency list
void printList() {
    for (int i = 0; i < vertices; i++) {
        printf("%d: ", i);
        struct Node* temp = adjList[i];
        while (temp) {
            printf("%d -> ", temp->vertex);
            temp = temp->next;
        }
        printf("NULL\\n");
    }
}`,
    },
    {
      language: 'C++',
      code: `// Graph Representations in C++
#include <iostream>
#include <vector>
#include <list>
using namespace std;

class Graph {
    int V;  // Number of vertices
    
    // Adjacency List
    vector<list<int>> adjList;
    
    // Adjacency Matrix
    vector<vector<int>> adjMatrix;
    
public:
    Graph(int v) : V(v), adjList(v), adjMatrix(v, vector<int>(v, 0)) {}
    
    // Add edge to adjacency list
    void addEdge(int u, int v, bool directed = false) {
        adjList[u].push_back(v);
        adjMatrix[u][v] = 1;
        
        if (!directed) {
            adjList[v].push_back(u);
            adjMatrix[v][u] = 1;
        }
    }
    
    // Get degree of vertex (undirected)
    int degree(int v) {
        return adjList[v].size();
    }
    
    // Get in-degree (directed graph)
    int inDegree(int v) {
        int count = 0;
        for (int i = 0; i < V; i++) {
            if (adjMatrix[i][v]) count++;
        }
        return count;
    }
    
    // Get out-degree (directed graph)
    int outDegree(int v) {
        return adjList[v].size();
    }
    
    // Check if edge exists
    bool hasEdge(int u, int v) {
        return adjMatrix[u][v] == 1;
    }
    
    // Get all neighbors
    vector<int> getNeighbors(int v) {
        return vector<int>(adjList[v].begin(), adjList[v].end());
    }
    
    // Print graph
    void print() {
        for (int i = 0; i < V; i++) {
            cout << i << " -> ";
            for (int neighbor : adjList[i]) {
                cout << neighbor << " ";
            }
            cout << endl;
        }
    }
};`,
    },
    {
      language: 'Java',
      code: `// Graph Representations in Java
import java.util.*;

class Graph {
    private int V;
    private List<List<Integer>> adjList;
    private int[][] adjMatrix;
    
    public Graph(int v) {
        V = v;
        adjList = new ArrayList<>();
        adjMatrix = new int[v][v];
        
        for (int i = 0; i < v; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    // Add edge
    public void addEdge(int u, int v, boolean directed) {
        adjList.get(u).add(v);
        adjMatrix[u][v] = 1;
        
        if (!directed) {
            adjList.get(v).add(u);
            adjMatrix[v][u] = 1;
        }
    }
    
    // Add weighted edge
    public void addWeightedEdge(int u, int v, int weight) {
        adjMatrix[u][v] = weight;
        adjMatrix[v][u] = weight;  // For undirected
    }
    
    // Get degree
    public int degree(int v) {
        return adjList.get(v).size();
    }
    
    // Check if vertices are adjacent
    public boolean isAdjacent(int u, int v) {
        return adjMatrix[u][v] != 0;
    }
    
    // Get all vertices
    public int getVertexCount() {
        return V;
    }
    
    // Get edge count
    public int getEdgeCount() {
        int count = 0;
        for (int i = 0; i < V; i++) {
            count += adjList.get(i).size();
        }
        return count / 2;  // For undirected graph
    }
    
    // Print adjacency list
    public void printAdjList() {
        for (int i = 0; i < V; i++) {
            System.out.print(i + " -> ");
            for (int neighbor : adjList.get(i)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
    
    // Print adjacency matrix
    public void printAdjMatrix() {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                System.out.print(adjMatrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Graph Representations in JavaScript
class Graph {
  constructor(directed = false) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }
  
  // Add vertex
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  
  // Add edge
  addEdge(v1, v2, weight = 1) {
    this.addVertex(v1);
    this.addVertex(v2);
    
    this.adjacencyList.get(v1).push({ node: v2, weight });
    
    if (!this.directed) {
      this.adjacencyList.get(v2).push({ node: v1, weight });
    }
  }
  
  // Remove edge
  removeEdge(v1, v2) {
    this.adjacencyList.set(v1, 
      this.adjacencyList.get(v1).filter(e => e.node !== v2)
    );
    
    if (!this.directed) {
      this.adjacencyList.set(v2,
        this.adjacencyList.get(v2).filter(e => e.node !== v1)
      );
    }
  }
  
  // Get neighbors
  getNeighbors(vertex) {
    return this.adjacencyList.get(vertex) || [];
  }
  
  // Get degree
  degree(vertex) {
    return this.getNeighbors(vertex).length;
  }
  
  // Check if edge exists
  hasEdge(v1, v2) {
    const neighbors = this.adjacencyList.get(v1);
    return neighbors?.some(e => e.node === v2) || false;
  }
  
  // Get all vertices
  getVertices() {
    return [...this.adjacencyList.keys()];
  }
  
  // Get vertex count
  size() {
    return this.adjacencyList.size;
  }
  
  // Print graph
  print() {
    for (const [vertex, edges] of this.adjacencyList) {
      const neighbors = edges.map(e => \`\${e.node}(\${e.weight})\`).join(', ');
      console.log(\`\${vertex} -> \${neighbors}\`);
    }
  }
}`,
    },
    {
      language: 'Python',
      code: `# Graph Representations in Python
from collections import defaultdict

class Graph:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
    
    # Add edge
    def add_edge(self, u, v, weight=1):
        self.graph[u].append((v, weight))
        if not self.directed:
            self.graph[v].append((u, weight))
    
    # Remove edge
    def remove_edge(self, u, v):
        self.graph[u] = [(node, w) for node, w in self.graph[u] if node != v]
        if not self.directed:
            self.graph[v] = [(node, w) for node, w in self.graph[v] if node != u]
    
    # Get neighbors
    def get_neighbors(self, v):
        return [node for node, _ in self.graph[v]]
    
    # Get degree
    def degree(self, v):
        return len(self.graph[v])
    
    # Check if edge exists
    def has_edge(self, u, v):
        return any(node == v for node, _ in self.graph[u])
    
    # Get all vertices
    def get_vertices(self):
        vertices = set(self.graph.keys())
        for edges in self.graph.values():
            for node, _ in edges:
                vertices.add(node)
        return list(vertices)
    
    # Get edge count
    def edge_count(self):
        count = sum(len(edges) for edges in self.graph.values())
        return count if self.directed else count // 2
    
    # Print graph
    def print_graph(self):
        for vertex in self.graph:
            edges = [f"{v}({w})" for v, w in self.graph[vertex]]
            print(f"{vertex} -> {', '.join(edges)}")

# Usage
g = Graph(directed=False)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
g.add_edge(2, 3)
g.print_graph()`,
    },
  ],
  types: [
    {
      name: 'Undirected Graph',
      description: 'Edges have no direction, connection is bidirectional',
    },
    {
      name: 'Directed Graph (Digraph)',
      description: 'Edges have direction, pointing from one vertex to another',
    },
    {
      name: 'Weighted Graph',
      description: 'Edges have associated weights or costs',
    },
    {
      name: 'Unweighted Graph',
      description: 'All edges are considered equal',
    },
    {
      name: 'Connected Graph',
      description: 'Path exists between every pair of vertices',
    },
    {
      name: 'Cyclic/Acyclic Graph',
      description: 'Contains cycles or is cycle-free (DAG)',
    },
  ],
  operations: [
    {
      name: 'Add Vertex',
      description: 'Add a new vertex to the graph',
      timeComplexity: 'O(1)',
    },
    {
      name: 'Add Edge',
      description: 'Connect two vertices with an edge',
      timeComplexity: 'O(1)',
    },
    {
      name: 'Remove Edge',
      description: 'Remove connection between vertices',
      timeComplexity: 'O(E)',
    },
    {
      name: 'Check Edge',
      description: 'Check if two vertices are connected',
      timeComplexity: 'O(V) list / O(1) matrix',
    },
    {
      name: 'Get Neighbors',
      description: 'Get all adjacent vertices',
      timeComplexity: 'O(degree)',
    },
  ],
  advantages: [
    'Model real-world relationships naturally',
    'Flexible structure for various problems',
    'Efficient algorithms exist for common operations',
    'Can represent complex networks',
    'Support both directed and undirected relationships',
  ],
  disadvantages: [
    'Can consume significant memory for dense graphs',
    'Some operations can be expensive',
    'Complex to implement compared to linear structures',
    'Traversal can be complicated with cycles',
    'Finding optimal paths can be NP-hard',
  ],
  applications: [
    'Social networks (friend connections)',
    'Maps and navigation (roads, routes)',
    'Web page linking (hyperlinks)',
    'Computer networks (routers, connections)',
    'Recommendation systems',
    'Dependency resolution',
    'Circuit design',
  ],
};
