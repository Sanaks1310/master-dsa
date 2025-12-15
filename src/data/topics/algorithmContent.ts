import { TopicContent } from '../topicContents';

export const algorithmContent: TopicContent = {
  id: 'what-is-algorithm',
  definition: 'An algorithm is a step-by-step set of instructions to solve a specific problem or perform a task. Think of it like a recipe - it tells you exactly what to do, in what order, to get the result you want. Every algorithm takes some input, processes it following the steps, and produces an output.',
  keyPoints: [
    'An algorithm must have a clear starting point and ending point',
    'Each step must be precise and unambiguous (no confusion)',
    'It must produce the correct output for any valid input',
    'It should complete in a finite amount of time',
    'An algorithm can be written in any language or even plain English',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Algorithm: Find the largest of three numbers

#include <stdio.h>

int findLargest(int a, int b, int c) {
    // Step 1: Assume first number is largest
    int largest = a;
    
    // Step 2: Compare with second number
    if (b > largest) {
        largest = b;
    }
    
    // Step 3: Compare with third number
    if (c > largest) {
        largest = c;
    }
    
    // Step 4: Return the largest
    return largest;
}

int main() {
    int num1 = 10, num2 = 25, num3 = 15;
    
    int result = findLargest(num1, num2, num3);
    printf("Largest number is: %d\\n", result);
    // Output: Largest number is: 25
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Algorithm: Find the largest of three numbers

#include <iostream>
using namespace std;

int findLargest(int a, int b, int c) {
    // Step 1: Assume first number is largest
    int largest = a;
    
    // Step 2: Compare with second number
    if (b > largest) {
        largest = b;
    }
    
    // Step 3: Compare with third number
    if (c > largest) {
        largest = c;
    }
    
    // Step 4: Return the largest
    return largest;
}

int main() {
    int num1 = 10, num2 = 25, num3 = 15;
    
    int result = findLargest(num1, num2, num3);
    cout << "Largest number is: " << result << endl;
    // Output: Largest number is: 25
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Algorithm: Find the largest of three numbers

public class FindLargest {
    
    public static int findLargest(int a, int b, int c) {
        // Step 1: Assume first number is largest
        int largest = a;
        
        // Step 2: Compare with second number
        if (b > largest) {
            largest = b;
        }
        
        // Step 3: Compare with third number
        if (c > largest) {
            largest = c;
        }
        
        // Step 4: Return the largest
        return largest;
    }
    
    public static void main(String[] args) {
        int num1 = 10, num2 = 25, num3 = 15;
        
        int result = findLargest(num1, num2, num3);
        System.out.println("Largest number is: " + result);
        // Output: Largest number is: 25
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Algorithm: Find the largest of three numbers

function findLargest(a, b, c) {
    // Step 1: Assume first number is largest
    let largest = a;
    
    // Step 2: Compare with second number
    if (b > largest) {
        largest = b;
    }
    
    // Step 3: Compare with third number
    if (c > largest) {
        largest = c;
    }
    
    // Step 4: Return the largest
    return largest;
}

// Example usage
const num1 = 10, num2 = 25, num3 = 15;

const result = findLargest(num1, num2, num3);
console.log("Largest number is:", result);
// Output: Largest number is: 25`,
    },
    {
      language: 'Python',
      code: `# Algorithm: Find the largest of three numbers

def find_largest(a, b, c):
    # Step 1: Assume first number is largest
    largest = a
    
    # Step 2: Compare with second number
    if b > largest:
        largest = b
    
    # Step 3: Compare with third number
    if c > largest:
        largest = c
    
    # Step 4: Return the largest
    return largest

# Example usage
num1, num2, num3 = 10, 25, 15

result = find_largest(num1, num2, num3)
print(f"Largest number is: {result}")
# Output: Largest number is: 25`,
    },
  ],
  types: [
    { 
      name: 'Sequential Algorithm', 
      description: 'Steps are executed one after another in order. Like following a recipe from start to finish.' 
    },
    { 
      name: 'Conditional Algorithm', 
      description: 'Makes decisions based on conditions. Like "if it rains, take umbrella, else wear sunglasses".' 
    },
    { 
      name: 'Iterative Algorithm', 
      description: 'Repeats steps until a condition is met. Like stirring soup until it boils.' 
    },
    { 
      name: 'Recursive Algorithm', 
      description: 'Solves problem by calling itself with smaller input. Like Russian nesting dolls.' 
    },
  ],
  operations: [
    { name: 'Input', description: 'Receive data to process', timeComplexity: 'Varies' },
    { name: 'Process', description: 'Execute the steps on data', timeComplexity: 'Varies' },
    { name: 'Output', description: 'Return or display the result', timeComplexity: 'Varies' },
    { name: 'Decision', description: 'Choose path based on condition', timeComplexity: 'O(1)' },
    { name: 'Loop', description: 'Repeat steps multiple times', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Provides a clear roadmap to solve problems',
    'Can be analyzed for efficiency before coding',
    'Language-independent - write once, implement anywhere',
    'Makes complex problems manageable by breaking into steps',
    'Easy to communicate ideas between developers',
  ],
  disadvantages: [
    'Writing efficient algorithms requires practice',
    'Complex problems may have very complex algorithms',
    'One algorithm may not work for all similar problems',
    'Translating algorithm to code can introduce bugs',
    'Finding the optimal algorithm can be time-consuming',
  ],
  applications: [
    'Google Search - finds relevant pages in milliseconds',
    'GPS Navigation - calculates shortest route',
    'Social Media Feed - decides what posts to show you',
    'Online Shopping - recommends products you might like',
    'Spell Checker - suggests correct spellings',
  ],
};
