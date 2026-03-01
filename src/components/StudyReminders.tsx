import { Bell, BellOff, BellRing, Clock, Target, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useStudyReminders } from '@/hooks/useStudyReminders';
import { toast } from 'sonner';

const StudyReminders = () => {
  const {
    settings,
    permissionState,
    toggleEnabled,
    setInactivityHours,
    toggleBehindGoal,
    sendTestNotification,
  } = useStudyReminders();

  const handleToggle = async () => {
    const success = await toggleEnabled();
    if (!success && !settings.enabled) {
      toast.error('Notification permission denied', {
        description: 'Please enable notifications in your browser settings.',
      });
    } else if (success && !settings.enabled) {
      toast.success('Study reminders enabled! 🔔');
    }
  };

  const handleTest = () => {
    if (permissionState !== 'granted') {
      toast.error('Enable notifications first');
      return;
    }
    sendTestNotification();
    toast.success('Test notification sent!');
  };

  const notificationsSupported = 'Notification' in window;

  return (
    <div className="mb-6">
      <div
        className={cn(
          'rounded-xl border transition-all duration-300',
          settings.enabled
            ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-transparent'
            : 'border-border bg-card/50'
        )}
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  settings.enabled ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                )}
              >
                {settings.enabled ? <BellRing className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Study Reminders</h3>
                <p className="text-sm text-muted-foreground">
                  {settings.enabled ? 'Notifications active' : 'Get reminded to study'}
                </p>
              </div>
            </div>
            {notificationsSupported ? (
              <Switch checked={settings.enabled} onCheckedChange={handleToggle} />
            ) : (
              <span className="text-xs text-muted-foreground">Not supported</span>
            )}
          </div>

          {/* Settings (shown when enabled) */}
          {settings.enabled && (
            <div className="space-y-4 pt-2 border-t border-border/50">
              {/* Inactivity reminder */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Inactivity reminder</span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {settings.inactivityHours}h
                  </span>
                </div>
                <Slider
                  value={[settings.inactivityHours]}
                  onValueChange={(v) => setInactivityHours(v[0])}
                  min={1}
                  max={72}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Notify if no study activity for {settings.inactivityHours} hour{settings.inactivityHours !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Behind goal reminder */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium">Weekly goal alerts</span>
                    <p className="text-xs text-muted-foreground">Warn when falling behind</p>
                  </div>
                </div>
                <Switch
                  checked={settings.behindGoalEnabled}
                  onCheckedChange={toggleBehindGoal}
                />
              </div>

              {/* Test button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleTest}
                className="w-full gap-2"
              >
                <TestTube className="w-4 h-4" />
                Send Test Notification
              </Button>

              {permissionState === 'denied' && (
                <p className="text-xs text-destructive text-center">
                  Notifications blocked. Please update your browser settings.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyReminders;
