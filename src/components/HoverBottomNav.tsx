import { useSimulation } from '../store/SimContext';
import { Terminal, AlertTriangle, ShieldAlert, Cpu, ShieldCheck, Loader, Info } from 'lucide-react';

export default function HoverBottomNav() {
  const { state, activeScenario, goToStep, missionStarted, openApprovalModal, openImpactReport, returnToHome } = useSimulation();

  if (!missionStarted) return null;

  const currentStepConfig = activeScenario.steps[state.step] || activeScenario.steps[0];

  let icon = null;
  let action = () => {};
  let textClass = 'text-stone-900';
  let buttonClass = 'bg-stone-100 hover:bg-stone-200 text-stone-900';

  switch (state.step) {
    case 0:
      icon = <Terminal className="w-5 h-5 text-emerald-700" />;
      buttonClass = 'bg-emerald-600 hover:bg-emerald-700 text-white animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.5)]';
      action = () => goToStep(1);
      break;
    case 1:
      icon = <AlertTriangle className="w-5 h-5 text-red-600" />;
      textClass = 'text-red-700 font-bold';
      buttonClass = 'bg-red-600 hover:bg-red-700 text-white font-black animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.5)]';
      action = () => goToStep(2);
      break;
    case 2:
      icon = <ShieldAlert className="w-5 h-5 text-orange-600" />;
      textClass = 'text-orange-700 font-bold';
      buttonClass = 'bg-orange-600 hover:bg-orange-700 text-white font-black animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-orange-500/30 shadow-[0_0_25px_rgba(234,88,12,0.5)]';
      action = () => goToStep(3);
      break;
    case 3:
      icon = <Cpu className="w-5 h-5 text-red-600" />;
      textClass = 'text-red-700 font-bold';
      buttonClass = 'bg-red-600 hover:bg-red-700 text-white font-black animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.5)]';
      action = () => openApprovalModal();
      break;
    case 4:
      icon = <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      textClass = 'text-emerald-800 font-bold';
      buttonClass = 'bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer ring-4 ring-emerald-500/20';
      action = () => openImpactReport();
      break;
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-6 py-3.5 rounded-2xl border border-stone-200/90 backdrop-blur-xl bg-white/95 shadow-[0_16px_40px_rgba(0,0,0,0.14)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 w-[92%] max-w-4xl select-none">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div className="shrink-0 p-2.5 rounded-xl bg-stone-50 border border-stone-100 shadow-sm">
          {icon}
        </div>
        <div className={`font-sans text-xs sm:text-sm md:text-base tracking-wide leading-tight line-clamp-2 ${textClass}`}>
          {state.isProcessing ? (state.processingMessage || 'AI Processing...') : currentStepConfig.navText}
        </div>
      </div>

      {state.isProcessing ? (
        <div className="shrink-0 px-8 py-2.5 flex items-center justify-center">
          <Loader className="w-5 h-5 text-emerald-600 animate-spin" />
        </div>
      ) : (
        <div className="relative group shrink-0">
          <button
            onClick={action}
            className={`px-7 py-3.5 rounded-[1.25rem] font-mono text-xs md:text-sm tracking-widest font-black uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-[1px] ${buttonClass}`}
          >
            {currentStepConfig.navButton}
          </button>

          {/* Explainer Hover Popup */}
          {currentStepConfig.explainerTitle && (
            <div className="absolute bottom-full right-0 mb-4 w-88 bg-white/95 backdrop-blur-2xl p-5 rounded-[1.75rem] shadow-[0_30px_60px_rgba(0,0,0,0.18)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 cursor-default pointer-events-none font-sans z-[100]">
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-stone-200 rotate-45" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Info className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-widest uppercase text-stone-900 mb-1.5">
                    {currentStepConfig.explainerTitle}
                  </h4>
                  <p className="text-sm text-stone-700 font-medium leading-relaxed">
                    {currentStepConfig.explainerText}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
