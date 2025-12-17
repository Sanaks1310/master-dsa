export const insertionSortContent = {
  id: 'insertion-sort',
  definition: 'Insertion Sort is a simple sorting algorithm that builds the sorted array one element at a time. It takes each element from the unsorted region and inserts it into its correct position in the sorted region, similar to how you would sort playing cards in your hand.',
  keyPoints: [
    'Builds sorted array one element at a time',
    'Takes element and inserts at correct position',
    'Shifts elements to make room for insertion',
    'Best for small or nearly sorted arrays',
    'Space complexity is O(1) - in-place sorting',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Insertion Sort function
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];  // Element to be inserted
        int j = i - 1;
        
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original: ");
    printArray(arr, n);
    
    insertionSort(arr, n);
    
    printf("Sorted: ");
    printArray(arr, n);
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
using namespace std;

// Insertion Sort function
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];  // Element to be inserted
        int j = i - 1;
        
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
    }
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6};
    
    cout << "Original: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    insertionSort(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class InsertionSort {
    
    // Insertion Sort function
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i < n; i++) {
            int key = arr[i];  // Element to be inserted
            int j = i - 1;
            
            // Shift elements greater than key to the right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insert key at correct position
            arr[j + 1] = key;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        
        System.out.println("Original: " + Arrays.toString(arr));
        
        insertionSort(arr);
        
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Insertion Sort function
function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];  // Element to be inserted
        let j = i - 1;
        
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
    }
    
    return arr;
}

// Example usage
const arr = [12, 11, 13, 5, 6];
console.log("Original:", [...arr]);
console.log("Sorted:", insertionSort(arr));`,
    },
    {
      language: 'Python',
      code: `# Insertion Sort function
def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]  # Element to be inserted
        j = i - 1
        
        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key at correct position
        arr[j + 1] = key
    
    return arr

# Example usage
arr = [12, 11, 13, 5, 6]
print(f"Original: {arr}")
print(f"Sorted: {insertion_sort(arr.copy())}")`,
    },
  ],
  types: [
    { name: 'Basic Insertion Sort', description: 'Standard implementation with linear search for position' },
    { name: 'Binary Insertion Sort', description: 'Uses binary search to find insertion position - O(n log n) comparisons' },
    { name: 'Shell Sort', description: 'Generalized insertion sort with gap sequences' },
  ],
  operations: [
    { name: 'Best Case', description: 'Array already sorted', timeComplexity: 'O(n)' },
    { name: 'Average Case', description: 'Random order', timeComplexity: 'O(n²)' },
    { name: 'Worst Case', description: 'Reverse sorted', timeComplexity: 'O(n²)' },
    { name: 'Space', description: 'In-place sorting', timeComplexity: 'O(1)' },
  ],
  advantages: [
    'Simple and easy to implement',
    'Efficient for small datasets',
    'Very fast for nearly sorted arrays - O(n)',
    'Stable sort - maintains relative order',
    'In-place - no extra memory needed',
    'Online algorithm - can sort as data comes in',
  ],
  disadvantages: [
    'O(n²) for large unsorted datasets',
    'Many shifts required for reverse sorted data',
    'Not suitable for large random datasets',
  ],
  applications: [
    'Sorting small arrays',
    'Nearly sorted data (few elements out of place)',
    'Online sorting (data arriving in real-time)',
    'Used as subroutine in Timsort and Introsort',
    'Sorting playing cards in hand',
    'When data is almost sorted',
  ],
};
