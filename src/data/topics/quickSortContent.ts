export const quickSortContent = {
  id: 'quick-sort',
  definition: 'Quick Sort is an efficient, in-place sorting algorithm that uses the divide-and-conquer approach. It picks a pivot element, partitions the array around the pivot (smaller elements on left, larger on right), and recursively sorts the partitions.',
  keyPoints: [
    'Divide and conquer using pivot element',
    'Partitions array around the pivot',
    'In-place sorting - no extra array needed',
    'Average time complexity O(n log n)',
    'Worst case O(n²) with poor pivot choice',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Swap two elements
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Partition function - Lomuto scheme
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // Choose last element as pivot
    int i = low - 1;        // Index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    
    swap(&arr[i + 1], &arr[high]);
    return i + 1;  // Return pivot index
}

// Quick Sort function
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);   // Sort left partition
        quickSort(arr, pi + 1, high);  // Sort right partition
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    quickSort(arr, 0, n - 1);
    
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
using namespace std;

// Partition function - Lomuto scheme
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Quick Sort function
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    
    quickSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class QuickSort {
    
    // Partition function
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Place pivot in correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    // Quick Sort function
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        
        quickSort(arr, 0, arr.length - 1);
        
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Partition function
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Quick Sort function
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

// Functional approach (creates new arrays)
function quickSortFunctional(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[arr.length - 1];
    const left = arr.slice(0, -1).filter(x => x < pivot);
    const right = arr.slice(0, -1).filter(x => x >= pivot);
    
    return [...quickSortFunctional(left), pivot, ...quickSortFunctional(right)];
}

// Example
const arr = [10, 7, 8, 9, 1, 5];
console.log("Sorted:", quickSort([...arr]));`,
    },
    {
      language: 'Python',
      code: `# Partition function
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Quick Sort function (in-place)
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    
    return arr

# Pythonic approach (creates new lists)
def quick_sort_pythonic(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x < pivot]
    right = [x for x in arr[:-1] if x >= pivot]
    
    return quick_sort_pythonic(left) + [pivot] + quick_sort_pythonic(right)

# Example
arr = [10, 7, 8, 9, 1, 5]
print(f"Sorted: {quick_sort(arr.copy())}")`,
    },
  ],
  types: [
    { name: 'Lomuto Partition', description: 'Uses last element as pivot - simpler but more swaps' },
    { name: 'Hoare Partition', description: 'Uses first element as pivot - fewer swaps on average' },
    { name: 'Median-of-Three', description: 'Picks median of first, middle, last as pivot' },
    { name: 'Randomized Quick Sort', description: 'Random pivot selection to avoid worst case' },
    { name: '3-Way Quick Sort', description: 'Handles duplicate elements efficiently' },
  ],
  operations: [
    { name: 'Best Case', description: 'Balanced partitions', timeComplexity: 'O(n log n)' },
    { name: 'Average Case', description: 'Random order', timeComplexity: 'O(n log n)' },
    { name: 'Worst Case', description: 'Already sorted (poor pivot)', timeComplexity: 'O(n²)' },
    { name: 'Space', description: 'In-place + recursion stack', timeComplexity: 'O(log n)' },
  ],
  advantages: [
    'In-place sorting - O(1) extra space',
    'Cache-friendly due to locality of reference',
    'Average O(n log n) - very fast in practice',
    'Faster than Merge Sort for arrays',
    'Tail recursion optimization possible',
  ],
  disadvantages: [
    'Worst case O(n²) with poor pivot choice',
    'Not stable - may change order of equal elements',
    'Recursive - stack overflow risk for large arrays',
    'Performance depends on pivot selection',
  ],
  applications: [
    'General purpose sorting in standard libraries',
    'When in-place sorting is needed',
    'Arrays (better cache performance)',
    'When average case matters more than worst case',
    'Used in Introsort (C++ std::sort)',
    'Database sorting operations',
  ],
};
