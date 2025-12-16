import { TopicContent } from '../topicContents';

export const arrayContent: TopicContent = {
  id: 'arrays',
  definition: 'An Array is a linear data structure that stores a collection of elements of the same data type in contiguous memory locations. Each element can be accessed directly using its index (position number), making arrays one of the most fundamental and widely used data structures. Think of it like numbered lockers in a row - you can instantly go to any locker if you know its number.',
  keyPoints: [
    'Elements stored in contiguous (side-by-side) memory locations',
    'Each element accessed using an index (0-based in most languages)',
    'Fixed size in static arrays, can grow in dynamic arrays',
    'Homogeneous - all elements must be of the same data type',
    'Random access in O(1) time - instant access to any element',
    'Cache-friendly due to sequential memory storage',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Static Array Declaration & Initialization
    int arr[5];                        // Declare array of 5 integers
    int arr2[] = {1, 2, 3, 4, 5};      // Initialize with values
    int arr3[5] = {1, 2, 3};           // Partial init (rest = 0)
    
    // Accessing and Modifying Elements
    arr[0] = 10;                       // Set first element
    int x = arr2[2];                   // Get third element (3)
    
    // Traversing Array
    printf("Array elements: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr2[i]);
    }
    printf("\\n");
    
    // Finding Array Length
    int length = sizeof(arr2) / sizeof(arr2[0]);  // 5
    
    // 2D Array
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    printf("Element at [1][2]: %d\\n", matrix[1][2]);  // 6
    
    // Dynamic Array using malloc
    int *dynArr = (int*)malloc(5 * sizeof(int));
    dynArr[0] = 100;
    dynArr[1] = 200;
    
    // Always free dynamic memory
    free(dynArr);
    
    return 0;
}

// Common Array Operations
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int findMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max) max = arr[i];
    return max;
}

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (arr[i] == key) return i;
    return -1;  // Not found
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <array>
#include <algorithm>
using namespace std;

int main() {
    // Static Array
    int arr[5] = {1, 2, 3, 4, 5};
    
    // STL array (fixed size, bounds checking)
    array<int, 5> stdArr = {10, 20, 30, 40, 50};
    cout << "First: " << stdArr.at(0) << endl;  // Safe access
    cout << "Size: " << stdArr.size() << endl;
    
    // Vector (Dynamic Array) - Most commonly used
    vector<int> vec = {1, 2, 3};
    
    // Adding elements
    vec.push_back(4);           // Add at end: {1,2,3,4}
    vec.insert(vec.begin(), 0); // Add at start: {0,1,2,3,4}
    
    // Removing elements
    vec.pop_back();             // Remove last
    vec.erase(vec.begin());     // Remove first
    
    // Accessing elements
    cout << "Element: " << vec[0] << endl;      // No bounds check
    cout << "Safe: " << vec.at(0) << endl;      // With bounds check
    cout << "First: " << vec.front() << endl;
    cout << "Last: " << vec.back() << endl;
    
    // Size and capacity
    cout << "Size: " << vec.size() << endl;
    cout << "Capacity: " << vec.capacity() << endl;
    
    // Traversing
    cout << "Elements: ";
    for (int val : vec) {
        cout << val << " ";
    }
    cout << endl;
    
    // Sorting
    sort(vec.begin(), vec.end());           // Ascending
    sort(vec.begin(), vec.end(), greater<int>()); // Descending
    
    // 2D Vector
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    cout << "Matrix[1][2]: " << matrix[1][2] << endl;  // 6
    
    // Useful operations
    int maxVal = *max_element(vec.begin(), vec.end());
    int minVal = *min_element(vec.begin(), vec.end());
    reverse(vec.begin(), vec.end());
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.*;

public class ArrayExample {
    public static void main(String[] args) {
        // Static Array Declaration
        int[] arr;                          // Declaration
        arr = new int[5];                   // Allocation
        int[] arr2 = {1, 2, 3, 4, 5};       // Initialize
        int[] arr3 = new int[]{10, 20, 30}; // Another way
        
        // Accessing and Modifying
        arr[0] = 100;                       // Set value
        int x = arr2[2];                    // Get value (3)
        int length = arr2.length;           // Array length
        
        // Traversing Array
        System.out.print("Elements: ");
        for (int i = 0; i < arr2.length; i++) {
            System.out.print(arr2[i] + " ");
        }
        System.out.println();
        
        // Enhanced for loop
        for (int val : arr2) {
            System.out.print(val + " ");
        }
        System.out.println();
        
        // ArrayList (Dynamic Array)
        ArrayList<Integer> list = new ArrayList<>();
        
        // Adding elements
        list.add(10);                       // Add at end
        list.add(0, 5);                     // Add at index 0
        list.addAll(Arrays.asList(20, 30)); // Add multiple
        
        // Removing elements
        list.remove(0);                     // Remove by index
        list.remove(Integer.valueOf(30));   // Remove by value
        
        // Accessing
        int val = list.get(0);              // Get element
        list.set(0, 100);                   // Update element
        
        // Size and checks
        int size = list.size();
        boolean empty = list.isEmpty();
        boolean contains = list.contains(20);
        int index = list.indexOf(20);       // -1 if not found
        
        // Sorting
        Collections.sort(list);             // Ascending
        Collections.sort(list, Collections.reverseOrder()); // Descending
        
        // Converting
        Integer[] arrFromList = list.toArray(new Integer[0]);
        List<Integer> listFromArr = Arrays.asList(1, 2, 3);
        
        // 2D Array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("Matrix[1][2]: " + matrix[1][2]);  // 6
        
        // Useful methods
        Arrays.sort(arr2);
        int max = Arrays.stream(arr2).max().getAsInt();
        int min = Arrays.stream(arr2).min().getAsInt();
        int sum = Arrays.stream(arr2).sum();
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Array Declaration and Initialization
let arr = [];                           // Empty array
let arr2 = [1, 2, 3, 4, 5];             // With values
let arr3 = new Array(5);                // Array with 5 empty slots
let arr4 = new Array(1, 2, 3);          // Array with values
let arr5 = Array.from({length: 5}, (_, i) => i); // [0,1,2,3,4]

// Accessing and Modifying
arr2[0] = 10;                           // Set value
let x = arr2[2];                        // Get value (3)
let length = arr2.length;               // Array length

// Adding Elements
arr2.push(6);                           // Add at end
arr2.unshift(0);                        // Add at beginning
arr2.splice(2, 0, 1.5);                 // Insert at index 2

// Removing Elements
arr2.pop();                             // Remove last
arr2.shift();                           // Remove first
arr2.splice(2, 1);                      // Remove 1 element at index 2

// Finding Elements
let index = arr2.indexOf(3);            // Find index (-1 if not found)
let found = arr2.find(x => x > 2);      // First element > 2
let foundIndex = arr2.findIndex(x => x > 2);
let includes = arr2.includes(3);        // true/false

// Transforming Arrays
let doubled = arr2.map(x => x * 2);     // Transform each
let filtered = arr2.filter(x => x > 2); // Keep matching
let sum = arr2.reduce((acc, x) => acc + x, 0); // Combine all

// Iterating
arr2.forEach((val, idx) => {
    console.log(\`Index \${idx}: \${val}\`);
});

for (let val of arr2) {
    console.log(val);
}

// Sorting
arr2.sort((a, b) => a - b);             // Ascending
arr2.sort((a, b) => b - a);             // Descending

// Useful Methods
let reversed = arr2.reverse();          // Reverse
let sliced = arr2.slice(1, 3);          // Extract portion
let joined = arr2.join(", ");           // Convert to string
let concated = arr2.concat([6, 7]);     // Combine arrays
let flat = [[1, 2], [3, 4]].flat();     // Flatten: [1,2,3,4]

// Spread Operator
let copy = [...arr2];                   // Copy array
let merged = [...arr2, ...arr3];        // Merge arrays

// Destructuring
let [first, second, ...rest] = arr2;

// 2D Array
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix[1][2]);              // 6

// Array Methods Summary
console.log("Max:", Math.max(...arr2));
console.log("Min:", Math.min(...arr2));
console.log("Every > 0:", arr2.every(x => x > 0));
console.log("Some > 3:", arr2.some(x => x > 3));`,
    },
    {
      language: 'Python',
      code: `# List (Python's dynamic array)
arr = []                                # Empty list
arr2 = [1, 2, 3, 4, 5]                  # With values
arr3 = [0] * 5                          # [0, 0, 0, 0, 0]
arr4 = list(range(5))                   # [0, 1, 2, 3, 4]
arr5 = [i**2 for i in range(5)]         # [0, 1, 4, 9, 16]

# Accessing and Modifying
arr2[0] = 10                            # Set value
x = arr2[2]                             # Get value (3)
length = len(arr2)                      # List length

# Negative Indexing (Python specialty)
last = arr2[-1]                         # Last element
second_last = arr2[-2]                  # Second to last

# Slicing [start:end:step]
first_three = arr2[:3]                  # [0, 1, 2]
last_three = arr2[-3:]                  # Last 3 elements
reversed_arr = arr2[::-1]               # Reverse
every_second = arr2[::2]                # Every 2nd element

# Adding Elements
arr2.append(6)                          # Add at end
arr2.insert(0, -1)                      # Insert at index
arr2.extend([7, 8, 9])                  # Add multiple

# Removing Elements
arr2.pop()                              # Remove last
arr2.pop(0)                             # Remove at index
arr2.remove(3)                          # Remove first occurrence
del arr2[1]                             # Delete at index
arr2.clear()                            # Remove all

# Finding Elements
arr2 = [1, 2, 3, 4, 5]
index = arr2.index(3)                   # Find index (raises if not found)
count = arr2.count(3)                   # Count occurrences
exists = 3 in arr2                      # True/False

# Sorting
arr2.sort()                             # In-place ascending
arr2.sort(reverse=True)                 # In-place descending
sorted_arr = sorted(arr2)               # Return new sorted list

# Useful Methods
arr2.reverse()                          # Reverse in-place
copy = arr2.copy()                      # Shallow copy
copy2 = arr2[:]                         # Another way to copy

# List Comprehensions
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
matrix = [[i+j for j in range(3)] for i in range(3)]

# Built-in Functions
print("Max:", max(arr2))
print("Min:", min(arr2))
print("Sum:", sum(arr2))
print("All > 0:", all(x > 0 for x in arr2))
print("Any > 3:", any(x > 3 for x in arr2))

# Map, Filter, Reduce
from functools import reduce
doubled = list(map(lambda x: x * 2, arr2))
filtered = list(filter(lambda x: x > 2, arr2))
total = reduce(lambda a, b: a + b, arr2)

# 2D List
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(f"Matrix[1][2]: {matrix[1][2]}")  # 6

# NumPy (for efficient numerical arrays)
import numpy as np
np_arr = np.array([1, 2, 3, 4, 5])
np_matrix = np.array([[1, 2], [3, 4]])
print("Shape:", np_arr.shape)
print("Dtype:", np_arr.dtype)`,
    },
  ],
  types: [
    {
      name: 'One-Dimensional Array',
      description: 'Simple linear array with elements in a single row. Accessed using one index. Example: arr[5] stores 5 elements.',
    },
    {
      name: 'Two-Dimensional Array (Matrix)',
      description: 'Array with rows and columns, like a table. Accessed using two indices (row, column). Example: matrix[3][4] has 3 rows and 4 columns.',
    },
    {
      name: 'Multi-Dimensional Array',
      description: 'Arrays with three or more dimensions. Used for 3D graphics, scientific simulations. Example: cube[x][y][z].',
    },
    {
      name: 'Dynamic Array',
      description: 'Arrays that can grow or shrink automatically. Examples: vector (C++), ArrayList (Java), list (Python), Array (JavaScript).',
    },
    {
      name: 'Jagged Array',
      description: 'Array of arrays where each row can have different lengths. Useful for triangular data or variable-length rows.',
    },
  ],
  operations: [
    { name: 'Access', description: 'Get element at specific index using arr[i]', timeComplexity: 'O(1)' },
    { name: 'Update', description: 'Modify element at index using arr[i] = value', timeComplexity: 'O(1)' },
    { name: 'Linear Search', description: 'Find element by checking each one', timeComplexity: 'O(n)' },
    { name: 'Binary Search', description: 'Find element in sorted array (divide & conquer)', timeComplexity: 'O(log n)' },
    { name: 'Insert at End', description: 'Add element at the last position', timeComplexity: 'O(1) amortized' },
    { name: 'Insert at Index', description: 'Add element at specific position (shift others)', timeComplexity: 'O(n)' },
    { name: 'Delete at End', description: 'Remove the last element', timeComplexity: 'O(1)' },
    { name: 'Delete at Index', description: 'Remove element at position (shift others)', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Instant access to any element using index - O(1) time',
    'Cache-friendly due to contiguous memory (fast iteration)',
    'Simple and intuitive to understand and use',
    'Memory efficient - no extra space for pointers',
    'Works perfectly with loops and algorithms',
    'Foundation for many other data structures',
  ],
  disadvantages: [
    'Fixed size in static arrays - cannot grow after creation',
    'Expensive insertion/deletion in middle - O(n) shifting',
    'Memory waste if array not fully utilized',
    'All elements must be same type (homogeneous)',
    'Need to know size in advance for static arrays',
  ],
  applications: [
    'Storing and accessing sequential data (lists, tables)',
    'Implementing other structures (stacks, queues, heaps, hash tables)',
    'Matrix operations in graphics and machine learning',
    'Lookup tables for fast data retrieval',
    'Buffer for I/O operations and data streaming',
    'Image representation (2D array of pixels)',
    'Database records and spreadsheet data',
  ],
};
