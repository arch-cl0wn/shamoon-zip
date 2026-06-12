import { useEffect, useState } from "react";
import avatar from "@/assets/avatar.png";
import pixelHeart from "@/assets/pixel-heart.png";
import pixelStar from "@/assets/pixel-star.png";
import bowPink from "@/assets/bow-pink.png";
import bowBlack from "@/assets/bow-black.png";
import pearls from "@/assets/pearls.webp";
import pixelCat from "@/assets/pixel-cat.png";
import pixelBunny from "@/assets/pixel-bunny.png";
import { click } from "@/lib/sounds";

export function AboutContent() {
  return (
    <div className="font-display text-[15px]" style={{ color: "#5a1838" }}>
      <div className="flex gap-3 items-start">
        <div className="relative">
          <img
            src={avatar}
            alt="me"
            width={450}
            height={450}
            className="pixelated rounded-md border-2"
            style={{ borderColor: "#a82368", background: "#ffeef7" }}
          />
        </div>
        <div>
          <h2
            className="font-pixel text-[12px] mb-1"
            style={{ color: "#a82368" }}
          >
            ★ shamoon.zip ★
          </h2>
          <p className="leading-snug">
            welcome to my online junkdrawer~ this website is a small collection
            of blog posts, ascii art, old games, retro technology, internet
            oddities, and things i think are worth remembering. this site exists
            because i miss personal websites. the internet feels a lot more
            interesting when people build strange little corners for themselves,
            so this is mine. feel free to look around and stay awhile ♡
          </p>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <img src={pearls} alt="" className="h-6 object-contain opacity-90" />
        <img src={pearls} alt="" className="h-6 object-contain opacity-90" />
        <img src={pearls} alt="" className="h-6 object-contain opacity-90" />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <Section
          title="interests"
          items={[
            "lolita fashion",
            "yaoi",
            "obsolete machines",
            "my wife",
            "kuromi",
          ]}
          icon={pixelHeart}
        />
        <Section
          title="games"
          items={[
            "toram online",
            "katamari",
            "maple story m",
            "hello kitty my dream store",
          ]}
          icon={pixelStar}
        />
        <Section
          title="music"
          items={["visual kei", "gothic", "jazz", "nightcore"]}
          icon={bowPink}
        />
        <Section
          title="anime"
          items={["ouran", "ccs", "rozen maiden", "given"]}
          icon={bowBlack}
        />
      </div>
      <div className="mt-3 flex gap-2 items-center justify-center">
        <img
          src={pixelCat}
          alt=""
          width={32}
          height={32}
          className="pixelated anim-wiggle"
        />
        <span
          className="block text-center font-mono-pixel text-pink-deep text-lg"
          style={{ color: "#a82368" }}
        >
          ~ digitally hoarding cool stuff since 2004 ~
        </span>
        <img
          src={pixelBunny}
          alt=""
          width={32}
          height={32}
          className="pixelated anim-wiggle"
        />
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: string;
}) {
  return (
    <div
      className="rounded-md p-2 border-2"
      style={{ background: "#fff5fa", borderColor: "#ffb6da" }}
    >
      <div
        className="font-pixel text-[8px] mb-1 flex items-center gap-1"
        style={{ color: "#a82368" }}
      >
        <img src={icon} alt="" width={12} height={12} className="pixelated" />{" "}
        {title}
      </div>
      <ul
        className="font-display text-[13px] leading-tight"
        style={{ color: "#7a2350" }}
      >
        {items.map((i) => (
          <li key={i}>♡ {i}</li>
        ))}
      </ul>
    </div>
  );
}

// =================== BLOG ===================
interface Post {
  id: number;
  title: string;
  date: string;
  body: string;
}
const seed: Post[] = [
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

the more i learn about old games, the more impressed i become. pokemon wasn't just a successful game. it was a miracle of constraints, and somehow it went on to become one of the biggest entertainment franchises in the world.`,
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
`,
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

and somehow that worked. that's such a nitendo solution tbh.`,
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

early personal computers feel less like products and more like elaborate magic tricks. every time i read about them i end up wondering how anyone got anything done at all.`,
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

which, to be fair, is basically what a supercomputer is.`,
  },
];

export function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("shrine_posts");
    setPosts(saved ? JSON.parse(saved) : seed);
  }, []);

  const save = (list: Post[]) => {
    setPosts(list);
    localStorage.setItem("shrine_posts", JSON.stringify(list));
  };

  const add = () => {
    if (!title.trim()) return;
    click();
    const p: Post = {
      id: Date.now(),
      title,
      date: new Date().toISOString().slice(0, 10),
      body,
    };
    save([p, ...posts]);
    setTitle("");
    setBody("");
  };

  return (
    <div className="font-display" style={{ color: "#5a1838" }}>
      <div className="space-y-2 pr-1">
        {posts.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              click();
              setSelected(p);
            }}
            className="w-full text-left rounded-md p-2 border-2 hover:scale-[1.01] transition"
            style={{ background: "#fff5fa", borderColor: "#ffb6da" }}
          >
            <div className="flex justify-between items-start">
              <h3
                className="font-pixel text-[10px]"
                style={{ color: "#a82368" }}
              >
                {p.title}
              </h3>
              <span className="font-mono-pixel text-sm opacity-70">
                {p.date}
              </span>
            </div>
            <p className="text-sm mt-1 line-clamp-2 opacity-80">{p.body}</p>
            <span className="font-mono-pixel text-xs opacity-60">
              ♡ click to read full entry ♡
            </span>
          </button>
        ))}
      </div>

      {/* full entry modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(168,35,104,0.35)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="pixel-card max-w-[560px] w-full max-h-[80vh] overflow-hidden flex flex-col anim-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="win-titlebar flex justify-between items-center px-3 py-1.5">
              <span className="font-pixel text-[10px]">
                ♡ {selected.title} ♡
              </span>
              <button
                onClick={() => {
                  click();
                  setSelected(null);
                }}
                className="font-pixel text-[10px] bg-white px-1.5 rounded border border-[color:var(--color-window-border)]"
              >
                x
              </button>
            </div>
            <div className="p-4 overflow-y-auto bg-white">
              <div
                className="font-mono-pixel text-base opacity-70 mb-2"
                style={{ color: "#a82368" }}
              >
                posted {selected.date}
              </div>
              <h2
                className="font-pixel text-[12px] mb-3"
                style={{ color: "#a82368" }}
              >
                {selected.title}
              </h2>
              <article
                className="font-display text-[15px] leading-relaxed whitespace-pre-wrap"
                style={{ color: "#5a1838" }}
              >
                {selected.body}
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =================== ASCII ===================
const arts = [
  String.raw`
       ／l、     
     （ﾟ､ ｡ ７   
       l  ~ヽ   
       じしf_,)ノ
  `,
  String.raw`
   ╱|、
  (˚ˎ 。7  
   |、˜〵          
   じしˍ,)ノ
   ♡ nya ♡
  `,
  String.raw`
   .・゜゜・✩・゜゜・.
    ♡  i love u  ♡
   .・゜゜・✩・゜゜・.
  `,
  String.raw`
    (\(\
    (-.-)
    o_(")(")
   sleepy bun
  `,
];

export function AsciiContent() {
  return (
    <div className="font-mono text-pink-deep" style={{ color: "#7a2350" }}>
      <div className="space-y-3 max-h-[280px] overflow-y-auto">
        {arts.map((a, i) => (
          <pre
            key={i}
            className="rounded-md p-2 text-sm border-2 whitespace-pre"
            style={{
              background: "#fff5fa",
              borderColor: "#ffb6da",
              fontFamily: "VT323, monospace",
              color: "#7a2350",
            }}
          >
            {a}
          </pre>
        ))}
      </div>
    </div>
  );
}

// =================== LINKS ===================
const links = [
  { name: "twitter ♡", url: "https://x.com/shamoonette", color: "#1da1f2" },
  { name: "github", url: "https://github.com/arch-cl0wn", color: "#34526f" },
  { name: "instagram", url: "https://www.instagram.com/shamoon.ink/", color: "#05cc47" },
  { name: "email ♡", url: "mailto:shamoon.ink@gmail.com", color: "#a82368" },
];

export function LinksContent() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {links.map((l) => (
        <a
          key={l.name}
          href={l.url}
          onClick={() => click()}
          className="font-pixel text-[9px] px-3 py-2 rounded text-center border-2 hover:scale-105 transition relative"
          style={{
            background: "#fff",
            color: l.color,
            borderColor: l.color,
            boxShadow: `2px 2px 0 ${l.color}`,
          }}
        >
          <img
            src={pixelHeart}
            alt=""
            width={10}
            height={10}
            className="inline pixelated mr-1"
          />
          {l.name}
        </a>
      ))}
    </div>
  );
}

// =================== GUESTBOOK ===================
interface GBEntry {
  id: number;
  name: string;
  msg: string;
  date: string;
}
const gbSeed: GBEntry[] = [
  {
    id: 1,
    name: "uwaaarin★nya",
    msg: "owo kabedon jii ♡",
    date: "2026-06-09",
  },
  {
    id: 2,
    name: "santram.exe",
    msg: "good werk saaar >:3",
    date: "2026-06-07",
  },
];

export function GuestbookContent() {
  const [entries, setEntries] = useState<GBEntry[]>([]);
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
    const e: GBEntry = {
      id: Date.now(),
      name,
      msg,
      date: new Date().toISOString().slice(0, 10),
    };
    const list = [e, ...entries];
    setEntries(list);
    localStorage.setItem("shrine_gb", JSON.stringify(list));
    setName("");
    setMsg("");
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 2200);
  };

  return (
    <div className="font-display" style={{ color: "#5a1838" }}>
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 mb-2">
        {entries.map((e) => (
          <div
            key={e.id}
            className="rounded-md p-2 border-2 anim-pop"
            style={{ background: "#fff5fa", borderColor: "#ffb6da" }}
          >
            <div className="flex justify-between">
              <span
                className="font-pixel text-[9px]"
                style={{ color: "#a82368" }}
              >
                {e.name}
              </span>
              <span className="font-mono-pixel text-sm opacity-70">
                {e.date}
              </span>
            </div>
            <p className="text-sm mt-1">♡ {e.msg}</p>
          </div>
        ))}
      </div>
      <div className="border-t-2 pt-2" style={{ borderColor: "#ffd9ec" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name ♡"
          className="w-full mb-1 px-2 py-1 rounded border-2 font-display text-sm"
          style={{ borderColor: "#ffb6da" }}
        />
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="leave a message..."
          rows={2}
          className="w-full mb-2 px-2 py-1 rounded border-2 font-display text-sm"
          style={{ borderColor: "#ffb6da" }}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={sign}
            className="font-pixel text-[9px] px-3 py-1.5 rounded border-2"
            style={{
              background: "#ff8ec5",
              color: "#fff",
              borderColor: "#a82368",
              boxShadow: "2px 2px 0 #a82368",
            }}
          >
            sign ♡
          </button>
          {savedFlag && (
            <span
              className="font-pixel text-[9px] anim-pop"
              style={{ color: "#a82368" }}
            >
              ✓ saved ♡
            </span>
          )}
        </div>
        <p className="font-mono-pixel text-xs mt-2 opacity-60">
          ♡ messages save to your browser ♡
        </p>
      </div>
    </div>
  );
}
