"use client";

type Screen = "home" | "closet" | "outfit" | "shop";

interface Props {
  active: Screen;
  onNav: (s: Screen) => void;
}

const HomeIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const ClosetIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2"/>
    <line x1="12" y1="3" x2="12" y2="21"/>
    <path d="M7 8h2M7 12h2M15 8h2M15 12h2"/>
  </svg>
);
const OutfitIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2l-5 4v2h4v13h8V8h4V6l-5-4-3 3-3-3z"/>
  </svg>
);
const ShopIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const navItems: { id: Screen; label: string; Icon: React.FC<{ filled: boolean }> }[] = [
  { id: "home",   label: "Home",    Icon: HomeIcon },
  { id: "closet", label: "Closet",  Icon: ClosetIcon },
  { id: "outfit", label: "Outfits", Icon: OutfitIcon },
  { id: "shop",   label: "Shop",    Icon: ShopIcon },
];

export default function BottomNav({ active, onNav }: Props) {
  return (
    <nav
      className="flex items-center justify-around px-2 pt-3 pb-6 shrink-0"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "0.5px solid rgba(180,140,160,0.2)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {navItems.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => onNav(id)}
            className="flex flex-col items-center gap-1 px-4 py-1 transition-all"
            style={{ color: isActive ? "#d4789a" : "rgba(107,94,87,0.45)" }}>
            <Icon filled={isActive} />
            <span className="text-[10px] font-medium"
              style={{
                fontFamily: "var(--font-dm, system-ui)",
                letterSpacing: "0.02em",
                background: isActive ? "linear-gradient(135deg, #C8A4E8, #E88AAE)" : "none",
                WebkitBackgroundClip: isActive ? "text" : "unset",
                WebkitTextFillColor: isActive ? "transparent" : "inherit",
              }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
