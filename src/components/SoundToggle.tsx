import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/hooks/useSettings';

const SoundToggle = () => {
  const { soundEnabled, toggleSound } = useSettings();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 text-primary" />
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        )}
        <Label htmlFor="sound-toggle" className="text-sm font-medium cursor-pointer">
          Sound Effects
        </Label>
      </div>
      <Switch
        id="sound-toggle"
        checked={soundEnabled}
        onCheckedChange={toggleSound}
        aria-label="Toggle sound effects"
      />
    </div>
  );
};

export default SoundToggle;
