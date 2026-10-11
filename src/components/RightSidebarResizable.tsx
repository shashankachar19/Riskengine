import React, { useState, useRef, useEffect } from 'react';
import ImplementationPlanPanel from './ImplementationPlanPanel';
import CommandLog from './CommandLog';
import { GripHorizontal } from 'lucide-react';

export default function RightSidebarResizable() {
  const [topPercent, setTopPercent] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const percent = (relativeY / rect.height) * 100;
      // Clamp between 25% and 75%
      const clamped = Math.max(25, Math.min(75, percent));
      setTopPercent(clamped);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div
      ref={containerRef}
      id="right-sidebar-container"
      className="h-full w-full flex flex-col relative overflow-hidden bg-white font-sans text-stone-900 rounded-2xl select-none"
    >
      {/* TOP SECTION: Active Operation / Telemetry / Emergency Plan */}
      <div
        style={{ height: `${topPercent}%` }}
        className="w-full overflow-hidden flex flex-col relative min-h-0 bg-white"
      >
        <ImplementationPlanPanel />
      </div>

      {/* DRAGGABLE DIVIDER */}
      <div
        onMouseDown={handleMouseDown}
        className="h-3 w-full bg-stone-100 hover:bg-stone-200 active:bg-emerald-100 flex items-center justify-center cursor-row-resize transition-colors border-y border-stone-200/80 z-20 shrink-0 group"
      >
        <GripHorizontal className="w-4 h-3 text-stone-400 group-hover:text-stone-700 transition-colors" />
      </div>

      {/* BOTTOM SECTION: AI Engine Terminal Logs */}
      <div
        style={{ height: `${100 - topPercent}%` }}
        className="w-full overflow-hidden flex flex-col relative min-h-0 bg-stone-900"
      >
        <CommandLog />
      </div>
    </div>
  );
}
