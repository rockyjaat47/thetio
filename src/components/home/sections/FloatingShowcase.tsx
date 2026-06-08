import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Globe,
  LineChart,
  Mail,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

type Card = {
  title: string;
  subtitle: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  body: "chart" | "list" | "stat" | "bars" | "chat" | "grid";
  className: string; // positioning
  delay: number;
  drift: { x: number[]; y: number[]; rotate: number[] };
};

const cards: Card[] = [
  {
    title: "Lovely Bistro",
    subtitle: "teobistro.com",
    accent: "from-amber-400 to-rose-400",
    icon: Globe,
    body: "grid",
    className: "left-[2%] top-[8%] w-[260px] -rotate-[8deg]",
    delay: 0,
    drift: { x: [0, 10, 0], y: [0, -18, 0], rotate: [-8, -6, -8] },
  },
  {
    title: "Pulse CRM",
    subtitle: "Leads · Today",
    accent: "from-emerald-400 to-teal-500",
    icon: Users,
    body: "list",
    className: "left-[6%] bottom-[8%] w-[280px] rotate-[6deg]",
    delay: 0.8,
    drift: { x: [0, -8, 0], y: [0, 14, 0], rotate: [6, 8, 6] },
  },
  {
    title: "Growth Engine",
    subtitle: "Last 30 days",
    accent: "from-sky-400 to-indigo-500",
    icon: LineChart,
    body: "chart",
    className: "left-[20%] top-[42%] w-[300px] -rotate-[3deg]",
    delay: 1.4,
    drift: { x: [0, 14, 0], y: [0, -10, 0], rotate: [-3, -1, -3] },
  },
  {
    title: "AutoReply AI",
    subtitle: "WhatsApp · Live",
    accent: "from-violet-500 to-fuchsia-500",
    icon: Bot,
    body: "chat",
    className: "right-[4%] top-[10%] w-[280px] rotate-[7deg]",
    delay: 0.4,
    drift: { x: [0, -12, 0], y: [0, -16, 0], rotate: [7, 5, 7] },
  },
  {
    title: "Shop Analytics",
    subtitle: "Revenue · 24h",
    accent: "from-orange-400 to-pink-500",
    icon: ShoppingBag,
    body: "stat",
    className: "right-[3%] bottom-[14%] w-[260px] -rotate-[6deg]",
    delay: 1.1,
    drift: { x: [0, 10, 0], y: [0, 14, 0], rotate: [-6, -4, -6] },
  },
  {
    title: "Ad Performance",
    subtitle: "Meta + Google",
    accent: "from-yellow-400 to-amber-600",
    icon: BarChart3,
    body: "bars",
    className: "right-[22%] top-[46%] w-[280px] rotate-[4deg]",
    delay: 1.8,
    drift: { x: [0, -14, 0], y: [0, -12, 0], rotate: [4, 6, 4] },
  },
  {
    title: "Inbox Flow",
    subtitle: "12 new leads",
    accent: "from-rose-400 to-pink-600",
    icon: Mail,
    body: "list",
    className: "left-[34%] top-[6%] w-[240px] rotate-[10deg]",
    delay: 0.2,
    drift: { x: [0, 8, 0], y: [0, -14, 0], rotate: [10, 12, 10] },
  },
  {
    title: "Speed Boost",
    subtitle: "Lighthouse 98",
    accent: "from-lime-400 to-emerald-500",
    icon: Zap,
    body: "stat",
    className: "right-[36%] bottom-[6%] w-[230px] -rotate-[9deg]",
    delay: 1.5,
    drift: { x: [0, -10, 0], y: [0, 12, 0], rotate: [-9, -7, -9] },
  },
];

export function FloatingShowcase() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${c.className} hidden md:block`}
        >
          <motion.div
            animate={c.drift}
            transition={{ duration: 9 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
            className="relative will-change-transform"
          >
            <MiniCard card={c} />
          </motion.div>
        </motion.div>
      ))}

      {/* sparkle dots */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.85)]"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 41) % 90 + 5}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 2.4 + (i % 5) * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function MiniCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-[0_25px_50px_-20px_rgba(20,30,60,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      {/* faux browser bar */}
      <div className="flex items-center gap-1 border-b border-black/5 bg-white/70 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        <span className="ml-2 truncate text-[10px] text-foreground/50">{card.subtitle}</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${card.accent} text-white shadow`}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[11px] font-semibold text-foreground">{card.title}</div>
            <div className="truncate text-[9px] text-foreground/50">{card.subtitle}</div>
          </div>
          <Sparkles className="ml-auto h-3 w-3 text-amber-500" />
        </div>

        <div className="mt-2.5">
          <CardBody type={card.body} accent={card.accent} />
        </div>
      </div>
    </div>
  );
}

function CardBody({ type, accent }: { type: Card["body"]; accent: string }) {
  if (type === "chart") {
    return (
      <svg viewBox="0 0 200 70" className="h-16 w-full">
        <defs>
          <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,55 C25,40 45,50 65,32 C90,18 115,42 140,22 C165,8 185,28 200,12 L200,70 L0,70 Z" fill="url(#lg1)" />
        <path d="M0,55 C25,40 45,50 65,32 C90,18 115,42 140,22 C165,8 185,28 200,12" fill="none" stroke="#6366f1" strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === "bars") {
    const bars = [22, 38, 30, 52, 28, 60, 44, 70, 36];
    return (
      <div className="flex h-16 items-end gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.9, delay: i * 0.06, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.2 }}
            className={`flex-1 rounded-sm bg-gradient-to-t ${accent}`}
          />
        ))}
      </div>
    );
  }
  if (type === "stat") {
    return (
      <div>
        <div className="text-xl font-semibold tracking-tight text-foreground">$48.2K</div>
        <div className="mt-1 flex items-center gap-1 text-[10px]">
          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 font-medium text-emerald-700">+24%</span>
          <span className="text-foreground/50">vs last week</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
          <motion.div
            initial={{ width: "10%" }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className={`h-full bg-gradient-to-r ${accent}`}
          />
        </div>
      </div>
    );
  }
  if (type === "list") {
    return (
      <div className="space-y-1.5">
        {["Aarav S.", "Priya M.", "Rahul T."].map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${accent}`} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[10px] font-medium text-foreground">{n}</div>
              <div className="text-[9px] text-foreground/50">New lead · {i + 1}m ago</div>
            </div>
            <span className="text-[9px] font-medium text-emerald-600">●</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "chat") {
    return (
      <div className="space-y-1.5">
        <div className="max-w-[80%] rounded-lg rounded-tl-sm bg-foreground/5 px-2 py-1 text-[10px] text-foreground">
          Hi! Pricing for web dev?
        </div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className={`ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-gradient-to-br ${accent} px-2 py-1 text-[10px] text-white`}
        >
          Starts at ₹24,999 — want details?
        </motion.div>
      </div>
    );
  }
  // grid (website preview)
  return (
    <div className="space-y-1.5">
      <div className={`h-6 rounded bg-gradient-to-r ${accent} opacity-90`} />
      <div className="grid grid-cols-3 gap-1">
        <div className="h-6 rounded bg-foreground/10" />
        <div className="h-6 rounded bg-foreground/10" />
        <div className="h-6 rounded bg-foreground/10" />
      </div>
      <div className="h-2 w-3/4 rounded bg-foreground/10" />
      <div className="h-2 w-1/2 rounded bg-foreground/10" />
    </div>
  );
}
