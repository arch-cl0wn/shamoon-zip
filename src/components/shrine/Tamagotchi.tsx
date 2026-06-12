import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tamaSprite from "@/assets/tama-pixel.webp";
import tamagotchiImg from "@/assets/tamagotchi.png";
import { tama, click } from "@/lib/sounds";

type Mood = "happy" | "neutral" | "sad" | "sleeping" | "dead";
const FACES: Record<Mood, string> = {
  happy:    "( ˶ˆ ᗜ ˆ˵ )",
  neutral:  "(´･ω･`)",
  sad:      "(╥﹏╥)",
  sleeping: "(_ _)..zZ",
  dead:     "(x_x)",
};

// Sprite 1024x1024. Bigger display.
const W = 520, H = 520;
// Green screen rect tuned to the sprite (slightly enlarged to fully cover existing art)
const SCREEN = { left: 0.378 * W, top: 0.338 * H, width: 0.245 * W, height: 0.235 * H };
// Three white button centers (normalized)
const BTN_Y = 0.66 * H;
const BTN_XS = [0.388 * W, 0.485 * W, 0.582 * W];
const BTN_R = 22;

export function Tamagotchi() {
  const [open, setOpen] = useState(false);
  const [hp, setHp] = useState(80);
  const [fun, setFun] = useState(60);
  const [sleeping, setSleeping] = useState(false);
  const [emote, setEmote] = useState<string | null>(null);
  const [menuIdx, setMenuIdx] = useState(0);
  const wakeRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (hp <= 0) return;
    const t = setInterval(() => {
      setFun((f) => Math.max(0, f - 2));
      setHp((h) => Math.max(0, h - 1));
    }, 4000);
    return () => clearInterval(t);
  }, [hp]);

  const dead = hp <= 0;
  let mood: Mood = "neutral";
  if (dead) mood = "dead";
  else if (sleeping) mood = "sleeping";
  else if (hp >= 60 && fun >= 50) mood = "happy";
  else if (hp < 30 || fun < 25) mood = "sad";

  const flash = (msg: string) => { setEmote(msg); setTimeout(() => setEmote(null), 1100); };
  const guard = (fn: () => void) => () => {
    if (dead) { tama(); flash("x_x"); return; }
    if (sleeping) { tama(); flash("shhh..zzz"); return; }
    fn();
  };
  const feed  = guard(() => { tama(); setHp((h) => Math.min(100, h + 14)); flash("yum! ♡"); });
  const pet   = guard(() => { tama(); setFun((f) => Math.min(100, f + 14)); flash("nya~ ♡"); });
  const bath  = guard(() => { tama(); setHp((h) => Math.min(100, h + 8)); setFun((f) => Math.min(100, f + 4)); flash("splash!"); });
  const nap   = () => {
    if (dead || sleeping) return;
    tama(); setSleeping(true); flash("zzz...");
    wakeRef.current = window.setTimeout(() => {
      setSleeping(false); setHp((h) => Math.min(100, h + 12)); flash("good morning ♡");
    }, 5000);
  };
  const reset = () => {
    if (wakeRef.current) clearTimeout(wakeRef.current);
    tama(); setHp(80); setFun(60); setSleeping(false); flash("reborn ♡");
  };

  const items = [
    { key: "feed", label: "FEED", run: feed },
    { key: "pet",  label: "PET",  run: pet },
    { key: "bath", label: "BATH", run: bath },
    { key: "nap",  label: "NAP",  run: nap },
  ];

  const btnA = () => { click(); setMenuIdx((i) => (i + 1) % items.length); };
  const btnB = () => { click(); items[menuIdx].run(); };
  const btnC = () => { click(); reset(); };

  return (
    <>
      <motion.button
        onClick={() => { click(); setOpen(true); }}
        className="fixed top-[28%] left-4 z-30 anim-bob"
        whileHover={{ scale: 1.08, rotate: -4 }}
        aria-label="open tamagotchi"
      >
        <img src={tamagotchiImg} alt="tamagotchi" width={120} height={140} className="pixelated drop-shadow-[3px_3px_0_rgba(168,35,104,0.4)]" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            drag dragMomentum={false}
            initial={{ scale: 0.3, opacity: 0, x: typeof window !== "undefined" ? Math.max(20, window.innerWidth / 2 - W / 2) : 100, y: 30 }}
            animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.3, opacity: 0 }}
            className="fixed z-[120] cursor-grab active:cursor-grabbing"
            style={{ left: 0, top: 0 }}
          >
            <div className="relative" style={{ width: W, height: H, filter: "drop-shadow(6px 6px 0 rgba(122,35,80,0.5))" }}>
              <img src={tamaSprite} alt="" width={W} height={H} onLoad={() => setLoaded(true)} className="pixelated select-none pointer-events-none" draggable={false} />
              {loaded && (<>


              <button
                onClick={() => { click(); setOpen(false); }}
                className="absolute font-pixel text-[10px] bg-white px-2 py-0.5 z-20"
                style={{ top: 8, right: 8, border: "2px solid #5a1a38", color: "#5a1a38", boxShadow: "2px 2px 0 #5a1a38" }}
              >x</button>

              {/* SCREEN — solid green wipes the sprite's character */}
              <div
                className="absolute overflow-hidden font-mono-pixel"
                style={{
                  left: SCREEN.left, top: SCREEN.top,
                  width: SCREEN.width, height: SCREEN.height,
                  background: "#bcd97a",
                  color: "#2a3a1a",
                }}
              >
                <div className="w-full h-full flex flex-col p-2">
                  {/* big pet face area */}
                  <div className="flex-1 flex items-center justify-center relative">
                    <div style={{ fontSize: mood === "happy" ? 15 : 22, lineHeight: 1, whiteSpace: "nowrap" }}>{FACES[mood]}</div>
                    <AnimatePresence>
                      {emote && (
                        <motion.div
                          initial={{ y: 4, opacity: 0 }} animate={{ y: -10, opacity: 1 }} exit={{ opacity: 0 }}
                          className="absolute top-0 right-0 font-pixel px-1"
                          style={{ background: "#fff", border: "1px solid #2a3a1a", color: "#a82368", fontSize: 7 }}
                        >{emote}</motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* menu */}
                  <div className="flex justify-center gap-1 font-pixel mb-1" style={{ fontSize: 7 }}>
                    {items.map((it, i) => (
                      <span key={it.key} style={{
                        padding: "1px 3px",
                        background: i === menuIdx ? "#2a3a1a" : "transparent",
                        color: i === menuIdx ? "#bcd97a" : "#2a3a1a",
                      }}>{it.label}</span>
                    ))}
                  </div>
                  {/* tiny segmented bars at bottom */}
                  <div className="flex justify-between items-center">
                    <MiniBar label="HP" value={hp} />
                    <MiniBar label="FN" value={fun} />
                  </div>
                </div>
              </div>

              {/* button click zones */}
              {[
                { x: BTN_XS[0], onClick: btnA, title: "cycle" },
                { x: BTN_XS[1], onClick: btnB, title: "pick" },
                { x: BTN_XS[2], onClick: btnC, title: "reset" },
              ].map((b, i) => (
                <button
                  key={i}
                  onClick={b.onClick}
                  title={b.title}
                  className="absolute rounded-full active:translate-y-[1px]"
                  style={{
                    left: b.x - BTN_R, top: BTN_Y - BTN_R,
                    width: BTN_R * 2, height: BTN_R * 2,
                    background: "transparent",
                  }}
                />
              ))}
              <div className="absolute left-0 right-0 flex justify-center gap-5 font-pixel" style={{ top: BTN_Y + BTN_R + 8, fontSize: 9, color: "#fff", textShadow: "1px 1px 0 #5a1a38, -1px 0 0 #5a1a38, 1px 0 0 #5a1a38, 0 1px 0 #5a1a38, 0 -1px 0 #5a1a38" }}>
                <span style={{ width: 36, textAlign: "center" }}>cycle</span>
                <span style={{ width: 36, textAlign: "center" }}>pick</span>
                <span style={{ width: 36, textAlign: "center" }}>reset</span>
              </div>
              </>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MiniBar({ label, value }: { label: string; value: number }) {
  const segs = 7;
  const filled = Math.round((value / 100) * segs);
  return (
    <div className="flex items-center gap-1">
      <span className="font-pixel" style={{ fontSize: 7, color: "#2a3a1a" }}>{label}</span>
      <div className="flex gap-[1px] p-[1px]" style={{ border: "1px solid #2a3a1a" }}>
        {Array.from({ length: segs }).map((_, i) => (
          <div key={i} style={{ width: 4, height: 5, background: i < filled ? "#2a3a1a" : "transparent" }} />
        ))}
      </div>
    </div>
  );
}
