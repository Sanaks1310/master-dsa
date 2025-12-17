export const binarySearchContent = {
  id: 'binary-search',
  definition: 'Binary Search is an efficient searching algorithm that works on sorted arrays by repeatedly dividing the search interval in half. It compares the target with the middle element and eliminates half of the remaining elements in each step.',
  keyPoints: [
    'Array MUST be sorted for binary search to work',
    'Divides search space in half each iteration',
    'Time complexity is O(log n) - very efficient',
    'Space complexity is O(1) iterative, O(log n) recursive',
    'Much faster than linear search for large datasets',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Iterative Binary Search
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow
        
        if (arr[mid] == target)
            return mid;  // Element found
        else if (arr[mid] < target)
            left = mid + 1;  // Search right half
        else
            right = mid - 1;  // Search left half
    }
    return -1;  // Element not found
}

// Recursive Binary Search
int binarySearchRecursive(int arr[], int left, int right, int target) {
    if (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            return binarySearchRecursive(arr, mid + 1, right, target);
        else
            return binarySearchRecursive(arr, left, mid - 1, target);
    }
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 40;
    
    printf("Index: %d\\n", binarySearch(arr, n, target));
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Iterative Binary Search
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

// Recursive Binary Search
int binarySearchRecursive(vector<int>& arr, int left, int right, int target) {
    if (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            return binarySearchRecursive(arr, mid + 1, right, target);
        else
            return binarySearchRecursive(arr, left, mid - 1, target);
    }
    return -1;
}

int main() {
    vector<int> arr = {10, 20, 30, 40, 50, 60, 70};
    int target = 40;
    
    // Using custom function
    cout << "Index: " << binarySearch(arr, target) << endl;
    
    // Using STL
    if (binary_search(arr.begin(), arr.end(), target))
        cout << "Element found!" << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class BinarySearch {
    
    // Iterative Binary Search
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target)
                return mid;
            else if (arr[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return -1;
    }
    
    // Recursive Binary Search
    public static int binarySearchRecursive(int[] arr, int left, int right, int target) {
        if (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target)
                return mid;
            else if (arr[mid] < target)
                return binarySearchRecursive(arr, mid + 1, right, target);
            else
                return binarySearchRecursive(arr, left, mid - 1, target);
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50, 60, 70};
        int target = 40;
        
        System.out.println("Index: " + binarySearch(arr, target));
        
        // Using Arrays.binarySearch
        System.out.println("Built-in: " + Arrays.binarySearch(arr, target));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Iterative Binary Search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target)
            return mid;
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

// Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target)
            return mid;
        else if (arr[mid] < target)
            return binarySearchRecursive(arr, target, mid + 1, right);
        else
            return binarySearchRecursive(arr, target, left, mid - 1);
    }
    return -1;
}

// Example usage
const arr = [10, 20, 30, 40, 50, 60, 70];
const target = 40;

console.log("Index:", binarySearch(arr, target));
console.log("Recursive:", binarySearchRecursive(arr, target));`,
    },
    {
      language: 'Python',
      code: `import bisect

# Iterative Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Recursive Binary Search
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            return binary_search_recursive(arr, target, mid + 1, right)
        else:
            return binary_search_recursive(arr, target, left, mid - 1)
    return -1

# Example usage
arr = [10, 20, 30, 40, 50, 60, 70]
target = 40

print(f"Index: {binary_search(arr, target)}")

# Using bisect module
index = bisect.bisect_left(arr, target)
if index < len(arr) and arr[index] == target:
    print(f"Using bisect: {index}")`,
    },
  ],
  types: [
    { name: 'Iterative Binary Search', description: 'Uses while loop to find element - O(1) space' },
    { name: 'Recursive Binary Search', description: 'Uses recursion - O(log n) stack space' },
    { name: 'Lower Bound', description: 'Find first position where element can be inserted' },
    { name: 'Upper Bound', description: 'Find last position where element can be inserted' },
  ],
  operations: [
    { name: 'Search', description: 'Find element in sorted array', timeComplexity: 'O(log n)' },
    { name: 'Best Case', description: 'Element found at middle', timeComplexity: 'O(1)' },
    { name: 'Average Case', description: 'Element found after log n comparisons', timeComplexity: 'O(log n)' },
    { name: 'Worst Case', description: 'Element not present', timeComplexity: 'O(log n)' },
  ],
  advantages: [
    'Very efficient O(log n) time complexity',
    'Much faster than linear search for large datasets',
    'Minimal comparisons needed',
    'Works great with sorted data',
    'Can be modified for various problems',
  ],
  disadvantages: [
    'Only works on sorted arrays',
    'Requires random access (not good for linked lists)',
    'Sorting overhead if data is unsorted',
    'More complex to implement than linear search',
  ],
  applications: [
    'Searching in sorted databases',
    'Dictionary lookups',
    'Finding elements in phone books',
    'Version control (git bisect)',
    'Finding square root or nth root',
    'Searching in sorted files',
  ],
};
