import { useState, useEffect } from 'react';
import { useSimulation } from '../store/SimContext';
import { ALL_SCENARIOS } from '../scenarios';
import { ScenarioConfig } from '../scenarios/types';
import { Play, Shield, MapPin, AlertTriangle, Users, ChevronRight, Check, Compass, Radio, Activity, Cpu } from 'lucide-react';
import { RiskEngineLogo } from './icons/SvgIcons';
import { motion, AnimatePresence } from 'framer-motion';

// ── Animated Topographical Geological Background ──
function TopographicalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Warm Geological Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stone-300/20 rounded-full blur-[160px]" />

      {/* Geological Coordinate Dot Grid */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#b8b0a2_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Animated Topographical Elevation Isolines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35 animate-[topo-float_12s_ease-in-out_infinite]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 900"
        fill="none"
      >
        <path
          d="M-100,200 C300,100 600,350 900,180 C1200,50 1400,280 1800,220"
          stroke="#a8a29e"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path
          d="M-100,280 C320,160 580,420 920,240 C1220,110 1450,340 1800,300"
          stroke="#78716c"
          strokeWidth="1.5"
        />
        <path
          d="M-100,360 C350,240 620,490 950,320 C1250,180 1480,410 1800,370"
          stroke="#a8a29e"
          strokeWidth="1"
        />
        <path
          d="M-100,450 C380,330 650,560 980,400 C1280,260 1520,480 1800,440"
          stroke="#78716c"
          strokeWidth="1.5"
        />
        <path
          d="M-100,550 C400,420 700,640 1020,480 C1320,340 1560,560 1800,520"
          stroke="#a8a29e"
          strokeWidth="1"
          strokeDasharray="6 3"
        />
        <path
          d="M-100,650 C420,520 740,720 1060,570 C1360,420 1600,640 1800,600"
          stroke="#78716c"
          strokeWidth="1.4"
        />
        <path
          d="M-100,750 C450,620 780,800 1100,660 C1400,510 1640,730 1800,690"
          stroke="#a8a29e"
          strokeWidth="1.2"
        />

        {/* Contour Height Markers */}
        <text x="180" y="270" fill="#78716c" fontSize="10" fontFamily="monospace" fontWeight="bold">ELEV +1,240M</text>
        <text x="880" y="230" fill="#78716c" fontSize="10" fontFamily="monospace" fontWeight="bold">ELEV +1,180M</text>
        <text x="620" y="480" fill="#78716c" fontSize="10" fontFamily="monospace" fontWeight="bold">CONTOUR 950M</text>
        <text x="1350" y="400" fill="#78716c" fontSize="10" fontFamily="monospace" fontWeight="bold">BENCH REF // 04</text>
      </svg>

      {/* Rotating High-Tech Geological Radar in Top-Right Corner */}
      <div className="absolute top-12 right-12 w-64 h-64 rounded-full border border-stone-300/60 pointer-events-none opacity-40">
        <div className="absolute inset-4 rounded-full border border-dashed border-stone-300/60" />
        <div className="absolute inset-16 rounded-full border border-stone-300/40" />
        <div className="absolute inset-0 w-full h-full animate-[radar-sweep_12s_linear_infinite] origin-center flex items-center justify-center">
          <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-emerald-500/60 self-center origin-left translate-x-1/2" />
        </div>
      </div>

      {/* Technical Coordinate Stamps in Corners */}
      <div className="absolute top-6 left-8 font-mono text-[10px] text-stone-500 font-bold tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        <span>SYSTEM // RISKENGINE CRISIS OS v2.4</span>
      </div>
      <div className="absolute bottom-6 right-8 font-mono text-[10px] text-stone-500 font-bold tracking-widest uppercase">
        GEOLOGICAL TELEMETRY: REAL-TIME // HITL PROTOCOL READY
      </div>
    </div>
  );
}

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

    const stepInterval = setInterval(() => {
      setBootStep((prev) => (prev < bootMessages.length - 1 ? prev + 1 : prev));
    }, 450);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsBooting(false);
      startMission();
    }, 1900);
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'EXTREME':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto font-sans bg-[#F4F1EA] select-none p-4 md:p-8">
      {/* Dynamic Animated Geological Contour Background */}
      <TopographicalBackground />

      {/* Main Glass Modal with Premium Light Pinterest Styling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_90px_rgba(50,40,30,0.12)] border border-stone-200/90 p-8 md:p-12 overflow-hidden flex flex-col"
      >
        {isBooting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 w-full text-center"
          >
            {/* High-Tech Animated Radar Spinner */}
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full border-2 border-emerald-500/30 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                <Compass className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-ping" />
              <div className="absolute -inset-3 rounded-full border border-dashed border-emerald-500/40 animate-[spin_8s_linear_infinite_reverse]" />
            </div>

            <h2 className="text-2xl font-black tracking-widest text-stone-900 uppercase mb-2">
              INITIALIZING COMMAND CENTER...
            </h2>
            <p className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest mb-6 h-5">
              {bootMessages[bootStep]}
            </p>

            {/* Glowing Shimmer Progress Bar */}
            <div className="w-72 h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200 shadow-inner relative">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-[progress_1.8s_ease-in-out_infinite] origin-left" />
            </div>

            <div className="mt-6 flex items-center gap-4 text-[11px] font-mono text-stone-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-stone-600">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                SENSORS: ACTIVE
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <Cpu className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                AGENTS: READY
              </span>
            </div>

            <style>{`
              @keyframes progress {
                0% { transform: scaleX(0); }
                50% { transform: scaleX(0.75); }
                100% { transform: scaleX(1); }
              }
            `}</style>
          </motion.div>
        ) : (
          <>
            {/* Top Bar / Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex items-center gap-3.5 mb-2.5">
                <div className="p-2.5 bg-stone-900 rounded-2xl border border-stone-800 shadow-md flex items-center justify-center">
                  <RiskEngineLogo size={34} />
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900 uppercase">
                  RISK<span className="text-emerald-600">ENGINE.</span>
                </h1>
                <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-stone-100 text-stone-700 px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
                  CRISIS COMMAND PLATFORM
                </span>
              </div>
              <p className="text-sm font-medium text-stone-600 max-w-xl leading-relaxed">
                Autonomous multi-agent crisis orchestration for safety-critical operations. Select an operational scenario below to explore real-time reasoning and dynamic replanning.
              </p>
            </div>

            {/* Scenario Selection Grid (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {ALL_SCENARIOS.map((scenario) => {
                const isSelected = selectedScenario.id === scenario.id;

                return (
                  <motion.div
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    whileHover={{ y: -6, scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`relative rounded-3xl p-5 cursor-pointer transition-all duration-300 border flex flex-col justify-between select-none ${
                      isSelected
                        ? 'bg-gradient-to-b from-emerald-50/60 via-white to-white border-emerald-500 shadow-[0_20px_40px_rgba(16,185,129,0.18)] ring-2 ring-emerald-500/40 -translate-y-1'
                        : 'bg-white border-stone-200/90 hover:border-stone-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)]'
                    }`}
                  >
                    {/* Selected Badge with Spring Entry */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="absolute top-4 right-4 w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      {/* Risk Level Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase border flex items-center gap-1.5 ${getRiskBadgeColor(scenario.riskLevel)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${scenario.riskLevel === 'CRITICAL' ? 'bg-red-500 animate-pulse' : scenario.riskLevel === 'EXTREME' ? 'bg-purple-600 animate-pulse' : 'bg-amber-500'}`} />
                          {scenario.riskLevel} RISK
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
                          {scenario.location.type.split(' ')[0]}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-base font-black text-stone-900 tracking-tight leading-snug mb-1">
                        {scenario.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-3">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{scenario.location.district}</span>
                      </div>

                      {/* Hazard Type Box */}
                      <div className="bg-stone-50/90 p-3.5 rounded-2xl border border-stone-200/70 mb-3 group-hover:bg-stone-100/70 transition-colors">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-600 uppercase mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Primary Hazard</span>
                        </div>
                        <p className="text-xs font-bold text-stone-800 leading-snug">
                          {scenario.hazardType}
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-sans">
                        {scenario.description}
                      </p>
                    </div>

                    {/* Card Footer: Telemetry & Coordinates */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono font-bold text-stone-500">
                      <span>{scenario.location.lat.toFixed(2)}°N {scenario.location.lng.toFixed(2)}°E</span>
                      <span className="flex items-center gap-1 text-stone-700">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        {scenario.impactReport.totalWorkers} Personnel
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Launch Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-stone-200/80">
              <div className="text-xs text-stone-500 font-medium">
                Active Selection:{' '}
                <strong className="text-stone-900 font-bold uppercase">{selectedScenario.name}</strong>{' '}
                <span className="text-stone-400">({selectedScenario.location.district})</span>
              </div>

              <button
                onClick={handleLaunch}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-mono text-xs tracking-widest font-black uppercase rounded-2xl shadow-[0_15px_35px_rgba(16,185,129,0.35)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.45)] transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group cursor-pointer"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:animate-[shimmer-sweep_1.5s_infinite]" />

                <Play className="w-4 h-4 fill-currentColor" />
                <span>[ INITIALIZE SIMULATION SESSION ]</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
