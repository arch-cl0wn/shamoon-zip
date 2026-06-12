import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { click } from "@/lib/sounds";
import bowPink from "@/assets/bow-pink.png";

const stay = [
  "aww you're so cute ♡",
  "yay!! let's be friends ♡",
  "i knew you'd stay ♡",
  "hehe welcome home ♡",
];
const leave = [
  "why you don't love me nya? ;_;",
  "oh so you hate me...",
  "this made me sad btw >:3",
  "but I love you...",
  "try again uwu",
];

interface Props { onContinue: () => void }

export function StayPopup({ onContinue }: Props) {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [mood, setMood] = useState<"happy" | "sad">("happy");

  useEffect(() => {
    if (!msg) return;
    if (mood === "happy") {
      const t = setTimeout(() => { setOpen(false); setTimeout(onContinue, 100); }, 900);
      return () => clearTimeout(t);
    }
  }, [msg, mood, onContinue]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ scale: 0.6, y: 40 }} animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="pixel-card w-[90%] max-w-sm relative"
          >
            <img src={bowPink} alt="" className="absolute -top-6 left-1/2 -translate-x-1/2 pixelated" width={64} height={64} />
            <div className="win-titlebar font-pixel text-[10px] px-2 py-1 rounded-t flex items-center justify-between">
              <span>notice ♡</span><span>x</span>
            </div>
            <div className="p-5 text-center">
              <p className="font-display text-2xl text-pink-deep mb-4" style={{ color: "var(--color-pink-deep)" }}>
                do you love me?
              </p>
              {msg && (
                <p
                  key={msg}
                  className="font-mono-pixel text-xl anim-pop mb-4"
                  style={{ color: mood === "happy" ? "#c1468a" : "#7a2350" }}
                >{msg}</p>
              )}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => { click(); setMood("happy"); setMsg(stay[Math.floor(Math.random() * stay.length)]); }}
                  className="font-pixel text-[10px] px-3 py-2 rounded border-2 hover:scale-105 transition"
                  style={{ background: "#ff8ec5", color: "white", borderColor: "#a82368", boxShadow: "2px 2px 0 #a82368" }}
                >YES OFC BABY :3</button>
                <button
                  onClick={() => { click(); setMood("sad"); setMsg(leave[Math.floor(Math.random() * leave.length)]); }}
                  className="font-pixel text-[10px] px-3 py-2 rounded border-2 hover:scale-105 transition"
                  style={{ background: "#fff", color: "#a82368", borderColor: "#a82368", boxShadow: "2px 2px 0 #a82368" }}
                >THE FUCK!?</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
