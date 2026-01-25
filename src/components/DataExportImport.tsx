import { useRef, useState } from 'react';
import { Download, Upload, FileJson, CheckCircle, AlertCircle, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import SoundToggle from './SoundToggle';
import { Separator } from '@/components/ui/separator';

interface ExportData {
  version: string;
  exportedAt: string;
  progress: unknown;
  bookmarks: string[];
  streak: unknown;
  dailyGoal: unknown;
}

const STORAGE_KEYS = {
  progress: 'dsa-user-progress',
  bookmarks: 'dsa-bookmarks',
  streak: 'dsa-study-streak',
  dailyGoal: 'dsa-daily-goal',
  unlockedAchievements: 'dsa-unlocked-achievements',
};

const DataExportImport = () => {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const exportData: ExportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        progress: JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || '{}'),
        bookmarks: JSON.parse(localStorage.getItem(STORAGE_KEYS.bookmarks) || '[]'),
        streak: JSON.parse(localStorage.getItem(STORAGE_KEYS.streak) || '{}'),
        dailyGoal: JSON.parse(localStorage.getItem(STORAGE_KEYS.dailyGoal) || '{}'),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dsa-progress-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Progress exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export progress');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importData: ExportData = JSON.parse(content);

        // Validate structure
        if (!importData.version || !importData.exportedAt) {
          throw new Error('Invalid backup file format');
        }

        // Import each data type
        if (importData.progress) {
          localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(importData.progress));
        }
        if (importData.bookmarks) {
          localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(importData.bookmarks));
        }
        if (importData.streak) {
          localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(importData.streak));
        }
        if (importData.dailyGoal) {
          localStorage.setItem(STORAGE_KEYS.dailyGoal, JSON.stringify(importData.dailyGoal));
        }

        setImportStatus('success');
        toast.success('Progress restored successfully! Refreshing...');
        
        // Reload the page to apply imported data
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error('Import error:', error);
        setImportStatus('error');
        toast.error('Failed to import progress. Invalid file format.');
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleResetProgress = () => {
    try {
      // Clear all learning data from localStorage
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });

      toast.success('All progress has been reset. Refreshing...');
      
      // Reload the page to apply reset
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Reset error:', error);
      toast.error('Failed to reset progress');
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-4">
        {/* Settings Section */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Settings</h3>
              <p className="text-sm text-muted-foreground">Customize your learning experience</p>
            </div>
          </div>
          <SoundToggle />
        </div>

        <Separator />

        {/* Backup & Restore Section */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
              <FileJson className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Backup & Restore</h3>
              <p className="text-sm text-muted-foreground">Export or import your learning progress</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Import Progress Data</DialogTitle>
                  <DialogDescription>
                    Upload a previously exported backup file to restore your learning progress.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to select a backup file
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      JSON files only
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />

                  {importStatus === 'success' && (
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Import successful! Page will refresh...</span>
                    </div>
                  )}

                  {importStatus === 'error' && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>Invalid backup file. Please try again.</span>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    ⚠️ Importing will overwrite your current progress data.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30">
                  <Trash2 className="w-4 h-4" />
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset All Progress?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>This will permanently delete all your learning data:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                      <li>Topic completion status</li>
                      <li>Quiz scores and history</li>
                      <li>Study streak data</li>
                      <li>Daily goal progress</li>
                      <li>Bookmarked topics</li>
                      <li>Achievement progress</li>
                    </ul>
                    <p className="font-medium mt-3">This action cannot be undone.</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleResetProgress}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportImport;
