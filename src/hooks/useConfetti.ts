import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useSoundEffects } from './useSoundEffects';

export const useConfetti = () => {
  const { playSound } = useSoundEffects();

  const triggerConfetti = useCallback((type: 'achievement' | 'goal' = 'achievement') => {
    // Play corresponding sound effect
    playSound(type);
    if (type === 'achievement') {
      // Burst of confetti from both sides for achievements
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } else if (type === 'goal') {
      // Shower effect for daily goal completion
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 9999 
      };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
  }, [playSound]);

  const triggerStars = useCallback(() => {
    playSound('celebration');
    // Star-shaped celebration
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFD700', '#FFA500', '#FF6347', '#87CEEB', '#98FB98'],
      shapes: ['star'] as confetti.Shape[],
      zIndex: 9999,
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        origin: { x: 0.5, y: 0.5 },
      });

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 0.75,
        origin: { x: 0.5, y: 0.5 },
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, [playSound]);

  return { triggerConfetti, triggerStars };
};
