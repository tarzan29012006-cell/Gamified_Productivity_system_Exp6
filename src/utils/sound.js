// Audio synthesizer using Web Audio API for rewarding gamification feedback
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback failed silently
    }
  }

  // Melodic success chime when a task is completed (+XP)
  taskComplete() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx ? this.ctx.currentTime : 0;
      // Arpeggio notes: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.2, 0.08);
        }, idx * 60);
      });
    } catch {
      // Audio playback failed silently
    }
  }

  // Level Up fanfare sound
  levelUp() {
    if (!this.enabled) return;
    try {
      this.init();
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'square', 0.25, 0.07);
        }, idx * 75);
      });
    } catch {
      // Audio playback failed silently
    }
  }

  // Achievement unlock sound
  achievement() {
    if (!this.enabled) return;
    try {
      this.init();
      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.3, 0.09);
        }, idx * 90);
      });
    } catch {
      // Audio playback failed silently
    }
  }

  // Gentle click
  click() {
    this.playTone(800, 'sine', 0.04, 0.03);
  }
}

export const sounds = new SoundEffects();
