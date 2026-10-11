import React from 'react';

// Crisp SVG paths for Leaflet markers and UI components
export type MarkerIconType =
  | 'hospital'
  | 'ambulance'
  | 'helicopter'
  | 'truck'
  | 'excavator'
  | 'crane'
  | 'boat'
  | 'hazard'
  | 'crash'
  | 'flood'
  | 'sinkhole'
  | 'drill'
  | 'personnel'
  | 'drone'
  | 'pump'
  | 'shield';

// ── Official Tactical Autonomous Command Logo: Kinetic Crisis Reticle ──
export function RiskEngineLogo({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="re-chassis-dark" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
          <linearGradient id="re-neon-vector" x1="9" y1="9" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="re-glow-core" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#10b981" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Tactical Octagonal Obsidian Plate */}
        <polygon
          points="18,2 32,8 32,24 18,34 4,24 4,8"
          fill="url(#re-chassis-dark)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Perimeter Telemetry Grid Alignment Marks */}
        <polygon
          points="18,5 29,10 29,22 18,31 7,22 7,10"
          fill="none"
          stroke="#064e3b"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Kinetic Stylized 'R' Crisis Command Vector */}
        {/* 1. Left Tactical Vertical Spine */}
        <rect x="9.5" y="9.5" width="4.5" height="17" rx="1.5" fill="url(#re-neon-vector)" />
        <rect x="10.8" y="12" width="1.8" height="5" rx="0.9" fill="white" opacity="0.8" />

        {/* 2. Upper Aerodynamic Arc of 'R' */}
        <path
          d="M13.5 9.5 H21.5 C25 9.5 27 11.5 27 14.5 C27 17.5 25 19.5 21.5 19.5 H13.5 V9.5 Z"
          fill="none"
          stroke="url(#re-neon-vector)"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* 3. High-Velocity Forward Interceptor Vector (Leg of 'R' projecting outward) */}
        <path
          d="M17 18 L25.5 26.5 H20.5 L13.5 19.5"
          fill="url(#re-neon-vector)"
          stroke="url(#re-neon-vector)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 4. Core Telemetry Crisis Pulse Beacon (Radar eye) */}
        <circle cx="19" cy="14.5" r="2.8" fill="#10b981" filter="url(#re-glow-core)" />
        <circle cx="19" cy="14.5" r="1.2" fill="white" />

        {/* Horizon Reticle Ticks */}
        <line x1="5" y1="16" x2="7.5" y2="16" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28.5" y1="16" x2="31" y2="16" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Generates standalone SVG string for HTML document export (Audit PDF)
export function getRiskEngineLogoSvgHtml(size = 36): string {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle">
      <defs>
        <linearGradient id="re-pdf-plate" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#090d16" />
        </linearGradient>
      </defs>
      <polygon points="18,2 32,8 32,24 18,34 4,24 4,8" fill="url(#re-pdf-plate)" stroke="#334155" stroke-width="1.5" />
      <polygon points="18,5 29,10 29,22 18,31 7,22 7,10" fill="none" stroke="#064e3b" stroke-width="1" stroke-dasharray="3 3" />
      <rect x="9.5" y="9.5" width="4.5" height="17" rx="1.5" fill="#10b981" />
      <rect x="10.8" y="12" width="1.8" height="5" rx="0.9" fill="#ffffff" opacity="0.8" />
      <path d="M13.5 9.5 H21.5 C25 9.5 27 11.5 27 14.5 C27 17.5 25 19.5 21.5 19.5 H13.5 V9.5 Z" fill="none" stroke="#10b981" stroke-width="3.2" stroke-linejoin="round" />
      <path d="M17 18 L25.5 26.5 H20.5 L13.5 19.5" fill="#10b981" stroke="#10b981" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round" />
      <circle cx="19" cy="14.5" r="2.8" fill="#34d399" />
      <circle cx="19" cy="14.5" r="1.2" fill="#ffffff" />
      <line x1="5" y1="16" x2="7.5" y2="16" stroke="#34d399" stroke-width="1.2" stroke-linecap="round" />
      <line x1="28.5" y1="16" x2="31" y2="16" stroke="#34d399" stroke-width="1.2" stroke-linecap="round" />
    </svg>
  `;
}

// ── Flaticon-Style Animated Medical Helicopter (React Component) ──
export function AnimatedMedicalHelicopter({
  size = 28,
  color = '#10b981',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ animation: 'heli-hover 2.4s ease-in-out infinite' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Spinning Main Rotor Blades with Blur Disc */}
        <g style={{ transformOrigin: '16px 7px', animation: 'rotor-spin 0.16s linear infinite' }}>
          <ellipse
            cx="16"
            cy="7"
            rx="14"
            ry="2.2"
            fill={color}
            fillOpacity="0.18"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="6 4"
          />
          <line
            x1="2"
            y1="7"
            x2="30"
            y2="7"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Rotor Mast & Flashing Beacon */}
        <line x1="16" y1="7" x2="16" y2="12" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />
        <circle
          cx="16"
          cy="6"
          r="1.8"
          fill="#ef4444"
          style={{ animation: 'beacon-flash 0.8s ease-in-out infinite' }}
        />

        {/* Helicopter Fuselage (Cabin) */}
        <path
          d="M10 13 H21 C24.5 13 26 15.5 26 18.5 C26 21 24 23 20 23 H11 C8.5 23 7 21 7 18 C7 15 8.5 13 10 13 Z"
          fill="white"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Cockpit Windshield */}
        <path
          d="M21 14.5 C23.5 14.5 24.8 16 24.8 18 H20 V14.5 H21 Z"
          fill="#38bdf8"
          fillOpacity="0.8"
        />

        {/* Medical Cross on Fuselage */}
        <path d="M14 16 H16 M15 15 V17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />

        {/* Tail Boom & Vertical Fin */}
        <path
          d="M7 16.5 L1 15.5 V11"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Spinning Tail Rotor */}
        <g style={{ transformOrigin: '1px 11px', animation: 'tail-spin 0.12s linear infinite' }}>
          <line x1="1" y1="8" x2="1" y2="14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Landing Skids (Twin Runners) */}
        <line x1="7" y1="27" x2="25" y2="27" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="23" x2="10" y2="27" stroke="#78716c" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="19" y1="23" x2="18" y2="27" stroke="#78716c" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ── Animated Ambulance with Flashing Roof Sirens & Spinning Wheels ──
export function AnimatedAmbulance({
  size = 28,
  color = '#10b981',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Flashing Roof Sirens (Alternating Red and Blue Strobe) */}
        <rect
          x="11"
          y="6"
          width="3.5"
          height="3"
          rx="1"
          fill="#ef4444"
          style={{ animation: 'siren-red 0.5s ease-in-out infinite' }}
        />
        <rect
          x="15"
          y="6"
          width="3.5"
          height="3"
          rx="1"
          fill="#3b82f6"
          style={{ animation: 'siren-blue 0.5s ease-in-out infinite' }}
        />

        {/* Ambulance Body */}
        <path
          d="M4 11 H20 V15 H27 L28 20 V23 H4 V11 Z"
          fill="white"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Windshield */}
        <path d="M21 13 H25 L26 18 H21 V13 Z" fill="#38bdf8" fillOpacity="0.75" />

        {/* Medical Cross */}
        <path d="M9 16 H13 M11 14 V18" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />

        {/* Spinning Wheels with Hubs */}
        <g style={{ transformOrigin: '9px 23px', animation: 'rotor-spin 1s linear infinite' }}>
          <circle cx="9" cy="23" r="3.2" fill="#292524" stroke="#e7e5e4" strokeWidth="1.5" />
          <circle cx="9" cy="23" r="1.2" fill="white" />
        </g>
        <g style={{ transformOrigin: '23px 23px', animation: 'rotor-spin 1s linear infinite' }}>
          <circle cx="23" cy="23" r="3.2" fill="#292524" stroke="#e7e5e4" strokeWidth="1.5" />
          <circle cx="23" cy="23" r="1.2" fill="white" />
        </g>
      </svg>
    </div>
  );
}

// ── Animated Rescue Boat Rocking on Water ──
export function AnimatedRescueBoat({
  size = 28,
  color = '#2563eb',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ animation: 'boat-rock 2s ease-in-out infinite' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Cabin & Mast with Flashing Beacon */}
        <path d="M12 9 H20 V15 H12 Z" fill="white" stroke={color} strokeWidth="1.8" />
        <circle
          cx="16"
          cy="6"
          r="1.8"
          fill="#3b82f6"
          style={{ animation: 'beacon-flash 0.8s ease-in-out infinite' }}
        />

        {/* Hull */}
        <path
          d="M4 17 L7 24 H25 L28 17 H4 Z"
          fill="white"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Water Ripple Wave */}
        <path
          d="M2 26 Q8 24 16 26 T30 26"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ animation: 'water-ripple 1.5s ease-in-out infinite' }}
        />
      </svg>
    </div>
  );
}

// ── Animated Excavator with Hydraulic Arm ──
export function AnimatedExcavator({
  size = 28,
  color = '#f59e0b',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Flashing Amber Roof Beacon */}
        <circle
          cx="12"
          cy="10"
          r="1.8"
          fill="#f59e0b"
          style={{ animation: 'beacon-flash 0.8s infinite' }}
        />

        {/* Body & Tracks */}
        <path d="M8 12 H16 V18 H8 Z" fill="white" stroke={color} strokeWidth="1.8" />
        <rect x="5" y="21" width="16" height="4" rx="2" fill="#44403c" stroke="#78716c" strokeWidth="1.5" />

        {/* Articulated Hydraulic Boom & Bucket */}
        <g style={{ transformOrigin: '16px 16px', animation: 'excavator-arm 2.5s ease-in-out infinite' }}>
          <path
            d="M16 16 L22 10 L26 15 L28 17"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M26 15 L28 20 H25 Z" fill={color} />
        </g>
      </svg>
    </div>
  );
}

// ── Animated Aerial Survey Drone (Zero Twitching, Rock-Solid Quadcopter with Propeller Wash) ──
export function AnimatedDrone({
  size = 28,
  color = '#9333ea',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        animation: 'drone-hover-smooth 2.8s ease-in-out infinite',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* 4 Carbon-Fiber Motor Struts */}
        <line x1="12" y1="12" x2="7" y2="7" stroke="#6b21a8" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="20" y1="12" x2="25" y2="7" stroke="#6b21a8" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="12" y1="20" x2="7" y2="25" stroke="#6b21a8" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="20" y1="20" x2="25" y2="25" stroke="#6b21a8" strokeWidth="2.2" strokeLinecap="round" />

        {/* 4 Rotor Downwash Discs (Clean translucent discs with smooth pulse, zero pixel twitch) */}
        <circle cx="7" cy="7" r="4.8" fill="#c084fc" fillOpacity="0.25" stroke={color} strokeWidth="1" style={{ animation: 'rotor-disc-pulse 1.2s ease-in-out infinite' }} />
        <circle cx="25" cy="7" r="4.8" fill="#c084fc" fillOpacity="0.25" stroke={color} strokeWidth="1" style={{ animation: 'rotor-disc-pulse 1.2s ease-in-out infinite' }} />
        <circle cx="7" cy="25" r="4.8" fill="#c084fc" fillOpacity="0.25" stroke={color} strokeWidth="1" style={{ animation: 'rotor-disc-pulse 1.2s ease-in-out infinite' }} />
        <circle cx="25" cy="25" r="4.8" fill="#c084fc" fillOpacity="0.25" stroke={color} strokeWidth="1" style={{ animation: 'rotor-disc-pulse 1.2s ease-in-out infinite' }} />

        {/* 4 Precision Motor Hubs */}
        <circle cx="7" cy="7" r="1.8" fill="#581c87" />
        <circle cx="25" cy="7" r="1.8" fill="#581c87" />
        <circle cx="7" cy="25" r="1.8" fill="#581c87" />
        <circle cx="25" cy="25" r="1.8" fill="#581c87" />

        {/* Central Avionics Pod */}
        <rect x="11" y="11" width="10" height="10" rx="2.5" fill="white" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        {/* Optical Sensor Gimbal Lens */}
        <circle cx="16" cy="16" r="2.2" fill="#7e22ce" />
        {/* Status Beacon LED (Smooth opacity pulse, zero filter repaint) */}
        <circle cx="16" cy="13.5" r="1.2" fill="#10b981" style={{ animation: 'beacon-pulse 1.2s ease-in-out infinite' }} />
      </svg>
    </div>
  );
}

// ── Master HTML String Generator for Leaflet GIS Markers ──
export function getMarkerSvgHtml(type: MarkerIconType, color = '#10b981', size = 26): string {
  switch (type) {
    case 'helicopter':
      return `
        <div style="display:inline-flex;align-items:center;justify-content:center;animation:heli-hover 2.4s ease-in-out infinite">
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" style="overflow:visible">
            <g style="transform-origin:16px 7px;animation:rotor-spin 0.16s linear infinite">
              <ellipse cx="16" cy="7" rx="14" ry="2.2" fill="${color}" fill-opacity="0.22" stroke="${color}" stroke-width="1.2" stroke-dasharray="6 4" />
              <line x1="2" y1="7" x2="30" y2="7" stroke="${color}" stroke-width="2" stroke-linecap="round" />
            </g>
            <line x1="16" y1="7" x2="16" y2="12" stroke="#44403c" stroke-width="2" stroke-linecap="round" />
            <circle cx="16" cy="6" r="1.8" fill="#ef4444" style="animation:beacon-flash 0.8s ease-in-out infinite" />
            <path d="M10 13 H21 C24.5 13 26 15.5 26 18.5 C26 21 24 23 20 23 H11 C8.5 23 7 21 7 18 C7 15 8.5 13 10 13 Z" fill="white" stroke="${color}" stroke-width="2" stroke-linejoin="round" />
            <path d="M21 14.5 C23.5 14.5 24.8 16 24.8 18 H20 V14.5 H21 Z" fill="#38bdf8" fill-opacity="0.8" />
            <path d="M14 16 H16 M15 15 V17" stroke="#dc2626" stroke-width="2" stroke-linecap="round" />
            <path d="M7 16.5 L1 15.5 V11" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <g style="transform-origin:1px 11px;animation:tail-spin 0.12s linear infinite">
              <line x1="1" y1="8" x2="1" y2="14" stroke="${color}" stroke-width="1.8" stroke-linecap="round" />
            </g>
            <line x1="7" y1="27" x2="25" y2="27" stroke="#57534e" stroke-width="2" stroke-linecap="round" />
            <line x1="11" y1="23" x2="10" y2="27" stroke="#78716c" stroke-width="1.8" stroke-linecap="round" />
            <line x1="19" y1="23" x2="18" y2="27" stroke="#78716c" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </div>
      `;

    case 'ambulance':
      return `
        <div style="display:inline-flex;align-items:center;justify-content:center">
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" style="overflow:visible">
            <rect x="11" y="6" width="3.5" height="3" rx="1" fill="#ef4444" style="animation:siren-red 0.5s ease-in-out infinite" />
            <rect x="15" y="6" width="3.5" height="3" rx="1" fill="#3b82f6" style="animation:siren-blue 0.5s ease-in-out infinite" />
            <path d="M4 11 H20 V15 H27 L28 20 V23 H4 V11 Z" fill="white" stroke="${color}" stroke-width="2" stroke-linejoin="round" />
            <path d="M21 13 H25 L26 18 H21 V13 Z" fill="#38bdf8" fill-opacity="0.8" />
            <path d="M9 16 H13 M11 14 V18" stroke="#dc2626" stroke-width="2" stroke-linecap="round" />
            <g style="transform-origin:9px 23px;animation:rotor-spin 1s linear infinite">
              <circle cx="9" cy="23" r="3.2" fill="#292524" stroke="#e7e5e4" stroke-width="1.5" />
              <circle cx="9" cy="23" r="1.2" fill="white" />
            </g>
            <g style="transform-origin:23px 23px;animation:rotor-spin 1s linear infinite">
              <circle cx="23" cy="23" r="3.2" fill="#292524" stroke="#e7e5e4" stroke-width="1.5" />
              <circle cx="23" cy="23" r="1.2" fill="white" />
            </g>
          </svg>
        </div>
      `;

    case 'boat':
      return `
        <div style="display:inline-flex;align-items:center;justify-content:center;animation:boat-rock 2s ease-in-out infinite">
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" style="overflow:visible">
            <path d="M12 9 H20 V15 H12 Z" fill="white" stroke="${color}" stroke-width="1.8" />
            <circle cx="16" cy="6" r="1.8" fill="#3b82f6" style="animation:beacon-flash 0.8s infinite" />
            <path d="M4 17 L7 24 H25 L28 17 H4 Z" fill="white" stroke="${color}" stroke-width="2" stroke-linejoin="round" />
            <path d="M2 26 Q8 24 16 26 T30 26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" style="animation:water-ripple 1.5s ease-in-out infinite" />
          </svg>
        </div>
      `;

    case 'excavator':
      return `
        <div style="display:inline-flex;align-items:center;justify-content:center">
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" style="overflow:visible">
            <circle cx="12" cy="10" r="1.8" fill="#f59e0b" style="animation:beacon-flash 0.8s infinite" />
            <path d="M8 12 H16 V18 H8 Z" fill="white" stroke="${color}" stroke-width="1.8" />
            <rect x="5" y="21" width="16" height="4" rx="2" fill="#44403c" stroke="#78716c" strokeWidth="1.5" />
            <g style="transform-origin:16px 16px;animation:excavator-arm 2.5s ease-in-out infinite">
              <path d="M16 16 L22 10 L26 15 L28 17" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M26 15 L28 20 H25 Z" fill="${color}" />
            </g>
          </svg>
        </div>
      `;

    case 'hospital':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 6v12M6 12h12"/>
          <path d="M3 3h18v18H3z" stroke-width="1.8" rx="4"/>
        </svg>
      `;

    case 'truck':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-5.28a2 2 0 0 0-.68-1.52l-2.73-2.42A2 2 0 0 0 17.27 7H14"/>
          <circle cx="7" cy="18" r="2"/>
          <circle cx="17" cy="18" r="2"/>
        </svg>
      `;

    case 'crane':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 22V4l16 4"/>
          <path d="M4 4h18"/>
          <path d="M18 8v8"/>
          <path d="M16 16h4"/>
          <path d="M2 22h6"/>
        </svg>
      `;

    case 'hazard':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L1 21h22L12 2z"/>
          <path d="M12 9v5"/>
          <circle cx="12" cy="17" r="1" fill="${color}"/>
        </svg>
      `;

    case 'crash':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l2.5 5 5.5.5-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-.5z"/>
          <path d="M12 8v4M12 15h.01"/>
        </svg>
      `;

    case 'flood':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 6c3-2 6-2 9 0s6 2 9 0"/>
          <path d="M2 12c3-2 6-2 9 0s6 2 9 0"/>
          <path d="M2 18c3-2 6-2 9 0s6 2 9 0"/>
        </svg>
      `;

    case 'sinkhole':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3a9 9 0 0 0-6 15.7"/>
          <path d="M12 7v5l3 3"/>
          <path d="M8 12h8"/>
        </svg>
      `;

    case 'drill':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2l4 4-9 9-4-1 1-4 8-8z"/>
          <path d="M3 21l4-4"/>
          <path d="M17 7l4-4"/>
        </svg>
      `;

    case 'personnel':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="10" cy="7" r="4"/>
          <path d="M20 8v6M23 11h-6"/>
        </svg>
      `;

    case 'drone':
      return `
        <div style="display:inline-flex;align-items:center;justify-content:center;animation:drone-hover-smooth 2.8s ease-in-out infinite;transform:translateZ(0);will-change:transform">
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" style="overflow:visible">
            <line x1="12" y1="12" x2="7" y2="7" stroke="#6b21a8" stroke-width="2.2" stroke-linecap="round" />
            <line x1="20" y1="12" x2="25" y2="7" stroke="#6b21a8" stroke-width="2.2" stroke-linecap="round" />
            <line x1="12" y1="20" x2="7" y2="25" stroke="#6b21a8" stroke-width="2.2" stroke-linecap="round" />
            <line x1="20" y1="20" x2="25" y2="25" stroke="#6b21a8" stroke-width="2.2" stroke-linecap="round" />
            <circle cx="7" cy="7" r="4.8" fill="#c084fc" fill-opacity="0.25" stroke="${color}" stroke-width="1" style="animation:rotor-disc-pulse 1.2s ease-in-out infinite" />
            <circle cx="25" cy="7" r="4.8" fill="#c084fc" fill-opacity="0.25" stroke="${color}" stroke-width="1" style="animation:rotor-disc-pulse 1.2s ease-in-out infinite" />
            <circle cx="7" cy="25" r="4.8" fill="#c084fc" fill-opacity="0.25" stroke="${color}" stroke-width="1" style="animation:rotor-disc-pulse 1.2s ease-in-out infinite" />
            <circle cx="25" cy="25" r="4.8" fill="#c084fc" fill-opacity="0.25" stroke="${color}" stroke-width="1" style="animation:rotor-disc-pulse 1.2s ease-in-out infinite" />
            <circle cx="7" cy="7" r="1.8" fill="#581c87" />
            <circle cx="25" cy="7" r="1.8" fill="#581c87" />
            <circle cx="7" cy="25" r="1.8" fill="#581c87" />
            <circle cx="25" cy="25" r="1.8" fill="#581c87" />
            <rect x="11" y="11" width="10" height="10" rx="2.5" fill="white" stroke="${color}" stroke-width="2" stroke-linejoin="round" />
            <circle cx="16" cy="16" r="2.2" fill="#7e22ce" />
            <circle cx="16" cy="13.5" r="1.2" fill="#10b981" style="animation:beacon-pulse 1.2s ease-in-out infinite" />
          </svg>
        </div>
      `;

    case 'pump':
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v6M8 8h8M4 14h16M7 14v6M17 14v6"/>
          <circle cx="12" cy="14" r="3"/>
        </svg>
      `;

    case 'shield':
    default:
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      `;
  }
}
