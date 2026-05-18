// Light frosted-glass card
export const glass = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.7)",
  boxShadow: "0 4px 24px rgba(180,140,160,0.12)",
} as const;

// Slightly darker glass (for secondary surfaces)
export const glassDark = {
  background: "rgba(255,255,255,0.5)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 12px rgba(107,94,87,0.06)",
} as const;

// Iridescent summary card (applied via className="shimmer-card" + these extras)
export const glowCard = {
  borderRadius: "20px",
  boxShadow: "0 10px 40px rgba(168,57,79,0.12), 0 0 60px rgba(200,164,232,0.10)",
  border: "1px solid rgba(255,255,255,0.55)",
} as const;

// Iridescent badge style (pill) — lavender → rose gradient, white text
export const irisBadge = {
  background: "linear-gradient(135deg, #c8a8d8, #e8a0b8)",
  border: "1px solid rgba(255,255,255,0.35)",
  color: "#fff",
  fontWeight: 500,
} as const;

// Primary rose button
export const roseBtn = {
  background: "linear-gradient(135deg, #A8394F, #C8607A, #E090A0)",
  boxShadow: "0 6px 24px rgba(168,57,79,0.28)",
  color: "#fff",
} as const;
