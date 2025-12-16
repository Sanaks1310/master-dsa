import { TopicContent } from '../topicContents';

export const stringsContent: TopicContent = {
  id: 'strings',
  definition: 'A String is a sequence of characters used to represent text. In most programming languages, strings are stored as arrays of characters. Each character has a position (index) and can be accessed individually. Strings are fundamental for handling text data like names, messages, file contents, and user input.',
  keyPoints: [
    'Sequence of characters (letters, numbers, symbols)',
    'Immutable in many languages (cannot change after creation)',
    'Zero-indexed - first character is at position 0',
    'Special characters handled with escape sequences (\\n, \\t)',
    'Can be compared, searched, and manipulated',
    'Concatenation joins strings together',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    // String Declaration
    char str1[] = "Hello";              // Array of chars
    char str2[20] = "World";            // With max size
    char str3[] = {'H', 'i', '\\0'};     // Explicit null terminator
    
    // String Length
    int len = strlen(str1);             // 5 (excludes \\0)
    printf("Length: %d\\n", len);
    
    // String Copy
    char dest[20];
    strcpy(dest, str1);                 // Copy str1 to dest
    strncpy(dest, str1, 3);             // Copy first 3 chars
    
    // String Concatenation
    char result[50] = "";
    strcat(result, str1);               // result = "Hello"
    strcat(result, " ");                // result = "Hello "
    strcat(result, str2);               // result = "Hello World"
    printf("Combined: %s\\n", result);
    
    // String Comparison
    int cmp = strcmp(str1, str2);       // <0, 0, or >0
    if (cmp == 0) printf("Equal\\n");
    else if (cmp < 0) printf("str1 < str2\\n");
    else printf("str1 > str2\\n");
    
    // String Search
    char *pos = strstr(result, "World"); // Find substring
    if (pos != NULL) {
        printf("Found at position: %ld\\n", pos - result);
    }
    
    char *chr = strchr(str1, 'l');      // Find character
    
    // Character Access
    char first = str1[0];               // 'H'
    char last = str1[strlen(str1) - 1]; // 'o'
    
    // Character Functions
    printf("Is alpha: %d\\n", isalpha('A'));   // 1
    printf("Is digit: %d\\n", isdigit('5'));   // 1
    printf("To upper: %c\\n", toupper('a'));   // 'A'
    printf("To lower: %c\\n", tolower('Z'));   // 'z'
    
    // String to Number
    int num = atoi("123");              // 123
    double dbl = atof("3.14");          // 3.14
    
    // Number to String
    char buffer[20];
    sprintf(buffer, "%d", 42);          // "42"
    
    // Reverse String (manual)
    void reverse(char *s) {
        int left = 0, right = strlen(s) - 1;
        while (left < right) {
            char temp = s[left];
            s[left++] = s[right];
            s[right--] = temp;
        }
    }
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

int main() {
    // String Declaration
    string str1 = "Hello";
    string str2("World");
    string str3(5, '*');                // "*****"
    
    // String Length
    cout << "Length: " << str1.length() << endl;  // 5
    cout << "Size: " << str1.size() << endl;      // Same as length
    cout << "Empty: " << str1.empty() << endl;    // false
    
    // Accessing Characters
    char first = str1[0];               // 'H' (no bounds check)
    char safe = str1.at(0);             // 'H' (with bounds check)
    char front = str1.front();          // 'H'
    char back = str1.back();            // 'o'
    
    // Modifying Strings
    str1[0] = 'J';                       // "Jello"
    str1 = "Hello";                      // Reset
    
    // Concatenation
    string combined = str1 + " " + str2; // "Hello World"
    str1 += "!";                         // "Hello!"
    str1.append(" World");               // Append string
    
    // Substring
    string sub = combined.substr(0, 5);  // "Hello"
    string sub2 = combined.substr(6);    // "World"
    
    // Find
    size_t pos = combined.find("World"); // Position or string::npos
    if (pos != string::npos) {
        cout << "Found at: " << pos << endl;
    }
    size_t last = combined.rfind("o");   // Find last occurrence
    
    // Replace
    string text = "Hello World";
    text.replace(6, 5, "C++");          // "Hello C++"
    
    // Insert & Erase
    text.insert(5, "++");               // Insert at position
    text.erase(5, 2);                   // Erase 2 chars from pos 5
    
    // Compare
    if (str1 == str2) cout << "Equal\\n";
    if (str1 < str2) cout << "str1 < str2\\n";
    int cmp = str1.compare(str2);       // <0, 0, or >0
    
    // Transform
    transform(str1.begin(), str1.end(), str1.begin(), ::toupper);
    transform(str1.begin(), str1.end(), str1.begin(), ::tolower);
    
    // Reverse
    reverse(str1.begin(), str1.end());
    
    // String to Number
    int num = stoi("123");
    double dbl = stod("3.14");
    
    // Number to String
    string numStr = to_string(42);
    
    // String Stream
    stringstream ss;
    ss << "Value: " << 42 << " Pi: " << 3.14;
    string result = ss.str();
    
    // Split String (using stringstream)
    string sentence = "Hello World C++";
    stringstream sstream(sentence);
    string word;
    while (sstream >> word) {
        cout << word << endl;
    }
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `public class StringExample {
    public static void main(String[] args) {
        // String Declaration (Immutable)
        String str1 = "Hello";
        String str2 = new String("World");
        
        // String Length
        int len = str1.length();            // 5
        boolean empty = str1.isEmpty();     // false
        boolean blank = "  ".isBlank();     // true (Java 11+)
        
        // Accessing Characters
        char first = str1.charAt(0);        // 'H'
        char[] chars = str1.toCharArray();  // Convert to char array
        
        // Concatenation
        String combined = str1 + " " + str2;         // "Hello World"
        String concat = str1.concat(" World");       // "Hello World"
        String joined = String.join("-", "a", "b");  // "a-b"
        
        // Substring
        String sub1 = combined.substring(0, 5);      // "Hello"
        String sub2 = combined.substring(6);         // "World"
        
        // Find
        int pos = combined.indexOf("World");         // 6 or -1
        int lastPos = combined.lastIndexOf("o");     // 7
        boolean contains = combined.contains("World"); // true
        boolean starts = combined.startsWith("Hello"); // true
        boolean ends = combined.endsWith("World");   // true
        
        // Replace
        String replaced = combined.replace("World", "Java");  // "Hello Java"
        String noSpaces = "a b c".replace(" ", "");  // "abc"
        String regexReplace = "a1b2c3".replaceAll("[0-9]", ""); // "abc"
        
        // Compare (ALWAYS use equals for content comparison!)
        boolean equal = str1.equals(str2);           // false
        boolean equalIgnore = str1.equalsIgnoreCase("hello"); // true
        int cmp = str1.compareTo(str2);              // <0, 0, or >0
        
        // Transform
        String upper = str1.toUpperCase();           // "HELLO"
        String lower = str1.toLowerCase();           // "hello"
        String trimmed = "  hi  ".trim();            // "hi"
        String stripped = "  hi  ".strip();          // "hi" (Unicode-aware)
        
        // Split
        String[] words = "Hello World Java".split(" ");
        // words = ["Hello", "World", "Java"]
        
        // StringBuilder (Mutable - for efficiency)
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        sb.reverse();                                // "dlroW olleH"
        sb.reverse();                                // Back to normal
        String result = sb.toString();
        
        // String Formatting
        String formatted = String.format("Name: %s, Age: %d", "Alice", 25);
        // "Name: Alice, Age: 25"
        
        // Conversion
        int num = Integer.parseInt("123");
        double dbl = Double.parseDouble("3.14");
        String numStr = String.valueOf(42);
        String numStr2 = Integer.toString(42);
        
        // Character checks
        boolean isLetter = Character.isLetter('A');  // true
        boolean isDigit = Character.isDigit('5');    // true
        char upper2 = Character.toUpperCase('a');    // 'A'
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// String Declaration
let str1 = "Hello";
let str2 = 'World';
let str3 = \`Template literal\`;  // Backticks for template strings

// String Length
console.log(str1.length);       // 5

// Accessing Characters
let first = str1[0];            // 'H'
let charAt = str1.charAt(0);    // 'H'
let last = str1[str1.length-1]; // 'o'

// Concatenation
let combined = str1 + " " + str2;           // "Hello World"
let concat = str1.concat(" ", str2);        // "Hello World"
let template = \`\${str1} \${str2}\`;           // "Hello World"

// Substring
let sub1 = combined.substring(0, 5);        // "Hello"
let sub2 = combined.slice(6);               // "World"
let sub3 = combined.slice(-5);              // "World" (from end)

// Find
let pos = combined.indexOf("World");        // 6 (-1 if not found)
let lastPos = combined.lastIndexOf("o");    // 7
let includes = combined.includes("World");  // true
let starts = combined.startsWith("Hello");  // true
let ends = combined.endsWith("World");      // true

// Replace
let replaced = combined.replace("World", "JS");    // "Hello JS"
let allReplaced = "a-b-c".replaceAll("-", "_");   // "a_b_c"
let regexReplace = "a1b2c3".replace(/[0-9]/g, ""); // "abc"

// Compare
let equal = str1 === str2;                  // false
let localCompare = str1.localeCompare(str2); // -1, 0, or 1

// Transform
let upper = str1.toUpperCase();             // "HELLO"
let lower = str1.toLowerCase();             // "hello"
let trimmed = "  hi  ".trim();              // "hi"
let trimStart = "  hi  ".trimStart();       // "hi  "
let trimEnd = "  hi  ".trimEnd();           // "  hi"

// Split & Join
let words = "Hello World JS".split(" ");    // ["Hello", "World", "JS"]
let joined = words.join("-");               // "Hello-World-JS"
let chars = str1.split("");                 // ["H", "e", "l", "l", "o"]

// Reverse (strings are immutable)
let reversed = str1.split("").reverse().join(""); // "olleH"

// Repeat & Pad
let repeated = "ab".repeat(3);              // "ababab"
let padStart = "5".padStart(3, "0");        // "005"
let padEnd = "5".padEnd(3, "0");            // "500"

// Character Code
let charCode = str1.charCodeAt(0);          // 72 (ASCII of 'H')
let fromCode = String.fromCharCode(72);     // 'H'

// Type Conversion
let num = parseInt("123");                  // 123
let float = parseFloat("3.14");             // 3.14
let numStr = String(42);                    // "42"
let numStr2 = (42).toString();              // "42"

// Regular Expressions
let matches = "test@email.com".match(/\\w+/g);  // ["test", "email", "com"]
let isValid = /^\\d+$/.test("123");          // true (only digits)

// Template Literals (String Interpolation)
let name = "Alice";
let age = 25;
let message = \`Name: \${name}, Age: \${age}\`;

// Multiline Strings
let multiline = \`
  Line 1
  Line 2
  Line 3
\`;

// Useful Examples
let isAlpha = (char) => /[a-zA-Z]/.test(char);
let isDigit = (char) => /[0-9]/.test(char);
console.log(isAlpha('A'));  // true
console.log(isDigit('5'));  // true`,
    },
    {
      language: 'Python',
      code: `# String Declaration
str1 = "Hello"
str2 = 'World'
str3 = """Multi-line
string"""

# String Length
length = len(str1)              # 5

# Accessing Characters
first = str1[0]                 # 'H'
last = str1[-1]                 # 'o' (negative indexing!)

# Slicing [start:end:step]
sub1 = str1[0:3]                # "Hel"
sub2 = str1[2:]                 # "llo"
sub3 = str1[:3]                 # "Hel"
reversed_str = str1[::-1]       # "olleH"
every_second = str1[::2]        # "Hlo"

# Concatenation
combined = str1 + " " + str2    # "Hello World"
repeated = "ab" * 3             # "ababab"

# String Formatting
name, age = "Alice", 25
f_string = f"Name: {name}, Age: {age}"           # f-string (Python 3.6+)
format_str = "Name: {}, Age: {}".format(name, age)
percent_str = "Name: %s, Age: %d" % (name, age)

# Find
pos = combined.find("World")    # 6 (-1 if not found)
index = combined.index("World") # 6 (raises ValueError if not found)
rfind = combined.rfind("o")     # 7 (last occurrence)
count = combined.count("o")     # 2

# Check Content
contains = "World" in combined  # True
starts = combined.startswith("Hello")  # True
ends = combined.endswith("World")      # True

# Transform
upper = str1.upper()            # "HELLO"
lower = str1.lower()            # "hello"
title = "hello world".title()   # "Hello World"
capitalize = "hello".capitalize()  # "Hello"
swapcase = "Hello".swapcase()   # "hELLO"

# Strip (remove whitespace)
trimmed = "  hi  ".strip()      # "hi"
left_trim = "  hi  ".lstrip()   # "hi  "
right_trim = "  hi  ".rstrip()  # "  hi"
custom_strip = "xxxhixxx".strip("x")  # "hi"

# Replace
replaced = combined.replace("World", "Python")  # "Hello Python"

# Split & Join
words = "Hello World Python".split()    # ["Hello", "World", "Python"]
words2 = "a,b,c".split(",")             # ["a", "b", "c"]
joined = "-".join(words)                # "Hello-World-Python"
chars = list(str1)                      # ["H", "e", "l", "l", "o"]

# Character Type Checks
print("Alice".isalpha())        # True (all letters)
print("123".isdigit())          # True (all digits)
print("abc123".isalnum())       # True (letters and digits)
print("   ".isspace())          # True (all whitespace)
print("HELLO".isupper())        # True
print("hello".islower())        # True

# Conversion
num = int("123")                # 123
float_num = float("3.14")       # 3.14
num_str = str(42)               # "42"
ascii_code = ord('A')           # 65
char = chr(65)                  # 'A'

# String Methods Summary
text = "hello world"
print(text.center(20, "*"))     # "****hello world*****"
print(text.ljust(20, "-"))      # "hello world---------"
print(text.rjust(20, "-"))      # "---------hello world"
print(text.zfill(15))           # "0000hello world"

# Regular Expressions
import re
matches = re.findall(r'\\w+', "Hello World")  # ["Hello", "World"]
is_valid = bool(re.match(r'^\\d+$', "123"))   # True
replaced = re.sub(r'\\d', '', "a1b2c3")       # "abc"

# Immutability - strings cannot be changed in place
# str1[0] = 'J'  # This would raise an error!
# Instead, create new string:
new_str = 'J' + str1[1:]        # "Jello"

# Useful string algorithms
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(is_palindrome("A man a plan a canal Panama"))  # True`,
    },
  ],
  types: [
    {
      name: 'Immutable Strings',
      description: 'Cannot be changed after creation. Any modification creates a new string. Used in Java, Python, JavaScript. Safer for multi-threading.',
    },
    {
      name: 'Mutable Strings',
      description: 'Can be modified in place. Examples: StringBuilder (Java), StringBuffer (Java thread-safe), character arrays in C. More efficient for many modifications.',
    },
    {
      name: 'Null-terminated Strings',
      description: 'End with a special null character (\\0). Used in C. Length must be calculated by finding the null terminator.',
    },
    {
      name: 'Length-prefixed Strings',
      description: 'Store length as part of the string structure. Used in Pascal, modern languages. Allows O(1) length access.',
    },
  ],
  operations: [
    { name: 'Access Character', description: 'Get character at specific index', timeComplexity: 'O(1)' },
    { name: 'Length', description: 'Get number of characters', timeComplexity: 'O(1) or O(n) in C' },
    { name: 'Concatenation', description: 'Join two strings together', timeComplexity: 'O(n + m)' },
    { name: 'Substring', description: 'Extract portion of string', timeComplexity: 'O(k) where k = substring length' },
    { name: 'Search', description: 'Find substring or character', timeComplexity: 'O(n*m) naive, O(n) optimized' },
    { name: 'Compare', description: 'Check if two strings are equal', timeComplexity: 'O(min(n, m))' },
    { name: 'Replace', description: 'Replace occurrences of substring', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'Essential for text processing and user interaction',
    'Rich set of built-in methods in most languages',
    'Immutable strings are thread-safe',
    'Easy to read and manipulate',
    'Pattern matching with regular expressions',
    'Unicode support for international characters',
  ],
  disadvantages: [
    'Immutable strings can be memory-inefficient for many modifications',
    'Concatenation in loops creates many temporary objects',
    'Character encoding can be confusing (ASCII, UTF-8, UTF-16)',
    'String comparison can be tricky (case-sensitive, locale-aware)',
    'Memory overhead compared to raw character arrays',
  ],
  applications: [
    'User input handling and validation',
    'File reading and text processing',
    'Web development (HTML, JSON, URLs)',
    'Database queries and data manipulation',
    'Natural language processing',
    'Configuration files and settings',
    'Pattern matching and data extraction',
    'Encryption and security (passwords, tokens)',
  ],
};
