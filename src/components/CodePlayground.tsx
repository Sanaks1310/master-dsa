import { useState, useCallback } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CodePlaygroundProps {
  initialCode?: string;
  title?: string;
  description?: string;
}

const CodePlayground = ({ 
  initialCode = `// Try running some JavaScript code!
const arr = [64, 34, 25, 12, 22, 11, 90];

// Simple bubble sort implementation
function bubbleSort(arr) {
  const n = arr.length;
  const sorted = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        // Swap elements
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }
    }
  }
  return sorted;
}

console.log("Original:", arr);
console.log("Sorted:", bubbleSort(arr));`,
  title = "Code Playground",
  description = "Write and run JavaScript code to experiment with data structures and algorithms"
}: CodePlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    
    const logs: string[] = [];
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Override console methods to capture output
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
    console.error = (...args) => {
      logs.push(`❌ Error: ${args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')}`);
    };
    console.warn = (...args) => {
      logs.push(`⚠️ Warning: ${args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')}`);
    };

    try {
      // Create a safe execution context
      const safeEval = new Function(`
        "use strict";
        ${code}
      `);
      
      const startTime = performance.now();
      safeEval();
      const endTime = performance.now();
      
      logs.push(`\n✅ Executed in ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
      logs.push(`❌ ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      // Restore original console methods
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      
      setOutput(logs);
      setIsRunning(false);
    }
  }, [code]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    toast.success('Code reset to original');
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      setCode(code.substring(0, start) + '  ' + code.substring(end));
      // Set cursor position after the inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
    // Run code with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyCode}
              className="gap-1"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={runCode}
              disabled={isRunning}
              className="gap-1 bg-green hover:bg-green/90"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Code Editor */}
        <div className="relative">
          <div className="absolute top-2 left-3 text-xs text-muted-foreground font-mono">
            JavaScript
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-[400px] p-4 pt-8 bg-zinc-900 text-zinc-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            spellCheck={false}
            placeholder="Write your code here..."
          />
          <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            Ctrl/Cmd + Enter to run
          </div>
        </div>
        
        {/* Output Console */}
        <div className="bg-zinc-950 min-h-[400px]">
          <div className="flex items-center gap-2 p-2 border-b border-zinc-800">
            <Terminal className="w-4 h-4 text-green" />
            <span className="text-xs font-mono text-zinc-400">Console Output</span>
          </div>
          <div className="p-4 font-mono text-sm h-[360px] overflow-auto">
            {output.length === 0 ? (
              <span className="text-zinc-500">// Output will appear here...</span>
            ) : (
              output.map((line, index) => (
                <div 
                  key={index} 
                  className={`${
                    line.startsWith('❌') ? 'text-red-400' :
                    line.startsWith('⚠️') ? 'text-yellow-400' :
                    line.startsWith('✅') ? 'text-green-400' :
                    'text-zinc-300'
                  } whitespace-pre-wrap mb-1`}
                >
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
