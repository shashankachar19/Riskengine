import React, { useState } from 'react';
import ImplementationPlanPanel from './ImplementationPlanPanel';
import CommandLog from './CommandLog';
import { useSimulation } from '../store/SimContext';
import { Terminal, ShieldAlert } from 'lucide-react';

export default function RightSidebarResizable() {
  const { state } = useSimulation();
  const [activeTab, setActiveTab] = useState<'logs' | 'protocol'>('logs');

  return (
    <div
      id="right-sidebar-container"
      className="h-full w-full flex flex-col relative overflow-hidden bg-white font-sans text-stone-900 rounded-2xl select-none"
    >
      {/* Sleek MinEngine Tab Switcher Header */}
      <div className="flex-none px-4 py-2.5 bg-stone-50/90 border-b border-stone-200/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/50 rounded-xl">
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('protocol')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black tracking-wider uppercase transition-all duration-200 flex items-center gap-2 relative ${
              activeTab === 'protocol'
                ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />
            <span>Incident Protocol</span>
            {state.step >= 1 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
        </div>

        <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
          {state.siteStatus === 'NOMINAL' ? 'MONITORING' : `PHASE ${state.step + 1}/5`}
        </span>
      </div>

      {/* Main Content Area: Pure Full-Height Display */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {activeTab === 'logs' ? (
          <CommandLog />
        ) : (
          <ImplementationPlanPanel />
        )}
      </div>
    </div>
  );
}
