"use client";

import { useState, useEffect } from "react";
import type { ClothingItem } from "./data/closet";
import { closetItems } from "./data/closet";
import StatusBar from "./components/StatusBar";
import BottomNav from "./components/BottomNav";
import BackgroundOrbs from "./components/BackgroundOrbs";
import HomeScreen from "./screens/HomeScreen";
import ClosetScreen from "./screens/ClosetScreen";
import OutfitScreen from "./screens/OutfitScreen";
import ShopScreen from "./screens/ShopScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";
import ReceiptFlow from "./components/ReceiptFlow";

type Screen = "home" | "closet" | "outfit" | "shop";

export default function StyleDebtApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<ClothingItem[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [wornCounts, setWornCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!toast) return;
    setToastVisible(true);
    const hide = setTimeout(() => setToastVisible(false), 2600);
    const clear = setTimeout(() => setToast(null), 3000);
    return () => { clearTimeout(hide); clearTimeout(clear); };
  }, [toast]);

  function handleItemsAdded(items: ClothingItem[]) {
    setAddedItems((prev) => [...prev, ...items]);
    setToast(`${items.length} item${items.length !== 1 ? "s" : ""} added to your closet ✨`);
    setActiveScreen("closet");
  }

  function handleLogWear(itemId: string) {
    const allItems = [...closetItems, ...addedItems];
    const item = allItems.find((i) => i.id === itemId);
    if (!item) return;
    const current = wornCounts[itemId] ?? item.timesWorn;
    const next = current + 1;
    setWornCounts((prev) => ({ ...prev, [itemId]: next }));
    const cpw = (item.price / next).toFixed(2);
    setToast(`Logged! New cost-per-wear: $${cpw}`);
  }

  const allItems = [...closetItems, ...addedItems];

  return (
    <div style={{ background: "#E8E0D8", minHeight: "100dvh", display: "flex",
      alignItems: "flex-start", justifyContent: "center" }}>
      <div className="app-shell">
        <BackgroundOrbs />

        <StatusBar />

        {/* Frosted header */}
        {!selectedItem && (
          <div className="px-5 py-2.5 flex items-center justify-between shrink-0"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(107,94,87,0.09)",
              position: "relative",
              zIndex: 10,
            }}>
            <span className="display-italic"
              style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#8B3A52" }}>
              StyleDebt
            </span>
            <div style={{
              background: "linear-gradient(#FAF8F5, #FAF8F5) padding-box, linear-gradient(135deg, #C8A4E8, #F0B8CC, #FFD0B8, #A8C8F0) border-box",
              border: "2px solid transparent",
              borderRadius: "50%",
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#8B3A52",
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontStyle: "italic",
            }}>L</div>
          </div>
        )}

        {/* Screen content */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
          {selectedItem ? (
            <ItemDetailScreen
              itemId={selectedItem}
              addedItems={addedItems}
              wornCounts={wornCounts}
              onLogWear={handleLogWear}
              onBack={() => setSelectedItem(null)}
            />
          ) : activeScreen === "home" ? (
            <HomeScreen
              onItemClick={(id) => setSelectedItem(id)}
              addedItems={addedItems}
              wornCounts={wornCounts}
            />
          ) : activeScreen === "closet" ? (
            <ClosetScreen
              onItemClick={(id) => setSelectedItem(id)}
              addedItems={addedItems}
              onOpenAddItem={() => setShowAddItem(true)}
            />
          ) : activeScreen === "outfit" ? (
            <OutfitScreen />
          ) : (
            <ShopScreen allItems={allItems} />
          )}

          {showAddItem && (
            <ReceiptFlow
              onClose={() => setShowAddItem(false)}
              onItemsAdded={handleItemsAdded}
            />
          )}
        </div>

        {!selectedItem && (
          <BottomNav active={activeScreen} onNav={(s) => setActiveScreen(s)} />
        )}

        {/* Toast */}
        {toast && (
          <div style={{
            position: "absolute",
            bottom: 88,
            left: 16, right: 16,
            zIndex: 200,
            padding: "13px 18px",
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(240,184,204,0.95), rgba(200,164,232,0.95))",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 28px rgba(200,164,232,0.35)",
            border: "1px solid rgba(255,255,255,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "opacity 0.4s ease",
            opacity: toastVisible ? 1 : 0,
          }}>
            <span style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 13,
              color: "#5A2A3A",
            }}>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
}
