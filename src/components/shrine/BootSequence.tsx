import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { onDone: () => void }

const lines = [
  "> booting kawaii_os v2.04 ...",
  "> loading lace_textures.dll ...",
  "> mounting tamagotchi.sys ...",
  "> connecting to dialup ...",
  "> ♡ ♡ ♡ ♡ ♡ ♡",
  "> welcome to my internet clutter ♡",
];

export function BootSequence({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep((s) => s + 1), step === lines.length - 1 ? 900 : 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setShow(false); setTimeout(onDone, 500); }, 700);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#ffd9ec, #ffeef7)" }}
        >
          <div className="pixel-card p-6 max-w-md w-[90%]">
            <div className="win-titlebar font-pixel text-[10px] px-2 py-1 -m-3 mb-3 rounded-t">
              loading internet magic...
            </div>
            <div className="font-mono-pixel text-pink-deep text-xl space-y-1" style={{ color: "var(--color-pink-deep)" }}>
              {lines.slice(0, step).map((l, i) => (
                <div key={i}>{l}</div>
              ))}
              {step < lines.length && <span className="anim-blink">▮</span>}
            </div>
            <div className="mt-4 h-3 bg-pink-soft border border-pink-deep rounded-full overflow-hidden"
              style={{ background: "var(--color-pink-soft)", borderColor: "var(--color-pink-deep)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / lines.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full"
                style={{ background: "linear-gradient(90deg,#ff8ec5,#ffc6e0)" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
