import React, { useState, useEffect } from 'react';
import { useSimulation } from '../store/SimContext';
import {
  TrendingDown,
  Droplet,
  Zap,
  Waves,
  Gauge,
  Activity,
  Wind,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Radio,
  Compass,
  AlertTriangle,
  Layers,
} from 'lucide-react';

// Domain-Specific Specialized Waveform
function ScenarioSparkline({
  type,
  color,
  isAlert,
}: {
  type: 'mine' | 'flood' | 'construction';
  color: string;
  isAlert: boolean;
}) {
  if (type === 'flood') {
    // Undulating hydrograph wave
    const wavePath = isAlert
      ? 'M0,14 Q10,4 20,14 T40,14 T60,14 T80,14'
      : 'M0,12 Q10,8 20,12 T40,12 T60,12 T80,12';
    return (
      <svg className="w-16 h-5 overflow-visible" viewBox="0 0 80 24">
        <path
          d={wavePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="80"
          cy={isAlert ? '14' : '12'}
          r="3"
          fill={color}
          className={isAlert ? 'animate-ping' : undefined}
        />
      </svg>
    );
  }

  if (type === 'construction') {
    // Stepped geotechnical subsidence / piezometric pressure signal
    const stepPoints = isAlert
      ? '0,20 12,20 12,14 26,14 26,8 42,8 42,4 58,4 58,16 72,16 72,2 80,2'
      : '0,14 16,14 16,12 34,12 34,14 52,14 52,11 70,11 70,12 80,12';
    return (
      <svg className="w-16 h-5 overflow-visible" viewBox="0 0 80 24">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={stepPoints}
        />
        <circle
          cx="80"
          cy={isAlert ? '2' : '12'}
          r="3"
          fill={color}
          className={isAlert ? 'animate-ping' : undefined}
        />
      </svg>
    );
  }

  // Default: Mining seismic / SSR radar high-frequency vibration
  const points = isAlert
    ? '0,18 8,14 16,19 24,10 32,22 40,6 48,16 56,4 64,18 72,2 80,14'
    : '0,14 10,12 20,15 30,11 40,14 50,12 60,13 70,11 80,12';

  return (
    <svg className="w-16 h-5 overflow-visible" viewBox="0 0 80 24">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle
        cx="80"
        cy={isAlert ? '14' : '12'}
        r="3"
        fill={color}
        className={isAlert ? 'animate-ping' : undefined}
      />
    </svg>
  );
}

export default function MapTelemetryHUD() {
  const { activeScenario, state } = useSimulation();
  const [collapsed, setCollapsed] = useState(false);
  const [jitter, setJitter] = useState(0);

  const scenarioType: 'mine' | 'flood' | 'construction' =
    activeScenario.id.includes('flood')
      ? 'flood'
      : activeScenario.id.includes('metro') || activeScenario.id.includes('construction')
      ? 'construction'
      : 'mine';

  // Periodic micro-fluctuation to simulate live real-time sensor downlink
  useEffect(() => {
    const interval = window.setInterval(() => {
      setJitter((prev) => (prev + 1) % 6);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  // Compute live fluctuating values
  const getLiveReading = (baseValue: string, idx: number) => {
    const match = baseValue.match(/^([\d,.]+)(\s*.*)$/);
    if (!match) return baseValue;
    const numPart = parseFloat(match[1].replace(/,/g, ''));
    const unitPart = match[2];

    const deltas = [-0.2, 0.1, -0.1, 0.3, 0.0, -0.3];
    const offset = deltas[(jitter + idx) % deltas.length];
    const updated = Math.max(0, numPart + offset);

    const formatted = baseValue.includes('.')
      ? updated.toFixed(1)
      : Math.round(updated).toLocaleString();
    return `${formatted}${unitPart}`;
  };

  // Domain-Specific Theme Config
  const getThemeConfig = () => {
    switch (scenarioType) {
      case 'flood':
        return {
          headerBg: 'bg-slate-900 border-cyan-800/80',
          headerTitle: 'HYDRO-SURGE // TEESTA-III',
          headerSub: 'SOUTH LHONAK BASIN INUNDATION',
          beaconColor: 'bg-cyan-400',
          accentText: 'text-cyan-400',
          chipText: 'HYDRO TELEMETRY',
          auxLabel: 'RESERVOIR FREEBOARD',
          auxValue: '2.7m to Crest (1,425m)',
          auxSub: 'OVERTOPPING ALERT LEVEL 4',
          auxColor: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
        };
      case 'construction':
        return {
          headerBg: 'bg-zinc-900 border-purple-800/80',
          headerTitle: 'TBM VARADA // BMRCL PINK',
          headerSub: 'SUB-SURFACE CAVITY & SUBSIDENCE',
          beaconColor: 'bg-purple-400',
          accentText: 'text-purple-400',
          chipText: 'TBM TELEMETRY',
          auxLabel: 'TUNNEL DEPTH // INGRESS',
          auxValue: '-28.4m // 18.6 bar breach',
          auxSub: 'SURFACE SETTLEMENT: 28.5mm (>15mm)',
          auxColor: 'bg-purple-950/40 border-purple-500/30 text-purple-300',
        };
      case 'mine':
      default:
        return {
          headerBg: 'bg-stone-900 border-amber-800/80',
          headerTitle: 'SSR-XT RADAR // BENCH 04',
          headerSub: 'GROUNDPROBE INTERFEROMETRIC',
          beaconColor: 'bg-amber-400',
          accentText: 'text-amber-400',
          chipText: 'RADAR TELEMETRY',
          auxLabel: 'FACTOR OF SAFETY (FoS)',
          auxValue: '0.84 (Threshold: 1.30)',
          auxSub: 'BENCH SHEAR SLIP DETECTED',
          auxColor: 'bg-amber-950/40 border-amber-500/30 text-amber-300',
        };
    }
  };

  const theme = getThemeConfig();

  // Status message based on current simulation step
  const getThresholdStatus = () => {
    switch (state.step) {
      case 0:
        return { text: 'BASELINE MONITORING // STABLE', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 1:
        return { text: 'CRITICAL THRESHOLD EXCEEDED // EVACUATION', color: 'text-red-700 bg-red-50 border-red-200 animate-pulse' };
      case 2:
        return { text: 'PRIMARY VECTOR DISPATCH TRACKED', color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 3:
        return { text: 'SECONDARY INCIDENT // BYPASS ENGAGED', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 4:
        return { text: 'MISSION CONTAINED // RECOVERY STABILIZED', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      default:
        return { text: 'TELEMETRY STREAM NOMINAL', color: 'text-stone-700 bg-stone-50 border-stone-200' };
    }
  };

  const status = getThresholdStatus();

  return (
    <div className="absolute top-16 left-4 z-[1000] select-none transition-all duration-300">
      {collapsed ? (
        // Collapsed Floating Chip
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-lg text-stone-700 hover:text-stone-900 hover:bg-white transition-all cursor-pointer font-mono text-[11px] font-bold"
        >
          <span className={`w-2 h-2 rounded-full ${theme.beaconColor} animate-pulse`} />
          <span>{theme.chipText} [{activeScenario.telemetry.length} SENSORS]</span>
          <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
        </button>
      ) : (
        // Full Domain-Authentic Tactical HUD Card
        <div className="w-76 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-stone-200/90 overflow-hidden font-mono animate-in fade-in duration-300">
          {/* Header */}
          <div className={`px-3.5 py-2.5 ${theme.headerBg} text-stone-100 flex items-center justify-between border-b`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.beaconColor} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.beaconColor}`} />
                </span>
                <span className={`text-[10px] font-black tracking-widest uppercase ${theme.accentText}`}>
                  {theme.headerTitle}
                </span>
              </div>
              <div className="text-[9px] text-stone-400 tracking-wider font-sans mt-0.5 ml-4">
                {theme.headerSub}
              </div>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
              title="Minimize Telemetry HUD"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Domain-Specific Specialized Gauge Bar */}
          <div className="px-3 pt-2.5 pb-1 bg-stone-100/70 border-b border-stone-200/70">
            <div className={`p-2 rounded-xl border text-[10px] font-bold ${theme.auxColor}`}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="tracking-wider uppercase text-[9px] opacity-80">{theme.auxLabel}</span>
                <span className="font-black text-red-600 animate-pulse text-[10px] uppercase">
                  {state.step >= 1 ? 'CRITICAL' : 'NOMINAL'}
                </span>
              </div>
              <div className="text-xs font-black tracking-tight">{theme.auxValue}</div>
              <div className="text-[9px] opacity-75 mt-0.5">{theme.auxSub}</div>
            </div>
          </div>

          {/* Scenario Telemetry Readings List */}
          <div className="p-3 space-y-2 bg-white/70">
            {activeScenario.telemetry.map((t, idx) => {
              const isAlert =
                t.status === 'elevated' ||
                t.status === 'critical' ||
                t.status === 'saturated';
              const strokeColor = isAlert ? '#dc2626' : '#059669';
              const liveVal = getLiveReading(t.value, idx);

              return (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-stone-50/90 border border-stone-200/60 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600 truncate">
                      {t.iconType === 'displacement' && (
                        <TrendingDown className="w-3 h-3 text-red-600 animate-pulse shrink-0" />
                      )}
                      {t.iconType === 'piezometer' && (
                        <Droplet className="w-3 h-3 text-blue-500 shrink-0" />
                      )}
                      {t.iconType === 'vibration' && (
                        <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                      )}
                      {t.iconType === 'discharge' && (
                        <Waves className="w-3 h-3 text-cyan-600 animate-pulse shrink-0" />
                      )}
                      {t.iconType === 'hydrostatic' && (
                        <Gauge className="w-3 h-3 text-purple-600 shrink-0" />
                      )}
                      {t.iconType === 'seismic' && (
                        <Activity className="w-3 h-3 text-red-600 shrink-0" />
                      )}
                      {t.iconType === 'wind' && (
                        <Wind className="w-3 h-3 text-stone-500 shrink-0" />
                      )}
                      {t.iconType === 'moisture' && (
                        <Droplet className="w-3 h-3 text-blue-500 shrink-0" />
                      )}
                      {t.iconType === 'water_level' && (
                        <Waves className="w-3 h-3 text-cyan-600 shrink-0" />
                      )}
                      {t.iconType === 'structural' && (
                        <ShieldAlert className="w-3 h-3 text-orange-600 shrink-0" />
                      )}
                      <span className="truncate">{t.label}</span>
                    </div>
                    <span
                      className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                        isAlert
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-stone-900 tracking-tight">
                      {liveVal}
                    </span>
                    <ScenarioSparkline
                      type={scenarioType}
                      color={strokeColor}
                      isAlert={isAlert}
                    />
                  </div>

                  <div className="w-full h-1 bg-stone-200/80 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAlert ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${t.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Status Footer */}
          <div className="px-3 py-2 bg-stone-50 border-t border-stone-200/80">
            <div
              className={`text-[9px] font-bold px-2 py-1 rounded-lg border flex items-center justify-center gap-1.5 text-center ${status.color}`}
            >
              <Radio className="w-3 h-3 shrink-0" />
              <span className="truncate">{status.text}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
