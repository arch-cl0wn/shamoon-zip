import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BootSequence } from "@/components/shrine/BootSequence";
import { StayPopup } from "@/components/shrine/StayPopup";
import { AmbientBackground } from "@/components/shrine/AmbientBackground";
import { PixelWindow } from "@/components/shrine/PixelWindow";
import { Tamagotchi } from "@/components/shrine/Tamagotchi";
import { FlipPhone } from "@/components/shrine/FlipPhone";
import { MP3Player } from "@/components/shrine/MP3Player";
import { PinkCamera } from "@/components/shrine/PinkCamera";
import {
  AboutContent,
  BlogContent,
  LinksContent,
  GuestbookContent,
} from "@/components/shrine/windows";
import pixelHeart from "@/assets/pixel-heart.png";
import pixelStar from "@/assets/pixel-star.png";
import sparkle from "@/assets/sparkle.png";
import laceTile from "@/assets/lace-tile.png";
import banner from "@/assets/banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "♡ shamoon's online junkdrawer ♡" },
      {
        name: "description",
        content:
          "a kawaii personal internet shrine - keitai, tamagotchi, pixel art, gothic lolita aesthetic",
      },
      { property: "og:title", content: "♡ shamoon's online junkdrawer ♡" },
      {
        property: "og:description",
        content:
          "a kawaii personal internet shrine - keitai, tamagotchi, pixel art, gothic lolita aesthetic",
      },
    ],
  }),
  component: Shrine,
});

function Shrine() {
  const [booted, setBooted] = useState(false);
  const [popped, setPopped] = useState(false);
  const [zCounter, setZ] = useState(10);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const focus = (k: string) => {
    setZ((c) => {
      const n = c + 1;
      setZMap((m) => ({ ...m, [k]: n }));
      return n;
    });
  };
  const z = (k: string, def = 5) => zMap[k] ?? def;

  return (
    <main
      className="min-h-screen w-full relative"
      style={{ background: "#ffeef7" }}
    >
      <AmbientBackground />
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      {booted && !popped && <StayPopup onContinue={() => setPopped(true)} />}

      {/* top banner — swap src/assets/banner.png to change this image ♡ */}
      <div
        className="relative w-full overflow-hidden border-b-4"
        style={{
          borderColor: "#ff8ec5",
          background: `url(${laceTile}) repeat`,
          backgroundSize: "180px 180px",
        }}
      >
        <img
          src={banner}
          alt="shamoon.zip banner"
          className="block w-full h-[180px] object-cover pixelated"
        />
      </div>

      {/* hero title */}
      <header className="text-center pt-6 pb-2 relative z-10">
        <h1
          className="font-pixel text-[18px] md:text-[26px] inline-flex items-center gap-3"
          style={{
            color: "#a82368",
            textShadow: "2px 2px 0 #fff, 4px 4px 0 #ffb6da",
          }}
        >
          <img
            src={pixelStar}
            alt=""
            width={28}
            height={28}
            className="pixelated anim-wiggle"
          />
          welcome to my internet clutter
          <img
            src={pixelHeart}
            alt=""
            width={28}
            height={28}
            className="pixelated anim-wiggle"
          />
        </h1>
        <p
          className="font-mono-pixel text-xl mt-1"
          style={{ color: "#7a2350" }}
        >
          ✩ where shamoon discovers another insane piece of computer history at 3am ✩
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <img
            src={sparkle}
            alt=""
            width={20}
            height={20}
            className="pixelated anim-blink"
          />
          <img
            src={sparkle}
            alt=""
            width={20}
            height={20}
            className="pixelated anim-blink"
          />
          <img
            src={sparkle}
            alt=""
            width={20}
            height={20}
            className="pixelated anim-blink"
          />
        </div>
      </header>

      {/* windows */}
      <section className="relative w-full" style={{ minHeight: "1000px" }}>
        <PixelWindow
          title="about_me.txt"
          initial={{
            x: typeof window !== "undefined" ? window.innerWidth * 0.2 : 80,
            y: 40,
          }}
          width={360}
          z={z("about")}
          onFocus={() => focus("about")}
        >
          <AboutContent />
        </PixelWindow>

        <PixelWindow
          title="blog.txt"
          initial={{
            x:
              typeof window !== "undefined"
                ? Math.max(420, window.innerWidth * 0.5)
                : 460,
            y: 50,
          }}
          width={500}
          height={500}
          z={z("blog")}
          onFocus={() => focus("blog")}
        >
          <BlogContent />
        </PixelWindow>

        <PixelWindow
          title="links.html"
          initial={{
            x: typeof window !== "undefined" ? window.innerWidth * 0.22 : 80,
            y: 780,
          }}
          width={300}
          z={z("links")}
          onFocus={() => focus("links")}
        >
          <LinksContent />
        </PixelWindow>

        <PixelWindow
          title="guestbook.cgi"
          initial={{
            x:
              typeof window !== "undefined"
                ? Math.max(440, window.innerWidth * 0.50)
                : 400,
            y: 620,
          }}
          width={340}
          z={z("gb")}
          onFocus={() => focus("gb")}
        >
          <GuestbookContent />
        </PixelWindow>
      </section>

      {/* floating devices */}
      <Tamagotchi />
      <FlipPhone />
      <MP3Player />
      <PinkCamera />

      {/* bottom credit */}
      <footer
        className="relative z-10 text-center py-6 mt-12 font-mono-pixel text-lg"
        style={{ color: "#a82368" }}
      >
        ♡ made with love ♡ best viewed on 1024x768 ♡
      </footer>
    </main>
  );
}
