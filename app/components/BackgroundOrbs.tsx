export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Lavender orb — left side, top (z-index 0, fixed behind all content) */}
      <div style={{
        position: "absolute",
        top: "-60px", left: "-80px",
        width: 350, height: 350,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,164,232,0.3) 0%, transparent 70%)",
        filter: "blur(90px)",
        animation: "orb-drift-1 28s ease infinite",
        zIndex: 0,
      }} />

      {/* Blush pink orb — right side, middle */}
      <div style={{
        position: "absolute",
        top: "30%", right: "-90px",
        width: 350, height: 350,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(240,184,204,0.3) 0%, transparent 70%)",
        filter: "blur(90px)",
        animation: "orb-drift-2 34s ease infinite",
        zIndex: 0,
      }} />

      {/* Warm peach orb — left side, bottom */}
      <div style={{
        position: "absolute",
        bottom: "15%", left: "-70px",
        width: 350, height: 350,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,208,184,0.3) 0%, transparent 70%)",
        filter: "blur(90px)",
        animation: "orb-drift-3 22s ease infinite",
        zIndex: 0,
      }} />

      {/* Grain texture overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.038,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />
    </div>
  );
}
