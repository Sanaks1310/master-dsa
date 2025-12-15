import { TopicContent } from '../topicContents';

export const timeComplexityContent: TopicContent = {
  id: 'time-complexity',
  definition: 'Time Complexity measures how the running time of an algorithm increases as the input size grows. It tells us how efficient an algorithm is by counting the number of basic operations (comparisons, assignments, arithmetic) performed. Think of it like measuring how much longer it takes to find a book in a library as more books are added.',
  keyPoints: [
    'Measures algorithm efficiency in terms of time',
    'Expressed as a function of input size (n)',
    'Counts basic operations, not actual time in seconds',
    'Helps compare different algorithms',
    'Important for choosing the right approach for large data',
  ],
  syntax: [
    {
      language: 'C',
      code: `// O(1) - Constant Time: Same time regardless of input size
int getFirst(int arr[], int n) {
    return arr[0];  // Always 1 operation
}

// O(n) - Linear Time: Time grows with input size
int findMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {  // n-1 iterations
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// O(n²) - Quadratic Time: Time grows squared
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {        // n times
        for (int j = 0; j < n-1; j++) {  // n times
            if (arr[j] > arr[j+1]) {
                // swap
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

// O(log n) - Logarithmic Time: Halving each step
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    },
    {
      language: 'C++',
      code: `#include <vector>
#include <algorithm>
using namespace std;

// O(1) - Constant Time
int getFirst(vector<int>& arr) {
    return arr[0];  // Always 1 operation
}

// O(n) - Linear Time
int findMax(vector<int>& arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        maxVal = max(maxVal, arr[i]);
    }
    return maxVal;
}

// O(n²) - Quadratic Time
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// O(log n) - Logarithmic Time
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    },
    {
      language: 'Java',
      code: `public class TimeComplexity {
    // O(1) - Constant Time
    public static int getFirst(int[] arr) {
        return arr[0];  // Always 1 operation
    }
    
    // O(n) - Linear Time
    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
    
    // O(n²) - Quadratic Time
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    // O(log n) - Logarithmic Time
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// O(1) - Constant Time
function getFirst(arr) {
    return arr[0];  // Always 1 operation
}

// O(n) - Linear Time
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// O(n²) - Quadratic Time
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// O(log n) - Logarithmic Time
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    },
    {
      language: 'Python',
      code: `# O(1) - Constant Time
def get_first(arr):
    return arr[0]  # Always 1 operation

# O(n) - Linear Time
def find_max(arr):
    max_val = arr[0]
    for i in range(1, len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val

# O(n²) - Quadratic Time
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# O(log n) - Logarithmic Time
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    },
  ],
  types: [
    { name: 'O(1) - Constant', description: 'Same time no matter the input size. Example: accessing array by index.' },
    { name: 'O(log n) - Logarithmic', description: 'Time increases slowly. Example: binary search (halving each step).' },
    { name: 'O(n) - Linear', description: 'Time grows directly with input. Example: finding max in unsorted array.' },
    { name: 'O(n log n) - Linearithmic', description: 'Slightly worse than linear. Example: merge sort, quick sort.' },
    { name: 'O(n²) - Quadratic', description: 'Time grows squared. Example: nested loops, bubble sort.' },
    { name: 'O(2ⁿ) - Exponential', description: 'Time doubles with each input. Example: recursive fibonacci.' },
  ],
  operations: [
    { name: 'Array Access', description: 'Get element at index arr[i]', timeComplexity: 'O(1)' },
    { name: 'Linear Search', description: 'Find element in unsorted array', timeComplexity: 'O(n)' },
    { name: 'Binary Search', description: 'Find element in sorted array', timeComplexity: 'O(log n)' },
    { name: 'Bubble Sort', description: 'Sort using adjacent comparisons', timeComplexity: 'O(n²)' },
    { name: 'Merge Sort', description: 'Sort using divide and conquer', timeComplexity: 'O(n log n)' },
  ],
  advantages: [
    'Helps predict algorithm performance before coding',
    'Enables comparison between different solutions',
    'Guides optimization efforts effectively',
    'Essential for technical interviews',
    'Crucial for handling large-scale data',
  ],
  disadvantages: [
    'Ignores constant factors that matter for small inputs',
    'Does not measure actual execution time',
    'Can be complex to calculate for some algorithms',
    'Hardware differences are not considered',
    'Best/worst case may differ significantly',
  ],
  applications: [
    'Choosing efficient algorithms for large datasets',
    'Database query optimization',
    'Real-time system design',
    'Competitive programming',
    'System design interviews',
  ],
};
