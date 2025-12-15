import { TopicContent } from '../topicContents';

export const iterationVsRecursionContent: TopicContent = {
  id: 'iteration-vs-recursion',
  definition: 'Iteration uses loops (for, while) to repeat operations, while recursion uses function calls to itself. Both can solve the same problems, but each has strengths. Iteration is like climbing stairs one step at a time; recursion is like describing the climb as "take one step, then climb the remaining stairs."',
  keyPoints: [
    'Every recursive solution can be converted to iterative (and vice versa)',
    'Iteration uses loop variables; recursion uses call stack',
    'Recursion is often more elegant but uses more memory',
    'Iteration is usually faster due to no function call overhead',
    'Choose based on problem nature and constraints',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// ========== FACTORIAL ==========
// Iterative approach
int factorialIterative(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive approach
int factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

// ========== FIBONACCI ==========
// Iterative - O(n) time, O(1) space
int fibIterative(int n) {
    if (n <= 1) return n;
    int prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

// Recursive - O(2^n) time, O(n) space (BAD!)
int fibRecursive(int n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// ========== SUM OF ARRAY ==========
// Iterative
int sumIterative(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return sum;
}

// Recursive
int sumRecursive(int arr[], int n) {
    if (n <= 0) return 0;
    return arr[n-1] + sumRecursive(arr, n-1);
}

int main() {
    printf("Factorial(5) Iterative: %d\\n", factorialIterative(5));
    printf("Factorial(5) Recursive: %d\\n", factorialRecursive(5));
    printf("Fib(10) Iterative: %d\\n", fibIterative(10));
    printf("Fib(10) Recursive: %d\\n", fibRecursive(10));
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// ========== REVERSE STRING ==========
// Iterative
string reverseIterative(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    return s;
}

// Recursive
string reverseRecursive(string s) {
    if (s.length() <= 1) return s;
    return s.back() + reverseRecursive(s.substr(0, s.length() - 1));
}

// ========== BINARY SEARCH ==========
// Iterative - Preferred in practice
int binarySearchIterative(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Recursive
int binarySearchRecursive(vector<int>& arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
}

// ========== TREE TRAVERSAL ==========
// Recursive is natural for trees
struct TreeNode {
    int val;
    TreeNode *left, *right;
};

void inorderRecursive(TreeNode* root) {
    if (!root) return;
    inorderRecursive(root->left);
    cout << root->val << " ";
    inorderRecursive(root->right);
}

// Iterative uses explicit stack
void inorderIterative(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) {
            st.push(curr);
            curr = curr->left;
        }
        curr = st.top(); st.pop();
        cout << curr->val << " ";
        curr = curr->right;
    }
}`,
    },
    {
      language: 'Java',
      code: `import java.util.*;

public class IterationVsRecursion {
    
    // ========== POWER FUNCTION ==========
    // Iterative - O(n)
    public static long powerIterative(int base, int exp) {
        long result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
        }
        return result;
    }
    
    // Recursive - O(n)
    public static long powerRecursive(int base, int exp) {
        if (exp == 0) return 1;
        return base * powerRecursive(base, exp - 1);
    }
    
    // Optimized Recursive - O(log n) using divide & conquer
    public static long powerOptimized(int base, int exp) {
        if (exp == 0) return 1;
        long half = powerOptimized(base, exp / 2);
        if (exp % 2 == 0) {
            return half * half;
        }
        return base * half * half;
    }
    
    // ========== GCD ==========
    // Iterative
    public static int gcdIterative(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    // Recursive (more elegant)
    public static int gcdRecursive(int a, int b) {
        if (b == 0) return a;
        return gcdRecursive(b, a % b);
    }
    
    // ========== LINKED LIST REVERSAL ==========
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    
    // Iterative - Preferred
    public static ListNode reverseIterative(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
    
    // Recursive
    public static ListNode reverseRecursive(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// ========== COMPARISON TABLE ==========
/*
Aspect          | Iteration           | Recursion
----------------|--------------------|-----------------
Memory          | O(1) typically      | O(n) stack space
Speed           | Faster (no overhead)| Slower (calls)
Code length     | Usually longer      | Often shorter
Readability     | Explicit logic      | Natural for some
Debug           | Easier to trace     | Harder to trace
Best for        | Simple repetition   | Tree/graph/divide
*/

// ========== COUNTDOWN ==========
// Iterative
function countdownIterative(n) {
    for (let i = n; i > 0; i--) {
        console.log(i);
    }
    console.log("Done!");
}

// Recursive
function countdownRecursive(n) {
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    console.log(n);
    countdownRecursive(n - 1);
}

// ========== FLATTEN ARRAY ==========
// Iterative (using stack)
function flattenIterative(arr) {
    const stack = [...arr];
    const result = [];
    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item);
        } else {
            result.unshift(item);
        }
    }
    return result;
}

// Recursive (more elegant)
function flattenRecursive(arr) {
    return arr.reduce((flat, item) => {
        return flat.concat(
            Array.isArray(item) ? flattenRecursive(item) : item
        );
    }, []);
}

// ========== FACTORIAL COMPARISON ==========
// Iterative - Clear winner for this problem
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;  // O(n) time, O(1) space
}

// Recursive - More elegant but uses stack
function factorialRecursive(n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);  // O(n) time, O(n) space
}

// Tail recursive (can be optimized by some engines)
function factorialTailRecursive(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTailRecursive(n - 1, n * acc);
}`,
    },
    {
      language: 'Python',
      code: `import sys
sys.setrecursionlimit(10000)  # Default is ~1000

# ========== DECISION GUIDE ==========
"""
Use ITERATION when:
- Simple counting or accumulation
- Performance is critical
- Deep recursion would overflow stack
- Problem is naturally iterative (array processing)

Use RECURSION when:
- Problem has recursive structure (trees, graphs)
- Code clarity is more important than performance
- Using divide-and-conquer approach
- Backtracking problems (sudoku, N-queens)
"""

# ========== SUM OF DIGITS ==========
# Iterative
def sum_digits_iterative(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

# Recursive
def sum_digits_recursive(n):
    if n < 10:
        return n
    return n % 10 + sum_digits_recursive(n // 10)

# ========== MERGE SORT ==========
# This is where recursion SHINES!
def merge_sort(arr):
    # Base case
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# ========== PERFORMANCE TEST ==========
import time

def performance_test():
    n = 30
    
    # Recursive fibonacci (slow)
    def fib_recursive(n):
        if n <= 1: return n
        return fib_recursive(n-1) + fib_recursive(n-2)
    
    # Iterative fibonacci (fast)
    def fib_iterative(n):
        if n <= 1: return n
        a, b = 0, 1
        for _ in range(n - 1):
            a, b = b, a + b
        return b
    
    start = time.time()
    fib_iterative(n)
    print(f"Iterative: {time.time() - start:.6f}s")
    
    start = time.time()
    fib_recursive(n)
    print(f"Recursive: {time.time() - start:.6f}s")
    # Recursive is MUCH slower for fibonacci!

# Conclusion: Know both, choose wisely!`,
    },
  ],
  types: [
    { name: 'For Loop', description: 'Iteration with counter. Best when number of iterations is known.' },
    { name: 'While Loop', description: 'Iteration with condition. Best when termination condition is complex.' },
    { name: 'Direct Recursion', description: 'Function calls itself. Natural for recursive structures.' },
    { name: 'Tail Recursion', description: 'Last operation is recursive call. Can be optimized to iteration.' },
  ],
  operations: [
    { name: 'Factorial', description: 'Calculate n!', timeComplexity: 'Both O(n), iteration uses O(1) space' },
    { name: 'Fibonacci', description: 'Calculate nth Fib', timeComplexity: 'Iteration O(n), naive recursion O(2ⁿ)' },
    { name: 'Tree Traversal', description: 'Visit all nodes', timeComplexity: 'Both O(n), recursion more natural' },
    { name: 'Binary Search', description: 'Search sorted array', timeComplexity: 'Both O(log n)' },
    { name: 'Array Sum', description: 'Sum all elements', timeComplexity: 'Both O(n), iteration preferred' },
  ],
  advantages: [
    'Iteration: Lower memory usage, no stack overflow risk',
    'Iteration: Faster execution, no function call overhead',
    'Recursion: Cleaner code for recursive problems',
    'Recursion: Natural fit for trees, graphs, backtracking',
    'Both: Can solve same problems, choose based on context',
  ],
  disadvantages: [
    'Iteration: Can be verbose for recursive structures',
    'Iteration: May need explicit stack for tree/graph problems',
    'Recursion: Stack overflow for deep recursion',
    'Recursion: Function call overhead affects performance',
    'Recursion: Harder to debug and understand call flow',
  ],
  applications: [
    'Iteration: Array/list processing, simple counting',
    'Iteration: Performance-critical code sections',
    'Recursion: Tree and graph algorithms',
    'Recursion: Divide and conquer (merge sort, quick sort)',
    'Recursion: Backtracking (puzzles, combinations)',
  ],
};
