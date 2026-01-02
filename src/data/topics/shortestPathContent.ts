import { TopicContent } from '../topicContents';

export const shortestPathContent: TopicContent = {
  id: 'shortest-path',
  definition: 'Shortest Path algorithms find the minimum-cost path between vertices in a weighted graph. Dijkstra\'s algorithm handles non-negative weights, Bellman-Ford handles negative weights (and detects negative cycles), and Floyd-Warshall finds all-pairs shortest paths.',
  keyPoints: [
    'Dijkstra: Greedy approach, non-negative weights only, O(V² or E log V)',
    'Bellman-Ford: Dynamic programming, handles negative weights, O(VE)',
    'Floyd-Warshall: All-pairs shortest paths, O(V³)',
    'BFS: Shortest path in unweighted graphs, O(V + E)',
    'Relaxation: Key concept - update distance if shorter path found',
    'Negative cycle: Path where total weight is negative (infinite loop)',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Shortest Path Algorithms in C
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <stdbool.h>

#define V 5
#define INF INT_MAX

// Dijkstra's Algorithm (Adjacency Matrix)
void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool visited[V];
    
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        // Find minimum distance vertex not yet visited
        int minDist = INF, u = -1;
        for (int v = 0; v < V; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                u = v;
            }
        }
        
        if (u == -1) break;
        visited[u] = true;
        
        // Relaxation
        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] && dist[u] != INF
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    printf("Dijkstra from vertex %d:\\n", src);
    for (int i = 0; i < V; i++) {
        printf("  To %d: %d\\n", i, dist[i] == INF ? -1 : dist[i]);
    }
}

// Bellman-Ford Algorithm
typedef struct { int u, v, w; } Edge;

bool bellmanFord(Edge edges[], int numEdges, int src) {
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;
    
    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        for (int j = 0; j < numEdges; j++) {
            int u = edges[j].u, v = edges[j].v, w = edges[j].w;
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check for negative cycle
    for (int j = 0; j < numEdges; j++) {
        int u = edges[j].u, v = edges[j].v, w = edges[j].w;
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            printf("Negative cycle detected!\\n");
            return false;
        }
    }
    
    printf("Bellman-Ford from vertex %d:\\n", src);
    for (int i = 0; i < V; i++) {
        printf("  To %d: %d\\n", i, dist[i] == INF ? -1 : dist[i]);
    }
    return true;
}

// Floyd-Warshall Algorithm
void floydWarshall(int graph[V][V]) {
    int dist[V][V];
    
    // Initialize
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            dist[i][j] = graph[i][j];
        }
    }
    
    // Main algorithm
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF
                    && dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    printf("Floyd-Warshall All-Pairs:\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF) printf("INF ");
            else printf("%3d ", dist[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    int graph[V][V] = {
        {0, 10, 0, 0, 5},
        {0, 0, 1, 0, 2},
        {0, 0, 0, 4, 0},
        {7, 0, 6, 0, 0},
        {0, 3, 9, 2, 0}
    };
    
    dijkstra(graph, 0);
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Shortest Path Algorithms in C++
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

const int INF = INT_MAX;

// Dijkstra with Priority Queue - O(E log V)
vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int src) {
    int n = graph.size();
    vector<int> dist(n, INF);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // Skip outdated
        
        for (auto& [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

// Bellman-Ford - O(VE)
pair<vector<int>, bool> bellmanFord(
    vector<tuple<int,int,int>>& edges, int n, int src) {
    
    vector<int> dist(n, INF);
    dist[src] = 0;
    
    // Relax V-1 times
    for (int i = 0; i < n - 1; i++) {
        for (auto& [u, v, w] : edges) {
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check negative cycle
    for (auto& [u, v, w] : edges) {
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            return {dist, true};  // Has negative cycle
        }
    }
    
    return {dist, false};
}

// Floyd-Warshall - O(V³)
vector<vector<int>> floydWarshall(vector<vector<int>>& graph) {
    int n = graph.size();
    auto dist = graph;
    
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    return dist;
}

// Dijkstra with path reconstruction
pair<vector<int>, vector<int>> dijkstraWithPath(
    vector<vector<pair<int,int>>>& graph, int src) {
    
    int n = graph.size();
    vector<int> dist(n, INF), parent(n, -1);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto& [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    return {dist, parent};
}

vector<int> reconstructPath(vector<int>& parent, int dest) {
    vector<int> path;
    for (int v = dest; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end());
    return path;
}

int main() {
    // Graph: {neighbor, weight}
    vector<vector<pair<int,int>>> graph = {
        {{1, 4}, {2, 1}},
        {{3, 1}},
        {{1, 2}, {3, 5}},
        {{4, 3}},
        {}
    };
    
    auto dist = dijkstra(graph, 0);
    cout << "Dijkstra from 0:" << endl;
    for (int i = 0; i < dist.size(); i++) {
        cout << "  To " << i << ": " << dist[i] << endl;
    }
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Shortest Path Algorithms in Java
import java.util.*;

public class ShortestPath {
    
    // Dijkstra's Algorithm with Priority Queue
    public static int[] dijkstra(List<int[]>[] graph, int src) {
        int n = graph.length;
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        // Min heap: {distance, vertex}
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            Comparator.comparingInt(a -> a[0])
        );
        pq.offer(new int[]{0, src});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], u = curr[1];
            
            if (d > dist[u]) continue;  // Skip outdated
            
            for (int[] edge : graph[u]) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }
    
    // Bellman-Ford Algorithm
    public static int[] bellmanFord(int[][] edges, int n, int src) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        // Relax all edges V-1 times
        for (int i = 0; i < n - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && 
                    dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        
        // Check for negative cycle
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && 
                dist[u] + w < dist[v]) {
                throw new RuntimeException("Negative cycle detected!");
            }
        }
        
        return dist;
    }
    
    // Floyd-Warshall Algorithm
    public static int[][] floydWarshall(int[][] graph) {
        int n = graph.length;
        int[][] dist = new int[n][n];
        
        // Copy input
        for (int i = 0; i < n; i++) {
            dist[i] = graph[i].clone();
        }
        
        // Main algorithm
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != Integer.MAX_VALUE && 
                        dist[k][j] != Integer.MAX_VALUE) {
                        dist[i][j] = Math.min(dist[i][j], 
                                              dist[i][k] + dist[k][j]);
                    }
                }
            }
        }
        return dist;
    }
    
    // 0-1 BFS (edges with weight 0 or 1)
    public static int[] bfs01(List<int[]>[] graph, int src) {
        int n = graph.length;
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        Deque<Integer> deque = new ArrayDeque<>();
        deque.addFirst(src);
        
        while (!deque.isEmpty()) {
            int u = deque.pollFirst();
            
            for (int[] edge : graph[u]) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    if (w == 0) {
                        deque.addFirst(v);  // Weight 0: front
                    } else {
                        deque.addLast(v);   // Weight 1: back
                    }
                }
            }
        }
        return dist;
    }
    
    public static void main(String[] args) {
        int n = 5;
        List<int[]>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
        
        // Add edges: {to, weight}
        graph[0].add(new int[]{1, 4});
        graph[0].add(new int[]{2, 1});
        graph[1].add(new int[]{3, 1});
        graph[2].add(new int[]{1, 2});
        graph[2].add(new int[]{3, 5});
        graph[3].add(new int[]{4, 3});
        
        int[] dist = dijkstra(graph, 0);
        System.out.println("Dijkstra from 0:");
        for (int i = 0; i < n; i++) {
            System.out.println("  To " + i + ": " + dist[i]);
        }
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Shortest Path Algorithms in JavaScript

// Priority Queue (Min Heap)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return min;
    }
    
    bubbleUp(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent][0] <= this.heap[i][0]) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }
    
    bubbleDown(i) {
        const n = this.heap.length;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < n && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
    
    isEmpty() { return this.heap.length === 0; }
}

// Dijkstra's Algorithm
function dijkstra(graph, src) {
    const n = graph.length;
    const dist = Array(n).fill(Infinity);
    const pq = new MinHeap();
    
    dist[src] = 0;
    pq.push([0, src]);
    
    while (!pq.isEmpty()) {
        const [d, u] = pq.pop();
        
        if (d > dist[u]) continue;
        
        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    return dist;
}

// Bellman-Ford Algorithm
function bellmanFord(edges, n, src) {
    const dist = Array(n).fill(Infinity);
    dist[src] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < n - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check for negative cycle
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            return { dist: null, hasNegativeCycle: true };
        }
    }
    
    return { dist, hasNegativeCycle: false };
}

// Floyd-Warshall Algorithm
function floydWarshall(graph) {
    const n = graph.length;
    const dist = graph.map(row => [...row]);
    
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    return dist;
}

// BFS for unweighted graphs
function bfsShortestPath(graph, src, dest) {
    const n = graph.length;
    const dist = Array(n).fill(-1);
    const parent = Array(n).fill(-1);
    const queue = [src];
    dist[src] = 0;
    
    while (queue.length > 0) {
        const u = queue.shift();
        
        for (const v of graph[u]) {
            if (dist[v] === -1) {
                dist[v] = dist[u] + 1;
                parent[v] = u;
                queue.push(v);
            }
        }
    }
    
    // Reconstruct path
    if (dist[dest] === -1) return null;
    
    const path = [];
    for (let v = dest; v !== -1; v = parent[v]) {
        path.unshift(v);
    }
    return { distance: dist[dest], path };
}

// Example usage
const graph = [
    [[1, 4], [2, 1]],  // 0 -> 1(4), 2(1)
    [[3, 1]],           // 1 -> 3(1)
    [[1, 2], [3, 5]],   // 2 -> 1(2), 3(5)
    [[4, 3]],           // 3 -> 4(3)
    []                  // 4
];

console.log("Dijkstra from 0:", dijkstra(graph, 0));

const edges = [[0, 1, 4], [0, 2, 1], [1, 3, 1], [2, 1, 2], [2, 3, 5], [3, 4, 3]];
console.log("Bellman-Ford:", bellmanFord(edges, 5, 0));`,
    },
    {
      language: 'Python',
      code: `# Shortest Path Algorithms in Python
import heapq
from collections import defaultdict, deque
from typing import List, Tuple, Dict

def dijkstra(graph: Dict[int, List[Tuple[int, int]]], src: int) -> Dict[int, int]:
    """
    Dijkstra's algorithm using min heap
    graph: {node: [(neighbor, weight), ...]}
    Returns: {node: shortest_distance}
    """
    dist = {src: 0}
    pq = [(0, src)]  # (distance, vertex)
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if d > dist.get(u, float('inf')):
            continue  # Skip outdated entry
        
        for v, w in graph.get(u, []):
            new_dist = d + w
            if new_dist < dist.get(v, float('inf')):
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))
    
    return dist


def bellman_ford(edges: List[Tuple[int, int, int]], n: int, src: int):
    """
    Bellman-Ford algorithm
    edges: [(u, v, weight), ...]
    Returns: (distances, has_negative_cycle)
    """
    dist = [float('inf')] * n
    dist[src] = 0
    
    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycle
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return dist, True  # Negative cycle exists
    
    return dist, False


def floyd_warshall(graph: List[List[float]]) -> List[List[float]]:
    """
    Floyd-Warshall all-pairs shortest paths
    graph: adjacency matrix (use float('inf') for no edge)
    """
    n = len(graph)
    dist = [row[:] for row in graph]  # Copy
    
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist


def dijkstra_with_path(graph: Dict[int, List[Tuple[int, int]]], src: int, dest: int):
    """Dijkstra with path reconstruction"""
    dist = {src: 0}
    parent = {src: None}
    pq = [(0, src)]
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if u == dest:
            break
        
        if d > dist.get(u, float('inf')):
            continue
        
        for v, w in graph.get(u, []):
            new_dist = d + w
            if new_dist < dist.get(v, float('inf')):
                dist[v] = new_dist
                parent[v] = u
                heapq.heappush(pq, (new_dist, v))
    
    # Reconstruct path
    if dest not in dist:
        return None, float('inf')
    
    path = []
    node = dest
    while node is not None:
        path.append(node)
        node = parent[node]
    
    return path[::-1], dist[dest]


def bfs_shortest(graph: Dict[int, List[int]], src: int, dest: int):
    """BFS for unweighted graphs"""
    if src == dest:
        return [src], 0
    
    visited = {src}
    queue = deque([(src, [src])])
    
    while queue:
        node, path = queue.popleft()
        
        for neighbor in graph.get(node, []):
            if neighbor == dest:
                return path + [neighbor], len(path)
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None, -1


# Example usage
if __name__ == "__main__":
    # Weighted graph for Dijkstra
    graph = {
        0: [(1, 4), (2, 1)],
        1: [(3, 1)],
        2: [(1, 2), (3, 5)],
        3: [(4, 3)],
        4: []
    }
    
    print("Dijkstra from 0:", dijkstra(graph, 0))
    
    path, dist = dijkstra_with_path(graph, 0, 4)
    print(f"Path 0→4: {path}, distance: {dist}")
    
    # Bellman-Ford
    edges = [(0, 1, 4), (0, 2, 1), (1, 3, 1), (2, 1, 2), (2, 3, 5), (3, 4, 3)]
    distances, has_cycle = bellman_ford(edges, 5, 0)
    print(f"Bellman-Ford: {distances}, negative cycle: {has_cycle}")
    
    # Floyd-Warshall
    INF = float('inf')
    matrix = [
        [0, 4, 1, INF, INF],
        [INF, 0, INF, 1, INF],
        [INF, 2, 0, 5, INF],
        [INF, INF, INF, 0, 3],
        [INF, INF, INF, INF, 0]
    ]
    all_pairs = floyd_warshall(matrix)
    print("Floyd-Warshall:", all_pairs[0])  # From vertex 0`,
    },
  ],
  types: [
    {
      name: "Dijkstra's Algorithm",
      description: 'Greedy, uses priority queue. Works only with non-negative weights. O(E log V) with heap.',
    },
    {
      name: 'Bellman-Ford Algorithm',
      description: 'Dynamic programming. Handles negative weights, detects negative cycles. O(VE).',
    },
    {
      name: 'Floyd-Warshall Algorithm',
      description: 'All-pairs shortest paths using dynamic programming. O(V³) time and space.',
    },
    {
      name: 'BFS (Unweighted)',
      description: 'Level-order traversal finds shortest path in unweighted graphs. O(V + E).',
    },
    {
      name: '0-1 BFS',
      description: 'For graphs with only 0 and 1 weights. Uses deque. O(V + E).',
    },
  ],
  operations: [
    {
      name: 'Single Source (Dijkstra)',
      description: 'Find shortest paths from one source to all vertices',
      timeComplexity: 'O((V + E) log V) with heap',
    },
    {
      name: 'Single Source (Bellman-Ford)',
      description: 'Find shortest paths, handle negative weights',
      timeComplexity: 'O(VE)',
    },
    {
      name: 'All Pairs (Floyd-Warshall)',
      description: 'Find shortest paths between all pairs',
      timeComplexity: 'O(V³)',
    },
    {
      name: 'Path Reconstruction',
      description: 'Trace back parent pointers to get actual path',
      timeComplexity: 'O(V)',
    },
  ],
  advantages: [
    'Dijkstra: Very efficient for non-negative weights',
    'Bellman-Ford: Handles negative weights and detects cycles',
    'Floyd-Warshall: Simple implementation for all-pairs',
    'Essential for routing, navigation, network analysis',
    'Well-studied with optimal complexity bounds',
  ],
  disadvantages: [
    'Dijkstra: Cannot handle negative weights',
    'Bellman-Ford: Slower than Dijkstra O(VE) vs O(E log V)',
    'Floyd-Warshall: O(V³) impractical for large graphs',
    'All require O(V) or O(V²) space for distances',
  ],
  applications: [
    'GPS and navigation systems',
    'Network routing protocols (OSPF, BGP)',
    'Social network analysis',
    'Game AI pathfinding',
    'Flight/transportation scheduling',
    'Internet packet routing',
  ],
};
