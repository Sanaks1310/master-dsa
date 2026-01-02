import { TopicContent } from '../topicContents';

export const bitManipulationContent: TopicContent = {
  id: 'bit-manipulation',
  definition: 'Bit Manipulation involves performing operations directly on binary representations of numbers. It uses bitwise operators (&, |, ^, ~, <<, >>) to manipulate individual bits, enabling extremely fast computations and memory-efficient solutions for many programming problems.',
  keyPoints: [
    'Bitwise AND (&): Both bits must be 1 for result to be 1',
    'Bitwise OR (|): Either bit being 1 makes result 1',
    'Bitwise XOR (^): Result is 1 if bits differ',
    'NOT (~): Flips all bits (ones complement)',
    'Left Shift (<<): Multiply by 2^n',
    'Right Shift (>>): Divide by 2^n',
    'Common tricks: check odd/even, swap without temp, count set bits',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Bit Manipulation in C
#include <stdio.h>

// Check if number is odd or even
int isOdd(int n) {
    return n & 1;  // Last bit is 1 for odd
}

// Check if kth bit is set (0-indexed from right)
int isKthBitSet(int n, int k) {
    return (n & (1 << k)) != 0;
}

// Set the kth bit
int setKthBit(int n, int k) {
    return n | (1 << k);
}

// Clear the kth bit
int clearKthBit(int n, int k) {
    return n & ~(1 << k);
}

// Toggle the kth bit
int toggleKthBit(int n, int k) {
    return n ^ (1 << k);
}

// Count number of set bits (Brian Kernighan's algorithm)
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // Clears rightmost set bit
        count++;
    }
    return count;
}

// Check if power of 2
int isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Swap two numbers without temp variable
void swap(int *a, int *b) {
    *a ^= *b;
    *b ^= *a;
    *a ^= *b;
}

// Find the only non-repeating element (all others appear twice)
int findSingle(int arr[], int n) {
    int result = 0;
    for (int i = 0; i < n; i++)
        result ^= arr[i];
    return result;
}

int main() {
    printf("Is 5 odd? %s\\n", isOdd(5) ? "Yes" : "No");
    printf("3rd bit of 10 (1010): %s\\n", isKthBitSet(10, 3) ? "Set" : "Not set");
    printf("Set bits in 7: %d\\n", countSetBits(7));  // 3
    printf("Is 16 power of 2? %s\\n", isPowerOfTwo(16) ? "Yes" : "No");
    
    int arr[] = {2, 3, 5, 4, 5, 3, 2};
    printf("Single element: %d\\n", findSingle(arr, 7));  // 4
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Bit Manipulation in C++
#include <iostream>
#include <vector>
using namespace std;

class BitOperations {
public:
    // Get rightmost set bit position
    static int getRightmostSetBit(int n) {
        return log2(n & (-n));
    }
    
    // Turn off rightmost set bit
    static int turnOffRightmostBit(int n) {
        return n & (n - 1);
    }
    
    // Isolate rightmost set bit
    static int isolateRightmostBit(int n) {
        return n & (-n);
    }
    
    // Generate all subsets using bit manipulation
    static void generateSubsets(vector<int>& set) {
        int n = set.size();
        int total = 1 << n;  // 2^n subsets
        
        for (int mask = 0; mask < total; mask++) {
            cout << "{ ";
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    cout << set[i] << " ";
                }
            }
            cout << "}" << endl;
        }
    }
    
    // Find two non-repeating elements
    static pair<int, int> findTwoSingles(vector<int>& arr) {
        int xorAll = 0;
        for (int num : arr) xorAll ^= num;
        
        // Get rightmost set bit
        int rightBit = xorAll & (-xorAll);
        
        int group1 = 0, group2 = 0;
        for (int num : arr) {
            if (num & rightBit)
                group1 ^= num;
            else
                group2 ^= num;
        }
        return {group1, group2};
    }
    
    // Reverse bits of a number
    static unsigned int reverseBits(unsigned int n) {
        unsigned int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }
};

int main() {
    vector<int> set = {1, 2, 3};
    cout << "All subsets of {1,2,3}:" << endl;
    BitOperations::generateSubsets(set);
    
    vector<int> arr = {1, 2, 1, 3, 2, 5};
    auto [a, b] = BitOperations::findTwoSingles(arr);
    cout << "Two singles: " << a << ", " << b << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Bit Manipulation in Java
public class BitManipulation {
    
    // Check if bit is set
    public static boolean isBitSet(int n, int k) {
        return (n & (1 << k)) != 0;
    }
    
    // Set a bit
    public static int setBit(int n, int k) {
        return n | (1 << k);
    }
    
    // Clear a bit
    public static int clearBit(int n, int k) {
        return n & ~(1 << k);
    }
    
    // Count set bits (Integer.bitCount is built-in)
    public static int countBits(int n) {
        int count = 0;
        while (n != 0) {
            count += (n & 1);
            n >>>= 1;  // Unsigned right shift
        }
        return count;
    }
    
    // Find missing number in 1 to n using XOR
    public static int findMissing(int[] arr, int n) {
        int xor1 = 0, xor2 = 0;
        
        for (int i = 1; i <= n; i++) xor1 ^= i;
        for (int num : arr) xor2 ^= num;
        
        return xor1 ^ xor2;
    }
    
    // Check if two numbers have opposite signs
    public static boolean haveOppositeSigns(int a, int b) {
        return (a ^ b) < 0;
    }
    
    // Add two numbers without arithmetic operators
    public static int add(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
    
    // Multiply by 7 using shifts
    public static int multiplyBy7(int n) {
        return (n << 3) - n;  // 8n - n = 7n
    }
    
    public static void main(String[] args) {
        System.out.println("Bit 2 of 5 (101): " + isBitSet(5, 2));
        System.out.println("Set bits in 15: " + countBits(15));
        
        int[] arr = {1, 2, 4, 5, 6};
        System.out.println("Missing number: " + findMissing(arr, 6));  // 3
        
        System.out.println("5 + 3 = " + add(5, 3));
        System.out.println("6 * 7 = " + multiplyBy7(6));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Bit Manipulation in JavaScript

// Basic bit operations
const isOdd = n => (n & 1) === 1;
const isEven = n => (n & 1) === 0;

// Check/Set/Clear/Toggle kth bit
const getBit = (n, k) => (n >> k) & 1;
const setBit = (n, k) => n | (1 << k);
const clearBit = (n, k) => n & ~(1 << k);
const toggleBit = (n, k) => n ^ (1 << k);

// Count set bits
function countSetBits(n) {
    let count = 0;
    while (n) {
        n &= (n - 1);  // Brian Kernighan's
        count++;
    }
    return count;
}

// Check power of 2
const isPowerOfTwo = n => n > 0 && (n & (n - 1)) === 0;

// Swap without temp
function swap(a, b) {
    a ^= b;
    b ^= a;
    a ^= b;
    return [a, b];
}

// Find single number (others appear twice)
const findSingle = arr => arr.reduce((xor, n) => xor ^ n, 0);

// Get all subsets using bitmask
function getSubsets(arr) {
    const subsets = [];
    const n = arr.length;
    const total = 1 << n;  // 2^n
    
    for (let mask = 0; mask < total; mask++) {
        const subset = [];
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push(arr[i]);
            }
        }
        subsets.push(subset);
    }
    return subsets;
}

// Bit manipulation for flags/permissions
const PERMISSIONS = {
    READ: 1,     // 001
    WRITE: 2,    // 010
    EXECUTE: 4   // 100
};

function hasPermission(userFlags, permission) {
    return (userFlags & permission) === permission;
}

function addPermission(userFlags, permission) {
    return userFlags | permission;
}

function removePermission(userFlags, permission) {
    return userFlags & ~permission;
}

// Examples
console.log("Is 7 odd?", isOdd(7));
console.log("Set bits in 15:", countSetBits(15));
console.log("Is 8 power of 2?", isPowerOfTwo(8));
console.log("Single:", findSingle([1, 2, 3, 2, 1]));  // 3

const subsets = getSubsets([1, 2, 3]);
console.log("Subsets:", subsets);

let flags = PERMISSIONS.READ;
flags = addPermission(flags, PERMISSIONS.WRITE);
console.log("Has write?", hasPermission(flags, PERMISSIONS.WRITE));`,
    },
    {
      language: 'Python',
      code: `# Bit Manipulation in Python

# Basic operations
def is_odd(n):
    return n & 1

def is_even(n):
    return not (n & 1)

# Bit operations at position k
def get_bit(n, k):
    return (n >> k) & 1

def set_bit(n, k):
    return n | (1 << k)

def clear_bit(n, k):
    return n & ~(1 << k)

def toggle_bit(n, k):
    return n ^ (1 << k)

# Count set bits
def count_set_bits(n):
    count = 0
    while n:
        n &= (n - 1)  # Brian Kernighan's algorithm
        count += 1
    return count

# Power of 2 check
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Find single element (others appear twice)
def find_single(arr):
    result = 0
    for num in arr:
        result ^= num
    return result

# Find two singles (all others appear twice)
def find_two_singles(arr):
    xor_all = 0
    for num in arr:
        xor_all ^= num
    
    # Rightmost set bit
    rightmost = xor_all & (-xor_all)
    
    num1 = num2 = 0
    for num in arr:
        if num & rightmost:
            num1 ^= num
        else:
            num2 ^= num
    
    return num1, num2

# Generate all subsets using bitmask
def generate_subsets(arr):
    n = len(arr)
    subsets = []
    
    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(arr[i])
        subsets.append(subset)
    
    return subsets

# Bitwise tricks
def swap_without_temp(a, b):
    a ^= b
    b ^= a
    a ^= b
    return a, b

def multiply_by_power_of_2(n, power):
    return n << power  # n * 2^power

def divide_by_power_of_2(n, power):
    return n >> power  # n / 2^power

# Find missing number using XOR
def find_missing(arr, n):
    xor_full = 0
    xor_arr = 0
    
    for i in range(1, n + 1):
        xor_full ^= i
    
    for num in arr:
        xor_arr ^= num
    
    return xor_full ^ xor_arr


# Examples
print(f"Is 5 odd? {is_odd(5)}")
print(f"Set bits in 7: {count_set_bits(7)}")
print(f"Is 16 power of 2? {is_power_of_two(16)}")

arr = [1, 2, 3, 2, 1]
print(f"Single element: {find_single(arr)}")

arr2 = [1, 2, 1, 3, 2, 5]
print(f"Two singles: {find_two_singles(arr2)}")

print(f"Subsets of [1,2]: {generate_subsets([1, 2])}")

# Binary representation
print(f"Binary of 13: {bin(13)}")  # 0b1101`,
    },
  ],
  types: [
    {
      name: 'Bitwise AND (&)',
      description: 'Returns 1 only if both bits are 1. Used for masking and checking bits.',
    },
    {
      name: 'Bitwise OR (|)',
      description: 'Returns 1 if either bit is 1. Used for setting bits.',
    },
    {
      name: 'Bitwise XOR (^)',
      description: 'Returns 1 if bits differ. Used for toggling and finding unique elements.',
    },
    {
      name: 'Bitwise NOT (~)',
      description: 'Flips all bits (ones complement). ~n = -(n+1).',
    },
    {
      name: 'Left Shift (<<)',
      description: 'Shifts bits left, filling with 0s. n << k = n × 2^k.',
    },
    {
      name: 'Right Shift (>>)',
      description: 'Shifts bits right. n >> k = n ÷ 2^k (floor division).',
    },
  ],
  operations: [
    {
      name: 'Check kth bit',
      description: '(n >> k) & 1 or (n & (1 << k))',
      timeComplexity: 'O(1)',
    },
    {
      name: 'Set kth bit',
      description: 'n | (1 << k)',
      timeComplexity: 'O(1)',
    },
    {
      name: 'Clear kth bit',
      description: 'n & ~(1 << k)',
      timeComplexity: 'O(1)',
    },
    {
      name: 'Count set bits',
      description: 'Brian Kernighan: n & (n-1) removes rightmost 1',
      timeComplexity: 'O(number of set bits)',
    },
    {
      name: 'Power of 2 check',
      description: 'n > 0 && (n & (n-1)) == 0',
      timeComplexity: 'O(1)',
    },
  ],
  advantages: [
    'Extremely fast - operates at hardware level',
    'Memory efficient - can pack multiple flags in single integer',
    'Constant time operations O(1)',
    'Useful for low-level programming and optimization',
    'Essential for competitive programming tricks',
  ],
  disadvantages: [
    'Code can be harder to read and understand',
    'Platform-dependent behavior (signed vs unsigned)',
    'Easy to introduce subtle bugs',
    'Limited to integer types',
    'Overflow issues with shifts',
  ],
  applications: [
    'Graphics and image processing',
    'Cryptography and encryption algorithms',
    'Network protocols and checksums',
    'Embedded systems and microcontrollers',
    'Compression algorithms',
    'Permission/flag systems',
    'Subset generation for combinatorics',
  ],
};
