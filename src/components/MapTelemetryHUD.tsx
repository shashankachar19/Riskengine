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
  ChevronUp,
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

  const isIncident = state.step >= 1;

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

    const deltas = [-0.1, 0.1, 0.0, 0.2, -0.1, 0.0];
    const offset = deltas[(jitter + idx) % deltas.length];
    const updated = Math.max(0, numPart + offset);

    const formatted = baseValue.includes('.')
      ? updated.toFixed(1)
      : Math.round(updated).toLocaleString();
    return `${formatted}${unitPart}`;
  };

  // Domain-Specific Theme Config with dynamic nominal vs crisis state
  const getThemeConfig = () => {
    switch (scenarioType) {
      case 'flood':
        return {
          headerBg: 'bg-slate-900 border-cyan-800/80',
          headerTitle: 'HYDRO-SURGE // TEESTA-III',
          headerSub: 'SOUTH LHONAK BASIN INUNDATION',
          beaconColor: isIncident ? 'bg-red-400' : 'bg-cyan-400',
          accentText: 'text-cyan-400',
          chipText: 'HYDRO TELEMETRY',
          auxLabel: 'RESERVOIR FREEBOARD',
          auxStatus: isIncident ? 'CRITICAL' : 'NOMINAL',
          auxValue: isIncident ? '0.4m to Crest (1,425m)' : '8.5m to Crest (1,425m)',
          auxSub: isIncident ? 'OVERTOPPING ALERT LEVEL 4' : 'RESERVOIR POOL LEVEL NORMAL',
          auxColor: isIncident
            ? 'bg-red-950/40 border-red-500/30 text-red-300'
            : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
        };
      case 'construction':
        return {
          headerBg: 'bg-zinc-900 border-purple-800/80',
          headerTitle: 'TBM VARADA // BMRCL PINK',
          headerSub: 'SUB-SURFACE CAVITY & SUBSIDENCE',
          beaconColor: isIncident ? 'bg-red-400' : 'bg-purple-400',
          accentText: 'text-purple-400',
          chipText: 'TBM TELEMETRY',
          auxLabel: 'TUNNEL DEPTH // INGRESS',
          auxStatus: isIncident ? 'CRITICAL' : 'NOMINAL',
          auxValue: isIncident ? '-28.4m // 18.6 bar breach' : '-28.4m // 1.8 bar balance',
          auxSub: isIncident ? 'SURFACE SETTLEMENT: 28.5mm (>15mm)' : 'SURFACE SETTLEMENT: 1.2mm (< 15mm)',
          auxColor: isIncident
            ? 'bg-red-950/40 border-red-500/30 text-red-300'
            : 'bg-purple-950/40 border-purple-500/30 text-purple-300',
        };
      case 'mine':
      default:
        return {
          headerBg: 'bg-stone-900 border-amber-800/80',
          headerTitle: 'SSR-XT RADAR // BENCH 04',
          headerSub: 'GROUNDPROBE INTERFEROMETRIC',
          beaconColor: isIncident ? 'bg-red-400' : 'bg-amber-400',
          accentText: 'text-amber-400',
          chipText: 'RADAR TELEMETRY',
          auxLabel: 'FACTOR OF SAFETY (FoS)',
          auxStatus: isIncident ? 'CRITICAL' : 'NOMINAL',
          auxValue: isIncident ? '0.84 (Threshold: 1.30)' : '1.52 (Threshold: 1.30)',
          auxSub: isIncident ? 'BENCH RADAR SLIP DETECTED' : 'BENCH FACE STABLE // RADAR CREEP NORMAL',
          auxColor: isIncident
            ? 'bg-red-950/40 border-red-500/30 text-red-300'
            : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
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

  // Pick realistic telemetry based on whether hazard has been injected
  const currentTelemetry = state.step === 0
    ? (activeScenario.baselineTelemetry || activeScenario.telemetry)
    : (activeScenario.crisisTelemetry || activeScenario.telemetry);

  return (
    <div className="absolute top-16 left-4 z-[1000] select-none transition-all duration-300">
      {collapsed ? (
        // Collapsed Floating Chip
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-lg text-stone-700 hover:text-stone-900 hover:bg-white transition-all cursor-pointer font-mono text-[11px] font-bold"
        >
          <span className={`w-2 h-2 rounded-full ${theme.beaconColor} animate-pulse`} />
          <span className="uppercase tracking-wider">{theme.chipText}</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-black ${isIncident ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {theme.auxStatus}
          </span>
        </button>
      ) : (
        // Full Tactical HUD Card
        <div className="w-80 rounded-2xl bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden font-mono text-stone-900 animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className={`px-4 py-3 border-b flex items-center justify-between ${theme.headerBg} text-white`}>
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${theme.beaconColor} animate-pulse`} />
                <span className="text-xs font-black tracking-wider uppercase">
                  {theme.headerTitle}
                </span>
              </div>
              <div className="text-[9px] text-stone-400 font-mono tracking-widest mt-0.5">
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
                <span className={`font-black text-[10px] uppercase ${isIncident ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
                  {theme.auxStatus}
                </span>
              </div>
              <div className="text-xs font-black tracking-tight">{theme.auxValue}</div>
              <div className="text-[9px] opacity-75 mt-0.5">{theme.auxSub}</div>
            </div>
          </div>

          {/* Scenario Telemetry Readings List */}
          <div className="p-3 space-y-2 bg-white/70">
            {currentTelemetry.map((t, idx) => {
              const isAlert =
                t.status === 'elevated' ||
                t.status === 'critical' ||
                t.status === 'saturated';
              const strokeColor = isAlert ? '#dc2626' : '#10b981';
              const liveVal = getLiveReading(t.value, idx);

              return (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-stone-50/90 border border-stone-200/60 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600 truncate">
                      {t.iconType === 'displacement' && (
                        <TrendingDown className={`w-3 h-3 shrink-0 ${isAlert ? 'text-red-600 animate-pulse' : 'text-emerald-600'}`} />
                      )}
                      {t.iconType === 'piezometer' && (
                        <Droplet className={`w-3 h-3 shrink-0 ${isAlert ? 'text-blue-500 animate-pulse' : 'text-blue-500'}`} />
                      )}
                      {t.iconType === 'vibration' && (
                        <Zap className={`w-3 h-3 shrink-0 ${isAlert ? 'text-amber-500 animate-pulse' : 'text-amber-500'}`} />
                      )}
                      {t.iconType === 'discharge' && (
                        <Waves className={`w-3 h-3 shrink-0 ${isAlert ? 'text-cyan-600 animate-pulse' : 'text-cyan-600'}`} />
                      )}
                      {t.iconType === 'hydrostatic' && (
                        <Gauge className="w-3 h-3 text-purple-600 shrink-0" />
                      )}
                      {t.iconType === 'seismic' && (
                        <Activity className={`w-3 h-3 shrink-0 ${isAlert ? 'text-red-600 animate-pulse' : 'text-emerald-600'}`} />
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

                  {/* Linear Progress Bar */}
                  <div className="w-full h-1 bg-stone-200/60 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAlert ? 'bg-red-600' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${t.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Status Pill */}
          <div className="px-3 py-2 bg-stone-50 border-t border-stone-200/60 flex items-center justify-between">
            <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${status.color}`}>
              {status.text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
