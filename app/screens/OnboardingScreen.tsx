"use client";

import BackgroundOrbs from "../components/BackgroundOrbs";

interface Props {
  onImportReceipt: () => void;
  onAddManually: () => void;
  onSkip: () => void;
}

const irisBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8)",
  color: "#fff",
  fontWeight: 700,
  border: "none",
  boxShadow: "0 6px 24px rgba(200,164,232,0.35)",
  cursor: "pointer",
  width: "100%",
  padding: "16px",
  borderRadius: 16,
  fontSize: 14,
  fontFamily: "var(--font-dm, system-ui)",
};

export default function OnboardingScreen({ onImportReceipt, onAddManually, onSkip }: Props) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 300,
      background: "var(--bg)",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <BackgroundOrbs />

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 28px 56px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Icon */}
        <div style={{ fontSize: 52, marginBottom: 12 }}>✨</div>

        {/* Logo */}
        <h1 className="display-italic" style={{
          fontSize: "2.6rem",
          fontWeight: 700,
          color: "#8B3A52",
          marginBottom: 8,
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}>
          StyleDebt
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 14,
          color: "var(--mocha)",
          textAlign: "center",
          marginBottom: 36,
          fontFamily: "var(--font-dm, system-ui)",
          fontStyle: "italic",
          letterSpacing: "0.01em",
        }}>
          Know what your closet really costs.
        </p>

        {/* Value prop card */}
        <div style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: 20,
          padding: "22px 24px",
          marginBottom: 40,
          textAlign: "center",
          width: "100%",
          boxShadow: "0 4px 24px rgba(180,140,160,0.1)",
        }}>
          <p style={{
            fontSize: 13,
            color: "var(--mocha)",
            lineHeight: 2.1,
            fontFamily: "var(--font-dm, system-ui)",
          }}>
            Track what you own.<br />
            See what you actually wear.<br />
            Shop smarter.
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={onImportReceipt} style={irisBtn}>
            📧&nbsp;&nbsp;Import a Receipt
          </button>

          <button onClick={onAddManually} style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(200,164,232,0.3)",
            color: "var(--mocha)",
            padding: "14px",
            borderRadius: 16,
            fontSize: 14,
            cursor: "pointer",
            width: "100%",
            fontFamily: "var(--font-dm, system-ui)",
            fontWeight: 600,
          }}>
            Add Items Manually
          </button>

          <button onClick={onSkip} style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            fontSize: 12,
            cursor: "pointer",
            padding: "10px",
            fontFamily: "var(--font-dm, system-ui)",
            textDecoration: "underline",
            textDecorationColor: "rgba(107,94,87,0.35)",
          }}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
