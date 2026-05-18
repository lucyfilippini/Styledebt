"use client";

import { useState } from "react";
import { shopRecs, closetItems, costPerWear, ClothingItem, ShopRec, Category } from "../data/closet";
import { glass, irisBadge } from "../data/theme";
import ClothingIllustration from "../components/ClothingIllustration";

const irisBtn = {
  background: "linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8)",
  backgroundSize: "200% 200%",
  boxShadow: "0 6px 20px rgba(200,164,232,0.35)",
  color: "#fff",
  fontWeight: 600,
} as const;

const claudeBadge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontSize: 9,
  fontWeight: 600,
  padding: "3px 8px",
  borderRadius: 20,
  background: "rgba(200,164,232,0.22)",
  border: "1px solid rgba(200,164,232,0.38)",
  color: "#8B5A9A",
  letterSpacing: "0.02em",
};

function buildDynamicReason(rec: ShopRec, allItems: ClothingItem[]): string {
  const name = rec.name.toLowerCase();

  // Category counts
  const counts: Record<Category, number> = { Tops: 0, Bottoms: 0, Shoes: 0, Accessories: 0 };
  allItems.forEach((i) => { counts[i.category]++; });

  // Most worn category by total timesWorn
  const wearsByCat: Record<Category, number> = { Tops: 0, Bottoms: 0, Shoes: 0, Accessories: 0 };
  allItems.forEach((i) => { wearsByCat[i.category] += i.timesWorn; });
  const mostWornCat = (Object.entries(wearsByCat) as [Category, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  // Least represented category
  const leastRepCat = (Object.entries(counts) as [Category, number][])
    .sort((a, b) => a[1] - b[1])[0][0];

  // Outerwear / coat
  if (name.includes("trench") || name.includes("coat") || name.includes("jacket")) {
    const hasOuterwear = allItems.some((i) =>
      i.name.toLowerCase().includes("coat") ||
      i.name.toLowerCase().includes("trench") ||
      i.name.toLowerCase().includes("parka")
    );
    if (!hasOuterwear) {
      return `No outerwear in your closet — pairs with ${allItems.length - 1} of your items`;
    }
    return `Your ${mostWornCat} get the most use — a layer like this extends every outfit`;
  }

  // Dress / slip
  if (name.includes("dress") || name.includes("slip")) {
    const dress = allItems.find((i) =>
      i.name.toLowerCase().includes("dress") || i.name.toLowerCase().includes("slip")
    );
    if (!dress) {
      return `Zero dresses in your rotation — high cost-per-wear potential at 20 wears`;
    }
    return `Your ${dress.name} has been worn ${dress.timesWorn}× — time for a second option`;
  }

  // Shoes
  if (name.includes("flat") || name.includes("ballet") || name.includes("sandal")) {
    const shoes = allItems.filter((i) => i.category === "Shoes");
    const mostWornShoe = shoes.sort((a, b) => b.timesWorn - a.timesWorn)[0];
    if (mostWornShoe) {
      return `Your ${mostWornShoe.name} have ${mostWornShoe.timesWorn} wears — these fill a different mood`;
    }
    return `Only ${shoes.length} shoe option${shoes.length !== 1 ? "s" : ""} in your closet — this adds variety`;
  }

  // Accessories
  if (name.includes("earring") || name.includes("hoop") || name.includes("belt") || name.includes("necklace")) {
    const bestItem = allItems
      .filter((i) => i.timesWorn > 0)
      .sort((a, b) => costPerWear(a) - costPerWear(b))[0];
    if (bestItem) {
      return `Your best value is ${bestItem.name} at $${costPerWear(bestItem)}/wear — accessories stack that`;
    }
    return `Accessories drive your cost-per-wear down faster than any other category`;
  }

  // Generic fallback using real data
  return `Your most-worn category is ${mostWornCat} — this fills a gap in ${leastRepCat}`;
}

interface Props {
  allItems: ClothingItem[];
}

export default function ShopScreen({ allItems }: Props) {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleSave(id: string) {
    setSaved((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleExpand(id: string) {
    setExpanded((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="screen-scroll flex-1 pb-6">
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="display-italic text-3xl font-bold"
            style={{ color: "var(--espresso)", letterSpacing: "-0.02em" }}>
            Shop Smarter
          </h1>
          <span style={claudeBadge}>✦ Powered by Claude AI</span>
        </div>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
          Picks based on gaps in your closet
        </p>
      </div>

      {/* AI banner */}
      <div className="mx-5 my-3 rounded-2xl px-4 py-3 flex items-center gap-3" style={glass}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
          style={{ background: "rgba(200,164,232,0.2)" }}>✨</div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--mocha)" }}>
          You wear basics 70% of the time. These picks would each hit 20+ wears.
        </p>
      </div>

      {/* Recs */}
      <div className="px-5 flex flex-col gap-4 mt-1">
        {shopRecs.map((rec) => {
          const isSaved = saved.has(rec.id);
          const isExpanded = expanded.has(rec.id);
          const estCpw = (rec.price / 20).toFixed(2);
          const dynamicReason = buildDynamicReason(rec, allItems);

          return (
            <div key={rec.id} className="rounded-2xl overflow-hidden card-lift" style={glass}>
              {/* Illustration */}
              <div className="relative h-36 w-full flex items-center justify-center"
                style={{ background: `linear-gradient(145deg, ${rec.color}28, ${rec.color}0A)` }}>
                <div className="w-2/5 h-4/5 flex items-center justify-center">
                  <ClothingIllustration itemName={rec.name} color={rec.color} />
                </div>

                {/* Save heart */}
                <button onClick={() => toggleSave(rec.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: isSaved
                      ? "linear-gradient(135deg, #C8A4E8, #F0B8CC)"
                      : "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 2px 12px rgba(107,94,87,0.12)",
                  }}>
                  <svg width="15" height="15" viewBox="0 0 24 24"
                    fill={isSaved ? "#fff" : "none"}
                    stroke={isSaved ? "#fff" : "var(--rose)"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>

                {/* Price tag */}
                <div className="absolute bottom-3 left-3 rounded-xl px-3 py-1.5"
                  style={{ ...glass, border: "1px solid rgba(255,255,255,0.75)" }}>
                  <p className="display-italic text-sm font-bold" style={{ color: "var(--espresso)" }}>
                    ${rec.price}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 pt-3 pb-4">
                <p className="display text-sm font-semibold mb-2" style={{ color: "var(--espresso)" }}>
                  {rec.name}
                </p>

                {/* Dynamic sparkle tip */}
                <div className="flex items-start gap-2 rounded-xl p-2.5 mb-2"
                  style={{ background: "rgba(200,164,232,0.1)", border: "1px solid rgba(200,164,232,0.18)" }}>
                  <span className="text-xs">✨</span>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--mocha)" }}>
                    {dynamicReason}
                  </p>
                </div>

                {/* CPW badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={irisBadge}>
                    <span>📊</span>
                    Est. ${estCpw}/wear at 20 wears
                  </span>
                </div>

                {/* Why we picked this — expandable */}
                <div className="mb-3 rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(107,94,87,0.1)" }}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left"
                    style={{ background: "rgba(255,255,255,0.4)" }}
                    onClick={() => toggleExpand(rec.id)}>
                    <span className="text-[11px] font-medium" style={{ color: "var(--mocha)" }}>
                      Why we picked this
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="var(--muted)" strokeWidth="2.2" strokeLinecap="round"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.22s ease",
                        flexShrink: 0,
                      }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: isExpanded ? 120 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.28s ease",
                  }}>
                    <p className="text-[11px] leading-relaxed px-3 py-2.5"
                      style={{ color: "var(--mocha)", background: "rgba(255,255,255,0.25)" }}>
                      {dynamicReason} Based on your wear patterns, items like this typically
                      reach peak value around 20+ wears — well within your average for similar pieces.
                    </p>
                  </div>
                </div>

                {/* CTA row */}
                <div className="flex gap-2">
                  <button className="flex-1 py-3 rounded-xl text-xs font-semibold"
                    style={irisBtn}>
                    Shop Now
                  </button>
                  <button
                    className="px-4 py-3 rounded-xl text-xs font-medium"
                    style={{ ...glass, color: "var(--mocha)", border: "1px solid rgba(107,94,87,0.12)" }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[10px] mt-6 px-8" style={{ color: "var(--muted)" }}>
        StyleDebt doesn&apos;t earn commission. Picks are based purely on your data.
      </p>
    </div>
  );
}
