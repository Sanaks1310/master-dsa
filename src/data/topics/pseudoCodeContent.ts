import { TopicContent } from '../topicContents';

export const pseudoCodeContent: TopicContent = {
  id: 'pseudo-code',
  definition: 'Pseudo-code is a way to write algorithms using plain language mixed with simple programming-like structures. It is not actual code - you cannot run it on a computer. Instead, it helps you plan and think through your logic before writing real code. Think of it as a rough draft or blueprint for your program.',
  keyPoints: [
    'Written in plain English (or any language you speak)',
    'Uses simple keywords like IF, ELSE, WHILE, FOR, RETURN',
    'No strict syntax rules - focus on logic, not grammar',
    'Helps you think through problems before coding',
    'Easy to convert to any programming language later',
  ],
  syntax: [
    {
      language: 'C',
      code: `/*
PSEUDO-CODE:
-----------
Algorithm: Calculate Average of Numbers

START
    SET sum = 0
    SET count = 0
    
    FOR each number in list:
        ADD number to sum
        INCREMENT count by 1
    END FOR
    
    IF count > 0 THEN
        SET average = sum / count
        RETURN average
    ELSE
        RETURN 0
    END IF
END

Now let's convert to actual C code:
*/

#include <stdio.h>

float calculateAverage(int numbers[], int size) {
    // SET sum = 0
    int sum = 0;
    
    // FOR each number in list
    for (int i = 0; i < size; i++) {
        // ADD number to sum
        sum = sum + numbers[i];
    }
    
    // IF count > 0 THEN average = sum / count
    if (size > 0) {
        return (float)sum / size;
    } else {
        return 0;
    }
}

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int size = 5;
    
    float avg = calculateAverage(numbers, size);
    printf("Average: %.2f\\n", avg); // Output: 30.00
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `/*
PSEUDO-CODE:
-----------
Algorithm: Find if a Number is Prime

START
    INPUT number
    
    IF number <= 1 THEN
        RETURN "Not Prime"
    END IF
    
    FOR i FROM 2 TO square_root(number):
        IF number divisible by i THEN
            RETURN "Not Prime"
        END IF
    END FOR
    
    RETURN "Prime"
END

Now let's convert to actual C++ code:
*/

#include <iostream>
#include <cmath>
using namespace std;

string isPrime(int number) {
    // IF number <= 1 THEN RETURN "Not Prime"
    if (number <= 1) {
        return "Not Prime";
    }
    
    // FOR i FROM 2 TO square_root(number)
    for (int i = 2; i <= sqrt(number); i++) {
        // IF number divisible by i
        if (number % i == 0) {
            return "Not Prime";
        }
    }
    
    return "Prime";
}

int main() {
    cout << "7 is: " << isPrime(7) << endl;   // Prime
    cout << "12 is: " << isPrime(12) << endl; // Not Prime
    cout << "23 is: " << isPrime(23) << endl; // Prime
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `/*
PSEUDO-CODE:
-----------
Algorithm: Reverse a String

START
    INPUT originalString
    SET reversedString = empty
    
    FOR i FROM last_index DOWN TO 0:
        APPEND character at position i to reversedString
    END FOR
    
    RETURN reversedString
END

Now let's convert to actual Java code:
*/

public class ReverseString {
    
    public static String reverseString(String original) {
        // SET reversedString = empty
        String reversed = "";
        
        // FOR i FROM last_index DOWN TO 0
        for (int i = original.length() - 1; i >= 0; i--) {
            // APPEND character at position i
            reversed = reversed + original.charAt(i);
        }
        
        // RETURN reversedString
        return reversed;
    }
    
    public static void main(String[] args) {
        String text = "Hello";
        String result = reverseString(text);
        
        System.out.println("Original: " + text);    // Hello
        System.out.println("Reversed: " + result);  // olleH
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `/*
PSEUDO-CODE:
-----------
Algorithm: Count Vowels in a String

START
    INPUT text
    SET vowels = "aeiouAEIOU"
    SET count = 0
    
    FOR each character in text:
        IF character is in vowels THEN
            INCREMENT count by 1
        END IF
    END FOR
    
    RETURN count
END

Now let's convert to actual JavaScript code:
*/

function countVowels(text) {
    // SET vowels = "aeiouAEIOU"
    const vowels = "aeiouAEIOU";
    
    // SET count = 0
    let count = 0;
    
    // FOR each character in text
    for (let char of text) {
        // IF character is in vowels THEN INCREMENT count
        if (vowels.includes(char)) {
            count = count + 1;
        }
    }
    
    // RETURN count
    return count;
}

// Test the function
const sentence = "Hello World";
const vowelCount = countVowels(sentence);

console.log(\`Text: "\${sentence}"\`);
console.log(\`Vowel count: \${vowelCount}\`);  // Output: 3`,
    },
    {
      language: 'Python',
      code: `"""
PSEUDO-CODE:
-----------
Algorithm: Find Maximum in a List

START
    INPUT list_of_numbers
    
    IF list is empty THEN
        RETURN None
    END IF
    
    SET maximum = first element of list
    
    FOR each number in list (starting from second):
        IF number > maximum THEN
            SET maximum = number
        END IF
    END FOR
    
    RETURN maximum
END

Now let's convert to actual Python code:
"""

def find_maximum(numbers):
    # IF list is empty THEN RETURN None
    if len(numbers) == 0:
        return None
    
    # SET maximum = first element of list
    maximum = numbers[0]
    
    # FOR each number in list
    for number in numbers:
        # IF number > maximum THEN SET maximum = number
        if number > maximum:
            maximum = number
    
    # RETURN maximum
    return maximum

# Test the function
my_list = [34, 12, 89, 45, 67, 23]
result = find_maximum(my_list)

print(f"List: {my_list}")
print(f"Maximum: {result}")  # Output: 89`,
    },
  ],
  types: [
    { 
      name: 'Algorithm Pseudo-code', 
      description: 'Step-by-step description of how to solve a problem. Most common type.' 
    },
    { 
      name: 'Structured Pseudo-code', 
      description: 'Uses indentation and keywords (IF, WHILE, FOR) to show program flow.' 
    },
    { 
      name: 'Natural Language', 
      description: 'Written entirely in plain English sentences. Easy to understand but less precise.' 
    },
    { 
      name: 'Mathematical Pseudo-code', 
      description: 'Uses mathematical notation for formulas and equations.' 
    },
  ],
  operations: [
    { name: 'INPUT/READ', description: 'Get data from user or file', timeComplexity: 'N/A' },
    { name: 'OUTPUT/PRINT', description: 'Display results to user', timeComplexity: 'N/A' },
    { name: 'SET/ASSIGN', description: 'Store a value in a variable', timeComplexity: 'N/A' },
    { name: 'IF-THEN-ELSE', description: 'Make decisions based on conditions', timeComplexity: 'N/A' },
    { name: 'WHILE/FOR', description: 'Repeat steps multiple times', timeComplexity: 'N/A' },
    { name: 'RETURN', description: 'Send back a result and end', timeComplexity: 'N/A' },
  ],
  advantages: [
    'No syntax errors - focus on logic only',
    'Language-independent - convert to any language',
    'Easy to understand even for non-programmers',
    'Great for planning before coding',
    'Helps communicate ideas in teams',
  ],
  disadvantages: [
    'Cannot be executed on a computer directly',
    'No standard rules - everyone writes differently',
    'May miss edge cases that real code catches',
    'Still needs translation to actual code',
    'Can become vague if not written carefully',
  ],
  applications: [
    'Planning algorithms before implementation',
    'Explaining logic in textbooks and tutorials',
    'Technical interviews to discuss approach',
    'Documentation for complex systems',
    'Teaching programming concepts to beginners',
  ],
};
