import { Clock, MapPin, ChevronDown, RotateCcw, Home } from 'lucide-react';
import { useSimulation } from '../store/SimContext';
import { ALL_SCENARIOS } from '../scenarios';
import { RiskEngineLogo } from './icons/SvgIcons';
import { useEffect, useState, useRef } from 'react';

function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-GB', { hour12: false }));
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <span className="font-mono text-xs tracking-widest text-stone-600 font-bold">{time}</span>;
}

export default function Header() {
  const { state, activeScenario, selectScenario, resetSimulation, returnToHome } = useSimulation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let statusClass = 'text-emerald-800 bg-emerald-50 border border-emerald-200/60';
  let dotColor = 'bg-emerald-600';

  if (state.siteStatus === 'INCIDENT' || state.siteStatus === 'SECONDARY_INCIDENT') {
    statusClass = 'text-red-800 bg-red-50 border border-red-200/60';
    dotColor = 'bg-red-600 animate-pulse';
  } else if (state.siteStatus === 'AWAITING_APPROVAL') {
    statusClass = 'text-orange-800 bg-orange-50 border border-orange-200/60';
    dotColor = 'bg-orange-600 animate-pulse';
  }

  return (
    <header className="h-16 flex items-center justify-between px-5 z-40 relative bg-transparent font-sans border-none select-none">
      {/* Left: Logo & Scenario Switcher */}
      <div className="flex items-center gap-3.5">
        <div className="p-2 bg-stone-900 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-stone-800 flex items-center justify-center">
          <RiskEngineLogo size={26} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-black tracking-tight leading-none uppercase text-stone-900">
              RISK<span className="text-emerald-700">ENGINE.</span>
            </h1>
            <span className="text-[9px] font-black tracking-widest uppercase bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md border border-stone-200">
              AI CRISIS COMMAND
            </span>
          </div>

          {/* Quick Scenario Switcher Dropdown */}
          <div className="relative mt-1" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-stone-600 hover:text-stone-900 tracking-wider uppercase transition-colors"
            >
              <span>{activeScenario.name}</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-stone-400 tracking-wider uppercase border-b border-stone-100">
                  Switch Scenario
                </div>
                {ALL_SCENARIOS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      selectScenario(s);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex flex-col gap-0.5 hover:bg-stone-50 transition-colors ${
                      activeScenario.id === s.id ? 'bg-emerald-50/60 text-emerald-950 font-bold' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{s.name}</span>
                      {activeScenario.id === s.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono tracking-tight">{s.location.district}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center: Agent Execution Status / System Status */}
      <div className={`flex items-center gap-3 px-5 py-2 rounded-2xl font-mono tracking-wider transition-all duration-500 max-w-lg ${statusClass}`}>
        {state.isProcessing ? (
          <>
            <svg className="animate-spin shrink-0 h-3.5 w-3.5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-[11px] font-black uppercase text-emerald-950 tracking-wider truncate">
              {state.processingMessage}
            </span>
          </>
        ) : (
          <>
            <div className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
            <span className="text-xs font-black uppercase truncate">
              {state.statusLabel}
            </span>
          </>
        )}
      </div>

      {/* Right: Location + Clock + Reset Action */}
      <div className="flex items-center gap-4 text-stone-600">
        <div className="hidden md:flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs font-mono font-bold tracking-wider">
            {activeScenario.location.lat.toFixed(2)}°N {activeScenario.location.lng.toFixed(2)}°E
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-stone-200 pl-4">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <LiveClock />
        </div>

        {/* Reset Simulation Button */}
        <button
          onClick={resetSimulation}
          title="Restart Current Scenario"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono font-bold tracking-wider transition-all border border-stone-200/80 active:scale-95"
        >
          <RotateCcw className="w-3 h-3 text-stone-500" />
          <span>RESET</span>
        </button>

        {/* Home Scenario Selection Button */}
        <button
          onClick={returnToHome}
          title="Return to Scenario Picker"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-wider transition-all border border-emerald-200 active:scale-95"
        >
          <Home className="w-3 h-3 text-emerald-600" />
          <span>HOME</span>
        </button>
      </div>
    </header>
  );
}
