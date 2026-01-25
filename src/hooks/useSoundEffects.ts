import { useCallback, useRef } from 'react';
import { useSettings } from './useSettings';

type SoundType = 'achievement' | 'goal' | 'celebration';

// Web Audio API based sound generation for lightweight celebration sounds
const createAudioContext = (): AudioContext | null => {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
};

const playTone = (
  ctx: AudioContext,
  frequency: number,
  duration: number,
  startTime: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
) => {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(volume, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

const playAchievementSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  // Triumphant ascending melody
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    playTone(ctx, freq, 0.2, now + i * 0.1, 'sine', 0.25);
  });
  // Add a shimmer effect
  playTone(ctx, 1318.51, 0.4, now + 0.3, 'triangle', 0.15);
};

const playGoalSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  // Celebratory fanfare
  const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
  notes.forEach((freq, i) => {
    playTone(ctx, freq, 0.15, now + i * 0.08, 'square', 0.15);
  });
  // Final chord
  setTimeout(() => {
    playTone(ctx, 523.25, 0.3, ctx.currentTime, 'sine', 0.2);
    playTone(ctx, 659.25, 0.3, ctx.currentTime, 'sine', 0.2);
    playTone(ctx, 783.99, 0.3, ctx.currentTime, 'sine', 0.2);
  }, 400);
};

const playCelebrationSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  // Quick sparkle effect
  const notes = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6
  notes.forEach((freq, i) => {
    playTone(ctx, freq, 0.1, now + i * 0.05, 'sine', 0.2);
  });
};

export const useSoundEffects = () => {
  const { soundEnabled } = useSettings();
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    // Resume context if suspended (required after user interaction)
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (!soundEnabled) return;

      const ctx = getAudioContext();
      if (!ctx) return;

      switch (type) {
        case 'achievement':
          playAchievementSound(ctx);
          break;
        case 'goal':
          playGoalSound(ctx);
          break;
        case 'celebration':
          playCelebrationSound(ctx);
          break;
      }
    },
    [soundEnabled, getAudioContext]
  );

  return { playSound, soundEnabled };
};
