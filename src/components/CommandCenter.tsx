import { useEffect } from 'react';
import Header from './Header';
import GISMap from './GISMap';
import WelcomeModal from './WelcomeModal';
import HoverBottomNav from './HoverBottomNav';
import ResourcePanel from './ResourcePanel';
import RightSidebarResizable from './RightSidebarResizable';
import ImpactReportModal from './ImpactReportModal';
import ApprovalModal from './ApprovalModal';
import { useSimulation } from '../store/SimContext';

export default function CommandCenter() {
  const { missionStarted } = useSimulation();

  // Ensure window is always pinned to top (0,0) so header is never scrolled off-screen
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [missionStarted]);

  return (
    <div className="h-screen w-screen max-h-screen bg-[#F4F1EA] overflow-hidden font-sans text-stone-900 flex flex-col p-3 relative box-border">
      {/* Warm Geological Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#a8a29e_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cinematic Start Screen */}
      <WelcomeModal />

      {/* Main Dashboard - Robust Bento Layout Filling 100% Height */}
      {missionStarted && (
        <div className="relative z-10 w-full h-full flex flex-col gap-3 min-h-0 flex-1">
          
          {/* Header (Top Banner - spans full width) */}
          <div className="h-16 flex-none bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/60">
            <Header />
          </div>

          {/* 3-Column Work Area - Fills Remaining Vertical Space Down to Bottom */}
          <div className="flex-1 min-h-0 h-[calc(100%-76px)] grid grid-cols-[72px_1fr_520px] gap-3">
            {/* Left Sidebar (Ultra-Thin Icon Rail) */}
            <div className="h-full bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl border border-white/60 z-20 overflow-visible">
              <ResourcePanel />
            </div>

            {/* Center Map */}
            <div className="h-full bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl relative border border-white/60">
              <GISMap />
              {/* Command Overlay Floats on Map */}
              <HoverBottomNav />
            </div>

            {/* Right Sidebar (AI Logs & Telemetry) */}
            <div className="h-full min-h-0 bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/60">
              <RightSidebarResizable />
            </div>
          </div>

        </div>
      )}

      {/* Full-Screen Impact Report Modal */}
      <ImpactReportModal />

      {/* Approval Modal (Human-in-the-loop override) */}
      <ApprovalModal />
    </div>
  );
}

