"use client";

import React from "react";

export type IconType =
  | "tshirt" | "blazer" | "pants" | "jeans" | "skirt"
  | "boots" | "sneakers" | "necklace" | "tank" | "bag"
  | "cardigan" | "sandals" | "dress" | "trench" | "belt"
  | "hoops" | "flats";

function shade(hex: string, amount: number): string {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return hex;
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const d = amount * 255;
  return `rgb(${clamp(r + d)},${clamp(g + d)},${clamp(b + d)})`;
}

interface P { c: string; d: string; l: string }

const icons: Record<IconType, (p: P) => React.ReactNode> = {

  tshirt: ({ c, d }) => (
    <>
      <path d="M50,16 C45,10 37,14 32,22 L10,15 L7,44 L28,48 L28,90 L72,90 L72,48 L93,44 L90,15 L68,22 C63,14 55,10 50,16Z" fill={c} />
      <path d="M32,22 C42,33 58,33 68,22 C62,14 38,14 32,22Z" fill={d} opacity="0.45" />
      <path d="M7,44 L28,48 L28,22 L10,15Z" fill={d} opacity="0.18" />
      <path d="M93,44 L72,48 L72,22 L90,15Z" fill={d} opacity="0.18" />
    </>
  ),

  blazer: ({ c, d, l }) => (
    <>
      <path d="M22,26 L2,34 L5,76 L20,73 L18,95 L82,95 L80,73 L95,76 L98,34 L78,26 L65,14 L58,44 L50,40 L42,44 L35,14Z" fill={c} />
      <path d="M35,14 L42,44 L50,40 L44,18Z" fill={d} opacity="0.42" />
      <path d="M65,14 L58,44 L50,40 L56,18Z" fill={d} opacity="0.42" />
      <path d="M2,34 L22,26 L22,50 L5,56Z" fill={d} opacity="0.2" />
      <path d="M98,34 L78,26 L78,50 L95,56Z" fill={d} opacity="0.2" />
      <rect x="26" y="56" width="13" height="8" rx="2" fill={l} opacity="0.22" />
      <circle cx="50" cy="58" r="2.5" fill="rgba(255,255,255,0.55)" />
      <circle cx="50" cy="69" r="2.5" fill="rgba(255,255,255,0.55)" />
      <circle cx="50" cy="80" r="2.5" fill="rgba(255,255,255,0.55)" />
    </>
  ),

  pants: ({ c, d }) => (
    <>
      <rect x="18" y="8" width="64" height="16" rx="5" fill={d} opacity="0.75" />
      <path d="M18,24 L6,102 L46,102 L50,56 L54,102 L94,102 L82,24Z" fill={c} />
      <rect x="28" y="8" width="5" height="16" rx="1" fill={d} opacity="0.32" />
      <rect x="67" y="8" width="5" height="16" rx="1" fill={d} opacity="0.32" />
      <line x1="50" y1="56" x2="46" y2="102" stroke={d} strokeWidth="1.5" opacity="0.28" />
      <line x1="50" y1="56" x2="54" y2="102" stroke={d} strokeWidth="1.5" opacity="0.28" />
    </>
  ),

  jeans: ({ c, d, l }) => (
    <>
      <rect x="18" y="8" width="64" height="15" rx="4" fill={d} />
      <path d="M18,23 L16,102 L48,102 L50,56 L52,102 L84,102 L82,23Z" fill={c} />
      <path d="M20,26 Q30,19 43,26" stroke={l} strokeWidth="1.8" fill="none" opacity="0.5" />
      <path d="M57,26 Q70,19 80,26" stroke={l} strokeWidth="1.8" fill="none" opacity="0.5" />
      <line x1="50" y1="23" x2="50" y2="38" stroke={l} strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />
      <line x1="50" y1="56" x2="48" y2="102" stroke={d} strokeWidth="1.5" opacity="0.25" />
      <line x1="50" y1="56" x2="52" y2="102" stroke={d} strokeWidth="1.5" opacity="0.25" />
    </>
  ),

  skirt: ({ c, d }) => (
    <>
      <rect x="22" y="12" width="56" height="17" rx="6" fill={d} opacity="0.85" />
      <path d="M22,29 L5,102 L95,102 L78,29Z" fill={c} />
      <line x1="36" y1="29" x2="23" y2="102" stroke={d} strokeWidth="1.6" opacity="0.32" />
      <line x1="50" y1="29" x2="50" y2="102" stroke={d} strokeWidth="1.6" opacity="0.32" />
      <line x1="64" y1="29" x2="77" y2="102" stroke={d} strokeWidth="1.6" opacity="0.32" />
      <circle cx="50" cy="20" r="3" fill="rgba(255,255,255,0.45)" />
    </>
  ),

  boots: ({ c, d, l }) => (
    <>
      {/* left boot */}
      <rect x="4" y="10" width="40" height="58" rx="9" fill={c} />
      <path d="M4,68 L4,84 Q4,92 14,92 L43,92 Q48,92 48,85 L48,76 L44,68Z" fill={c} />
      <rect x="2" y="90" width="48" height="12" rx="5" fill={d} />
      <line x1="24" y1="13" x2="24" y2="60" stroke={l} strokeWidth="1.8" opacity="0.32" />
      <rect x="4" y="60" width="40" height="8" rx="2" fill={d} opacity="0.25" />
      {/* right boot */}
      <rect x="56" y="10" width="40" height="58" rx="9" fill={c} />
      <path d="M56,68 L56,84 Q56,92 66,92 L95,92 Q100,92 100,85 L100,76 L96,68Z" fill={c} />
      <rect x="54" y="90" width="48" height="12" rx="5" fill={d} />
      <line x1="76" y1="13" x2="76" y2="60" stroke={l} strokeWidth="1.8" opacity="0.32" />
      <rect x="56" y="60" width="40" height="8" rx="2" fill={d} opacity="0.25" />
    </>
  ),

  sneakers: ({ c, d, l }) => (
    <>
      <path d="M10,60 L10,38 Q12,22 30,20 L68,20 Q84,20 88,34 L92,60Z" fill={c} />
      <path d="M10,38 Q9,26 18,22 L14,36Z" fill={d} opacity="0.22" />
      <path d="M30,30 Q56,20 78,36" stroke={l} strokeWidth="4" fill="none" opacity="0.48" strokeLinecap="round" />
      <rect x="22" y="25" width="42" height="30" rx="3" fill={d} opacity="0.1" />
      <line x1="24" y1="33" x2="62" y2="33" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" />
      <line x1="24" y1="42" x2="62" y2="42" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" />
      <line x1="24" y1="51" x2="62" y2="51" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" />
      <path d="M8,60 L92,60 L94,69 Q94,74 84,74 L10,74 Q5,74 5,69Z" fill={d} />
      <rect x="4" y="72" width="92" height="9" rx="4" fill={d} opacity="0.72" />
    </>
  ),

  necklace: ({ c, d, l }) => (
    <>
      <ellipse cx="50" cy="42" rx="38" ry="26" fill="none" stroke={c} strokeWidth="4" />
      <ellipse cx="50" cy="46" rx="28" ry="18" fill="none" stroke={d} strokeWidth="2.5" opacity="0.6" />
      <line x1="50" y1="68" x2="50" y2="82" stroke={c} strokeWidth="3" />
      <circle cx="50" cy="90" r="9" fill={c} />
      <circle cx="50" cy="90" r="5.5" fill={l} opacity="0.4" />
      <circle cx="50" cy="90" r="2" fill="rgba(255,255,255,0.6)" />
      {/* chain links */}
      <circle cx="50" cy="16" r="2.5" fill={d} opacity="0.6" />
      <circle cx="12" cy="42" r="2.5" fill={d} opacity="0.6" />
      <circle cx="88" cy="42" r="2.5" fill={d} opacity="0.6" />
    </>
  ),

  tank: ({ c, d }) => (
    <>
      <rect x="30" y="8" width="10" height="24" rx="5" fill={c} />
      <rect x="60" y="8" width="10" height="24" rx="5" fill={c} />
      <path d="M24,30 Q24,24 30,24 L70,24 Q76,24 76,30 L76,90 Q76,96 70,96 L30,96 Q24,96 24,90Z" fill={c} />
      {[40, 52, 64, 76, 88].map(y => (
        <line key={y} x1="28" y1={y} x2="72" y2={y} stroke={d} strokeWidth="1" opacity="0.18" />
      ))}
      <path d="M30,24 Q50,35 70,24" stroke={d} strokeWidth="1.5" fill="none" opacity="0.28" />
    </>
  ),

  bag: ({ c, d, l }) => (
    <>
      <path d="M74,16 Q90,10 88,38" stroke={d} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9" />
      <rect x="14" y="36" width="64" height="58" rx="11" fill={c} />
      <path d="M14,36 Q14,22 26,20 L66,20 Q78,22 78,36 Q62,52 50,52 Q38,52 14,36Z" fill={c} />
      <path d="M14,36 Q38,54 50,54 Q62,54 78,36" stroke={d} strokeWidth="1.8" fill="none" opacity="0.4" />
      <rect x="43" y="48" width="14" height="9" rx="4.5" fill={l} opacity="0.65" />
      <circle cx="50" cy="52" r="2.5" fill={d} opacity="0.55" />
    </>
  ),

  cardigan: ({ c, d, l }) => (
    <>
      <path d="M22,26 L2,34 L5,78 L20,75 L18,95 L82,95 L80,75 L95,78 L98,34 L78,26 L64,14 L56,46 L50,42 L44,46 L36,14Z" fill={c} />
      <path d="M36,14 L44,46 L50,42 L42,18Z" fill={d} opacity="0.38" />
      <path d="M64,14 L56,46 L50,42 L58,18Z" fill={d} opacity="0.38" />
      <path d="M2,34 L22,26 L22,52 L5,58Z" fill={d} opacity="0.18" />
      <path d="M98,34 L78,26 L78,52 L95,58Z" fill={d} opacity="0.18" />
      <rect x="5" y="72" width="17" height="10" rx="3" fill={d} opacity="0.28" />
      <rect x="78" y="72" width="17" height="10" rx="3" fill={d} opacity="0.28" />
      {[0, 1, 2].map(i => (
        <line key={i} x1="18" y1={88 + i * 3} x2="82" y2={88 + i * 3} stroke={l} strokeWidth="1" opacity="0.22" />
      ))}
      <circle cx="50" cy="55" r="2.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="50" cy="67" r="2.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="50" cy="79" r="2.5" fill="rgba(255,255,255,0.5)" />
    </>
  ),

  sandals: ({ c, d }) => (
    <>
      {/* left */}
      <ellipse cx="24" cy="92" rx="22" ry="8" fill={d} />
      <path d="M4,70 Q24,58 44,70" stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M8,84 Q24,76 40,84" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
      <line x1="24" y1="82" x2="24" y2="92" stroke={c} strokeWidth="6" strokeLinecap="round" />
      {/* right */}
      <ellipse cx="76" cy="92" rx="22" ry="8" fill={d} />
      <path d="M56,70 Q76,58 96,70" stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M60,84 Q76,76 92,84" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
      <line x1="76" y1="82" x2="76" y2="92" stroke={c} strokeWidth="6" strokeLinecap="round" />
    </>
  ),

  dress: ({ c, d }) => (
    <>
      <rect x="30" y="8" width="10" height="22" rx="5" fill={c} />
      <rect x="60" y="8" width="10" height="22" rx="5" fill={c} />
      <path d="M22,28 Q22,22 30,22 L70,22 Q78,22 78,28 L74,54 L26,54Z" fill={c} />
      <path d="M26,54 L12,100 L88,100 L74,54Z" fill={c} />
      <line x1="24" y1="56" x2="76" y2="56" stroke={d} strokeWidth="2" opacity="0.35" />
      <line x1="50" y1="24" x2="50" y2="54" stroke={d} strokeWidth="1" opacity="0.18" />
      <path d="M30,22 Q50,34 70,22" stroke={d} strokeWidth="1.5" fill="none" opacity="0.25" />
    </>
  ),

  trench: ({ c, d, l }) => (
    <>
      <path d="M22,26 L2,34 L5,70 L20,68 L18,100 L82,100 L80,68 L95,70 L98,34 L78,26 L65,14 L58,44 L50,40 L42,44 L35,14Z" fill={c} />
      <path d="M35,14 L42,44 L50,40 L44,18Z" fill={d} opacity="0.4" />
      <path d="M65,14 L58,44 L50,40 L56,18Z" fill={d} opacity="0.4" />
      <path d="M2,34 L22,26 L22,52 L5,58Z" fill={d} opacity="0.2" />
      <path d="M98,34 L78,26 L78,52 L95,58Z" fill={d} opacity="0.2" />
      <rect x="20" y="56" width="60" height="9" rx="3" fill={d} opacity="0.55" />
      <rect x="44" y="56" width="12" height="9" rx="2" fill={l} opacity="0.45" />
      <rect x="18" y="20" width="8" height="7" rx="2" fill={d} opacity="0.38" />
      <rect x="74" y="20" width="8" height="7" rx="2" fill={d} opacity="0.38" />
      {[72, 82, 92].map(y => (
        <circle key={y} cx="50" cy={y} r="2.5" fill="rgba(255,255,255,0.42)" />
      ))}
    </>
  ),

  belt: ({ c, d, l }) => (
    <>
      <rect x="4" y="38" width="66" height="28" rx="6" fill={c} />
      <line x1="4" y1="44" x2="70" y2="44" stroke={l} strokeWidth="1" strokeDasharray="4,3" opacity="0.28" />
      <line x1="4" y1="60" x2="70" y2="60" stroke={l} strokeWidth="1" strokeDasharray="4,3" opacity="0.28" />
      {[18, 28, 38, 48, 58].map(x => (
        <circle key={x} cx={x} cy="52" r="3" fill={d} opacity="0.45" />
      ))}
      <rect x="68" y="30" width="28" height="44" rx="7" fill={d} />
      <rect x="72" y="34" width="20" height="36" rx="4" fill={l} opacity="0.28" />
      <line x1="82" y1="34" x2="82" y2="70" stroke={d} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),

  hoops: ({ c, d }) => (
    <>
      <circle cx="28" cy="58" r="25" fill="none" stroke={c} strokeWidth="9" />
      <circle cx="28" cy="58" r="25" fill="none" stroke={d} strokeWidth="4" opacity="0.28" />
      <circle cx="28" cy="34" r="5" fill={c} />
      <circle cx="72" cy="58" r="25" fill="none" stroke={c} strokeWidth="9" />
      <circle cx="72" cy="58" r="25" fill="none" stroke={d} strokeWidth="4" opacity="0.28" />
      <circle cx="72" cy="34" r="5" fill={c} />
    </>
  ),

  flats: ({ c, d, l }) => (
    <>
      {/* left */}
      <ellipse cx="24" cy="90" rx="22" ry="9" fill={d} />
      <path d="M3,76 Q3,60 16,58 L36,58 Q46,60 46,70 L44,82 Q34,88 24,88 Q10,88 3,76Z" fill={c} />
      <ellipse cx="13" cy="70" rx="9" ry="10" fill={d} opacity="0.18" />
      <path d="M28,60 Q33,54 37,57 Q33,62 28,60Z" fill={d} opacity="0.5" />
      <path d="M28,60 Q23,54 19,57 Q23,62 28,60Z" fill={d} opacity="0.5" />
      <circle cx="28" cy="60" r="2" fill={l} opacity="0.6" />
      {/* right */}
      <ellipse cx="76" cy="90" rx="22" ry="9" fill={d} />
      <path d="M55,76 Q57,60 70,58 L90,58 Q98,62 97,70 L95,82 Q85,88 76,88 Q62,88 55,76Z" fill={c} />
      <ellipse cx="88" cy="70" rx="9" ry="10" fill={d} opacity="0.18" />
      <path d="M72,60 Q77,54 81,57 Q77,62 72,60Z" fill={d} opacity="0.5" />
      <path d="M72,60 Q67,54 63,57 Q67,62 72,60Z" fill={d} opacity="0.5" />
      <circle cx="72" cy="60" r="2" fill={l} opacity="0.6" />
    </>
  ),
};

interface Props {
  iconType: IconType;
  color: string;
  className?: string;
}

export default function ClothingIcon({ iconType, color, className }: Props) {
  const c = color;
  const d = shade(color, -0.28);
  const l = shade(color, 0.32);
  const renderFn = icons[iconType] ?? icons.tshirt;

  return (
    <svg
      viewBox="0 0 100 110"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block" }}
    >
      {renderFn({ c, d, l })}
    </svg>
  );
}
