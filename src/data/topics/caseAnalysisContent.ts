import { TopicContent } from '../topicContents';

export const caseAnalysisContent: TopicContent = {
  id: 'case-analysis',
  definition: 'Case Analysis examines how an algorithm performs under different input scenarios. Best case is the fastest possible execution, worst case is the slowest, and average case is the typical expected performance. Think of it like commute time - best case is no traffic, worst case is a major accident, and average is typical daily traffic.',
  keyPoints: [
    'Best Case: Minimum time/space (often too optimistic)',
    'Worst Case: Maximum time/space (safety guarantee)',
    'Average Case: Expected typical performance',
    'Worst case is most commonly used for guarantees',
    'Different inputs can drastically change performance',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Linear Search: Case Analysis
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
/*
Best Case:   O(1)   - Target at first position
Worst Case:  O(n)   - Target at last or not found
Average:     O(n/2) = O(n) - Target in middle on average
*/

// Quick Sort: Case Analysis
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = partition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}
/*
Best Case:   O(n log n) - Pivot always splits evenly
Worst Case:  O(n²)      - Already sorted, pivot always extreme
Average:     O(n log n) - Random distribution
*/

// Binary Search: Case Analysis
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
/*
Best Case:   O(1)     - Target at middle
Worst Case:  O(log n) - Target at extreme or not found
Average:     O(log n) - Logarithmic in all typical cases
*/`,
    },
    {
      language: 'C++',
      code: `#include <vector>
#include <algorithm>
using namespace std;

// Insertion Sort: Clear case differences
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Shift elements greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
/*
Best Case:   O(n)   - Already sorted (inner loop never runs)
Worst Case:  O(n²)  - Reverse sorted (max shifts each time)
Average:     O(n²)  - Random order
*/

// Hash Table Lookup: Case Analysis
class HashTable {
public:
    int search(int key) {
        int index = hash(key);
        // Search in chain at index
        for (auto& item : table[index]) {
            if (item.key == key) return item.value;
        }
        return -1;
    }
    /*
    Best Case:   O(1) - No collision, direct access
    Worst Case:  O(n) - All keys hash to same bucket
    Average:     O(1) - Good hash function, few collisions
    */
};

// Real-world example: Finding element
int findElement(vector<int>& arr, int target) {
    // Strategy 1: Linear search - O(n) worst case
    // Strategy 2: Sort + Binary search - O(n log n) + O(log n)
    
    // For single search: Linear is better
    // For many searches: Sort once, then binary search
    
    return find(arr.begin(), arr.end(), target) != arr.end();
}`,
    },
    {
      language: 'Java',
      code: `import java.util.*;

public class CaseAnalysis {
    
    // Bubble Sort: Case Analysis with Optimization
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no swapping occurred, array is sorted
            if (!swapped) break;
        }
    }
    /*
    Best Case:   O(n)   - Already sorted (one pass, no swaps)
    Worst Case:  O(n²)  - Reverse sorted
    Average:     O(n²)  - Random order
    */
    
    // ArrayList vs LinkedList: Different cases
    public static void demonstrateCases() {
        ArrayList<Integer> arrayList = new ArrayList<>();
        LinkedList<Integer> linkedList = new LinkedList<>();
        
        // Adding at end
        // ArrayList:  O(1) amortized (occasionally O(n) for resize)
        // LinkedList: O(1) always
        
        // Adding at beginning
        // ArrayList:  O(n) - shift all elements
        // LinkedList: O(1) - just update pointers
        
        // Access by index
        // ArrayList:  O(1) - direct access
        // LinkedList: O(n) - traverse from start
        
        // Search for element
        // Both: O(n) worst case
    }
    
    // When to use which case?
    /*
    Use WORST CASE when:
    - Security critical (cryptography)
    - Real-time systems (must meet deadline)
    - Memory allocation (must not run out)
    
    Use AVERAGE CASE when:
    - Performance optimization
    - Typical user experience matters
    - Statistical guarantees are acceptable
    
    Use BEST CASE when:
    - Input is known to be favorable
    - Optimizing for common patterns
    */
}`,
    },
    {
      language: 'JavaScript',
      code: `// Practical Case Analysis Examples

// Array.includes(): Linear Search
function demonstrateLinearSearch(arr, target) {
    // Built-in includes uses linear search
    const found = arr.includes(target);
    
    // Best:  O(1) - target at index 0
    // Worst: O(n) - target not in array
    // Avg:   O(n) - target somewhere in middle
    
    return found;
}

// Set.has(): Hash-based Lookup
function demonstrateSetLookup(arr, target) {
    const set = new Set(arr);  // O(n) to build
    const found = set.has(target);  // O(1) lookup
    
    // For single lookup: Array is fine
    // For many lookups: Convert to Set first
    
    return found;
}

// Real-world example: Finding duplicates
function findDuplicates(arr) {
    // Method 1: Nested loops - O(n²)
    // Best: O(n²), Worst: O(n²), Avg: O(n²)
    
    // Method 2: Sorting first - O(n log n)
    // Best: O(n log n), Worst: O(n log n)
    
    // Method 3: Hash Set - O(n)
    const seen = new Set();
    const duplicates = [];
    
    for (const num of arr) {
        if (seen.has(num)) {
            duplicates.push(num);
        }
        seen.add(num);
    }
    // Best: O(n), Worst: O(n), Avg: O(n)
    // Clear winner for this problem!
    
    return duplicates;
}

// Sorting algorithm comparison
/*
Algorithm      Best       Average    Worst      Space
---------------------------------------------------------
Bubble Sort    O(n)       O(n²)      O(n²)      O(1)
Insertion Sort O(n)       O(n²)      O(n²)      O(1)
Merge Sort     O(n log n) O(n log n) O(n log n) O(n)
Quick Sort     O(n log n) O(n log n) O(n²)      O(log n)
Heap Sort      O(n log n) O(n log n) O(n log n) O(1)
*/`,
    },
    {
      language: 'Python',
      code: `# Case Analysis in Python

# Example 1: List operations case analysis
def list_operations_demo():
    my_list = [1, 2, 3, 4, 5]
    
    # Access by index
    # Best = Worst = Average = O(1)
    element = my_list[2]
    
    # Search for element (using 'in')
    # Best: O(1) - found at start
    # Worst: O(n) - not found or at end
    found = 3 in my_list
    
    # Append at end
    # Best = Worst = O(1) amortized
    my_list.append(6)
    
    # Insert at beginning
    # Best = Worst = O(n) - must shift all
    my_list.insert(0, 0)

# Example 2: Dictionary vs List for lookups
def lookup_comparison(data, searches):
    """
    Comparing lookup strategies
    data: list of (key, value) tuples
    searches: list of keys to find
    """
    
    # Method 1: Linear search in list
    # Each search: O(n)
    # Total for k searches: O(k * n)
    
    # Method 2: Convert to dict, then lookup
    # Build dict: O(n)
    # Each search: O(1) average
    # Total: O(n) + O(k) = O(n + k)
    
    # When k > log(n), dict is better!
    
    lookup_dict = dict(data)
    results = [lookup_dict.get(key) for key in searches]
    return results

# Example 3: Sorting case analysis
def sorting_recommendation(arr):
    """
    Recommending sort algorithm based on input
    """
    n = len(arr)
    
    # Check if nearly sorted
    inversions = sum(1 for i in range(n-1) if arr[i] > arr[i+1])
    
    if inversions < n * 0.1:  # Less than 10% out of order
        # Use Insertion Sort: O(n) for nearly sorted
        print("Nearly sorted: Use Insertion Sort")
    elif n < 50:
        # Small array: simple algorithm is fine
        print("Small array: Any O(n²) is fast enough")
    else:
        # Large random array: use O(n log n)
        print("Large array: Use Merge/Quick/Heap Sort")

# Summary table
"""
When choosing algorithms, consider:

1. What's the typical input? (affects average case)
2. What's the worst possible input? (affects worst case)  
3. Do you have memory constraints? (space complexity)
4. Is the data nearly sorted? (some algos excel here)
5. How many operations will you perform?
"""`,
    },
  ],
  types: [
    { name: 'Best Case', description: 'Minimum operations needed. Often overly optimistic for planning.' },
    { name: 'Worst Case', description: 'Maximum operations needed. Used for guarantees and safety.' },
    { name: 'Average Case', description: 'Expected operations over random inputs. Most realistic measure.' },
    { name: 'Amortized Analysis', description: 'Average over sequence of operations, accounting for occasional expensive ops.' },
  ],
  operations: [
    { name: 'Linear Search', description: 'Find element in unsorted array', timeComplexity: 'Best: O(1), Worst: O(n)' },
    { name: 'Binary Search', description: 'Find element in sorted array', timeComplexity: 'Best: O(1), Worst: O(log n)' },
    { name: 'Quick Sort', description: 'Divide and conquer sort', timeComplexity: 'Best: O(n log n), Worst: O(n²)' },
    { name: 'Hash Table Lookup', description: 'Find key in hash table', timeComplexity: 'Best: O(1), Worst: O(n)' },
    { name: 'Insertion Sort', description: 'Build sorted array one at a time', timeComplexity: 'Best: O(n), Worst: O(n²)' },
  ],
  advantages: [
    'Provides complete picture of algorithm behavior',
    'Helps choose algorithms for specific scenarios',
    'Worst case analysis ensures reliability',
    'Average case helps predict typical performance',
    'Guides optimization efforts effectively',
  ],
  disadvantages: [
    'Average case can be hard to calculate mathematically',
    'Worst case may rarely occur in practice',
    'Best case can be misleading for planning',
    'Real-world inputs may not match assumptions',
    'Constant factors ignored may matter in practice',
  ],
  applications: [
    'Real-time systems requiring guaranteed response',
    'Security systems needing worst-case bounds',
    'Performance optimization for typical workloads',
    'System capacity planning',
    'Algorithm selection for specific data patterns',
  ],
};
