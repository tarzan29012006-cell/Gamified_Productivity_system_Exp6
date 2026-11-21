import confetti from 'canvas-confetti';

export const triggerConfetti = (originY = 0.7) => {
  try {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: originY },
      colors: ['#a855f7', '#7c3aed', '#ec4899', '#3b82f6', '#22c55e', '#fbbf24']
    });
  } catch {
    // Confetti fallback
  }
};

export const triggerLevelUpConfetti = () => {
  try {
    const end = Date.now() + 2 * 1000;
    const colors = ['#a855f7', '#ec4899', '#f59e0b', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Confetti fallback
  }
};
