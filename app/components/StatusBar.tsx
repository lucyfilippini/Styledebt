"use client";

export default function StatusBar() {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold"
      style={{ color: "#1A1108", zIndex: 2, position: "relative" }}>
      <span>{time}</span>
      <div className="flex items-center gap-1.5" style={{ color: "#1A1108" }}>
        {/* Signal */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="5" width="3" height="7" rx="0.5" opacity="0.35"/>
          <rect x="4" y="3" width="3" height="9" rx="0.5" opacity="0.55"/>
          <rect x="8" y="1" width="3" height="11" rx="0.5" opacity="0.75"/>
          <rect x="12" y="0" width="3" height="12" rx="0.5"/>
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 12" fill="currentColor">
          <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" opacity="0.35"/>
          <path d="M7.5 5C9 5 10.4 5.6 11.4 6.7L12.7 5.4C11.3 3.9 9.5 3 7.5 3C5.5 3 3.7 3.9 2.3 5.4L3.6 6.7C4.6 5.6 6 5 7.5 5Z" opacity="0.65"/>
          <path d="M7.5 7.5C8.4 7.5 9.2 7.9 9.7 8.5L7.5 11L5.3 8.5C5.8 7.9 6.6 7.5 7.5 7.5Z"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center" style={{ color: "#1A1108" }}>
          <div className="w-6 h-3 rounded-sm relative flex items-center"
            style={{ border: "1.5px solid #1A1108", padding: "1.5px" }}>
            <div className="h-full rounded-sm" style={{ width: "72%", background: "#1A1108" }}/>
          </div>
          <div className="w-0.5 h-1.5 rounded-r ml-px" style={{ background: "#1A1108", opacity: 0.5 }}/>
        </div>
      </div>
    </div>
  );
}
