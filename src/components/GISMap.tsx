import { useEffect, useMemo, useRef, useState } from 'react';
import { useSimulation } from '../store/SimContext';
import { getMarkerSvgHtml } from './icons/SvgIcons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Minimize2, Maximize2 } from 'lucide-react';

function SlopeDisplacementPanel() {
  const { activeScenario, state } = useSimulation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const panel = activeScenario.map.sensorPanel;
  const title = panel?.title || 'Slope Displacement';
  const sensorId = panel?.sensorId || 'GEO-SENSOR 402 — LIVE FEED';
  const readings = panel?.readings || [
    { offsetMin: 6, value: '2 mm', pct: '15%', color: 'bg-emerald-500', textColor: 'text-emerald-600' },
    { offsetMin: 4, value: '4 mm', pct: '30%', color: 'bg-amber-500', textColor: 'text-amber-600' },
    { offsetMin: 2, value: '7 mm', pct: '55%', color: 'bg-orange-500', textColor: 'text-orange-600' },
    { offsetMin: 0, value: '12 mm', pct: '85%', color: 'bg-red-500 animate-pulse', textColor: 'text-red-600' },
  ];
  const footer = panel?.footer || 'Threshold exceeded — Evacuation triggered';
  const latestReading = readings[readings.length - 1]?.value || '';

  // Synchronize telemetry packet timestamp with the incident log for 100% forensic realism
  const incidentDate = useMemo(() => {
    const perceptionLog = state.visibleLogs.find(
      (l) => l.step === 1 && (l.level === 'perception' || l.source?.includes('SENSOR') || l.source?.includes('GAUGE'))
    );
    if (perceptionLog?.timestamp) {
      const parts = perceptionLog.timestamp.split(':').map(Number);
      if (parts.length === 3 && !parts.some(isNaN)) {
        const d = new Date();
        d.setHours(parts[0], parts[1], parts[2], 0);
        return d;
      }
    }
    return new Date();
  }, [state.step, state.visibleLogs]);

  // Format realistic historical telemetry polling timestamps (-25s, -12s, +4s, 0s)
  const getRealisticTime = (offsetMin: number, idx: number) => {
    const staggers = [-25, -12, 4, 0];
    const jitter = staggers[idx] ?? 0;
    const d = new Date(incidentDate.getTime() - (offsetMin * 60 - jitter) * 1000);
    return d.toLocaleTimeString('en-GB', { hour12: false });
  };

  if (isCollapsed) {
    return (
      <div className="absolute bottom-28 left-4 z-[1000] pointer-events-auto select-none animate-in fade-in zoom-in-95 duration-200">
        <div
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-3 px-3.5 py-2.5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.18)] border border-stone-200/90 hover:border-red-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.2)] transition-all cursor-pointer group"
          title="Click to expand telemetry panel"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">📡</span>
            <span className="text-xs font-black tracking-wider text-red-700 uppercase">
              {title}
            </span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          </div>

          <div className="flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-lg border border-red-200 text-xs font-mono font-black text-red-700 shadow-sm">
            <span>{latestReading}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-black tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            title="Expand full telemetry panel"
          >
            <Maximize2 className="w-3 h-3 text-white" />
            <span>EXPAND</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-28 left-4 w-[21.5rem] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-stone-200/90 z-[1000] pointer-events-auto animate-in slide-in-from-left-4 fade-in duration-300 overflow-hidden font-mono select-none">
      {/* Header with Shrink Button */}
      <div
        onClick={() => setIsCollapsed(true)}
        className="px-4 py-3 bg-red-50/90 border-b border-red-100 flex items-center justify-between cursor-pointer hover:bg-red-100/60 transition-colors"
        title="Click to shrink panel"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm shrink-0">📡</span>
          <span className="text-xs font-black tracking-widest text-red-700 uppercase truncate">
            {title}
          </span>
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(true);
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-red-700 border border-red-200 shadow-sm text-[10px] font-mono font-black tracking-wider uppercase transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
          title="Shrink panel to view map and rerouting"
        >
          <Minimize2 className="w-3 h-3 text-red-600" />
          <span>SHRINK</span>
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3.5 font-sans">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center justify-between">
          <span>{sensorId.toUpperCase()}</span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-black">
            SYNCED
          </span>
        </div>

        <div className="space-y-2.5">
          {readings.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-stone-600 tracking-tight text-xs">
                {getRealisticTime(r.offsetMin ?? 0, i)}
              </span>

              <div className="flex items-center gap-2.5">
                {/* Visual Bar Gauge with clean background and border */}
                <div className="w-24 bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200/60 p-[1px]">
                  <div
                    className={`${r.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: r.pct }}
                  />
                </div>

                <span className={`font-mono font-black ${r.textColor} w-20 text-right text-sm`}>
                  {r.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Alert */}
        <div className="mt-3.5 pt-2.5 border-t border-stone-100 text-xs font-black text-red-600 uppercase tracking-wider flex items-start gap-2 leading-snug">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0 mt-0.5" />
          <span>{footer.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

// Helper: Interpolate route for smooth animation
function interpolateRoute(route: [number, number][], stepsPerSegment = 25): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < route.length - 1; i++) {
    const start = route[i];
    const end = route[i + 1];
    for (let j = 0; j <= stepsPerSegment; j++) {
      const t = j / stepsPerSegment;
      points.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
      ]);
    }
  }
  return points;
}

function createIcon(html: string, size: [number, number] = [46, 46]) {
  return L.divIcon({
    html,
    className: 'custom-marker',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
  });
}

const tooltipOpts: L.TooltipOptions = {
  direction: 'top',
  offset: [0, -28],
  className: 'custom-tooltip',
  permanent: false,
};

export default function GISMap() {
  const { state, activeScenario, openImpactReport } = useSimulation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const activeIntervalsRef = useRef<number[]>([]);
  const activeTimeoutsRef = useRef<number[]>([]);

  // Initialize Map
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current, {
        center: activeScenario.map.center,
        zoom: activeScenario.map.zoom,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      routeLayerRef.current = L.layerGroup().addTo(map);

      mapInstance.current = map;
    }
  }, []);

  // Smooth camera pan to new scenario center
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.flyTo(activeScenario.map.center, activeScenario.map.zoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [activeScenario.id]);

  // Render Markers and Routes based on Scenario and Step
  useEffect(() => {
    // Clear any running animation intervals and timeouts from previous step
    activeIntervalsRef.current.forEach(window.clearInterval);
    activeIntervalsRef.current = [];
    activeTimeoutsRef.current.forEach(window.clearTimeout);
    activeTimeoutsRef.current = [];

    const layers = layerGroupRef.current;
    const routeLayers = routeLayerRef.current;
    if (!layers || !routeLayers) return;

    layers.clearLayers();
    routeLayers.clearLayers();

    const { map } = activeScenario;
    const haltIdx = map.primaryResponderHaltIndex ?? 10;
    const crashIdx = 13;
    const driveToIndex = map.primaryResponderDriveToIndex;

    // ── Primary Route Rendering ──
    if (state.step < 3) {
      // Step 0-2: Clear, open operational road
      L.polyline(map.primaryRoute.path, {
        color: '#e5e7eb',
        weight: 12,
        opacity: 0.8,
        lineCap: 'round',
      }).addTo(routeLayers);

      L.polyline(map.primaryRoute.path, {
        className: state.step === 2 ? 'animated-route' : undefined,
        color: '#3b82f6',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
      }).addTo(routeLayers);

      L.marker(map.primaryRoute.labelPosition, {
        icon: L.divIcon({
          html: `<div style="background:#eff6ff;color:#1d4ed8;border:2px solid #3b82f6;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:900;letter-spacing:0.8px;white-space:nowrap;font-family:monospace;box-shadow:0 4px 15px rgba(0,0,0,0.12)">${map.primaryRoute.label}</div>`,
          className: 'custom-marker',
          iconSize: [220, 32],
          iconAnchor: [110, 16],
        }),
      }).addTo(routeLayers);
    } else {
      // Step 3+: Route is fractured by the secondary incident!
      // 1. Traversed segment (Depot to Ambulance Halt position)
      const traversedPath = map.primaryRoute.path.slice(0, haltIdx + 1);
      L.polyline(traversedPath, {
        color: '#e2e8f0',
        weight: 12,
        opacity: 0.8,
        lineCap: 'round',
      }).addTo(routeLayers);

      L.polyline(traversedPath, {
        color: '#64748b',
        weight: 5,
        opacity: 0.85,
        lineCap: 'round',
      }).addTo(routeLayers);

      // 2. Caution Braking Buffer (Ambulance Halt to Crash Site ~40m)
      const bufferPath = map.primaryRoute.path.slice(haltIdx, crashIdx + 1);
      L.polyline(bufferPath, {
        color: '#f59e0b',
        weight: 6,
        opacity: 0.95,
        dashArray: '6 6',
        lineCap: 'round',
      }).addTo(routeLayers);

      // 3. Collision Blast Radius circle
      L.circle(map.blockingVehicle.crashPosition, {
        radius: 35,
        color: '#dc2626',
        weight: 2,
        fillColor: '#ef4444',
        fillOpacity: 0.25,
        dashArray: '4 4',
      }).addTo(routeLayers);

      // 4. Severed Road Segment (Crash site onward to destination)
      const severedPath = map.primaryRoute.path.slice(crashIdx);
      L.polyline(severedPath, {
        color: '#fee2e2',
        weight: 12,
        opacity: 0.7,
        lineCap: 'round',
      }).addTo(routeLayers);

      L.polyline(severedPath, {
        color: '#ef4444',
        weight: 5,
        opacity: 0.85,
        dashArray: '8 8',
        lineCap: 'round',
      }).addTo(routeLayers);

      // Route blocked label placed cleanly at route midpoint (never overlaps crash site or ambulance)
      L.marker(map.primaryRoute.labelPosition, {
        icon: L.divIcon({
          html: `<div style="background:#fee2e2;color:#dc2626;border:2px solid #ef4444;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:900;letter-spacing:0.8px;white-space:nowrap;font-family:monospace;box-shadow:0 4px 15px rgba(220,38,38,0.25)">${map.primaryRoute.blockedLabel}</div>`,
          className: 'custom-marker',
          iconSize: [240, 32],
          iconAnchor: [120, 16],
        }),
      }).addTo(routeLayers);
    }

    // ── Alternate Route (appears at step 4) ──
    if (state.step >= 4) {
      L.polyline(map.alternateRoute.path, {
        color: '#e5e7eb',
        weight: 12,
        opacity: 0.8,
        lineCap: 'round',
      }).addTo(routeLayers);

      L.polyline(map.alternateRoute.path, {
        className: 'animated-route',
        color: '#10b981',
        weight: 5,
        opacity: 1,
        lineCap: 'round',
        dashArray: '12 12',
      }).addTo(routeLayers);

      L.marker(map.alternateRoute.labelPosition, {
        icon: L.divIcon({
          html: `<div style="background:#ecfdf5;color:#047857;border:2px solid #10b981;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:900;letter-spacing:0.8px;white-space:nowrap;font-family:monospace;box-shadow:0 4px 15px rgba(0,0,0,0.12)">${map.alternateRoute.label}</div>`,
          className: 'custom-marker',
          iconSize: [220, 32],
          iconAnchor: [110, 16],
        }),
      }).addTo(routeLayers);
    }

    // ── Sectors (100% SVG Markers & Sonar Ripple) ──
    map.sectors.forEach(sector => {
      const isHazardActive = sector.isHazardZone && state.step >= 1;
      let sectorHtml = '';

      if (isHazardActive) {
        // High-tech multi-ring expanding sonar waves + SVG Hazard Triangle
        sectorHtml = `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;width:60px;height:60px">
            <div style="position:absolute;width:60px;height:60px;border-radius:50%;border:2.5px solid #ef4444;animation:sonar-ring 2s cubic-bezier(0,0.2,0.8,1) infinite;opacity:0.8"></div>
            <div style="position:absolute;width:90px;height:90px;border-radius:50%;border:1.5px solid #ef4444;animation:sonar-ring 2s cubic-bezier(0,0.2,0.8,1) 0.6s infinite;opacity:0.4"></div>
            <div style="width:46px;height:46px;border-radius:50%;background:#fef2f2;border:3px solid #ef4444;display:flex;align-items:center;justify-content:center;box-shadow:0 0 25px rgba(239,68,68,0.6);cursor:pointer;position:relative;z-index:10">
              ${getMarkerSvgHtml('hazard', '#dc2626', 22)}
            </div>
          </div>`;
      } else if (sector.isHazardZone) {
        sectorHtml = `
          <div style="width:42px;height:42px;border-radius:50%;background:white;border:2.5px solid #a8a29e;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,0.12);cursor:pointer">
            ${getMarkerSvgHtml(sector.iconType || 'shield', '#78716c', 20)}
          </div>`;
      } else {
        sectorHtml = `
          <div style="width:42px;height:42px;border-radius:50%;background:white;border:2.5px solid #10b981;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(16,185,129,0.25);cursor:pointer">
            ${getMarkerSvgHtml(sector.iconType || 'shield', '#059669', 20)}
          </div>`;
      }

      const itemsToShow = isHazardActive && sector.hazardTooltipItems
        ? sector.hazardTooltipItems
        : sector.tooltipItems;

      const titleColor = isHazardActive ? '#b91c1c' : '#78716c';
      const borderTop = isHazardActive ? '2px solid #fecaca' : '1px solid #e7e5e4';

      const tooltipContent = `
        <div style="font-family:'Outfit',sans-serif;min-width:240px">
          <div style="font-size:13px;font-weight:900;color:${titleColor};text-transform:uppercase;letter-spacing:1.5px;border-bottom:${borderTop};padding-bottom:8px;margin-bottom:10px">
            ${sector.label}
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${itemsToShow.map(item => `
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:${isHazardActive ? '#991b1b' : '#44403c'}">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:6px;background:${isHazardActive ? '#fee2e2' : '#f5f5f4'};flex-shrink:0">
                  ${getMarkerSvgHtml(isHazardActive ? 'hazard' : 'shield', isHazardActive ? '#dc2626' : '#78716c', 12)}
                </span>
                <span>${item}</span>
              </div>
            `).join('')}
            ${isHazardActive && sector.hazardFooter ? `<div style="font-size:12px;color:#dc2626;margin-top:4px;font-weight:600;display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#ef4444"></span>${sector.hazardFooter}</div>` : ''}
          </div>
        </div>`;

      L.marker(sector.position, { icon: createIcon(sectorHtml, [60, 60]) })
        .addTo(layers)
        .bindTooltip(tooltipContent, { ...tooltipOpts });
    });

    // ── Depot HQ (100% SVG) ──
    const depotIconHtml = `
      <div style="width:44px;height:44px;border-radius:50%;background:white;border:2.5px solid #6366f1;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(99,102,241,0.25);cursor:pointer">
        ${getMarkerSvgHtml(map.depot.iconType, '#4f46e5', 22)}
      </div>
    `;

    L.marker(map.depot.position, { icon: createIcon(depotIconHtml, [44, 44]) })
      .addTo(layers)
      .bindTooltip(`
        <div style="font-family:'Outfit',sans-serif;min-width:200px">
          <div style="font-size:13px;font-weight:900;color:#4f46e5;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">${map.depot.tooltipTitle}</div>
          <div style="font-size:14px;font-weight:600;color:#57534e">${map.depot.tooltipDescription}</div>
        </div>
      `, { ...tooltipOpts });

    // ── Blocking Vehicle / Collision / Incident Void ──
    if (state.step >= 3) {
      const crashIconHtml = `
        <div style="position:relative;width:62px;height:62px;display:flex;align-items:center;justify-content:center;cursor:pointer">
          <!-- Expanding impact shockwave -->
          <div class="animate-crash-shockwave" style="position:absolute;inset:0;border-radius:50%;background:#ef4444;opacity:0.6"></div>
          
          <!-- Jackknifed / overturned chassis with collision tilt -->
          <div class="animate-truck-crash" style="width:52px;height:52px;border-radius:50%;background:white;border:3px solid #dc2626;display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(220,38,38,0.75);position:relative;z-index:10">
            ${getMarkerSvgHtml(map.blockingVehicle.crashIconType, '#dc2626', 26)}
          </div>
          
          <!-- Incident site tag -->
          <div style="position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);background:#991b1b;color:white;font-size:9px;font-weight:900;padding:2px 7px;border-radius:4px;white-space:nowrap;letter-spacing:0.8px;font-family:monospace;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
            ${map.blockingVehicle.crashTag || 'INCIDENT // SEVERED'}
          </div>
        </div>
      `;

      L.marker(map.blockingVehicle.crashPosition, { icon: createIcon(crashIconHtml, [62, 62]) })
        .addTo(layers)
        .bindTooltip(`
          <div style="font-family:'Outfit',sans-serif;min-width:260px">
            <div style="font-size:13px;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">${map.blockingVehicle.crashTooltipTitle}</div>
            <div style="font-size:14px;font-weight:600;color:#991b1b">${map.blockingVehicle.crashTooltipDescription}</div>
          </div>
        `, { ...tooltipOpts });
    } else {
      const vehicleIconHtml = `
        <div style="width:42px;height:42px;border-radius:50%;background:white;border:2px solid #a8a29e;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,0.12);cursor:pointer">
          ${getMarkerSvgHtml(map.blockingVehicle.iconType, '#57534e', 22)}
        </div>
      `;

      L.marker(map.blockingVehicle.position, { icon: createIcon(vehicleIconHtml, [42, 42]) })
        .addTo(layers)
        .bindTooltip(`
          <div style="font-family:'Outfit',sans-serif;min-width:220px">
            <div style="font-size:13px;font-weight:900;color:#44403c;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">${map.blockingVehicle.tooltipTitle}</div>
            <div style="font-size:14px;font-weight:600;color:#57534e">${map.blockingVehicle.tooltipDescription}</div>
          </div>
        `, { ...tooltipOpts });
    }

    // ── Primary Responder (Ambulance 1) ──
    const haltPosition = map.primaryRoute.path[haltIdx];
    let pBorder = '#a8a29e';
    let pShadow = 'rgba(0,0,0,0.1)';
    let pStatus = `Standby at ${map.depot.label}`;
    let pColor = '#57534e';
    let pTag = '';

    if (state.step === 2) {
      pBorder = '#3b82f6';
      pShadow = 'rgba(59,130,246,0.4)';
      pStatus = `En route via ${map.primaryRoute.label}`;
      pColor = '#1d4ed8';
    } else if (state.step >= 3) {
      pBorder = '#f59e0b';
      pShadow = 'rgba(245,158,11,0.5)';
      pStatus = `⚠️ EMERGENCY BRAKE ENGAGED — Blocked 40m before wreckage`;
      pColor = '#b45309';
      pTag = `
        <div style="position:absolute;top:-26px;left:50%;transform:translateX(-50%);background:#92400e;color:white;font-size:9px;font-weight:900;padding:2px 8px;border-radius:5px;white-space:nowrap;letter-spacing:0.8px;font-family:monospace;box-shadow:0 3px 10px rgba(0,0,0,0.25);border:1px solid #fde68a">
          ⚠️ STOPPED (40m BUFFER)
        </div>
      `;
    }

    const pIconHtml = `
      <div style="position:relative;width:46px;height:46px;display:flex;align-items:center;justify-content:center;cursor:pointer">
        ${pTag}
        <div style="width:44px;height:44px;border-radius:50%;background:white;border:3px solid ${pBorder};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px ${pShadow};position:relative">
          ${state.step === 2 ? `<div style="position:absolute;top:-3px;right:-3px;width:10px;height:10px;border-radius:50%;background:#3b82f6;animation:ping 1s infinite"></div>` : ''}
          ${state.step >= 3 ? `<div class="animate-hazard-strobe" style="position:absolute;top:-4px;right:-4px;width:12px;height:12px;border-radius:50%;background:#f59e0b;box-shadow:0 0 10px #f59e0b"></div>` : ''}
          ${getMarkerSvgHtml(map.primaryResponder.iconType, pBorder, 22)}
        </div>
      </div>
    `;

    // Position setup:
    const initialPos = state.step >= 3 ? haltPosition : map.depot.position;
    const primaryMarker = L.marker(initialPos, { icon: createIcon(pIconHtml, [46, 46]) }).addTo(layers);

    if (state.step === 2) {
      // Step 2: Smooth drive from Depot up to driveToIndex (index 8)
      const driveEndIdx = driveToIndex + 1;
      const routeSlice = map.primaryRoute.path.slice(0, driveEndIdx);
      const interpolated = interpolateRoute(routeSlice, 30);
      let idx = 0;
      const iv = window.setInterval(() => {
        if (idx < interpolated.length) {
          primaryMarker.setLatLng(interpolated[idx]);
          idx++;
        } else {
          window.clearInterval(iv);
        }
      }, 25);
      activeIntervalsRef.current.push(iv);
    } else if (state.step >= 3) {
      // Step 3: Decelerate smoothly from driveToIndex (index 8) to haltPosition (index 10)
      const brakeSlice = map.primaryRoute.path.slice(driveToIndex, haltIdx + 1);
      const interpolatedBrake = interpolateRoute(brakeSlice, 20);
      let idxB = 0;
      const ivB = window.setInterval(() => {
        if (idxB < interpolatedBrake.length) {
          primaryMarker.setLatLng(interpolatedBrake[idxB]);
          idxB++;
        } else {
          primaryMarker.setLatLng(haltPosition);
          window.clearInterval(ivB);
        }
      }, 35);
      activeIntervalsRef.current.push(ivB);
    }

    primaryMarker.bindTooltip(`
      <div style="font-family:'Outfit',sans-serif;min-width:250px">
        <div style="font-size:13px;font-weight:900;color:${pColor};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">${map.primaryResponder.label}</div>
        <div style="font-size:14px;font-weight:600;color:${pColor}">${pStatus}</div>
      </div>
    `, { ...tooltipOpts });

    // ── Backup Responder (Ambulance 2 / Helicopter / Tunnel unit) ──
    const bBorder = state.step >= 4 ? '#10b981' : '#a8a29e';
    const bShadow = state.step >= 4 ? 'rgba(16,185,129,0.4)' : 'rgba(0,0,0,0.1)';
    const isBackupActive = state.step >= 4;

    const bIconHtml = `
      <div style="width:44px;height:44px;border-radius:50%;background:white;border:3px solid ${bBorder};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px ${bShadow};cursor:pointer;position:relative">
        ${isBackupActive ? `<div style="position:absolute;top:-3px;right:-3px;width:10px;height:10px;border-radius:50%;background:#10b981;animation:ping 1s infinite"></div>` : ''}
        ${getMarkerSvgHtml(map.backupResponder.iconType, bBorder, 22)}
      </div>
    `;

    const backupMarker = L.marker(map.depot.position, { icon: createIcon(bIconHtml, [44, 44]) }).addTo(layers);

    if (state.step >= 4) {
      // 10 points per segment = ~230 points total across the 24-point bypass route
      // At 20ms per step = ~4.6 seconds of smooth, continuous vehicle navigation
      const interpolatedAlt = interpolateRoute(map.alternateRoute.path, 10);
      let idx2 = 0;
      const iv2 = window.setInterval(() => {
        if (idx2 < interpolatedAlt.length) {
          backupMarker.setLatLng(interpolatedAlt[idx2]);
          idx2++;
        } else {
          window.clearInterval(iv2);
          backupMarker.setLatLng(interpolatedAlt[interpolatedAlt.length - 1]);
          // Once vehicle has arrived at destination and completed the rescue:
          // Wait 2.2 seconds for the user to observe arrival at Sector 4, then open report
          const to = window.setTimeout(() => {
            openImpactReport();
          }, 2200);
          activeTimeoutsRef.current.push(to);
        }
      }, 20);
      activeIntervalsRef.current.push(iv2);
    }

    const bStatus = state.step >= 4
      ? `Arrived via alternate route — Rescuing personnel`
      : `Standby at ${map.depot.label}`;
    const bColor = state.step >= 4 ? '#047857' : '#57534e';

    backupMarker.bindTooltip(`
      <div style="font-family:'Outfit',sans-serif;min-width:240px">
        <div style="font-size:13px;font-weight:900;color:${bColor};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">${map.backupResponder.label}</div>
        <div style="font-size:14px;font-weight:600;color:${bColor}">${bStatus}</div>
      </div>
    `, { ...tooltipOpts });

    return () => {
      activeIntervalsRef.current.forEach(window.clearInterval);
      activeIntervalsRef.current = [];
      activeTimeoutsRef.current.forEach(window.clearTimeout);
      activeTimeoutsRef.current = [];
    };
  }, [state.step, activeScenario.id]);

  const activeGuidedTooltip = activeScenario.map.guidedTooltips[state.step];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden font-mono text-stone-900 bg-stone-200">
      {/* Leaflet Map */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full z-0 rounded-2xl" />

      {/* Top Overlays */}
      <div className="absolute top-4 left-4 text-sm font-mono font-bold tracking-wider text-stone-800 bg-white/95 px-4 py-2 rounded-xl shadow-lg z-[1000] backdrop-blur-sm border border-white/60 pointer-events-none select-none">
        SYS.COORD // {activeScenario.location.lat.toFixed(4)}°N  {activeScenario.location.lng.toFixed(4)}°E
      </div>

      {/* ── LIVE SENSOR FEED (Appears on step >= 1 matching Screenshot 2 & PPT) ── */}
      {state.step >= 1 && (
        <SlopeDisplacementPanel />
      )}

      <div className="absolute top-4 right-4 text-sm font-mono font-bold tracking-wider text-stone-800 bg-white/95 px-4 py-2 rounded-xl shadow-lg z-[1000] backdrop-blur-sm border border-white/60 pointer-events-none select-none">
        {activeScenario.badge} // {activeScenario.location.district.toUpperCase()}
      </div>

      {/* Tactical Incident Status Banner (Top Center - matches Screenshot 2) */}
      {activeGuidedTooltip && !state.isProcessing && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 max-w-2xl bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-stone-200 animate-in slide-in-from-top-3 fade-in duration-300 z-[1000] select-none flex items-center gap-3.5">
          <div className={`flex items-center gap-2 uppercase tracking-wider text-sm font-black shrink-0 ${
            activeGuidedTooltip.type === 'success' ? 'text-emerald-700' : 'text-red-700'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${activeGuidedTooltip.type === 'success' ? 'bg-emerald-500' : 'bg-red-500 animate-ping'}`} />
            <div dangerouslySetInnerHTML={{ __html: getMarkerSvgHtml(activeGuidedTooltip.iconType, activeGuidedTooltip.type === 'success' ? '#059669' : '#dc2626', 18) }} />
            <span>{activeGuidedTooltip.title}</span>
          </div>
          <div className="h-4 w-px bg-stone-300 shrink-0" />
          <div className="text-sm text-stone-800 font-sans font-semibold truncate max-w-lg">
            {activeGuidedTooltip.text}
          </div>
        </div>
      )}
    </div>
  );
}
