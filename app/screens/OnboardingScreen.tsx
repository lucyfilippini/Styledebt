"use client";

import BackgroundOrbs from "../components/BackgroundOrbs";
import { glass } from "../data/theme";

interface Props {
  onGetStarted: () => void;
  onImportReceipt: () => void;
  onSkip: () => void;
}

export default function OnboardingScreen({ onGetStarted, onImportReceipt, onSkip }: Props) {
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
        {/* Logo mark */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
          background: "linear-gradient(#FAF8F5, #FAF8F5) padding-box, linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8, #A8C8F0) border-box",
          border: "2.5px solid transparent",
          boxShadow: "0 8px 28px rgba(200,164,232,0.30)",
          fontSize: 22,
        }}>✦</div>

        {/* Logo */}
        <h1 className="display-italic" style={{
          fontSize: "2.8rem",
          fontWeight: 700,
          color: "#8B3A52",
          marginBottom: 8,
          textAlign: "center",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>
          StyleDebt
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 13,
          color: "var(--mocha)",
          textAlign: "center",
          marginBottom: 32,
          fontFamily: "var(--font-dm, system-ui)",
          fontStyle: "italic",
          letterSpacing: "0.015em",
        }}>
          Know what your closet really costs.
        </p>

        {/* Explanation card */}
        <div style={{
          ...glass,
          borderRadius: 20,
          padding: "22px 24px",
          marginBottom: 32,
          width: "100%",
        }}>
          <p style={{
            fontSize: 13,
            color: "var(--mocha)",
            lineHeight: 1.85,
            fontFamily: "var(--font-dm, system-ui)",
            textAlign: "center",
            margin: 0,
          }}>
            StyleDebt tracks every item in your wardrobe and calculates the real cost-per-wear of everything you own.
            {" "}Add items by forwarding a shopping receipt — our AI reads it automatically.
            {" "}Shop smarter, waste less.
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Primary: rose gradient */}
          <button
            onClick={onGetStarted}
            style={{
              background: "linear-gradient(135deg, #A8394F, #C8607A, #E090A0)",
              boxShadow: "0 6px 24px rgba(168,57,79,0.28)",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              width: "100%",
              padding: "16px",
              borderRadius: 16,
              fontSize: 14,
              fontFamily: "var(--font-dm, system-ui)",
              letterSpacing: "0.01em",
            }}
          >
            Get Started
          </button>

          {/* Secondary: iridescent gradient */}
          <button
            onClick={onImportReceipt}
            style={{
              background: "linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8)",
              boxShadow: "0 6px 24px rgba(200,164,232,0.35)",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              width: "100%",
              padding: "16px",
              borderRadius: 16,
              fontSize: 14,
              fontFamily: "var(--font-dm, system-ui)",
              letterSpacing: "0.01em",
            }}
          >
            📧&nbsp;&nbsp;Import a Receipt
          </button>

          {/* Skip link */}
          <button
            onClick={onSkip}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: 12,
              cursor: "pointer",
              padding: "10px",
              fontFamily: "var(--font-dm, system-ui)",
              textDecoration: "underline",
              textDecorationColor: "rgba(107,94,87,0.35)",
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
