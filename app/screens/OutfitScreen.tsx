"use client";

import { useState } from "react";
import { closetItems, savedOutfits } from "../data/closet";
import { glass, roseBtn } from "../data/theme";
import ClothingIllustration from "../components/ClothingIllustration";

export default function OutfitScreen() {
  const [board, setBoard] = useState<string[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [activeOutfit, setActiveOutfit] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  function addItem(id: string) { if (!board.includes(id)) setBoard((b) => [...b, id]); }
  function removeFromBoard(id: string) { setBoard((b) => b.filter((x) => x !== id)); }
  function clearBoard() { setBoard([]); setActiveOutfit(null); }
  function loadOutfit(id: string) {
    const o = savedOutfits.find((x) => x.id === id);
    if (o) { setBoard(o.items); setActiveOutfit(id); }
  }

  const boardItems = board.map((id) => closetItems.find((i) => i.id === id)).filter(Boolean);

  return (
    <div className="screen-scroll flex-1 pb-6">
      <div className="px-5 pt-5 pb-3">
        <h1 className="display-italic text-3xl font-bold"
          style={{ color: "var(--espresso)", letterSpacing: "-0.02em" }}>
          Outfit Builder
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Tap items to mix & match</p>
      </div>

      {/* Drop zone */}
      <div className="mx-5 mb-4">
        <div className="rounded-2xl p-4 min-h-36 flex flex-col transition-all"
          style={{
            ...glass,
            border: `2px dashed ${dragging ? "rgba(168,57,79,0.4)" : "rgba(107,94,87,0.15)"}`,
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); if (dragging) addItem(dragging); setDragging(null); }}>
          {board.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-4 gap-2">
              <span className="text-2xl">✨</span>
              <p className="text-xs text-center display-italic"
                style={{ color: "var(--muted)", fontStyle: "italic" }}>
                Tap items below to build a look
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap" style={{ gap: "4px" }}>
                {boardItems.map((item) => item && (
                  <div key={item.id} className="relative">
                    <div className="w-20 h-24 rounded-xl flex items-center justify-center p-2"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                      <ClothingIllustration itemName={item.name} color={item.color} />
                    </div>
                    <button onClick={() => removeFromBoard(item.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "var(--rose)", color: "#fff" }}>×</button>
                    <p className="text-[9px] text-center mt-1 truncate w-20" style={{ color: "var(--muted)" }}>
                      {item.name.split(" ")[0]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                  style={roseBtn}>Save Outfit</button>
                <button onClick={clearBoard} className="px-4 py-2.5 rounded-xl text-xs font-medium"
                  style={{ ...glass, color: "var(--mocha)", border: "1px solid rgba(107,94,87,0.12)" }}>
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Saved looks */}
      <div className="px-5 mb-4">
        <h2 className="display text-sm font-semibold mb-3" style={{ color: "var(--espresso)" }}>
          Saved Looks
        </h2>
        <div className="flex flex-col gap-2.5">
          {savedOutfits.map((outfit) => {
            const items = outfit.items.map((id) => closetItems.find((i) => i.id === id)).filter(Boolean);
            const isActive = activeOutfit === outfit.id;
            return (
              <button key={outfit.id} onClick={() => loadOutfit(outfit.id)}
                className="rounded-2xl overflow-hidden text-left transition-all"
                style={{
                  ...(isActive
                    ? { ...glass, border: "1.5px solid rgba(168,57,79,0.25)", boxShadow: "0 4px 20px rgba(168,57,79,0.10)" }
                    : glass),
                  position: "relative",
                  transform: "translateY(0)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Iridescent left border accent */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    borderRadius: "12px 0 0 12px",
                    background: "linear-gradient(to bottom, #C8A4E8, #E88AAE)",
                    opacity: isActive ? 1 : 0.55,
                  }} />

                  {/* Overlapping thumbnails */}
                  <div className="flex" style={{ marginLeft: "6px" }}>
                    {items.map((item, idx) => item && (
                      <div key={item.id}
                        className="w-12 h-14 rounded-lg flex items-center justify-center p-1 shrink-0"
                        style={{
                          background: `${item.color}20`,
                          marginLeft: idx > 0 ? -8 : 0,
                          zIndex: items.length - idx,
                          position: "relative",
                          border: `1px solid rgba(255,255,255,0.7)`,
                        }}>
                        <ClothingIllustration itemName={item.name} color={item.color} />
                      </div>
                    ))}
                  </div>

                  <div className="flex-1">
                    <p className="display-italic text-sm font-semibold" style={{ color: "var(--espresso)" }}>
                      {outfit.name}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{items.length} pieces</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="var(--mocha)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Item grid */}
      <div className="px-5">
        <h2 className="display text-sm font-semibold mb-3" style={{ color: "var(--espresso)" }}>
          Your Closet
        </h2>
        <div className="grid grid-cols-4 gap-1.5">
          {closetItems.map((item) => {
            const inBoard = board.includes(item.id);
            const isHovered = hoveredItem === item.id;
            return (
              <div key={item.id}
                draggable
                onDragStart={() => setDragging(item.id)}
                onDragEnd={() => setDragging(null)}
                onClick={() => !inBoard && addItem(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="cursor-pointer transition-all"
                style={{
                  opacity: inBoard ? 0.25 : 1,
                  borderRadius: 10,
                  background: isHovered && !inBoard ? "rgba(240,184,204,0.12)" : "transparent",
                  transition: "background 0.18s ease",
                  padding: 2,
                }}>
                <div className="w-full aspect-square rounded-xl flex items-center justify-center p-1.5"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}28` }}>
                  <ClothingIllustration itemName={item.name} color={item.color} />
                </div>
                <p className="text-[11px] text-center mt-1 truncate" style={{ color: "var(--muted)" }}>
                  {item.name.split(" ")[0]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
