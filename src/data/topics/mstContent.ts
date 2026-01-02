import { TopicContent } from '../topicContents';

export const mstContent: TopicContent = {
  id: 'minimum-spanning-tree',
  definition: 'A Minimum Spanning Tree (MST) of a weighted, connected, undirected graph is a tree that spans all vertices with the minimum total edge weight. Two classic algorithms are Kruskal\'s (edge-based, uses Union-Find) and Prim\'s (vertex-based, uses priority queue).',
  keyPoints: [
    'Spanning Tree: Connected subgraph with V-1 edges covering all V vertices',
    'Minimum: Total weight of edges is minimized',
    'Kruskal\'s: Sort edges, add smallest that doesn\'t create cycle (uses Union-Find)',
    'Prim\'s: Grow tree from one vertex, always add minimum edge to tree',
    'Both algorithms produce optimal MST (may differ if multiple MSTs exist)',
    'MST is unique if all edge weights are distinct',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Minimum Spanning Tree in C
#include <stdio.h>
#include <stdlib.h>

#define V 5
#define E 7

// Edge structure for Kruskal's
typedef struct {
    int u, v, weight;
} Edge;

// Union-Find (Disjoint Set)
int parent[V], rank_arr[V];

void makeSet(int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        rank_arr[i] = 0;
    }
}

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // Path compression
    }
    return parent[x];
}

void unionSets(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return;
    
    // Union by rank
    if (rank_arr[px] < rank_arr[py]) {
        parent[px] = py;
    } else if (rank_arr[px] > rank_arr[py]) {
        parent[py] = px;
    } else {
        parent[py] = px;
        rank_arr[px]++;
    }
}

// Compare function for qsort
int compareEdges(const void* a, const void* b) {
    return ((Edge*)a)->weight - ((Edge*)b)->weight;
}

// Kruskal's Algorithm
int kruskal(Edge edges[], int numEdges, int numVertices) {
    // Sort edges by weight
    qsort(edges, numEdges, sizeof(Edge), compareEdges);
    
    makeSet(numVertices);
    
    int mstWeight = 0;
    int edgesInMST = 0;
    
    printf("Kruskal's MST edges:\\n");
    
    for (int i = 0; i < numEdges && edgesInMST < numVertices - 1; i++) {
        int u = edges[i].u;
        int v = edges[i].v;
        int w = edges[i].weight;
        
        // Check if adding edge creates cycle
        if (find(u) != find(v)) {
            unionSets(u, v);
            mstWeight += w;
            edgesInMST++;
            printf("  (%d - %d): %d\\n", u, v, w);
        }
    }
    
    return mstWeight;
}

// Prim's Algorithm (Adjacency Matrix)
int prim(int graph[V][V], int numVertices) {
    int key[V];       // Minimum weight edge to each vertex
    int parent[V];    // MST parent
    int inMST[V];     // Is vertex in MST?
    
    for (int i = 0; i < numVertices; i++) {
        key[i] = 1e9;
        inMST[i] = 0;
    }
    
    key[0] = 0;
    parent[0] = -1;
    
    for (int count = 0; count < numVertices - 1; count++) {
        // Find minimum key vertex not in MST
        int minKey = 1e9, u = -1;
        for (int v = 0; v < numVertices; v++) {
            if (!inMST[v] && key[v] < minKey) {
                minKey = key[v];
                u = v;
            }
        }
        
        inMST[u] = 1;
        
        // Update keys of adjacent vertices
        for (int v = 0; v < numVertices; v++) {
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) {
                key[v] = graph[u][v];
                parent[v] = u;
            }
        }
    }
    
    int mstWeight = 0;
    printf("Prim's MST edges:\\n");
    for (int i = 1; i < numVertices; i++) {
        printf("  (%d - %d): %d\\n", parent[i], i, graph[parent[i]][i]);
        mstWeight += graph[parent[i]][i];
    }
    
    return mstWeight;
}

int main() {
    // Kruskal's example
    Edge edges[] = {
        {0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8},
        {1, 4, 5}, {2, 4, 7}, {3, 4, 9}
    };
    
    printf("Kruskal's MST weight: %d\\n\\n", kruskal(edges, E, V));
    
    // Prim's example (same graph as adjacency matrix)
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };
    
    printf("Prim's MST weight: %d\\n", prim(graph, V));
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Minimum Spanning Tree in C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

// Union-Find with path compression and rank
class UnionFind {
    vector<int> parent, rank_;
public:
    UnionFind(int n) : parent(n), rank_(n, 0) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // Already connected
        
        // Union by rank
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        
        return true;
    }
};

// Kruskal's Algorithm - O(E log E)
pair<int, vector<tuple<int,int,int>>> kruskal(
    vector<tuple<int,int,int>>& edges, int n) {
    
    // Sort edges by weight
    sort(edges.begin(), edges.end(), 
         [](auto& a, auto& b) { return get<2>(a) < get<2>(b); });
    
    UnionFind uf(n);
    vector<tuple<int,int,int>> mst;
    int totalWeight = 0;
    
    for (auto& [u, v, w] : edges) {
        if (uf.unite(u, v)) {
            mst.push_back({u, v, w});
            totalWeight += w;
            if (mst.size() == n - 1) break;
        }
    }
    
    return {totalWeight, mst};
}

// Prim's Algorithm with Priority Queue - O(E log V)
pair<int, vector<pair<int,int>>> prim(
    vector<vector<pair<int,int>>>& graph, int start = 0) {
    
    int n = graph.size();
    vector<bool> inMST(n, false);
    vector<pair<int,int>> mstEdges;  // {parent, vertex}
    int totalWeight = 0;
    
    // Min heap: {weight, vertex, parent}
    priority_queue<tuple<int,int,int>, 
                   vector<tuple<int,int,int>>,
                   greater<>> pq;
    
    pq.push({0, start, -1});
    
    while (!pq.empty() && mstEdges.size() < n) {
        auto [w, u, parent] = pq.top();
        pq.pop();
        
        if (inMST[u]) continue;
        inMST[u] = true;
        totalWeight += w;
        
        if (parent != -1) {
            mstEdges.push_back({parent, u});
        }
        
        for (auto& [v, weight] : graph[u]) {
            if (!inMST[v]) {
                pq.push({weight, v, u});
            }
        }
    }
    
    return {totalWeight, mstEdges};
}

// Boruvka's Algorithm - O(E log V)
int boruvka(vector<tuple<int,int,int>>& edges, int n) {
    UnionFind uf(n);
    int totalWeight = 0;
    int numComponents = n;
    
    while (numComponents > 1) {
        vector<int> cheapest(n, -1);
        
        // Find cheapest edge for each component
        for (int i = 0; i < edges.size(); i++) {
            auto& [u, v, w] = edges[i];
            int pu = uf.find(u), pv = uf.find(v);
            
            if (pu != pv) {
                if (cheapest[pu] == -1 || get<2>(edges[cheapest[pu]]) > w)
                    cheapest[pu] = i;
                if (cheapest[pv] == -1 || get<2>(edges[cheapest[pv]]) > w)
                    cheapest[pv] = i;
            }
        }
        
        // Add cheapest edges to MST
        for (int i = 0; i < n; i++) {
            if (cheapest[i] != -1) {
                auto& [u, v, w] = edges[cheapest[i]];
                if (uf.unite(u, v)) {
                    totalWeight += w;
                    numComponents--;
                }
            }
        }
    }
    
    return totalWeight;
}

int main() {
    // Graph: adjacency list {neighbor, weight}
    vector<vector<pair<int,int>>> graph = {
        {{1, 2}, {3, 6}},
        {{0, 2}, {2, 3}, {3, 8}, {4, 5}},
        {{1, 3}, {4, 7}},
        {{0, 6}, {1, 8}, {4, 9}},
        {{1, 5}, {2, 7}, {3, 9}}
    };
    
    auto [primWeight, primEdges] = prim(graph);
    cout << "Prim's MST weight: " << primWeight << endl;
    
    // Edges for Kruskal's
    vector<tuple<int,int,int>> edges = {
        {0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8},
        {1, 4, 5}, {2, 4, 7}, {3, 4, 9}
    };
    
    auto [kruskalWeight, kruskalEdges] = kruskal(edges, 5);
    cout << "Kruskal's MST weight: " << kruskalWeight << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Minimum Spanning Tree in Java
import java.util.*;

public class MST {
    
    // Union-Find (Disjoint Set Union)
    static class UnionFind {
        int[] parent, rank;
        
        UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        
        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);  // Path compression
            }
            return parent[x];
        }
        
        boolean union(int x, int y) {
            int px = find(x), py = find(y);
            if (px == py) return false;
            
            if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
            parent[py] = px;
            if (rank[px] == rank[py]) rank[px]++;
            
            return true;
        }
    }
    
    // Kruskal's Algorithm - O(E log E)
    public static int kruskal(int[][] edges, int n) {
        // Sort edges by weight
        Arrays.sort(edges, (a, b) -> a[2] - b[2]);
        
        UnionFind uf = new UnionFind(n);
        int totalWeight = 0;
        int edgesUsed = 0;
        
        System.out.println("Kruskal's MST:");
        
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            
            if (uf.union(u, v)) {
                totalWeight += w;
                edgesUsed++;
                System.out.printf("  (%d - %d): %d%n", u, v, w);
                
                if (edgesUsed == n - 1) break;
            }
        }
        
        return totalWeight;
    }
    
    // Prim's Algorithm with PriorityQueue - O(E log V)
    public static int prim(List<int[]>[] graph, int start) {
        int n = graph.length;
        boolean[] inMST = new boolean[n];
        int totalWeight = 0;
        
        // Min heap: {weight, vertex}
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            Comparator.comparingInt(a -> a[0])
        );
        pq.offer(new int[]{0, start});
        
        System.out.println("Prim's MST:");
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int w = curr[0], u = curr[1];
            
            if (inMST[u]) continue;
            inMST[u] = true;
            totalWeight += w;
            
            if (w > 0) {
                System.out.printf("  Added vertex %d with weight %d%n", u, w);
            }
            
            for (int[] edge : graph[u]) {
                int v = edge[0], weight = edge[1];
                if (!inMST[v]) {
                    pq.offer(new int[]{weight, v});
                }
            }
        }
        
        return totalWeight;
    }
    
    // Check if MST exists (graph is connected)
    public static boolean isMSTValid(int[][] edges, int n) {
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        
        int root = uf.find(0);
        for (int i = 1; i < n; i++) {
            if (uf.find(i) != root) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        int n = 5;
        
        // Edges: {u, v, weight}
        int[][] edges = {
            {0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8},
            {1, 4, 5}, {2, 4, 7}, {3, 4, 9}
        };
        
        System.out.println("Total weight: " + kruskal(edges, n));
        System.out.println();
        
        // Build adjacency list for Prim's
        @SuppressWarnings("unchecked")
        List<int[]>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
        
        for (int[] e : edges) {
            graph[e[0]].add(new int[]{e[1], e[2]});
            graph[e[1]].add(new int[]{e[0], e[2]});
        }
        
        System.out.println("Total weight: " + prim(graph, 0));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Minimum Spanning Tree in JavaScript

// Union-Find (Disjoint Set Union)
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false;
        
        // Union by rank
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
}

// Kruskal's Algorithm - O(E log E)
function kruskal(edges, n) {
    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);
    
    const uf = new UnionFind(n);
    const mst = [];
    let totalWeight = 0;
    
    for (const [u, v, w] of edges) {
        if (uf.union(u, v)) {
            mst.push([u, v, w]);
            totalWeight += w;
            if (mst.length === n - 1) break;
        }
    }
    
    return { totalWeight, mst };
}

// Prim's Algorithm - O(E log V) with priority queue
function prim(graph, start = 0) {
    const n = graph.length;
    const inMST = Array(n).fill(false);
    const mst = [];
    let totalWeight = 0;
    
    // Simple priority queue (min heap)
    const pq = [[0, start, -1]]; // [weight, vertex, parent]
    
    while (pq.length > 0 && mst.length < n) {
        // Extract min (in production, use proper heap)
        pq.sort((a, b) => a[0] - b[0]);
        const [w, u, parent] = pq.shift();
        
        if (inMST[u]) continue;
        inMST[u] = true;
        totalWeight += w;
        
        if (parent !== -1) {
            mst.push([parent, u, w]);
        }
        
        for (const [v, weight] of graph[u]) {
            if (!inMST[v]) {
                pq.push([weight, v, u]);
            }
        }
    }
    
    return { totalWeight, mst };
}

// Lazy Prim's with proper heap
class MinHeap {
    constructor() { this.heap = []; }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (!this.heap.length) return null;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return min;
    }
    
    bubbleUp(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[p][0] <= this.heap[i][0]) break;
            [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
            i = p;
        }
    }
    
    bubbleDown(i) {
        while (true) {
            let min = i;
            const l = 2 * i + 1, r = 2 * i + 2;
            if (l < this.heap.length && this.heap[l][0] < this.heap[min][0]) min = l;
            if (r < this.heap.length && this.heap[r][0] < this.heap[min][0]) min = r;
            if (min === i) break;
            [this.heap[i], this.heap[min]] = [this.heap[min], this.heap[i]];
            i = min;
        }
    }
    
    isEmpty() { return this.heap.length === 0; }
}

function primOptimized(graph, start = 0) {
    const n = graph.length;
    const inMST = Array(n).fill(false);
    const pq = new MinHeap();
    let totalWeight = 0;
    let edgesUsed = 0;
    
    pq.push([0, start]);
    
    while (!pq.isEmpty() && edgesUsed < n) {
        const [w, u] = pq.pop();
        
        if (inMST[u]) continue;
        inMST[u] = true;
        totalWeight += w;
        edgesUsed++;
        
        for (const [v, weight] of graph[u]) {
            if (!inMST[v]) {
                pq.push([weight, v]);
            }
        }
    }
    
    return totalWeight;
}

// Example usage
const edges = [
    [0, 1, 2], [0, 3, 6], [1, 2, 3], [1, 3, 8],
    [1, 4, 5], [2, 4, 7], [3, 4, 9]
];

console.log("Kruskal's:", kruskal([...edges], 5));

// Adjacency list for Prim's
const graph = [
    [[1, 2], [3, 6]],
    [[0, 2], [2, 3], [3, 8], [4, 5]],
    [[1, 3], [4, 7]],
    [[0, 6], [1, 8], [4, 9]],
    [[1, 5], [2, 7], [3, 9]]
];

console.log("Prim's:", prim(graph));
console.log("Prim's Optimized:", primOptimized(graph));`,
    },
    {
      language: 'Python',
      code: `# Minimum Spanning Tree in Python
import heapq
from typing import List, Tuple

class UnionFind:
    """Disjoint Set Union with path compression and union by rank"""
    
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already in same set
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        return True


def kruskal(edges: List[Tuple[int, int, int]], n: int) -> Tuple[int, List]:
    """
    Kruskal's Algorithm - O(E log E)
    edges: [(u, v, weight), ...]
    Returns: (total_weight, mst_edges)
    """
    # Sort edges by weight
    edges = sorted(edges, key=lambda x: x[2])
    
    uf = UnionFind(n)
    mst = []
    total_weight = 0
    
    for u, v, w in edges:
        if uf.union(u, v):
            mst.append((u, v, w))
            total_weight += w
            if len(mst) == n - 1:
                break
    
    return total_weight, mst


def prim(graph: List[List[Tuple[int, int]]], start: int = 0) -> Tuple[int, List]:
    """
    Prim's Algorithm with min heap - O(E log V)
    graph: adjacency list [(neighbor, weight), ...]
    Returns: (total_weight, mst_edges)
    """
    n = len(graph)
    in_mst = [False] * n
    mst = []
    total_weight = 0
    
    # Min heap: (weight, vertex, parent)
    pq = [(0, start, -1)]
    
    while pq and len(mst) < n:
        w, u, parent = heapq.heappop(pq)
        
        if in_mst[u]:
            continue
        
        in_mst[u] = True
        total_weight += w
        
        if parent != -1:
            mst.append((parent, u, w))
        
        for v, weight in graph[u]:
            if not in_mst[v]:
                heapq.heappush(pq, (weight, v, u))
    
    return total_weight, mst


def prim_dense(adj_matrix: List[List[int]]) -> int:
    """
    Prim's for dense graphs (adjacency matrix) - O(V²)
    """
    n = len(adj_matrix)
    INF = float('inf')
    
    in_mst = [False] * n
    key = [INF] * n  # Minimum weight edge to vertex
    key[0] = 0
    
    total_weight = 0
    
    for _ in range(n):
        # Find minimum key vertex not in MST
        u = -1
        for v in range(n):
            if not in_mst[v] and (u == -1 or key[v] < key[u]):
                u = v
        
        in_mst[u] = True
        total_weight += key[u]
        
        # Update keys of adjacent vertices
        for v in range(n):
            if adj_matrix[u][v] and not in_mst[v]:
                key[v] = min(key[v], adj_matrix[u][v])
    
    return total_weight


def boruvka(edges: List[Tuple[int, int, int]], n: int) -> int:
    """
    Borůvka's Algorithm - O(E log V)
    Good for parallel implementation
    """
    uf = UnionFind(n)
    total_weight = 0
    num_components = n
    
    while num_components > 1:
        # Find cheapest edge for each component
        cheapest = [-1] * n
        
        for i, (u, v, w) in enumerate(edges):
            pu, pv = uf.find(u), uf.find(v)
            
            if pu != pv:
                if cheapest[pu] == -1 or edges[cheapest[pu]][2] > w:
                    cheapest[pu] = i
                if cheapest[pv] == -1 or edges[cheapest[pv]][2] > w:
                    cheapest[pv] = i
        
        # Add cheapest edges to MST
        for i in range(n):
            if cheapest[i] != -1:
                u, v, w = edges[cheapest[i]]
                if uf.union(u, v):
                    total_weight += w
                    num_components -= 1
    
    return total_weight


# Example usage
if __name__ == "__main__":
    # Edges: (u, v, weight)
    edges = [
        (0, 1, 2), (0, 3, 6), (1, 2, 3), (1, 3, 8),
        (1, 4, 5), (2, 4, 7), (3, 4, 9)
    ]
    
    weight, mst = kruskal(edges, 5)
    print(f"Kruskal's MST weight: {weight}")
    print(f"MST edges: {mst}")
    
    # Adjacency list for Prim's
    graph = [
        [(1, 2), (3, 6)],
        [(0, 2), (2, 3), (3, 8), (4, 5)],
        [(1, 3), (4, 7)],
        [(0, 6), (1, 8), (4, 9)],
        [(1, 5), (2, 7), (3, 9)]
    ]
    
    weight, mst = prim(graph)
    print(f"\\nPrim's MST weight: {weight}")
    print(f"MST edges: {mst}")
    
    print(f"\\nBorůvka's MST weight: {boruvka(edges, 5)}")`,
    },
  ],
  types: [
    {
      name: "Kruskal's Algorithm",
      description: 'Edge-based, greedy. Sort edges, add smallest that doesn\'t create cycle. O(E log E).',
    },
    {
      name: "Prim's Algorithm",
      description: 'Vertex-based, greedy. Grow tree by always adding minimum edge to tree. O(E log V).',
    },
    {
      name: "Borůvka's Algorithm",
      description: 'Component-based. Each component adds its cheapest edge. O(E log V). Parallelizable.',
    },
    {
      name: 'Reverse-Delete Algorithm',
      description: 'Start with all edges, remove heaviest that doesn\'t disconnect. O(E log V).',
    },
  ],
  operations: [
    {
      name: 'Kruskal',
      description: 'Sort edges + Union-Find for cycle detection',
      timeComplexity: 'O(E log E)',
    },
    {
      name: 'Prim (heap)',
      description: 'Priority queue for minimum edge selection',
      timeComplexity: 'O(E log V)',
    },
    {
      name: 'Prim (dense)',
      description: 'Simple array for dense graphs',
      timeComplexity: 'O(V²)',
    },
    {
      name: 'Union-Find',
      description: 'Path compression + union by rank',
      timeComplexity: 'O(α(n)) ≈ O(1) amortized',
    },
  ],
  advantages: [
    'Optimal solution guaranteed for connected graphs',
    'Kruskal works well with sparse graphs (E ≈ V)',
    'Prim works well with dense graphs (E ≈ V²)',
    'Union-Find enables nearly constant time cycle detection',
    'Multiple MSTs can be found if weights are equal',
  ],
  disadvantages: [
    'Only works on undirected graphs',
    'Must have all edges available upfront',
    'Kruskal requires sorting all edges first',
    'Prim needs good starting vertex choice for visualization',
  ],
  applications: [
    'Network design (minimum cable/wire length)',
    'Cluster analysis (single-link clustering)',
    'Image segmentation',
    'Approximation algorithms for NP-hard problems',
    'Circuit design (minimize wiring)',
    'Transportation network planning',
  ],
};
