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
