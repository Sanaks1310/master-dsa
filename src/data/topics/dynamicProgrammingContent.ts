import { TopicContent } from '../topicContents';

export const dynamicProgrammingContent: TopicContent = {
  id: 'dynamic-programming',
  definition: 'Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them into overlapping subproblems and storing their solutions to avoid redundant computation. Think of it like taking notes while studying - instead of re-reading the same chapter, you refer to your notes. DP transforms exponential time algorithms into polynomial time.',
  keyPoints: [
    'Optimal Substructure: Optimal solution built from optimal subproblem solutions',
    'Overlapping Subproblems: Same subproblems solved multiple times',
    'Memoization (Top-Down): Cache results of recursive calls',
    'Tabulation (Bottom-Up): Build solution iteratively from base cases',
    'State: What information is needed to solve a subproblem',
    'Transition: How to combine subproblems to solve larger problem',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Dynamic Programming in C
#include <stdio.h>
#include <string.h>

// Fibonacci - Memoization (Top-Down)
long long memo[100];
long long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}

// Fibonacci - Tabulation (Bottom-Up)
long long fibTab(int n) {
    if (n <= 1) return n;
    
    long long dp[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 0/1 Knapsack Problem
int max(int a, int b) { return a > b ? a : b; }

int knapsack(int weights[], int values[], int n, int capacity) {
    int dp[n + 1][capacity + 1];
    
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i - 1] <= w) {
                // Include or exclude current item
                dp[i][w] = max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}

// Longest Common Subsequence
int lcs(char* s1, char* s2, int m, int n) {
    int dp[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

// Coin Change - Minimum coins
int coinChange(int coins[], int n, int amount) {
    int dp[amount + 1];
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        dp[i] = amount + 1; // Initialize with infinity
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) {
                dp[i] = dp[i - coins[j]] + 1;
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    memset(memo, -1, sizeof(memo));
    printf("Fibonacci(40): %lld\\n", fibMemo(40));
    printf("Fibonacci(40): %lld\\n", fibTab(40));
    
    int weights[] = {10, 20, 30};
    int values[] = {60, 100, 120};
    printf("Knapsack max value: %d\\n", knapsack(weights, values, 3, 50));
    
    printf("LCS of ABCDGH and AEDFHR: %d\\n", lcs("ABCDGH", "AEDFHR", 6, 6));
    
    int coins[] = {1, 2, 5};
    printf("Min coins for 11: %d\\n", coinChange(coins, 3, 11));
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Dynamic Programming in C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

// Fibonacci with Memoization
unordered_map<int, long long> memo;
long long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// Fibonacci with Space Optimization
long long fibOptimized(int n) {
    if (n <= 1) return n;
    
    long long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 0/1 Knapsack
int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = max(values[i-1] + dp[i-1][w - weights[i-1]], 
                              dp[i-1][w]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][capacity];
}

// Longest Increasing Subsequence (LIS) - O(n log n)
int lis(vector<int>& nums) {
    vector<int> tail; // tail[i] = smallest ending element of LIS of length i+1
    
    for (int num : nums) {
        auto it = lower_bound(tail.begin(), tail.end(), num);
        if (it == tail.end()) {
            tail.push_back(num);
        } else {
            *it = num;
        }
    }
    return tail.size();
}

// Edit Distance (Levenshtein Distance)
int editDistance(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    // Base cases
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + min({dp[i-1][j],      // Delete
                                   dp[i][j-1],       // Insert
                                   dp[i-1][j-1]});   // Replace
            }
        }
    }
    return dp[m][n];
}

// Matrix Chain Multiplication
int matrixChainMult(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}

int main() {
    cout << "Fibonacci(40): " << fibMemo(40) << endl;
    cout << "Fibonacci(40) optimized: " << fibOptimized(40) << endl;
    
    vector<int> weights = {10, 20, 30};
    vector<int> values = {60, 100, 120};
    cout << "Knapsack max: " << knapsack(weights, values, 50) << endl;
    
    vector<int> nums = {10, 22, 9, 33, 21, 50, 41, 60};
    cout << "LIS length: " << lis(nums) << endl;
    
    string s1 = "sunday", s2 = "saturday";
    cout << "Edit distance: " << editDistance(s1, s2) << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Dynamic Programming in Java
import java.util.*;

public class DynamicProgramming {
    
    // Fibonacci - Memoization
    private static Map<Integer, Long> memo = new HashMap<>();
    
    public static long fibMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        
        long result = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, result);
        return result;
    }
    
    // 0/1 Knapsack
    public static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(
                        values[i-1] + dp[i-1][w - weights[i-1]],
                        dp[i-1][w]
                    );
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        return dp[n][capacity];
    }
    
    // Longest Common Subsequence
    public static int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
    
    // Coin Change - Minimum coins
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // House Robber
    public static int rob(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int prev2 = nums[0];
        int prev1 = Math.max(nums[0], nums[1]);
        
        for (int i = 2; i < nums.length; i++) {
            int curr = Math.max(nums[i] + prev2, prev1);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
    
    // Unique Paths in Grid
    public static int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        
        // First row and column have only 1 way
        for (int i = 0; i < m; i++) dp[i][0] = 1;
        for (int j = 0; j < n; j++) dp[0][j] = 1;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci(40): " + fibMemo(40));
        
        int[] weights = {10, 20, 30};
        int[] values = {60, 100, 120};
        System.out.println("Knapsack: " + knapsack(weights, values, 50));
        
        System.out.println("LCS: " + lcs("ABCDGH", "AEDFHR"));
        
        int[] coins = {1, 2, 5};
        System.out.println("Min coins for 11: " + coinChange(coins, 11));
        
        int[] houses = {2, 7, 9, 3, 1};
        System.out.println("Max rob: " + rob(houses));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Dynamic Programming in JavaScript

// Fibonacci - Memoization (Top-Down)
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Fibonacci - Tabulation (Bottom-Up)
function fibTab(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 0/1 Knapsack Problem
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}

// Longest Common Subsequence
function lcs(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

// Coin Change - Minimum coins
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Climbing Stairs
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// House Robber
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        const curr = Math.max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Example usage
console.log("Fibonacci(40):", fibMemo(40));
console.log("Fibonacci(40):", fibTab(40));

const weights = [10, 20, 30];
const values = [60, 100, 120];
console.log("Knapsack max:", knapsack(weights, values, 50));

console.log("LCS:", lcs("ABCDGH", "AEDFHR"));
console.log("Min coins for 11:", coinChange([1, 2, 5], 11));
console.log("Climbing 5 stairs:", climbStairs(5));
console.log("Max rob:", rob([2, 7, 9, 3, 1]));`,
    },
    {
      language: 'Python',
      code: `# Dynamic Programming in Python
from functools import lru_cache

# Fibonacci - Memoization with decorator
@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)


# Fibonacci - Tabulation
def fib_tab(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]


# Fibonacci - Space Optimized
def fib_optimized(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    
    return prev1


# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                )
            else:
                dp[i][w] = dp[i - 1][w]
    
    return dp[n][capacity]


# Longest Common Subsequence
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]


# Coin Change - Minimum coins
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1


# Longest Increasing Subsequence
def lis(nums):
    if not nums:
        return 0
    
    dp = [1] * len(nums)
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)


# Edit Distance
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # Delete
                    dp[i][j - 1],      # Insert
                    dp[i - 1][j - 1]   # Replace
                )
    
    return dp[m][n]


# Example usage
print(f"Fibonacci(40): {fib_memo(40)}")
print(f"Fibonacci(40) tab: {fib_tab(40)}")

weights = [10, 20, 30]
values = [60, 100, 120]
print(f"Knapsack max: {knapsack(weights, values, 50)}")

print(f"LCS of ABCDGH and AEDFHR: {lcs('ABCDGH', 'AEDFHR')}")
print(f"Min coins for 11: {coin_change([1, 2, 5], 11)}")
print(f"LIS of [10,22,9,33,21,50,41,60]: {lis([10,22,9,33,21,50,41,60])}")
print(f"Edit distance sunday->saturday: {edit_distance('sunday', 'saturday')}")`,
    },
  ],
  types: [
    {
      name: 'Memoization (Top-Down)',
      description: 'Start with main problem, cache results of subproblems recursively',
    },
    {
      name: 'Tabulation (Bottom-Up)',
      description: 'Solve smaller subproblems first, build up to main problem iteratively',
    },
    {
      name: '1D DP',
      description: 'Single parameter state (Fibonacci, Climbing Stairs)',
    },
    {
      name: '2D DP',
      description: 'Two parameter state (Knapsack, LCS, Grid problems)',
    },
    {
      name: 'Interval DP',
      description: 'Problems on ranges (Matrix Chain, Burst Balloons)',
    },
  ],
  operations: [
    {
      name: 'Fibonacci',
      description: 'Calculate nth Fibonacci number',
      timeComplexity: 'O(n)',
    },
    {
      name: '0/1 Knapsack',
      description: 'Maximize value with weight constraint',
      timeComplexity: 'O(n × W)',
    },
    {
      name: 'Longest Common Subsequence',
      description: 'Find longest common subsequence',
      timeComplexity: 'O(m × n)',
    },
    {
      name: 'Coin Change',
      description: 'Minimum coins for amount',
      timeComplexity: 'O(n × amount)',
    },
    {
      name: 'Edit Distance',
      description: 'Minimum operations to transform string',
      timeComplexity: 'O(m × n)',
    },
  ],
  advantages: [
    'Transforms exponential time to polynomial time',
    'Guarantees optimal solution for problems with optimal substructure',
    'Eliminates redundant computation via caching',
    'Can be space-optimized in many cases',
    'Widely applicable to optimization problems',
  ],
  disadvantages: [
    'Can be difficult to identify DP problems',
    'Defining state and transition can be tricky',
    'May require significant space for memoization',
    'Not all problems have optimal substructure',
    'Harder to implement correctly than greedy or brute force',
  ],
  applications: [
    'Text comparison (LCS, Edit Distance)',
    'Resource allocation (Knapsack)',
    'Sequence alignment in bioinformatics',
    'Shortest path algorithms (Floyd-Warshall)',
    'Stock trading optimization',
    'String matching and parsing',
  ],
};
