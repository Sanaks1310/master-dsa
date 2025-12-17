export const heapSortContent = {
  id: 'heap-sort',
  definition: 'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap from the array, then repeatedly extracts the maximum element and places it at the end of the sorted region.',
  keyPoints: [
    'Uses binary heap data structure',
    'First builds max-heap, then extracts elements',
    'In-place sorting algorithm',
    'Time complexity is O(n log n) - always',
    'Space complexity is O(1) - no extra array needed',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Heapify a subtree rooted at index i
void heapify(int arr[], int n, int i) {
    int largest = i;       // Initialize largest as root
    int left = 2 * i + 1;  // Left child
    int right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // If largest is not root
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}

// Heap Sort function
void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        // Heapify reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    heapSort(arr, n);
    
    printf("Sorted: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Heapify a subtree
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

// Heap Sort function
void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    
    heapSort(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    
    // Using STL
    // make_heap, sort_heap
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class HeapSort {
    
    // Heapify a subtree
    public static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest])
            largest = left;
        
        if (right < n && arr[right] > arr[largest])
            largest = right;
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    // Heap Sort function
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        
        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            heapify(arr, i, 0);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        
        heapSort(arr);
        
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Heapify a subtree
function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Heap Sort function
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

// Example
const arr = [12, 11, 13, 5, 6, 7];
console.log("Sorted:", heapSort([...arr]));`,
    },
    {
      language: 'Python',
      code: `import heapq

# Heapify a subtree
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Heap Sort function
def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

# Example
arr = [12, 11, 13, 5, 6, 7]
print(f"Sorted: {heap_sort(arr.copy())}")

# Using heapq (min-heap) for sorting
def heap_sort_builtin(arr):
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]`,
    },
  ],
  types: [
    { name: 'Max-Heap Sort', description: 'Uses max-heap to sort in ascending order' },
    { name: 'Min-Heap Sort', description: 'Uses min-heap to sort in descending order' },
    { name: 'Bottom-Up Heap Sort', description: 'Builds heap from bottom to top' },
  ],
  operations: [
    { name: 'Build Heap', description: 'Convert array to heap', timeComplexity: 'O(n)' },
    { name: 'Best Case', description: 'All elements same', timeComplexity: 'O(n log n)' },
    { name: 'Average Case', description: 'Random order', timeComplexity: 'O(n log n)' },
    { name: 'Worst Case', description: 'Any input', timeComplexity: 'O(n log n)' },
  ],
  advantages: [
    'Guaranteed O(n log n) in all cases',
    'In-place sorting - O(1) extra space',
    'No worst case like Quick Sort',
    'Good for finding k largest/smallest elements',
  ],
  disadvantages: [
    'Not stable sort',
    'Poor cache performance',
    'Slower than Quick Sort in practice',
    'More complex than simple sorts',
  ],
  applications: [
    'Priority queue implementation',
    'Finding k largest/smallest elements',
    'Systems where worst case matters',
    'External sorting',
    'Operating system task scheduling',
  ],
};
