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
