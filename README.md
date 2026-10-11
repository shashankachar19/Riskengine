# RiskEngine. 🛡️
### Autonomous Multi-Agent Crisis Command Platform for Safety-Critical Operations

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.3-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.3-purple.svg)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-cyan.svg)](https://tailwindcss.com)

**RiskEngine** is an autonomous AI crisis command platform designed for safety-critical industrial, hydrological, and subterranean environments. When cascading disasters strike and primary evacuation vectors are compromised, RiskEngine coordinates multi-agent telemetry analysis, invalidates blocked corridors, computes dynamic alternate bypass paths, and enforces strict **Human-in-the-Loop (HITL)** commander authorization before executing life-saving extractions.

---

## 🌐 Deployed Operational Scenarios

RiskEngine features three real-world, high-fidelity operational digital twins:

| Scenario | Location | Primary Threat | Secondary Cascading Failure | AI Reroute Vector |
| :--- | :--- | :--- | :--- | :--- |
| **Open-Cast Iron Ore Mine** | Sandur Geological Belt, Ballari, Karnataka (15.08°N, 76.55°E) | Bench slope displacement failure (18.4 mm/h creep) | Overturned 150t Haul Truck blocking Haul Rd Alpha-4 | Ambulance 2 dispatched via Bravo-2 Sandur Bypass (SH40) |
| **Teesta Dam Glacial Flood** | Teesta Stage III Dam, Chungthang, North Sikkim (27.60°N, 88.64°E) | Glacial Lake Outburst Flood (GLOF) (4,820 m³/s surge) | Chungthang access bridge swept away by flash torrent | Rescue Helicopter Air-1 deployed via Sky-3 Aerial Ridge Corridor |
| **Namma Metro Pink Line** | Dairy Circle Subterranean Cut, Bengaluru (12.93°N, 77.59°E) | Groundwater breach into TBM cutterhead at -28m depth | 6m utility void sinkhole collapses Hosur Road surface | Tunnel Rescue Unit 2 routed via Marigowda-Bannerghatta Auxiliary Ramp |

---

## ⚡ Key Capabilities

### 1. Autonomous Multi-Agent Swarm
RiskEngine deploys five specialized AI agent personas that operate in real-time:
* **Perception Agent (`System Monitor`)**: Ingests edge telemetry from SSR interferometric radars, piezometers, and ultrasonic river gauges.
* **Risk Analyst Agent**: Evaluates worker exposure, geo-fences active personnel, and flags safety threshold breaches.
* **Route Navigator Agent**: Monitors road networks and calculates graph-based bypass paths when primary vectors are severed.
* **Fleet Dispatcher Agent**: Reallocates backup emergency assets (4x4 ambulances, hoist rescue helicopters, dewatering units).
* **Audit & Safety Agent**: Tracks millisecond coordination cycles and generates post-incident accountability reports.

### 2. Human-in-the-Loop (HITL) Safety Protocol
Autonomous systems in life-critical operations must never execute destructive route overrides without command approval. 
* When secondary disasters sever primary access, RiskEngine pauses execution and launches the **Tactical Command Authorization Gate**.
* Safety officers review the side-by-side risk differential, ETA delta, and alternate vector parameters before authorizing the AI reroute.

### 3. Scenario-Specific Live Sensor Telemetry HUD
An on-map tactical HUD streams real-time sensor downlinks with live micro-fluctuations, specialized sparklines, and domain indicators:
* **Mining**: SSR-XT Radar displacement rate (`mm/h`), pore water pressure (`kPa`), and Factor of Safety (`FoS: 0.84`) bench shear gauge.
* **Flood**: Teesta Stage III ultrasonic discharge (`m³/s`), surge velocity (`m/s`), and reservoir freeboard meter (`2.7m to Crest`).
* **Metro Construction**: TBM cutterhead hydrostatic pressure (`18.6 bar`), depth meter (`-28.4m`), and Hosur Road subsidence gauge (`28.5 mm`).

### 4. Interactive Tactical GIS Mapping
* Full-bleed interactive GIS map engine with topographic hillshade and satellite vector layers.
* Smooth, real-time interpolated vehicle navigation with turn-by-turn physics animations.
* Sonar ripple wave beacons over hazard zones and animated dotted vector lines.
* Precise incident breach tags (`HAUL TRUCK CRASH`, `BRIDGE WASHOUT`, `SINKHOLE COLLAPSE`).

### 5. Production Audit Impact Report
Upon crisis containment, RiskEngine generates a comprehensive audit report:
* Side-by-side performance benchmarks: **Manual Protocol (~12 min, $1.2M liability) vs. RiskEngine AI (45.5s, $15k cost)**.
* 100% personnel accountability and RFID extraction tracking.
* **One-Click Printable Audit PDF** for regulatory compliance (DGMS, NDMA, BMRCL).

---

## 🛠️ Technology Stack

* **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with pure Vanilla CSS tokens
* **Geospatial Engine**: [Leaflet GIS](https://leafletjs.com/) with custom SVG marker layer architecture
* **Icons & Assets**: Custom Tactical SVG Reticle Engine + [Lucide React](https://lucide.dev/)
* **State & Simulation Engine**: Pure React Context with deterministic step sequencing and event-driven animation listeners

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher)
* `npm` or `pnpm`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shashankachar19/Riskengine.git
   cd Riskengine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Launch the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`.

---

## 🎮 Simulation Walkthrough Guide

Follow these steps to demonstrate RiskEngine to judges or evaluators:

1. **Scenario Selection**: On the cinematic boot screen, select any of the three real-world operations (Mine, Teesta Dam, or Namma Metro) and click **`[ INITIALIZE SIMULATION SESSION ]`**.
2. **Phase 1 (Hazard Detected)**: Observe the live Telemetry HUD exceed safety thresholds. The map highlights trapped personnel in Sector 4 with expanding sonar rings.
3. **Phase 2 (Emergency Response)**: Click to dispatch the primary responder. Watch the vehicle drive down the primary corridor with real-time route interpolation.
4. **Phase 3 (Secondary Cascading Failure)**: Inject the secondary crisis. The road severs, the vehicle performs an emergency brake halt 40m before the blockage, and the AI agent log streams the failure analysis.
5. **Phase 4 (HITL Override & Dynamic Replanning)**: Click to launch the **Human-in-the-Loop Approval Modal**. Review the alternate path metrics and click **`[ AUTHORIZE DYNAMIC REPLAN ]`**.
6. **Phase 5 (Containment & Arrival)**: Watch the backup responder navigate the green bypass route and arrive directly at the hazard site. Once the vehicle arrives and secures the workers, the **Incident Impact Report** opens automatically.

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── icons/
│   │   └── SvgIcons.tsx             # Tactical SVG icons and kinetic RiskEngine reticle logo
│   ├── ApprovalModal.tsx            # Human-in-the-Loop commander authorization gate
│   ├── CommandCenter.tsx            # Main bento-grid dashboard layout
│   ├── CommandLog.tsx               # Real-time multi-agent AI engine log stream
│   ├── GISMap.tsx                   # Leaflet geospatial map engine & vehicle physics
│   ├── Header.tsx                   # System status bar, scenario switcher & master reset
│   ├── HoverBottomNav.tsx           # Floating command control & phase action bar
│   ├── ImpactReportModal.tsx        # Post-incident compliance audit & printable report
│   ├── ImplementationPlanPanel.tsx  # Right-hand phase tracker & containment protocol
│   ├── MapTelemetryHUD.tsx          # Real-time scenario-specific sensor telemetry HUD
│   ├── ResourcePanel.tsx            # Left-hand asset dock & RTLS worker accountability
│   └── WelcomeModal.tsx             # Scenario selector & boot sequence modal
├── scenarios/
│   ├── index.ts                     # Scenario registry & helper functions
│   ├── types.ts                     # Strict TypeScript interfaces for geospatial simulation
│   ├── mineScenario.ts              # Ballari Iron Ore Mine configuration
│   ├── floodScenario.ts             # Teesta Dam Glacial Flood configuration
│   └── constructionScenario.ts      # Namma Metro Pink Line configuration
├── store/
│   ├── SimContext.tsx               # Central simulation state & multi-agent lifecycle
│   └── simulationState.ts           # State schema definitions
├── App.tsx                          # App root wrapped in SimProvider
├── main.tsx                         # React 19 entry point
└── index.css                        # Design system tokens & tactical animations
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
