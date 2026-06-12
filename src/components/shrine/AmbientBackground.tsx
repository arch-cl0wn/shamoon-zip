import { useMemo } from "react";
import pixelHeart from "@/assets/pixel-heart.png";
import pixelStar from "@/assets/pixel-star.png";
import sparkle from "@/assets/sparkle.png";
import laceTile from "@/assets/lace-tile.png";

const sprites = [pixelHeart, pixelStar, sparkle];

export function AmbientBackground() {
  const items = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 18,
    duration: 12 + Math.random() * 18,
    size: 10 + Math.random() * 26,
    src: sprites[i % sprites.length],
  })), []);
  // static twinkling sparkles scattered across the bg
  const twinkles = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 2,
  })), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${laceTile})`,
          backgroundSize: "260px 260px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,217,236,0.55), rgba(255,238,247,0.85))" }} />
      {twinkles.map((t) => (
        <img
          key={`t${t.id}`}
          src={sparkle}
          alt=""
          width={t.size}
          height={t.size}
          className="absolute pixelated anim-blink"
          style={{ left: `${t.left}%`, top: `${t.top}%`, animationDelay: `${t.delay}s`, opacity: 0.75 }}
        />
      ))}
      {items.map((it) => (
        <img
          key={it.id}
          src={it.src}
          alt=""
          width={it.size}
          height={it.size}
          className="absolute pixelated opacity-90"
          style={{
            left: `${it.left}%`,
            bottom: 0,
            width: it.size,
            height: it.size,
            animation: `float-up ${it.duration}s linear ${it.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
