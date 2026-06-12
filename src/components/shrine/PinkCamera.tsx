import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import camImg from "@/assets/pink-camera.png";
import bowPink from "@/assets/bow-pink.png";
import pixelHeart from "@/assets/pixel-heart.png";
import pixelStar from "@/assets/pixel-star.png";
import { click, beep } from "@/lib/sounds";

interface Entry { id: string; title: string; date: string; art: string }

const entries: Entry[] = [
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
    `,
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
    `,
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
    `,
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
    `,
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
    `,
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
    `,
  },
  {
    id: "stars",
    title: "✩ starfield",
    date: "2026.05.28",
    art: String.raw`
   ✦ . ⋆ ｡ ˚ ✩ . ⋆ ✦
    . ⋆ ˚ ｡ ✦ . ⋆
   ✩ . ⋆ ✦ ｡ ˚ ⋆ ✩
    `,
  },
  {
    id: "bear",
    title: "♡ tiny bear",
    date: "2026.05.20",
    art: String.raw`
     ʕ•ᴥ•ʔ
    /  ♡ \
    bear hug!!
    `,
  },
];

function shutter() {
  beep(2400, 0.02, "square", 0.08);
  setTimeout(() => beep(180, 0.06, "sawtooth", 0.06), 30);
  setTimeout(() => beep(120, 0.05, "sawtooth", 0.04), 90);
}

export function PinkCamera() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Entry | null>(null);

  const onOpen = () => { shutter(); setOpen(true); };
  const onClose = () => { click(); setOpen(false); setSelected(null); };
  const pick = (e: Entry) => { beep(1500, 0.04, "square", 0.06); setSelected(e); };
  const back = () => { click(); setSelected(null); };

  return (
    <>
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.08, rotate: -4 }}
        whileTap={{ scale: 0.96 }}
        className="fixed top-[58%] right-4 z-30 anim-bob"
        aria-label="open ascii gallery"
      >
        <img
          src={camImg}
          alt="pink digital camera"
          width={132}
          height={110}
          className="pixelated drop-shadow-[3px_3px_0_rgba(168,35,104,0.4)]"
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110]"
              style={{ background: "rgba(168,35,104,0.18)" }}
              onClick={onClose}
            />
            <motion.div
              drag dragMomentum={false}
              initial={{ scale: 0.4, opacity: 0, x: 0, y: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="fixed pixel-card z-[120] left-1/2 top-[12%] -translate-x-1/2 w-fit"
            >
              <img src={bowPink} alt="" width={40} height={40} className="absolute -top-4 -left-4 pixelated pointer-events-none" />
              <img src={bowPink} alt="" width={40} height={40} className="absolute -top-4 -right-4 pixelated pointer-events-none scale-x-[-1]" />

              <div
                className="win-titlebar flex items-center justify-between px-2 py-1 border-b-2 cursor-grab active:cursor-grabbing select-none"
                style={{ borderColor: "var(--color-window-border)", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              >
                <div className="flex items-center gap-1.5 font-pixel text-[9px]">
                  <img src={pixelStar} alt="" width={12} height={12} className="pixelated anim-blink" />
                  <span>ascii_cam ♡ {selected ? "view" : "gallery"}</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-[10px] font-pixel bg-white text-pink-deep px-1.5 py-0.5 border border-[color:var(--color-window-border)] rounded hover:bg-pink-soft"
                  aria-label="close"
                >x</button>
              </div>

              <div className="p-3 bg-white" style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                {/* fake camera viewfinder */}
                <div
                  className="rounded-md p-2 mb-3 border-2"
                  style={{ background: "#1a0d14", borderColor: "#a82368", boxShadow: "inset 0 0 0 2px #ff8ec5" }}
                >
                  <div className="flex items-center justify-between font-pixel text-[8px]" style={{ color: "#ff8ec5" }}>
                    <span>● REC</span>
                    <span className="anim-blink">●</span>
                    <span>{selected ? selected.date : `${entries.length} photos`}</span>
                  </div>
                  <pre
                    className="mt-1 whitespace-pre overflow-x-auto w-max"
                    style={{
                      fontFamily: "Consolas, monospace",
                      color: "#ffd9ec",
                      fontSize: 13,
                      minHeight: selected ? 160 : 60,
                      lineHeight: 1.1,
                    }}
                  >
{selected ? selected.art : "  ♡  select a photo  ♡\n     ↓ ↓ ↓ ↓ ↓"}
                  </pre>
                </div>

                {selected ? (
                  <div className="flex justify-between items-center">
                    <button
                      onClick={back}
                      className="font-pixel text-[9px] px-3 py-1.5 rounded border-2"
                      style={{ background: "#fff", color: "#a82368", borderColor: "#a82368", boxShadow: "2px 2px 0 #a82368" }}
                    >← back</button>
                    <span className="font-pixel text-[9px]" style={{ color: "#a82368" }}>{selected.title}</span>
                  </div>
                ) : (
                  <ul className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
                    {entries.map((e) => (
                      <li key={e.id}>
                        <button
                          onClick={() => pick(e)}
                          className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded border-2 hover:scale-[1.01] transition"
                          style={{ background: "#fff5fa", borderColor: "#ffb6da" }}
                        >
                          <img src={pixelHeart} alt="" width={12} height={12} className="pixelated" />
                          <span className="font-pixel text-[9px] flex-1" style={{ color: "#a82368" }}>{e.title}</span>
                          <span className="font-mono-pixel text-sm" style={{ color: "#7a2350" }}>{e.date}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
