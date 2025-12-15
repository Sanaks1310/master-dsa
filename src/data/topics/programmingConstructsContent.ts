import { TopicContent } from '../topicContents';

export const programmingConstructsContent: TopicContent = {
  id: 'programming-constructs',
  definition: 'Programming constructs are the basic building blocks used to write any program. They are like LEGO blocks - simple pieces that combine to build complex things. There are four main constructs: Variables (to store data), Conditions (to make decisions), Loops (to repeat actions), and Functions (to organize and reuse code).',
  keyPoints: [
    'Variables store data like numbers, text, or true/false values',
    'Conditions (if-else) let your program make decisions',
    'Loops (for, while) repeat code multiple times without rewriting',
    'Functions group code together so you can reuse it',
    'All programs, no matter how complex, use these four constructs',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>

// ========== 1. VARIABLES ==========
// Variables are containers that store data

int main() {
    // Different types of variables
    int age = 25;              // Whole numbers
    float price = 19.99;       // Decimal numbers
    char grade = 'A';          // Single character
    char name[] = "Alice";     // Text (string)
    
    printf("Name: %s, Age: %d\\n", name, age);
    
    // ========== 2. CONDITIONS ==========
    // Make decisions based on conditions
    
    int score = 85;
    
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }
    
    // ========== 3. LOOPS ==========
    // Repeat actions multiple times
    
    // FOR loop - when you know how many times
    printf("Counting: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    // WHILE loop - when you don't know how many times
    int countdown = 3;
    while (countdown > 0) {
        printf("Countdown: %d\\n", countdown);
        countdown--;
    }
    printf("Blast off!\\n");
    
    return 0;
}

// ========== 4. FUNCTIONS ==========
// Reusable blocks of code

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

// Call functions: add(5, 3) returns 8`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <string>
using namespace std;

// ========== 4. FUNCTIONS ==========
// Reusable blocks of code - defined first

int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    // ========== 1. VARIABLES ==========
    // Variables are containers that store data
    
    int age = 25;              // Whole numbers
    double price = 19.99;      // Decimal numbers
    char grade = 'A';          // Single character
    string name = "Alice";     // Text (string)
    bool isStudent = true;     // True or False
    
    cout << "Name: " << name << ", Age: " << age << endl;
    
    // ========== 2. CONDITIONS ==========
    // Make decisions based on conditions
    
    int score = 85;
    
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else if (score >= 70) {
        cout << "Grade: C" << endl;
    } else {
        cout << "Grade: F" << endl;
    }
    
    // Ternary operator - short if-else
    string result = (score >= 60) ? "Pass" : "Fail";
    cout << "Result: " << result << endl;
    
    // ========== 3. LOOPS ==========
    // Repeat actions multiple times
    
    // FOR loop - when you know how many times
    cout << "Counting: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // WHILE loop - when condition is true
    int countdown = 3;
    while (countdown > 0) {
        cout << "Countdown: " << countdown << endl;
        countdown--;
    }
    cout << "Blast off!" << endl;
    
    // Using functions
    cout << "5 + 3 = " << add(5, 3) << endl;
    greet("Bob");
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `public class ProgrammingConstructs {
    
    // ========== 4. FUNCTIONS (Methods in Java) ==========
    // Reusable blocks of code
    
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
    
    public static void main(String[] args) {
        // ========== 1. VARIABLES ==========
        // Variables are containers that store data
        
        int age = 25;              // Whole numbers
        double price = 19.99;      // Decimal numbers
        char grade = 'A';          // Single character
        String name = "Alice";     // Text (string)
        boolean isStudent = true;  // True or False
        
        System.out.println("Name: " + name + ", Age: " + age);
        
        // ========== 2. CONDITIONS ==========
        // Make decisions based on conditions
        
        int score = 85;
        
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
        
        // Switch statement - for multiple choices
        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }
        
        // ========== 3. LOOPS ==========
        // Repeat actions multiple times
        
        // FOR loop
        System.out.print("Counting: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        // WHILE loop
        int countdown = 3;
        while (countdown > 0) {
            System.out.println("Countdown: " + countdown);
            countdown--;
        }
        System.out.println("Blast off!");
        
        // Using methods
        System.out.println("5 + 3 = " + add(5, 3));
        greet("Bob");
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// ========== 1. VARIABLES ==========
// Variables are containers that store data

let age = 25;              // Can be changed later
const name = "Alice";      // Cannot be changed (constant)
var oldStyle = "avoid";    // Old way, avoid using

// Different data types
let price = 19.99;         // Number (no int/float distinction)
let isStudent = true;      // Boolean (true/false)
let items = [1, 2, 3];     // Array (list)
let person = {             // Object (key-value pairs)
    name: "Bob",
    age: 30
};

console.log(\`Name: \${name}, Age: \${age}\`);

// ========== 2. CONDITIONS ==========
// Make decisions based on conditions

let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// Ternary operator - short if-else
let result = score >= 60 ? "Pass" : "Fail";
console.log(\`Result: \${result}\`);

// ========== 3. LOOPS ==========
// Repeat actions multiple times

// FOR loop - when you know how many times
console.log("Counting:");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// FOR...OF loop - iterate over array items
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
    console.log(\`Fruit: \${fruit}\`);
}

// WHILE loop - when condition is true
let countdown = 3;
while (countdown > 0) {
    console.log(\`Countdown: \${countdown}\`);
    countdown--;
}
console.log("Blast off!");

// ========== 4. FUNCTIONS ==========
// Reusable blocks of code

// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function (modern way)
const multiply = (a, b) => a * b;

// Function with default parameter
const greet = (name = "Guest") => {
    console.log(\`Hello, \${name}!\`);
};

// Using functions
console.log(\`5 + 3 = \${add(5, 3)}\`);
console.log(\`5 * 3 = \${multiply(5, 3)}\`);
greet("Bob");
greet(); // Uses default "Guest"`,
    },
    {
      language: 'Python',
      code: `# ========== 1. VARIABLES ==========
# Variables are containers that store data
# Python automatically detects the type

age = 25              # Integer (whole number)
price = 19.99         # Float (decimal number)
name = "Alice"        # String (text)
is_student = True     # Boolean (True/False)
items = [1, 2, 3]     # List (array)
person = {            # Dictionary (key-value pairs)
    "name": "Bob",
    "age": 30
}

print(f"Name: {name}, Age: {age}")

# ========== 2. CONDITIONS ==========
# Make decisions based on conditions

score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")

# Ternary operator - short if-else
result = "Pass" if score >= 60 else "Fail"
print(f"Result: {result}")

# ========== 3. LOOPS ==========
# Repeat actions multiple times

# FOR loop - iterate over a range
print("Counting:")
for i in range(1, 6):  # 1 to 5
    print(i)

# FOR loop - iterate over a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"Fruit: {fruit}")

# WHILE loop - when condition is true
countdown = 3
while countdown > 0:
    print(f"Countdown: {countdown}")
    countdown -= 1
print("Blast off!")

# ========== 4. FUNCTIONS ==========
# Reusable blocks of code

# Simple function
def add(a, b):
    return a + b

# Function with default parameter
def greet(name="Guest"):
    print(f"Hello, {name}!")

# Function with multiple returns
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

# Using functions
print(f"5 + 3 = {add(5, 3)}")
greet("Bob")
greet()  # Uses default "Guest"

# Using multiple return values
minimum, maximum, total = get_stats([5, 2, 8, 1, 9])
print(f"Min: {minimum}, Max: {maximum}, Sum: {total}")`,
    },
  ],
  types: [
    { 
      name: 'Variables & Data Types', 
      description: 'Containers to store data: numbers (int, float), text (string), true/false (boolean), and collections (arrays, objects).' 
    },
    { 
      name: 'Conditional Statements', 
      description: 'IF-ELSE, SWITCH statements that let your program make decisions based on conditions.' 
    },
    { 
      name: 'Loops (Iteration)', 
      description: 'FOR, WHILE, DO-WHILE loops that repeat code until a condition is met.' 
    },
    { 
      name: 'Functions/Methods', 
      description: 'Reusable blocks of code that perform specific tasks. Can take inputs (parameters) and return outputs.' 
    },
  ],
  operations: [
    { name: 'Declaration', description: 'Create a variable with a name', timeComplexity: 'O(1)' },
    { name: 'Assignment', description: 'Store a value in variable', timeComplexity: 'O(1)' },
    { name: 'Comparison', description: 'Check if condition is true/false', timeComplexity: 'O(1)' },
    { name: 'Iteration', description: 'Execute loop body once', timeComplexity: 'O(1)' },
    { name: 'Function Call', description: 'Jump to function and execute', timeComplexity: 'Varies' },
    { name: 'Return', description: 'Send value back from function', timeComplexity: 'O(1)' },
  ],
  advantages: [
    'Variables let you store and reuse data',
    'Conditions make programs smart and responsive',
    'Loops save you from writing repetitive code',
    'Functions make code organized and reusable',
    'These constructs exist in ALL programming languages',
  ],
  disadvantages: [
    'Wrong variable types can cause errors',
    'Infinite loops can crash your program',
    'Deeply nested conditions are hard to read',
    'Too many functions can over-complicate simple code',
    'Understanding scope of variables can be tricky',
  ],
  applications: [
    'Variables - Store user input, game scores, settings',
    'Conditions - Login validation, game rules, form checks',
    'Loops - Process lists, repeat animations, retry failed operations',
    'Functions - Calculate totals, validate data, format output',
    'Combined - Every program uses all four together!',
  ],
};
