/**
 * Audio Effects Engine using Web Audio API
 * Generates browser-synthesized sounds (chimes, error warnings, fanfare) without external audio files.
 * Egyptian English Academy
 */

class AudioEffectsEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (common browser policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isSfxEnabled() {
    return localStorage.getItem("academy_sfx_enabled") !== "false";
  }

  playCorrect() {
    if (!this.isSfxEnabled()) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Play a sweet, pleasant dual-tone chime (C5 -> E5)
    this.playTone(523.25, 0.1, now); // C5
    this.playTone(659.25, 0.15, now + 0.08); // E5
  }

  playIncorrect() {
    if (!this.isSfxEnabled()) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Play a soft, warning buzz-like tone (G3 -> F3 sliding down)
    this.playTone(196.00, 0.15, now, 'triangle'); // G3
    this.playTone(174.61, 0.25, now + 0.08, 'triangle'); // F3
  }

  playCelebration() {
    if (!this.isSfxEnabled()) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Play a happy arpeggio (C5 -> E5 -> G5 -> C6)
    this.playTone(523.25, 0.1, now);
    this.playTone(659.25, 0.1, now + 0.08);
    this.playTone(783.99, 0.1, now + 0.16);
    this.playTone(1046.50, 0.3, now + 0.24);
  }

  playTap() {
    if (!this.isSfxEnabled()) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Play a short, subtle click/tap sound
    this.playTone(600, 0.05, now, 'sine');
  }

  playTone(freq, duration, startTime, type = 'sine') {
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Smooth envelope to prevent clicks
    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }
}

export const sfx = new AudioEffectsEngine();
