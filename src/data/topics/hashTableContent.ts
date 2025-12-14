import { TopicContent } from '../topicContents';

export const hashTableContent: TopicContent = {
  id: 'hash-tables',
  definition: 'A Hash Table (or Hash Map) is a data structure that implements an associative array, mapping keys to values using a hash function. The hash function computes an index into an array of buckets, from which the desired value can be found. Hash tables provide average O(1) time complexity for insertions, deletions, and lookups.',
  keyPoints: [
    'Uses hash function to compute array index',
    'Average O(1) for insert, delete, and search',
    'Handles collisions via chaining or open addressing',
    'Load factor affects performance',
    'Keys must be hashable (immutable)',
  ],
  syntax: [
    {
      language: 'C',
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 100

// Key-Value pair node
typedef struct Node {
    char* key;
    int value;
    struct Node* next;
} Node;

// Hash Table
typedef struct {
    Node* buckets[TABLE_SIZE];
} HashTable;

// Hash function
unsigned int hash(const char* key) {
    unsigned int hash = 0;
    while (*key) {
        hash = (hash * 31) + *key++;
    }
    return hash % TABLE_SIZE;
}

// Create hash table
HashTable* createTable() {
    HashTable* table = (HashTable*)malloc(sizeof(HashTable));
    for (int i = 0; i < TABLE_SIZE; i++) {
        table->buckets[i] = NULL;
    }
    return table;
}

// Insert key-value pair
void insert(HashTable* table, const char* key, int value) {
    unsigned int index = hash(key);
    Node* node = (Node*)malloc(sizeof(Node));
    node->key = strdup(key);
    node->value = value;
    node->next = table->buckets[index];
    table->buckets[index] = node;
}

// Search for key
int search(HashTable* table, const char* key) {
    unsigned int index = hash(key);
    Node* node = table->buckets[index];
    while (node) {
        if (strcmp(node->key, key) == 0)
            return node->value;
        node = node->next;
    }
    return -1;  // Not found
}

// Delete key
void delete(HashTable* table, const char* key) {
    unsigned int index = hash(key);
    Node* node = table->buckets[index];
    Node* prev = NULL;
    
    while (node) {
        if (strcmp(node->key, key) == 0) {
            if (prev) prev->next = node->next;
            else table->buckets[index] = node->next;
            free(node->key);
            free(node);
            return;
        }
        prev = node;
        node = node->next;
    }
}

// Usage
int main() {
    HashTable* table = createTable();
    insert(table, "apple", 5);
    insert(table, "banana", 10);
    printf("apple: %d\\n", search(table, "apple"));  // 5
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <unordered_map>
#include <map>
using namespace std;

int main() {
    // Using unordered_map (Hash Table)
    unordered_map<string, int> hashMap;
    
    // Insert
    hashMap["apple"] = 5;
    hashMap["banana"] = 10;
    hashMap.insert({"cherry", 15});
    
    // Access
    cout << "apple: " << hashMap["apple"] << endl;  // 5
    
    // Check if key exists
    if (hashMap.find("banana") != hashMap.end()) {
        cout << "banana found!" << endl;
    }
    
    // Count occurrences of key
    cout << "Count of apple: " << hashMap.count("apple") << endl;
    
    // Delete
    hashMap.erase("banana");
    
    // Iterate
    for (const auto& pair : hashMap) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // Size and empty check
    cout << "Size: " << hashMap.size() << endl;
    cout << "Empty: " << hashMap.empty() << endl;
    
    // Clear all
    hashMap.clear();
    
    // Using map (Red-Black Tree based, ordered)
    map<string, int> orderedMap;
    orderedMap["zebra"] = 1;
    orderedMap["apple"] = 2;
    // Iterates in sorted key order
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.TreeMap;
import java.util.Map;

public class HashTableExample {
    public static void main(String[] args) {
        // HashMap (most common)
        HashMap<String, Integer> map = new HashMap<>();
        
        // Insert
        map.put("apple", 5);
        map.put("banana", 10);
        map.put("cherry", 15);
        
        // Access
        System.out.println("apple: " + map.get("apple"));  // 5
        
        // Get with default value
        System.out.println("date: " + map.getOrDefault("date", 0));  // 0
        
        // Check if key/value exists
        System.out.println("Has banana: " + map.containsKey("banana"));
        System.out.println("Has value 10: " + map.containsValue(10));
        
        // Delete
        map.remove("banana");
        
        // Iterate
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Using forEach lambda
        map.forEach((key, value) -> 
            System.out.println(key + " = " + value));
        
        // Size and empty check
        System.out.println("Size: " + map.size());
        System.out.println("Empty: " + map.isEmpty());
        
        // LinkedHashMap - maintains insertion order
        LinkedHashMap<String, Integer> linkedMap = new LinkedHashMap<>();
        
        // TreeMap - sorted by keys
        TreeMap<String, Integer> treeMap = new TreeMap<>();
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Using Object as Hash Map (simple key-value)
const obj = {};
obj["apple"] = 5;
obj["banana"] = 10;
console.log(obj["apple"]);  // 5

// Using Map (recommended)
const map = new Map();

// Insert
map.set("apple", 5);
map.set("banana", 10);
map.set("cherry", 15);

// Access
console.log("apple:", map.get("apple"));  // 5

// Check if key exists
console.log("Has banana:", map.has("banana"));  // true

// Delete
map.delete("banana");

// Size
console.log("Size:", map.size);  // 2

// Iterate
for (const [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
}

// Using forEach
map.forEach((value, key) => {
    console.log(\`\${key} = \${value}\`);
});

// Get all keys, values, entries
console.log([...map.keys()]);    // ["apple", "cherry"]
console.log([...map.values()]);  // [5, 15]
console.log([...map.entries()]); // [["apple", 5], ["cherry", 15]]

// Clear all
map.clear();

// Map can use any type as key (unlike Object)
const mapWithObjects = new Map();
const keyObj = { id: 1 };
mapWithObjects.set(keyObj, "value for object key");

// Set (unique values only)
const set = new Set();
set.add(1);
set.add(2);
set.add(1);  // Ignored, already exists
console.log(set.size);  // 2`,
    },
    {
      language: 'Python',
      code: `# Dictionary (built-in hash map)
hash_map = {}

# Insert
hash_map["apple"] = 5
hash_map["banana"] = 10
hash_map["cherry"] = 15

# Alternative creation
hash_map = {"apple": 5, "banana": 10}
hash_map = dict(apple=5, banana=10)

# Access
print("apple:", hash_map["apple"])  # 5

# Get with default value
print("date:", hash_map.get("date", 0))  # 0

# Check if key exists
print("Has banana:", "banana" in hash_map)  # True

# Delete
del hash_map["banana"]
# Or: hash_map.pop("banana", None)  # Returns None if not found

# Iterate
for key, value in hash_map.items():
    print(f"{key}: {value}")

# Get all keys, values, items
print(list(hash_map.keys()))    # ["apple", "cherry"]
print(list(hash_map.values()))  # [5, 15]
print(list(hash_map.items()))   # [("apple", 5), ("cherry", 15)]

# Size and empty check
print("Size:", len(hash_map))
print("Empty:", len(hash_map) == 0)

# Clear all
hash_map.clear()

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# defaultdict (auto-initialize missing keys)
from collections import defaultdict
dd = defaultdict(int)  # Default value 0
dd["count"] += 1  # No KeyError

# Counter (count occurrences)
from collections import Counter
counter = Counter("abracadabra")
print(counter.most_common(2))  # [('a', 5), ('b', 2)]

# Set (unique values)
my_set = {1, 2, 3, 2}  # {1, 2, 3}
my_set.add(4)
my_set.discard(2)`,
    },
  ],
  types: [
    {
      name: 'Direct Addressing',
      description: 'Uses key directly as index. Works when key range is small.',
    },
    {
      name: 'Chaining',
      description: 'Each bucket contains a linked list of entries with same hash.',
    },
    {
      name: 'Open Addressing',
      description: 'All entries stored in array, probing used to find empty slots.',
    },
    {
      name: 'Linear Probing',
      description: 'Check next slot sequentially when collision occurs.',
    },
    {
      name: 'Quadratic Probing',
      description: 'Check slots at quadratic intervals on collision.',
    },
    {
      name: 'Double Hashing',
      description: 'Use second hash function to determine probe sequence.',
    },
  ],
  operations: [
    { name: 'Insert', description: 'Add key-value pair', timeComplexity: 'O(1) average, O(n) worst' },
    { name: 'Search', description: 'Find value by key', timeComplexity: 'O(1) average, O(n) worst' },
    { name: 'Delete', description: 'Remove key-value pair', timeComplexity: 'O(1) average, O(n) worst' },
    { name: 'Update', description: 'Modify value for key', timeComplexity: 'O(1) average' },
    { name: 'Contains', description: 'Check if key exists', timeComplexity: 'O(1) average' },
    { name: 'Iterate', description: 'Traverse all entries', timeComplexity: 'O(n)' },
  ],
  advantages: [
    'O(1) average time for most operations',
    'Flexible key types (not just integers)',
    'Efficient for large datasets',
    'Dynamic size in most implementations',
    'Foundation for sets and caches',
  ],
  disadvantages: [
    'O(n) worst case when many collisions',
    'No ordering of elements',
    'Hash function design is critical',
    'Memory overhead for sparse data',
    'Not cache-friendly compared to arrays',
  ],
  applications: [
    'Database indexing',
    'Caching systems (LRU cache)',
    'Symbol tables in compilers',
    'Spell checkers and dictionaries',
    'Counting word frequencies',
    'Implementing sets',
  ],
};
