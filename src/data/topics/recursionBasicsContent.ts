import { TopicContent } from '../topicContents';

export const recursionBasicsContent: TopicContent = {
  id: 'recursion-basics',
  definition: 'Recursion is when a function calls itself to solve a problem by breaking it into smaller, similar subproblems. Every recursive function needs a base case (when to stop) and a recursive case (how to break down the problem). Think of it like Russian nesting dolls - each doll contains a smaller version of itself until you reach the smallest one.',
  keyPoints: [
    'Base Case: The condition that stops recursion (prevents infinite loop)',
    'Recursive Case: The function calls itself with a smaller problem',
    'Call Stack: Each call is stored in memory until resolved',
    'Problems must get smaller with each recursive call',
    'Many problems have elegant recursive solutions',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Example 1: Factorial - n! = n × (n-1)!
int factorial(int n) {
    // Base case: 0! = 1
    if (n <= 1) {
        return 1;
    }
    // Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1);
}
// factorial(5) = 5 × factorial(4)
//              = 5 × 4 × factorial(3)
//              = 5 × 4 × 3 × factorial(2)
//              = 5 × 4 × 3 × 2 × factorial(1)
//              = 5 × 4 × 3 × 2 × 1 = 120

// Example 2: Sum of array
int sumArray(int arr[], int n) {
    // Base case: empty array
    if (n <= 0) {
        return 0;
    }
    // Recursive case: last element + sum of rest
    return arr[n - 1] + sumArray(arr, n - 1);
}

// Example 3: Count digits in a number
int countDigits(int n) {
    // Base case: single digit
    if (n < 10) {
        return 1;
    }
    // Recursive case: 1 + count of remaining digits
    return 1 + countDigits(n / 10);
}

// Example 4: Fibonacci (classic but inefficient)
int fibonacci(int n) {
    // Base cases
    if (n <= 0) return 0;
    if (n == 1) return 1;
    // Recursive case: sum of two previous
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("5! = %d\\n", factorial(5));        // 120
    printf("Digits in 12345: %d\\n", countDigits(12345)); // 5
    printf("Fib(10) = %d\\n", fibonacci(10));  // 55
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Example 1: Power function - x^n
int power(int x, int n) {
    // Base case
    if (n == 0) return 1;
    // Recursive case
    return x * power(x, n - 1);
}
// power(2, 3) = 2 × power(2, 2)
//             = 2 × 2 × power(2, 1)
//             = 2 × 2 × 2 × power(2, 0)
//             = 2 × 2 × 2 × 1 = 8

// Example 2: Reverse a string
string reverseString(string s) {
    // Base case: empty or single char
    if (s.length() <= 1) {
        return s;
    }
    // Recursive case: last char + reverse of rest
    return s.back() + reverseString(s.substr(0, s.length() - 1));
}

// Example 3: Check if palindrome
bool isPalindrome(string s, int start, int end) {
    // Base case: crossed or equal pointers
    if (start >= end) {
        return true;
    }
    // If mismatch, not palindrome
    if (s[start] != s[end]) {
        return false;
    }
    // Check inner substring
    return isPalindrome(s, start + 1, end - 1);
}

// Example 4: Find maximum in array
int findMax(vector<int>& arr, int n) {
    // Base case: single element
    if (n == 1) {
        return arr[0];
    }
    // Recursive case: max of last vs rest
    return max(arr[n - 1], findMax(arr, n - 1));
}

// Example 5: Binary search (recursive)
int binarySearch(vector<int>& arr, int target, int left, int right) {
    // Base case: not found
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    }
    return binarySearch(arr, target, mid + 1, right);
}`,
    },
    {
      language: 'Java',
      code: `public class RecursionBasics {
    
    // Example 1: Sum from 1 to n
    public static int sumTo(int n) {
        // Base case
        if (n <= 0) return 0;
        // Recursive case: n + sum of 1 to (n-1)
        return n + sumTo(n - 1);
    }
    // sumTo(5) = 5 + sumTo(4) = 5 + 4 + 3 + 2 + 1 + 0 = 15
    
    // Example 2: GCD using Euclidean algorithm
    public static int gcd(int a, int b) {
        // Base case: b divides a evenly
        if (b == 0) return a;
        // Recursive case
        return gcd(b, a % b);
    }
    // gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = gcd(6, 0) = 6
    
    // Example 3: Print numbers in reverse
    public static void printReverse(int n) {
        // Base case
        if (n <= 0) return;
        
        System.out.print(n + " ");  // Print first
        printReverse(n - 1);        // Then recurse
    }
    // printReverse(5) prints: 5 4 3 2 1
    
    // Example 4: Print numbers forward (different order)
    public static void printForward(int n) {
        // Base case
        if (n <= 0) return;
        
        printForward(n - 1);        // Recurse first
        System.out.print(n + " ");  // Then print
    }
    // printForward(5) prints: 1 2 3 4 5
    
    // Example 5: Tower of Hanoi
    public static void hanoi(int n, char from, char to, char aux) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + from + " to " + to);
            return;
        }
        hanoi(n - 1, from, aux, to);  // Move n-1 disks to auxiliary
        System.out.println("Move disk " + n + " from " + from + " to " + to);
        hanoi(n - 1, aux, to, from);  // Move n-1 disks to destination
    }
    
    public static void main(String[] args) {
        System.out.println("Sum 1-5: " + sumTo(5));    // 15
        System.out.println("GCD(48,18): " + gcd(48, 18)); // 6
        
        System.out.print("Reverse: ");
        printReverse(5);  // 5 4 3 2 1
        
        System.out.print("\\nForward: ");
        printForward(5);  // 1 2 3 4 5
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Example 1: Countdown
function countdown(n) {
    // Base case
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    console.log(n);
    countdown(n - 1);  // Recursive call
}
// countdown(3) → 3, 2, 1, Done!

// Example 2: Factorial with explanation
function factorial(n) {
    console.log(\`Calculating factorial(\${n})\`);
    
    // Base case
    if (n <= 1) {
        console.log(\`Base case: factorial(1) = 1\`);
        return 1;
    }
    
    // Recursive case
    const result = n * factorial(n - 1);
    console.log(\`factorial(\${n}) = \${n} × factorial(\${n-1}) = \${result}\`);
    return result;
}

// Example 3: Nested array sum (deep recursion)
function deepSum(arr) {
    let total = 0;
    for (const item of arr) {
        if (Array.isArray(item)) {
            total += deepSum(item);  // Recurse into nested array
        } else {
            total += item;
        }
    }
    return total;
}
// deepSum([1, [2, 3], [4, [5, 6]]]) = 21

// Example 4: Object deep clone
function deepClone(obj) {
    // Base case: primitives
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    // Handle objects
    const cloned = {};
    for (const key in obj) {
        cloned[key] = deepClone(obj[key]);  // Recurse
    }
    return cloned;
}

// Example 5: Generate all subsets
function subsets(arr, index = 0, current = []) {
    // Base case: processed all elements
    if (index === arr.length) {
        console.log(current);
        return;
    }
    
    // Don't include current element
    subsets(arr, index + 1, current);
    
    // Include current element
    subsets(arr, index + 1, [...current, arr[index]]);
}
// subsets([1, 2]) → [], [2], [1], [1, 2]`,
    },
    {
      language: 'Python',
      code: `# Example 1: Factorial with tracing
def factorial(n, depth=0):
    indent = "  " * depth
    print(f"{indent}factorial({n})")
    
    # Base case
    if n <= 1:
        print(f"{indent}→ returns 1")
        return 1
    
    # Recursive case
    result = n * factorial(n - 1, depth + 1)
    print(f"{indent}→ returns {n} × ... = {result}")
    return result

# Call: factorial(4)
# Output shows the call stack visually!

# Example 2: List sum
def list_sum(lst):
    # Base case: empty list
    if not lst:
        return 0
    # Recursive case: first + sum of rest
    return lst[0] + list_sum(lst[1:])

# Example 3: Fibonacci with memoization (efficient!)
def fibonacci(n, memo={}):
    # Check memo first
    if n in memo:
        return memo[n]
    
    # Base cases
    if n <= 1:
        return n
    
    # Recursive case with memoization
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

# Example 4: Flatten nested list
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))  # Recurse and extend
        else:
            result.append(item)
    return result

# flatten([1, [2, [3, 4], 5], 6]) → [1, 2, 3, 4, 5, 6]

# Example 5: Directory tree (conceptual)
def print_tree(path, indent=0):
    """
    Recursively print directory structure
    """
    import os
    print("  " * indent + os.path.basename(path))
    
    if os.path.isdir(path):
        for child in os.listdir(path):
            print_tree(os.path.join(path, child), indent + 1)

# Common recursion mistakes to avoid:
# 1. Forgetting base case → infinite recursion
# 2. Base case never reached → infinite recursion
# 3. Not making problem smaller → infinite recursion
# 4. Stack overflow for deep recursion (Python limit ~1000)`,
    },
  ],
  types: [
    { name: 'Direct Recursion', description: 'Function calls itself directly. Most common type.' },
    { name: 'Indirect Recursion', description: 'Function A calls B, which calls A. Forms a cycle.' },
    { name: 'Tail Recursion', description: 'Recursive call is the last operation. Can be optimized.' },
    { name: 'Head Recursion', description: 'Recursive call happens before other processing.' },
    { name: 'Tree Recursion', description: 'Function makes multiple recursive calls. Like fibonacci.' },
  ],
  operations: [
    { name: 'Factorial', description: 'Calculate n! = n × (n-1)!', timeComplexity: 'O(n)' },
    { name: 'Fibonacci', description: 'Calculate nth Fibonacci number', timeComplexity: 'O(2ⁿ) naive, O(n) memo' },
    { name: 'Binary Search', description: 'Search in sorted array', timeComplexity: 'O(log n)' },
    { name: 'Tree Traversal', description: 'Visit all nodes in tree', timeComplexity: 'O(n)' },
    { name: 'Merge Sort', description: 'Divide and conquer sort', timeComplexity: 'O(n log n)' },
  ],
  advantages: [
    'Elegant solutions for naturally recursive problems',
    'Cleaner code for divide-and-conquer algorithms',
    'Natural fit for tree and graph traversal',
    'Easier to prove correctness mathematically',
    'Simplifies complex problems into smaller pieces',
  ],
  disadvantages: [
    'Uses stack memory for each call (can overflow)',
    'Can be slower due to function call overhead',
    'May recalculate same values (without memoization)',
    'Harder to debug and trace',
    'Not all languages optimize tail recursion',
  ],
  applications: [
    'Tree and graph algorithms (traversal, search)',
    'Divide and conquer algorithms (merge sort, quick sort)',
    'Mathematical computations (factorial, fibonacci)',
    'Parsing nested structures (JSON, XML, expressions)',
    'Backtracking problems (sudoku, N-queens)',
  ],
};
