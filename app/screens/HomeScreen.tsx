"use client";

import { closetItems, costPerWear, avgCostPerWear, ClothingItem } from "../data/closet";
import { glass, glowCard, irisBadge } from "../data/theme";
import ClothingIllustration from "../components/ClothingIllustration";

interface Props {
  onItemClick: (id: string) => void;
  addedItems: ClothingItem[];
  wornCounts: Record<string, number>;
}

export default function HomeScreen({ onItemClick, addedItems, wornCounts }: Props) {
  // Effective items with up-to-date wear counts
  const allItems = [...closetItems, ...addedItems].map((item) => ({
    ...item,
    timesWorn: wornCounts[item.id] ?? item.timesWorn,
  }));

  const avg = avgCostPerWear();

  // Avg wears — real average across all items
  const avgWearsVal = allItems.length > 0
    ? Math.round(allItems.reduce((s, i) => s + i.timesWorn, 0) / allItems.length)
    : 0;

  // Best value — lowest CPW, exclude items never worn
  const wornItems = allItems.filter((i) => i.timesWorn > 0);
  const bestItem = wornItems.length > 0
    ? wornItems.reduce((best, item) => costPerWear(item) < costPerWear(best) ? item : best, wornItems[0])
    : null;

  const recent = allItems.slice(0, 6);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="screen-scroll flex-1 pb-6">
      {/* Greeting */}
      <div className="px-5 pt-5 pb-5">
        <p className="text-sm mb-1" style={{ color: "var(--mocha)", letterSpacing: "0.01em" }}>
          {greeting},
        </p>
        <h1 className="display-italic text-4xl font-bold leading-tight"
          style={{ color: "var(--espresso)", letterSpacing: "-0.02em" }}>
          <span className="shimmer-name">Guest</span> ✨
        </h1>
      </div>

      {/* Iridescent summary card */}
      <div className="mx-5 mb-5 p-5 shimmer-card holo-shimmer relative overflow-hidden"
        style={{ ...glowCard, borderRadius: 20 }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140,
          borderRadius: "50%", background: "rgba(255,255,255,0.28)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -30, width: 100, height: 100,
          borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />

        <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 relative z-10"
          style={{ color: "var(--mocha)" }}>Closet Overview</p>
        <div className="grid grid-cols-3 gap-2 relative z-10">
          {[
            { val: allItems.length.toString(), label: "Items" },
            { val: `$${avg}`, label: "Avg/wear" },
            { val: avgWearsVal.toString(), label: "Avg Wears" },
          ].map(({ val, label }) => (
            <div key={label}>
              <p className="display-italic font-bold leading-none"
                style={{ fontSize: "1.8rem", color: "var(--espresso)", letterSpacing: "-0.03em" }}>
                {val}
              </p>
              <p className="text-[10px] mt-1" style={{ color: "var(--mocha)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best value — dynamic, excludes 0-wear items */}
      {bestItem && (
        <div className="mx-5 mb-5 rounded-2xl overflow-hidden card-lift"
          style={{ ...glass, border: "1px solid rgba(200,164,232,0.28)",
            boxShadow: "0 4px 24px rgba(168,57,79,0.07), 0 0 0 1px rgba(200,164,232,0.15)" }}>
          <div className="flex items-center gap-2.5 px-4 pt-3 pb-1">
            <span className="text-base">✨</span>
            <p className="text-xs font-semibold" style={{ color: "var(--espresso)" }}>
              Best Value This Month
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 pb-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 p-1.5"
              style={{ background: `${bestItem.color}20` }}>
              <ClothingIllustration itemName={bestItem.name} color={bestItem.color} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: "var(--espresso)" }}>{bestItem.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                {bestItem.brand} · {bestItem.timesWorn}× worn
              </p>
            </div>
            <div className="text-right">
              <p className="display-italic text-base font-bold" style={{ color: "var(--rose)" }}>
                ${costPerWear(bestItem)}
              </p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>per wear</p>
            </div>
          </div>
        </div>
      )}

      {/* Recently Worn */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="display text-base font-semibold"
            style={{ color: "var(--espresso)", letterSpacing: "-0.01em" }}>
            Recently Worn
          </h2>
          <span className="text-xs font-medium" style={{ color: "var(--accent2)" }}>See all</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recent.map((item) => {
            const cpw = costPerWear(item);
            return (
              <button key={item.id} onClick={() => onItemClick(item.id)}
                className="rounded-2xl overflow-hidden text-left card-lift"
                style={{ ...glass }}>
                <div className="w-full h-36 flex items-center justify-center p-5 relative"
                  style={{ background: `linear-gradient(145deg, ${item.color}22, ${item.color}0A)` }}>
                  <ClothingIllustration itemName={item.name} color={item.color} />
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[11px] font-semibold truncate" style={{ color: "var(--espresso)" }}>
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>{item.brand}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full"
                      style={irisBadge}>
                      ${cpw}/wear
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="mx-5 mt-4 rounded-2xl p-4" style={glass}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm"
            style={{ background: "rgba(200,164,232,0.18)" }}>💡</div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--espresso)" }}>StyleDebt tip</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--mocha)" }}>
              Your most-worn item costs less per wear than your morning coffee. Keep going!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
