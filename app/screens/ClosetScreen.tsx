"use client";

import { useState } from "react";
import { closetItems, costPerWear, Category, ClothingItem } from "../data/closet";
import { glass, irisBadge } from "../data/theme";
import ClothingIllustration from "../components/ClothingIllustration";

const filterKeys: ("All" | Category)[] = ["All", "Tops", "Bottoms", "Shoes", "Accessories"];

interface Props {
  onItemClick: (id: string) => void;
  addedItems: ClothingItem[];
  onOpenAddItem: () => void;
}

export default function ClosetScreen({ onItemClick, addedItems, onOpenAddItem }: Props) {
  const [active, setActive] = useState<"All" | Category>("All");
  const [query, setQuery] = useState("");
  const allItems = [...closetItems, ...addedItems];
  const categoryFiltered = active === "All" ? allItems : allItems.filter((i) => i.category === active);
  const filtered = query.trim()
    ? categoryFiltered.filter(
        (i) =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.brand.toLowerCase().includes(query.toLowerCase())
      )
    : categoryFiltered;
  const totalValue = Math.round(allItems.reduce((s, i) => s + i.price, 0) * 100) / 100;

  function pillLabel(f: "All" | Category): string {
    if (f === "All") return `All (${allItems.length})`;
    const count = allItems.filter((i) => i.category === f).length;
    return `${f} (${count})`;
  }

  return (
    <div className="screen-scroll flex-1 pb-6" style={{ position: "relative" }}>
      <div className="px-5 pt-5 pb-1">
        <h1 className="display-italic text-3xl font-bold tracking-tight"
          style={{ color: "var(--espresso)", letterSpacing: "-0.02em" }}>
          My Closet
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          {query.trim()
            ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`
            : active === "All"
              ? `${allItems.length} items · Total value $${totalValue}`
              : `${filtered.length} of ${allItems.length} items · ${active}`}
        </p>
      </div>

      {/* Search bar */}
      <div className="px-5 pb-2">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 2px 8px rgba(180,140,160,0.08)",
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="var(--muted)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or brand..."
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: "var(--espresso)" }}
          />
          {query && (
            <button onClick={() => setQuery("")}
              style={{ color: "var(--muted)", lineHeight: 1, padding: "0 2px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {filterKeys.map((f) => {
          const isActive = active === f;
          return (
            <button key={f} onClick={() => setActive(f)}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={isActive
                ? {
                    background: "linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow: "0 4px 14px rgba(200,164,232,0.35)",
                  }
                : {
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    color: "var(--mocha)",
                    boxShadow: "0 2px 8px rgba(180,140,160,0.08)",
                  }
              }>
              {pillLabel(f)}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pb-24">
        {filtered.map((item) => {
          const cpw = costPerWear(item);
          return (
            <button key={item.id} onClick={() => onItemClick(item.id)}
              className="rounded-2xl overflow-hidden text-left card-lift"
              style={glass}>
              <div className="w-full h-44 flex items-center justify-center p-5 relative"
                style={{ background: `linear-gradient(145deg, ${item.color}22, ${item.color}0A)` }}>
                <ClothingIllustration itemName={item.name} color={item.color} />
                <span className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full"
                  style={irisBadge}>${cpw}</span>
              </div>
              <div className="px-3 pt-2.5 pb-3">
                <p className="text-[11px] font-semibold truncate" style={{ color: "var(--espresso)" }}>
                  {item.name}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{item.brand}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(107,94,87,0.08)", color: "var(--mocha)" }}>
                    {item.category}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                    {item.timesWorn}× worn
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* FAB — Add Item */}
      <button
        onClick={onOpenAddItem}
        aria-label="Add item to closet"
        style={{
          position: "sticky",
          bottom: 20,
          left: "calc(100% - 72px)",
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8)",
          boxShadow: "0 6px 24px rgba(200,164,232,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20,
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(200,164,232,0.55)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(200,164,232,0.45)";
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
