export const linearSearchContent = {
  id: 'linear-search',
  definition: 'Linear Search (also called Sequential Search) is the simplest searching algorithm that checks every element in a list one by one from the beginning until the desired element is found or the list ends. It works on both sorted and unsorted arrays.',
  keyPoints: [
    'Checks each element sequentially from start to end',
    'Works on unsorted and sorted arrays',
    'Time complexity is O(n) - checks all elements in worst case',
    'Space complexity is O(1) - no extra space needed',
    'Best for small datasets or unsorted data',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// Linear Search function
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // Element found, return index
        }
    }
    return -1;  // Element not found
}

int main() {
    int arr[] = {10, 25, 30, 45, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 30;
    
    int result = linearSearch(arr, n, target);
    
    if (result != -1)
        printf("Element found at index %d\\n", result);
    else
        printf("Element not found\\n");
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>
using namespace std;

// Linear Search function
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;  // Element found, return index
        }
    }
    return -1;  // Element not found
}

int main() {
    vector<int> arr = {10, 25, 30, 45, 50};
    int target = 30;
    
    int result = linearSearch(arr, target);
    
    if (result != -1)
        cout << "Element found at index " << result << endl;
    else
        cout << "Element not found" << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `public class LinearSearch {
    
    // Linear Search function
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Element found, return index
            }
        }
        return -1;  // Element not found
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 25, 30, 45, 50};
        int target = 30;
        
        int result = linearSearch(arr, target);
        
        if (result != -1)
            System.out.println("Element found at index " + result);
        else
            System.out.println("Element not found");
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Linear Search function
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;  // Element found, return index
        }
    }
    return -1;  // Element not found
}

// Example usage
const arr = [10, 25, 30, 45, 50];
const target = 30;

const result = linearSearch(arr, target);

if (result !== -1) {
    console.log(\`Element found at index \${result}\`);
} else {
    console.log("Element not found");
}

// Using built-in method
const index = arr.indexOf(target);
console.log("Using indexOf:", index);`,
    },
    {
      language: 'Python',
      code: `# Linear Search function
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Element found, return index
    return -1  # Element not found

# Example usage
arr = [10, 25, 30, 45, 50]
target = 30

result = linear_search(arr, target)

if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")

# Using built-in method
if target in arr:
    print(f"Using 'in': Found at index {arr.index(target)}")`,
    },
  ],
  types: [
    { name: 'Basic Linear Search', description: 'Search from start to end, return first occurrence index' },
    { name: 'Sentinel Linear Search', description: 'Place target at end to avoid boundary check in loop' },
    { name: 'Recursive Linear Search', description: 'Search using recursion instead of iteration' },
    { name: 'Bidirectional Search', description: 'Search from both ends simultaneously for faster results' },
  ],
  operations: [
    { name: 'Search', description: 'Find element in array', timeComplexity: 'O(n)' },
    { name: 'Best Case', description: 'Element found at first position', timeComplexity: 'O(1)' },
    { name: 'Average Case', description: 'Element found in middle', timeComplexity: 'O(n/2) = O(n)' },
    { name: 'Worst Case', description: 'Element at end or not present', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Simple to understand and implement',
    'Works on unsorted arrays',
    'No preprocessing required',
    'Works on any data type',
    'Good for small datasets',
  ],
  disadvantages: [
    'Slow for large datasets O(n)',
    'Not efficient compared to binary search',
    'Checks every element even if target is early',
    'Performance degrades linearly with size',
  ],
  applications: [
    'Searching in small unsorted lists',
    'Finding element in linked lists',
    'Simple database queries',
    'When data is not sorted',
    'One-time searches where sorting overhead is not worth it',
  ],
};
