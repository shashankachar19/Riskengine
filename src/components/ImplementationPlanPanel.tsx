import { useState, useEffect } from 'react';
import { useSimulation } from '../store/SimContext';
import { ShieldAlert, Navigation, Clock, Loader, Activity, Wind, Droplet, Waves, CheckCircle2, FileBarChart, Gauge, Zap, TrendingDown } from 'lucide-react';

function TelemetrySparkline({ color, isAlert }: { color: string; isAlert: boolean }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % 40);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const points = [];
  for (let x = 0; x <= 120; x += 10) {
    const freq = isAlert ? 0.3 : 0.18;
    const amp = isAlert ? 6 : 3.5;
    const y = 10 + Math.sin((x + offset * 4) * freq) * amp;
    points.push(`${x},${y.toFixed(1)}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  return (
    <svg className="w-20 h-5 overflow-visible shrink-0 opacity-80" viewBox="0 0 120 20">
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ImplementationPlanPanel() {
  const { state, activeScenario, openImpactReport } = useSimulation();

  return (
    <div className="h-full w-full flex flex-col font-sans bg-white select-none">
      {/* Header */}
      <div className="flex-none px-5 py-3.5 flex items-center justify-between bg-stone-50/80 border-b border-stone-200/80 z-10">
        <div className="flex items-center gap-2.5">
          {state.step === 0 ? (
            <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-lg">
              <Activity className="w-4 h-4" />
            </div>
          ) : state.step === 4 ? (
            <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-1.5 bg-orange-100/70 text-orange-700 rounded-lg">
              <ShieldAlert className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-xs font-black tracking-widest uppercase text-stone-900">
            {state.step === 0
              ? 'SITE TELEMETRY & SENSORS'
              : state.step === 1
              ? 'CONTAINMENT PROTOCOL'
              : state.step === 2
              ? 'EXECUTION STATUS'
              : state.step === 3
              ? 'DYNAMIC REPLAN REQUIRED'
              : 'CRISIS CONTAINED SUMMARY'}
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
          PHASE {state.step + 1}/5
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-white">
        {/* STEP 0: Telemetry */}
        {state.step === 0 && (
          <div className="flex flex-col gap-3 font-mono">
            {(activeScenario.baselineTelemetry || activeScenario.telemetry).map((t, idx) => {
              const isAlert = t.status === 'elevated' || t.status === 'critical' || t.status === 'saturated';
              const cardBg = isAlert ? 'bg-red-50/40 border-red-200/60' : 'bg-emerald-50/40 border-emerald-200/60';
              const badgeBg = isAlert ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800 font-bold';
              const barColor = isAlert ? 'bg-red-600 animate-pulse' : 'bg-emerald-500';
              const strokeColor = isAlert ? '#dc2626' : '#10b981';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${cardBg}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                      {t.iconType === 'displacement' && <TrendingDown className="w-3.5 h-3.5 text-red-600 animate-pulse" />}
                      {t.iconType === 'piezometer' && <Droplet className="w-3.5 h-3.5 text-blue-500 animate-pulse" />}
                      {t.iconType === 'vibration' && <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
                      {t.iconType === 'discharge' && <Waves className="w-3.5 h-3.5 text-blue-600 animate-pulse" />}
                      {t.iconType === 'hydrostatic' && <Gauge className="w-3.5 h-3.5 text-blue-600" />}
                      {t.iconType === 'seismic' && <Activity className="w-3.5 h-3.5 text-red-600 animate-pulse" />}
                      {t.iconType === 'wind' && <Wind className="w-3.5 h-3.5 text-stone-500" />}
                      {t.iconType === 'moisture' && <Droplet className="w-3.5 h-3.5 text-blue-500" />}
                      {t.iconType === 'water_level' && <Waves className="w-3.5 h-3.5 text-blue-600" />}
                      {t.iconType === 'structural' && <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />}
                      {t.label}
                    </div>
                    <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase ${badgeBg}`}>
                      {t.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-lg font-black text-stone-900">{t.value}</div>
                    <TelemetrySparkline color={strokeColor} isAlert={isAlert} />
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${t.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 1: Emergency Plan Steps */}
        {state.step === 1 && (
          <div className="space-y-3 font-sans text-xs animate-in slide-in-from-right fade-in">
            {activeScenario.planPanel.planSteps.map((step, idx) => {
              const borderColors: Record<string, string> = {
                orange: 'border-l-orange-500',
                emerald: 'border-l-emerald-600',
                blue: 'border-l-blue-600',
                red: 'border-l-red-600',
              };
              const textColors: Record<string, string> = {
                orange: 'text-orange-700',
                emerald: 'text-emerald-700',
                blue: 'text-blue-700',
                red: 'text-red-700',
              };

              return (
                <div
                  key={idx}
                  className={`p-3.5 bg-stone-50/70 border border-stone-200/70 border-l-[5px] ${borderColors[step.color] || 'border-l-stone-500'} rounded-2xl transition-all duration-200`}
                >
                  <div className={`font-black text-xs flex items-center gap-1.5 mb-1 ${textColors[step.color] || 'text-stone-800'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{step.title}</span>
                  </div>
                  <p className="text-stone-600 font-medium leading-relaxed pl-5">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2: Execution Status */}
        {state.step === 2 && (
          <div className="flex flex-col items-center justify-center h-full text-stone-600 py-6 space-y-3 animate-in zoom-in fade-in">
            <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
            <div className="font-mono text-xs font-black tracking-widest text-center">
              {activeScenario.planPanel.executionMessage}
              <span className="text-emerald-700 mt-1.5 block text-[11px]">
                {activeScenario.planPanel.executionSubMessage}
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: Replan Required */}
        {state.step === 3 && (
          <div className="flex flex-col h-full animate-in slide-in-from-right fade-in">
            <div className="bg-red-50/70 border border-red-200 p-4 rounded-2xl flex-1 mb-2">
              <h4 className="text-xs font-black text-red-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                {activeScenario.planPanel.replanTitle}
              </h4>
              <p className="text-xs text-stone-700 font-sans font-medium leading-relaxed">
                {activeScenario.planPanel.replanDescription}
              </p>
              <div className="mt-3 pt-3 border-t border-red-200/60 text-[10px] font-mono text-red-800 font-bold uppercase tracking-wider">
                Click [ INITIATE DYNAMIC REPLANNING ] below to review and authorize.
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Incident Resolved */}
        {state.step >= 4 && (
          <div className="flex flex-col h-full animate-in slide-in-from-right fade-in space-y-3">
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl">
              <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Extraction Complete
              </h4>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                All {activeScenario.impactReport.exposedWorkers} exposed personnel secured via alternative vector. Zero casualties recorded.
              </p>
            </div>

            <button
              onClick={openImpactReport}
              className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs font-mono font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
            >
              <FileBarChart className="w-4 h-4 text-emerald-400" />
              <span>[ VIEW IMPACT REPORT ]</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
