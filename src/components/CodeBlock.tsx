import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 bg-muted/50 hover:bg-muted"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <pre className="code-block p-4 pt-12 overflow-x-auto rounded-lg border border-border">
        <code className="text-sm font-mono text-foreground/90 leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
