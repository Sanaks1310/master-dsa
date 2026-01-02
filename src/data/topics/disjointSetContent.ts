import { TopicContent } from '../topicContents';

export const disjointSetContent: TopicContent = {
  id: 'disjoint-set',
  definition: 'Disjoint Set (Union-Find) is a data structure that tracks elements partitioned into non-overlapping subsets. It provides near-constant time operations to determine if two elements are in the same set and to merge two sets. Essential for Kruskal\'s MST, cycle detection, and connected components.',
  keyPoints: [
    'Two main operations: Find (which set?) and Union (merge sets)',
    'Path Compression: Flatten tree during Find for faster future queries',
    'Union by Rank/Size: Attach smaller tree under larger to keep height low',
    'With both optimizations: O(α(n)) amortized time per operation',
    'α(n) is inverse Ackermann function, practically ≤ 4 for any n',
    'Used in Kruskal\'s MST, connected components, cycle detection',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Disjoint Set Union (Union-Find) in C
#include <stdio.h>
#include <stdlib.h>

#define MAX_N 1000

int parent[MAX_N];
int rank_arr[MAX_N];  // Union by rank
int size[MAX_N];      // Union by size (alternative)

// Initialize n disjoint sets
void makeSet(int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;    // Each element is its own parent
        rank_arr[i] = 0;
        size[i] = 1;
    }
}

// Find with path compression
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // Path compression
    }
    return parent[x];
}

// Find without path compression (for comparison)
int findSimple(int x) {
    while (parent[x] != x) {
        x = parent[x];
    }
    return x;
}

// Union by rank
int unionByRank(int x, int y) {
    int px = find(x);
    int py = find(y);
    
    if (px == py) return 0;  // Already in same set
    
    // Attach smaller tree under larger tree
    if (rank_arr[px] < rank_arr[py]) {
        parent[px] = py;
    } else if (rank_arr[px] > rank_arr[py]) {
        parent[py] = px;
    } else {
        parent[py] = px;
        rank_arr[px]++;  // Increase rank when equal
    }
    return 1;  // Union performed
}

// Union by size
int unionBySize(int x, int y) {
    int px = find(x);
    int py = find(y);
    
    if (px == py) return 0;
    
    // Attach smaller tree under larger tree
    if (size[px] < size[py]) {
        int temp = px; px = py; py = temp;
    }
    parent[py] = px;
    size[px] += size[py];
    
    return 1;
}

// Check if two elements are in same set
int connected(int x, int y) {
    return find(x) == find(y);
}

// Get size of set containing x
int getSize(int x) {
    return size[find(x)];
}

// Count number of distinct sets
int countSets(int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (parent[i] == i) count++;
    }
    return count;
}

int main() {
    int n = 10;
    makeSet(n);
    
    // Create some unions
    unionByRank(0, 1);
    unionByRank(2, 3);
    unionByRank(1, 2);
    unionByRank(4, 5);
    
    printf("0 and 3 connected: %s\\n", connected(0, 3) ? "Yes" : "No");
    printf("0 and 4 connected: %s\\n", connected(0, 4) ? "Yes" : "No");
    printf("Number of sets: %d\\n", countSets(n));
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Disjoint Set Union in C++
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

class UnionFind {
private:
    vector<int> parent, rank_, size_;
    int numSets;
    
public:
    UnionFind(int n) : numSets(n) {
        parent.resize(n);
        rank_.resize(n, 0);
        size_.resize(n, 1);
        iota(parent.begin(), parent.end(), 0);  // parent[i] = i
    }
    
    // Find with path compression
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    // Union by rank
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        size_[px] += size_[py];
        
        if (rank_[px] == rank_[py]) rank_[px]++;
        numSets--;
        
        return true;
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
    
    int getSize(int x) {
        return size_[find(x)];
    }
    
    int getNumSets() const {
        return numSets;
    }
};

// Application: Detect cycle in undirected graph
bool hasCycle(vector<pair<int,int>>& edges, int n) {
    UnionFind uf(n);
    
    for (auto& [u, v] : edges) {
        if (uf.connected(u, v)) {
            return true;  // Edge creates cycle
        }
        uf.unite(u, v);
    }
    return false;
}

// Application: Count connected components
int countComponents(vector<pair<int,int>>& edges, int n) {
    UnionFind uf(n);
    
    for (auto& [u, v] : edges) {
        uf.unite(u, v);
    }
    
    return uf.getNumSets();
}

// Application: Check if graph is connected
bool isConnected(vector<pair<int,int>>& edges, int n) {
    UnionFind uf(n);
    
    for (auto& [u, v] : edges) {
        uf.unite(u, v);
    }
    
    return uf.getNumSets() == 1;
}

// Weighted Union-Find (for problems like minimum weight)
class WeightedUnionFind {
    vector<int> parent;
    vector<long long> weight;  // Weight from node to parent
    
public:
    WeightedUnionFind(int n) : parent(n), weight(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    pair<int, long long> find(int x) {
        if (parent[x] == x) return {x, 0};
        
        auto [root, w] = find(parent[x]);
        parent[x] = root;
        weight[x] += w;
        return {root, weight[x]};
    }
    
    bool unite(int x, int y, long long w) {
        auto [px, wx] = find(x);
        auto [py, wy] = find(y);
        
        if (px == py) return false;
        
        parent[px] = py;
        weight[px] = wy - wx + w;
        return true;
    }
};

int main() {
    UnionFind uf(10);
    
    uf.unite(0, 1);
    uf.unite(2, 3);
    uf.unite(1, 2);
    uf.unite(4, 5);
    
    cout << "0-3 connected: " << (uf.connected(0, 3) ? "Yes" : "No") << endl;
    cout << "0-4 connected: " << (uf.connected(0, 4) ? "Yes" : "No") << endl;
    cout << "Set containing 0 has size: " << uf.getSize(0) << endl;
    cout << "Number of sets: " << uf.getNumSets() << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Disjoint Set Union in Java
public class UnionFind {
    private int[] parent;
    private int[] rank;
    private int[] size;
    private int numSets;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        size = new int[n];
        numSets = n;
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }
    
    // Find with path compression
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    // Union by rank
    public boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        // Union by rank
        if (rank[px] < rank[py]) {
            int temp = px; px = py; py = temp;
        }
        parent[py] = px;
        size[px] += size[py];
        
        if (rank[px] == rank[py]) rank[px]++;
        numSets--;
        
        return true;
    }
    
    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }
    
    public int getSize(int x) {
        return size[find(x)];
    }
    
    public int getNumSets() {
        return numSets;
    }
    
    // Application: Number of Islands (2D grid)
    public static int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int rows = grid.length, cols = grid[0].length;
        UnionFind uf = new UnionFind(rows * cols);
        int water = 0;
        
        int[][] dirs = {{0, 1}, {1, 0}};
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '0') {
                    water++;
                    continue;
                }
                
                for (int[] d : dirs) {
                    int ni = i + d[0], nj = j + d[1];
                    if (ni < rows && nj < cols && grid[ni][nj] == '1') {
                        uf.union(i * cols + j, ni * cols + nj);
                    }
                }
            }
        }
        
        return uf.getNumSets() - water;
    }
    
    // Application: Accounts Merge
    public static void main(String[] args) {
        UnionFind uf = new UnionFind(10);
        
        uf.union(0, 1);
        uf.union(2, 3);
        uf.union(1, 2);
        uf.union(4, 5);
        
        System.out.println("0-3 connected: " + uf.connected(0, 3));
        System.out.println("0-4 connected: " + uf.connected(0, 4));
        System.out.println("Size of set with 0: " + uf.getSize(0));
        System.out.println("Number of sets: " + uf.getNumSets());
        
        // Test number of islands
        char[][] grid = {
            {'1', '1', '0', '0', '0'},
            {'1', '1', '0', '0', '0'},
            {'0', '0', '1', '0', '0'},
            {'0', '0', '0', '1', '1'}
        };
        System.out.println("Number of islands: " + numIslands(grid));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Disjoint Set Union in JavaScript

class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
        this.size = Array(n).fill(1);
        this.numSets = n;
    }
    
    // Find with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    // Union by rank
    union(x, y) {
        let px = this.find(x), py = this.find(y);
        if (px === py) return false;
        
        if (this.rank[px] < this.rank[py]) {
            [px, py] = [py, px];
        }
        
        this.parent[py] = px;
        this.size[px] += this.size[py];
        
        if (this.rank[px] === this.rank[py]) {
            this.rank[px]++;
        }
        this.numSets--;
        
        return true;
    }
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    getSize(x) {
        return this.size[this.find(x)];
    }
    
    getNumSets() {
        return this.numSets;
    }
}

// Application: Detect cycle in undirected graph
function hasCycle(edges, n) {
    const uf = new UnionFind(n);
    
    for (const [u, v] of edges) {
        if (uf.connected(u, v)) {
            return true;
        }
        uf.union(u, v);
    }
    return false;
}

// Application: Number of connected components
function countComponents(n, edges) {
    const uf = new UnionFind(n);
    
    for (const [u, v] of edges) {
        uf.union(u, v);
    }
    
    return uf.getNumSets();
}

// Application: Number of islands
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    const uf = new UnionFind(rows * cols);
    let water = 0;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '0') {
                water++;
                continue;
            }
            
            // Check right and down neighbors
            if (j + 1 < cols && grid[i][j + 1] === '1') {
                uf.union(i * cols + j, i * cols + j + 1);
            }
            if (i + 1 < rows && grid[i + 1][j] === '1') {
                uf.union(i * cols + j, (i + 1) * cols + j);
            }
        }
    }
    
    return uf.getNumSets() - water;
}

// Application: Redundant connection (find cycle-causing edge)
function findRedundantConnection(edges) {
    const n = edges.length;
    const uf = new UnionFind(n + 1);
    
    for (const [u, v] of edges) {
        if (!uf.union(u, v)) {
            return [u, v];  // This edge creates a cycle
        }
    }
    return [];
}

// Example usage
const uf = new UnionFind(10);

uf.union(0, 1);
uf.union(2, 3);
uf.union(1, 2);
uf.union(4, 5);

console.log("0-3 connected:", uf.connected(0, 3));
console.log("0-4 connected:", uf.connected(0, 4));
console.log("Size of set with 0:", uf.getSize(0));
console.log("Number of sets:", uf.getNumSets());

// Test cycle detection
const edges = [[0, 1], [1, 2], [2, 0]];
console.log("Has cycle:", hasCycle(edges, 3));

// Test number of components
console.log("Components:", countComponents(5, [[0, 1], [1, 2], [3, 4]]));`,
    },
    {
      language: 'Python',
      code: `# Disjoint Set Union (Union-Find) in Python
from typing import List, Tuple, Optional

class UnionFind:
    """Union-Find with path compression and union by rank"""
    
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.size = [1] * n
        self.num_sets = n
    
    def find(self, x: int) -> int:
        """Find with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        """Union by rank, returns True if union performed"""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        
        self.parent[py] = px
        self.size[px] += self.size[py]
        
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        self.num_sets -= 1
        return True
    
    def connected(self, x: int, y: int) -> bool:
        """Check if x and y are in same set"""
        return self.find(x) == self.find(y)
    
    def get_size(self, x: int) -> int:
        """Get size of set containing x"""
        return self.size[self.find(x)]
    
    def get_num_sets(self) -> int:
        """Get number of disjoint sets"""
        return self.num_sets


# Application: Detect cycle in undirected graph
def has_cycle(edges: List[Tuple[int, int]], n: int) -> bool:
    uf = UnionFind(n)
    
    for u, v in edges:
        if uf.connected(u, v):
            return True
        uf.union(u, v)
    
    return False


# Application: Number of connected components
def count_components(n: int, edges: List[Tuple[int, int]]) -> int:
    uf = UnionFind(n)
    
    for u, v in edges:
        uf.union(u, v)
    
    return uf.get_num_sets()


# Application: Number of islands
def num_islands(grid: List[List[str]]) -> int:
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    uf = UnionFind(rows * cols)
    water = 0
    
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '0':
                water += 1
                continue
            
            # Check right and down neighbors
            if j + 1 < cols and grid[i][j + 1] == '1':
                uf.union(i * cols + j, i * cols + j + 1)
            if i + 1 < rows and grid[i + 1][j] == '1':
                uf.union(i * cols + j, (i + 1) * cols + j)
    
    return uf.get_num_sets() - water


# Application: Find redundant connection (cycle-causing edge)
def find_redundant_connection(edges: List[List[int]]) -> List[int]:
    n = len(edges)
    uf = UnionFind(n + 1)
    
    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]
    
    return []


# Application: Accounts merge
def accounts_merge(accounts: List[List[str]]) -> List[List[str]]:
    from collections import defaultdict
    
    email_to_id = {}
    email_to_name = {}
    uf = UnionFind(len(accounts))
    
    for i, account in enumerate(accounts):
        name = account[0]
        for email in account[1:]:
            email_to_name[email] = name
            if email in email_to_id:
                uf.union(i, email_to_id[email])
            else:
                email_to_id[email] = i
    
    # Group emails by root
    root_to_emails = defaultdict(set)
    for email, idx in email_to_id.items():
        root = uf.find(idx)
        root_to_emails[root].add(email)
    
    return [[email_to_name[list(emails)[0]]] + sorted(emails) 
            for emails in root_to_emails.values()]


# Example usage
if __name__ == "__main__":
    uf = UnionFind(10)
    
    uf.union(0, 1)
    uf.union(2, 3)
    uf.union(1, 2)
    uf.union(4, 5)
    
    print(f"0-3 connected: {uf.connected(0, 3)}")
    print(f"0-4 connected: {uf.connected(0, 4)}")
    print(f"Size of set with 0: {uf.get_size(0)}")
    print(f"Number of sets: {uf.get_num_sets()}")
    
    # Test cycle detection
    edges = [(0, 1), (1, 2), (2, 0)]
    print(f"Has cycle: {has_cycle(edges, 3)}")
    
    # Test number of components
    print(f"Components: {count_components(5, [(0, 1), (1, 2), (3, 4)])}")
    
    # Test number of islands
    grid = [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
    ]
    print(f"Number of islands: {num_islands(grid)}")`,
    },
  ],
  types: [
    {
      name: 'Quick Find',
      description: 'Find is O(1), Union is O(n). Simple but slow for many unions.',
    },
    {
      name: 'Quick Union',
      description: 'Union is O(tree height), can degrade to O(n) without optimizations.',
    },
    {
      name: 'Weighted Quick Union',
      description: 'Union by size/rank keeps trees balanced. O(log n) per operation.',
    },
    {
      name: 'Path Compression',
      description: 'Flatten tree during find. Combined with rank: O(α(n)) amortized.',
    },
  ],
  operations: [
    {
      name: 'Find',
      description: 'Find the root/representative of set containing x',
      timeComplexity: 'O(α(n)) amortized',
    },
    {
      name: 'Union',
      description: 'Merge sets containing x and y',
      timeComplexity: 'O(α(n)) amortized',
    },
    {
      name: 'Connected',
      description: 'Check if x and y are in same set',
      timeComplexity: 'O(α(n)) amortized',
    },
    {
      name: 'Count Sets',
      description: 'Count number of disjoint sets',
      timeComplexity: 'O(n) or O(1) with counter',
    },
  ],
  advantages: [
    'Near O(1) time for find and union with optimizations',
    'Simple to implement and understand',
    'Very efficient for dynamic connectivity',
    'Space efficient - O(n) for n elements',
    'Essential for Kruskal\'s MST algorithm',
  ],
  disadvantages: [
    'Cannot efficiently split sets (only merge)',
    'No ordering within sets',
    'Amortized complexity may not suit real-time systems',
    'Path compression modifies structure on reads',
  ],
  applications: [
    'Kruskal\'s Minimum Spanning Tree',
    'Cycle detection in undirected graphs',
    'Connected components in dynamic graphs',
    'Image processing (connected regions)',
    'Network connectivity',
    'Percolation problems',
    'LeetCode: Number of Islands, Accounts Merge',
  ],
};
