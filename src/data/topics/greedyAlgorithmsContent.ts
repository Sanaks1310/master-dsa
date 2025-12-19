import { TopicContent } from '../topicContents';

export const greedyAlgorithmsContent: TopicContent = {
  id: 'greedy-algorithms',
  definition: 'Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum. Like choosing the largest bill first when making change, greedy algorithms pick the best immediate option without considering future consequences. They work when local optimal choices lead to global optimal solution.',
  keyPoints: [
    'Makes the best choice at each step (locally optimal)',
    'Never reconsiders previous choices (no backtracking)',
    'Does not guarantee optimal solution for all problems',
    'Works when problem has "greedy choice property" and "optimal substructure"',
    'Usually simpler and faster than dynamic programming',
    'Classic examples: Dijkstra, Huffman Coding, Activity Selection',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Greedy Algorithms in C
#include <stdio.h>
#include <stdlib.h>

// Activity Selection Problem
// Select maximum non-overlapping activities
typedef struct {
    int start, end;
} Activity;

int compare(const void* a, const void* b) {
    return ((Activity*)a)->end - ((Activity*)b)->end;
}

int activitySelection(Activity activities[], int n) {
    // Sort by end time (greedy choice)
    qsort(activities, n, sizeof(Activity), compare);
    
    int count = 1;
    int lastEnd = activities[0].end;
    
    printf("Selected: Activity 0 (%d-%d)\\n", 
           activities[0].start, activities[0].end);
    
    for (int i = 1; i < n; i++) {
        // Greedy: select if it doesn't overlap
        if (activities[i].start >= lastEnd) {
            count++;
            lastEnd = activities[i].end;
            printf("Selected: Activity %d (%d-%d)\\n",
                   i, activities[i].start, activities[i].end);
        }
    }
    return count;
}

// Coin Change (Greedy - works for standard denominations)
void coinChange(int coins[], int n, int amount) {
    printf("Making change for %d:\\n", amount);
    
    for (int i = n - 1; i >= 0 && amount > 0; i--) {
        while (amount >= coins[i]) {
            printf("  Coin: %d\\n", coins[i]);
            amount -= coins[i];
        }
    }
}

// Fractional Knapsack
typedef struct {
    int weight, value;
    double ratio;
} Item;

int compareItems(const void* a, const void* b) {
    double diff = ((Item*)b)->ratio - ((Item*)a)->ratio;
    return (diff > 0) - (diff < 0);
}

double fractionalKnapsack(Item items[], int n, int capacity) {
    // Calculate value/weight ratio
    for (int i = 0; i < n; i++)
        items[i].ratio = (double)items[i].value / items[i].weight;
    
    // Sort by ratio (greedy choice)
    qsort(items, n, sizeof(Item), compareItems);
    
    double totalValue = 0;
    
    for (int i = 0; i < n && capacity > 0; i++) {
        if (items[i].weight <= capacity) {
            // Take whole item
            totalValue += items[i].value;
            capacity -= items[i].weight;
        } else {
            // Take fraction
            totalValue += items[i].ratio * capacity;
            capacity = 0;
        }
    }
    return totalValue;
}

int main() {
    Activity activities[] = {{1,4}, {3,5}, {0,6}, {5,7}, {3,9}, {5,9}, {6,10}};
    int n = sizeof(activities) / sizeof(activities[0]);
    printf("Max activities: %d\\n\\n", activitySelection(activities, n));
    
    int coins[] = {1, 5, 10, 25};
    coinChange(coins, 4, 41);
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Greedy Algorithms in C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

// Activity Selection using sorting
int activitySelection(vector<pair<int,int>>& activities) {
    // Sort by end time
    sort(activities.begin(), activities.end(),
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 1;
    int lastEnd = activities[0].second;
    
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}

// Huffman Coding
struct HuffmanNode {
    char ch;
    int freq;
    HuffmanNode *left, *right;
    
    HuffmanNode(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

struct Compare {
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->freq > b->freq;
    }
};

void printCodes(HuffmanNode* root, string code) {
    if (!root) return;
    
    if (!root->left && !root->right) {
        cout << root->ch << ": " << code << endl;
    }
    
    printCodes(root->left, code + "0");
    printCodes(root->right, code + "1");
}

void huffmanCoding(string text) {
    // Count frequencies
    vector<int> freq(256, 0);
    for (char c : text) freq[c]++;
    
    // Create min heap
    priority_queue<HuffmanNode*, vector<HuffmanNode*>, Compare> pq;
    
    for (int i = 0; i < 256; i++) {
        if (freq[i] > 0) {
            pq.push(new HuffmanNode(i, freq[i]));
        }
    }
    
    // Build Huffman tree
    while (pq.size() > 1) {
        HuffmanNode* left = pq.top(); pq.pop();
        HuffmanNode* right = pq.top(); pq.pop();
        
        HuffmanNode* parent = new HuffmanNode('\\0', left->freq + right->freq);
        parent->left = left;
        parent->right = right;
        pq.push(parent);
    }
    
    cout << "Huffman Codes:" << endl;
    printCodes(pq.top(), "");
}

// Job Sequencing with Deadlines
int jobSequencing(vector<pair<int,int>>& jobs, int maxDeadline) {
    // Sort by profit (descending)
    sort(jobs.begin(), jobs.end(),
         [](auto& a, auto& b) { return a.second > b.second; });
    
    vector<bool> slots(maxDeadline + 1, false);
    int totalProfit = 0;
    
    for (auto& job : jobs) {
        // Find latest available slot before deadline
        for (int j = job.first; j > 0; j--) {
            if (!slots[j]) {
                slots[j] = true;
                totalProfit += job.second;
                break;
            }
        }
    }
    return totalProfit;
}

int main() {
    vector<pair<int,int>> activities = {{1,4}, {3,5}, {0,6}, {5,7}};
    cout << "Max activities: " << activitySelection(activities) << endl;
    
    huffmanCoding("aaaaabbbbbbbbbccccccccccccdddddddddddddeeeeeeeeeeeeeeeeefffffff");
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Greedy Algorithms in Java
import java.util.*;

public class GreedyAlgorithms {
    
    // Activity Selection Problem
    public static int activitySelection(int[][] activities) {
        // Sort by end time
        Arrays.sort(activities, (a, b) -> a[1] - b[1]);
        
        int count = 1;
        int lastEnd = activities[0][1];
        
        for (int i = 1; i < activities.length; i++) {
            if (activities[i][0] >= lastEnd) {
                count++;
                lastEnd = activities[i][1];
            }
        }
        return count;
    }
    
    // Fractional Knapsack
    public static double fractionalKnapsack(int[][] items, int capacity) {
        // items[i] = {weight, value}
        // Sort by value/weight ratio
        Arrays.sort(items, (a, b) -> 
            Double.compare((double)b[1]/b[0], (double)a[1]/a[0]));
        
        double totalValue = 0;
        
        for (int[] item : items) {
            if (capacity >= item[0]) {
                totalValue += item[1];
                capacity -= item[0];
            } else {
                totalValue += (double)item[1] / item[0] * capacity;
                break;
            }
        }
        return totalValue;
    }
    
    // Minimum Platforms needed for trains
    public static int minPlatforms(int[] arrivals, int[] departures) {
        Arrays.sort(arrivals);
        Arrays.sort(departures);
        
        int platforms = 0, maxPlatforms = 0;
        int i = 0, j = 0;
        int n = arrivals.length;
        
        while (i < n && j < n) {
            if (arrivals[i] <= departures[j]) {
                platforms++;
                maxPlatforms = Math.max(maxPlatforms, platforms);
                i++;
            } else {
                platforms--;
                j++;
            }
        }
        return maxPlatforms;
    }
    
    // Huffman Coding
    static class HuffmanNode implements Comparable<HuffmanNode> {
        char ch;
        int freq;
        HuffmanNode left, right;
        
        HuffmanNode(char ch, int freq) {
            this.ch = ch;
            this.freq = freq;
        }
        
        public int compareTo(HuffmanNode other) {
            return this.freq - other.freq;
        }
    }
    
    public static void huffmanCoding(String text) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : text.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>();
        for (Map.Entry<Character, Integer> e : freq.entrySet()) {
            pq.offer(new HuffmanNode(e.getKey(), e.getValue()));
        }
        
        while (pq.size() > 1) {
            HuffmanNode left = pq.poll();
            HuffmanNode right = pq.poll();
            HuffmanNode parent = new HuffmanNode('\\0', left.freq + right.freq);
            parent.left = left;
            parent.right = right;
            pq.offer(parent);
        }
        
        printCodes(pq.poll(), "");
    }
    
    private static void printCodes(HuffmanNode root, String code) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            System.out.println(root.ch + ": " + code);
        }
        printCodes(root.left, code + "0");
        printCodes(root.right, code + "1");
    }
    
    public static void main(String[] args) {
        int[][] activities = {{1,4}, {3,5}, {0,6}, {5,7}};
        System.out.println("Max activities: " + activitySelection(activities));
        
        int[][] items = {{10, 60}, {20, 100}, {30, 120}};
        System.out.println("Max value: " + fractionalKnapsack(items, 50));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Greedy Algorithms in JavaScript

// Activity Selection Problem
function activitySelection(activities) {
    // Sort by end time (greedy choice)
    activities.sort((a, b) => a.end - b.end);
    
    const selected = [activities[0]];
    let lastEnd = activities[0].end;
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i].end;
        }
    }
    
    return selected;
}

// Fractional Knapsack
function fractionalKnapsack(items, capacity) {
    // Calculate and sort by value/weight ratio
    items.forEach(item => {
        item.ratio = item.value / item.weight;
    });
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0;
    
    for (const item of items) {
        if (capacity >= item.weight) {
            totalValue += item.value;
            capacity -= item.weight;
        } else {
            totalValue += item.ratio * capacity;
            break;
        }
    }
    
    return totalValue;
}

// Coin Change (Greedy - for standard denominations)
function coinChangeGreedy(coins, amount) {
    coins.sort((a, b) => b - a); // Sort descending
    const result = [];
    
    for (const coin of coins) {
        while (amount >= coin) {
            result.push(coin);
            amount -= coin;
        }
    }
    
    return amount === 0 ? result : null; // null if not possible
}

// Job Sequencing with Deadlines
function jobSequencing(jobs, maxDeadline) {
    // Sort by profit (descending)
    jobs.sort((a, b) => b.profit - a.profit);
    
    const slots = new Array(maxDeadline + 1).fill(false);
    let totalProfit = 0;
    const scheduled = [];
    
    for (const job of jobs) {
        // Find latest slot before deadline
        for (let j = job.deadline; j > 0; j--) {
            if (!slots[j]) {
                slots[j] = true;
                totalProfit += job.profit;
                scheduled.push(job);
                break;
            }
        }
    }
    
    return { profit: totalProfit, jobs: scheduled };
}

// Minimum number of coins (Greedy approach)
function minCoins(coins, amount) {
    coins.sort((a, b) => b - a);
    let count = 0;
    
    for (const coin of coins) {
        if (amount >= coin) {
            count += Math.floor(amount / coin);
            amount %= coin;
        }
    }
    
    return amount === 0 ? count : -1;
}

// Example usage
const activities = [
    { start: 1, end: 4 },
    { start: 3, end: 5 },
    { start: 0, end: 6 },
    { start: 5, end: 7 },
    { start: 3, end: 9 },
    { start: 5, end: 9 }
];
console.log("Selected activities:", activitySelection(activities));

const items = [
    { weight: 10, value: 60 },
    { weight: 20, value: 100 },
    { weight: 30, value: 120 }
];
console.log("Max value:", fractionalKnapsack(items, 50));

console.log("Coins for 41:", coinChangeGreedy([1, 5, 10, 25], 41));`,
    },
    {
      language: 'Python',
      code: `# Greedy Algorithms in Python
import heapq
from collections import Counter

def activity_selection(activities):
    """Select maximum non-overlapping activities"""
    # Sort by end time (greedy choice)
    activities.sort(key=lambda x: x[1])
    
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for start, end in activities[1:]:
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    
    return selected


def fractional_knapsack(items, capacity):
    """Fractional Knapsack - can take fractions of items"""
    # items = [(weight, value), ...]
    # Sort by value/weight ratio
    items = sorted(items, key=lambda x: x[1]/x[0], reverse=True)
    
    total_value = 0
    
    for weight, value in items:
        if capacity >= weight:
            total_value += value
            capacity -= weight
        else:
            total_value += (value / weight) * capacity
            break
    
    return total_value


def huffman_coding(text):
    """Build Huffman tree and return codes"""
    if not text:
        return {}
    
    # Count frequencies
    freq = Counter(text)
    
    # Create min heap: (frequency, id, node)
    heap = [[f, i, [char, ""]] for i, (char, f) in enumerate(freq.items())]
    heapq.heapify(heap)
    
    counter = len(heap)
    
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        
        # Add '0' to left codes, '1' to right codes
        for pair in lo[2:]:
            pair[1] = '0' + pair[1]
        for pair in hi[2:]:
            pair[1] = '1' + pair[1]
        
        counter += 1
        heapq.heappush(heap, [lo[0] + hi[0], counter] + lo[2:] + hi[2:])
    
    return {char: code for char, code in heap[0][2:]}


def job_sequencing(jobs, max_deadline):
    """Schedule jobs to maximize profit"""
    # jobs = [(job_id, deadline, profit), ...]
    # Sort by profit (descending)
    jobs = sorted(jobs, key=lambda x: x[2], reverse=True)
    
    slots = [False] * (max_deadline + 1)
    total_profit = 0
    scheduled = []
    
    for job_id, deadline, profit in jobs:
        # Find latest slot before deadline
        for j in range(min(deadline, max_deadline), 0, -1):
            if not slots[j]:
                slots[j] = True
                total_profit += profit
                scheduled.append((job_id, j))
                break
    
    return total_profit, scheduled


def minimum_platforms(arrivals, departures):
    """Minimum platforms needed at railway station"""
    arrivals.sort()
    departures.sort()
    
    platforms = 0
    max_platforms = 0
    i = j = 0
    n = len(arrivals)
    
    while i < n and j < n:
        if arrivals[i] <= departures[j]:
            platforms += 1
            max_platforms = max(max_platforms, platforms)
            i += 1
        else:
            platforms -= 1
            j += 1
    
    return max_platforms


# Example usage
activities = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9)]
print(f"Selected activities: {activity_selection(activities)}")

items = [(10, 60), (20, 100), (30, 120)]  # (weight, value)
print(f"Max knapsack value: {fractional_knapsack(items, 50)}")

text = "aaaaabbbbbbbbbccccccccccccddddddddddddd"
codes = huffman_coding(text)
print(f"Huffman codes: {codes}")

jobs = [('a', 2, 100), ('b', 1, 19), ('c', 2, 27), ('d', 1, 25), ('e', 3, 15)]
profit, scheduled = job_sequencing(jobs, 3)
print(f"Max profit: {profit}, Scheduled: {scheduled}")`,
    },
  ],
  types: [
    {
      name: 'Activity Selection',
      description: 'Select maximum non-overlapping activities by choosing earliest finish time',
    },
    {
      name: 'Fractional Knapsack',
      description: 'Maximize value by selecting items with best value/weight ratio',
    },
    {
      name: 'Huffman Coding',
      description: 'Build optimal prefix-free codes by merging lowest frequency nodes',
    },
    {
      name: "Dijkstra's Algorithm",
      description: 'Find shortest paths by always expanding the nearest unvisited vertex',
    },
    {
      name: "Prim's/Kruskal's MST",
      description: 'Build minimum spanning tree by selecting smallest weight edges',
    },
  ],
  operations: [
    {
      name: 'Activity Selection',
      description: 'Select max non-overlapping activities',
      timeComplexity: 'O(n log n)',
    },
    {
      name: 'Fractional Knapsack',
      description: 'Maximize value with weight constraint',
      timeComplexity: 'O(n log n)',
    },
    {
      name: 'Huffman Coding',
      description: 'Build optimal encoding tree',
      timeComplexity: 'O(n log n)',
    },
    {
      name: "Dijkstra's Algorithm",
      description: 'Shortest path from source',
      timeComplexity: 'O((V+E) log V)',
    },
    {
      name: 'Coin Change (Greedy)',
      description: 'Minimum coins for amount',
      timeComplexity: 'O(n)',
    },
  ],
  advantages: [
    'Simple to understand and implement',
    'Usually very efficient - often O(n log n) or O(n)',
    'Works well when greedy choice leads to optimal solution',
    'Low memory overhead compared to DP',
    'Good for real-time systems needing quick decisions',
  ],
  disadvantages: [
    'Does not always produce optimal solution',
    'Proving correctness can be difficult',
    'May fail for problems without greedy property',
    'No backtracking - cannot undo bad choices',
    'Finding the right greedy criterion is challenging',
  ],
  applications: [
    'Network routing (Dijkstra)',
    'Data compression (Huffman coding)',
    'Task scheduling',
    'Making change with minimum coins',
    'Minimum spanning trees (Prim, Kruskal)',
    'Load balancing',
  ],
};
