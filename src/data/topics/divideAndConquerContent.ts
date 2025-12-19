import { TopicContent } from '../topicContents';

export const divideAndConquerContent: TopicContent = {
  id: 'divide-and-conquer',
  definition: 'Divide and Conquer is an algorithmic paradigm that solves a problem by breaking it into smaller subproblems of the same type, solving them recursively, and then combining their solutions. Think of it like sorting a deck of cards by dividing it in half, sorting each half, and then merging them back together.',
  keyPoints: [
    'Divide: Break the problem into smaller subproblems',
    'Conquer: Solve subproblems recursively (base case stops recursion)',
    'Combine: Merge solutions of subproblems to get final answer',
    'Time complexity often follows recurrence T(n) = aT(n/b) + f(n)',
    'Classic examples: Merge Sort, Quick Sort, Binary Search',
    'Reduces complex problems to simpler versions of same problem',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Divide and Conquer: Maximum element in array
#include <stdio.h>

int findMax(int arr[], int left, int right) {
    // Base case: single element
    if (left == right)
        return arr[left];
    
    // Divide: find middle
    int mid = left + (right - left) / 2;
    
    // Conquer: recursively find max in both halves
    int leftMax = findMax(arr, left, mid);
    int rightMax = findMax(arr, mid + 1, right);
    
    // Combine: return the larger of two
    return (leftMax > rightMax) ? leftMax : rightMax;
}

// Merge Sort - Classic D&C Example
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);      // Divide left
        mergeSort(arr, mid + 1, right); // Divide right
        merge(arr, left, mid, right);   // Combine
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Max element: %d\\n", findMax(arr, 0, n - 1));
    
    mergeSort(arr, 0, n - 1);
    printf("Sorted: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Divide and Conquer Examples in C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Find maximum using D&C
int findMax(vector<int>& arr, int left, int right) {
    if (left == right) return arr[left];
    
    int mid = left + (right - left) / 2;
    int leftMax = findMax(arr, left, mid);
    int rightMax = findMax(arr, mid + 1, right);
    
    return max(leftMax, rightMax);
}

// Power function using D&C - O(log n)
long long power(long long base, int exp) {
    if (exp == 0) return 1;
    
    long long half = power(base, exp / 2);
    
    if (exp % 2 == 0)
        return half * half;
    else
        return base * half * half;
}

// Count inversions using modified merge sort
long long merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;
    long long inversions = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
            inversions += (mid - i + 1); // Count inversions
        }
    }
    
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);
    
    for (int i = left; i <= right; i++)
        arr[i] = temp[i - left];
    
    return inversions;
}

long long countInversions(vector<int>& arr, int left, int right) {
    long long count = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;
        count += countInversions(arr, left, mid);
        count += countInversions(arr, mid + 1, right);
        count += merge(arr, left, mid, right);
    }
    return count;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Max: " << findMax(arr, 0, arr.size() - 1) << endl;
    cout << "2^10 = " << power(2, 10) << endl;
    
    vector<int> inv = {8, 4, 2, 1};
    cout << "Inversions: " << countInversions(inv, 0, inv.size() - 1) << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Divide and Conquer in Java
public class DivideAndConquer {
    
    // Find maximum element using D&C
    public static int findMax(int[] arr, int left, int right) {
        if (left == right) return arr[left];
        
        int mid = left + (right - left) / 2;
        int leftMax = findMax(arr, left, mid);
        int rightMax = findMax(arr, mid + 1, right);
        
        return Math.max(leftMax, rightMax);
    }
    
    // Binary Search - D&C example
    public static int binarySearch(int[] arr, int target, int left, int right) {
        if (left > right) return -1;
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] > target)
            return binarySearch(arr, target, left, mid - 1);
        else
            return binarySearch(arr, target, mid + 1, right);
    }
    
    // Strassen's Matrix Multiplication hint (simplified)
    // Divides matrices into 4 quadrants, uses 7 multiplications instead of 8
    public static int[][] matrixMultiply(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        
        // Base case
        if (n == 1) {
            C[0][0] = A[0][0] * B[0][0];
            return C;
        }
        
        // For larger matrices, divide into quadrants
        // and apply Strassen's formulas (simplified here)
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Max: " + findMax(arr, 0, arr.length - 1));
        
        int[] sorted = {11, 12, 22, 25, 34, 64, 90};
        System.out.println("Binary Search 25: index " + 
            binarySearch(sorted, 25, 0, sorted.length - 1));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Divide and Conquer in JavaScript

// Find maximum using D&C
function findMax(arr, left = 0, right = arr.length - 1) {
    // Base case: single element
    if (left === right) return arr[left];
    
    // Divide
    const mid = Math.floor((left + right) / 2);
    
    // Conquer
    const leftMax = findMax(arr, left, mid);
    const rightMax = findMax(arr, mid + 1, right);
    
    // Combine
    return Math.max(leftMax, rightMax);
}

// Merge Sort - Classic D&C
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Conquer & Combine
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// Quick Select - Find kth smallest element O(n) average
function quickSelect(arr, k, left = 0, right = arr.length - 1) {
    if (left === right) return arr[left];
    
    // Partition
    const pivotIndex = partition(arr, left, right);
    
    if (k === pivotIndex) return arr[k];
    else if (k < pivotIndex)
        return quickSelect(arr, k, left, pivotIndex - 1);
    else
        return quickSelect(arr, k, pivotIndex + 1, right);
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Max:", findMax(arr));
console.log("Sorted:", mergeSort([...arr]));
console.log("3rd smallest:", quickSelect([...arr], 2)); // 0-indexed`,
    },
    {
      language: 'Python',
      code: `# Divide and Conquer in Python

def find_max(arr, left=0, right=None):
    """Find maximum element using D&C"""
    if right is None:
        right = len(arr) - 1
    
    # Base case: single element
    if left == right:
        return arr[left]
    
    # Divide
    mid = (left + right) // 2
    
    # Conquer
    left_max = find_max(arr, left, mid)
    right_max = find_max(arr, mid + 1, right)
    
    # Combine
    return max(left_max, right_max)


def merge_sort(arr):
    """Classic Merge Sort - D&C example"""
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Combine
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


def power(base, exp):
    """Fast exponentiation using D&C - O(log n)"""
    if exp == 0:
        return 1
    
    half = power(base, exp // 2)
    
    if exp % 2 == 0:
        return half * half
    else:
        return base * half * half


def closest_pair(points):
    """Find closest pair of points - D&C approach (simplified)"""
    def distance(p1, p2):
        return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2) ** 0.5
    
    def brute_force(pts):
        min_dist = float('inf')
        for i in range(len(pts)):
            for j in range(i + 1, len(pts)):
                min_dist = min(min_dist, distance(pts[i], pts[j]))
        return min_dist
    
    # Sort by x-coordinate
    sorted_pts = sorted(points, key=lambda p: p[0])
    
    if len(sorted_pts) <= 3:
        return brute_force(sorted_pts)
    
    # Divide and conquer (simplified)
    mid = len(sorted_pts) // 2
    left_min = closest_pair(sorted_pts[:mid])
    right_min = closest_pair(sorted_pts[mid:])
    
    return min(left_min, right_min)


# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
print(f"Max: {find_max(arr)}")
print(f"Sorted: {merge_sort(arr)}")
print(f"2^10 = {power(2, 10)}")

points = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10)]
print(f"Closest pair distance: {closest_pair(points):.2f}")`,
    },
  ],
  types: [
    {
      name: 'Binary Division',
      description: 'Problem divided into two equal halves (Merge Sort, Binary Search)',
    },
    {
      name: 'Multi-way Division',
      description: 'Problem divided into more than two subproblems (Karatsuba multiplication)',
    },
    {
      name: 'Decrease and Conquer',
      description: 'Reduce problem size by constant (Insertion Sort) or factor (Binary Search)',
    },
    {
      name: 'Transform and Conquer',
      description: 'Transform problem to simpler form, then solve (Heap Sort via heapify)',
    },
  ],
  operations: [
    {
      name: 'Merge Sort',
      description: 'Divide array, sort halves, merge',
      timeComplexity: 'O(n log n)',
    },
    {
      name: 'Quick Sort',
      description: 'Partition around pivot, sort partitions',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
    },
    {
      name: 'Binary Search',
      description: 'Divide search space in half each time',
      timeComplexity: 'O(log n)',
    },
    {
      name: 'Fast Power',
      description: 'Calculate x^n by squaring halves',
      timeComplexity: 'O(log n)',
    },
    {
      name: 'Strassen Matrix Mult',
      description: 'Multiply matrices with 7 subproblems',
      timeComplexity: 'O(n^2.807)',
    },
  ],
  advantages: [
    'Breaks complex problems into manageable subproblems',
    'Often leads to efficient O(n log n) algorithms',
    'Naturally parallelizable - subproblems are independent',
    'Optimal for problems with overlapping substructure',
    'Reduces time complexity significantly for many problems',
  ],
  disadvantages: [
    'Recursive overhead and stack space usage',
    'Not suitable for problems without natural division',
    'May have overhead from combining step',
    'Can be harder to implement than iterative solutions',
    'Cache performance may suffer due to non-contiguous access',
  ],
  applications: [
    'Sorting algorithms (Merge Sort, Quick Sort)',
    'Searching (Binary Search)',
    'Matrix multiplication (Strassen algorithm)',
    'Finding closest pair of points',
    'Fast Fourier Transform (FFT)',
    'Karatsuba multiplication for large numbers',
  ],
};
