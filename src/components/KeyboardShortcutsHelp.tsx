import { Keyboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Shortcut {
  key: string;
  shiftKey?: boolean;
  description: string;
}

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcuts: Shortcut[];
}

const KeyboardShortcutsHelp = ({ open, onOpenChange, shortcuts }: KeyboardShortcutsHelpProps) => {
  const formatKey = (shortcut: Shortcut) => {
    const parts: string[] = [];
    if (shortcut.shiftKey) parts.push('Shift');
    parts.push(shortcut.key === '/' ? '/' : shortcut.key.toUpperCase());
    return parts;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-primary" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key + (shortcut.shiftKey ? '-shift' : '')}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
            >
              <span className="text-sm text-foreground">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {formatKey(shortcut).map((key, i) => (
                  <span key={i}>
                    {i > 0 && <span className="text-muted-foreground mx-1">+</span>}
                    <Badge variant="outline" className="font-mono text-xs px-2">
                      {key}
                    </Badge>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Press <Badge variant="outline" className="font-mono text-xs px-1.5 mx-1">Shift</Badge>
          <Badge variant="outline" className="font-mono text-xs px-1.5">?</Badge> anytime to show this help
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsHelp;
