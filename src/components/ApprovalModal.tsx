import { useSimulation } from '../store/SimContext';
import { ArrowRight, ShieldAlert, X } from 'lucide-react';

export default function ApprovalModal() {
  const { state, activeScenario, approveAndResolve, closeApprovalModal } = useSimulation();

  if (!state.showApprovalModal) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center font-sans select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeApprovalModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-stone-200 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="bg-stone-50 px-6 py-4.5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-700 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight uppercase text-stone-900">
                Human-in-the-Loop Override
              </h2>
              <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                AUTHORIZATION PROTOCOL // HITL-409
              </span>
            </div>
          </div>
          <button
            onClick={closeApprovalModal}
            className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white space-y-4">
          <div className="border border-red-200 bg-red-50/70 p-5 rounded-2xl">
            <h3 className="text-sm font-black text-red-700 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              {activeScenario.planPanel.replanTitle}
            </h3>
            <p className="text-sm text-stone-800 font-sans font-semibold leading-relaxed">
              {activeScenario.planPanel.replanDescription}
            </p>
          </div>

          <div className="text-sm text-stone-600 font-sans leading-relaxed">
            By authorizing, you approve the AI coordinator to override the initial route, seize dispatch telemetry, and deploy backup responders via the alternate vector.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4.5 border-t border-stone-200/80 flex items-center justify-end gap-3.5">
          <button
            onClick={closeApprovalModal}
            className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-mono font-bold tracking-wider uppercase transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              closeApprovalModal();
              approveAndResolve();
            }}
            className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-black text-sm tracking-widest uppercase flex items-center gap-2 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>[ AUTHORIZE REPLAN ]</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
