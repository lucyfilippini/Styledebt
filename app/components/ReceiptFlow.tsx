"use client";

import { useState } from "react";
import type { ClothingItem, Category } from "../data/closet";
import ClothingIllustration from "./ClothingIllustration";
import { glass, irisBadge } from "../data/theme";

// ─── Constants ───────────────────────────────────────────────────────────────

const irisBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8)",
  color: "#fff",
  fontWeight: 700,
  boxShadow: "0 6px 20px rgba(200,164,232,0.35)",
  border: "none",
  cursor: "pointer",
};

const SAMPLE_RECEIPT = `Order Confirmation — Zara US
Order #ZR-2847291

1x Linen Blend Blazer — Ecru — Size S — $89.90
1x High Waist Straight Jeans — Light Blue — Size 4 — $49.90
1x Ribbed Knit Tank Top — Cream — Size S — $25.90
1x Strappy Heeled Sandals — Black — Size 7 — $59.90

Subtotal: $225.60
Shipping: $0.00
Total: $225.60`;

const COLOR_MAP: Record<string, string> = {
  black: "#3A3530", white: "#F5F5F0", cream: "#F2EDE0", ecru: "#EDE8D8",
  beige: "#D4C5A9", ivory: "#F0EAD6", navy: "#2A3A5A", blue: "#5A7AB0",
  "light blue": "#8BB4D4", denim: "#8BB4D4", red: "#C43A3A", pink: "#F0B8CC",
  blush: "#F2B4B8", rose: "#E8909A", lavender: "#C8A4E8", purple: "#9B7CC4",
  green: "#8FAF88", sage: "#8A9A80", olive: "#8A8A5A", tan: "#C4A878",
  camel: "#C4A878", brown: "#8B6B45", chocolate: "#5A3A28", grey: "#A0A0A0",
  gray: "#A0A0A0", silver: "#C0C0C0", gold: "#D4AF37", yellow: "#F0C060",
  orange: "#E07840", floral: "#F0B8CC", stripe: "#A0A0C0", plaid: "#8A7A6A",
};

function parseColor(colorStr: string): string {
  if (!colorStr) return "#B8A8B0";
  const key = colorStr.toLowerCase().trim();
  return COLOR_MAP[key] ?? COLOR_MAP[key.split(" ")[0]] ?? "#B8A8B0";
}

function mapCategory(cat: string): Category {
  const m: Record<string, Category> = {
    Tops: "Tops", Bottoms: "Bottoms", Shoes: "Shoes", Accessories: "Accessories",
    Dresses: "Tops", Outerwear: "Tops",
  };
  return m[cat] ?? "Tops";
}

function makeId(): string {
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "modal" | "input" | "manual" | "loading" | "review" | "error" | "empty";

interface ReviewItem {
  tempId: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  color: string;
  included: boolean;
}

interface Props {
  onClose: () => void;
  onItemsAdded: (items: ClothingItem[]) => void;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: "50%", border: "none",
      background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", boxShadow: "0 2px 12px rgba(107,94,87,0.1)",
      flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="var(--espresso)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ReceiptFlow({ onClose, onItemsAdded }: Props) {
  const [step, setStep] = useState<Step>("modal");
  const [receiptText, setReceiptText] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // Manual form
  const [manualName, setManualName] = useState("");
  const [manualBrand, setManualBrand] = useState("");
  const [manualPrice, setManualPrice] = useState("");
  const [manualCategory, setManualCategory] = useState("Tops");
  const [manualColor, setManualColor] = useState("");

  const includedCount = items.filter((i) => i.included).length;

  async function parseReceipt() {
    if (!receiptText.trim()) return;
    setStep("loading");

    const SYSTEM_PROMPT = `You are a clothing receipt parser for StyleDebt, a wardrobe tracking app.
Extract clothing items from the receipt text provided.

Return ONLY a JSON array with no preamble, no markdown, no backticks. Each object must have:
- name: string (item name, cleaned up and capitalized)
- brand: string (store/brand name)
- price: number (price as a number, no $ sign)
- category: string (one of: "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories")
- color: string (primary color if detectable, otherwise "")

Example output:
[{"name":"Floral Midi Dress","brand":"Zara","price":59.90,"category":"Dresses","color":"floral"}]

If no clothing items are found, return an empty array: []`;

    try {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      if (!apiKey || apiKey === "your_key_here") {
        throw new Error("API key not configured — add NEXT_PUBLIC_ANTHROPIC_API_KEY to .env.local");
      }

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: receiptText }],
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(`Anthropic ${res.status}: ${(errBody as any)?.error?.message ?? res.statusText}`);
      }

      const data = await res.json();
      const content = data.content?.[0]?.text;
      if (!content) throw new Error("Empty response from API");

      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setStep("empty");
        return;
      }

      setItems(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (parsed as any[]).map((item) => ({
          tempId: makeId(),
          name: item.name ?? "",
          brand: item.brand ?? "",
          price: Number(item.price) || 0,
          category: item.category ?? "Tops",
          color: item.color ?? "",
          included: true,
        }))
      );
      setStep("review");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("[ReceiptFlow] parseReceipt failed:", msg);
      setErrorMsg(`We couldn't read that receipt — ${msg}`);
      setStep("error");
    }
  }

  function confirmItems() {
    const selected = items.filter((i) => i.included);
    onItemsAdded(
      selected.map((i) => ({
        id: makeId(),
        name: i.name,
        brand: i.brand,
        category: mapCategory(i.category),
        icon: "tshirt" as const,
        price: i.price,
        dateBought: new Date().toISOString().split("T")[0],
        timesWorn: 0,
        color: parseColor(i.color),
      }))
    );
    onClose();
  }

  function confirmManual() {
    if (!manualName.trim()) return;
    onItemsAdded([{
      id: makeId(),
      name: manualName.trim(),
      brand: manualBrand.trim() || "Unknown",
      category: mapCategory(manualCategory),
      icon: "tshirt" as const,
      price: parseFloat(manualPrice) || 0,
      dateBought: new Date().toISOString().split("T")[0],
      timesWorn: 0,
      color: parseColor(manualColor),
    }]);
    onClose();
  }

  async function copyAddress() {
    try { await navigator.clipboard.writeText("receipts@styledebt.app"); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function updateItem(id: string, field: keyof ReviewItem, value: string | number | boolean) {
    setItems((prev) => prev.map((i) => i.tempId === id ? { ...i, [field]: value } : i));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(200,164,232,0.28)",
    background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)",
    fontSize: 14, color: "var(--espresso)",
    fontFamily: "var(--font-dm, system-ui)", outline: "none",
  };

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 150,
      background: step === "modal" ? "rgba(26,17,8,0.3)" : "var(--bg)",
      backdropFilter: step === "modal" ? "blur(4px)" : "none",
      display: "flex", flexDirection: "column",
      overflowY: step === "review" ? "auto" : "hidden",
    }}>

      {/* ── MODAL ──────────────────────────────────────────────────────── */}
      {step === "modal" && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(24px)",
          borderRadius: "24px 24px 0 0", padding: "8px 24px 44px",
          boxShadow: "0 -8px 40px rgba(107,94,87,0.14)",
        }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(107,94,87,0.18)", margin: "14px auto 22px" }} />
          <h2 className="display-italic" style={{ fontSize: 22, fontWeight: 700, color: "var(--espresso)", marginBottom: 6 }}>
            Add to Closet
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 24 }}>
            How would you like to add items?
          </p>
          <button onClick={() => setStep("input")} style={{
            ...irisBtn, display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, width: "100%", padding: "16px 20px", borderRadius: 16,
            fontSize: 14, marginBottom: 12, fontFamily: "var(--font-dm, system-ui)",
          }}>
            <span style={{ fontSize: 18 }}>📧</span> Forward Your Receipt
          </button>
          <button onClick={() => setStep("manual")} style={{
            background: "none", border: "none", width: "100%", color: "var(--mocha)",
            fontSize: 13, padding: "10px", cursor: "pointer",
            fontFamily: "var(--font-dm, system-ui)",
          }}>
            Add Manually
          </button>
          <button onClick={onClose} style={{
            background: "none", border: "none", width: "100%", color: "var(--muted)",
            fontSize: 12, padding: "8px", cursor: "pointer",
            fontFamily: "var(--font-dm, system-ui)", marginTop: 4,
          }}>Cancel</button>
        </div>
      )}

      {/* ── RECEIPT INPUT ──────────────────────────────────────────────── */}
      {step === "input" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px 14px" }}>
            <BackBtn onClick={() => setStep("modal")} />
            <h1 className="display-italic" style={{ fontSize: 20, fontWeight: 700, color: "var(--espresso)", flex: 1 }}>
              Forward Your Receipt
            </h1>
            <span style={{
              fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
              background: "rgba(200,164,232,0.22)", border: "1px solid rgba(200,164,232,0.38)",
              color: "#8B5A9A", letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}>✦ Claude AI</span>
          </div>
          <div style={{ padding: "0 20px", flex: 1, overflowY: "auto" }}>
            {/* Copy address */}
            <div style={{
              background: "rgba(200,164,232,0.08)", borderRadius: 16, padding: 16, marginBottom: 16,
              border: "1px solid rgba(200,164,232,0.2)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--mocha)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Step 1 — Forward your order email to
              </p>
              <button onClick={copyAddress} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "12px 16px", borderRadius: 12, cursor: "pointer",
                background: "rgba(255,255,255,0.72)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(200,164,232,0.35)",
              }}>
                <span className="display-italic" style={{ fontSize: 14, fontWeight: 600, color: "var(--rose)" }}>
                  receipts@styledebt.app
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: copied ? "#3D7A6A" : "var(--mocha)", transition: "color 0.2s" }}>
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>
            </div>

            {/* Paste toggle */}
            <div style={{ marginBottom: 16 }}>
              <button onClick={() => setShowPaste(!showPaste)} style={{
                display: "flex", alignItems: "center", gap: 8, background: "none",
                border: "none", cursor: "pointer", padding: "0 0 10px",
              }}>
                <span style={{ fontSize: 13, color: "var(--mocha)", fontFamily: "var(--font-dm, system-ui)" }}>
                  Or paste your receipt text
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="var(--muted)" strokeWidth="2.2" strokeLinecap="round"
                  style={{ transform: showPaste ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.22s" }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {showPaste && (
                <>
                  <textarea
                    value={receiptText}
                    onChange={(e) => setReceiptText(e.target.value)}
                    placeholder="Paste your order confirmation here..."
                    rows={6}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
                  />
                  <button onClick={() => setReceiptText(SAMPLE_RECEIPT)} style={{
                    marginTop: 8, background: "none", border: "none", cursor: "pointer",
                    fontSize: 11, color: "var(--accent2)", padding: 0,
                    textDecoration: "underline", fontFamily: "var(--font-dm, system-ui)",
                  }}>
                    Try a sample receipt
                  </button>
                </>
              )}
            </div>

            <button onClick={parseReceipt} disabled={!receiptText.trim()} style={{
              ...irisBtn, width: "100%", padding: 15, borderRadius: 14, fontSize: 14,
              fontFamily: "var(--font-dm, system-ui)",
              opacity: receiptText.trim() ? 1 : 0.5,
              cursor: receiptText.trim() ? "pointer" : "default",
            }}>
              Parse Receipt ✨
            </button>
          </div>
        </div>
      )}

      {/* ── MANUAL ADD ─────────────────────────────────────────────────── */}
      {step === "manual" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px 14px" }}>
            <BackBtn onClick={() => setStep("modal")} />
            <h1 className="display-italic" style={{ fontSize: 20, fontWeight: 700, color: "var(--espresso)" }}>
              Add Manually
            </h1>
          </div>
          <div style={{ padding: "0 20px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {([
              { label: "Item Name *", val: manualName, set: setManualName, ph: "e.g. Oversized Blazer", type: "text" },
              { label: "Brand", val: manualBrand, set: setManualBrand, ph: "e.g. Levi's", type: "text" },
              { label: "Price ($)", val: manualPrice, set: setManualPrice, ph: "e.g. 89.90", type: "number" },
              { label: "Color", val: manualColor, set: setManualColor, ph: "e.g. light blue", type: "text" },
            ] as const).map(({ label, val, set, ph, type }) => (
              <div key={label}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--mocha)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {label}
                </p>
                <input type={type ?? "text"} value={val} onChange={(e) => (set as (v: string) => void)(e.target.value)}
                  placeholder={ph} style={inputStyle} />
              </div>
            ))}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--mocha)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Category
              </p>
              <select value={manualCategory} onChange={(e) => setManualCategory(e.target.value)}
                style={{ ...inputStyle }}>
                {["Tops", "Bottoms", "Shoes", "Accessories", "Dresses", "Outerwear"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button onClick={confirmManual} disabled={!manualName.trim()} style={{
              ...irisBtn, width: "100%", padding: 15, borderRadius: 14, fontSize: 14, marginTop: 8,
              fontFamily: "var(--font-dm, system-ui)",
              opacity: manualName.trim() ? 1 : 0.5,
              cursor: manualName.trim() ? "pointer" : "default",
            }}>
              Add to Closet
            </button>
          </div>
        </div>
      )}

      {/* ── LOADING ────────────────────────────────────────────────────── */}
      {step === "loading" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 20px 24px" }}>
          <h2 className="display-italic" style={{ fontSize: 22, fontWeight: 700, color: "var(--espresso)", marginBottom: 6, textAlign: "center" }}>
            Reading your receipt...
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 12, textAlign: "center", marginBottom: 32 }}>
            Finding your items
          </p>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              ...glass, borderRadius: 16, padding: 14, marginBottom: 12,
              display: "flex", gap: 12, alignItems: "center",
            }}>
              <div className="shimmer-loading" style={{ width: 52, height: 60, borderRadius: 10, flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="shimmer-loading" style={{ height: 12, width: `${60 + i * 10}%`, borderRadius: 6 }} />
                <div className="shimmer-loading" style={{ height: 10, width: `${35 + i * 5}%`, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── REVIEW ─────────────────────────────────────────────────────── */}
      {step === "review" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px 6px" }}>
            <BackBtn onClick={() => setStep("input")} />
            <h1 className="display-italic" style={{ fontSize: 20, fontWeight: 700, color: "var(--espresso)" }}>
              Review Items
            </h1>
          </div>
          <p style={{ padding: "4px 20px 14px", fontSize: 12, color: "var(--muted)" }}>
            {items.length} item{items.length !== 1 ? "s" : ""} found — tap to edit, checkmark to include
          </p>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 110px" }}>
            {items.map((item) => (
              <div key={item.tempId} style={{
                ...glass, borderRadius: 16, padding: 14, marginBottom: 10,
                display: "flex", gap: 12, alignItems: "flex-start",
                opacity: item.included ? 1 : 0.45,
                transition: "opacity 0.2s",
              }}>
                {/* Illustration */}
                <div style={{
                  width: 56, height: 64, borderRadius: 12, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 6,
                  background: `${parseColor(item.color)}22`,
                }}>
                  <ClothingIllustration itemName={item.name} color={parseColor(item.color)} />
                </div>

                {/* Editable fields */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(item.tempId, "name", e.target.value)}
                    style={{
                      width: "100%", background: "none", border: "none", outline: "none",
                      fontSize: 14, fontWeight: 600, color: "var(--espresso)", marginBottom: 7,
                      fontFamily: "var(--font-playfair, Georgia, serif)", fontStyle: "italic", padding: 0,
                    }}
                  />
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ ...irisBadge, fontSize: 10, padding: "2px 8px", borderRadius: 20 }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(107,94,87,0.08)", color: "var(--mocha)", fontWeight: 500 }}>
                      {item.brand}
                    </span>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(107,94,87,0.08)", color: "var(--mocha)", fontWeight: 500 }}>
                      ${item.price}
                    </span>
                  </div>
                </div>

                {/* Include toggle */}
                <button onClick={() => updateItem(item.tempId, "included", !item.included)} style={{
                  width: 28, height: 28, borderRadius: "50%", border: "none", flexShrink: 0, marginTop: 2,
                  background: item.included ? "linear-gradient(135deg, #c8a8d8, #e8a0b8)" : "rgba(107,94,87,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "background 0.2s",
                }}>
                  {item.included ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Sticky confirm bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "14px 20px 36px",
            background: "rgba(250,248,245,0.94)",
            backdropFilter: "blur(14px)",
            borderTop: "0.5px solid rgba(180,140,160,0.15)",
          }}>
            <button onClick={confirmItems} disabled={includedCount === 0} style={{
              ...irisBtn, width: "100%", padding: 15, borderRadius: 14, fontSize: 14,
              fontFamily: "var(--font-dm, system-ui)",
              opacity: includedCount > 0 ? 1 : 0.45,
              cursor: includedCount > 0 ? "pointer" : "default",
            }}>
              Add {includedCount} Item{includedCount !== 1 ? "s" : ""} to Closet ✨
            </button>
          </div>
        </div>
      )}

      {/* ── ERROR ──────────────────────────────────────────────────────── */}
      {step === "error" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
          <h2 className="display-italic" style={{ fontSize: 20, fontWeight: 700, color: "var(--espresso)", textAlign: "center", marginBottom: 8 }}>
            Couldn&apos;t Read That Receipt
          </h2>
          <p style={{ fontSize: 13, color: "var(--mocha)", textAlign: "center", marginBottom: 28, lineHeight: 1.55 }}>
            {errorMsg}
          </p>
          <button onClick={() => setStep("input")} style={{
            ...irisBtn, padding: "13px 28px", borderRadius: 12, fontSize: 13,
            fontFamily: "var(--font-dm, system-ui)",
          }}>
            Try Again
          </button>
        </div>
      )}

      {/* ── EMPTY ──────────────────────────────────────────────────────── */}
      {step === "empty" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧺</div>
          <h2 className="display-italic" style={{ fontSize: 20, fontWeight: 700, color: "var(--espresso)", textAlign: "center", marginBottom: 8 }}>
            No Items Found
          </h2>
          <p style={{ fontSize: 13, color: "var(--mocha)", textAlign: "center", marginBottom: 28, lineHeight: 1.55 }}>
            No clothing items were detected. Try a different receipt or add your items manually.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep("input")} style={{
              ...irisBtn, padding: "13px 20px", borderRadius: 12, fontSize: 13,
              fontFamily: "var(--font-dm, system-ui)",
            }}>
              Try Again
            </button>
            <button onClick={() => setStep("manual")} style={{
              padding: "13px 20px", borderRadius: 12, fontSize: 13, cursor: "pointer",
              background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)",
              color: "var(--mocha)", border: "1px solid rgba(107,94,87,0.12)",
              fontFamily: "var(--font-dm, system-ui)",
            }}>
              Add Manually
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
