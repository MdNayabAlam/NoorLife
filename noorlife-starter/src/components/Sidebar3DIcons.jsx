import React from "react";

// 1. Dashboard — 3D Glossy App Grid Cubes
export function Icon3DDashboard({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="d3_cube_green1" x1="2" y1="2" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="d3_cube_gold" x1="14" y1="2" x2="22" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="d3_cube_teal" x1="2" y1="14" x2="10" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#134e48" />
        </linearGradient>
        <linearGradient id="d3_cube_emerald" x1="14" y1="14" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="40%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <filter id="d3_shadow" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#042316" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Top-Left Green Cube */}
      <rect x="2.5" y="2.5" width="8" height="8" rx="2.5" fill="url(#d3_cube_green1)" filter="url(#d3_shadow)" />
      <path d="M3.5 3.5 L9.5 3.5 C9.5 5 8 5 3.5 4.5 Z" fill="#ffffff" opacity="0.5" />
      <circle cx="6.5" cy="6.5" r="1.3" fill="#ffffff" opacity="0.8" />

      {/* Top-Right Gold Cube */}
      <rect x="13.5" y="2.5" width="8" height="8" rx="2.5" fill="url(#d3_cube_gold)" filter="url(#d3_shadow)" />
      <path d="M14.5 3.5 L20.5 3.5 C20.5 5 19 5 14.5 4.5 Z" fill="#ffffff" opacity="0.65" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="#ffffff" opacity="0.9" />

      {/* Bottom-Left Teal Cube */}
      <rect x="2.5" y="13.5" width="8" height="8" rx="2.5" fill="url(#d3_cube_teal)" filter="url(#d3_shadow)" />
      <path d="M3.5 14.5 L9.5 14.5 C9.5 16 8 16 3.5 15.5 Z" fill="#ffffff" opacity="0.45" />
      <circle cx="6.5" cy="17.5" r="1.3" fill="#ffffff" opacity="0.8" />

      {/* Bottom-Right Emerald Cube */}
      <rect x="13.5" y="13.5" width="8" height="8" rx="2.5" fill="url(#d3_cube_emerald)" filter="url(#d3_shadow)" />
      <path d="M14.5 14.5 L20.5 14.5 C20.5 16 19 16 14.5 15.5 Z" fill="#ffffff" opacity="0.5" />
      <circle cx="17.5" cy="17.5" r="1.3" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

// 2. Home Tasks — 3D Clipboard with Golden Floating Checkmark
export function Icon3DHomeTasks({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ht_board" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="45%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
        <linearGradient id="ht_clip" x1="8" y1="1" x2="16" y2="5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="ht_check" x1="6" y1="8" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* 3D Board Base with bevel */}
      <rect x="3.5" y="4" width="17" height="18" rx="3.5" fill="#042f2e" />
      <rect x="3.5" y="3.5" width="17" height="18" rx="3.5" fill="url(#ht_board)" />
      <path d="M4.5 4.5 L19.5 4.5 C19.5 6 17 6 4.5 5 Z" fill="#ffffff" opacity="0.4" />

      {/* Task lines */}
      <line x1="7" y1="10" x2="17" y2="10" stroke="#ccfbf1" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <line x1="7" y1="14" x2="14" y2="14" stroke="#ccfbf1" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <line x1="7" y1="18" x2="16" y2="18" stroke="#ccfbf1" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />

      {/* 3D Metallic Top Clip */}
      <rect x="8" y="1" width="8" height="4.5" rx="1.5" fill="url(#ht_clip)" />
      <rect x="10" y="2" width="4" height="2" rx="0.5" fill="#fef9c3" opacity="0.8" />

      {/* 3D Bold Floating Checkmark Badge */}
      <circle cx="16.5" cy="16.5" r="5" fill="#052e16" />
      <circle cx="16.5" cy="16" r="4.8" fill="url(#ht_check)" />
      <path d="M14 16 L15.8 17.8 L19 14.2" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 3. Grocery & Meals — 3D Coral/Orange Shopping Cart with Fresh Produce
export function Icon3DGroceryMeals({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="gm_cart" x1="2" y1="4" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="gm_apple" x1="9" y1="3" x2="15" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="gm_gold" x1="3" y1="19" x2="19" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      {/* Fresh Produce: Apple & Leaf peeking out */}
      <circle cx="10" cy="7.5" r="3.2" fill="url(#gm_apple)" />
      <ellipse cx="9" cy="6.5" rx="1.2" ry="0.6" fill="#fecaca" opacity="0.7" />
      <path d="M10 4.5 C10 3.5 12 3.5 12 4.5" stroke="#15803d" strokeWidth="1.2" strokeLinecap="round" />

      {/* Baguette/Carrot */}
      <path d="M13 8.5 L17 4 C17.5 3.5 18.5 4.5 18 5 L14.5 9 Z" fill="#eab308" />

      {/* 3D Cart Basket Base */}
      <path
        d="M2 3 L4.5 3 L7.5 14 L18 14 C19 14 19.8 13.2 20 12.2 L21.5 6 L6 6"
        stroke="#9a3412"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2.5 L4.5 2.5 L7.5 13.5 L18 13.5 C19 13.5 19.8 12.7 20 11.7 L21.5 5.5 L6 5.5"
        stroke="url(#gm_cart)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3D Shiny Wheels */}
      <circle cx="8.5" cy="18.5" r="2.4" fill="#431407" />
      <circle cx="8.5" cy="18" r="2.2" fill="url(#gm_gold)" />
      <circle cx="8.5" cy="18" r="0.8" fill="#ffffff" />

      <circle cx="16.5" cy="18.5" r="2.4" fill="#431407" />
      <circle cx="16.5" cy="18" r="2.2" fill="url(#gm_gold)" />
      <circle cx="16.5" cy="18" r="0.8" fill="#ffffff" />
    </svg>
  );
}

// 4. GK Quiz — 3D Glowing Purple Knowledge Bulb & Sparks
export function Icon3DGKQuiz({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="gkq_glow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="35%" stopColor="#c084fc" />
          <stop offset="70%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#581c87" />
        </radialGradient>
        <linearGradient id="gkq_base" x1="8" y1="16" x2="16" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>

      {/* 3D Glowing Bulb Head */}
      <circle cx="12" cy="10" r="7.5" fill="#3b0764" />
      <circle cx="12" cy="9.5" r="7.2" fill="url(#gkq_glow)" />
      <ellipse cx="9.5" cy="6.8" rx="2.2" ry="1.2" fill="#ffffff" opacity="0.65" transform="rotate(-25 9.5 6.8)" />

      {/* Question mark inside bulb */}
      <path
        d="M10.5 7.5 C10.5 6.2 11.2 5.5 12 5.5 C12.8 5.5 13.5 6.2 13.5 7 C13.5 8 12.2 8.5 12.2 9.5"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12.2" cy="11.5" r="0.7" fill="#ffffff" />

      {/* 3D Metallic Screw Base */}
      <path d="M8.5 16 L15.5 16 L14.5 19 L9.5 19 Z" fill="url(#gkq_base)" />
      <line x1="8.5" y1="17.2" x2="15.5" y2="17.2" stroke="#713f12" strokeWidth="0.8" />
      <line x1="9" y1="18.5" x2="15" y2="18.5" stroke="#713f12" strokeWidth="0.8" />
      <rect x="10.5" y="19" width="3" height="1.8" rx="0.9" fill="#713f12" />

      {/* Magic Sparkle Star */}
      <path d="M19 4 L19.8 6 L22 6.8 L19.8 7.6 L19 9.8 L18.2 7.6 L16 6.8 L18.2 6 Z" fill="#fef08a" />
    </svg>
  );
}

// 5. Namaz Guide — 3D Azure Blue Prayer Book & Golden Arch Relief
export function Icon3DNamazGuide({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ng_cover" x1="3" y1="2" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="ng_gold" x1="7" y1="6" x2="17" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>

      {/* 3D Open Book / Prayer Tablet */}
      <path d="M3 5 C3 3.5 5 3.5 12 5 C19 3.5 21 3.5 21 5 L21 19 C21 18 19 18 12 19.5 C5 18 3 18 3 19 Z" fill="#082f49" />
      <path d="M3 4 C3 2.5 5 2.5 12 4 C19 2.5 21 2.5 21 4 L21 18 C21 17 19 17 12 18.5 C5 17 3 17 3 18 Z" fill="url(#ng_cover)" />

      {/* Gilded Page Edges */}
      <path d="M4 17.5 C6 16.5 10 16.5 12 18 C14 16.5 18 16.5 20 17.5" stroke="#fef08a" strokeWidth="1.2" />

      {/* Golden Moorish Arch Relief */}
      <path d="M8 15 L8 9 C8 7 9.8 6 12 6 C14.2 6 16 7 16 9 L16 15" stroke="url(#ng_gold)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="7.2" r="0.9" fill="#fef08a" />

      {/* Center Spine Crease */}
      <line x1="12" y1="4" x2="12" y2="18.5" stroke="#075985" strokeWidth="1.5" />
    </svg>
  );
}

// 6. Prayer Times — 3D Golden Pocket Astrolabe / Clock
export function Icon3DPrayerTimes({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="pt_casing" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#eab308" />
          <stop offset="70%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <linearGradient id="pt_dial" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>

      {/* Top loop ring */}
      <circle cx="12" cy="3" r="2.2" stroke="url(#pt_casing)" strokeWidth="1.5" fill="none" />

      {/* 3D Gold Casing */}
      <circle cx="12" cy="13.5" r="9" fill="#451a03" />
      <circle cx="12" cy="13" r="8.8" fill="url(#pt_casing)" />

      {/* Dial Face */}
      <circle cx="12" cy="13" r="6.6" fill="url(#pt_dial)" />

      {/* Hour Markers */}
      <circle cx="12" cy="8" r="0.7" fill="#78350f" />
      <circle cx="17" cy="13" r="0.7" fill="#78350f" />
      <circle cx="12" cy="18" r="0.7" fill="#78350f" />
      <circle cx="7" cy="13" r="0.7" fill="#78350f" />

      {/* Emerald Clock Hands */}
      <line x1="12" y1="13" x2="12" y2="9.5" stroke="#065f46" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="13" x2="15" y2="13" stroke="#065f46" strokeWidth="1.4" strokeLinecap="round" />

      {/* 3D Center Ruby/Gold Pivot */}
      <circle cx="12" cy="13" r="1.3" fill="#047857" />
      <circle cx="11.6" cy="12.6" r="0.5" fill="#bbf7d0" />
    </svg>
  );
}

// 7. Daily Deen — 3D Radiant Golden Crescent Moon & Star
export function Icon3DDailyDeen({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="dd_moon" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id="dd_star" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>

      {/* 3D Crescent Moon Shadow */}
      <path
        d="M17.5 3 C12 3 7.5 7.5 7.5 13 C7.5 18.5 12 23 17.5 23 C19.5 23 21 22.2 22 21.5 C16 20.5 11.5 16 11.5 10.5 C11.5 6.5 13.5 4 17.5 3 Z"
        fill="#451a03"
        transform="translate(0, 0.8)"
      />

      {/* 3D Crescent Moon */}
      <path
        d="M17.5 2.5 C12 2.5 7.5 7 7.5 12.5 C7.5 18 12 22.5 17.5 22.5 C19.5 22.5 21 21.7 22 21 C16 20 11.5 15.5 11.5 10 C11.5 6 13.5 3.5 17.5 2.5 Z"
        fill="url(#dd_moon)"
      />

      {/* Specular Rim Glow */}
      <path
        d="M9.5 8 C8.2 10.5 8.2 14.5 9.8 17.5 C8.8 15 8.8 10.5 9.5 8 Z"
        fill="#ffffff"
        opacity="0.65"
      />

      {/* 3D Golden 5-Pointed Star */}
      <path
        d="M18 7 L18.8 9 L21 9.3 L19.4 10.8 L19.8 13 L18 12 L16.2 13 L16.6 10.8 L15 9.3 L17.2 9 Z"
        fill="url(#dd_star)"
      />
    </svg>
  );
}

// 8A. Quran Reader (Juz 30) — 3D Open Holy Quran on Golden Rehal Stand
export function Icon3DQuranReader({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="qr_cover" x1="2" y1="5" x2="22" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="qr_page_l" x1="2" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#ede5d7" />
        </linearGradient>
        <linearGradient id="qr_page_r" x1="22" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ede5d7" />
        </linearGradient>
        <linearGradient id="qr_gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
        <linearGradient id="qr_rehal" x1="4" y1="16" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>

      {/* 3D Crossed Wooden Rehal Stand */}
      <path d="M4 17.5 L12 14.5 L20 17.5 L18 21.5 L12 18 L6 21.5 Z" fill="url(#qr_rehal)" />
      <path d="M8 20.5 L12 17.5 L16 20.5" stroke="#fef08a" strokeWidth="0.6" fill="none" opacity="0.6" />

      {/* Emerald Outer Book Covers Backing */}
      <path d="M1.5 6 C2.5 4.5 7 4.2 12 5.8 C17 4.2 21.5 4.5 22.5 6 L22.5 17.5 C21.5 16 17 15.5 12 17.2 C7 15.5 2.5 16 1.5 17.5 Z" fill="url(#qr_cover)" />

      {/* Left Open Page (Creamy 3D curve) */}
      <path d="M2 6.5 C3 5 7.5 4.8 12 6.5 L12 17 C7.5 15.5 3 15.8 2 17 Z" fill="url(#qr_page_l)" />
      {/* Right Open Page (Lighter 3D curve) */}
      <path d="M22 6.5 C21 5 16.5 4.8 12 6.5 L12 17 C16.5 15.5 21 15.8 22 17 Z" fill="url(#qr_page_r)" />

      {/* Quranic Text Lines Left Page */}
      <line x1="3.8" y1="8.5" x2="10.2" y2="8.8" stroke="#ca8a04" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
      <line x1="4" y1="11" x2="10" y2="11.2" stroke="#065f46" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      <line x1="4.2" y1="13.5" x2="9.8" y2="13.6" stroke="#ca8a04" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />

      {/* Quranic Text Lines Right Page */}
      <line x1="13.8" y1="8.8" x2="20.2" y2="8.5" stroke="#ca8a04" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
      <line x1="14" y1="11.2" x2="20" y2="11" stroke="#065f46" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      <line x1="14.2" y1="13.6" x2="19.8" y2="13.5" stroke="#ca8a04" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />

      {/* Center Spine Crease & Gold Bookmark Ribbon */}
      <line x1="12" y1="5.5" x2="12" y2="17.5" stroke="#78350f" strokeWidth="1" />
      <path d="M12 6 L12 19 L11 21 L12 20 L13 21 L12 19" fill="url(#qr_gold)" stroke="#b45309" strokeWidth="0.4" />
    </svg>
  );
}

// 8B. Quran Tracker — 3D Emerald Holy Quran with Progress Bookmark & Gold Check Ring
export function Icon3DQuranTracker({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="qt_leather" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="45%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <radialGradient id="qt_gold" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </radialGradient>
      </defs>

      {/* 3D Book Block Shadow */}
      <rect x="4.5" y="3.5" width="15" height="18.5" rx="2.5" fill="#022c22" />

      {/* Gold Gilded Page Edge Right */}
      <rect x="18" y="4.5" width="2" height="16.5" rx="0.5" fill="#fef08a" />
      <line x1="18.5" y1="6" x2="18.5" y2="20" stroke="#ca8a04" strokeWidth="0.5" />

      {/* Front Leather Cover */}
      <rect x="3.5" y="2.5" width="15" height="19" rx="2.5" fill="url(#qt_leather)" />
      <path d="M4.5 3.5 L17.5 3.5 C17.5 5 15 5 4.5 4.5 Z" fill="#ffffff" opacity="0.35" />

      {/* Top Gold Ribbon Bookmark peeking out */}
      <path d="M10 1.5 L13 1.5 L13 4 L11.5 3 L10 4 Z" fill="url(#qt_gold)" />

      {/* Spine Ridges */}
      <line x1="6.5" y1="2.5" x2="6.5" y2="21.5" stroke="#064e3b" strokeWidth="1.2" />
      <line x1="7.2" y1="2.5" x2="7.2" y2="21.5" stroke="#fef08a" strokeWidth="0.8" opacity="0.6" />

      {/* 3D Center Progress Ring with Mini Checkmark */}
      <circle cx="12" cy="12" r="4.2" fill="url(#qt_gold)" />
      <circle cx="12" cy="12" r="3.2" fill="#064e3b" />
      <path d="M10.2 12 L11.4 13.2 L13.8 10.6" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 9. Family Calendar — 3D Desk Calendar with Red Header & Golden Pin
export function Icon3DFamilyCalendar({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="fc_red" x1="3" y1="3" x2="21" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="fc_gold" x1="12" y1="12" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      {/* 3D Page Shadow */}
      <rect x="3.5" y="4.5" width="17" height="17" rx="3.5" fill="#450a0a" />

      {/* Calendar White Page Body */}
      <rect x="3.5" y="4" width="17" height="17" rx="3.5" fill="#ffffff" />

      {/* 3D Red Header */}
      <path d="M3.5 7.5 C3.5 5.5 5 4 7 4 L17 4 C19 4 20.5 5.5 20.5 7.5 L20.5 9.5 L3.5 9.5 Z" fill="url(#fc_red)" />
      <path d="M4.5 5 L19.5 5 C19.5 6 17 6 4.5 5.5 Z" fill="#ffffff" opacity="0.45" />

      {/* Metallic Binder Rings */}
      <rect x="7" y="2" width="2" height="4" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
      <rect x="15" y="2" width="2" height="4" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />

      {/* Date Grid dots */}
      <circle cx="7.5" cy="12.5" r="1.1" fill="#cbd5e1" />
      <circle cx="12" cy="12.5" r="1.1" fill="#cbd5e1" />
      <circle cx="16.5" cy="12.5" r="1.1" fill="#cbd5e1" />
      <circle cx="7.5" cy="16.5" r="1.1" fill="#cbd5e1" />

      {/* 3D Golden Star Pin on Active Date */}
      <circle cx="12" cy="16.5" r="2.2" fill="url(#fc_gold)" />
      <circle cx="11.8" cy="16.2" r="0.7" fill="#ffffff" />
    </svg>
  );
}

// 10. Budget Manager — 3D Leather Wallet with Shiny Gold Coins
export function Icon3DBudgetManager({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bm_leather" x1="3" y1="5" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="50%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <radialGradient id="bm_coin" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
      </defs>

      {/* Gold Coin 1 Peeking */}
      <circle cx="9" cy="6" r="3.2" fill="url(#bm_coin)" />
      <circle cx="9" cy="6" r="2.2" stroke="#713f12" strokeWidth="0.6" fill="none" />

      {/* Gold Coin 2 Peeking */}
      <circle cx="14.5" cy="5.5" r="3.6" fill="url(#bm_coin)" />
      <text x="14.5" y="7" fontSize="3.5" fontWeight="800" textAnchor="middle" fill="#713f12">₹</text>

      {/* 3D Leather Wallet Base Shadow */}
      <rect x="2.5" y="8.5" width="19" height="13" rx="3.5" fill="#291102" />

      {/* Wallet Body */}
      <rect x="2.5" y="8" width="19" height="13" rx="3.5" fill="url(#bm_leather)" />
      <path d="M3.5 9 L20.5 9 C20.5 10 18 10 3.5 9.5 Z" fill="#ffffff" opacity="0.3" />

      {/* Wallet Flap with Stitching */}
      <path d="M14 11.5 L21.5 11.5 L21.5 17.5 L14 17.5 C12.5 17.5 12.5 11.5 14 11.5 Z" fill="#78350f" />
      <circle cx="15" cy="14.5" r="1.5" fill="url(#bm_coin)" />
      <circle cx="15" cy="14.5" r="0.6" fill="#ffffff" />
    </svg>
  );
}

// 11. Rewards & Streaks — 3D Fiery Flame & Golden Medal
export function Icon3DRewardsStreaks({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="rs_fire_outer" cx="45%" cy="65%" r="65%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="45%" stopColor="#f97316" />
          <stop offset="80%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
        <radialGradient id="rs_fire_inner" cx="45%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fef08a" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>
      </defs>

      {/* 3D Outer Flame */}
      <path
        d="M12 2 C12 2 15.5 6 15.5 9 C15.5 10.2 14.8 11.2 14 12 C16 11 18.5 12.5 18.5 15.5 C18.5 19 15.5 22 12 22 C8.5 22 5.5 19 5.5 15.5 C5.5 12 8 8 12 2 Z"
        fill="url(#rs_fire_outer)"
      />

      {/* 3D Inner Glowing Core */}
      <path
        d="M12 9 C12 9 14 11.5 14 13.5 C14 14.2 13.5 14.8 13 15.2 C14.2 14.8 15.5 15.8 15.5 17.2 C15.5 19.2 14 20.8 12 20.8 C10 20.8 8.5 19.2 8.5 17.2 C8.5 15 10 12.5 12 9 Z"
        fill="url(#rs_fire_inner)"
      />

      {/* Specular Glint */}
      <circle cx="11" cy="15" r="1.5" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}

// 12. AI Assistant — 3D Futuristic Cute Robot Head with Cyan Eyes
export function Icon3DAIAssistant({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ai_sphere" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e2e8f0" />
          <stop offset="75%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
        <radialGradient id="ai_visor" cx="45%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id="ai_eye" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
      </defs>

      {/* Top Antenna with Glowing Cyan Orb */}
      <line x1="12" y1="5" x2="12" y2="2" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="1.8" r="1.4" fill="#06b6d4" />
      <circle cx="11.8" cy="1.5" r="0.5" fill="#ffffff" />

      {/* Side Ear Antennas */}
      <rect x="1.5" y="10" width="2" height="5" rx="1" fill="#06b6d4" />
      <rect x="20.5" y="10" width="2" height="5" rx="1" fill="#06b6d4" />

      {/* 3D Head Sphere Base */}
      <rect x="3" y="5" width="18" height="15" rx="7.5" fill="#1e293b" />
      <rect x="3" y="4.5" width="18" height="15" rx="7.5" fill="url(#ai_sphere)" />

      {/* Visor Screen */}
      <rect x="5.5" y="8.5" width="13" height="7.5" rx="3.75" fill="url(#ai_visor)" />

      {/* Glowing Neon Cyan LED Eyes */}
      <ellipse cx="9" cy="12" rx="1.8" ry="1.4" fill="url(#ai_eye)" />
      <circle cx="8.5" cy="11.5" r="0.6" fill="#ffffff" />

      <ellipse cx="15" cy="12" rx="1.8" ry="1.4" fill="url(#ai_eye)" />
      <circle cx="14.5" cy="11.5" r="0.6" fill="#ffffff" />
    </svg>
  );
}

// 13. Settings — 3D Precision Beveled Metallic Gear
export function Icon3DSettings({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="set_gear" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#e2e8f0" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
        <radialGradient id="set_gold_hub" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </radialGradient>
      </defs>

      {/* 3D Gear Teeth Outer Shadow */}
      <path
        d="M12 1.5 L14 1.5 L14.5 3.5 C15.5 3.9 16.3 4.4 17.1 5.1 L19 4.2 L20.4 5.6 L19.5 7.5 C20.2 8.3 20.7 9.1 21.1 10.1 L23.1 10.6 L23.1 12.6 L21.1 13.1 C20.7 14.1 20.2 14.9 19.5 15.7 L20.4 17.6 L19 19 L17.1 18.1 C16.3 18.8 15.5 19.3 14.5 19.7 L14 21.7 L12 21.7 L11.5 19.7 C10.5 19.3 9.7 18.8 8.9 18.1 L7 19 L5.6 17.6 L6.5 15.7 C5.8 14.9 5.3 14.1 4.9 13.1 L2.9 12.6 L2.9 10.6 L4.9 10.1 C5.3 9.1 5.8 8.3 6.5 7.5 L5.6 5.6 L7 4.2 L8.9 5.1 C9.7 4.4 10.5 3.9 11.5 3.5 Z"
        fill="#1e293b"
        transform="translate(0, 0.8)"
      />

      {/* 3D Metallic Silver Gear Body */}
      <path
        d="M12 1.5 L14 1.5 L14.5 3.5 C15.5 3.9 16.3 4.4 17.1 5.1 L19 4.2 L20.4 5.6 L19.5 7.5 C20.2 8.3 20.7 9.1 21.1 10.1 L23.1 10.6 L23.1 12.6 L21.1 13.1 C20.7 14.1 20.2 14.9 19.5 15.7 L20.4 17.6 L19 19 L17.1 18.1 C16.3 18.8 15.5 19.3 14.5 19.7 L14 21.7 L12 21.7 L11.5 19.7 C10.5 19.3 9.7 18.8 8.9 18.1 L7 19 L5.6 17.6 L6.5 15.7 C5.8 14.9 5.3 14.1 4.9 13.1 L2.9 12.6 L2.9 10.6 L4.9 10.1 C5.3 9.1 5.8 8.3 6.5 7.5 L5.6 5.6 L7 4.2 L8.9 5.1 C9.7 4.4 10.5 3.9 11.5 3.5 Z"
        fill="url(#set_gear)"
      />

      {/* Inner 3D Golden Hub */}
      <circle cx="13" cy="12.1" r="5" fill="url(#set_gold_hub)" />

      {/* Center Axle Hole */}
      <circle cx="13" cy="12.1" r="2.5" fill="#0f172a" />
      <circle cx="12.7" cy="11.8" r="2.3" fill="#1e293b" />
    </svg>
  );
}

// 14. Islamic Calendar — 3D Emerald Plaque with Gold Crescent Moon & Hijri Stars
export function Icon3DIslamicCalendar({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ic_base" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <radialGradient id="ic_gold" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="35%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
      </defs>

      {/* 3D Base Shadow */}
      <rect x="3.5" y="4" width="17" height="17" rx="3.5" fill="#022c22" />

      {/* 3D Emerald Plaque Body */}
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="url(#ic_base)" />
      <path d="M4.5 4.5 L19.5 4.5 C19.5 6 17 6 4.5 5 Z" fill="#ffffff" opacity="0.35" />

      {/* Top Gold Arch Accent */}
      <path d="M8 8 C8 6.5 9.8 5.5 12 5.5 C14.2 5.5 16 6.5 16 8" stroke="url(#ic_gold)" strokeWidth="1.2" strokeLinecap="round" />

      {/* 3D Golden Crescent Moon */}
      <path
        d="M13.5 9 C11.5 9 10 10.8 10 12.8 C10 14.8 11.5 16.5 13.5 16.5 C14.2 16.5 14.8 16.3 15.2 16 C13.4 15.5 12.2 14 12.2 12.5 C12.2 11 13.4 9.8 15.2 9.5 C14.8 9.2 14.2 9 13.5 9 Z"
        fill="url(#ic_gold)"
      />

      {/* 3D Star */}
      <circle cx="15.8" cy="11.5" r="0.9" fill="#fef08a" />

      {/* Bottom Hijri Dots */}
      <circle cx="8" cy="17" r="0.8" fill="#fef08a" opacity="0.8" />
      <circle cx="12" cy="17" r="0.8" fill="#fef08a" opacity="0.8" />
      <circle cx="16" cy="17" r="0.8" fill="#fef08a" opacity="0.8" />
    </svg>
  );
}

// 15. Namaz Ki Niyyat — 3D Praying Hands & Spiritual Heart on Emerald Arch
export function Icon3DNamazNiyyah({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ny_base" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <radialGradient id="ny_gold" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="35%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </radialGradient>
      </defs>

      {/* 3D Shadow Base */}
      <rect x="3.5" y="4" width="17" height="17" rx="3.5" fill="#022c22" />

      {/* 3D Emerald Plaque Body */}
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="url(#ny_base)" />
      <path d="M4.5 4.5 L19.5 4.5 C19.5 6 17 6 4.5 5 Z" fill="#ffffff" opacity="0.35" />

      {/* Raised Cupped Hands (Dua / Niyyah posture) */}
      {/* Left Hand */}
      <path
        d="M7.5 16 C7 15 7.2 12.5 8.5 10 C9.5 8 10.8 7.5 11.2 8.5 C11.5 9.5 10.5 11.5 10.2 13 C10 14.5 9 16 7.5 16 Z"
        fill="url(#ny_gold)"
      />
      {/* Right Hand */}
      <path
        d="M16.5 16 C17 15 16.8 12.5 15.5 10 C14.5 8 13.2 7.5 12.8 8.5 C12.5 9.5 13.5 11.5 13.8 13 C14 14.5 15 16 16.5 16 Z"
        fill="url(#ny_gold)"
      />

      {/* Glowing Spiritual Heart of Ikhlas in the Center */}
      <path
        d="M12 9 C11.2 7.8 9.5 8.2 9.5 9.6 C9.5 11 12 12.8 12 12.8 C12 12.8 14.5 11 14.5 9.6 C14.5 8.2 12.8 7.8 12 9 Z"
        fill="#fef08a"
      />

      {/* Top Divine Ray / Noor sparkles */}
      <circle cx="12" cy="6" r="1.1" fill="#ffffff" />
      <circle cx="9" cy="6.8" r="0.6" fill="#fef08a" />
      <circle cx="15" cy="6.8" r="0.6" fill="#fef08a" />
    </svg>
  );
}

// 16. Sunnah Dishes — 3D Traditional Sunnah Bowl with Olive Branch & Golden Honey
export function Icon3DSunnahDishes({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="sd_bowl" x1="4" y1="10" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="sd_honey" x1="6" y1="8" x2="18" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="sd_leaf" x1="8" y1="2" x2="16" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* 3D Bowl Shadow */}
      <ellipse cx="12" cy="20.5" rx="7" ry="1.8" fill="#022c22" opacity="0.4" />

      {/* 3D Sunnah Terracotta / Ceramic Bowl Body */}
      <path d="M4 11 C4 17 7.5 20.5 12 20.5 C16.5 20.5 20 17 20 11 Z" fill="url(#sd_bowl)" />
      {/* Bowl Rim Lip */}
      <ellipse cx="12" cy="11" rx="8" ry="2.5" fill="#92400e" />
      {/* Inner Steaming Broth / Honey Glaze */}
      <ellipse cx="12" cy="11.2" rx="7" ry="2" fill="url(#sd_honey)" />

      {/* Front Highlight Rim */}
      <path d="M5 11.5 C7 13.5 17 13.5 19 11.5" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* Blessed Olive Branch & Leaf rising from dish */}
      <path d="M12 11 C12 6 15 3 15 3 C15 3 13.5 6 13 8" stroke="#047857" strokeWidth="1" strokeLinecap="round" />
      <path d="M15 3 C16 4 17.5 5 16 6.5 C14.5 7 13.5 5.5 15 3 Z" fill="url(#sd_leaf)" />
      <path d="M10 5.5 C11.5 5 13 6 12 7.5 C11 8.5 9.5 7 10 5.5 Z" fill="url(#sd_leaf)" />

      {/* 3D Golden Fig / Date Fruit perched on rim */}
      <ellipse cx="8.5" cy="10" rx="2" ry="2.2" fill="#713f12" />
      <circle cx="8" cy="9.2" r="0.6" fill="#fef08a" opacity="0.8" />

      {/* Steam / Aroma Wisps */}
      <path d="M8 4 C7.5 2.5 8.5 1.5 8 0.5" stroke="#fef08a" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      <path d="M12 2 C11.5 1 12.5 0.5 12 0" stroke="#fef08a" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// 18. Naat Sharif — 3D Glossy Emerald & Gold Spiritual Soundwave with Sacred Dome & Crescent
export function Icon3DNaatSharif({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ns_gold" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff8cf" />
          <stop offset="30%" stopColor="#facc15" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="ns_emerald" x1="4" y1="8" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="40%" stopColor="#059669" />
          <stop offset="100%" stopColor="#022c22" />
        </linearGradient>
        <linearGradient id="ns_wave" x1="12" y1="4" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="ns_glow" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#064e3b" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* 3D Soft Background Aura */}
      <circle cx="12" cy="12" r="10" fill="#032418" opacity="0.45" />

      {/* 3D Mosque Dome Silhouette */}
      <path
        d="M6 18 C6 14 8.5 11 12 7 C15.5 11 18 14 18 18 Z"
        fill="url(#ns_emerald)"
        filter="url(#ns_glow)"
      />
      {/* Dome Specular Highlight */}
      <path d="M12 7 C10 10 8 13.5 8 17.5" stroke="#a7f3d0" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />

      {/* Glowing Soundwave Bars rising from the holy chamber */}
      <line x1="8" y1="17" x2="8" y2="13" stroke="url(#ns_gold)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10.5" y1="17" x2="10.5" y2="10" stroke="url(#ns_gold)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13.5" y1="17" x2="13.5" y2="10" stroke="url(#ns_gold)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="16" y1="17" x2="16" y2="13" stroke="url(#ns_gold)" strokeWidth="1.6" strokeLinecap="round" />

      {/* 3D Golden Spire & Crescent at Top */}
      <line x1="12" y1="7" x2="12" y2="3" stroke="url(#ns_gold)" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M10.8 2.6 A 1.8 1.8 0 1 1 13.2 5 A 1.4 1.4 0 1 0 10.8 2.6 Z"
        fill="url(#ns_gold)"
      />

      {/* Radiant Sound Resonance Pulse Rings */}
      <path
        d="M18.5 7.5 C20.5 9 21.5 11.5 21 14"
        stroke="url(#ns_wave)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M20 5.5 C22.5 8 23.5 11.5 23 15"
        stroke="url(#ns_gold)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Left Delicate Harmony Arc */}
      <path
        d="M5.5 7.5 C3.5 9 2.5 11.5 3 14"
        stroke="url(#ns_wave)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Base Arch Plinth */}
      <rect x="4" y="18" width="16" height="2" rx="1" fill="url(#ns_gold)" />
    </svg>
  );
}

