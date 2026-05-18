"use client";

import React from "react";

interface Props {
  itemName: string;
  color: string;
  className?: string;
}

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

type IllustrationType =
  | "tee" | "blazer" | "skirt" | "cargo" | "dress" | "sweater" | "denim" | "hoodie"
  | "trench" | "linentop" | "cami" | "leatherskirt"
  | "boots" | "sneakers" | "sandals" | "flats"
  | "necklace" | "bag" | "belt" | "earrings"
  | "hanger";

function getType(name: string): IllustrationType {
  const n = name.toLowerCase();
  // ── clothing ──────────────────────────────────────────────
  if (n.includes("trench") || n.includes("trench coat"))        return "trench";
  if (n.includes("tee") || n.includes("graphic tee"))           return "tee";
  if (n.includes("blazer"))                                      return "blazer";
  if (n.includes("hoodie"))                                      return "hoodie";
  if (n.includes("denim") || n.includes("jean"))                 return "denim";
  if (n.includes("leather") && n.includes("skirt"))             return "leatherskirt";
  if (n.includes("skirt"))                                       return "skirt";
  if (n.includes("cargo"))                                       return "cargo";
  if (n.includes("slip") || n.includes("dress"))                 return "dress";
  if (n.includes("knit") || n.includes("sweater") || n.includes("cardigan")) return "sweater";
  if (n.includes("cami") || n.includes("layered cami"))         return "cami";
  if (n.includes("linen") || n.includes("button-down") || n.includes("button down")) return "linentop";
  // ── shoes ─────────────────────────────────────────────────
  if (n.includes("boot") || n.includes("lug sole"))             return "boots";
  if (n.includes("sneaker") || n.includes("air force") || n.includes("trainer")) return "sneakers";
  if (n.includes("sandal"))                                      return "sandals";
  if (n.includes("flat") || n.includes("ballet"))               return "flats";
  // ── accessories ───────────────────────────────────────────
  if (n.includes("necklace") || n.includes("chain"))            return "necklace";
  if (n.includes("bag") || n.includes("purse") || n.includes("tote") || n.includes("clutch")) return "bag";
  if (n.includes("belt"))                                        return "belt";
  if (n.includes("earring") || n.includes("hoop"))              return "earrings";
  return "hanger";
}

// ─── Clothing illustrations ──────────────────────────────────────────────────

function GraphicTee({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <path d="M32 44 L20 32 L38 22 Q60 16 82 22 L100 32 L88 44 L80 38 L80 102 Q80 106 76 106 L44 106 Q40 106 40 102 L40 38 Z" fill={c} />
      <path d="M40 38 L20 32 L14 56 L38 58 L40 50 Z" fill={d} />
      <path d="M80 38 L100 32 L106 56 L82 58 L80 50 Z" fill={d} />
      <path d="M46 22 Q60 30 74 22" fill="none" stroke={d} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="50" y="62" width="20" height="2.5" rx="1.2" fill={d} opacity="0.45" />
      <rect x="52" y="68" width="16" height="2.5" rx="1.2" fill={d} opacity="0.35" />
      <rect x="55" y="74" width="10" height="2.5" rx="1.2" fill={d} opacity="0.25" />
    </g>
  );
}

function Blazer({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <path d="M26 38 L16 22 L42 14 L60 24 L78 14 L104 22 L94 38 L88 104 L32 104 Z" fill={c} />
      <path d="M42 14 L60 24 L55 48 L34 40 L26 38 Z" fill={l} />
      <path d="M78 14 L60 24 L65 48 L86 40 L94 38 Z" fill={l} />
      <path d="M26 38 L16 22 L8 60 L28 64 L32 52 Z" fill={d} />
      <path d="M94 38 L104 22 L112 60 L92 64 L88 52 Z" fill={d} />
      <line x1="60" y1="48" x2="60" y2="104" stroke={d} strokeWidth="1.5" opacity="0.4" />
      <circle cx="60" cy="60" r="3" fill={d} />
      <circle cx="60" cy="74" r="3" fill={d} />
      <rect x="36" y="44" width="13" height="10" rx="2" fill="none" stroke={d} strokeWidth="1.5" />
    </g>
  );
}

function PleatSkirt({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <rect x="28" y="20" width="64" height="15" rx="4" fill={d} />
      <path d="M28 35 Q18 68 14 106 L106 106 Q102 68 92 35 Z" fill={c} />
      <line x1="44" y1="35" x2="30" y2="106" stroke={d} strokeWidth="1.2" opacity="0.4" />
      <line x1="54" y1="35" x2="46" y2="106" stroke={d} strokeWidth="1.2" opacity="0.4" />
      <line x1="66" y1="35" x2="63" y2="106" stroke={d} strokeWidth="1.2" opacity="0.4" />
      <line x1="76" y1="35" x2="78" y2="106" stroke={d} strokeWidth="1.2" opacity="0.4" />
      <line x1="86" y1="35" x2="92" y2="106" stroke={d} strokeWidth="1.2" opacity="0.4" />
      <line x1="28" y1="27" x2="92" y2="27" stroke={l} strokeWidth="1.5" opacity="0.5" />
    </g>
  );
}

function CargoPants({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <rect x="24" y="16" width="72" height="14" rx="4" fill={d} />
      <path d="M24 30 L30 106 L60 106 L60 30 Z" fill={c} />
      <path d="M60 30 L60 106 L90 106 L96 30 Z" fill={c} />
      <path d="M24 30 Q60 52 96 30" fill="none" stroke={d} strokeWidth="1.5" opacity="0.35" />
      <rect x="28" y="50" width="22" height="20" rx="2.5" fill="none" stroke={d} strokeWidth="1.5" />
      <rect x="28" y="50" width="22" height="8" rx="2.5" fill={d} opacity="0.22" />
      <rect x="70" y="50" width="22" height="20" rx="2.5" fill="none" stroke={d} strokeWidth="1.5" />
      <rect x="70" y="50" width="22" height="8" rx="2.5" fill={d} opacity="0.22" />
    </g>
  );
}

function SlipDress({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <line x1="46" y1="12" x2="44" y2="34" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="74" y1="12" x2="76" y2="34" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 34 Q34 38 30 44 L22 106 L98 106 L90 44 Q86 38 80 34 Q60 44 40 34 Z" fill={c} />
      <path d="M40 34 Q60 50 80 34" fill="none" stroke={d} strokeWidth="2" opacity="0.45" />
      <line x1="60" y1="48" x2="54" y2="106" stroke={d} strokeWidth="1" opacity="0.25" />
      <path d="M22 106 Q30 100 38 106 Q46 112 54 106 Q62 100 70 106 Q78 112 86 106 Q92 102 98 106" fill="none" stroke={l} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function KnitSweater({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <path d="M24 46 L16 30 L38 20 Q60 14 82 20 L104 30 L96 46 L86 40 L86 92 Q86 96 82 96 L38 96 Q34 96 34 92 L34 40 Z" fill={c} />
      <path d="M34 40 L16 30 L10 66 L32 68 L34 56 Z" fill={c} />
      <path d="M86 40 L104 30 L110 66 L88 68 L86 56 Z" fill={c} />
      <path d="M40 20 Q60 30 80 20" fill="none" stroke={d} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="34" y="88" width="52" height="8" rx="2" fill={d} opacity="0.2" />
      {[38,43,48,53,58,63,68,73,78].map((x) => (
        <line key={x} x1={x} y1="88" x2={x} y2="96" stroke={d} strokeWidth="1" opacity="0.35" />
      ))}
      <rect x="10" y="60" width="22" height="8" rx="1.5" fill={d} opacity="0.18" />
      {[13,17,21,25,29].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="68" stroke={d} strokeWidth="1" opacity="0.3" />
      ))}
      <rect x="88" y="60" width="22" height="8" rx="1.5" fill={d} opacity="0.18" />
      {[91,95,99,103,107].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="68" stroke={d} strokeWidth="1" opacity="0.3" />
      ))}
    </g>
  );
}

function DenimJacket({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <path d="M26 38 L16 22 L42 14 L60 24 L78 14 L104 22 L94 38 L88 100 L32 100 Z" fill={c} />
      <path d="M42 14 L60 24 L55 46 L34 38 L26 38 Z" fill={l} />
      <path d="M78 14 L60 24 L65 46 L86 38 L94 38 Z" fill={l} />
      <path d="M26 38 L16 22 L8 60 L26 64 L30 52 Z" fill={d} />
      <path d="M94 38 L104 22 L112 60 L94 64 L90 52 Z" fill={d} />
      <rect x="36" y="46" width="14" height="13" rx="1.5" fill="none" stroke={l} strokeWidth="1.5" />
      <rect x="70" y="46" width="14" height="13" rx="1.5" fill="none" stroke={l} strokeWidth="1.5" />
      <circle cx="60" cy="55" r="2.5" fill={d} />
      <circle cx="60" cy="66" r="2.5" fill={d} />
      <circle cx="60" cy="77" r="2.5" fill={d} />
      <path d="M36 38 L30 100" stroke={l} strokeWidth="1.2" strokeDasharray="3 2.5" opacity="0.5" />
      <path d="M84 38 L90 100" stroke={l} strokeWidth="1.2" strokeDasharray="3 2.5" opacity="0.5" />
    </g>
  );
}

function CropHoodie({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <path d="M38 24 Q36 8 60 8 Q84 8 82 24 L78 38 Q60 48 42 38 Z" fill={d} />
      <path d="M42 24 Q60 36 78 24" fill="none" stroke={c} strokeWidth="2" opacity="0.5" />
      <path d="M24 40 L14 26 L38 18 L42 38 L78 38 L82 18 L106 26 L96 40 L88 40 L88 92 Q88 96 84 96 L36 96 Q32 96 32 92 L32 40 Z" fill={c} />
      <path d="M32 40 L14 26 L8 64 L30 66 L32 54 Z" fill={c} />
      <path d="M88 40 L106 26 L112 64 L90 66 L88 54 Z" fill={c} />
      <path d="M40 68 Q60 72 80 68 L80 88 Q60 92 40 88 Z" fill={d} opacity="0.3" />
      <line x1="60" y1="68" x2="60" y2="90" stroke={d} strokeWidth="1.5" opacity="0.4" />
      <line x1="50" y1="38" x2="46" y2="48" stroke={d} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="70" y1="38" x2="74" y2="48" stroke={d} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <circle cx="46" cy="50" r="2" fill={d} opacity="0.5" />
      <circle cx="74" cy="50" r="2" fill={d} opacity="0.5" />
    </g>
  );
}

// ─── New clothing illustrations ───────────────────────────────────────────────

function TrenchCoat({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Long coat body */}
      <path d="M24 36 L14 20 L40 12 L60 22 L80 12 L106 20 L96 36 L90 114 L30 114 Z" fill={c} />
      {/* Left lapel */}
      <path d="M40 12 L60 22 L55 46 L34 36 L24 36 Z" fill={l} />
      {/* Right lapel */}
      <path d="M80 12 L60 22 L65 46 L86 36 L96 36 Z" fill={l} />
      {/* Left sleeve */}
      <path d="M24 36 L14 20 L6 62 L26 66 L30 50 Z" fill={d} />
      {/* Right sleeve */}
      <path d="M96 36 L106 20 L114 62 L94 66 L90 50 Z" fill={d} />
      {/* Belt strap */}
      <rect x="30" y="64" width="60" height="7" rx="2" fill={d} opacity="0.65" />
      {/* Buckle */}
      <rect x="55" y="65" width="10" height="5" rx="1.5" fill={l} />
      {/* Double-breasted buttons */}
      <circle cx="50" cy="52" r="2.5" fill={d} />
      <circle cx="70" cy="52" r="2.5" fill={d} />
      <circle cx="50" cy="80" r="2.5" fill={d} />
      <circle cx="70" cy="80" r="2.5" fill={d} />
      <circle cx="50" cy="98" r="2.5" fill={d} />
      <circle cx="70" cy="98" r="2.5" fill={d} />
      {/* Epaulettes */}
      <rect x="18" y="30" width="13" height="5" rx="2" fill={d} opacity="0.55" />
      <rect x="89" y="30" width="13" height="5" rx="2" fill={d} opacity="0.55" />
    </g>
  );
}

function LinenTop({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Left strap/shoulder */}
      <path d="M28 26 Q28 10 40 10 L44 10 L44 30 Z" fill={c} />
      {/* Right strap/shoulder */}
      <path d="M92 26 Q92 10 80 10 L76 10 L76 30 Z" fill={c} />
      {/* Body — relaxed boxy */}
      <path d="M28 26 L28 108 Q28 112 32 112 L88 112 Q92 112 92 108 L92 26 Q80 32 60 32 Q40 32 28 26 Z" fill={c} />
      {/* Scoop neck */}
      <path d="M44 10 Q60 22 76 10" fill="none" stroke={d} strokeWidth="2.5" strokeLinecap="round" />
      {/* Armhole curves */}
      <path d="M28 26 Q18 34 18 46" fill="none" stroke={d} strokeWidth="1.5" opacity="0.4" />
      <path d="M92 26 Q102 34 102 46" fill="none" stroke={d} strokeWidth="1.5" opacity="0.4" />
      {/* Linen texture lines */}
      {[44, 54, 64, 74, 84, 94, 104].map((y) => (
        <line key={y} x1="30" y1={y} x2="90" y2={y} stroke={d} strokeWidth="0.9" opacity="0.18" />
      ))}
    </g>
  );
}

function CamiSet({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Under-layer (cream/lighter) peeking at hem */}
      <path d="M36 28 L34 106 Q34 112 38 112 L82 112 Q86 112 86 106 L84 28" fill={l} />
      {/* Main cami */}
      <path d="M40 28 Q60 36 80 28 L82 104 Q82 108 78 108 L42 108 Q38 108 38 104 Z" fill={c} />
      {/* Outer straps */}
      <line x1="46" y1="12" x2="44" y2="30" stroke={c} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="74" y1="12" x2="76" y2="30" stroke={c} strokeWidth="4.5" strokeLinecap="round" />
      {/* Inner under-layer straps */}
      <line x1="42" y1="12" x2="40" y2="30" stroke={l} strokeWidth="3" strokeLinecap="round" />
      <line x1="78" y1="12" x2="80" y2="30" stroke={l} strokeWidth="3" strokeLinecap="round" />
      {/* Chest gather line */}
      <path d="M44 32 Q60 42 76 32" fill="none" stroke={d} strokeWidth="1.5" opacity="0.4" />
      {/* Lace hem on outer layer */}
      <path d="M38 100 Q46 106 54 100 Q62 94 70 100 Q76 104 82 100" fill="none" stroke={d} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function LeatherSkirt({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Structured waistband */}
      <rect x="26" y="18" width="68" height="16" rx="3" fill={d} />
      {/* Skirt body */}
      <path d="M26 34 Q16 62 14 94 L106 94 Q104 62 94 34 Z" fill={c} />
      {/* Zipper line */}
      <line x1="60" y1="18" x2="60" y2="52" stroke={l} strokeWidth="2.5" opacity="0.6" />
      {/* Zipper teeth */}
      {[22, 27, 32, 37, 42, 47].map((y) => (
        <rect key={y} x="57.5" y={y} width="5" height="2" rx="0.5" fill={l} opacity="0.45" />
      ))}
      {/* Zipper pull */}
      <circle cx="60" cy="53" r="3.5" fill={l} opacity="0.7" />
      <line x1="60" y1="56" x2="60" y2="61" stroke={l} strokeWidth="1.5" opacity="0.7" />
      {/* Panel seam */}
      <line x1="60" y1="34" x2="60" y2="94" stroke={d} strokeWidth="1.2" opacity="0.28" />
      {/* Hem line */}
      <line x1="14" y1="92" x2="106" y2="92" stroke={l} strokeWidth="1.5" opacity="0.4" />
    </g>
  );
}

// ─── Shoes ───────────────────────────────────────────────────────────────────

function Boots({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Boot body — side view pointing right */}
      <path d="M34 12 L34 74 Q32 82 24 86 L20 98 L96 98 Q104 98 104 90 L104 86 Q104 78 92 76 L68 74 L66 12 Z" fill={c} />
      {/* Chunky sole */}
      <rect x="18" y="97" width="88" height="11" rx="4" fill={d} />
      {/* Shaft highlight */}
      <line x1="42" y1="12" x2="42" y2="74" stroke={l} strokeWidth="2" opacity="0.3" />
      {/* Toe cap */}
      <path d="M68 74 Q104 76 104 88" fill="none" stroke={d} strokeWidth="2" opacity="0.35" />
      {/* Zip detail */}
      <line x1="50" y1="16" x2="50" y2="70" stroke={d} strokeWidth="1.2" strokeDasharray="3 2.5" opacity="0.35" />
    </g>
  );
}

function Sneakers({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Upper — low profile side view */}
      <path d="M18 72 L18 54 Q18 44 30 42 L64 40 Q80 38 92 48 L100 58 Q104 64 102 72 Z" fill={c} />
      {/* Toe cap */}
      <path d="M18 54 Q18 44 30 42 L42 42 Q28 48 24 60 L18 62 Z" fill={l} />
      {/* Ankle collar */}
      <path d="M64 40 Q82 38 92 46" fill="none" stroke={d} strokeWidth="4.5" strokeLinecap="round" opacity="0.55" />
      {/* Midsole */}
      <rect x="16" y="71" width="88" height="8" rx="2" fill={l} />
      {/* Outsole */}
      <rect x="18" y="78" width="84" height="7" rx="3" fill={d} />
      {/* Lace eyelets */}
      {[42, 52, 62, 72].map((x) => (
        <circle key={x} cx={x} cy="46" r="2" fill={d} opacity="0.4" />
      ))}
      {/* Swoosh hint */}
      <path d="M36 56 Q60 50 84 60" fill="none" stroke={d} strokeWidth="2" opacity="0.25" />
    </g>
  );
}

function Sandals({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Sole */}
      <path d="M14 86 Q14 100 28 102 L92 102 Q106 100 106 86 L106 80 L14 80 Z" fill={d} />
      <rect x="14" y="80" width="92" height="6" rx="1" fill={c} opacity="0.4" />
      {/* Toe strap */}
      <path d="M26 80 Q36 66 50 74 L54 80" fill="none" stroke={c} strokeWidth="5.5" strokeLinecap="round" />
      {/* Mid straps */}
      <path d="M40 80 Q52 60 68 68 L72 80" fill="none" stroke={c} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M56 80 Q66 54 82 62 L86 80" fill="none" stroke={c} strokeWidth="5.5" strokeLinecap="round" />
      {/* Ankle strap */}
      <path d="M72 80 Q82 50 96 60 L98 80" fill="none" stroke={c} strokeWidth="5.5" strokeLinecap="round" />
      {/* Heel post */}
      <rect x="94" y="58" width="7" height="22" rx="2.5" fill={d} opacity="0.6" />
    </g>
  );
}

function Flats({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Ballet flat body — very flat side view */}
      <path d="M14 70 Q14 54 30 52 L84 50 Q102 50 106 64 L106 72 Z" fill={c} />
      {/* Toe darkening */}
      <path d="M14 70 Q14 54 30 52 L44 52 Q26 58 20 70 Z" fill={d} opacity="0.4" />
      {/* Sole */}
      <rect x="12" y="71" width="96" height="7" rx="3" fill={d} />
      {/* Bow — left petal */}
      <path d="M40 50 Q48 42 56 50 Q48 56 40 50 Z" fill={d} />
      {/* Bow — right petal */}
      <path d="M56 50 Q64 42 72 50 Q64 56 56 50 Z" fill={d} />
      {/* Bow centre knot */}
      <circle cx="56" cy="50" r="3.5" fill={d} />
      {/* Vamp line */}
      <path d="M38 52 Q56 66 74 52" fill="none" stroke={d} strokeWidth="1.5" opacity="0.3" />
    </g>
  );
}

// ─── Accessories ─────────────────────────────────────────────────────────────

function Necklace({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Shortest chain */}
      <path d="M32 28 Q60 18 88 28" fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
      {/* Chain link dots */}
      {[40, 50, 60, 70, 80].map((x) => {
        const y = 24 - Math.sin(((x - 60) / 28) * Math.PI) * 8;
        return <circle key={x} cx={x} cy={y} r="1.8" fill={d} opacity="0.55" />;
      })}
      {/* Medium chain */}
      <path d="M24 44 Q60 30 96 44" fill="none" stroke={d} strokeWidth="3" strokeLinecap="round" />
      {/* Longest chain */}
      <path d="M18 64 Q60 44 102 64" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      {/* Pendant */}
      <path d="M60 64 L60 80" stroke={d} strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="86" r="7" fill={d} />
      <circle cx="60" cy="86" r="4.5" fill={l} opacity="0.7" />
    </g>
  );
}

function Bag({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Shoulder strap arc */}
      <path d="M38 20 Q26 10 20 20 Q14 32 22 42 L34 52" fill="none" stroke={d} strokeWidth="4.5" strokeLinecap="round" />
      {/* Bag body */}
      <rect x="22" y="52" width="76" height="56" rx="8" fill={c} />
      {/* Flap overlay */}
      <path d="M22 52 L22 70 Q22 78 30 78 L90 78 Q98 78 98 70 L98 52 Z" fill={d} opacity="0.8" />
      {/* Clasp */}
      <rect x="50" y="74" width="20" height="8" rx="4" fill={l} />
      <rect x="56" y="76" width="8" height="4" rx="2" fill={d} />
      {/* Flap stitching */}
      <path d="M28 58 L90 58" stroke={l} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      {/* Body centre seam */}
      <line x1="60" y1="78" x2="60" y2="106" stroke={d} strokeWidth="1" opacity="0.18" />
    </g>
  );
}

function Belt({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Strap */}
      <rect x="10" y="50" width="82" height="20" rx="5" fill={c} />
      {/* Buckle frame */}
      <rect x="90" y="44" width="20" height="32" rx="6" fill="none" stroke={d} strokeWidth="3.5" />
      {/* Prong */}
      <line x1="100" y1="44" x2="100" y2="76" stroke={d} strokeWidth="3" strokeLinecap="round" />
      {/* Leather grain lines */}
      <line x1="12" y1="57" x2="93" y2="57" stroke={d} strokeWidth="0.9" opacity="0.22" />
      <line x1="12" y1="63" x2="93" y2="63" stroke={d} strokeWidth="0.9" opacity="0.22" />
      {/* Belt holes */}
      {[28, 42, 56, 70, 84].map((x) => (
        <ellipse key={x} cx={x} cy="60" rx="2" ry="2.5" fill={d} opacity="0.45" />
      ))}
    </g>
  );
}

function Earrings({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      {/* Left hoop */}
      <circle cx="36" cy="66" r="26" fill="none" stroke={c} strokeWidth="6" />
      <circle cx="36" cy="66" r="26" fill="none" stroke={l} strokeWidth="2" opacity="0.45" />
      {/* Left post */}
      <circle cx="36" cy="40" r="4" fill={d} />
      {/* Right hoop */}
      <circle cx="84" cy="66" r="26" fill="none" stroke={c} strokeWidth="6" />
      <circle cx="84" cy="66" r="26" fill="none" stroke={l} strokeWidth="2" opacity="0.45" />
      {/* Right post */}
      <circle cx="84" cy="40" r="4" fill={d} />
    </g>
  );
}

// ─── Hanger fallback ──────────────────────────────────────────────────────────

function Hanger({ c, d, l }: { c: string; d: string; l: string }) {
  return (
    <g>
      <path d="M60 20 Q60 10 70 10 Q80 10 80 20 Q80 28 70 30" fill="none" stroke={d} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="30" x2="60" y2="50" stroke={d} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 54 Q60 38 102 54" fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 54 L14 96 Q14 100 18 100 L102 100 Q106 100 106 96 L102 54" fill={c} opacity="0.25" />
    </g>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClothingIllustration({ itemName, color, className }: Props) {
  const type = getType(itemName);
  const c = color;
  const d = shade(color, -38);
  const l = shade(color, 30);

  const illustrations: Record<IllustrationType, React.ReactNode> = {
    tee:          <GraphicTee   c={c} d={d} l={l} />,
    blazer:       <Blazer       c={c} d={d} l={l} />,
    skirt:        <PleatSkirt   c={c} d={d} l={l} />,
    cargo:        <CargoPants   c={c} d={d} l={l} />,
    dress:        <SlipDress    c={c} d={d} l={l} />,
    sweater:      <KnitSweater  c={c} d={d} l={l} />,
    denim:        <DenimJacket  c={c} d={d} l={l} />,
    hoodie:       <CropHoodie   c={c} d={d} l={l} />,
    trench:       <TrenchCoat   c={c} d={d} l={l} />,
    linentop:     <LinenTop     c={c} d={d} l={l} />,
    cami:         <CamiSet      c={c} d={d} l={l} />,
    leatherskirt: <LeatherSkirt c={c} d={d} l={l} />,
    boots:        <Boots        c={c} d={d} l={l} />,
    sneakers:     <Sneakers     c={c} d={d} l={l} />,
    sandals:      <Sandals      c={c} d={d} l={l} />,
    flats:        <Flats        c={c} d={d} l={l} />,
    necklace:     <Necklace     c={c} d={d} l={l} />,
    bag:          <Bag          c={c} d={d} l={l} />,
    belt:         <Belt         c={c} d={d} l={l} />,
    earrings:     <Earrings     c={c} d={d} l={l} />,
    hanger:       <Hanger       c={c} d={d} l={l} />,
  };

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      {illustrations[type]}
    </svg>
  );
}
