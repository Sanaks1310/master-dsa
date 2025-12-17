export const selectionSortContent = {
  id: 'selection-sort',
  definition: 'Selection Sort is a simple comparison-based sorting algorithm that divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region.',
  keyPoints: [
    'Finds minimum element in each pass',
    'Swaps minimum with first unsorted element',
    'Sorted region grows from left to right',
    'Time complexity is O(n²) - always',
    'Space complexity is O(1) - in-place sorting',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Selection Sort function
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Find minimum element in unsorted region
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original: ");
    printArray(arr, n);
    
    selectionSort(arr, n);
    
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

// Selection Sort function
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        // Find minimum element in unsorted region
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    
    cout << "Original: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    selectionSort(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class SelectionSort {
    
    // Selection Sort function
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in unsorted region
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap minimum with first unsorted element
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        
        System.out.println("Original: " + Arrays.toString(arr));
        
        selectionSort(arr);
        
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Selection Sort function
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Find minimum element in unsorted region
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}

// Example usage
const arr = [64, 25, 12, 22, 11];
console.log("Original:", [...arr]);
console.log("Sorted:", selectionSort(arr));`,
    },
    {
      language: 'Python',
      code: `# Selection Sort function
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        # Find minimum element in unsorted region
        min_index = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap minimum with first unsorted element
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr

# Example usage
arr = [64, 25, 12, 22, 11]
print(f"Original: {arr}")
print(f"Sorted: {selection_sort(arr.copy())}")`,
    },
  ],
  types: [
    { name: 'Basic Selection Sort', description: 'Find minimum and swap - standard implementation' },
    { name: 'Bidirectional Selection Sort', description: 'Find both min and max in each pass' },
    { name: 'Stable Selection Sort', description: 'Modified to maintain stability using shifting' },
  ],
  operations: [
    { name: 'Best Case', description: 'Array already sorted', timeComplexity: 'O(n²)' },
    { name: 'Average Case', description: 'Random order', timeComplexity: 'O(n²)' },
    { name: 'Worst Case', description: 'Reverse sorted', timeComplexity: 'O(n²)' },
    { name: 'Swaps', description: 'Maximum number of swaps', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Simple and easy to understand',
    'No additional memory required (in-place)',
    'Minimum number of swaps - O(n)',
    'Good when memory writes are expensive',
    'Works well on small datasets',
  ],
  disadvantages: [
    'Always O(n²) even for sorted arrays',
    'Not stable - may change order of equal elements',
    'Slow for large datasets',
    'Does not adapt to partially sorted data',
  ],
  applications: [
    'When memory writes are costly (flash memory)',
    'Sorting small arrays',
    'When simplicity is preferred',
    'Educational purposes',
    'Embedded systems with limited memory',
  ],
};
