import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ipodSprite from "@/assets/ipod-pixel.webp";
import ipodImg from "@/assets/ipod.png";
import { click, wheel } from "@/lib/sounds";

// Auto-pickup any .mp3 dropped into src/assets/music
const mp3Modules = import.meta.glob("/src/assets/music/*.mp3", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

type Track = { title: string; url: string };
const tracks: Track[] = Object.entries(mp3Modules)
  .map(([path, url]) => ({
    title: decodeURIComponent(path.split("/").pop()!.replace(/\.mp3$/i, "").replace(/[-_]+/g, " ")),
    url,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

// fallback placeholder list if no mp3s yet
const FALLBACK: Track[] = [
  { title: "drop .mp3 in /src/assets/music", url: "" },
  { title: "they auto load here ♡", url: "" },
];

// Sprite is 1024 x 1536. Display.
const W = 300, H = Math.round(300 * 1536 / 1024); // 450
const SCREEN = { left: 0.245 * W, top: 0.123 * H, width: 0.49 * W, height: 0.27 * H };

type Btn = { x: number; y: number; r: number; label: "menu" | "prev" | "next" | "play" | "center" };
const BTNS: Btn[] = [
  { x: 0.500, y: 0.555, r: 20, label: "menu" },
  { x: 0.320, y: 0.655, r: 20, label: "prev" },
  { x: 0.680, y: 0.655, r: 20, label: "next" },
  { x: 0.500, y: 0.755, r: 20, label: "play" },
  { x: 0.500, y: 0.655, r: 24, label: "center" },
];

type View = "menu" | "playlist" | "now";
const MENU = ["Music", "Shuffle", "Backlight"];

export function MP3Player() {
  const list = tracks.length > 0 ? tracks : FALLBACK;
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [view, setView] = useState<View>("menu");
  const [menuSel, setMenuSel] = useState(0);
  const [vol, setVol] = useState(0.7);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // init audio element once
  useEffect(() => {
    const a = new Audio();
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => setTime(a.currentTime || 0);
    const onMeta = () => setDur(a.duration || 0);
    const onEnd = () => { setIdx((i) => (i + 1) % list.length); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [list.length]);

  // when track changes, swap src
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const t = list[idx]; if (!t?.url) { setPlaying(false); return; }
    a.src = t.url; a.volume = vol;
    if (playing) a.play().catch(() => setPlaying(false));
  }, [idx, list]);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    if (playing && a.src) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = vol; }, [vol]);

  const togglePlay = () => {
    if (!list[idx]?.url) return;
    wheel(); setPlaying((p) => !p); setView("now");
  };
  const next = () => { wheel(); setIdx((i) => (i + 1) % list.length); };
  const prev = () => { wheel(); setIdx((i) => (i - 1 + list.length) % list.length); };
  const center = () => {
    click();
    if (view === "menu") {
      if (menuSel === 0) setView("playlist");
      else if (menuSel === 1) { setIdx(Math.floor(Math.random() * list.length)); setPlaying(true); setView("now"); }
    } else if (view === "playlist") {
      setPlaying(true); setView("now");
    } else {
      setView("playlist");
    }
  };
  const menuBtn = () => {
    click();
    if (view === "now") setView("playlist");
    else if (view === "playlist") setView("menu");
    else setView("menu");
  };

  const onBtn = (label: Btn["label"]) => {
    if (label === "play") togglePlay();
    else if (label === "next") {
      next();
      if (view === "menu") setMenuSel((s) => Math.min(MENU.length - 1, s + 1));
      else if (view === "playlist") setIdx((i) => (i + 1) % list.length);
    } else if (label === "prev") {
      prev();
      if (view === "menu") setMenuSel((s) => Math.max(0, s - 1));
      else if (view === "playlist") setIdx((i) => (i - 1 + list.length) % list.length);
    } else if (label === "menu") menuBtn();
    else if (label === "center") center();
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60), ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  return (
    <>
      <motion.button
        onClick={() => { click(); setOpen(true); }}
        whileHover={{ scale: 1.06, rotate: -4 }}
        className="fixed top-6 right-6 z-30 anim-bob"
        aria-label="mp3 player"
      >
        <img src={ipodImg} alt="mp3 player" width={140} height={200} className="pixelated drop-shadow-[4px_4px_0_rgba(168,35,104,0.45)]" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            drag dragMomentum={false}
            initial={{ scale: 0.4, opacity: 0, x: typeof window !== "undefined" ? window.innerWidth - W - 40 : 200, y: 60 }}
            animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 0.4 }}
            className="fixed z-[120] cursor-grab active:cursor-grabbing"
            style={{ left: 0, top: 0 }}
          >
            <div className="relative" style={{ width: W, height: H, filter: "drop-shadow(6px 6px 0 rgba(122,35,80,0.5))" }}>

              <img
                src={ipodSprite} alt="" width={W} height={H}
                onLoad={() => setLoaded(true)}
                className="pixelated select-none pointer-events-none relative"
                draggable={false}
              />

              <button
                onClick={() => { click(); setOpen(false); setPlaying(false); }}
                className="absolute font-pixel text-[10px] bg-white px-2 py-0.5 z-30"
                style={{ top: 6, right: 6, border: "2px solid #5a1a38", color: "#5a1a38", boxShadow: "2px 2px 0 #5a1a38" }}
              >x</button>

              {/* SCREEN */}
              <div
                className="absolute overflow-hidden font-mono-pixel"
                style={{
                  left: SCREEN.left, top: SCREEN.top,
                  width: SCREEN.width, height: SCREEN.height,
                  background: "#d6dff0", color: "#1b2a55", fontSize: 9,
                }}
              >
                <div className="flex justify-between px-1 font-pixel" style={{ background: "#1b2a55", color: "#fff", fontSize: 7 }}>
                  <span>iPod mini</span><span>▮▮▮</span>
                </div>

                {view === "menu" && (
                  <ul className="px-1 py-[1px]" style={{ fontSize: 8, lineHeight: 1.25 }}>
                    {MENU.map((m, i) => (
                      <li key={m} className="flex justify-between px-1"
                        style={{ background: i === menuSel ? "#1b2a55" : "transparent", color: i === menuSel ? "#fff" : "#1b2a55" }}>
                        <span>{m}</span><span>›</span>
                      </li>
                    ))}
                  </ul>
                )}

                {view === "playlist" && (
                  <ul className="overflow-auto" style={{ fontSize: 8, lineHeight: 1.25, maxHeight: SCREEN.height - 14 }}>
                    {list.map((t, i) => (
                      <li key={i} className="px-1 truncate"
                        style={{ background: i === idx ? "#1b2a55" : "transparent", color: i === idx ? "#fff" : "#1b2a55" }}>
                        {i === idx ? "▶ " : "  "}{t.title}
                      </li>
                    ))}
                  </ul>
                )}

                {view === "now" && (
                  <div className="px-1 py-[2px] flex flex-col gap-[2px]" style={{ fontSize: 8 }}>
                    <div className="font-pixel" style={{ fontSize: 6 }}>♫ now playing</div>
                    <div className="truncate" style={{ lineHeight: 1.1 }}>{list[idx]?.title}</div>
                    <div className="mt-1 h-1 w-full" style={{ background: "#9aa6c4" }}>
                      <div style={{ width: `${dur ? (time / dur) * 100 : 0}%`, height: "100%", background: "#1b2a55" }} />
                    </div>
                    <div className="flex justify-between font-pixel" style={{ fontSize: 6 }}>
                      <span>{fmt(time)}</span><span>{playing ? "▶" : "❚❚"}</span><span>{fmt(dur)}</span>
                    </div>
                    {/* tiny EQ */}
                    <div className="flex gap-[1px] items-end h-2 mt-[1px]">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <span key={i} style={{
                          width: 2, background: "#1b2a55",
                          height: playing ? `${2 + ((i * 53 + (Date.now() / 90 | 0)) % 8)}px` : 1,
                          transition: "height 0.18s",
                        }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* invisible button hitboxes over the click wheel */}
              {loaded && BTNS.map((b) => (
                <button
                  key={b.label}
                  onClick={() => onBtn(b.label)}
                  title={b.label}
                  className="absolute rounded-full active:translate-y-[1px]"
                  style={{
                    left: b.x * W - b.r, top: b.y * H - b.r,
                    width: b.r * 2, height: b.r * 2,
                    background: "transparent",
                  }}
                />
              ))}

              {/* volume slider tucked under */}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
