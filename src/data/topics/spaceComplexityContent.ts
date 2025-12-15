import { TopicContent } from '../topicContents';

export const spaceComplexityContent: TopicContent = {
  id: 'space-complexity',
  definition: 'Space Complexity measures the total amount of memory an algorithm needs to run, including both the input data and any extra space used during execution. Think of it like packing for a trip - you need to consider both what you bring and any extra bags you might need along the way.',
  keyPoints: [
    'Measures memory usage as a function of input size',
    'Includes both auxiliary space and input space',
    'Auxiliary space is the extra space used by algorithm',
    'Important when memory is limited (embedded systems, mobile)',
    'Trade-off often exists between time and space',
  ],
  syntax: [
    {
      language: 'C',
      code: `// O(1) Space - Constant: Uses fixed extra memory
int sumArray(int arr[], int n) {
    int sum = 0;  // Only one extra variable
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return sum;  // Total extra space: O(1)
}

// O(n) Space - Linear: Extra memory grows with input
int* copyArray(int arr[], int n) {
    int* newArr = (int*)malloc(n * sizeof(int));  // n extra spaces
    for (int i = 0; i < n; i++) {
        newArr[i] = arr[i];
    }
    return newArr;  // Total extra space: O(n)
}

// O(n) Space - Recursion uses stack memory
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // n function calls on stack
}

// O(n²) Space - 2D array
int** create2DArray(int rows, int cols) {
    int** matrix = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
    }
    return matrix;  // Total space: O(rows × cols)
}`,
    },
    {
      language: 'C++',
      code: `#include <vector>
using namespace std;

// O(1) Space - Constant
int sumArray(vector<int>& arr) {
    int sum = 0;  // Only one extra variable
    for (int num : arr) {
        sum += num;
    }
    return sum;
}

// O(n) Space - Linear
vector<int> copyArray(vector<int>& arr) {
    vector<int> newArr(arr.size());  // n extra spaces
    for (int i = 0; i < arr.size(); i++) {
        newArr[i] = arr[i];
    }
    return newArr;
}

// O(n) Space - Recursion
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // n calls on stack
}

// O(1) Space - In-place reversal
void reverseInPlace(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}

// O(n) Space - Creating new reversed array
vector<int> reverseWithCopy(vector<int>& arr) {
    vector<int> reversed;
    for (int i = arr.size() - 1; i >= 0; i--) {
        reversed.push_back(arr[i]);
    }
    return reversed;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.*;

public class SpaceComplexity {
    // O(1) Space - Constant
    public static int sumArray(int[] arr) {
        int sum = 0;  // Only one extra variable
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
    
    // O(n) Space - Linear
    public static int[] copyArray(int[] arr) {
        int[] newArr = new int[arr.length];  // n extra spaces
        for (int i = 0; i < arr.length; i++) {
            newArr[i] = arr[i];
        }
        return newArr;
    }
    
    // O(n) Space - Recursion uses stack
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    // O(1) Space - In-place modification
    public static void reverseInPlace(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
    
    // O(n) Space - HashMap storage
    public static Map<Integer, Integer> countElements(int[] arr) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int num : arr) {
            counts.put(num, counts.getOrDefault(num, 0) + 1);
        }
        return counts;  // Worst case: n unique elements
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// O(1) Space - Constant
function sumArray(arr) {
    let sum = 0;  // Only one extra variable
    for (const num of arr) {
        sum += num;
    }
    return sum;
}

// O(n) Space - Linear
function copyArray(arr) {
    const newArr = [];  // n extra spaces
    for (const num of arr) {
        newArr.push(num);
    }
    return newArr;
}

// O(n) Space - Recursion
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // n calls on stack
}

// O(1) Space - In-place reversal
function reverseInPlace(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

// O(n) Space - Using extra storage
function countElements(arr) {
    const counts = {};  // Worst case: n unique keys
    for (const num of arr) {
        counts[num] = (counts[num] || 0) + 1;
    }
    return counts;
}`,
    },
    {
      language: 'Python',
      code: `# O(1) Space - Constant
def sum_array(arr):
    total = 0  # Only one extra variable
    for num in arr:
        total += num
    return total

# O(n) Space - Linear
def copy_array(arr):
    new_arr = []  # n extra spaces
    for num in arr:
        new_arr.append(num)
    return new_arr

# O(n) Space - Recursion uses stack
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # n calls on stack

# O(1) Space - In-place reversal
def reverse_in_place(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

# O(n) Space - Using dictionary
def count_elements(arr):
    counts = {}  # Worst case: n unique keys
    for num in arr:
        counts[num] = counts.get(num, 0) + 1
    return counts

# Comparing in-place vs copy
original = [1, 2, 3, 4, 5]
# copy_array: O(n) space - creates new list
# reverse_in_place: O(1) space - modifies original`,
    },
  ],
  types: [
    { name: 'O(1) - Constant Space', description: 'Fixed amount of extra memory regardless of input size.' },
    { name: 'O(log n) - Logarithmic Space', description: 'Space grows slowly, often seen in recursive divide-and-conquer.' },
    { name: 'O(n) - Linear Space', description: 'Extra space proportional to input size.' },
    { name: 'O(n²) - Quadratic Space', description: 'Space grows squared, often for 2D arrays or matrices.' },
  ],
  operations: [
    { name: 'Variable Declaration', description: 'Fixed number of variables', timeComplexity: 'O(1) space' },
    { name: 'Array Copy', description: 'Creating copy of array', timeComplexity: 'O(n) space' },
    { name: 'Recursive Call', description: 'Each call adds to stack', timeComplexity: 'O(depth) space' },
    { name: 'Hash Map', description: 'Storing key-value pairs', timeComplexity: 'O(n) space' },
    { name: 'Matrix Creation', description: 'Creating n×m matrix', timeComplexity: 'O(n×m) space' },
  ],
  advantages: [
    'Critical for memory-constrained environments',
    'In-place algorithms save memory',
    'Helps design efficient data pipelines',
    'Important for embedded systems programming',
    'Essential for processing large datasets',
  ],
  disadvantages: [
    'Low space often means higher time complexity',
    'In-place algorithms can be harder to implement',
    'Recursion hidden space is often overlooked',
    'May sacrifice code readability',
    'Trade-offs with time complexity needed',
  ],
  applications: [
    'Mobile app development with limited memory',
    'Embedded systems and IoT devices',
    'Big data processing pipelines',
    'Game development optimization',
    'Database management systems',
  ],
};
