export const bubbleSortContent = {
  id: 'bubble-sort',
  definition: 'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Larger elements "bubble up" to the end.',
  keyPoints: [
    'Compares and swaps adjacent elements',
    'Larger elements bubble to the end in each pass',
    'After each pass, the largest unsorted element is in its correct position',
    'Time complexity is O(n²) - slow for large datasets',
    'Space complexity is O(1) - in-place sorting',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Bubble Sort function
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Flag to optimize if array is already sorted
        int swapped = 0;
        
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (swapped == 0)
            break;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    printArray(arr, n);
    
    bubbleSort(arr, n);
    
    printf("Sorted array: ");
    printArray(arr, n);
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
using namespace std;

// Bubble Sort function
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        // Last i elements are already sorted
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // Optimization: if no swaps, array is sorted
        if (!swapped)
            break;
    }
}

void printArray(vector<int>& arr) {
    for (int num : arr)
        cout << num << " ";
    cout << endl;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original array: ";
    printArray(arr);
    
    bubbleSort(arr);
    
    cout << "Sorted array: ";
    printArray(arr);
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class BubbleSort {
    
    // Bubble Sort function
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            // Last i elements are already sorted
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // Optimization: if no swaps, array is sorted
            if (!swapped)
                break;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original: " + Arrays.toString(arr));
        
        bubbleSort(arr);
        
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Bubble Sort function
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        // Last i elements are already sorted
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap using destructuring
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // Optimization: if no swaps, array is sorted
        if (!swapped) break;
    }
    
    return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", [...arr]);
console.log("Sorted:", bubbleSort(arr));`,
    },
    {
      language: 'Python',
      code: `# Bubble Sort function
def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        swapped = False
        
        # Last i elements are already sorted
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # Optimization: if no swaps, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {arr}")
print(f"Sorted: {bubble_sort(arr.copy())}")`,
    },
  ],
  types: [
    { name: 'Basic Bubble Sort', description: 'Standard implementation without optimization' },
    { name: 'Optimized Bubble Sort', description: 'Stops early if no swaps occur in a pass' },
    { name: 'Recursive Bubble Sort', description: 'Uses recursion instead of nested loops' },
    { name: 'Cocktail Shaker Sort', description: 'Bidirectional bubble sort - sorts in both directions' },
  ],
  operations: [
    { name: 'Best Case', description: 'Array already sorted', timeComplexity: 'O(n)' },
    { name: 'Average Case', description: 'Random order', timeComplexity: 'O(n²)' },
    { name: 'Worst Case', description: 'Reverse sorted', timeComplexity: 'O(n²)' },
    { name: 'Space Complexity', description: 'In-place sorting', timeComplexity: 'O(1)' },
  ],
  advantages: [
    'Very simple to understand and implement',
    'No additional memory required (in-place)',
    'Stable sort - maintains relative order of equal elements',
    'Can detect if array is already sorted',
    'Good for educational purposes',
  ],
  disadvantages: [
    'Very slow O(n²) for large datasets',
    'Not suitable for production use on large data',
    'Many swaps even when partially sorted',
    'Outperformed by most other sorting algorithms',
  ],
  applications: [
    'Educational tool to teach sorting concepts',
    'Sorting very small datasets',
    'When simplicity is more important than performance',
    'Detecting nearly sorted arrays',
    'Computer graphics (polygon filling algorithm)',
  ],
};
