import { TopicContent } from '../topicContents';

export const bigOContent: TopicContent = {
  id: 'big-o-notation',
  definition: 'Big-O notation describes the upper bound of an algorithm\'s growth rate - the worst-case scenario. Big-Ω (Omega) describes the lower bound - the best case. Big-Θ (Theta) describes tight bounds - when best and worst are the same. Think of Big-O as "this algorithm will never be slower than this," like a speed limit for code.',
  keyPoints: [
    'Big-O (O): Upper bound - worst case guarantee',
    'Big-Omega (Ω): Lower bound - best case minimum',
    'Big-Theta (Θ): Tight bound - exact growth rate',
    'We drop constants and lower-order terms',
    'Focus on behavior as input approaches infinity',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Big-O Examples with Analysis

// O(1) - Constant: Operations don't depend on n
int getElement(int arr[], int index) {
    return arr[index];  // Always 1 operation
}

// O(n) - Linear: Operations grow linearly with n
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {    // At most n iterations
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
// Best case Ω(1): found at first position
// Worst case O(n): found at last or not found
// Average: O(n/2) = O(n)

// O(n²) - Quadratic: Nested loops
void printPairs(int arr[], int n) {
    for (int i = 0; i < n; i++) {        // n times
        for (int j = 0; j < n; j++) {    // n times each
            printf("(%d, %d) ", arr[i], arr[j]);
        }
    }
}
// Total: n × n = n²

// O(log n) - Logarithmic: Halving each step
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// Each iteration halves search space
// log₂(n) iterations maximum`,
    },
    {
      language: 'C++',
      code: `#include <vector>
#include <algorithm>
using namespace std;

// Dropping Constants: O(2n) → O(n)
int countPositiveNegative(vector<int>& arr) {
    int positive = 0, negative = 0;
    
    // First loop: n operations
    for (int num : arr) {
        if (num > 0) positive++;
    }
    
    // Second loop: n operations
    for (int num : arr) {
        if (num < 0) negative++;
    }
    
    return positive + negative;
}
// Total: 2n → O(n) (drop constant)

// Dropping Lower Terms: O(n² + n) → O(n²)
void complexFunction(vector<int>& arr) {
    int n = arr.size();
    
    // Part 1: O(n²)
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            // some operation
        }
    }
    
    // Part 2: O(n)
    for (int i = 0; i < n; i++) {
        // some operation
    }
}
// Total: n² + n → O(n²) (drop lower term)

// Big-Theta Example: Θ(n)
// When best, worst, and average are all the same
int sumAll(vector<int>& arr) {
    int sum = 0;
    for (int num : arr) {  // Always exactly n iterations
        sum += num;
    }
    return sum;
}
// Best = Worst = Average = Θ(n)`,
    },
    {
      language: 'Java',
      code: `public class BigONotation {
    
    // Comparing Growth Rates
    // n=1000: O(1)=1, O(log n)=10, O(n)=1000, O(n²)=1,000,000
    
    // O(1) - Constant Time
    public static int constantTime(int[] arr) {
        return arr[0] + arr[arr.length - 1];  // 2 operations = O(1)
    }
    
    // O(log n) - Logarithmic
    public static int countHalves(int n) {
        int count = 0;
        while (n > 1) {
            n = n / 2;  // Halving each time
            count++;
        }
        return count;  // Returns approximately log₂(n)
    }
    
    // O(n log n) - Linearithmic (common in efficient sorts)
    public static void efficientSort(int[] arr) {
        java.util.Arrays.sort(arr);  // Uses Timsort: O(n log n)
    }
    
    // O(2ⁿ) - Exponential (very slow!)
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    // fib(5) calls fib(4) and fib(3)
    // fib(4) calls fib(3) and fib(2)
    // ... doubles with each level
    
    // Big-Omega Example: Ω(1) best case
    public static int findFirst(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;  // Best: found immediately
        }
        return -1;  // Worst: O(n)
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Visual Comparison of Growth Rates
// For n = 10:
// O(1)      → 1 operation
// O(log n)  → ~3 operations
// O(n)      → 10 operations
// O(n log n)→ ~30 operations
// O(n²)     → 100 operations
// O(2ⁿ)     → 1024 operations

// O(1) - Hash table lookup
function hashLookup(map, key) {
    return map[key];  // Direct access, always O(1)
}

// O(log n) - Binary search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    let steps = 0;
    
    while (left <= right) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            console.log(\`Found in \${steps} steps\`);
            return mid;
        }
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Why we drop constants
function example(arr) {
    // 3n + 5 operations
    let sum = 0;              // 1 operation
    for (let x of arr) {      // n iterations
        sum += x;             // n operations
        sum *= 2;             // n operations
    }
    sum += 10;                // 1 operation
    sum -= 5;                 // 1 operation
    sum *= 3;                 // 1 operation
    sum /= 2;                 // 1 operation
    return sum;
}
// 3n + 5 → O(n) because constants don't matter at scale`,
    },
    {
      language: 'Python',
      code: `import time

# Demonstrating Growth Rates
def measure_time(func, n):
    """Measure execution time"""
    start = time.time()
    func(n)
    return time.time() - start

# O(1) - Constant
def constant_time(n):
    return n * 2  # Same time regardless of n

# O(log n) - Logarithmic  
def log_time(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count

# O(n) - Linear
def linear_time(n):
    total = 0
    for i in range(n):
        total += i
    return total

# O(n²) - Quadratic
def quadratic_time(n):
    total = 0
    for i in range(n):
        for j in range(n):
            total += 1
    return total

# Practical comparison
"""
n = 1,000,000:
- O(1):      ~0.000001 seconds
- O(log n):  ~0.00002 seconds (20 operations)
- O(n):      ~0.1 seconds
- O(n²):     ~11.5 days! (not practical)
"""

# Real-world Big-O
# List operations:
# - append(): O(1) amortized
# - insert(0, x): O(n)
# - x in list: O(n)
# - list[i]: O(1)

# Dict operations (hash table):
# - dict[key]: O(1) average
# - key in dict: O(1) average
# - dict[key] = value: O(1) average`,
    },
  ],
  types: [
    { name: 'Big-O (O)', description: 'Upper bound. "At most this many operations." Used for worst-case analysis.' },
    { name: 'Big-Omega (Ω)', description: 'Lower bound. "At least this many operations." Used for best-case analysis.' },
    { name: 'Big-Theta (Θ)', description: 'Tight bound. "Exactly this growth rate." When O and Ω are the same.' },
    { name: 'Little-o (o)', description: 'Strict upper bound. Growth rate is strictly less than.' },
    { name: 'Little-omega (ω)', description: 'Strict lower bound. Growth rate is strictly greater than.' },
  ],
  operations: [
    { name: 'O(1)', description: 'Array access, hash lookup', timeComplexity: 'Constant' },
    { name: 'O(log n)', description: 'Binary search, balanced BST operations', timeComplexity: 'Logarithmic' },
    { name: 'O(n)', description: 'Linear search, single loop', timeComplexity: 'Linear' },
    { name: 'O(n log n)', description: 'Merge sort, heap sort, quick sort (avg)', timeComplexity: 'Linearithmic' },
    { name: 'O(n²)', description: 'Bubble sort, nested loops', timeComplexity: 'Quadratic' },
    { name: 'O(2ⁿ)', description: 'Recursive fibonacci, power set', timeComplexity: 'Exponential' },
  ],
  advantages: [
    'Universal language for describing efficiency',
    'Focuses on scalability, ignoring hardware differences',
    'Simplifies comparison between algorithms',
    'Helps predict performance for large inputs',
    'Essential knowledge for technical interviews',
  ],
  disadvantages: [
    'Ignores constant factors important for small inputs',
    'Does not reflect actual runtime on specific hardware',
    'Can be misleading for small datasets',
    'Multiple algorithms with same Big-O may perform differently',
    'Does not account for cache efficiency or memory patterns',
  ],
  applications: [
    'Algorithm selection for scalable systems',
    'Database query optimization',
    'Performance requirement specifications',
    'Technical interview problem solving',
    'System design and architecture decisions',
  ],
};
