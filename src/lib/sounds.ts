// Tiny Web Audio click/beep helpers — no external mp3 needed
let ctx: AudioContext | null = null;
function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
export function beep(freq = 880, dur = 0.08, type: OscillatorType = "square", vol = 0.08) {
  const c = ac(); if (!c) return;
  const o = c.createOscillator(); const g = c.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g); g.connect(c.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.stop(c.currentTime + dur);
}
export const click = () => beep(1200, 0.04, "square", 0.06);
export const tama = () => { beep(880, 0.08); setTimeout(() => beep(1320, 0.1), 80); };
export const flipOpen = () => { beep(440, 0.06); setTimeout(() => beep(660, 0.08), 60); setTimeout(() => beep(880, 0.1), 130); };
export const wheel = () => beep(2000, 0.02, "square", 0.03);

// Simple ambient melody loop for "playing" state
let loopTimer: number | null = null;
const melody = [523, 659, 784, 659, 587, 523, 659, 784, 880, 784, 659, 523];
export function startMelody() {
  stopMelody();
  let i = 0;
  loopTimer = window.setInterval(() => {
    beep(melody[i % melody.length], 0.18, "triangle", 0.05);
    i++;
  }, 280);
}
export function stopMelody() { if (loopTimer) { clearInterval(loopTimer); loopTimer = null; } }
