export const mergeSortContent = {
  id: 'merge-sort',
  definition: 'Merge Sort is an efficient, stable sorting algorithm that uses the divide-and-conquer approach. It divides the array into two halves, recursively sorts them, and then merges the sorted halves. It guarantees O(n log n) time complexity in all cases.',
  keyPoints: [
    'Divide and conquer algorithm',
    'Divides array into halves recursively',
    'Merges sorted halves back together',
    'Time complexity is O(n log n) - always',
    'Space complexity is O(n) - needs extra array for merging',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

// Merge two sorted subarrays
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    int *L = (int*)malloc(n1 * sizeof(int));
    int *R = (int*)malloc(n2 * sizeof(int));
    
    // Copy data to temp arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge temp arrays back
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    
    free(L);
    free(R);
}

// Merge Sort function
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);       // Sort left half
        mergeSort(arr, mid + 1, right);  // Sort right half
        merge(arr, left, mid, right);    // Merge sorted halves
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    mergeSort(arr, 0, n - 1);
    
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

// Merge two sorted subarrays
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> L(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);
    
    int i = 0, j = 0, k = left;
    
    while (i < L.size() && j < R.size()) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}

// Merge Sort function
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.Arrays;

public class MergeSort {
    
    // Merge two sorted subarrays
    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        // Copy data to temp arrays
        for (int i = 0; i < n1; i++)
            L[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            R[j] = arr[mid + 1 + j];
        
        // Merge temp arrays back
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }
        
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    
    // Merge Sort function
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        
        mergeSort(arr, 0, arr.length - 1);
        
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Merge two sorted arrays
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
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Merge Sort function
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Original:", arr);
console.log("Sorted:", mergeSort(arr));`,
    },
    {
      language: 'Python',
      code: `# Merge two sorted arrays
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

# Merge Sort function
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

# Example usage
arr = [38, 27, 43, 3, 9, 82, 10]
print(f"Original: {arr}")
print(f"Sorted: {merge_sort(arr)}")`,
    },
  ],
  types: [
    { name: 'Top-Down Merge Sort', description: 'Recursive approach - divides then merges' },
    { name: 'Bottom-Up Merge Sort', description: 'Iterative approach - merges pairs progressively' },
    { name: 'Natural Merge Sort', description: 'Exploits existing sorted runs in data' },
    { name: 'In-Place Merge Sort', description: 'Complex variant using O(1) extra space' },
  ],
  operations: [
    { name: 'Best Case', description: 'Array already sorted', timeComplexity: 'O(n log n)' },
    { name: 'Average Case', description: 'Random order', timeComplexity: 'O(n log n)' },
    { name: 'Worst Case', description: 'Any input', timeComplexity: 'O(n log n)' },
    { name: 'Space', description: 'Extra array for merging', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Guaranteed O(n log n) time complexity',
    'Stable sort - maintains relative order',
    'Works well with linked lists',
    'Good for external sorting (large files)',
    'Parallelizable - can sort halves independently',
  ],
  disadvantages: [
    'O(n) extra space required',
    'Not in-place (uses extra memory)',
    'Slower than Quick Sort in practice for arrays',
    'More memory overhead for small arrays',
  ],
  applications: [
    'External sorting (files larger than memory)',
    'Sorting linked lists (no random access needed)',
    'When stable sort is required',
    'Parallel computing environments',
    'Used in Timsort (Python, Java sort)',
    'Counting inversions in array',
  ],
};
