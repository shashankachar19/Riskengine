import { useState, useEffect } from 'react';
import { useSimulation } from '../store/SimContext';
import { ALL_SCENARIOS } from '../scenarios';
import { ScenarioConfig } from '../scenarios/types';
import { Shield, ChevronRight, Compass, Radio, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeModal() {
  const { startMission, missionStarted, selectScenario, activeScenario } = useSimulation();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioConfig>(activeScenario);
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    if (!missionStarted) {
      setIsBooting(false);
      setBootStep(0);
    }
  }, [missionStarted]);

  useEffect(() => {
    setSelectedScenario(activeScenario);
  }, [activeScenario]);

  if (missionStarted) return null;

  const bootMessages = [
    'CALIBRATING GEOLOGICAL TELEMETRY...',
    'SYNCING AUTONOMOUS AGENT SWARM...',
    'CACHING HIGH-RESOLUTION SATELLITE TILES...',
    'INITIALIZING CRISIS COMMAND MATRIX...',
  ];

  const handleLaunch = () => {
    selectScenario(selectedScenario);
    setIsBooting(true);

    const interval = setInterval(() => {
      setBootStep((prev) => (prev < bootMessages.length - 1 ? prev + 1 : prev));
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      setIsBooting(false);
      startMission();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans bg-stone-900/60 backdrop-blur-sm select-none p-4">
      {/* Background image preview */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80"
        alt="Topographical Map"
        className="absolute inset-0 w-full h-full object-cover brightness-40 pointer-events-none"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-stone-900/50 pointer-events-none" />

      {/* Main Glass Card (Matches docs/welcome.png) */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[500px] bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.35)] border border-white/80 p-10 flex flex-col items-center text-center overflow-hidden"
      >
        {isBooting ? (
          <div className="flex flex-col items-center justify-center py-10 w-full">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500/40 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                <Compass className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-40 rounded-full animate-ping" />
            </div>

            <h2 className="text-xl font-black tracking-widest text-stone-900 uppercase mb-2">
              System Booting...
            </h2>
            <p className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest mb-6 h-5">
              {bootMessages[bootStep]}
            </p>

            <div className="w-60 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div className="h-full bg-emerald-500 rounded-full w-full animate-[progress_1.6s_ease-in-out_infinite] origin-left" />
            </div>

            <div className="mt-6 flex items-center gap-3 text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-stone-600">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                SENSORS: ACTIVE
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <Cpu className="w-3 h-3 text-emerald-600 animate-pulse" />
                AGENTS: READY
              </span>
            </div>

            <style>{`
              @keyframes progress {
                0% { transform: scaleX(0); }
                50% { transform: scaleX(0.7); }
                100% { transform: scaleX(1); }
              }
            `}</style>
          </div>
        ) : (
          <>
            {/* Soft Green Rounded Shield Icon (Directly from docs/welcome.png) */}
            <div className="mb-6 rounded-[1.5rem] bg-emerald-50/80 p-5 shadow-sm border border-emerald-100 flex items-center justify-center">
              <Shield className="w-12 h-12 text-emerald-600" strokeWidth={1.75} />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-stone-900 uppercase mb-1.5">
              MIN<span className="text-emerald-600">ENGINE.</span>
            </h1>

            <div className="text-[11px] font-bold tracking-[0.15em] text-stone-500 uppercase mb-6">
              AI Crisis Command for High-Risk Sites
            </div>

            {/* Core Protocol Box */}
            <div className="bg-stone-50/90 w-full p-5 rounded-2xl mb-6 border border-stone-200/80 flex flex-col items-center">
              <span className="text-emerald-700 font-mono text-[9px] font-black tracking-widest uppercase mb-1.5">
                Core Protocol
              </span>
              <p className="text-sm font-black tracking-widest uppercase text-stone-800 text-center leading-relaxed font-mono">
                Sense. Reason.<br />Coordinate. Respond.
              </p>
            </div>

            {/* Quick Scenario Selector Pills */}
            <div className="w-full mb-8">
              <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider mb-2 text-left px-1">
                Select Scenario:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ALL_SCENARIOS.map((s) => {
                  const isSelected = selectedScenario.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedScenario(s)}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50/90 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="font-bold text-stone-900 text-[11px] truncate block">
                        {s.id.includes('mine') ? '⛏️ Open Mine' : s.id.includes('flood') ? '🌊 Flash Flood' : '🚇 Metro TBM'}
                      </span>
                      <span className="text-[9px] text-stone-500 font-mono truncate block mt-0.5">
                        {s.location.district}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Mission Button (Identical to docs/welcome.png) */}
            <button
              onClick={handleLaunch}
              className="w-full py-4 px-6 bg-stone-900 hover:bg-black text-white rounded-2xl font-mono text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 group"
            >
              <span>[ START MISSION ]</span>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
