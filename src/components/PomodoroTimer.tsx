import { useState } from 'react';
import {
  Play, Pause, RotateCcw, SkipForward, Settings, Coffee, Brain, Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { usePomodoro, TimerMode } from '@/hooks/usePomodoro';
import { toast } from 'sonner';

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const MODE_CONFIG: Record<TimerMode, { label: string; icon: typeof Brain; color: string }> = {
  work: { label: 'Focus', icon: Brain, color: 'text-primary' },
  shortBreak: { label: 'Short Break', icon: Coffee, color: 'text-green' },
  longBreak: { label: 'Long Break', icon: Timer, color: 'text-accent' },
};

interface PomodoroTimerProps {
  topicId?: string;
}

const PomodoroTimer = ({ topicId }: PomodoroTimerProps) => {
  const {
    mode, timerState, secondsLeft, progress, completedSessions,
    totalPomodorosToday, settings,
    start, pause, reset, skipToNext, switchMode, updateSettings,
  } = usePomodoro(topicId);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const config = MODE_CONFIG[mode];
  const Icon = config.icon;

  // SVG circle progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
      {/* Mode Tabs */}
      <div className="flex border-b border-border/50">
        {(Object.keys(MODE_CONFIG) as TimerMode[]).map((m) => {
          const cfg = MODE_CONFIG[m];
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={cn(
                'flex-1 py-2 text-xs font-medium transition-colors',
                mode === m
                  ? `${cfg.color} bg-muted/50 border-b-2 border-current`
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      <div className="p-5">
        {/* Timer Circle */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <svg width="164" height="164" className="-rotate-90">
              <circle
                cx="82" cy="82" r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
              />
              <circle
                cx="82" cy="82" r={radius}
                fill="none"
                stroke={mode === 'work' ? 'hsl(var(--primary))' : mode === 'shortBreak' ? 'hsl(var(--green))' : 'hsl(var(--accent))'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Icon className={cn('w-5 h-5 mb-1', config.color)} />
              <span className="text-3xl font-bold font-mono text-foreground">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-xs text-muted-foreground mt-1">{config.label}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={reset}
              disabled={timerState === 'idle' && secondsLeft === settings.workMinutes * 60 && mode === 'work'}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              className={cn(
                'h-12 w-12 rounded-full p-0',
                timerState === 'running'
                  ? 'bg-destructive/80 hover:bg-destructive text-destructive-foreground'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              )}
              onClick={timerState === 'running' ? pause : start}
            >
              {timerState === 'running' ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={skipToNext}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Session dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: settings.sessionsBeforeLongBreak }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-colors',
                  i < (completedSessions % settings.sessionsBeforeLongBreak)
                    ? 'bg-primary'
                    : 'bg-muted'
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {totalPomodorosToday} today
            </span>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-4 flex justify-center">
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <Settings className="w-3.5 h-3.5" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Timer Settings</DialogTitle>
                <DialogDescription>Customize your Pomodoro intervals.</DialogDescription>
              </DialogHeader>
              <div className="space-y-5 py-4">
                {[
                  { label: 'Focus time', key: 'workMinutes' as const, min: 5, max: 60, value: settings.workMinutes, unit: 'min' },
                  { label: 'Short break', key: 'shortBreakMinutes' as const, min: 1, max: 15, value: settings.shortBreakMinutes, unit: 'min' },
                  { label: 'Long break', key: 'longBreakMinutes' as const, min: 5, max: 30, value: settings.longBreakMinutes, unit: 'min' },
                  { label: 'Sessions before long break', key: 'sessionsBeforeLongBreak' as const, min: 2, max: 8, value: settings.sessionsBeforeLongBreak, unit: '' },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="font-bold text-primary">{item.value}{item.unit}</span>
                    </div>
                    <Slider
                      value={[item.value]}
                      onValueChange={(v) => updateSettings({ [item.key]: v[0] })}
                      min={item.min}
                      max={item.max}
                      step={1}
                    />
                  </div>
                ))}

                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-start breaks</span>
                    <Switch
                      checked={settings.autoStartBreaks}
                      onCheckedChange={(v) => updateSettings({ autoStartBreaks: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-start focus</span>
                    <Switch
                      checked={settings.autoStartWork}
                      onCheckedChange={(v) => updateSettings({ autoStartWork: v })}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
