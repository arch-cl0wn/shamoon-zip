import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
const lines = [
  "> booting kawaii_os v2.04 ...",
  "> loading lace_textures.dll ...",
  "> mounting tamagotchi.sys ...",
  "> connecting to dialup ...",
  "> ♡ ♡ ♡ ♡ ♡ ♡",
  "> welcome to my internet clutter ♡"
];
function BootSequence({ onDone }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (step < lines.length) {
      const t2 = setTimeout(() => setStep((s) => s + 1), step === lines.length - 1 ? 900 : 380);
      return () => clearTimeout(t2);
    }
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 500);
    }, 700);
    return () => clearTimeout(t);
  }, [step, onDone]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[200] flex items-center justify-center",
      style: { background: "linear-gradient(135deg,#ffd9ec, #ffeef7)" },
      children: /* @__PURE__ */ jsxs("div", { className: "pixel-card p-6 max-w-md w-[90%]", children: [
        /* @__PURE__ */ jsx("div", { className: "win-titlebar font-pixel text-[10px] px-2 py-1 -m-3 mb-3 rounded-t", children: "loading internet magic..." }),
        /* @__PURE__ */ jsxs("div", { className: "font-mono-pixel text-pink-deep text-xl space-y-1", style: { color: "var(--color-pink-deep)" }, children: [
          lines.slice(0, step).map((l, i) => /* @__PURE__ */ jsx("div", { children: l }, i)),
          step < lines.length && /* @__PURE__ */ jsx("span", { className: "anim-blink", children: "▮" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "mt-4 h-3 bg-pink-soft border border-pink-deep rounded-full overflow-hidden",
            style: { background: "var(--color-pink-soft)", borderColor: "var(--color-pink-deep)" },
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${step / lines.length * 100}%` },
                transition: { duration: 0.3 },
                className: "h-full",
                style: { background: "linear-gradient(90deg,#ff8ec5,#ffc6e0)" }
              }
            )
          }
        )
      ] })
    }
  ) });
}
let ctx = null;
function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
function beep(freq = 880, dur = 0.08, type = "square", vol = 0.08) {
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g);
  g.connect(c.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + dur);
  o.stop(c.currentTime + dur);
}
const click = () => beep(1200, 0.04, "square", 0.06);
const tama = () => {
  beep(880, 0.08);
  setTimeout(() => beep(1320, 0.1), 80);
};
const flipOpen = () => {
  beep(440, 0.06);
  setTimeout(() => beep(660, 0.08), 60);
  setTimeout(() => beep(880, 0.1), 130);
};
const wheel = () => beep(2e3, 0.02, "square", 0.03);
const bowPink = "/assets/bow-pink-CG6k8wYd.png";
const stay = [
  "aww you're so cute ♡",
  "yay!! let's be friends ♡",
  "i knew you'd stay ♡",
  "hehe welcome home ♡"
];
const leave = [
  "why you don't love me nya? ;_;",
  "oh so you hate me...",
  "this made me sad btw >:3",
  "but I love you...",
  "try again uwu"
];
function StayPopup({ onContinue }) {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState(null);
  const [mood, setMood] = useState("happy");
  useEffect(() => {
    if (!msg) return;
    if (mood === "happy") {
      const t = setTimeout(() => {
        setOpen(false);
        setTimeout(onContinue, 100);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [msg, mood, onContinue]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[180] flex items-center justify-center bg-black/30 backdrop-blur-[2px]",
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { scale: 0.6, y: 40 },
          animate: { scale: 1, y: 0 },
          transition: { type: "spring", stiffness: 280, damping: 18 },
          className: "pixel-card w-[90%] max-w-sm relative",
          children: [
            /* @__PURE__ */ jsx("img", { src: bowPink, alt: "", className: "absolute -top-6 left-1/2 -translate-x-1/2 pixelated", width: 64, height: 64 }),
            /* @__PURE__ */ jsxs("div", { className: "win-titlebar font-pixel text-[10px] px-2 py-1 rounded-t flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "notice ♡" }),
              /* @__PURE__ */ jsx("span", { children: "x" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "font-display text-2xl text-pink-deep mb-4", style: { color: "var(--color-pink-deep)" }, children: "do you love me?" }),
              msg && /* @__PURE__ */ jsx(
                "p",
                {
                  className: "font-mono-pixel text-xl anim-pop mb-4",
                  style: { color: mood === "happy" ? "#c1468a" : "#7a2350" },
                  children: msg
                },
                msg
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      click();
                      setMood("happy");
                      setMsg(stay[Math.floor(Math.random() * stay.length)]);
                    },
                    className: "font-pixel text-[10px] px-3 py-2 rounded border-2 hover:scale-105 transition",
                    style: { background: "#ff8ec5", color: "white", borderColor: "#a82368", boxShadow: "2px 2px 0 #a82368" },
                    children: "YES OFC BABY :3"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      click();
                      setMood("sad");
                      setMsg(leave[Math.floor(Math.random() * leave.length)]);
                    },
                    className: "font-pixel text-[10px] px-3 py-2 rounded border-2 hover:scale-105 transition",
                    style: { background: "#fff", color: "#a82368", borderColor: "#a82368", boxShadow: "2px 2px 0 #a82368" },
                    children: "THE FUCK!?"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
const pixelHeart = "/assets/pixel-heart-DjxM3rp8.png";
const pixelStar = "/assets/pixel-star-CEBVVkXO.png";
const sparkle = "/assets/sparkle-BSd_yRtQ.png";
const laceTile = "/assets/lace-tile-821Ty_Z2.png";
const sprites = [pixelHeart, pixelStar, sparkle];
function AmbientBackground() {
  const items = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 18,
    duration: 12 + Math.random() * 18,
    size: 10 + Math.random() * 26,
    src: sprites[i % sprites.length]
  })), []);
  const twinkles = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 2
  })), []);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 -z-10 overflow-hidden pointer-events-none", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-70",
        style: {
          backgroundImage: `url(${laceTile})`,
          backgroundSize: "260px 260px",
          backgroundRepeat: "repeat"
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(180deg, rgba(255,217,236,0.55), rgba(255,238,247,0.85))" } }),
    twinkles.map((t) => /* @__PURE__ */ jsx(
      "img",
      {
        src: sparkle,
        alt: "",
        width: t.size,
        height: t.size,
        className: "absolute pixelated anim-blink",
        style: { left: `${t.left}%`, top: `${t.top}%`, animationDelay: `${t.delay}s`, opacity: 0.75 }
      },
      `t${t.id}`
    )),
    items.map((it) => /* @__PURE__ */ jsx(
      "img",
      {
        src: it.src,
        alt: "",
        width: it.size,
        height: it.size,
        className: "absolute pixelated opacity-90",
        style: {
          left: `${it.left}%`,
          bottom: 0,
          width: it.size,
          height: it.size,
          animation: `float-up ${it.duration}s linear ${it.delay}s infinite`
        }
      },
      it.id
    ))
  ] });
}
const stickerKitty = "/assets/sticker-kitty-BOcwSq0m.png";
function BorderStickers({ seed: seed2 }) {
  const stickers = useMemo(() => {
    const rng = (n) => {
      const x = Math.sin(seed2 * 9301 + n * 49297) * 233280;
      return x - Math.floor(x);
    };
    const edges = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const edge = i % 4;
      const t = rng(i) * 0.7 + 0.1;
      const size = 18 + Math.floor(rng(i + 10) * 10);
      const rot = Math.floor(rng(i + 20) * 40) - 20;
      let style = {};
      if (edge === 0) style = { top: -size / 2, left: `${t * 100}%` };
      if (edge === 1) style = { bottom: -size / 2, left: `${t * 100}%` };
      if (edge === 2) style = { left: -size / 2, top: `${t * 100}%` };
      if (edge === 3) style = { right: -size / 2, top: `${t * 100}%` };
      edges.push({ style, rot, size });
    }
    return edges;
  }, [seed2]);
  return /* @__PURE__ */ jsx(Fragment, { children: stickers.map((s, i) => /* @__PURE__ */ jsx(
    "img",
    {
      src: stickerKitty,
      alt: "",
      width: s.size,
      height: s.size,
      className: "absolute pixelated pointer-events-none drop-shadow-[1px_1px_0_rgba(168,35,104,0.5)]",
      style: { ...s.style, transform: `rotate(${s.rot}deg)`, zIndex: 2 }
    },
    i
  )) });
}
function PixelWindow({
  title,
  children,
  initial = { x: 80, y: 80 },
  width = 360,
  height = "auto",
  onClose,
  z = 1,
  onFocus,
  icon
}) {
  const controls = useDragControls();
  const [closed, setClosed] = useState(false);
  const seed2 = useMemo(() => Math.floor(Math.random() * 1e4), []);
  if (closed) return null;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      drag: true,
      dragControls: controls,
      dragListener: false,
      dragMomentum: false,
      onMouseDown: onFocus,
      initial: { x: initial.x, y: initial.y, scale: 0.9, opacity: 0 },
      animate: { x: initial.x, y: initial.y, scale: 1, opacity: 1 },
      transition: { type: "spring", stiffness: 240, damping: 22 },
      className: "absolute pixel-card flex flex-col",
      style: {
        width,
        height: height === "auto" ? void 0 : height,
        zIndex: z
      },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            onPointerDown: (e) => {
              controls.start(e);
              onFocus?.();
            },
            className: "win-titlebar flex items-center justify-between px-2 py-1 select-none touch-none border-b-2",
            style: { borderColor: "var(--color-window-border)", borderTopLeftRadius: 8, borderTopRightRadius: 8 },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-pixel text-[9px] tracking-tight", children: [
                icon && /* @__PURE__ */ jsx("img", { src: icon, alt: "", width: 16, height: 16, className: "pixelated" }),
                /* @__PURE__ */ jsx("img", { src: pixelHeart, alt: "", width: 12, height: 12, className: "pixelated anim-blink" }),
                /* @__PURE__ */ jsx("span", { children: title })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    click();
                    setClosed(true);
                    onClose?.();
                  },
                  className: "text-[10px] font-pixel bg-white text-pink-deep px-1.5 py-0.5 border border-[color:var(--color-window-border)] rounded hover:bg-pink-soft",
                  "aria-label": "close",
                  children: "x"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("img", { src: bowPink, alt: "", className: "absolute -top-3 -left-3 pixelated pointer-events-none", width: 36, height: 36, style: { zIndex: 3 } }),
        /* @__PURE__ */ jsx(BorderStickers, { seed: seed2 }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-1 overflow-y-auto p-3 bg-white relative",
            style: {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8
            },
            children
          }
        )
      ]
    }
  );
}
const tamaSprite = "/assets/tama-pixel-EK9TxTEH.webp";
const tamagotchiImg = "/assets/tamagotchi-BL18JQ35.png";
const FACES = {
  happy: "( ˶ˆ ᗜ ˆ˵ )",
  neutral: "(´･ω･`)",
  sad: "(╥﹏╥)",
  sleeping: "(_ _)..zZ",
  dead: "(x_x)"
};
const W$2 = 520, H$2 = 520;
const SCREEN$2 = { left: 0.378 * W$2, top: 0.338 * H$2, width: 0.245 * W$2, height: 0.235 * H$2 };
const BTN_Y = 0.66 * H$2;
const BTN_XS = [0.388 * W$2, 0.485 * W$2, 0.582 * W$2];
const BTN_R = 22;
function Tamagotchi() {
  const [open, setOpen] = useState(false);
  const [hp, setHp] = useState(80);
  const [fun, setFun] = useState(60);
  const [sleeping, setSleeping] = useState(false);
  const [emote, setEmote] = useState(null);
  const [menuIdx, setMenuIdx] = useState(0);
  const wakeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (hp <= 0) return;
    const t = setInterval(() => {
      setFun((f) => Math.max(0, f - 2));
      setHp((h) => Math.max(0, h - 1));
    }, 4e3);
    return () => clearInterval(t);
  }, [hp]);
  const dead = hp <= 0;
  let mood = "neutral";
  if (dead) mood = "dead";
  else if (sleeping) mood = "sleeping";
  else if (hp >= 60 && fun >= 50) mood = "happy";
  else if (hp < 30 || fun < 25) mood = "sad";
  const flash = (msg) => {
    setEmote(msg);
    setTimeout(() => setEmote(null), 1100);
  };
  const guard = (fn) => () => {
    if (dead) {
      tama();
      flash("x_x");
      return;
    }
    if (sleeping) {
      tama();
      flash("shhh..zzz");
      return;
    }
    fn();
  };
  const feed = guard(() => {
    tama();
    setHp((h) => Math.min(100, h + 14));
    flash("yum! ♡");
  });
  const pet = guard(() => {
    tama();
    setFun((f) => Math.min(100, f + 14));
    flash("nya~ ♡");
  });
  const bath = guard(() => {
    tama();
    setHp((h) => Math.min(100, h + 8));
    setFun((f) => Math.min(100, f + 4));
    flash("splash!");
  });
  const nap = () => {
    if (dead || sleeping) return;
    tama();
    setSleeping(true);
    flash("zzz...");
    wakeRef.current = window.setTimeout(() => {
      setSleeping(false);
      setHp((h) => Math.min(100, h + 12));
      flash("good morning ♡");
    }, 5e3);
  };
  const reset = () => {
    if (wakeRef.current) clearTimeout(wakeRef.current);
    tama();
    setHp(80);
    setFun(60);
    setSleeping(false);
    flash("reborn ♡");
  };
  const items = [
    { key: "feed", label: "FEED", run: feed },
    { key: "pet", label: "PET", run: pet },
    { key: "bath", label: "BATH", run: bath },
    { key: "nap", label: "NAP", run: nap }
  ];
  const btnA = () => {
    click();
    setMenuIdx((i) => (i + 1) % items.length);
  };
  const btnB = () => {
    click();
    items[menuIdx].run();
  };
  const btnC = () => {
    click();
    reset();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => {
          click();
          setOpen(true);
        },
        className: "fixed top-[28%] left-4 z-30 anim-bob",
        whileHover: { scale: 1.08, rotate: -4 },
        "aria-label": "open tamagotchi",
        children: /* @__PURE__ */ jsx("img", { src: tamagotchiImg, alt: "tamagotchi", width: 120, height: 140, className: "pixelated drop-shadow-[3px_3px_0_rgba(168,35,104,0.4)]" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        drag: true,
        dragMomentum: false,
        initial: { scale: 0.3, opacity: 0, x: typeof window !== "undefined" ? Math.max(20, window.innerWidth / 2 - W$2 / 2) : 100, y: 30 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
        className: "fixed z-[120] cursor-grab active:cursor-grabbing",
        style: { left: 0, top: 0 },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", style: { width: W$2, height: H$2, filter: "drop-shadow(6px 6px 0 rgba(122,35,80,0.5))" }, children: [
          /* @__PURE__ */ jsx("img", { src: tamaSprite, alt: "", width: W$2, height: H$2, onLoad: () => setLoaded(true), className: "pixelated select-none pointer-events-none", draggable: false }),
          loaded && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  click();
                  setOpen(false);
                },
                className: "absolute font-pixel text-[10px] bg-white px-2 py-0.5 z-20",
                style: { top: 8, right: 8, border: "2px solid #5a1a38", color: "#5a1a38", boxShadow: "2px 2px 0 #5a1a38" },
                children: "x"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute overflow-hidden font-mono-pixel",
                style: {
                  left: SCREEN$2.left,
                  top: SCREEN$2.top,
                  width: SCREEN$2.width,
                  height: SCREEN$2.height,
                  background: "#bcd97a",
                  color: "#2a3a1a"
                },
                children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col p-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center justify-center relative", children: [
                    /* @__PURE__ */ jsx("div", { style: { fontSize: mood === "happy" ? 15 : 22, lineHeight: 1, whiteSpace: "nowrap" }, children: FACES[mood] }),
                    /* @__PURE__ */ jsx(AnimatePresence, { children: emote && /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { y: 4, opacity: 0 },
                        animate: { y: -10, opacity: 1 },
                        exit: { opacity: 0 },
                        className: "absolute top-0 right-0 font-pixel px-1",
                        style: { background: "#fff", border: "1px solid #2a3a1a", color: "#a82368", fontSize: 7 },
                        children: emote
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1 font-pixel mb-1", style: { fontSize: 7 }, children: items.map((it, i) => /* @__PURE__ */ jsx("span", { style: {
                    padding: "1px 3px",
                    background: i === menuIdx ? "#2a3a1a" : "transparent",
                    color: i === menuIdx ? "#bcd97a" : "#2a3a1a"
                  }, children: it.label }, it.key)) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsx(MiniBar, { label: "HP", value: hp }),
                    /* @__PURE__ */ jsx(MiniBar, { label: "FN", value: fun })
                  ] })
                ] })
              }
            ),
            [
              { x: BTN_XS[0], onClick: btnA, title: "cycle" },
              { x: BTN_XS[1], onClick: btnB, title: "pick" },
              { x: BTN_XS[2], onClick: btnC, title: "reset" }
            ].map((b, i) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: b.onClick,
                title: b.title,
                className: "absolute rounded-full active:translate-y-[1px]",
                style: {
                  left: b.x - BTN_R,
                  top: BTN_Y - BTN_R,
                  width: BTN_R * 2,
                  height: BTN_R * 2,
                  background: "transparent"
                }
              },
              i
            )),
            /* @__PURE__ */ jsxs("div", { className: "absolute left-0 right-0 flex justify-center gap-5 font-pixel", style: { top: BTN_Y + BTN_R + 8, fontSize: 9, color: "#fff", textShadow: "1px 1px 0 #5a1a38, -1px 0 0 #5a1a38, 1px 0 0 #5a1a38, 0 1px 0 #5a1a38, 0 -1px 0 #5a1a38" }, children: [
              /* @__PURE__ */ jsx("span", { style: { width: 36, textAlign: "center" }, children: "cycle" }),
              /* @__PURE__ */ jsx("span", { style: { width: 36, textAlign: "center" }, children: "pick" }),
              /* @__PURE__ */ jsx("span", { style: { width: 36, textAlign: "center" }, children: "reset" })
            ] })
          ] })
        ] })
      }
    ) })
  ] });
}
function MiniBar({ label, value }) {
  const segs = 7;
  const filled = Math.round(value / 100 * segs);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "font-pixel", style: { fontSize: 7, color: "#2a3a1a" }, children: label }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-[1px] p-[1px]", style: { border: "1px solid #2a3a1a" }, children: Array.from({ length: segs }).map((_, i) => /* @__PURE__ */ jsx("div", { style: { width: 4, height: 5, background: i < filled ? "#2a3a1a" : "transparent" } }, i)) })
  ] });
}
const nokiaSprite = "/assets/nokia-pixel-BfdU9DHu.webp";
const flipImg = "/assets/flip-phone-Bn1qJ1sK.png";
const MENU_ITEMS = [
  { key: "messages", label: "msg", icon: "✉" },
  { key: "contact", label: "tel", icon: "☏" },
  { key: "diary", label: "diary", icon: "♡" },
  { key: "games", label: "games", icon: "✦" }
];
const PRESET_MSGS = [
  { from: "mom ♡", body: "dinner tonight? <3" },
  { from: "bestie", body: "omg new track drop!!" }
];
const SECRETS = {
  "22": "aww baby i love you ♡",
  "2005": "kyaaaa secret msg mwah mwah ♡♡"
};
const W$1 = 340, H$1 = Math.round(340 * 1293 / 832);
const SCREEN$1 = { left: 0.288 * W$1, top: 0.268 * H$1, width: 0.425 * W$1, height: 0.215 * H$1 };
const KEYS = [
  // d-pad cluster (^ up, v down, \ left, / right) — spaced so hitboxes don't overlap
  { x: 0.5, y: 0.49, chars: "", label: "up" },
  { x: 0.355, y: 0.532, chars: "", label: "left" },
  { x: 0.645, y: 0.532, chars: "", label: "right" },
  { x: 0.5, y: 0.575, chars: "", label: "down" },
  // call/end
  { x: 0.32, y: 0.585, chars: "", label: "call" },
  { x: 0.68, y: 0.585, chars: "", label: "end" },
  // 1 2 3
  { x: 0.349, y: 0.642, chars: "1", label: "1" },
  { x: 0.517, y: 0.642, chars: "2", label: "2" },
  { x: 0.655, y: 0.642, chars: "3", label: "3" },
  // 4 5 6
  { x: 0.349, y: 0.707, chars: "4", label: "4" },
  { x: 0.517, y: 0.707, chars: "5", label: "5" },
  { x: 0.655, y: 0.707, chars: "6", label: "6" },
  // 7 8 9
  { x: 0.349, y: 0.772, chars: "7", label: "7" },
  { x: 0.517, y: 0.772, chars: "8", label: "8" },
  { x: 0.655, y: 0.772, chars: "9", label: "9" },
  // * 0 #
  { x: 0.349, y: 0.835, chars: "*", label: "*" },
  { x: 0.517, y: 0.835, chars: "0", label: "0" },
  { x: 0.655, y: 0.835, chars: "#", label: "#" }
];
const KEY_R = 18;
function FlipPhone() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState("menu");
  const [draft, setDraft] = useState("");
  const [secret, setSecret] = useState(null);
  const [extraMsgs, setExtraMsgs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const onOpen = () => {
    flipOpen();
    setOpen(true);
    setScreen("menu");
  };
  const onClose = () => {
    click();
    setOpen(false);
    setSecret(null);
    setDraft("");
  };
  const send = () => {
    const v = draft.trim();
    if (!v) return;
    beep(1500, 0.05);
    if (SECRETS[v]) {
      setSecret(SECRETS[v]);
      setTimeout(() => beep(1800, 0.12, "triangle"), 80);
    } else setExtraMsgs((m) => [...m, { from: "u ♡", body: v }]);
    setDraft("");
  };
  const onKeypadPress = (k) => {
    click();
    if (k.label === "call") {
      setScreen("menu");
      return;
    }
    if (k.label === "end") {
      onClose();
      return;
    }
    if (k.label === "up" || k.label === "down" || k.label === "left" || k.label === "right") {
      window.dispatchEvent(new CustomEvent("snake-dir", { detail: k.label }));
      return;
    }
    if (k.label === "*") {
      setDraft((d) => d.slice(0, -1));
      return;
    }
    if (k.label === "#") {
      send();
      return;
    }
    if (k.chars) setDraft((d) => d + k.chars);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: onOpen,
        whileHover: { scale: 1.06, rotate: 6 },
        className: "fixed bottom-6 left-6 z-30 anim-bob",
        "aria-label": "flip phone",
        children: /* @__PURE__ */ jsx("img", { src: flipImg, alt: "flip phone", width: 110, height: 160, className: "pixelated drop-shadow-[3px_3px_0_rgba(168,35,104,0.4)]" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        drag: true,
        dragMomentum: false,
        initial: { scale: 0.3, opacity: 0, x: typeof window !== "undefined" ? Math.max(20, window.innerWidth / 2 - W$1 / 2) : 100, y: 20 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
        className: "fixed z-[120] cursor-grab active:cursor-grabbing",
        style: { left: 0, top: 0 },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", style: { width: W$1, height: H$1, filter: "drop-shadow(6px 6px 0 rgba(122,35,80,0.5))" }, children: [
          /* @__PURE__ */ jsx("img", { src: nokiaSprite, alt: "", width: W$1, height: H$1, onLoad: () => setLoaded(true), className: "pixelated select-none pointer-events-none", draggable: false }),
          loaded && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "absolute font-pixel text-[10px] bg-white px-2 py-0.5 z-30",
                style: { top: 6, right: 6, border: "2px solid #5a1a38", color: "#5a1a38", boxShadow: "2px 2px 0 #5a1a38" },
                children: "x"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute overflow-hidden",
                style: {
                  left: SCREEN$1.left,
                  top: SCREEN$1.top,
                  width: SCREEN$1.width,
                  height: SCREEN$1.height,
                  background: "#dff3ff"
                },
                children: /* @__PURE__ */ jsx(
                  PhoneScreen,
                  {
                    screen,
                    setScreen,
                    draft,
                    setDraft,
                    send,
                    secret,
                    extraMsgs
                  }
                )
              }
            ),
            KEYS.map((k, i) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onKeypadPress(k),
                title: k.label,
                className: "absolute rounded-full active:translate-y-[1px]",
                style: {
                  left: k.x * W$1 - KEY_R,
                  top: k.y * H$1 - KEY_R,
                  width: KEY_R * 2,
                  height: KEY_R * 2,
                  background: "transparent"
                }
              },
              i
            ))
          ] })
        ] })
      }
    ) })
  ] });
}
function PhoneScreen({
  screen,
  setScreen,
  draft,
  setDraft,
  send,
  secret,
  extraMsgs
}) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full font-mono-pixel flex flex-col", style: { color: "#0a2c4a", fontSize: 9 }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-1 font-pixel", style: { background: "#ff8ec5", color: "#fff", fontSize: 6 }, children: [
      /* @__PURE__ */ jsx("span", { children: "♡docomo" }),
      /* @__PURE__ */ jsx("span", { className: "anim-blink", children: "●●●" }),
      /* @__PURE__ */ jsx("span", { children: "3:14" })
    ] }),
    screen === "menu" && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-[3px] p-[3px] flex-1", children: MENU_ITEMS.map((m) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          click();
          setScreen(m.key);
        },
        className: "flex flex-col items-center justify-center font-pixel active:translate-y-[1px]",
        style: { background: "#fff", border: "1px solid #a82368", color: "#a82368", fontSize: 6, lineHeight: 1 },
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12 }, children: m.icon }),
          /* @__PURE__ */ jsx("span", { style: { marginTop: 2 }, children: m.label })
        ]
      },
      m.key
    )) }),
    screen === "messages" && /* @__PURE__ */ jsxs("div", { className: "p-[2px] flex-1 flex flex-col gap-[1px] overflow-hidden", children: [
      /* @__PURE__ */ jsx(Back, { onClick: () => setScreen("menu") }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto space-y-[1px]", style: { fontSize: 8, lineHeight: 1.1 }, children: [
        PRESET_MSGS.map((m, i) => /* @__PURE__ */ jsxs("div", { className: "px-1", style: { background: "#fff" }, children: [
          /* @__PURE__ */ jsx("div", { className: "font-pixel", style: { color: "#a82368", fontSize: 6 }, children: m.from }),
          /* @__PURE__ */ jsx("div", { children: m.body })
        ] }, i)),
        extraMsgs.map((m, i) => /* @__PURE__ */ jsxs("div", { className: "px-1 text-right", style: { background: "#ffd9ec" }, children: [
          /* @__PURE__ */ jsx("div", { className: "font-pixel", style: { color: "#a82368", fontSize: 6 }, children: m.from }),
          /* @__PURE__ */ jsx("div", { children: m.body })
        ] }, i)),
        secret && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.6, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            className: "px-1 font-pixel text-center",
            style: { background: "#ff5ca0", color: "#fff", fontSize: 6 },
            children: [
              "♡ ",
              secret,
              " ♡"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-[1px]", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") send();
            },
            placeholder: "type or use keypad ↓ (# sends, * deletes)",
            className: "flex-1 px-1 outline-none min-w-0",
            style: { background: "#fff", border: "1px solid #a82368", fontSize: 7 }
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: send,
            className: "font-pixel px-1",
            style: { background: "#ff8ec5", color: "#fff", border: "1px solid #a82368", fontSize: 6 },
            children: "send"
          }
        )
      ] })
    ] }),
    screen === "diary" && /* @__PURE__ */ jsxs("div", { className: "p-[3px] flex-1", style: { fontSize: 8, lineHeight: 1.2 }, children: [
      /* @__PURE__ */ jsx(Back, { onClick: () => setScreen("menu") }),
      /* @__PURE__ */ jsx("p", { children: "~ drew bunnies ~" }),
      /* @__PURE__ */ jsx("p", { children: "~ strawberry milk ~" }),
      /* @__PURE__ */ jsx("p", { children: "~ thought of u ♡ ~" })
    ] }),
    screen === "contact" && /* @__PURE__ */ jsxs("div", { className: "p-[3px] flex-1", style: { fontSize: 8, lineHeight: 1.2 }, children: [
      /* @__PURE__ */ jsx(Back, { onClick: () => setScreen("menu") }),
      /* @__PURE__ */ jsx("p", { children: "@ pinkkitty.nya" }),
      /* @__PURE__ */ jsx("p", { children: "080-NYA-NYA" })
    ] }),
    screen === "games" && /* @__PURE__ */ jsxs("div", { className: "p-[2px] flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsx(Back, { onClick: () => setScreen("menu") }),
      /* @__PURE__ */ jsx(SnakeGame, {})
    ] })
  ] });
}
function Back({ onClick }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => {
        click();
        onClick();
      },
      className: "font-pixel self-start px-1",
      style: { background: "#fff", border: "1px solid #a82368", color: "#a82368", fontSize: 6 },
      children: "‹ back"
    }
  );
}
const COLS = 14;
const ROWS = 8;
function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 4, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 4 }]);
  const [food, setFood] = useState({ x: 9, y: 4 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const randFood = useCallback((avoid) => {
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
          setDead(true);
          beep(200, 0.2, "sawtooth");
          return s;
        }
        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...s];
        if (ate) {
          beep(1500, 0.06);
          setScore((sc) => sc + 1);
          setFood(randFood(next));
        } else next.pop();
        return next;
      });
    }, 240);
    return () => clearInterval(t);
  }, [dead, food, randFood]);
  const turn = useCallback((nd) => {
    const d = dirRef.current;
    if (nd.x === -d.x && nd.y === -d.y) return;
    setDir(nd);
  }, []);
  useEffect(() => {
    const h = (e) => {
      const dir2 = e.detail;
      if (dir2 === "up") turn({ x: 0, y: -1 });
      else if (dir2 === "down") turn({ x: 0, y: 1 });
      else if (dir2 === "left") turn({ x: -1, y: 0 });
      else if (dir2 === "right") turn({ x: 1, y: 0 });
    };
    const kh = (e) => {
      if (e.key === "ArrowUp") turn({ x: 0, y: -1 });
      else if (e.key === "ArrowDown") turn({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft") turn({ x: -1, y: 0 });
      else if (e.key === "ArrowRight") turn({ x: 1, y: 0 });
      else return;
      e.preventDefault();
    };
    window.addEventListener("snake-dir", h);
    window.addEventListener("keydown", kh);
    return () => {
      window.removeEventListener("snake-dir", h);
      window.removeEventListener("keydown", kh);
    };
  }, [turn]);
  const restart = () => {
    setSnake([{ x: 4, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 4 }]);
    setDir({ x: 1, y: 0 });
    setDead(false);
    setScore(0);
    setFood({ x: 9, y: 4 });
  };
  const CELL = 7;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-[1px] mt-[1px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "font-pixel", style: { fontSize: 6, color: "#a82368" }, children: [
      "♡ snake ♡ score:",
      score,
      " — use ▲▼◀▶ on phone"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", style: { width: COLS * CELL, height: ROWS * CELL, background: "#dff3ff", boxShadow: "inset 0 0 0 1px #5a1a38" }, children: [
      snake.map((p, i) => /* @__PURE__ */ jsx("div", { className: "absolute", style: { left: p.x * CELL, top: p.y * CELL, width: CELL, height: CELL, background: i === 0 ? "#ff5ca0" : "#ff8ec5" } }, i)),
      /* @__PURE__ */ jsx("div", { className: "absolute", style: { left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL, background: "#a82368" } }),
      dead && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center font-pixel", style: { background: "rgba(255,255,255,0.85)", color: "#a82368", fontSize: 6 }, children: [
        /* @__PURE__ */ jsx("div", { children: "x_x dead" }),
        /* @__PURE__ */ jsx("button", { onClick: restart, className: "mt-[1px] px-1", style: { background: "#ff8ec5", color: "#fff", fontSize: 6, border: "1px solid #5a1a38" }, children: "retry" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_0 = "/assets/It's%20Not%20Like%20I%20Like%20You!!%20-%20Static-P-c5s-IAsx.mp3";
const __vite_glob_0_1 = "/assets/Looping%20the%20Rooms-BfDd4twX.mp3";
const __vite_glob_0_2 = "/assets/Stereo%20Love%20-CYyFx3xw.mp3";
const __vite_glob_0_3 = "/assets/how%20can%20i%20live%20forever%20(idk)-Dcrx1lqW.mp3";
const __vite_glob_0_4 = "/assets/mosi%20mosi-CalWV19S.mp3";
const ipodSprite = "/assets/ipod-pixel-B6pIijMh.webp";
const ipodImg = "/assets/ipod-J35oApUy.png";
const mp3Modules = /* @__PURE__ */ Object.assign({ "/src/assets/music/It's Not Like I Like You!! - Static-P.mp3": __vite_glob_0_0, "/src/assets/music/Looping the Rooms.mp3": __vite_glob_0_1, "/src/assets/music/Stereo Love .mp3": __vite_glob_0_2, "/src/assets/music/how can i live forever (idk).mp3": __vite_glob_0_3, "/src/assets/music/mosi mosi.mp3": __vite_glob_0_4 });
const tracks = Object.entries(mp3Modules).map(([path, url]) => ({
  title: decodeURIComponent(path.split("/").pop().replace(/\.mp3$/i, "").replace(/[-_]+/g, " ")),
  url
})).sort((a, b) => a.title.localeCompare(b.title));
const FALLBACK = [
  { title: "drop .mp3 in /src/assets/music", url: "" },
  { title: "they auto load here ♡", url: "" }
];
const W = 300, H = Math.round(300 * 1536 / 1024);
const SCREEN = { left: 0.245 * W, top: 0.123 * H, width: 0.49 * W, height: 0.27 * H };
const BTNS = [
  { x: 0.5, y: 0.555, r: 20, label: "menu" },
  { x: 0.32, y: 0.655, r: 20, label: "prev" },
  { x: 0.68, y: 0.655, r: 20, label: "next" },
  { x: 0.5, y: 0.755, r: 20, label: "play" },
  { x: 0.5, y: 0.655, r: 24, label: "center" }
];
const MENU = ["Music", "Shuffle", "Backlight"];
function MP3Player() {
  const list = tracks.length > 0 ? tracks : FALLBACK;
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [view, setView] = useState("menu");
  const [menuSel, setMenuSel] = useState(0);
  const [vol, setVol] = useState(0.7);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const audioRef = useRef(null);
  useEffect(() => {
    const a = new Audio();
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => setTime(a.currentTime || 0);
    const onMeta = () => setDur(a.duration || 0);
    const onEnd = () => {
      setIdx((i) => (i + 1) % list.length);
    };
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
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const t = list[idx];
    if (!t?.url) {
      setPlaying(false);
      return;
    }
    a.src = t.url;
    a.volume = vol;
    if (playing) a.play().catch(() => setPlaying(false));
  }, [idx, list]);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing && a.src) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vol;
  }, [vol]);
  const togglePlay = () => {
    if (!list[idx]?.url) return;
    wheel();
    setPlaying((p) => !p);
    setView("now");
  };
  const next = () => {
    wheel();
    setIdx((i) => (i + 1) % list.length);
  };
  const prev = () => {
    wheel();
    setIdx((i) => (i - 1 + list.length) % list.length);
  };
  const center = () => {
    click();
    if (view === "menu") {
      if (menuSel === 0) setView("playlist");
      else if (menuSel === 1) {
        setIdx(Math.floor(Math.random() * list.length));
        setPlaying(true);
        setView("now");
      }
    } else if (view === "playlist") {
      setPlaying(true);
      setView("now");
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
  const onBtn = (label) => {
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
  const fmt = (s) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60), ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => {
          click();
          setOpen(true);
        },
        whileHover: { scale: 1.06, rotate: -4 },
        className: "fixed top-6 right-6 z-30 anim-bob",
        "aria-label": "mp3 player",
        children: /* @__PURE__ */ jsx("img", { src: ipodImg, alt: "mp3 player", width: 140, height: 200, className: "pixelated drop-shadow-[4px_4px_0_rgba(168,35,104,0.45)]" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        drag: true,
        dragMomentum: false,
        initial: { scale: 0.4, opacity: 0, x: typeof window !== "undefined" ? window.innerWidth - W - 40 : 200, y: 60 },
        animate: { scale: 1, opacity: 1 },
        exit: { opacity: 0, scale: 0.4 },
        className: "fixed z-[120] cursor-grab active:cursor-grabbing",
        style: { left: 0, top: 0 },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", style: { width: W, height: H, filter: "drop-shadow(6px 6px 0 rgba(122,35,80,0.5))" }, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: ipodSprite,
              alt: "",
              width: W,
              height: H,
              onLoad: () => setLoaded(true),
              className: "pixelated select-none pointer-events-none relative",
              draggable: false
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                click();
                setOpen(false);
                setPlaying(false);
              },
              className: "absolute font-pixel text-[10px] bg-white px-2 py-0.5 z-30",
              style: { top: 6, right: 6, border: "2px solid #5a1a38", color: "#5a1a38", boxShadow: "2px 2px 0 #5a1a38" },
              children: "x"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute overflow-hidden font-mono-pixel",
              style: {
                left: SCREEN.left,
                top: SCREEN.top,
                width: SCREEN.width,
                height: SCREEN.height,
                background: "#d6dff0",
                color: "#1b2a55",
                fontSize: 9
              },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-1 font-pixel", style: { background: "#1b2a55", color: "#fff", fontSize: 7 }, children: [
                  /* @__PURE__ */ jsx("span", { children: "iPod mini" }),
                  /* @__PURE__ */ jsx("span", { children: "▮▮▮" })
                ] }),
                view === "menu" && /* @__PURE__ */ jsx("ul", { className: "px-1 py-[1px]", style: { fontSize: 8, lineHeight: 1.25 }, children: MENU.map((m, i) => /* @__PURE__ */ jsxs(
                  "li",
                  {
                    className: "flex justify-between px-1",
                    style: { background: i === menuSel ? "#1b2a55" : "transparent", color: i === menuSel ? "#fff" : "#1b2a55" },
                    children: [
                      /* @__PURE__ */ jsx("span", { children: m }),
                      /* @__PURE__ */ jsx("span", { children: "›" })
                    ]
                  },
                  m
                )) }),
                view === "playlist" && /* @__PURE__ */ jsx("ul", { className: "overflow-auto", style: { fontSize: 8, lineHeight: 1.25, maxHeight: SCREEN.height - 14 }, children: list.map((t, i) => /* @__PURE__ */ jsxs(
                  "li",
                  {
                    className: "px-1 truncate",
                    style: { background: i === idx ? "#1b2a55" : "transparent", color: i === idx ? "#fff" : "#1b2a55" },
                    children: [
                      i === idx ? "▶ " : "  ",
                      t.title
                    ]
                  },
                  i
                )) }),
                view === "now" && /* @__PURE__ */ jsxs("div", { className: "px-1 py-[2px] flex flex-col gap-[2px]", style: { fontSize: 8 }, children: [
                  /* @__PURE__ */ jsx("div", { className: "font-pixel", style: { fontSize: 6 }, children: "♫ now playing" }),
                  /* @__PURE__ */ jsx("div", { className: "truncate", style: { lineHeight: 1.1 }, children: list[idx]?.title }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 h-1 w-full", style: { background: "#9aa6c4" }, children: /* @__PURE__ */ jsx("div", { style: { width: `${dur ? time / dur * 100 : 0}%`, height: "100%", background: "#1b2a55" } }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-pixel", style: { fontSize: 6 }, children: [
                    /* @__PURE__ */ jsx("span", { children: fmt(time) }),
                    /* @__PURE__ */ jsx("span", { children: playing ? "▶" : "❚❚" }),
                    /* @__PURE__ */ jsx("span", { children: fmt(dur) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-[1px] items-end h-2 mt-[1px]", children: Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx("span", { style: {
                    width: 2,
                    background: "#1b2a55",
                    height: playing ? `${2 + (i * 53 + (Date.now() / 90 | 0)) % 8}px` : 1,
                    transition: "height 0.18s"
                  } }, i)) })
                ] })
              ]
            }
          ),
          loaded && BTNS.map((b) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onBtn(b.label),
              title: b.label,
              className: "absolute rounded-full active:translate-y-[1px]",
              style: {
                left: b.x * W - b.r,
                top: b.y * H - b.r,
                width: b.r * 2,
                height: b.r * 2,
                background: "transparent"
              }
            },
            b.label
          ))
        ] })
      }
    ) })
  ] });
}
const camImg = "/assets/pink-camera-Drv8TT2c.png";
const entries = [
  {
    id: "nya",
    title: "★ peeking kitty",
    date: "2026.06.10",
    art: String.raw`
                                  --                                     
                                ´    \   
                                | /´ ⌒.        
                              _.V__  
                         <<#>>  \  ~~ -_    
                       _/\. ワ __     __ヽ<<#>> 
                      /:::/ / /           \ \ 
                    _/:::/ / /      メ  /   \ \ 
                   /::::/   /      / ⁄  /\  \\|\ 
                  /::::/  | |   .--|  /⌒|    )|\\  
                 /:::::|| | |  /_ヘ| / ヘ\ ∩   |:\ 
                /::::::]\ | |  { } レ /マ]_[]_ |::\ 
               .*::::::| \\_\ |^ぼ’   ほ|]    ||:::\ 
               /::::::/     レ\*._ノ⌒╰ィ  \  / |::::\  
              /:::::::|       ___--=-*   /ヽ\_ﾍ|:::::\ 
             /::::::::|    .~ \    く:ワ/*/ /==\|::::::\  
            /:::::::::|   |    *\  /\ /\[.|/====\::::::\ 
           /::::::::::|   \   \  *v\ v\ \\V======\::::::\ 
          /:::::::::::|    \   \    \  \ |\._=====\::::::\ 
         /::::::::::::|     \===\    \  \|-~.\=====\::::::\  
        |:::::::::::::|     |====     \  \    *=-.=/:::::::\ 
        |:::::::::::::/     |====\     :  \    |::::::::::::\ 
        \::::::::::::/      |=====     |   |   |:::::::::::::|  
         \:::::::::/        |=====\    |   ヽ  |:::::::::::::| 
           \:::::/          |======    |    |\ |::::::::::::/ 
             \:/            |======|  ㍼㍼  | \\::::::::::/ 
              v             |======|   /    |  \\:::::::/  
                            |======|  /|    |   \ \:::/ 
                          _/=======|  *|    |  _/\_ v  
                         /========/ ⍻_\   /-*  _| 
                         .=======/  \   \ /   /\/ 
                          *._===_\-._|\._V~~~*  
                             ~~* 
    `
  },
  {
    id: "nyalove",
    title: "♡ chibi miku",
    date: "2026.06.09",
    art: String.raw`
     ╱|、
    (˚ˎ 。7  
     |、˜〵          
     じしˍ,)ノ
     ♡ nya ♡
    `
  },
  {
    id: "iloveu",
    title: "♡ love letter",
    date: "2026.06.08",
    art: String.raw`
   .・゜゜・✩・゜゜・.
    ♡  i love u  ♡
   .・゜゜・✩・゜゜・.
        ✿
       /づ
    `
  },
  {
    id: "bun",
    title: "✿ sleepy bun",
    date: "2026.06.05",
    art: String.raw`
        (\(\
        (-.-)
       o_(")(")
      sleepy bun
    `
  },
  {
    id: "tama",
    title: "✦ tamagotchi",
    date: "2026.06.02",
    art: String.raw`
      .-""""-.
     /  o  o  \
    |    ^^    |
     \  \__/  /
      '-....-'
       T A M A
    `
  },
  {
    id: "bowcat",
    title: "♡ ribbon cat",
    date: "2026.05.30",
    art: String.raw`
       ∧__∧  ♡
      (=^.^=)
      (")_(")
      ribbon cat
    `
  },
  {
    id: "stars",
    title: "✩ starfield",
    date: "2026.05.28",
    art: String.raw`
   ✦ . ⋆ ｡ ˚ ✩ . ⋆ ✦
    . ⋆ ˚ ｡ ✦ . ⋆
   ✩ . ⋆ ✦ ｡ ˚ ⋆ ✩
    `
  },
  {
    id: "bear",
    title: "♡ tiny bear",
    date: "2026.05.20",
    art: String.raw`
     ʕ•ᴥ•ʔ
    /  ♡ \
    bear hug!!
    `
  }
];
function shutter() {
  beep(2400, 0.02, "square", 0.08);
  setTimeout(() => beep(180, 0.06, "sawtooth", 0.06), 30);
  setTimeout(() => beep(120, 0.05, "sawtooth", 0.04), 90);
}
function PinkCamera() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const onOpen = () => {
    shutter();
    setOpen(true);
  };
  const onClose = () => {
    click();
    setOpen(false);
    setSelected(null);
  };
  const pick = (e) => {
    beep(1500, 0.04, "square", 0.06);
    setSelected(e);
  };
  const back = () => {
    click();
    setSelected(null);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: onOpen,
        whileHover: { scale: 1.08, rotate: -4 },
        whileTap: { scale: 0.96 },
        className: "fixed top-[58%] right-4 z-30 anim-bob",
        "aria-label": "open ascii gallery",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: camImg,
            alt: "pink digital camera",
            width: 132,
            height: 110,
            className: "pixelated drop-shadow-[3px_3px_0_rgba(168,35,104,0.4)]"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 z-[110]",
          style: { background: "rgba(168,35,104,0.18)" },
          onClick: onClose
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          drag: true,
          dragMomentum: false,
          initial: { scale: 0.4, opacity: 0, x: 0, y: 0, rotate: -3 },
          animate: { scale: 1, opacity: 1, rotate: 0 },
          exit: { scale: 0.4, opacity: 0, rotate: 3 },
          transition: { type: "spring", stiffness: 260, damping: 22 },
          className: "fixed pixel-card z-[120] left-1/2 top-[12%] -translate-x-1/2 w-fit",
          children: [
            /* @__PURE__ */ jsx("img", { src: bowPink, alt: "", width: 40, height: 40, className: "absolute -top-4 -left-4 pixelated pointer-events-none" }),
            /* @__PURE__ */ jsx("img", { src: bowPink, alt: "", width: 40, height: 40, className: "absolute -top-4 -right-4 pixelated pointer-events-none scale-x-[-1]" }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "win-titlebar flex items-center justify-between px-2 py-1 border-b-2 cursor-grab active:cursor-grabbing select-none",
                style: { borderColor: "var(--color-window-border)", borderTopLeftRadius: 8, borderTopRightRadius: 8 },
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-pixel text-[9px]", children: [
                    /* @__PURE__ */ jsx("img", { src: pixelStar, alt: "", width: 12, height: 12, className: "pixelated anim-blink" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "ascii_cam ♡ ",
                      selected ? "view" : "gallery"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: onClose,
                      className: "text-[10px] font-pixel bg-white text-pink-deep px-1.5 py-0.5 border border-[color:var(--color-window-border)] rounded hover:bg-pink-soft",
                      "aria-label": "close",
                      children: "x"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", style: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }, children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "rounded-md p-2 mb-3 border-2",
                  style: { background: "#1a0d14", borderColor: "#a82368", boxShadow: "inset 0 0 0 2px #ff8ec5" },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-pixel text-[8px]", style: { color: "#ff8ec5" }, children: [
                      /* @__PURE__ */ jsx("span", { children: "● REC" }),
                      /* @__PURE__ */ jsx("span", { className: "anim-blink", children: "●" }),
                      /* @__PURE__ */ jsx("span", { children: selected ? selected.date : `${entries.length} photos` })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "pre",
                      {
                        className: "mt-1 whitespace-pre overflow-x-auto w-max",
                        style: {
                          fontFamily: "Consolas, monospace",
                          color: "#ffd9ec",
                          fontSize: 13,
                          minHeight: selected ? 160 : 60,
                          lineHeight: 1.1
                        },
                        children: selected ? selected.art : "  ♡  select a photo  ♡\n     ↓ ↓ ↓ ↓ ↓"
                      }
                    )
                  ]
                }
              ),
              selected ? /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: back,
                    className: "font-pixel text-[9px] px-3 py-1.5 rounded border-2",
                    style: { background: "#fff", color: "#a82368", borderColor: "#a82368", boxShadow: "2px 2px 0 #a82368" },
                    children: "← back"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-pixel text-[9px]", style: { color: "#a82368" }, children: selected.title })
              ] }) : /* @__PURE__ */ jsx("ul", { className: "space-y-1 max-h-[180px] overflow-y-auto pr-1", children: entries.map((e) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => pick(e),
                  className: "w-full text-left flex items-center gap-2 px-2 py-1.5 rounded border-2 hover:scale-[1.01] transition",
                  style: { background: "#fff5fa", borderColor: "#ffb6da" },
                  children: [
                    /* @__PURE__ */ jsx("img", { src: pixelHeart, alt: "", width: 12, height: 12, className: "pixelated" }),
                    /* @__PURE__ */ jsx("span", { className: "font-pixel text-[9px] flex-1", style: { color: "#a82368" }, children: e.title }),
                    /* @__PURE__ */ jsx("span", { className: "font-mono-pixel text-sm", style: { color: "#7a2350" }, children: e.date })
                  ]
                }
              ) }, e.id)) })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const avatar = "/assets/avatar-BmK61dmb.png";
const bowBlack = "/assets/bow-pink-CG6k8wYd.png";
const pearls = "/assets/pearls-BE_Hj4jx.webp";
const pixelCat = "/assets/pixel-cat-DSY5qIoC.png";
const pixelBunny = "/assets/pixel-bunny-Do2BGZvF.png";
function AboutContent() {
  return /* @__PURE__ */ jsxs("div", { className: "font-display text-[15px]", style: { color: "#5a1838" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: avatar,
          alt: "me",
          width: 450,
          height: 450,
          className: "pixelated rounded-md border-2",
          style: { borderColor: "#a82368", background: "#ffeef7" }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "font-pixel text-[12px] mb-1",
            style: { color: "#a82368" },
            children: "★ shamoon.zip ★"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "leading-snug", children: "welcome to my online junkdrawer~ this website is a small collection of blog posts, ascii art, old games, retro technology, internet oddities, and things i think are worth remembering. this site exists because i miss personal websites. the internet feels a lot more interesting when people build strange little corners for themselves, so this is mine. feel free to look around and stay awhile ♡" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center my-2", children: [
      /* @__PURE__ */ jsx("img", { src: pearls, alt: "", className: "h-6 object-contain opacity-90" }),
      /* @__PURE__ */ jsx("img", { src: pearls, alt: "", className: "h-6 object-contain opacity-90" }),
      /* @__PURE__ */ jsx("img", { src: pearls, alt: "", className: "h-6 object-contain opacity-90" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(
        Section,
        {
          title: "interests",
          items: [
            "lolita fashion",
            "yaoi",
            "obsolete machines",
            "my wife",
            "kuromi"
          ],
          icon: pixelHeart
        }
      ),
      /* @__PURE__ */ jsx(
        Section,
        {
          title: "games",
          items: [
            "toram online",
            "katamari",
            "maple story m",
            "hello kitty my dream store"
          ],
          icon: pixelStar
        }
      ),
      /* @__PURE__ */ jsx(
        Section,
        {
          title: "music",
          items: ["visual kei", "gothic", "jazz", "nightcore"],
          icon: bowPink
        }
      ),
      /* @__PURE__ */ jsx(
        Section,
        {
          title: "anime",
          items: ["ouran", "ccs", "rozen maiden", "given"],
          icon: bowBlack
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2 items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: pixelCat,
          alt: "",
          width: 32,
          height: 32,
          className: "pixelated anim-wiggle"
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "block text-center font-mono-pixel text-pink-deep text-lg",
          style: { color: "#a82368" },
          children: "~ digitally hoarding cool stuff since 2004 ~"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: pixelBunny,
          alt: "",
          width: 32,
          height: 32,
          className: "pixelated anim-wiggle"
        }
      )
    ] })
  ] });
}
function Section({
  title,
  items,
  icon
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-md p-2 border-2",
      style: { background: "#fff5fa", borderColor: "#ffb6da" },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "font-pixel text-[8px] mb-1 flex items-center gap-1",
            style: { color: "#a82368" },
            children: [
              /* @__PURE__ */ jsx("img", { src: icon, alt: "", width: 12, height: 12, className: "pixelated" }),
              " ",
              title
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "ul",
          {
            className: "font-display text-[13px] leading-tight",
            style: { color: "#7a2350" },
            children: items.map((i) => /* @__PURE__ */ jsxs("li", { children: [
              "♡ ",
              i
            ] }, i))
          }
        )
      ]
    }
  );
}
const seed = [
  {
    id: 1,
    title: "old pokemon games were an optimization masterpiece",
    date: "2026-06-10",
    body: `i was thinking about old pokemon games today and honestly i don't think people appreciate how absurd they were from a technical perspective.

the original game boy only had around 8kb of ram and a processor running at roughly 1mhz. that's less powerful than a lot of calculators now. yet somehow they managed to cram an entire world into it. one fifty-one pokemons, towns, routes, npcs, music, battle systems, save files, trading, all packed into about a megabyte of space. a single photo on my phone is larger than the entire game.

what really gets me is that there weren't modern game engines or massive development tools. most of the game was written in assembly, meaning the programmers were working incredibly close to the hardware itself. every byte mattered. pokemon weren't stored as huge objects with endless data attached to them either. they were tiny compressed structures containing stats, moves, types, experience values, evolution information, and whatever else the game needed to know.

and somehow they also made multiplayer work. two game boys talking to each other through a cable, synchronizing battles and trades in real time. on hardware that sounds almost laughably weak by today's standards.

apparently during development some people thought fitting even one complete region into the cartridge would be difficult. then the code was optimized so efficiently that pokemon gold and silver ended up including an entire second region. not a few extra maps, an entire second adventure.

modern games have terabytes of storage, cloud infrastructure, dedicated servers, and development teams larger than some towns. pokemon had a tiny cartridge, microscopic amounts of memory, and a group of people doing what feels like engineering sorcery.

the more i learn about old games, the more impressed i become. pokemon wasn't just a successful game. it was a miracle of constraints, and somehow it went on to become one of the biggest entertainment franchises in the world.`
  },
  {
    id: 2,
    title: "the apollo guidance computer had less power than a tamagotchi",
    date: "2026-06-08",
    body: `apollo guidance computers feel less like computers and more like engineering black magic.

the machine that helped land humans on the moon had roughly 2 kilobytes of ram and around 36 kilobytes of read-only memory. for comparison, a single modern webpage often uses thousands of times more memory just to display text and images.

what fascinates me most is how the software itself was stored. instead of being written to flash memory or a hard drive, much of the code lived in something called core rope memory. workers would literally weave wires through tiny magnetic cores by hand. whether a wire passed through a core or around it determined whether a bit was stored as a 1 or a 0.

the software was physically woven into existence.

updating the code wasn't as simple as downloading a patch. changing the program meant manufacturing entirely new memory modules. when people say something is "hardcoded," the apollo computer is probably the closest thing to the literal definition.

the computer itself ran at just over one megahertz. modern processors measure their speed in gigahertz, meaning they operate thousands of times faster. yet somehow this machine was responsible for navigation, guidance, calculations, and assisting astronauts during one of the most ambitious engineering projects in human history.

the best part is that it occasionally displayed error messages during the moon landing. one of the famous alarms, known as 1202, appeared because the computer was overloaded with data. instead of crashing, it intelligently discarded low-priority tasks and continued running the critical guidance software. it effectively practiced a primitive form of priority scheduling decades before most people ever touched a personal computer.

when i first learned about the apollo guidance computer, i assumed it would be some gigantic supercomputer filling entire rooms. instead, it feels more like a stubborn calculator that somehow helped send people to another world.

the moon landing wasn't only a triumph of rocketry. it was also proof that brilliant engineering can accomplish impossible things even when the available hardware seems laughably inadequate.
`
  },
  {
    id: 3,
    title: "the nitendo DS had 2 CPUs from 2 different eras lol",
    date: "2026-06-05",
    body: `the nintendo ds was basically two different computers hiding inside the same shell.

most consoles have one main processor and that's it. the ds had two.

the first was a newer arm9 processor that actually ran ds games. but sitting right next to it was an older arm7 processor that was already old technology when the ds launched.

and the funniest part is why it was there.

nintendo wanted the ds to play game boy advance games, but instead of writing an emulator or translating anything in software, they basically just left part of the game boy advance inside the console.

when you boot a gba cartridge the ds doesn't really emulate it. it just sort of goes "okay we're a game boy advance now" and starts using the older hardware.

which means millions of people were carrying around a handheld that secretly contained pieces of its predecessor and most of them never realized it.

i think that's what i love about old hardware. sometimes the solution wasn't elegant or modern or particularly sensible. sometimes the answer was just "what if we put another computer in there"

and somehow that worked. that's such a nitendo solution tbh.`
  },
  {
    id: 4,
    title: "the original macintosh had no internal hard drive -_-",
    date: "2026-06-05",
    body: `the original macintosh didn't even have a hard drive

like imagine spending a small fortune on a brand new computer and the first thing it asks you for is a floppy disk just so it can start existing

the operating system lived on a floppy disk. every single time you turned the machine on you had to insert it and wait for the computer to boot.

and then if you actually wanted to save your work it got even funnier.

take out the system disk

put in a different floppy disk

save the file

remove that disk

put the system disk back in

continue working

people were just casually doing this all day.

modern software complains if a file takes two seconds to open. meanwhile macintosh users were physically swapping operating systems in and out of the computer every time they wanted to save a document.

what really gets me is that nobody thought this was weird. this was considered an incredible piece of technology. people saw the graphical interface, the windows, the mouse, the little icons on screen and went completely insane for it.

and honestly i kind of understand why.

the machine had only 128 kilobytes of ram. not megabytes. kilobytes.

that's less memory than the text on this page probably takes up.

early personal computers feel less like products and more like elaborate magic tricks. every time i read about them i end up wondering how anyone got anything done at all.`
  },
  {
    id: 5,
    title: "the fastest computer at one point was held together by hot glue",
    date: "2026-06-05",
    body: `when we think of supercomputers we always imagine some pristine sci-fi room full of glowing panels and impossibly advanced technology...

and then i look at photos of actual supercomputers from various points in history and half of them look like someone gave a group of engineers unlimited caffeine and access to a hardware store

a lot of early high-performance computing wasn't about building one impossibly powerful machine. it was about taking hundreds or thousands of smaller computers and convincing them to behave like one giant computer.

which sounds simple until you remember that every machine has to constantly communicate with every other machine without accidentally turning the whole thing into an expensive space heater.

so the resulting systems often looked completely ridiculous.

racks stacked on racks. cables going everywhere. custom cooling setups. panels removed because somebody needed access to something. zip ties. duct tape. occasionally solutions that feel like they should have violated several laws of physics.

there are stories throughout computing history of machines being held together with whatever happened to work. sometimes the most important computer on the planet looked less like a national technological achievement and more like a university lab that had gotten slightly out of hand.

what i love is that the photos never match the reputation.

you hear "fastest computer in the world" and imagine some alien artifact.

then you see it and think

oh.

that's just a lot of computers standing very close to each other.

which, to be fair, is basically what a supercomputer is.`
  }
];
function BlogContent() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("shrine_posts");
    setPosts(saved ? JSON.parse(saved) : seed);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "font-display", style: { color: "#5a1838" }, children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-2 pr-1", children: posts.map((p) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          click();
          setSelected(p);
        },
        className: "w-full text-left rounded-md p-2 border-2 hover:scale-[1.01] transition",
        style: { background: "#fff5fa", borderColor: "#ffb6da" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: "font-pixel text-[10px]",
                style: { color: "#a82368" },
                children: p.title
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "font-mono-pixel text-sm opacity-70", children: p.date })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 line-clamp-2 opacity-80", children: p.body }),
          /* @__PURE__ */ jsx("span", { className: "font-mono-pixel text-xs opacity-60", children: "♡ click to read full entry ♡" })
        ]
      },
      p.id
    )) }),
    selected && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-[200] flex items-center justify-center p-4",
        style: { background: "rgba(168,35,104,0.35)" },
        onClick: () => setSelected(null),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "pixel-card max-w-[560px] w-full max-h-[80vh] overflow-hidden flex flex-col anim-pop",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "win-titlebar flex justify-between items-center px-3 py-1.5", children: [
                /* @__PURE__ */ jsxs("span", { className: "font-pixel text-[10px]", children: [
                  "♡ ",
                  selected.title,
                  " ♡"
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      click();
                      setSelected(null);
                    },
                    className: "font-pixel text-[10px] bg-white px-1.5 rounded border border-[color:var(--color-window-border)]",
                    children: "x"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 overflow-y-auto bg-white", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "font-mono-pixel text-base opacity-70 mb-2",
                    style: { color: "#a82368" },
                    children: [
                      "posted ",
                      selected.date
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: "font-pixel text-[12px] mb-3",
                    style: { color: "#a82368" },
                    children: selected.title
                  }
                ),
                /* @__PURE__ */ jsx(
                  "article",
                  {
                    className: "font-display text-[15px] leading-relaxed whitespace-pre-wrap",
                    style: { color: "#5a1838" },
                    children: selected.body
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
const links = [
  { name: "twitter ♡", url: "https://x.com/shamoonette", color: "#1da1f2" },
  { name: "github", url: "https://github.com/arch-cl0wn", color: "#34526f" },
  { name: "instagram", url: "https://www.instagram.com/shamoon.ink/", color: "#05cc47" },
  { name: "email ♡", url: "mailto:shamoon.ink@gmail.com", color: "#a82368" }
];
function LinksContent() {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: links.map((l) => /* @__PURE__ */ jsxs(
    "a",
    {
      href: l.url,
      onClick: () => click(),
      className: "font-pixel text-[9px] px-3 py-2 rounded text-center border-2 hover:scale-105 transition relative",
      style: {
        background: "#fff",
        color: l.color,
        borderColor: l.color,
        boxShadow: `2px 2px 0 ${l.color}`
      },
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: pixelHeart,
            alt: "",
            width: 10,
            height: 10,
            className: "inline pixelated mr-1"
          }
        ),
        l.name
      ]
    },
    l.name
  )) });
}
const gbSeed = [
  {
    id: 1,
    name: "uwaaarin★nya",
    msg: "owo kabedon jii ♡",
    date: "2026-06-09"
  },
  {
    id: 2,
    name: "santram.exe",
    msg: "good werk saaar >:3",
    date: "2026-06-07"
  }
];
function GuestbookContent() {
  const [entries2, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [savedFlag, setSavedFlag] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("shrine_gb");
    setEntries(stored ? JSON.parse(stored) : gbSeed);
  }, []);
  const sign = () => {
    if (!name.trim() || !msg.trim()) return;
    click();
    const e = {
      id: Date.now(),
      name,
      msg,
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    const list = [e, ...entries2];
    setEntries(list);
    localStorage.setItem("shrine_gb", JSON.stringify(list));
    setName("");
    setMsg("");
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 2200);
  };
  return /* @__PURE__ */ jsxs("div", { className: "font-display", style: { color: "#5a1838" }, children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-[180px] overflow-y-auto pr-1 mb-2", children: entries2.map((e) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-md p-2 border-2 anim-pop",
        style: { background: "#fff5fa", borderColor: "#ffb6da" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "font-pixel text-[9px]",
                style: { color: "#a82368" },
                children: e.name
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "font-mono-pixel text-sm opacity-70", children: e.date })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm mt-1", children: [
            "♡ ",
            e.msg
          ] })
        ]
      },
      e.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "border-t-2 pt-2", style: { borderColor: "#ffd9ec" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: "your name ♡",
          className: "w-full mb-1 px-2 py-1 rounded border-2 font-display text-sm",
          style: { borderColor: "#ffb6da" }
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: msg,
          onChange: (e) => setMsg(e.target.value),
          placeholder: "leave a message...",
          rows: 2,
          className: "w-full mb-2 px-2 py-1 rounded border-2 font-display text-sm",
          style: { borderColor: "#ffb6da" }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: sign,
            className: "font-pixel text-[9px] px-3 py-1.5 rounded border-2",
            style: {
              background: "#ff8ec5",
              color: "#fff",
              borderColor: "#a82368",
              boxShadow: "2px 2px 0 #a82368"
            },
            children: "sign ♡"
          }
        ),
        savedFlag && /* @__PURE__ */ jsx(
          "span",
          {
            className: "font-pixel text-[9px] anim-pop",
            style: { color: "#a82368" },
            children: "✓ saved ♡"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono-pixel text-xs mt-2 opacity-60", children: "♡ messages save to your browser ♡" })
    ] })
  ] });
}
const banner = "/assets/banner-R0zb4-DL.jpg";
function Shrine() {
  const [booted, setBooted] = useState(false);
  const [popped, setPopped] = useState(false);
  const [zCounter, setZ] = useState(10);
  const [zMap, setZMap] = useState({});
  const focus = (k) => {
    setZ((c) => {
      const n = c + 1;
      setZMap((m) => ({
        ...m,
        [k]: n
      }));
      return n;
    });
  };
  const z = (k, def = 5) => zMap[k] ?? def;
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen w-full relative", style: {
    background: "#ffeef7"
  }, children: [
    /* @__PURE__ */ jsx(AmbientBackground, {}),
    !booted && /* @__PURE__ */ jsx(BootSequence, { onDone: () => setBooted(true) }),
    booted && !popped && /* @__PURE__ */ jsx(StayPopup, { onContinue: () => setPopped(true) }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-hidden border-b-4", style: {
      borderColor: "#ff8ec5",
      background: `url(${laceTile}) repeat`,
      backgroundSize: "180px 180px"
    }, children: /* @__PURE__ */ jsx("img", { src: banner, alt: "shamoon.zip banner", className: "block w-full h-[180px] object-cover pixelated" }) }),
    /* @__PURE__ */ jsxs("header", { className: "text-center pt-6 pb-2 relative z-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-pixel text-[18px] md:text-[26px] inline-flex items-center gap-3", style: {
        color: "#a82368",
        textShadow: "2px 2px 0 #fff, 4px 4px 0 #ffb6da"
      }, children: [
        /* @__PURE__ */ jsx("img", { src: pixelStar, alt: "", width: 28, height: 28, className: "pixelated anim-wiggle" }),
        "welcome to my internet clutter",
        /* @__PURE__ */ jsx("img", { src: pixelHeart, alt: "", width: 28, height: 28, className: "pixelated anim-wiggle" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono-pixel text-xl mt-1", style: {
        color: "#7a2350"
      }, children: "✩ where shamoon discovers another insane piece of computer history at 3am ✩" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { src: sparkle, alt: "", width: 20, height: 20, className: "pixelated anim-blink" }),
        /* @__PURE__ */ jsx("img", { src: sparkle, alt: "", width: 20, height: 20, className: "pixelated anim-blink" }),
        /* @__PURE__ */ jsx("img", { src: sparkle, alt: "", width: 20, height: 20, className: "pixelated anim-blink" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative w-full", style: {
      minHeight: "1000px"
    }, children: [
      /* @__PURE__ */ jsx(PixelWindow, { title: "about_me.txt", initial: {
        x: typeof window !== "undefined" ? window.innerWidth * 0.2 : 80,
        y: 40
      }, width: 360, z: z("about"), onFocus: () => focus("about"), children: /* @__PURE__ */ jsx(AboutContent, {}) }),
      /* @__PURE__ */ jsx(PixelWindow, { title: "blog.txt", initial: {
        x: typeof window !== "undefined" ? Math.max(420, window.innerWidth * 0.5) : 460,
        y: 50
      }, width: 500, height: 500, z: z("blog"), onFocus: () => focus("blog"), children: /* @__PURE__ */ jsx(BlogContent, {}) }),
      /* @__PURE__ */ jsx(PixelWindow, { title: "links.html", initial: {
        x: typeof window !== "undefined" ? window.innerWidth * 0.22 : 80,
        y: 780
      }, width: 300, z: z("links"), onFocus: () => focus("links"), children: /* @__PURE__ */ jsx(LinksContent, {}) }),
      /* @__PURE__ */ jsx(PixelWindow, { title: "guestbook.cgi", initial: {
        x: typeof window !== "undefined" ? Math.max(440, window.innerWidth * 0.5) : 400,
        y: 620
      }, width: 340, z: z("gb"), onFocus: () => focus("gb"), children: /* @__PURE__ */ jsx(GuestbookContent, {}) })
    ] }),
    /* @__PURE__ */ jsx(Tamagotchi, {}),
    /* @__PURE__ */ jsx(FlipPhone, {}),
    /* @__PURE__ */ jsx(MP3Player, {}),
    /* @__PURE__ */ jsx(PinkCamera, {}),
    /* @__PURE__ */ jsx("footer", { className: "relative z-10 text-center py-6 mt-12 font-mono-pixel text-lg", style: {
      color: "#a82368"
    }, children: "♡ made with love ♡ best viewed on 1024x768 ♡" })
  ] });
}
export {
  Shrine as component
};
