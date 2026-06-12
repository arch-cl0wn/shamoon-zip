import { motion, useDragControls } from "framer-motion";
import { useMemo, useState, type ReactNode, type CSSProperties } from "react";
import bowPink from "@/assets/bow-pink.png";
import pixelHeart from "@/assets/pixel-heart.png";
import stickerKitty from "@/assets/sticker-kitty.png";
import { click } from "@/lib/sounds";

interface WindowProps {
  title: string;
  children: ReactNode;
  initial?: { x: number; y: number };
  width?: number;
  height?: number | "auto";
  onClose?: () => void;
  z?: number;
  onFocus?: () => void;
  accent?: "pink" | "black" | "white";
  icon?: string;
  style?: CSSProperties;
}

// Tiny hello-kitty stickers scattered along the dialog border
function BorderStickers({ seed }: { seed: number }) {
  const stickers = useMemo(() => {
    const rng = (n: number) => {
      const x = Math.sin(seed * 9301 + n * 49297) * 233280;
      return x - Math.floor(x);
    };
    // distribute around the 4 edges
    const edges: { style: CSSProperties; rot: number; size: number }[] = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const edge = i % 4;
      const t = rng(i) * 0.7 + 0.1; // 10%..80%
      const size = 18 + Math.floor(rng(i + 10) * 10);
      const rot = Math.floor(rng(i + 20) * 40) - 20;
      let style: CSSProperties = {};
      if (edge === 0) style = { top: -size / 2, left: `${t * 100}%` };
      if (edge === 1) style = { bottom: -size / 2, left: `${t * 100}%` };
      if (edge === 2) style = { left: -size / 2, top: `${t * 100}%` };
      if (edge === 3) style = { right: -size / 2, top: `${t * 100}%` };
      edges.push({ style, rot, size });
    }
    return edges;
  }, [seed]);
  return (
    <>
      {stickers.map((s, i) => (
        <img
          key={i}
          src={stickerKitty}
          alt=""
          width={s.size}
          height={s.size}
          className="absolute pixelated pointer-events-none drop-shadow-[1px_1px_0_rgba(168,35,104,0.5)]"
          style={{ ...s.style, transform: `rotate(${s.rot}deg)`, zIndex: 2 }}
        />
      ))}
    </>
  );
}

export function PixelWindow({
  title, children, initial = { x: 80, y: 80 }, width = 360, height = "auto",
  onClose, z = 1, onFocus, icon,
}: WindowProps) {
  const controls = useDragControls();
  const [closed, setClosed] = useState(false);
  const seed = useMemo(() => Math.floor(Math.random() * 10000), []);
  if (closed) return null;
  return (
   <motion.div
  drag
  dragControls={controls}
  dragListener={false}
  dragMomentum={false}
  onMouseDown={onFocus}
  initial={{ x: initial.x, y: initial.y, scale: 0.9, opacity: 0 }}
  animate={{ x: initial.x, y: initial.y, scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 240, damping: 22 }}
  className="absolute pixel-card flex flex-col"
  style={{
    width,
    height: height === "auto" ? undefined : height,
    zIndex: z,
  }}
>
      {/* titlebar */}
      <div
        onPointerDown={(e) => { controls.start(e); onFocus?.(); }}
        className="win-titlebar flex items-center justify-between px-2 py-1 select-none touch-none border-b-2"
        style={{ borderColor: "var(--color-window-border)", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        <div className="flex items-center gap-1.5 font-pixel text-[9px] tracking-tight">
          {icon && <img src={icon} alt="" width={16} height={16} className="pixelated" />}
          <img src={pixelHeart} alt="" width={12} height={12} className="pixelated anim-blink" />
          <span>{title}</span>
        </div>
        <button
          onClick={() => { click(); setClosed(true); onClose?.(); }}
          className="text-[10px] font-pixel bg-white text-pink-deep px-1.5 py-0.5 border border-[color:var(--color-window-border)] rounded hover:bg-pink-soft"
          aria-label="close"
        >x</button>
      </div>
      {/* lace corner bow */}
      <img src={bowPink} alt="" className="absolute -top-3 -left-3 pixelated pointer-events-none" width={36} height={36} style={{ zIndex: 3 }} />
      {/* hello kitty stickers along borders */}
      <BorderStickers seed={seed} />
      {/* body */}
<div
  className="flex-1 overflow-y-auto p-3 bg-white relative"
  style={{
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  }}
>
  {children}
</div>
    </motion.div>
  );
}
