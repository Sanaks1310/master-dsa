import { useCallback, useRef } from 'react';
import { useSettings } from './useSettings';

type SoundType = 'achievement' | 'goal' | 'celebration' | 'pomodoroComplete' | 'breakComplete' | 'tick';

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

const playPomodoroCompleteSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  // Warm bell-like chime: descending then resolving up
  playTone(ctx, 880, 0.3, now, 'sine', 0.3);
  playTone(ctx, 698.46, 0.3, now + 0.15, 'sine', 0.25);
  playTone(ctx, 523.25, 0.4, now + 0.3, 'sine', 0.3);
  playTone(ctx, 1046.5, 0.5, now + 0.5, 'triangle', 0.2);
  // Harmonic shimmer
  playTone(ctx, 659.25, 0.4, now + 0.5, 'sine', 0.15);
  playTone(ctx, 783.99, 0.4, now + 0.5, 'sine', 0.15);
};

const playBreakCompleteSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  // Gentle ascending nudge
  playTone(ctx, 440, 0.15, now, 'sine', 0.2);
  playTone(ctx, 554.37, 0.15, now + 0.12, 'sine', 0.2);
  playTone(ctx, 659.25, 0.2, now + 0.24, 'sine', 0.25);
  playTone(ctx, 880, 0.3, now + 0.36, 'triangle', 0.2);
};

const playTickSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  // Subtle single tick
  playTone(ctx, 1200, 0.03, now, 'square', 0.08);
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
        case 'achievement': playAchievementSound(ctx); break;
        case 'goal': playGoalSound(ctx); break;
        case 'celebration': playCelebrationSound(ctx); break;
        case 'pomodoroComplete': playPomodoroCompleteSound(ctx); break;
        case 'breakComplete': playBreakCompleteSound(ctx); break;
        case 'tick': playTickSound(ctx); break;
      }
    },
    [soundEnabled, getAudioContext]
  );

  return { playSound, soundEnabled };
};
