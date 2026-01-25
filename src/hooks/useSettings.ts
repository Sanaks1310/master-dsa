import { useState, useEffect, useCallback } from 'react';

interface Settings {
  soundEnabled: boolean;
}

const SETTINGS_KEY = 'dsa-settings';

const defaultSettings: Settings = {
  soundEnabled: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleSound = useCallback(() => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, soundEnabled: enabled }));
  }, []);

  return {
    settings,
    soundEnabled: settings.soundEnabled,
    toggleSound,
    setSoundEnabled,
  };
};
