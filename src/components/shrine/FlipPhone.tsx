import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nokiaSprite from "@/assets/nokia-pixel.webp";
import flipImg from "@/assets/flip-phone.png";
import { flipOpen, click, beep } from "@/lib/sounds";

type Screen = "menu" | "messages" | "diary" | "contact" | "games";

const MENU_ITEMS: { key: Screen; label: string; icon: string }[] = [
  { key: "messages", label: "msg",   icon: "✉" },
  { key: "contact",  label: "tel",   icon: "☏" },
  { key: "diary",    label: "diary", icon: "♡" },
  { key: "games",    label: "games", icon: "✦" },
];

const PRESET_MSGS = [
  { from: "mom ♡",  body: "dinner tonight? <3" },
  { from: "bestie", body: "omg new track drop!!" },
];

const SECRETS: Record<string, string> = {
  "22":   "aww baby i love you ♡",
  "2005": "kyaaaa secret msg mwah mwah ♡♡",
};

// Sprite is 832 x 1293. Display bigger.
const W = 340, H = Math.round(340 * 1293 / 832); // ~528
// Screen rect tuned to the white area under NOKIA logo (normalized 0-1)
const SCREEN = { left: 0.288 * W, top: 0.268 * H, width: 0.425 * W, height: 0.215 * H };

// Keypad positions normalized to sprite (832x1293)
// Each entry: [normX, normY, chars]
const KEYS: Array<{ x: number; y: number; chars: string; label: string }> = [
  // d-pad cluster (^ up, v down, \ left, / right) — spaced so hitboxes don't overlap
  { x: 0.500, y: 0.490, chars: "", label: "up" },
  { x: 0.355, y: 0.532, chars: "", label: "left" },
  { x: 0.645, y: 0.532, chars: "", label: "right" },
  { x: 0.500, y: 0.575, chars: "", label: "down" },
  // call/end
  { x: 0.320, y: 0.585, chars: "",    label: "call" },
  { x: 0.680, y: 0.585, chars: "",    label: "end" },
  // 1 2 3
  { x: 0.349, y: 0.642, chars: "1",   label: "1" },
  { x: 0.517, y: 0.642, chars: "2",   label: "2" },
  { x: 0.655, y: 0.642, chars: "3",   label: "3" },
  // 4 5 6
  { x: 0.349, y: 0.707, chars: "4",   label: "4" },
  { x: 0.517, y: 0.707, chars: "5",   label: "5" },
  { x: 0.655, y: 0.707, chars: "6",   label: "6" },
  // 7 8 9
  { x: 0.349, y: 0.772, chars: "7",   label: "7" },
  { x: 0.517, y: 0.772, chars: "8",   label: "8" },
  { x: 0.655, y: 0.772, chars: "9",   label: "9" },
  // * 0 #
  { x: 0.349, y: 0.835, chars: "*",   label: "*" },
  { x: 0.517, y: 0.835, chars: "0",   label: "0" },
  { x: 0.655, y: 0.835, chars: "#",   label: "#" },
];
const KEY_R = 18;

export function FlipPhone() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("menu");
  const [draft, setDraft] = useState("");
  const [secret, setSecret] = useState<string | null>(null);
  const [extraMsgs, setExtraMsgs] = useState<{ from: string; body: string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  const onOpen = () => { flipOpen(); setOpen(true); setScreen("menu"); };
  const onClose = () => { click(); setOpen(false); setSecret(null); setDraft(""); };

  const send = () => {
    const v = draft.trim();
    if (!v) return;
    beep(1500, 0.05);
    if (SECRETS[v]) { setSecret(SECRETS[v]); setTimeout(() => beep(1800, 0.12, "triangle"), 80); }
    else setExtraMsgs((m) => [...m, { from: "u ♡", body: v }]);
    setDraft("");
  };

  const onKeypadPress = (k: { chars: string; label: string }) => {
    click();
    if (k.label === "call") { setScreen("menu"); return; }
    if (k.label === "end") { onClose(); return; }
    if (k.label === "up" || k.label === "down" || k.label === "left" || k.label === "right") {
      window.dispatchEvent(new CustomEvent("snake-dir", { detail: k.label }));
      return;
    }
    if (k.label === "*") { setDraft((d) => d.slice(0, -1)); return; }
    if (k.label === "#") { send(); return; }
    if (k.chars) setDraft((d) => d + k.chars);
  };

  return (
    <>
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.06, rotate: 6 }}
        className="fixed bottom-6 left-6 z-30 anim-bob"
        aria-label="flip phone"
      >
        <img src={flipImg} alt="flip phone" width={110} height={160} className="pixelated drop-shadow-[3px_3px_0_rgba(168,35,104,0.4)]" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            drag dragMomentum={false}
            initial={{ scale: 0.3, opacity: 0, x: typeof window !== "undefined" ? Math.max(20, window.innerWidth / 2 - W / 2) : 100, y: 20 }}
            animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.3, opacity: 0 }}
            className="fixed z-[120] cursor-grab active:cursor-grabbing"
            style={{ left: 0, top: 0 }}
          >
            <div className="relative" style={{ width: W, height: H, filter: "drop-shadow(6px 6px 0 rgba(122,35,80,0.5))" }}>
              <img src={nokiaSprite} alt="" width={W} height={H} onLoad={() => setLoaded(true)} className="pixelated select-none pointer-events-none" draggable={false} />
              {loaded && (<>


              <button
                onClick={onClose}
                className="absolute font-pixel text-[10px] bg-white px-2 py-0.5 z-30"
                style={{ top: 6, right: 6, border: "2px solid #5a1a38", color: "#5a1a38", boxShadow: "2px 2px 0 #5a1a38" }}
              >x</button>

              {/* SCREEN OVERLAY — covers the white screen rect exactly */}
              <div
                className="absolute overflow-hidden"
                style={{
                  left: SCREEN.left, top: SCREEN.top,
                  width: SCREEN.width, height: SCREEN.height,
                  background: "#dff3ff",
                }}
              >
                <PhoneScreen
                  screen={screen}
                  setScreen={setScreen}
                  draft={draft}
                  setDraft={setDraft}
                  send={send}
                  secret={secret}
                  extraMsgs={extraMsgs}
                />
              </div>

              {/* Invisible click overlays for every sprite key */}
              {KEYS.map((k, i) => (
                <button
                  key={i}
                  onClick={() => onKeypadPress(k)}
                  title={k.label}
                  className="absolute rounded-full active:translate-y-[1px]"
                  style={{
                    left: k.x * W - KEY_R, top: k.y * H - KEY_R,
                    width: KEY_R * 2, height: KEY_R * 2,
                    background: "transparent",
                  }}
                />
              ))}
              </>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhoneScreen({
  screen, setScreen, draft, setDraft, send, secret, extraMsgs,
}: {
  screen: Screen; setScreen: (s: Screen) => void;
  draft: string; setDraft: (s: string) => void;
  send: () => void; secret: string | null;
  extraMsgs: { from: string; body: string }[];
}) {
  return (
    <div className="w-full h-full font-mono-pixel flex flex-col" style={{ color: "#0a2c4a", fontSize: 9 }}>
      <div className="flex justify-between px-1 font-pixel" style={{ background: "#ff8ec5", color: "#fff", fontSize: 6 }}>
        <span>♡docomo</span><span className="anim-blink">●●●</span><span>3:14</span>
      </div>

      {screen === "menu" && (
        <div className="grid grid-cols-2 gap-[3px] p-[3px] flex-1">
          {MENU_ITEMS.map((m) => (
            <button
              key={m.key}
              onClick={() => { click(); setScreen(m.key); }}
              className="flex flex-col items-center justify-center font-pixel active:translate-y-[1px]"
              style={{ background: "#fff", border: "1px solid #a82368", color: "#a82368", fontSize: 6, lineHeight: 1 }}
            >
              <span style={{ fontSize: 12 }}>{m.icon}</span>
              <span style={{ marginTop: 2 }}>{m.label}</span>
            </button>
          ))}
        </div>
      )}

      {screen === "messages" && (
        <div className="p-[2px] flex-1 flex flex-col gap-[1px] overflow-hidden">
          <Back onClick={() => setScreen("menu")} />
          <div className="flex-1 overflow-auto space-y-[1px]" style={{ fontSize: 8, lineHeight: 1.1 }}>
            {PRESET_MSGS.map((m, i) => (
              <div key={i} className="px-1" style={{ background: "#fff" }}>
                <div className="font-pixel" style={{ color: "#a82368", fontSize: 6 }}>{m.from}</div>
                <div>{m.body}</div>
              </div>
            ))}
            {extraMsgs.map((m, i) => (
              <div key={i} className="px-1 text-right" style={{ background: "#ffd9ec" }}>
                <div className="font-pixel" style={{ color: "#a82368", fontSize: 6 }}>{m.from}</div>
                <div>{m.body}</div>
              </div>
            ))}
            {secret && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="px-1 font-pixel text-center"
                style={{ background: "#ff5ca0", color: "#fff", fontSize: 6 }}
              >♡ {secret} ♡</motion.div>
            )}
          </div>
          <div className="flex gap-[1px]">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="type or use keypad ↓ (# sends, * deletes)"
              className="flex-1 px-1 outline-none min-w-0"
              style={{ background: "#fff", border: "1px solid #a82368", fontSize: 7 }}
            />
            <button onClick={send} className="font-pixel px-1"
              style={{ background: "#ff8ec5", color: "#fff", border: "1px solid #a82368", fontSize: 6 }}>send</button>
          </div>
        </div>
      )}

      {screen === "diary" && (
        <div className="p-[3px] flex-1" style={{ fontSize: 8, lineHeight: 1.2 }}>
          <Back onClick={() => setScreen("menu")} />
          <p>~ drew bunnies ~</p>
          <p>~ strawberry milk ~</p>
          <p>~ thought of u ♡ ~</p>
        </div>
      )}

      {screen === "contact" && (
        <div className="p-[3px] flex-1" style={{ fontSize: 8, lineHeight: 1.2 }}>
          <Back onClick={() => setScreen("menu")} />
          <p>@ pinkkitty.nya</p>
          <p>080-NYA-NYA</p>
        </div>
      )}

      {screen === "games" && (
        <div className="p-[2px] flex-1 flex flex-col overflow-hidden">
          <Back onClick={() => setScreen("menu")} />
          <SnakeGame />
        </div>
      )}
    </div>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={() => { click(); onClick(); }} className="font-pixel self-start px-1"
      style={{ background: "#fff", border: "1px solid #a82368", color: "#a82368", fontSize: 6 }}>‹ back</button>
  );
}

// ---- Snake ----
type Pt = { x: number; y: number };
const COLS = 14;
const ROWS = 8;

function SnakeGame() {
  const [snake, setSnake] = useState<Pt[]>([{ x: 4, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 4 }]);
  const [food, setFood] = useState<Pt>({ x: 9, y: 4 });
  const [dir, setDir] = useState<Pt>({ x: 1, y: 0 });
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const randFood = useCallback((avoid: Pt[]) => {
    while (true) {
      const f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      if (!avoid.some((p) => p.x === f.x && p.y === f.y)) return f;
    }
  }, []);

  useEffect(() => {
    if (dead) return;
    const t = setInterval(() => {
      setSnake((s) => {
        const d = dirRef.current;
        const head = { x: s[0].x + d.x, y: s[0].y + d.y };
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || s.some((p) => p.x === head.x && p.y === head.y)) {
          setDead(true); beep(200, 0.2, "sawtooth"); return s;
        }
        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...s];
        if (ate) { beep(1500, 0.06); setScore((sc) => sc + 1); setFood(randFood(next)); }
        else next.pop();
        return next;
      });
    }, 240);
    return () => clearInterval(t);
  }, [dead, food, randFood]);

  const turn = useCallback((nd: Pt) => {
    const d = dirRef.current;
    if (nd.x === -d.x && nd.y === -d.y) return;
    setDir(nd);
  }, []);

  useEffect(() => {
    const h = (e: Event) => {
      const dir = (e as CustomEvent<string>).detail;
      if (dir === "up") turn({ x: 0, y: -1 });
      else if (dir === "down") turn({ x: 0, y: 1 });
      else if (dir === "left") turn({ x: -1, y: 0 });
      else if (dir === "right") turn({ x: 1, y: 0 });
    };
    const kh = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") turn({ x: 0, y: -1 });
      else if (e.key === "ArrowDown") turn({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft") turn({ x: -1, y: 0 });
      else if (e.key === "ArrowRight") turn({ x: 1, y: 0 });
      else return;
      e.preventDefault();
    };
    window.addEventListener("snake-dir", h);
    window.addEventListener("keydown", kh);
    return () => { window.removeEventListener("snake-dir", h); window.removeEventListener("keydown", kh); };
  }, [turn]);

  const restart = () => {
    setSnake([{ x: 4, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 4 }]);
    setDir({ x: 1, y: 0 }); setDead(false); setScore(0); setFood({ x: 9, y: 4 });
  };

  const CELL = 7;
  return (
    <div className="flex flex-col items-center gap-[1px] mt-[1px]">
      <div className="font-pixel" style={{ fontSize: 6, color: "#a82368" }}>♡ snake ♡ score:{score} — use ▲▼◀▶ on phone</div>
      <div className="relative" style={{ width: COLS * CELL, height: ROWS * CELL, background: "#dff3ff", boxShadow: "inset 0 0 0 1px #5a1a38" }}>
        {snake.map((p, i) => (
          <div key={i} className="absolute" style={{ left: p.x * CELL, top: p.y * CELL, width: CELL, height: CELL, background: i === 0 ? "#ff5ca0" : "#ff8ec5" }} />
        ))}
        <div className="absolute" style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL, background: "#a82368" }} />
        {dead && (
          <div className="absolute inset-0 flex flex-col items-center justify-center font-pixel" style={{ background: "rgba(255,255,255,0.85)", color: "#a82368", fontSize: 6 }}>
            <div>x_x dead</div>
            <button onClick={restart} className="mt-[1px] px-1" style={{ background: "#ff8ec5", color: "#fff", fontSize: 6, border: "1px solid #5a1a38" }}>retry</button>
          </div>
        )}
      </div>
    </div>
  );
}
