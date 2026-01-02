import { TopicContent } from '../topicContents';

export const hashingContent: TopicContent = {
  id: 'hashing',
  definition: 'Hashing is a technique that maps data of arbitrary size to fixed-size values using a hash function. The hash value serves as an index into a hash table, enabling near-constant time O(1) average case for insertions, deletions, and lookups. Collisions occur when different keys map to the same index.',
  keyPoints: [
    'Hash Function: Converts key to array index (hash code)',
    'Hash Table: Array that stores key-value pairs using hash indices',
    'Collision: When multiple keys hash to same index',
    'Load Factor: ratio of filled slots to total slots (affects performance)',
    'Chaining: Handle collisions using linked lists at each index',
    'Open Addressing: Find alternative slots (linear/quadratic probing)',
    'Good hash function: uniform distribution, fast computation',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Hash Table Implementation in C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

// Node for chaining
typedef struct Node {
    char* key;
    int value;
    struct Node* next;
} Node;

// Hash Table
typedef struct {
    Node* buckets[TABLE_SIZE];
} HashTable;

// Simple hash function for strings
unsigned int hash(const char* key) {
    unsigned int hash = 0;
    while (*key) {
        hash = (hash * 31) + *key++;
    }
    return hash % TABLE_SIZE;
}

// Create hash table
HashTable* createTable() {
    HashTable* table = malloc(sizeof(HashTable));
    for (int i = 0; i < TABLE_SIZE; i++) {
        table->buckets[i] = NULL;
    }
    return table;
}

// Insert key-value pair
void insert(HashTable* table, const char* key, int value) {
    unsigned int index = hash(key);
    
    // Check if key exists
    Node* current = table->buckets[index];
    while (current) {
        if (strcmp(current->key, key) == 0) {
            current->value = value;  // Update
            return;
        }
        current = current->next;
    }
    
    // Create new node (insert at head)
    Node* newNode = malloc(sizeof(Node));
    newNode->key = strdup(key);
    newNode->value = value;
    newNode->next = table->buckets[index];
    table->buckets[index] = newNode;
}

// Get value by key
int get(HashTable* table, const char* key, int* found) {
    unsigned int index = hash(key);
    Node* current = table->buckets[index];
    
    while (current) {
        if (strcmp(current->key, key) == 0) {
            *found = 1;
            return current->value;
        }
        current = current->next;
    }
    *found = 0;
    return -1;
}

// Delete key
void delete(HashTable* table, const char* key) {
    unsigned int index = hash(key);
    Node* current = table->buckets[index];
    Node* prev = NULL;
    
    while (current) {
        if (strcmp(current->key, key) == 0) {
            if (prev) prev->next = current->next;
            else table->buckets[index] = current->next;
            free(current->key);
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
}

int main() {
    HashTable* table = createTable();
    
    insert(table, "apple", 100);
    insert(table, "banana", 200);
    insert(table, "cherry", 300);
    
    int found;
    printf("apple: %d\\n", get(table, "apple", &found));
    printf("banana: %d\\n", get(table, "banana", &found));
    
    delete(table, "banana");
    get(table, "banana", &found);
    printf("banana found: %d\\n", found);
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Hash Table with Open Addressing in C++
#include <iostream>
#include <vector>
#include <optional>
using namespace std;

template<typename K, typename V>
class HashTable {
private:
    struct Entry {
        K key;
        V value;
        bool occupied = false;
        bool deleted = false;
    };
    
    vector<Entry> table;
    int size;
    int capacity;
    
    int hash(const K& key) const {
        return std::hash<K>{}(key) % capacity;
    }
    
    // Linear probing
    int probe(int index) const {
        return (index + 1) % capacity;
    }
    
public:
    HashTable(int cap = 16) : capacity(cap), size(0) {
        table.resize(capacity);
    }
    
    void insert(const K& key, const V& value) {
        // Resize if load factor > 0.7
        if ((float)size / capacity > 0.7) {
            resize();
        }
        
        int index = hash(key);
        int start = index;
        
        do {
            if (!table[index].occupied || table[index].deleted) {
                table[index] = {key, value, true, false};
                size++;
                return;
            }
            if (table[index].key == key) {
                table[index].value = value;  // Update
                return;
            }
            index = probe(index);
        } while (index != start);
    }
    
    optional<V> get(const K& key) const {
        int index = hash(key);
        int start = index;
        
        do {
            if (!table[index].occupied && !table[index].deleted) {
                return nullopt;  // Never inserted
            }
            if (table[index].occupied && !table[index].deleted 
                && table[index].key == key) {
                return table[index].value;
            }
            index = probe(index);
        } while (index != start);
        
        return nullopt;
    }
    
    bool remove(const K& key) {
        int index = hash(key);
        int start = index;
        
        do {
            if (table[index].occupied && table[index].key == key) {
                table[index].deleted = true;
                size--;
                return true;
            }
            index = probe(index);
        } while (index != start && table[index].occupied);
        
        return false;
    }
    
    void resize() {
        vector<Entry> old = table;
        capacity *= 2;
        table = vector<Entry>(capacity);
        size = 0;
        
        for (auto& entry : old) {
            if (entry.occupied && !entry.deleted) {
                insert(entry.key, entry.value);
            }
        }
    }
};

int main() {
    HashTable<string, int> ht;
    
    ht.insert("one", 1);
    ht.insert("two", 2);
    ht.insert("three", 3);
    
    auto val = ht.get("two");
    if (val) cout << "two: " << *val << endl;
    
    ht.remove("two");
    val = ht.get("two");
    cout << "two found: " << (val.has_value() ? "yes" : "no") << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Custom Hash Map Implementation in Java
import java.util.*;

public class CustomHashMap<K, V> {
    private static final int DEFAULT_CAPACITY = 16;
    private static final float LOAD_FACTOR = 0.75f;
    
    private class Entry {
        K key;
        V value;
        Entry next;
        
        Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private Entry[] buckets;
    private int size;
    
    @SuppressWarnings("unchecked")
    public CustomHashMap() {
        buckets = new CustomHashMap.Entry[DEFAULT_CAPACITY];
        size = 0;
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode()) % buckets.length;
    }
    
    public void put(K key, V value) {
        if ((float) size / buckets.length >= LOAD_FACTOR) {
            resize();
        }
        
        int index = hash(key);
        Entry current = buckets[index];
        
        // Check for existing key
        while (current != null) {
            if (current.key.equals(key)) {
                current.value = value;
                return;
            }
            current = current.next;
        }
        
        // Insert at head
        Entry newEntry = new Entry(key, value);
        newEntry.next = buckets[index];
        buckets[index] = newEntry;
        size++;
    }
    
    public V get(K key) {
        int index = hash(key);
        Entry current = buckets[index];
        
        while (current != null) {
            if (current.key.equals(key)) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }
    
    public V remove(K key) {
        int index = hash(key);
        Entry current = buckets[index];
        Entry prev = null;
        
        while (current != null) {
            if (current.key.equals(key)) {
                if (prev == null) {
                    buckets[index] = current.next;
                } else {
                    prev.next = current.next;
                }
                size--;
                return current.value;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }
    
    public boolean containsKey(K key) {
        return get(key) != null;
    }
    
    @SuppressWarnings("unchecked")
    private void resize() {
        Entry[] oldBuckets = buckets;
        buckets = new CustomHashMap.Entry[oldBuckets.length * 2];
        size = 0;
        
        for (Entry entry : oldBuckets) {
            while (entry != null) {
                put(entry.key, entry.value);
                entry = entry.next;
            }
        }
    }
    
    public static void main(String[] args) {
        CustomHashMap<String, Integer> map = new CustomHashMap<>();
        
        map.put("apple", 100);
        map.put("banana", 200);
        map.put("cherry", 300);
        
        System.out.println("apple: " + map.get("apple"));
        System.out.println("banana: " + map.get("banana"));
        
        map.remove("banana");
        System.out.println("Contains banana: " + map.containsKey("banana"));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Hash Table Implementation in JavaScript

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
        this.size = 0;
    }
    
    // Hash function
    _hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            total = (total * PRIME + value) % this.keyMap.length;
        }
        return total;
    }
    
    // Insert/Update
    set(key, value) {
        const index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        
        // Check for existing key
        for (let pair of this.keyMap[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        
        this.keyMap[index].push([key, value]);
        this.size++;
    }
    
    // Get value
    get(key) {
        const index = this._hash(key);
        if (this.keyMap[index]) {
            for (let pair of this.keyMap[index]) {
                if (pair[0] === key) {
                    return pair[1];
                }
            }
        }
        return undefined;
    }
    
    // Delete
    delete(key) {
        const index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        }
        return false;
    }
    
    // Get all keys
    keys() {
        const keysArr = [];
        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let pair of bucket) {
                    keysArr.push(pair[0]);
                }
            }
        }
        return keysArr;
    }
    
    // Get all values
    values() {
        const valuesArr = [];
        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let pair of bucket) {
                    valuesArr.push(pair[1]);
                }
            }
        }
        return valuesArr;
    }
}

// Common hashing problems

// Two Sum using hash map
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Group anagrams
function groupAnagrams(strs) {
    const map = new Map();
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(str);
    }
    return [...map.values()];
}

// First non-repeating character
function firstUnique(s) {
    const count = new Map();
    for (let c of s) {
        count.set(c, (count.get(c) || 0) + 1);
    }
    for (let i = 0; i < s.length; i++) {
        if (count.get(s[i]) === 1) return i;
    }
    return -1;
}

// Examples
const ht = new HashTable();
ht.set("name", "Alice");
ht.set("age", 25);
console.log("name:", ht.get("name"));
console.log("Keys:", ht.keys());

console.log("Two Sum [2,7,11,15], 9:", twoSum([2, 7, 11, 15], 9));
console.log("Group anagrams:", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));`,
    },
    {
      language: 'Python',
      code: `# Hash Table Implementation in Python
from collections import defaultdict

class HashTable:
    def __init__(self, size=53):
        self.size = size
        self.table = [[] for _ in range(size)]
        self.count = 0
    
    def _hash(self, key):
        """Simple hash function"""
        hash_value = 0
        prime = 31
        for char in str(key):
            hash_value = (hash_value * prime + ord(char)) % self.size
        return hash_value
    
    def put(self, key, value):
        """Insert or update key-value pair"""
        index = self._hash(key)
        
        # Check if key exists
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        
        self.table[index].append((key, value))
        self.count += 1
    
    def get(self, key, default=None):
        """Get value by key"""
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return default
    
    def delete(self, key):
        """Delete key-value pair"""
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                self.count -= 1
                return True
        return False
    
    def __contains__(self, key):
        return self.get(key) is not None
    
    def keys(self):
        return [k for bucket in self.table for k, v in bucket]
    
    def values(self):
        return [v for bucket in self.table for k, v in bucket]


# Common hashing problems

def two_sum(nums, target):
    """Find two numbers that sum to target"""
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


def group_anagrams(strs):
    """Group anagrams together"""
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())


def first_unique_char(s):
    """Find first non-repeating character"""
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    
    for i, c in enumerate(s):
        if count[c] == 1:
            return i
    return -1


def contains_duplicate(nums):
    """Check if array contains duplicates"""
    return len(nums) != len(set(nums))


def longest_consecutive(nums):
    """Find longest consecutive sequence"""
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # Only start from sequence beginning
        if num - 1 not in num_set:
            current = num
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1
            
            longest = max(longest, length)
    
    return longest


# Examples
ht = HashTable()
ht.put("apple", 100)
ht.put("banana", 200)
print(f"apple: {ht.get('apple')}")
print(f"Keys: {ht.keys()}")

print(f"Two Sum: {two_sum([2, 7, 11, 15], 9)}")
print(f"Group Anagrams: {group_anagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])}")
print(f"First Unique in 'leetcode': {first_unique_char('leetcode')}")
print(f"Longest Consecutive: {longest_consecutive([100, 4, 200, 1, 3, 2])}")`,
    },
  ],
  types: [
    {
      name: 'Chaining (Separate Chaining)',
      description: 'Store colliding elements in linked lists at each bucket. Simple but uses extra memory.',
    },
    {
      name: 'Open Addressing',
      description: 'Find alternative slots in table. Includes linear probing, quadratic probing, double hashing.',
    },
    {
      name: 'Linear Probing',
      description: 'Check consecutive slots (i+1, i+2, ...) on collision. Simple but causes clustering.',
    },
    {
      name: 'Quadratic Probing',
      description: 'Check slots with quadratic increments (i+1², i+2², ...). Reduces primary clustering.',
    },
    {
      name: 'Double Hashing',
      description: 'Use second hash function for step size. Best distribution but more complex.',
    },
  ],
  operations: [
    {
      name: 'Insert',
      description: 'Add key-value pair to table',
      timeComplexity: 'O(1) average, O(n) worst',
    },
    {
      name: 'Search/Get',
      description: 'Find value by key',
      timeComplexity: 'O(1) average, O(n) worst',
    },
    {
      name: 'Delete',
      description: 'Remove key-value pair',
      timeComplexity: 'O(1) average, O(n) worst',
    },
    {
      name: 'Resize/Rehash',
      description: 'Expand table when load factor exceeds threshold',
      timeComplexity: 'O(n)',
    },
  ],
  advantages: [
    'O(1) average case for insert, search, delete',
    'Very efficient for large datasets',
    'Flexible key types (strings, objects)',
    'Natural for counting and grouping problems',
    'Foundation for many data structures (Set, Map)',
  ],
  disadvantages: [
    'O(n) worst case if many collisions',
    'Not cache-friendly due to random access',
    'No ordering of elements',
    'Resizing is expensive O(n)',
    'Hash function quality critical for performance',
  ],
  applications: [
    'Database indexing',
    'Caching systems (LRU cache)',
    'Symbol tables in compilers',
    'Counting/frequency problems',
    'Finding duplicates and pairs',
    'String matching (Rabin-Karp)',
    'Implementing sets and maps',
  ],
};
