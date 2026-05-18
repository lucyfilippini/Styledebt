"use client";

import { useState } from "react";
import { closetItems, costPerWear, ClothingItem } from "../data/closet";
import { glass, roseBtn } from "../data/theme";
import ClothingIllustration from "../components/ClothingIllustration";

interface Props {
  itemId: string;
  onBack: () => void;
  addedItems: ClothingItem[];
  wornCounts: Record<string, number>;
  onLogWear: (id: string) => void;
}

export default function ItemDetailScreen({ itemId, onBack, addedItems, wornCounts, onLogWear }: Props) {
  const item = closetItems.find((i) => i.id === itemId) ?? addedItems.find((i) => i.id === itemId);
  const [logged, setLogged] = useState(false);

  if (!item) return null;

  // Use lifted wornCounts so the detail view stays in sync with the parent toast
  const wears = wornCounts[itemId] ?? item.timesWorn;
  const cpw = Math.round((item.price / Math.max(wears, 1)) * 100) / 100;
  const bought = new Date(item.dateBought).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
  const wearsToTarget = Math.ceil(item.price / 2.0 - wears);
  const progressPct = Math.min(100, (wears / (wears + Math.max(wearsToTarget, 0))) * 100);

  function logWear() {
    onLogWear(itemId); // parent handles wornCounts update + toast
    setLogged(true);
    setTimeout(() => setLogged(false), 2200);
  }

  return (
    <div className="screen-scroll flex-1 pb-6">
      {/* Back */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center card-lift"
          style={glass}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="var(--espresso)" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="display text-base font-semibold" style={{ color: "var(--espresso)" }}>
          Item Details
        </h1>
      </div>

      {/* Hero illustration */}
      <div className="mx-5 mb-4 relative rounded-2xl overflow-hidden h-72 flex items-center justify-center"
        style={{ background: `linear-gradient(145deg, ${item.color}28, ${item.color}0E)`,
          boxShadow: "0 8px 32px rgba(107,94,87,0.10)" }}>
        <div className="w-3/4 h-5/6 flex items-center justify-center">
          <ClothingIllustration itemName={item.name} color={item.color} />
        </div>
        {/* CPW pill */}
        <div className="absolute bottom-3 right-3 rounded-2xl px-3 py-2"
          style={{ ...glass, border: "1px solid rgba(200,164,232,0.35)" }}>
          <p className="display-italic text-xl font-bold leading-none" style={{ color: "var(--rose)" }}>
            ${cpw}
          </p>
          <p className="text-[9px] mt-0.5" style={{ color: "var(--muted)" }}>per wear</p>
        </div>
        {/* Name overlay */}
        <div className="absolute bottom-3 left-3">
          <h2 className="display text-lg font-semibold" style={{ color: "var(--espresso)" }}>{item.name}</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--mocha)" }}>{item.brand}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 rounded-2xl mb-4 overflow-hidden" style={glass}>
        {[
          { label: "Purchase price", value: `$${item.price}` },
          { label: "Date bought",    value: bought },
          { label: "Times worn",     value: `${wears}×` },
          { label: "Cost per wear",  value: `$${cpw}` },
        ].map(({ label, value }, i, arr) => (
          <div key={label}
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(107,94,87,0.08)" : "none" }}>
            <span className="text-sm" style={{ color: "var(--mocha)" }}>{label}</span>
            <span className="display-italic text-sm font-semibold" style={{ color: "var(--espresso)" }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* CPW Projection */}
      <div className="mx-5 mb-4 rounded-2xl overflow-hidden" style={glass}>
        <div className="px-4 pt-3 pb-1">
          <p className="text-xs font-semibold" style={{ color: "var(--espresso)" }}>
            Cost-per-Wear Projection
          </p>
          <p className="text-[10px] mt-0.5 mb-1" style={{ color: "var(--muted)" }}>
            Based on ${item.price} purchase price
          </p>
        </div>
        {([5, 10, 20, 30] as const).map((n, i, arr) => {
          const projected = (item.price / n).toFixed(2);
          const reached = wears >= n;
          return (
            <div key={n}
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderTop: "1px solid rgba(107,94,87,0.07)" }}>
              <span className="text-xs" style={{ color: "var(--mocha)" }}>
                At {n} wears
                {reached && (
                  <span style={{ marginLeft: 6, fontSize: 9, color: "#3D7A6A", fontWeight: 600 }}>
                    ✓ reached
                  </span>
                )}
              </span>
              <span className="display-italic text-sm font-semibold"
                style={{ color: reached ? "#3D7A6A" : "var(--espresso)" }}>
                ${projected}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mx-5 mb-5 rounded-2xl p-4" style={glass}>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-semibold" style={{ color: "var(--espresso)" }}>Goal: $2.00/wear</p>
          <p className="text-xs font-medium"
            style={{ color: wearsToTarget <= 0 ? "#3D7A6A" : "var(--muted)" }}>
            {wearsToTarget <= 0 ? "Reached! 🎉" : `${wearsToTarget} more wears`}
          </p>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden"
          style={{ background: "rgba(107,94,87,0.1)" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, #C8A4E8, #F0B8CC, #FFD0B8)",
              boxShadow: "0 0 8px rgba(200,164,232,0.5)",
            }} />
        </div>
        <p className="text-[10px] mt-2" style={{ color: "var(--muted)" }}>
          Wear it, don&apos;t just own it. Each wear lowers your cost.
        </p>
      </div>

      {/* I Wore This Today */}
      <div className="px-5">
        <button onClick={logWear}
          className="w-full py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
          style={logged
            ? { background: "#3D7A6A", color: "#fff", boxShadow: "0 6px 24px rgba(61,122,106,0.3)" }
            : { ...roseBtn }}>
          {logged ? "Wear logged! ✓" : "I Wore This Today"}
        </button>
      </div>
    </div>
  );
}
