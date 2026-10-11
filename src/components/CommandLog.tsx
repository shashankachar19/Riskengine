import { useEffect, useRef } from 'react';
import { useSimulation } from '../store/SimContext';
import { Terminal } from 'lucide-react';

function EqualizerVisualizer({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-1 h-3.5 px-1 py-0.5">
      <span className={`w-1 rounded-full bg-emerald-500 ${active ? 'animate-[eq-bar-1_0.8s_ease-in-out_infinite]' : 'h-1.5'}`} />
      <span className={`w-1 rounded-full bg-emerald-600 ${active ? 'animate-[eq-bar-2_0.6s_ease-in-out_infinite]' : 'h-2.5'}`} />
      <span className={`w-1 rounded-full bg-emerald-500 ${active ? 'animate-[eq-bar-3_0.9s_ease-in-out_infinite]' : 'h-2'}`} />
      <span className={`w-1 rounded-full bg-emerald-600 ${active ? 'animate-[eq-bar-4_0.7s_ease-in-out_infinite]' : 'h-3'}`} />
    </div>
  );
}

export default function CommandLog() {
  const { visibleLogs, state } = useSimulation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  return (
    <div className="h-full flex flex-col font-mono bg-transparent text-stone-600 min-h-0">
      <div className="flex-none px-6 py-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/90 z-10">
        <h2 className="text-sm font-black tracking-widest text-stone-900 flex items-center gap-2.5 uppercase">
          <Terminal className="w-4.5 h-4.5 text-emerald-700" />
          <span>AI Engine Logs</span>
          <EqualizerVisualizer active={state.isProcessing} />
        </h2>
        <span className="text-xs text-stone-500 font-bold tracking-widest uppercase">
          {state.isProcessing ? 'PROCESSING...' : `${visibleLogs.length} EVENTS`}
        </span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto min-h-0 relative p-4 custom-scrollbar bg-white">
        <div className="space-y-3.5">
          {visibleLogs.map(log => {
            let textColor = 'text-stone-700';
            let tagColor = 'bg-stone-100 text-stone-600 border border-stone-200';
            let borderColor = 'border-stone-300';

            if (log.level === 'system') {
              textColor = 'text-stone-700';
              borderColor = 'border-stone-300';
            } else if (log.level === 'perception') {
              textColor = 'text-cyan-900';
              tagColor = 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-sm';
              borderColor = 'border-cyan-500';
            } else if (log.level === 'risk') {
              textColor = 'text-red-900';
              tagColor = 'bg-red-50 text-red-800 border border-red-200 shadow-sm';
              borderColor = 'border-red-500';
            } else if (log.level === 'routing') {
              textColor = 'text-blue-900';
              tagColor = 'bg-blue-50 text-blue-800 border border-blue-200 shadow-sm';
              borderColor = 'border-blue-500';
            } else if (log.level === 'resource') {
              textColor = 'text-emerald-900';
              tagColor = 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm';
              borderColor = 'border-emerald-500';
            } else if (log.level === 'command') {
              textColor = 'text-purple-900';
              tagColor = 'bg-purple-50 text-purple-800 border border-purple-200 shadow-sm';
              borderColor = 'border-purple-500';
            }

            return (
              <div key={log.id} className={`p-4 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 leading-relaxed flex gap-3.5 animate-in slide-in-from-bottom-2 fade-in duration-300 group cursor-default border-l-[6px] border-y border-r border-y-stone-100 border-r-stone-100 ${borderColor}`}>
                <span className="text-stone-400 shrink-0 mt-1 text-xs font-mono font-bold group-hover:text-stone-700 transition-colors">{log.timestamp}</span>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-3.5 py-1 rounded-lg text-xs font-mono font-black tracking-wider mb-2 uppercase ${tagColor}`}>
                    {log.source}
                  </span>
                  <div className={`${textColor} text-base font-semibold leading-relaxed font-mono`}>{log.message}</div>
                </div>
              </div>
            );
          })}
          
          {/* High-Tech Animated Processing Indicator */}
          {state.isProcessing && (
             <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 shadow-sm flex items-center gap-3 animate-in fade-in duration-300">
                <EqualizerVisualizer active={true} />
                <div className="flex-1 min-w-0">
                   <div className="text-emerald-800 text-sm font-mono font-bold flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                     <span className="truncate">{state.processingMessage || 'AI Swarm Coordinator evaluating options...'}</span>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
