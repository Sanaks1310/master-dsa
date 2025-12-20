// Algorithm Animation Steps
export const algorithmAnimationSteps = [
  {
    description: 'Problem: Find largest of 3 numbers (10, 25, 15)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-foreground">Input Numbers</div>
        <div className="flex gap-4">
          {[10, 25, 15].map((num, i) => (
            <div key={i} className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-xl font-bold text-foreground">
              {num}
            </div>
          ))}
        </div>
        <div className="text-muted-foreground">Which one is largest?</div>
      </div>
    ),
  },
  {
    description: 'Step 1: Assume first number (10) is largest',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-green/30 border-2 border-green rounded-lg flex items-center justify-center text-xl font-bold text-foreground relative">
            10
            <span className="absolute -top-6 text-xs text-green">largest</span>
          </div>
          <div className="w-16 h-16 bg-muted border-2 border-border rounded-lg flex items-center justify-center text-xl font-bold text-muted-foreground">25</div>
          <div className="w-16 h-16 bg-muted border-2 border-border rounded-lg flex items-center justify-center text-xl font-bold text-muted-foreground">15</div>
        </div>
        <div className="bg-muted/50 px-4 py-2 rounded-lg font-mono text-sm">largest = 10</div>
      </div>
    ),
  },
  {
    description: 'Step 2: Compare with 25. Is 25 > 10? YES! Update largest',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-muted border-2 border-border rounded-lg flex items-center justify-center text-xl font-bold text-muted-foreground">10</div>
          <div className="w-16 h-16 bg-green/30 border-2 border-green rounded-lg flex items-center justify-center text-xl font-bold text-foreground relative animate-pulse">
            25
            <span className="absolute -top-6 text-xs text-green">largest</span>
          </div>
          <div className="w-16 h-16 bg-muted border-2 border-border rounded-lg flex items-center justify-center text-xl font-bold text-muted-foreground">15</div>
        </div>
        <div className="bg-muted/50 px-4 py-2 rounded-lg font-mono text-sm">25 &gt; 10 ✓ → largest = 25</div>
      </div>
    ),
  },
  {
    description: 'Step 3: Compare with 15. Is 15 > 25? NO! Keep largest',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-muted border-2 border-border rounded-lg flex items-center justify-center text-xl font-bold text-muted-foreground">10</div>
          <div className="w-16 h-16 bg-green/30 border-2 border-green rounded-lg flex items-center justify-center text-xl font-bold text-foreground relative">
            25
            <span className="absolute -top-6 text-xs text-green">largest</span>
          </div>
          <div className="w-16 h-16 bg-destructive/20 border-2 border-destructive rounded-lg flex items-center justify-center text-xl font-bold text-foreground">15</div>
        </div>
        <div className="bg-muted/50 px-4 py-2 rounded-lg font-mono text-sm">15 &gt; 25? ✗ → largest stays 25</div>
      </div>
    ),
  },
  {
    description: 'Done! Return 25 as the largest number',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Result Found!</div>
        <div className="w-20 h-20 bg-green/30 border-4 border-green rounded-lg flex items-center justify-center text-2xl font-bold text-foreground animate-bounce">
          25
        </div>
        <div className="bg-green/20 px-4 py-2 rounded-lg font-mono text-sm text-green">return 25</div>
      </div>
    ),
  },
];

// Data Structure Animation Steps
export const dataStructureAnimationSteps = [
  {
    description: 'Array: Elements stored in a row (like lockers)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Array - Lockers in a Row</div>
        <div className="flex gap-1">
          {['A', 'B', 'C', 'D', 'E'].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-cyan/20 border-2 border-cyan rounded flex items-center justify-center font-bold text-foreground">
                {val}
              </div>
              <span className="text-xs text-muted-foreground mt-1">[{i}]</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Access any item instantly by index!</div>
      </div>
    ),
  },
  {
    description: 'Stack: Last In, First Out (like a pile of plates)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Stack - Pile of Plates</div>
        <div className="flex flex-col-reverse gap-1">
          {['Plate 1', 'Plate 2', 'Plate 3'].map((val, i) => (
            <div 
              key={i} 
              className={`w-24 h-10 ${i === 2 ? 'bg-purple/30 border-purple' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center text-sm font-medium text-foreground`}
            >
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Take from top, add to top!</div>
      </div>
    ),
  },
  {
    description: 'Queue: First In, First Out (like a line at store)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Queue - Line at Store</div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-green">OUT→</span>
          {['P1', 'P2', 'P3'].map((val, i) => (
            <div 
              key={i} 
              className={`w-12 h-12 ${i === 0 ? 'bg-green/30 border-green' : 'bg-muted border-border'} border-2 rounded-full flex items-center justify-center font-bold text-foreground`}
            >
              {val}
            </div>
          ))}
          <span className="text-xs text-orange">←IN</span>
        </div>
        <div className="text-sm text-muted-foreground">First person in line gets served first!</div>
      </div>
    ),
  },
  {
    description: 'Tree: Hierarchical structure (like family tree)',
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-semibold text-orange">Tree - Family Structure</div>
        <div className="w-12 h-12 bg-orange/30 border-2 border-orange rounded-full flex items-center justify-center font-bold text-foreground">
          A
        </div>
        <div className="flex gap-8">
          <div className="w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold text-foreground">B</div>
          <div className="w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold text-foreground">C</div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-muted/50 border border-border rounded-full flex items-center justify-center text-sm text-muted-foreground">D</div>
          <div className="w-8 h-8 bg-muted/50 border border-border rounded-full flex items-center justify-center text-sm text-muted-foreground">E</div>
          <div className="w-8 h-8 bg-muted/50 border border-border rounded-full flex items-center justify-center text-sm text-muted-foreground">F</div>
        </div>
      </div>
    ),
  },
  {
    description: 'Graph: Nodes connected in any way (like social network)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-pink">Graph - Social Network</div>
        <div className="relative w-48 h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-pink/30 border-2 border-pink rounded-full flex items-center justify-center font-bold text-foreground">A</div>
          <div className="absolute top-12 left-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold text-foreground">B</div>
          <div className="absolute top-12 right-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold text-foreground">C</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold text-foreground">D</div>
        </div>
        <div className="text-sm text-muted-foreground">Everyone can connect to anyone!</div>
      </div>
    ),
  },
];

// Pseudo-code Animation Steps  
export const pseudoCodeAnimationSteps = [
  {
    description: 'Problem: Write pseudo-code to make a sandwich',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl">🥪</div>
        <div className="text-lg font-semibold text-foreground">Goal: Make a Sandwich</div>
        <div className="text-sm text-muted-foreground">Let's write steps in plain words</div>
      </div>
    ),
  },
  {
    description: 'START - Begin the algorithm',
    visual: (
      <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
        <div className="text-green font-bold">START</div>
        <div className="text-muted-foreground ml-4">// Everything begins here</div>
      </div>
    ),
  },
  {
    description: 'Step 1: Get the ingredients',
    visual: (
      <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
        <div className="text-green">START</div>
        <div className="text-cyan ml-4">GET bread, cheese, lettuce, tomato</div>
      </div>
    ),
  },
  {
    description: 'Step 2-4: Assemble the sandwich',
    visual: (
      <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-1">
        <div className="text-green">START</div>
        <div className="text-muted-foreground ml-4">GET bread, cheese, lettuce, tomato</div>
        <div className="text-cyan ml-4">PLACE bread slice on plate</div>
        <div className="text-cyan ml-4">ADD cheese on bread</div>
        <div className="text-cyan ml-4">ADD lettuce and tomato</div>
      </div>
    ),
  },
  {
    description: 'Step 5: Finish and END',
    visual: (
      <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-1">
        <div className="text-green">START</div>
        <div className="text-muted-foreground ml-4">GET bread, cheese, lettuce, tomato</div>
        <div className="text-muted-foreground ml-4">PLACE bread slice on plate</div>
        <div className="text-muted-foreground ml-4">ADD cheese on bread</div>
        <div className="text-muted-foreground ml-4">ADD lettuce and tomato</div>
        <div className="text-cyan ml-4">PLACE second bread on top</div>
        <div className="text-green font-bold">END</div>
      </div>
    ),
  },
];

// Programming Constructs Animation Steps
export const programmingConstructsAnimationSteps = [
  {
    description: 'Variable: A box that stores data',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Variable = Storage Box</div>
        <div className="flex items-center gap-4">
          <div className="text-muted-foreground">name</div>
          <div className="text-2xl">=</div>
          <div className="w-32 h-12 bg-cyan/20 border-2 border-cyan rounded flex items-center justify-center font-bold text-foreground">
            "Alice"
          </div>
        </div>
        <div className="font-mono text-sm bg-muted/50 px-3 py-1 rounded">let name = "Alice"</div>
      </div>
    ),
  },
  {
    description: 'Condition: Making decisions (if-else)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Condition = Decision</div>
        <div className="w-24 h-12 bg-purple/30 border-2 border-purple rounded-full flex items-center justify-center font-bold text-foreground">
          age ≥ 18?
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="text-green text-sm mb-1">YES ✓</div>
            <div className="px-3 py-1 bg-green/20 border border-green rounded text-sm">"Adult"</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-destructive text-sm mb-1">NO ✗</div>
            <div className="px-3 py-1 bg-destructive/20 border border-destructive rounded text-sm">"Minor"</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    description: 'Loop: Repeat actions (for/while)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Loop = Repeat</div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <div 
              key={num}
              className="w-10 h-10 bg-orange/20 border-2 border-orange rounded flex items-center justify-center font-bold text-foreground animate-pulse"
              style={{ animationDelay: `${num * 0.2}s` }}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="font-mono text-sm bg-muted/50 px-3 py-1 rounded">
          for i = 1 to 5: print(i)
        </div>
      </div>
    ),
  },
  {
    description: 'Function: Reusable block of code',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Function = Recipe</div>
        <div className="bg-green/10 border-2 border-green rounded-lg p-4">
          <div className="text-sm font-mono mb-2 text-green">function add(a, b)</div>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-8 h-8 bg-muted border rounded flex items-center justify-center">5</div>
            <span className="text-lg">+</span>
            <div className="w-8 h-8 bg-muted border rounded flex items-center justify-center">3</div>
            <span className="text-lg">=</span>
            <div className="w-8 h-8 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold">8</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Call anytime: add(5, 3) → 8</div>
      </div>
    ),
  },
  {
    description: 'All together: Variables + Conditions + Loops + Functions',
    visual: (
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex flex-col items-center p-2">
          <div className="w-10 h-10 bg-cyan/20 border border-cyan rounded flex items-center justify-center text-xl">📦</div>
          <span className="text-xs mt-1">Variables</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <div className="w-10 h-10 bg-purple/20 border border-purple rounded flex items-center justify-center text-xl">🔀</div>
          <span className="text-xs mt-1">Conditions</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <div className="w-10 h-10 bg-orange/20 border border-orange rounded flex items-center justify-center text-xl">🔄</div>
          <span className="text-xs mt-1">Loops</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <div className="w-10 h-10 bg-green/20 border border-green rounded flex items-center justify-center text-xl">⚡</div>
          <span className="text-xs mt-1">Functions</span>
        </div>
      </div>
    ),
  },
];

// Flowchart diagrams for each topic
export const topicFlowcharts: Record<string, { title: string; description: string; diagram: string }> = {
  'what-is-algorithm': {
    title: 'Algorithm Flowchart: Find Largest Number',
    description: 'Visual representation of the steps to find the largest of three numbers',
    diagram: `flowchart TD
    A[Start] --> B[/Input: a, b, c/]
    B --> C[Set largest = a]
    C --> D{Is b > largest?}
    D -->|Yes| E[largest = b]
    D -->|No| F{Is c > largest?}
    E --> F
    F -->|Yes| G[largest = c]
    F -->|No| H[/Output: largest/]
    G --> H
    H --> I[End]
    
    style A fill:#22c55e,color:#fff
    style I fill:#ef4444,color:#fff
    style D fill:#8b5cf6,color:#fff
    style F fill:#8b5cf6,color:#fff`,
  },
  'what-is-data-structure': {
    title: 'Choosing the Right Data Structure',
    description: 'Decision flowchart to help select the appropriate data structure',
    diagram: `flowchart TD
    A[Need to store data] --> B{Need order?}
    B -->|Yes| C{Need fast access?}
    B -->|No| D{Need key-value?}
    C -->|By index| E[Use Array]
    C -->|By insertion| F{LIFO or FIFO?}
    F -->|LIFO| G[Use Stack]
    F -->|FIFO| H[Use Queue]
    D -->|Yes| I[Use HashMap/Dict]
    D -->|No| J{Hierarchical?}
    J -->|Yes| K[Use Tree]
    J -->|No| L[Use Graph]
    
    style A fill:#06b6d4,color:#fff
    style E fill:#22c55e,color:#fff
    style G fill:#a855f7,color:#fff
    style H fill:#22c55e,color:#fff
    style I fill:#f97316,color:#fff
    style K fill:#f97316,color:#fff
    style L fill:#ec4899,color:#fff`,
  },
  'pseudo-code': {
    title: 'Writing Pseudo-code Process',
    description: 'Steps to convert a problem into pseudo-code',
    diagram: `flowchart TD
    A[Understand Problem] --> B[Identify Inputs]
    B --> C[Identify Outputs]
    C --> D[Break into Steps]
    D --> E[Write in Plain Words]
    E --> F{Logic Clear?}
    F -->|No| D
    F -->|Yes| G[Add Control Flow]
    G --> H[IF/ELSE for decisions]
    G --> I[FOR/WHILE for loops]
    H --> J[Review & Refine]
    I --> J
    J --> K[Convert to Real Code]
    
    style A fill:#8b5cf6,color:#fff
    style K fill:#22c55e,color:#fff
    style F fill:#f97316,color:#fff`,
  },
  'programming-constructs': {
    title: 'Program Execution Flow',
    description: 'How different constructs control program flow',
    diagram: `flowchart TD
    A[Program Start] --> B[/Read Variables/]
    B --> C{Condition Check}
    C -->|True| D[Execute IF block]
    C -->|False| E[Execute ELSE block]
    D --> F{Loop Needed?}
    E --> F
    F -->|Yes| G[Enter Loop]
    G --> H[Execute Loop Body]
    H --> I{Continue?}
    I -->|Yes| H
    I -->|No| J[Call Function]
    F -->|No| J
    J --> K[/Return Result/]
    K --> L[Program End]
    
    style A fill:#22c55e,color:#fff
    style L fill:#ef4444,color:#fff
    style C fill:#a855f7,color:#fff
    style I fill:#f97316,color:#fff`,
  },
  'time-complexity': {
    title: 'Time Complexity Growth',
    description: 'How different complexities scale with input size',
    diagram: `flowchart LR
    A[Input Size n] --> B{Algorithm Type}
    B --> C[O-1: Constant]
    B --> D[O-log n: Logarithmic]
    B --> E[O-n: Linear]
    B --> F[O-n²: Quadratic]
    C --> G[1 operation]
    D --> H[10 ops for n=1000]
    E --> I[1000 ops for n=1000]
    F --> J[1,000,000 ops!]
    
    style C fill:#22c55e,color:#fff
    style D fill:#06b6d4,color:#fff
    style E fill:#f97316,color:#fff
    style F fill:#ef4444,color:#fff`,
  },
  'space-complexity': {
    title: 'Space Usage Comparison',
    description: 'Memory usage patterns for different approaches',
    diagram: `flowchart TD
    A[Algorithm] --> B{Extra Space?}
    B -->|Fixed| C[O-1 Constant]
    B -->|Grows| D{How much?}
    D -->|With input| E[O-n Linear]
    D -->|Squared| F[O-n² Quadratic]
    C --> G[In-place sort]
    E --> H[Copy array]
    F --> I[2D matrix]
    
    style C fill:#22c55e,color:#fff
    style E fill:#f97316,color:#fff
    style F fill:#ef4444,color:#fff`,
  },
  'big-o-notation': {
    title: 'Big-O Comparison Chart',
    description: 'Visual comparison of growth rates',
    diagram: `flowchart TD
    A[Big-O Notation] --> B[O-1 Constant]
    A --> C[O-log n Logarithmic]
    A --> D[O-n Linear]
    A --> E[O-n log n Linearithmic]
    A --> F[O-n² Quadratic]
    A --> G[O-2ⁿ Exponential]
    B --> H[Best: Hash lookup]
    C --> I[Great: Binary search]
    D --> J[Good: Linear search]
    E --> K[OK: Merge sort]
    F --> L[Slow: Bubble sort]
    G --> M[Avoid: Naive fib]
    
    style B fill:#22c55e,color:#fff
    style C fill:#06b6d4,color:#fff
    style D fill:#a855f7,color:#fff
    style F fill:#f97316,color:#fff
    style G fill:#ef4444,color:#fff`,
  },
  'recursion-basics': {
    title: 'Recursion Flow',
    description: 'How recursive calls work',
    diagram: `flowchart TD
    A[Call factorial-5] --> B{n <= 1?}
    B -->|No| C[5 × factorial-4]
    C --> D[4 × factorial-3]
    D --> E[3 × factorial-2]
    E --> F[2 × factorial-1]
    F --> G{n <= 1?}
    G -->|Yes| H[Return 1]
    H --> I[Return 2×1=2]
    I --> J[Return 3×2=6]
    J --> K[Return 4×6=24]
    K --> L[Return 5×24=120]
    
    style A fill:#8b5cf6,color:#fff
    style H fill:#22c55e,color:#fff
    style L fill:#06b6d4,color:#fff`,
  },
  // Level 2 - Linear Data Structures
  'arrays': {
    title: 'Array Operations Flow',
    description: 'How array operations work step by step',
    diagram: `flowchart TD
    A[Array Operations] --> B{Operation Type}
    B --> C[Access by Index]
    B --> D[Insert Element]
    B --> E[Delete Element]
    B --> F[Search Element]
    C --> G[O-1: Direct access]
    D --> H{Where?}
    H -->|End| I[O-1: Just add]
    H -->|Middle| J[O-n: Shift elements]
    E --> K{Where?}
    K -->|End| L[O-1: Just remove]
    K -->|Middle| M[O-n: Shift elements]
    F --> N[O-n: Check each]
    
    style G fill:#22c55e,color:#fff
    style I fill:#22c55e,color:#fff
    style L fill:#22c55e,color:#fff
    style J fill:#f97316,color:#fff
    style M fill:#f97316,color:#fff
    style N fill:#f97316,color:#fff`,
  },
  'strings': {
    title: 'String Operations Flow',
    description: 'Common string manipulation operations',
    diagram: `flowchart TD
    A[String Operations] --> B[Concatenation]
    A --> C[Substring]
    A --> D[Search/Find]
    A --> E[Compare]
    A --> F[Reverse]
    B --> G["Hello" + "World"]
    G --> H["HelloWorld"]
    C --> I["Hello".substring-0,3]
    I --> J["Hel"]
    D --> K[Find 'l' in "Hello"]
    K --> L[Index: 2]
    F --> M["Hello" → "olleH"]
    
    style A fill:#06b6d4,color:#fff
    style H fill:#22c55e,color:#fff
    style J fill:#22c55e,color:#fff
    style L fill:#a855f7,color:#fff`,
  },
  'singly-linked-list': {
    title: 'Singly Linked List Operations',
    description: 'How nodes connect and operations work',
    diagram: `flowchart LR
    A[Head] --> B[Node 1]
    B --> C[Node 2]
    C --> D[Node 3]
    D --> E[NULL]
    
    subgraph Insert
    F[New Node] -.->|Point to next| C
    B -.->|Update pointer| F
    end
    
    style A fill:#8b5cf6,color:#fff
    style E fill:#ef4444,color:#fff
    style F fill:#22c55e,color:#fff`,
  },
  'doubly-linked-list': {
    title: 'Doubly Linked List Structure',
    description: 'Bi-directional node connections',
    diagram: `flowchart LR
    A[NULL] <--> B[Node 1]
    B <--> C[Node 2]
    C <--> D[Node 3]
    D <--> E[NULL]
    
    style B fill:#06b6d4,color:#fff
    style C fill:#06b6d4,color:#fff
    style D fill:#06b6d4,color:#fff`,
  },
  'circular-linked-list': {
    title: 'Circular Linked List Structure',
    description: 'Last node points back to head',
    diagram: `flowchart LR
    A[Head/Node 1] --> B[Node 2]
    B --> C[Node 3]
    C --> D[Node 4]
    D --> A
    
    style A fill:#f97316,color:#fff
    style D fill:#22c55e,color:#fff`,
  },
  'stacks': {
    title: 'Stack Operations - LIFO',
    description: 'Last In First Out principle',
    diagram: `flowchart TD
    A[Stack Operations] --> B[Push]
    A --> C[Pop]
    A --> D[Peek/Top]
    A --> E[isEmpty]
    B --> F[Add to TOP]
    C --> G[Remove from TOP]
    D --> H[View TOP only]
    F --> I[O-1]
    G --> I
    H --> I
    
    style A fill:#a855f7,color:#fff
    style I fill:#22c55e,color:#fff`,
  },
  'queues': {
    title: 'Queue Operations - FIFO',
    description: 'First In First Out principle',
    diagram: `flowchart LR
    A[Enqueue] --> B[Rear]
    B --> C[...]
    C --> D[Front]
    D --> E[Dequeue]
    
    subgraph Queue
    B
    C
    D
    end
    
    style A fill:#22c55e,color:#fff
    style E fill:#ef4444,color:#fff
    style B fill:#06b6d4,color:#fff
    style D fill:#f97316,color:#fff`,
  },
  'linked-lists': {
    title: 'Linked List Types Overview',
    description: 'Different types of linked lists',
    diagram: `flowchart TD
    A[Linked Lists] --> B[Singly Linked]
    A --> C[Doubly Linked]
    A --> D[Circular]
    B --> E[One direction only]
    C --> F[Both directions]
    D --> G[Forms a circle]
    E --> H[Less memory]
    F --> I[Easy backward traversal]
    G --> J[No NULL end]
    
    style A fill:#8b5cf6,color:#fff
    style B fill:#22c55e,color:#fff
    style C fill:#06b6d4,color:#fff
    style D fill:#f97316,color:#fff`,
  },
  // Level 3 - Searching & Sorting
  'linear-search': {
    title: 'Linear Search Flow',
    description: 'Sequential search through array',
    diagram: `flowchart TD
    A[Start] --> B[i = 0]
    B --> C{i < n?}
    C -->|Yes| D{arr-i == target?}
    D -->|Yes| E[Return i - Found!]
    D -->|No| F[i = i + 1]
    F --> C
    C -->|No| G[Return -1 - Not Found]
    
    style A fill:#22c55e,color:#fff
    style E fill:#22c55e,color:#fff
    style G fill:#ef4444,color:#fff
    style D fill:#8b5cf6,color:#fff`,
  },
  'binary-search': {
    title: 'Binary Search Flow',
    description: 'Divide and conquer search in sorted array',
    diagram: `flowchart TD
    A[Start] --> B[left=0, right=n-1]
    B --> C{left <= right?}
    C -->|Yes| D[mid = left+right / 2]
    D --> E{arr-mid == target?}
    E -->|Yes| F[Return mid - Found!]
    E -->|No| G{arr-mid < target?}
    G -->|Yes| H[left = mid + 1]
    G -->|No| I[right = mid - 1]
    H --> C
    I --> C
    C -->|No| J[Return -1 - Not Found]
    
    style F fill:#22c55e,color:#fff
    style J fill:#ef4444,color:#fff
    style E fill:#8b5cf6,color:#fff`,
  },
  'bubble-sort': {
    title: 'Bubble Sort Flow',
    description: 'Compare adjacent elements and swap',
    diagram: `flowchart TD
    A[Start] --> B[i = 0]
    B --> C{i < n-1?}
    C -->|Yes| D[j = 0]
    D --> E{j < n-i-1?}
    E -->|Yes| F{arr-j > arr-j+1?}
    F -->|Yes| G[Swap arr-j, arr-j+1]
    F -->|No| H[j++]
    G --> H
    H --> E
    E -->|No| I[i++]
    I --> C
    C -->|No| J[Array Sorted!]
    
    style A fill:#22c55e,color:#fff
    style J fill:#22c55e,color:#fff
    style F fill:#a855f7,color:#fff`,
  },
  'selection-sort': {
    title: 'Selection Sort Flow',
    description: 'Find minimum and place at correct position',
    diagram: `flowchart TD
    A[Start] --> B[i = 0]
    B --> C{i < n-1?}
    C -->|Yes| D[minIdx = i]
    D --> E[j = i + 1]
    E --> F{j < n?}
    F -->|Yes| G{arr-j < arr-minIdx?}
    G -->|Yes| H[minIdx = j]
    G -->|No| I[j++]
    H --> I
    I --> F
    F -->|No| J[Swap arr-i with arr-minIdx]
    J --> K[i++]
    K --> C
    C -->|No| L[Array Sorted!]
    
    style A fill:#22c55e,color:#fff
    style L fill:#22c55e,color:#fff`,
  },
  'insertion-sort': {
    title: 'Insertion Sort Flow',
    description: 'Insert each element at correct position',
    diagram: `flowchart TD
    A[Start] --> B[i = 1]
    B --> C{i < n?}
    C -->|Yes| D[key = arr-i, j = i-1]
    D --> E{j >= 0 AND arr-j > key?}
    E -->|Yes| F[arr-j+1 = arr-j]
    F --> G[j--]
    G --> E
    E -->|No| H[arr-j+1 = key]
    H --> I[i++]
    I --> C
    C -->|No| J[Array Sorted!]
    
    style A fill:#22c55e,color:#fff
    style J fill:#22c55e,color:#fff`,
  },
  'merge-sort': {
    title: 'Merge Sort Flow',
    description: 'Divide, sort, and merge',
    diagram: `flowchart TD
    A[Array] --> B{Size > 1?}
    B -->|Yes| C[Split into halves]
    C --> D[Left Half]
    C --> E[Right Half]
    D --> F[Sort Left - Recursive]
    E --> G[Sort Right - Recursive]
    F --> H[Merge Sorted Halves]
    G --> H
    H --> I[Sorted Array]
    B -->|No| I
    
    style A fill:#06b6d4,color:#fff
    style I fill:#22c55e,color:#fff
    style H fill:#f97316,color:#fff`,
  },
  'quick-sort': {
    title: 'Quick Sort Flow',
    description: 'Partition around pivot and sort',
    diagram: `flowchart TD
    A[Array] --> B{low < high?}
    B -->|Yes| C[Choose Pivot]
    C --> D[Partition Array]
    D --> E[Elements < pivot on left]
    D --> F[Elements > pivot on right]
    E --> G[Sort Left - Recursive]
    F --> H[Sort Right - Recursive]
    G --> I[Array Sorted]
    H --> I
    B -->|No| I
    
    style A fill:#06b6d4,color:#fff
    style I fill:#22c55e,color:#fff
    style C fill:#f97316,color:#fff`,
  },
  'heap-sort': {
    title: 'Heap Sort Flow',
    description: 'Build heap and extract max repeatedly',
    diagram: `flowchart TD
    A[Array] --> B[Build Max Heap]
    B --> C{Heap size > 1?}
    C -->|Yes| D[Swap root with last]
    D --> E[Reduce heap size]
    E --> F[Heapify root]
    F --> C
    C -->|No| G[Array Sorted!]
    
    style A fill:#06b6d4,color:#fff
    style G fill:#22c55e,color:#fff
    style B fill:#a855f7,color:#fff`,
  },
  // Level 4 - Non-Linear Data Structures
  'tree-terminology': {
    title: 'Tree Terminology Overview',
    description: 'Understanding tree structure and terminology',
    diagram: `flowchart TD
    A[Root Node] --> B[Left Child]
    A --> C[Right Child]
    B --> D[Leaf]
    B --> E[Leaf]
    C --> F[Internal Node]
    F --> G[Leaf]
    
    subgraph Terms
    H[Height: Longest path from root to leaf]
    I[Depth: Distance from root to node]
    J[Degree: Number of children]
    end
    
    style A fill:#f97316,color:#fff
    style D fill:#22c55e,color:#fff
    style E fill:#22c55e,color:#fff
    style G fill:#22c55e,color:#fff
    style F fill:#06b6d4,color:#fff`,
  },
  'binary-tree': {
    title: 'Binary Tree Traversals',
    description: 'Different ways to traverse a binary tree',
    diagram: `flowchart TD
    A[Binary Tree Traversals] --> B[Inorder: Left-Root-Right]
    A --> C[Preorder: Root-Left-Right]
    A --> D[Postorder: Left-Right-Root]
    A --> E[Level Order: BFS]
    
    B --> F[Used for BST sorted output]
    C --> G[Used to copy tree]
    D --> H[Used to delete tree]
    E --> I[Used for level-by-level processing]
    
    style A fill:#8b5cf6,color:#fff
    style B fill:#22c55e,color:#fff
    style C fill:#06b6d4,color:#fff
    style D fill:#f97316,color:#fff
    style E fill:#ec4899,color:#fff`,
  },
  'binary-search-trees': {
    title: 'BST Operations Flow',
    description: 'Search, insert, and delete in BST',
    diagram: `flowchart TD
    A[BST Operation] --> B{Search/Insert/Delete}
    B -->|Search| C{key == node.val?}
    C -->|Yes| D[Found!]
    C -->|No| E{key < node.val?}
    E -->|Yes| F[Go Left]
    E -->|No| G[Go Right]
    F --> C
    G --> C
    B -->|Insert| H[Find correct position]
    H --> I[Add new node as leaf]
    B -->|Delete| J{Has children?}
    J -->|0| K[Just remove]
    J -->|1| L[Replace with child]
    J -->|2| M[Replace with inorder successor]
    
    style D fill:#22c55e,color:#fff
    style I fill:#06b6d4,color:#fff
    style C fill:#a855f7,color:#fff`,
  },
  'heaps': {
    title: 'Heap Operations Flow',
    description: 'Insert and extract operations in heap',
    diagram: `flowchart TD
    A[Heap Operations] --> B[Insert]
    A --> C[Extract Max/Min]
    B --> D[Add at end]
    D --> E[Bubble UP]
    E --> F{Parent violates heap?}
    F -->|Yes| G[Swap with parent]
    G --> F
    F -->|No| H[Done!]
    C --> I[Remove root]
    I --> J[Move last to root]
    J --> K[Bubble DOWN]
    K --> L{Children violate heap?}
    L -->|Yes| M[Swap with larger/smaller child]
    M --> L
    L -->|No| H
    
    style A fill:#f97316,color:#fff
    style H fill:#22c55e,color:#fff
    style E fill:#06b6d4,color:#fff
    style K fill:#06b6d4,color:#fff`,
  },
  'graph-basics': {
    title: 'Graph Representations',
    description: 'Adjacency Matrix vs Adjacency List',
    diagram: `flowchart TD
    A[Graph Representation] --> B[Adjacency Matrix]
    A --> C[Adjacency List]
    B --> D[2D Array: matrix-i-j = 1 if edge]
    C --> E[Array of Lists]
    D --> F[Space: O-V²]
    D --> G[Edge check: O-1]
    E --> H[Space: O-V+E]
    E --> I[Edge check: O-V]
    
    subgraph "Best For"
    B --> J[Dense graphs]
    C --> K[Sparse graphs]
    end
    
    style A fill:#ec4899,color:#fff
    style B fill:#06b6d4,color:#fff
    style C fill:#22c55e,color:#fff`,
  },
  'bfs': {
    title: 'BFS Algorithm Flow',
    description: 'Breadth-First Search traversal',
    diagram: `flowchart TD
    A[Start BFS] --> B[Create Queue]
    B --> C[Enqueue start vertex]
    C --> D[Mark start as visited]
    D --> E{Queue empty?}
    E -->|No| F[Dequeue vertex v]
    F --> G[Process v]
    G --> H[For each neighbor u of v]
    H --> I{u visited?}
    I -->|No| J[Mark u visited]
    J --> K[Enqueue u]
    I -->|Yes| L[Skip u]
    K --> H
    L --> H
    H --> E
    E -->|Yes| M[BFS Complete!]
    
    style A fill:#f97316,color:#fff
    style M fill:#22c55e,color:#fff
    style F fill:#06b6d4,color:#fff`,
  },
  'dfs': {
    title: 'DFS Algorithm Flow',
    description: 'Depth-First Search traversal',
    diagram: `flowchart TD
    A[Start DFS] --> B{Use Stack or Recursion}
    B -->|Stack| C[Push start vertex]
    B -->|Recursion| D[Call DFS on start]
    C --> E{Stack empty?}
    E -->|No| F[Pop vertex v]
    F --> G{v visited?}
    G -->|No| H[Mark v visited]
    H --> I[Process v]
    I --> J[Push all neighbors]
    J --> E
    G -->|Yes| E
    D --> K[Mark current visited]
    K --> L[Process current]
    L --> M[For each unvisited neighbor]
    M --> N[Recursively call DFS]
    N --> M
    E -->|Yes| O[DFS Complete!]
    
    style A fill:#ec4899,color:#fff
    style O fill:#22c55e,color:#fff
    style H fill:#06b6d4,color:#fff`,
  },
  'cycle-detection': {
    title: 'Cycle Detection Flow',
    description: 'Detecting cycles in directed and undirected graphs',
    diagram: `flowchart TD
    A[Cycle Detection] --> B{Graph Type}
    B -->|Undirected| C[Use DFS with parent tracking]
    B -->|Directed| D[Use DFS with color/state]
    C --> E[For each unvisited node]
    E --> F[DFS from node]
    F --> G{Neighbor visited AND not parent?}
    G -->|Yes| H[Cycle Found!]
    G -->|No| I[Continue DFS]
    D --> J[WHITE: Unvisited]
    D --> K[GRAY: In current path]
    D --> L[BLACK: Fully processed]
    K --> M{Found GRAY neighbor?}
    M -->|Yes| H
    M -->|No| N[Mark BLACK when done]
    
    style H fill:#ef4444,color:#fff
    style A fill:#06b6d4,color:#fff
    style J fill:#94a3b8,color:#000
    style K fill:#a855f7,color:#fff
    style L fill:#1e293b,color:#fff`,
  },
  'topological-sort': {
    title: 'Topological Sort Flow',
    description: 'Linear ordering of DAG vertices',
    diagram: `flowchart TD
    A[Topological Sort] --> B{Method}
    B -->|Kahn's Algorithm| C[Find vertices with 0 in-degree]
    B -->|DFS Based| D[DFS and add to stack on completion]
    C --> E[Add to result]
    E --> F[Remove edges from these vertices]
    F --> G[Update in-degrees]
    G --> H{Any 0 in-degree left?}
    H -->|Yes| C
    H -->|No| I{All vertices processed?}
    I -->|Yes| J[Topological Order Found!]
    I -->|No| K[Cycle Exists - No valid order]
    D --> L[Run DFS on all unvisited]
    L --> M[Push to stack when DFS completes]
    M --> N[Pop stack for result]
    
    style J fill:#22c55e,color:#fff
    style K fill:#ef4444,color:#fff
    style A fill:#8b5cf6,color:#fff`,
  },
  // Level 5 - Algorithm Techniques
  'divide-and-conquer': {
    title: 'Divide and Conquer Flow',
    description: 'Break problem into smaller subproblems, solve, and combine',
    diagram: `flowchart TD
    A[Original Problem] --> B[DIVIDE into subproblems]
    B --> C[Subproblem 1]
    B --> D[Subproblem 2]
    B --> E[Subproblem n]
    C --> F{Base case?}
    D --> F
    E --> F
    F -->|Yes| G[Solve directly]
    F -->|No| H[Recursively divide]
    H --> B
    G --> I[CONQUER: Solve subproblems]
    I --> J[COMBINE results]
    J --> K[Final Solution]
    
    subgraph Examples
    L[Merge Sort]
    M[Quick Sort]
    N[Binary Search]
    end
    
    style A fill:#06b6d4,color:#fff
    style K fill:#22c55e,color:#fff
    style B fill:#a855f7,color:#fff
    style J fill:#f97316,color:#fff`,
  },
  'greedy-algorithms': {
    title: 'Greedy Algorithm Flow',
    description: 'Make locally optimal choice at each step',
    diagram: `flowchart TD
    A[Greedy Algorithm] --> B[Start with empty solution]
    B --> C{Candidates available?}
    C -->|Yes| D[Select best candidate]
    D --> E{Is it feasible?}
    E -->|Yes| F[Add to solution]
    E -->|No| G[Discard candidate]
    F --> H{Solution complete?}
    G --> C
    H -->|No| C
    H -->|Yes| I[Return solution]
    C -->|No| J[No solution possible]
    
    subgraph "Key Property"
    K[Greedy Choice Property]
    L[Optimal Substructure]
    end
    
    subgraph Examples
    M[Coin Change]
    N[Activity Selection]
    O[Huffman Coding]
    end
    
    style A fill:#22c55e,color:#fff
    style I fill:#22c55e,color:#fff
    style D fill:#f97316,color:#fff
    style J fill:#ef4444,color:#fff`,
  },
  'backtracking': {
    title: 'Backtracking Flow',
    description: 'Explore all possibilities with pruning',
    diagram: `flowchart TD
    A[Backtracking] --> B[Choose a candidate]
    B --> C{Valid choice?}
    C -->|Yes| D[Add to solution]
    D --> E{Solution complete?}
    E -->|Yes| F[Record solution]
    E -->|No| G[Recursively explore]
    G --> H{More candidates?}
    H -->|Yes| B
    H -->|No| I[BACKTRACK]
    I --> J[Remove last choice]
    J --> K[Try next candidate]
    C -->|No| K
    K --> H
    F --> L[Return or continue]
    
    subgraph Examples
    M[N-Queens]
    N[Sudoku Solver]
    O[Maze Path]
    P[Subset Sum]
    end
    
    style A fill:#a855f7,color:#fff
    style I fill:#ef4444,color:#fff
    style F fill:#22c55e,color:#fff
    style J fill:#f97316,color:#fff`,
  },
  'dynamic-programming': {
    title: 'Dynamic Programming Flow',
    description: 'Solve by storing subproblem results',
    diagram: `flowchart TD
    A[Dynamic Programming] --> B{Approach}
    B -->|Top-Down| C[Memoization]
    B -->|Bottom-Up| D[Tabulation]
    
    C --> E[Check if solved]
    E -->|In cache| F[Return cached result]
    E -->|Not cached| G[Solve recursively]
    G --> H[Store in cache]
    H --> I[Return result]
    
    D --> J[Initialize base cases]
    J --> K[Fill table iteratively]
    K --> L[Use smaller subproblems]
    L --> M[Build up to final answer]
    
    subgraph "Key Properties"
    N[Overlapping Subproblems]
    O[Optimal Substructure]
    end
    
    subgraph Examples
    P[Fibonacci]
    Q[Knapsack]
    R[LCS]
    S[Edit Distance]
    end
    
    style A fill:#f97316,color:#fff
    style F fill:#22c55e,color:#fff
    style M fill:#22c55e,color:#fff
    style C fill:#06b6d4,color:#fff
    style D fill:#a855f7,color:#fff`,
  },
};

// Time Complexity Animation Steps
export const timeComplexityAnimationSteps = [
  {
    description: 'O(1) Constant: Same time for any input size',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">O(1) - Constant Time</div>
        <div className="flex gap-4 items-end">
          {[10, 100, 1000].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div className="w-12 h-8 bg-green/30 border-2 border-green rounded" />
              <span className="text-xs mt-1">n={n}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Array access: arr[0] always takes 1 step</div>
      </div>
    ),
  },
  {
    description: 'O(n) Linear: Time grows with input',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">O(n) - Linear Time</div>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col items-center">
            <div className="w-12 h-4 bg-cyan/30 border-2 border-cyan rounded" />
            <span className="text-xs mt-1">n=10</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-cyan/30 border-2 border-cyan rounded" />
            <span className="text-xs mt-1">n=100</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-24 bg-cyan/30 border-2 border-cyan rounded" />
            <span className="text-xs mt-1">n=1000</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Loop through array once</div>
      </div>
    ),
  },
  {
    description: 'O(n²) Quadratic: Time grows squared!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">O(n²) - Quadratic Time</div>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col items-center">
            <div className="w-12 h-6 bg-orange/30 border-2 border-orange rounded" />
            <span className="text-xs mt-1">n=10</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-16 bg-orange/30 border-2 border-orange rounded" />
            <span className="text-xs mt-1">n=100</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-32 bg-destructive/30 border-2 border-destructive rounded animate-pulse" />
            <span className="text-xs mt-1">n=1000</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Nested loops: n × n operations</div>
      </div>
    ),
  },
];

// Array Animation Steps
export const arrayAnimationSteps = [
  {
    description: 'Array: Elements stored in contiguous memory',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Array in Memory</div>
        <div className="flex gap-0">
          {[10, 20, 30, 40, 50].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-cyan/20 border-2 border-cyan flex items-center justify-center font-bold text-foreground">
                {val}
              </div>
              <span className="text-xs text-muted-foreground mt-1">[{i}]</span>
              <span className="text-xs text-cyan">@{100 + i * 4}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Contiguous memory addresses</div>
      </div>
    ),
  },
  {
    description: 'Access: O(1) - Direct index access',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Access arr[2]</div>
        <div className="flex gap-0">
          {[10, 20, 30, 40, 50].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-14 h-14 ${i === 2 ? 'bg-green/30 border-green animate-pulse' : 'bg-muted border-border'} border-2 flex items-center justify-center font-bold text-foreground`}>
                {val}
              </div>
              <span className="text-xs text-muted-foreground mt-1">[{i}]</span>
            </div>
          ))}
        </div>
        <div className="bg-green/20 px-4 py-2 rounded font-mono text-sm">arr[2] = 30 ✓</div>
      </div>
    ),
  },
  {
    description: 'Insert at End: O(1) - Just add to end',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Insert 60 at end</div>
        <div className="flex gap-0 items-center">
          {[10, 20, 30, 40, 50].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-muted border-2 border-border flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
          <div className="w-12 h-12 bg-purple/30 border-2 border-purple flex items-center justify-center font-bold text-foreground animate-bounce">
            60
          </div>
        </div>
        <div className="text-sm text-green">O(1) - No shifting needed!</div>
      </div>
    ),
  },
  {
    description: 'Insert in Middle: O(n) - Shift elements',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Insert 25 at index 2</div>
        <div className="flex gap-0 items-center">
          <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center text-sm font-bold">10</div>
          <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center text-sm font-bold">20</div>
          <div className="w-10 h-10 bg-orange/30 border-2 border-orange flex items-center justify-center text-sm font-bold animate-pulse">25</div>
          <div className="flex gap-0">
            {[30, 40, 50].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-destructive/20 border border-destructive flex items-center justify-center text-sm font-bold relative">
                {val}
                <span className="absolute -top-4 text-xs text-destructive">→</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-orange">O(n) - Must shift 3 elements right</div>
      </div>
    ),
  },
  {
    description: 'Search: O(n) - Check each element',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Search for 40</div>
        <div className="flex gap-1">
          {[10, 20, 30, 40, 50].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${val === 40 ? 'bg-green/30 border-green' : i < 3 ? 'bg-muted/50 border-border' : 'bg-muted border-border'} border-2 flex items-center justify-center font-bold text-foreground`}>
              {val}
              {i < 3 && <span className="absolute -top-4 text-xs text-muted-foreground">✗</span>}
              {val === 40 && <span className="absolute -top-4 text-xs text-green">✓</span>}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Checked 4 elements to find 40</div>
      </div>
    ),
  },
];

// String Animation Steps
export const stringAnimationSteps = [
  {
    description: 'String: Array of characters',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">String "HELLO"</div>
        <div className="flex gap-0">
          {['H', 'E', 'L', 'L', 'O'].map((char, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-cyan/20 border-2 border-cyan flex items-center justify-center font-bold text-xl text-foreground">
                {char}
              </div>
              <span className="text-xs text-muted-foreground mt-1">[{i}]</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Each character has an index</div>
      </div>
    ),
  },
  {
    description: 'Concatenation: Joining strings',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">"Hello" + " " + "World"</div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-purple/20 border border-purple rounded font-mono">Hello</div>
          <span className="text-xl">+</span>
          <div className="px-3 py-2 bg-purple/20 border border-purple rounded font-mono">" "</div>
          <span className="text-xl">+</span>
          <div className="px-3 py-2 bg-purple/20 border border-purple rounded font-mono">World</div>
        </div>
        <div className="text-2xl">↓</div>
        <div className="px-4 py-2 bg-green/20 border-2 border-green rounded font-mono text-lg">Hello World</div>
      </div>
    ),
  },
  {
    description: 'Substring: Extract part of string',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">substring(0, 5)</div>
        <div className="flex gap-0">
          {['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'].map((char, i) => (
            <div key={i} className={`w-8 h-10 ${i < 5 ? 'bg-orange/30 border-orange' : 'bg-muted/30 border-border'} border flex items-center justify-center font-bold text-foreground`}>
              {char}
            </div>
          ))}
        </div>
        <div className="px-4 py-2 bg-orange/20 border border-orange rounded font-mono">Result: "Hello"</div>
      </div>
    ),
  },
  {
    description: 'Reverse: Flip the string',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Reverse "HELLO"</div>
        <div className="flex gap-1">
          {['H', 'E', 'L', 'L', 'O'].map((char, i) => (
            <div key={i} className="w-10 h-10 bg-muted border border-border flex items-center justify-center font-bold text-foreground">
              {char}
            </div>
          ))}
        </div>
        <div className="text-2xl animate-pulse">⟳</div>
        <div className="flex gap-1">
          {['O', 'L', 'L', 'E', 'H'].map((char, i) => (
            <div key={i} className="w-10 h-10 bg-green/30 border-2 border-green flex items-center justify-center font-bold text-foreground">
              {char}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// Linked List Animation Steps
export const linkedListAnimationSteps = [
  {
    description: 'Linked List: Nodes connected by pointers',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Singly Linked List</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-purple">HEAD→</div>
          {[10, 20, 30].map((val, i) => (
            <div key={i} className="flex items-center">
              <div className="w-16 h-10 bg-purple/20 border-2 border-purple rounded flex items-center justify-center font-bold text-foreground">
                {val}
              </div>
              <div className="w-6 text-center text-purple">→</div>
            </div>
          ))}
          <div className="px-2 py-1 bg-destructive/20 border border-destructive rounded text-xs">NULL</div>
        </div>
        <div className="text-sm text-muted-foreground">Each node points to the next</div>
      </div>
    ),
  },
  {
    description: 'Insert at Head: O(1) - Just update pointer',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Insert 5 at head</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-green">HEAD→</div>
          <div className="w-16 h-10 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-foreground animate-bounce">
            5
          </div>
          <div className="w-4 text-green">→</div>
          {[10, 20, 30].map((val, i) => (
            <div key={i} className="flex items-center">
              <div className="w-14 h-10 bg-muted border-2 border-border rounded flex items-center justify-center font-bold text-foreground">
                {val}
              </div>
              <div className="w-4 text-muted-foreground">→</div>
            </div>
          ))}
          <div className="text-xs text-destructive">NULL</div>
        </div>
        <div className="text-sm text-green">O(1) - No traversal needed!</div>
      </div>
    ),
  },
  {
    description: 'Delete Node: Update the pointer',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Delete node with 20</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-purple">HEAD→</div>
          <div className="w-14 h-10 bg-purple/20 border border-purple rounded flex items-center justify-center font-bold">10</div>
          <div className="w-4 text-purple">→</div>
          <div className="w-14 h-10 bg-destructive/30 border-2 border-destructive rounded flex items-center justify-center font-bold line-through opacity-50">20</div>
          <div className="w-4 text-muted-foreground">→</div>
          <div className="w-14 h-10 bg-purple/20 border border-purple rounded flex items-center justify-center font-bold">30</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-green">After:</div>
          <div className="w-14 h-10 bg-purple/20 border border-purple rounded flex items-center justify-center font-bold">10</div>
          <div className="w-8 text-green font-bold">→→</div>
          <div className="w-14 h-10 bg-purple/20 border border-purple rounded flex items-center justify-center font-bold">30</div>
        </div>
      </div>
    ),
  },
];

// Stack Animation Steps
export const stackAnimationSteps = [
  {
    description: 'Stack: LIFO - Last In First Out',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Stack Structure</div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-purple mb-1">← TOP</div>
          <div className="flex flex-col gap-1">
            {[30, 20, 10].map((val, i) => (
              <div key={i} className={`w-20 h-10 ${i === 0 ? 'bg-purple/30 border-purple' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
                {val}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Like a stack of plates!</div>
      </div>
    ),
  },
  {
    description: 'Push: Add to top - O(1)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Push 40</div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-10 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-foreground animate-bounce mb-1">
            40 ← NEW
          </div>
          <div className="flex flex-col gap-1">
            {[30, 20, 10].map((val, i) => (
              <div key={i} className="w-20 h-10 bg-muted border-2 border-border rounded flex items-center justify-center font-bold text-foreground">
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    description: 'Pop: Remove from top - O(1)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Pop</div>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-10 bg-orange/30 border-2 border-orange rounded flex items-center justify-center font-bold opacity-50 animate-pulse">
              30 ↑
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {[20, 10].map((val, i) => (
                <div key={i} className="w-20 h-10 bg-muted border-2 border-border rounded flex items-center justify-center font-bold">
                  {val}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 px-3 py-2 bg-green/20 border border-green rounded">
            Returns: 30
          </div>
        </div>
      </div>
    ),
  },
  {
    description: 'Use Case: Undo operation',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Undo Stack Example</div>
        <div className="flex flex-col gap-1 items-center">
          <div className="px-4 py-2 bg-cyan/30 border border-cyan rounded text-sm">Type "C"</div>
          <div className="px-4 py-2 bg-muted border border-border rounded text-sm">Type "B"</div>
          <div className="px-4 py-2 bg-muted border border-border rounded text-sm">Type "A"</div>
        </div>
        <div className="text-sm text-muted-foreground">Ctrl+Z pops "Type C" to undo!</div>
      </div>
    ),
  },
];

// Linear Search Animation Steps
export const linearSearchAnimationSteps = [
  {
    description: 'Search for 40 in array [10, 25, 30, 40, 50]',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Find: 40</div>
        <div className="flex gap-1">
          {[10, 25, 30, 40, 50].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-muted border-2 border-border rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    description: 'Check index 0: Is 10 == 40? NO',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[10, 25, 30, 40, 50].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i === 0 ? 'bg-orange/30 border-orange' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-orange">10 ≠ 40 ✗ Move to next</div>
      </div>
    ),
  },
  {
    description: 'Check index 1, 2: Still not found',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[10, 25, 30, 40, 50].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i <= 2 ? 'bg-muted/50 border-border' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold ${i <= 2 ? 'text-muted-foreground' : 'text-foreground'}`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Checked: 10 ✗, 25 ✗, 30 ✗</div>
      </div>
    ),
  },
  {
    description: 'Check index 3: Is 40 == 40? YES! Found!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[10, 25, 30, 40, 50].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i === 3 ? 'bg-green/30 border-green animate-pulse' : 'bg-muted/50 border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="bg-green/20 px-4 py-2 rounded text-green font-bold">Found at index 3! ✓</div>
      </div>
    ),
  },
];

// Binary Search Animation Steps
export const binarySearchAnimationSteps = [
  {
    description: 'Search for 40 in sorted array [10, 20, 30, 40, 50, 60, 70]',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Find: 40 (Binary Search)</div>
        <div className="flex gap-1">
          {[10, 20, 30, 40, 50, 60, 70].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-muted border-2 border-border rounded flex items-center justify-center font-bold text-foreground text-sm">
                {val}
              </div>
              <span className="text-xs text-muted-foreground">[{i}]</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">left=0, right=6</div>
      </div>
    ),
  },
  {
    description: 'Mid = 3, arr[3] = 40. Is 40 == 40? YES!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[10, 20, 30, 40, 50, 60, 70].map((val, i) => (
            <div key={i} className={`w-10 h-10 ${i === 3 ? 'bg-green/30 border-green animate-bounce' : 'bg-muted/50 border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground text-sm`}>
              {val}
            </div>
          ))}
        </div>
        <div className="bg-green/20 px-4 py-2 rounded text-green font-bold">Found at index 3 in 1 step! ✓</div>
        <div className="text-sm text-muted-foreground">Binary search: O(log n) vs Linear: O(n)</div>
      </div>
    ),
  },
];

// Bubble Sort Animation Steps
export const bubbleSortAnimationSteps = [
  {
    description: 'Initial array: [64, 34, 25, 12, 22]',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Bubble Sort</div>
        <div className="flex gap-2">
          {[64, 34, 25, 12, 22].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-purple/20 border-2 border-purple rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    description: 'Compare 64 and 34: 64 > 34, swap!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[34, 64, 25, 12, 22].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i <= 1 ? 'bg-orange/30 border-orange' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-orange">64 ↔ 34 swapped</div>
      </div>
    ),
  },
  {
    description: 'After pass 1: 64 bubbled to end',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[34, 25, 12, 22, 64].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i === 4 ? 'bg-green/30 border-green' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-green">64 is in correct position ✓</div>
      </div>
    ),
  },
  {
    description: 'Final sorted array',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[12, 22, 25, 34, 64].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-foreground animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-lg text-green font-bold">Sorted! ✓</div>
      </div>
    ),
  },
];

// Selection Sort Animation Steps
export const selectionSortAnimationSteps = [
  {
    description: 'Initial array: [64, 25, 12, 22, 11]',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Selection Sort</div>
        <div className="flex gap-2">
          {[64, 25, 12, 22, 11].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-orange/20 border-2 border-orange rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    description: 'Find minimum: 11 is smallest',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[64, 25, 12, 22, 11].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i === 4 ? 'bg-cyan/30 border-cyan animate-pulse' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-cyan">Minimum found: 11</div>
      </div>
    ),
  },
  {
    description: 'Swap 64 and 11',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[11, 25, 12, 22, 64].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i === 0 ? 'bg-green/30 border-green' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-green">11 is now in correct position ✓</div>
      </div>
    ),
  },
  {
    description: 'Final sorted array',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[11, 12, 22, 25, 64].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
        </div>
        <div className="text-lg text-green font-bold">Sorted! ✓</div>
      </div>
    ),
  },
];

// Merge Sort Animation Steps
export const mergeSortAnimationSteps = [
  {
    description: 'Divide array into halves',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Merge Sort - Divide</div>
        <div className="flex gap-1">
          {[38, 27, 43, 3, 9, 82, 10].map((val, i) => (
            <div key={i} className="w-10 h-10 bg-cyan/20 border border-cyan rounded flex items-center justify-center font-bold text-sm">
              {val}
            </div>
          ))}
        </div>
        <div className="text-2xl">↓</div>
        <div className="flex gap-8">
          <div className="flex gap-1">
            {[38, 27, 43].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-purple/20 border border-purple rounded flex items-center justify-center font-bold text-sm">
                {val}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {[3, 9, 82, 10].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-orange/20 border border-orange rounded flex items-center justify-center font-bold text-sm">
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    description: 'Keep dividing until single elements',
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2 flex-wrap justify-center">
          {[38, 27, 43, 3, 9, 82, 10].map((val, i) => (
            <div key={i} className="w-10 h-10 bg-muted border border-border rounded flex items-center justify-center font-bold text-sm">
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Each element is now "sorted"</div>
      </div>
    ),
  },
  {
    description: 'Merge pairs in sorted order',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Merge - Conquer</div>
        <div className="flex gap-4 flex-wrap justify-center">
          <div className="flex gap-1">
            {[27, 38].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-green/20 border border-green rounded flex items-center justify-center font-bold text-sm">
                {val}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {[3, 43].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-green/20 border border-green rounded flex items-center justify-center font-bold text-sm">
                {val}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {[9, 82].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-green/20 border border-green rounded flex items-center justify-center font-bold text-sm">
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    description: 'Final merged sorted array',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[3, 9, 10, 27, 38, 43, 82].map((val, i) => (
            <div key={i} className="w-10 h-10 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-lg text-green font-bold">Sorted! O(n log n) ✓</div>
      </div>
    ),
  },
];

// Quick Sort Animation Steps
export const quickSortAnimationSteps = [
  {
    description: 'Choose pivot (last element): 5',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Quick Sort</div>
        <div className="flex gap-2">
          {[10, 7, 8, 9, 1, 5].map((val, i) => (
            <div key={i} className={`w-12 h-12 ${i === 5 ? 'bg-orange/30 border-orange' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-sm text-orange">Pivot = 5</div>
      </div>
    ),
  },
  {
    description: 'Partition: elements < 5 go left, > 5 go right',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <div className="flex gap-1 px-2 py-1 bg-cyan/10 rounded">
            <div className="w-10 h-10 bg-cyan/30 border border-cyan rounded flex items-center justify-center font-bold text-sm">1</div>
          </div>
          <div className="w-10 h-10 bg-orange/30 border-2 border-orange rounded flex items-center justify-center font-bold">5</div>
          <div className="flex gap-1 px-2 py-1 bg-pink/10 rounded">
            {[10, 7, 8, 9].map((val, i) => (
              <div key={i} className="w-10 h-10 bg-pink/30 border border-pink rounded flex items-center justify-center font-bold text-sm">
                {val}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm">
          <span className="text-cyan">Left (&lt;5)</span> | <span className="text-orange">Pivot</span> | <span className="text-pink">Right (&gt;5)</span>
        </div>
      </div>
    ),
  },
  {
    description: 'Recursively sort left and right partitions',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[1, 5, 7, 8, 9, 10].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
        </div>
        <div className="text-lg text-green font-bold">Sorted! ✓</div>
      </div>
    ),
  },
];

// Queue Animation Steps
export const queueAnimationSteps = [
  {
    description: 'Queue: FIFO - First In First Out',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Queue Structure</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-orange">FRONT→</div>
          {[10, 20, 30].map((val, i) => (
            <div key={i} className={`w-14 h-14 ${i === 0 ? 'bg-orange/30 border-orange' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center font-bold text-foreground`}>
              {val}
            </div>
          ))}
          <div className="text-xs text-green">←REAR</div>
        </div>
        <div className="text-sm text-muted-foreground">Like a line at a store!</div>
      </div>
    ),
  },
  {
    description: 'Enqueue: Add to rear - O(1)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Enqueue 40</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-orange">FRONT→</div>
          {[10, 20, 30].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-muted border-2 border-border rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
          <div className="w-12 h-12 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-foreground animate-bounce">
            40
          </div>
          <div className="text-xs text-green">←NEW</div>
        </div>
      </div>
    ),
  },
  {
    description: 'Dequeue: Remove from front - O(1)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Dequeue</div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-orange/30 border-2 border-orange rounded flex items-center justify-center font-bold opacity-50">
            10→
          </div>
          {[20, 30, 40].map((val, i) => (
            <div key={i} className="w-12 h-12 bg-muted border-2 border-border rounded flex items-center justify-center font-bold text-foreground">
              {val}
            </div>
          ))}
        </div>
        <div className="px-4 py-2 bg-green/20 border border-green rounded">Returns: 10</div>
      </div>
    ),
  },
  {
    description: 'Use Case: Print queue',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">🖨️ Printer Queue</div>
        <div className="flex items-center gap-2">
          <div className="text-xs">Next→</div>
          <div className="px-3 py-2 bg-cyan/30 border border-cyan rounded text-sm">Doc1.pdf</div>
          <div className="px-3 py-2 bg-muted border border-border rounded text-sm">Doc2.pdf</div>
          <div className="px-3 py-2 bg-muted border border-border rounded text-sm">Doc3.pdf</div>
        </div>
        <div className="text-sm text-muted-foreground">First document sent prints first!</div>
      </div>
    ),
  },
];

// Recursion Animation Steps
export const recursionAnimationSteps = [
  {
    description: 'Calculate factorial(4): Start the journey',
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="px-4 py-2 bg-purple/30 border-2 border-purple rounded-lg font-mono">factorial(4)</div>
        <div className="text-sm text-muted-foreground">4! = 4 × 3 × 2 × 1 = ?</div>
      </div>
    ),
  },
  {
    description: 'Recursive calls go DOWN the stack',
    visual: (
      <div className="flex flex-col items-center gap-1">
        {[4, 3, 2, 1].map((n, i) => (
          <div key={n} className={`px-4 py-1 rounded font-mono text-sm ${i === 3 ? 'bg-green/30 border-green' : 'bg-muted border-border'} border`}>
            factorial({n}) {i === 3 && '→ returns 1'}
          </div>
        ))}
        <div className="text-xs text-muted-foreground mt-2">Base case reached!</div>
      </div>
    ),
  },
  {
    description: 'Results bubble UP the stack',
    visual: (
      <div className="flex flex-col items-center gap-1">
        <div className="px-4 py-1 rounded font-mono text-sm bg-green/30 border-green border">factorial(4) → 24 ✓</div>
        <div className="px-4 py-1 rounded font-mono text-sm bg-cyan/20 border-cyan border">factorial(3) → 6</div>
        <div className="px-4 py-1 rounded font-mono text-sm bg-cyan/20 border-cyan border">factorial(2) → 2</div>
        <div className="px-4 py-1 rounded font-mono text-sm bg-muted border-border border">factorial(1) → 1</div>
        <div className="text-lg font-bold text-green mt-2">Result: 24</div>
      </div>
    ),
  },
];

// BFS Animation Steps
export const bfsAnimationSteps = [
  {
    description: 'Start BFS from vertex 0',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Breadth-First Search</div>
        <div className="relative w-48 h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-orange/30 border-2 border-orange rounded-full flex items-center justify-center font-bold">0</div>
          <div className="absolute top-12 left-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">1</div>
          <div className="absolute top-12 right-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">2</div>
          <div className="absolute bottom-0 left-1/4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">3</div>
          <div className="absolute bottom-0 right-1/4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">4</div>
        </div>
        <div className="text-sm">Queue: [0] | Visited: {0}</div>
      </div>
    ),
  },
  {
    description: 'Visit level 1: neighbors of 0',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">0</div>
          <div className="absolute top-12 left-4 w-10 h-10 bg-orange/30 border-2 border-orange rounded-full flex items-center justify-center font-bold animate-pulse">1</div>
          <div className="absolute top-12 right-4 w-10 h-10 bg-orange/30 border-2 border-orange rounded-full flex items-center justify-center font-bold animate-pulse">2</div>
          <div className="absolute bottom-0 left-1/4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">3</div>
          <div className="absolute bottom-0 right-1/4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">4</div>
        </div>
        <div className="text-sm">Queue: [1, 2] | Level 1</div>
      </div>
    ),
  },
  {
    description: 'BFS complete - all nodes visited level by level',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((val, i) => (
            <div key={i} className="w-10 h-10 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {val}
            </div>
          ))}
        </div>
        <div className="text-lg text-green font-bold">Order: 0 → 1 → 2 → 3 → 4</div>
      </div>
    ),
  },
];

// DFS Animation Steps
export const dfsAnimationSteps = [
  {
    description: 'Start DFS from vertex 0',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-pink">Depth-First Search</div>
        <div className="relative w-48 h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-pink/30 border-2 border-pink rounded-full flex items-center justify-center font-bold">0</div>
          <div className="absolute top-12 left-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">1</div>
          <div className="absolute top-12 right-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">2</div>
          <div className="absolute bottom-0 left-1/4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">3</div>
        </div>
        <div className="text-sm">Stack: [0] | Go deep first!</div>
      </div>
    ),
  },
  {
    description: 'Go deep: 0 → 1 → 3',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">0</div>
          <div className="absolute top-12 left-4 w-10 h-10 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">1</div>
          <div className="absolute top-12 right-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center font-bold">2</div>
          <div className="absolute bottom-0 left-1/4 w-10 h-10 bg-pink/30 border-2 border-pink rounded-full flex items-center justify-center font-bold animate-pulse">3</div>
        </div>
        <div className="text-sm">Path: 0 → 1 → 3 (deepest)</div>
      </div>
    ),
  },
  {
    description: 'Backtrack and visit 2',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 3, 2].map((val, i) => (
            <div key={i} className="w-10 h-10 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">
              {val}
            </div>
          ))}
        </div>
        <div className="text-lg text-green font-bold">Order: 0 → 1 → 3 → 2</div>
      </div>
    ),
  },
];

// Tree Animation Steps
export const treeAnimationSteps = [
  {
    description: 'Tree structure: Root, children, leaves',
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-semibold text-cyan">Binary Tree</div>
        <div className="w-12 h-12 bg-cyan/30 border-2 border-cyan rounded-full flex items-center justify-center font-bold">
          1
          <span className="absolute -top-5 text-xs text-cyan">root</span>
        </div>
        <div className="flex gap-12">
          <div className="w-10 h-10 bg-purple/30 border-2 border-purple rounded-full flex items-center justify-center font-bold">2</div>
          <div className="w-10 h-10 bg-purple/30 border-2 border-purple rounded-full flex items-center justify-center font-bold">3</div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-green/30 border border-green rounded-full flex items-center justify-center text-sm">4</div>
          <div className="w-8 h-8 bg-green/30 border border-green rounded-full flex items-center justify-center text-sm">5</div>
        </div>
        <div className="text-xs text-muted-foreground">Leaves: nodes with no children</div>
      </div>
    ),
  },
  {
    description: 'Inorder traversal: Left → Root → Right',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Inorder: 4, 2, 5, 1, 3</div>
        <div className="flex gap-2">
          {[4, 2, 5, 1, 3].map((val, i) => (
            <div key={i} className="w-10 h-10 bg-orange/30 border-2 border-orange rounded flex items-center justify-center font-bold" style={{ animationDelay: `${i * 0.2}s` }}>
              {val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// Level 5 - Divide and Conquer Animation Steps
export const divideAndConquerAnimationSteps = [
  {
    description: 'Problem: Sort array [38, 27, 43, 3, 9, 82, 10]',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-cyan">Divide & Conquer: Merge Sort</div>
        <div className="flex gap-1">
          {[38, 27, 43, 3, 9, 82, 10].map((num, i) => (
            <div key={i} className="w-10 h-10 bg-cyan/20 border-2 border-cyan rounded flex items-center justify-center font-bold text-sm">
              {num}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Original unsorted array</div>
      </div>
    ),
  },
  {
    description: 'DIVIDE: Split array into two halves',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Step 1: DIVIDE</div>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {[38, 27, 43, 3].map((num, i) => (
                <div key={i} className="w-8 h-8 bg-purple/20 border-2 border-purple rounded flex items-center justify-center font-bold text-xs">
                  {num}
                </div>
              ))}
            </div>
            <span className="text-xs mt-1">Left half</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {[9, 82, 10].map((num, i) => (
                <div key={i} className="w-8 h-8 bg-orange/20 border-2 border-orange rounded flex items-center justify-center font-bold text-xs">
                  {num}
                </div>
              ))}
            </div>
            <span className="text-xs mt-1">Right half</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    description: 'DIVIDE: Keep splitting until single elements',
    visual: (
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm font-semibold text-foreground">Recursive Division</div>
        <div className="flex gap-2">
          {[38, 27, 43, 3, 9, 82, 10].map((num, i) => (
            <div key={i} className="w-8 h-8 bg-green/20 border-2 border-green rounded-full flex items-center justify-center font-bold text-xs animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {num}
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">Base case: single elements (already sorted!)</div>
      </div>
    ),
  },
  {
    description: 'CONQUER: Merge sorted subarrays',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Step 2: CONQUER (Merge)</div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            {[3, 27, 38, 43].map((num, i) => (
              <div key={i} className="w-8 h-8 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-xs">
                {num}
              </div>
            ))}
          </div>
          <span className="text-lg">+</span>
          <div className="flex gap-1">
            {[9, 10, 82].map((num, i) => (
              <div key={i} className="w-8 h-8 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-xs">
                {num}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">Merge sorted halves</div>
      </div>
    ),
  },
  {
    description: 'COMBINE: Final sorted array!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Final Result</div>
        <div className="flex gap-1">
          {[3, 9, 10, 27, 38, 43, 82].map((num, i) => (
            <div key={i} className="w-10 h-10 bg-green/30 border-2 border-green rounded flex items-center justify-center font-bold text-sm animate-bounce" style={{ animationDelay: `${i * 0.05}s` }}>
              {num}
            </div>
          ))}
        </div>
        <div className="bg-green/20 px-4 py-2 rounded-lg text-sm">Time: O(n log n) | Space: O(n)</div>
      </div>
    ),
  },
];

// Level 5 - Greedy Algorithm Animation Steps
export const greedyAnimationSteps = [
  {
    description: 'Problem: Give change for 41¢ using fewest coins',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Greedy: Coin Change</div>
        <div className="text-4xl font-bold text-foreground">41¢</div>
        <div className="flex gap-2">
          {['25¢', '10¢', '5¢', '1¢'].map((coin, i) => (
            <div key={i} className="w-12 h-12 bg-muted border-2 border-border rounded-full flex items-center justify-center text-sm font-bold">
              {coin}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Available coins</div>
      </div>
    ),
  },
  {
    description: 'Greedy choice: Take largest coin ≤ remaining (25¢)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm">Remaining: <span className="text-green font-bold">41¢</span></div>
        <div className="w-14 h-14 bg-green/30 border-2 border-green rounded-full flex items-center justify-center text-lg font-bold animate-pulse">
          25¢
        </div>
        <div className="text-sm">25¢ ≤ 41¢ ✓ Take it!</div>
        <div className="bg-muted/50 px-4 py-2 rounded-lg font-mono text-sm">41 - 25 = 16¢ remaining</div>
      </div>
    ),
  },
  {
    description: 'Take 10¢ (largest ≤ 16¢)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm">Remaining: <span className="text-green font-bold">16¢</span></div>
        <div className="flex gap-2">
          <div className="w-12 h-12 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">25¢</div>
          <div className="w-12 h-12 bg-orange/30 border-2 border-orange rounded-full flex items-center justify-center font-bold animate-pulse">10¢</div>
        </div>
        <div className="bg-muted/50 px-4 py-2 rounded-lg font-mono text-sm">16 - 10 = 6¢ remaining</div>
      </div>
    ),
  },
  {
    description: 'Take 5¢, then 1¢',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <div className="w-12 h-12 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">25¢</div>
          <div className="w-12 h-12 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">10¢</div>
          <div className="w-12 h-12 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">5¢</div>
          <div className="w-12 h-12 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold">1¢</div>
        </div>
        <div className="bg-muted/50 px-4 py-2 rounded-lg font-mono text-sm">6 - 5 - 1 = 0¢ Done!</div>
      </div>
    ),
  },
  {
    description: 'Optimal solution: 4 coins!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Greedy Works!</div>
        <div className="flex gap-2">
          {['25¢', '10¢', '5¢', '1¢'].map((coin, i) => (
            <div key={i} className="w-12 h-12 bg-green/30 border-2 border-green rounded-full flex items-center justify-center font-bold animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {coin}
            </div>
          ))}
        </div>
        <div className="text-2xl font-bold text-green">= 41¢ with 4 coins</div>
        <div className="text-xs text-muted-foreground">Always choose locally optimal → globally optimal</div>
      </div>
    ),
  },
];

// Level 5 - Backtracking Animation Steps
export const backtrackingAnimationSteps = [
  {
    description: 'Problem: Place 4 Queens on 4x4 board (no attacks)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-purple">Backtracking: N-Queens</div>
        <div className="grid grid-cols-4 gap-1">
          {Array(16).fill(null).map((_, i) => (
            <div key={i} className={`w-8 h-8 ${(Math.floor(i/4) + i%4) % 2 === 0 ? 'bg-muted' : 'bg-muted/50'} border border-border rounded flex items-center justify-center`}>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">No two queens can attack each other</div>
      </div>
    ),
  },
  {
    description: 'Try placing Queen 1 at (0,0)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold">Row 0: Try column 0</div>
        <div className="grid grid-cols-4 gap-1">
          {Array(16).fill(null).map((_, i) => (
            <div key={i} className={`w-8 h-8 ${i === 0 ? 'bg-purple/30 border-purple' : (Math.floor(i/4) + i%4) % 2 === 0 ? 'bg-muted' : 'bg-muted/50'} border rounded flex items-center justify-center`}>
              {i === 0 && '♛'}
            </div>
          ))}
        </div>
        <div className="text-sm text-green">✓ Valid placement</div>
      </div>
    ),
  },
  {
    description: 'Row 1: (1,0) and (1,1) invalid, try (1,2)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold">Row 1: Columns 0,1 blocked</div>
        <div className="grid grid-cols-4 gap-1">
          {Array(16).fill(null).map((_, i) => {
            const row = Math.floor(i/4);
            const col = i % 4;
            const isQueen = (row === 0 && col === 0) || (row === 1 && col === 2);
            const isBlocked = (row === 1 && col < 2);
            return (
              <div key={i} className={`w-8 h-8 ${isQueen ? 'bg-purple/30 border-purple' : isBlocked ? 'bg-destructive/20 border-destructive' : (row + col) % 2 === 0 ? 'bg-muted' : 'bg-muted/50'} border rounded flex items-center justify-center`}>
                {isQueen && '♛'}
                {isBlocked && '✗'}
              </div>
            );
          })}
        </div>
        <div className="text-sm text-green">✓ (1,2) is valid</div>
      </div>
    ),
  },
  {
    description: 'BACKTRACK! Row 2 has no valid positions',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-destructive">⟲ BACKTRACK!</div>
        <div className="flex flex-col gap-1 text-sm">
          <div className="bg-muted/50 px-3 py-1 rounded">Row 2: all columns blocked</div>
          <div className="text-destructive">Remove queen from (1,2)</div>
          <div className="text-orange">Try (1,3) instead...</div>
        </div>
        <div className="text-xs text-muted-foreground">Undo and try different path</div>
      </div>
    ),
  },
  {
    description: 'Solution found after backtracking!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">Solution Found!</div>
        <div className="grid grid-cols-4 gap-1">
          {Array(16).fill(null).map((_, i) => {
            const positions = [[0,1], [1,3], [2,0], [3,2]];
            const row = Math.floor(i/4);
            const col = i % 4;
            const isQueen = positions.some(([r,c]) => r === row && c === col);
            return (
              <div key={i} className={`w-8 h-8 ${isQueen ? 'bg-green/30 border-green' : (row + col) % 2 === 0 ? 'bg-muted' : 'bg-muted/50'} border rounded flex items-center justify-center animate-pulse`} style={isQueen ? { animationDelay: `${row * 0.2}s` } : {}}>
                {isQueen && '♛'}
              </div>
            );
          })}
        </div>
        <div className="text-sm text-green">All 4 queens placed safely!</div>
      </div>
    ),
  },
];

// Level 5 - Dynamic Programming Animation Steps
export const dynamicProgrammingAnimationSteps = [
  {
    description: 'Problem: Fibonacci(6) - Calculate 6th Fibonacci number',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-orange">Dynamic Programming</div>
        <div className="text-sm">F(n) = F(n-1) + F(n-2)</div>
        <div className="flex gap-2">
          {['F(0)', 'F(1)', 'F(2)', 'F(3)', 'F(4)', 'F(5)', 'F(6)'].map((f, i) => (
            <div key={i} className={`w-10 h-10 ${i === 6 ? 'bg-orange/30 border-orange' : 'bg-muted border-border'} border-2 rounded flex items-center justify-center text-xs font-bold`}>
              {i === 6 ? '?' : ''}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Naive recursion: O(2^n) - too slow!</div>
      </div>
    ),
  },
  {
    description: 'Key insight: Overlapping subproblems',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold text-foreground">F(5) calls tree:</div>
        <div className="flex flex-col items-center gap-1 text-xs">
          <div className="px-2 py-1 bg-orange/30 border border-orange rounded">F(5)</div>
          <div className="flex gap-8">
            <div className="px-2 py-1 bg-purple/30 border border-purple rounded">F(4)</div>
            <div className="px-2 py-1 bg-destructive/30 border border-destructive rounded">F(3)</div>
          </div>
          <div className="flex gap-4">
            <div className="px-2 py-1 bg-destructive/30 border border-destructive rounded">F(3)</div>
            <div className="px-2 py-1 bg-muted border-border rounded">F(2)</div>
            <div className="px-2 py-1 bg-muted border-border rounded">F(2)</div>
          </div>
        </div>
        <div className="text-sm text-destructive">F(3) computed multiple times! Wasteful.</div>
      </div>
    ),
  },
  {
    description: 'Solution: Memoization (store results)',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold text-green">Memoization Table</div>
        <div className="flex gap-1">
          {[0, 1, 1, 2, 3, 5, '?'].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 ${i < 6 ? 'bg-green/30 border-green' : 'bg-orange/30 border-orange'} border-2 rounded flex items-center justify-center font-bold`}>
                {val}
              </div>
              <span className="text-xs mt-1">F({i})</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-green">Look up, don't recompute!</div>
      </div>
    ),
  },
  {
    description: 'Bottom-up: Build from base cases',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm font-semibold text-cyan">Tabulation (Bottom-Up)</div>
        <div className="flex gap-1">
          {[0, 1, 1, 2, 3, 5, 8].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-cyan/30 border-2 border-cyan rounded flex items-center justify-center font-bold animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>
                {val}
              </div>
              <span className="text-xs mt-1">F({i})</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-xs bg-muted/50 px-3 py-1 rounded">dp[i] = dp[i-1] + dp[i-2]</div>
      </div>
    ),
  },
  {
    description: 'Result: F(6) = 8 in O(n) time!',
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-green">F(6) = 8</div>
        <div className="flex gap-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive">O(2ⁿ)</div>
            <div className="text-xs text-muted-foreground">Naive</div>
          </div>
          <div className="text-3xl">→</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green animate-bounce">O(n)</div>
            <div className="text-xs text-muted-foreground">DP</div>
          </div>
        </div>
        <div className="bg-green/20 px-4 py-2 rounded-lg text-sm">
          Store subproblems → Avoid recomputation → Optimal!
        </div>
      </div>
    ),
  },
];

