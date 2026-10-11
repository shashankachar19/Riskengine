import React from 'react';
import { useSimulation } from '../store/SimContext';
import {
  MarkerIconType,
  AnimatedMedicalHelicopter,
  AnimatedAmbulance,
  AnimatedRescueBoat,
  AnimatedExcavator,
  AnimatedDrone,
} from './icons/SvgIcons';
import {
  Truck,
  ShieldAlert,
  Users,
  Activity,
  Cross,
} from 'lucide-react';

function ResourceIcon({ type, className }: { type: MarkerIconType; className?: string }) {
  switch (type) {
    case 'helicopter':
      return <AnimatedMedicalHelicopter size={26} color="#059669" className={className} />;
    case 'ambulance':
      return <AnimatedAmbulance size={26} color="#059669" className={className} />;
    case 'boat':
      return <AnimatedRescueBoat size={26} color="#2563eb" className={className} />;
    case 'excavator':
      return <AnimatedExcavator size={26} color="#d97706" className={className} />;
    case 'drone':
      return <AnimatedDrone size={26} color="#9333ea" className={className} />;
    case 'shield':
      return <ShieldAlert className={className || 'w-5 h-5 text-blue-500'} />;
    case 'personnel':
      return <Users className={className || 'w-5 h-5 text-stone-600'} />;
    case 'pump':
      return <Activity className={className || 'w-5 h-5 text-blue-500'} />;
    case 'hospital':
      return <Cross className={className || 'w-5 h-5 text-indigo-600'} />;
    case 'truck':
    default:
      return <Truck className={className || 'w-5 h-5 text-stone-700'} />;
  }
}

export default function ResourcePanel() {
  const { state, activeScenario } = useSimulation();

  return (
    <div className="h-full w-full flex flex-col items-center py-4 gap-4 font-sans bg-transparent overflow-visible select-none">
      {activeScenario.resourcePanel.map((item, index) => {
        let displayCount = item.count;
        let badgeColor = item.badgeColor;
        let dynamicStatusNote = item.tooltipDescription;

        if (item.role === 'primary_responder') {
          const ambAvailable = state.step >= 4 ? 0 : state.step >= 2 ? 1 : item.count;
          displayCount = ambAvailable;
          badgeColor = state.step === 3 ? 'bg-red-600' : state.step >= 2 ? 'bg-orange-500' : item.badgeColor;

          if (state.step === 0) {
            dynamicStatusNote = `${item.count} units available for dispatch`;
          } else if (state.step === 1) {
            dynamicStatusNote = `${item.count} units on standby — awaiting orders`;
          } else if (state.step === 2) {
            dynamicStatusNote = 'Primary unit en route; backup on standby';
          } else if (state.step === 3) {
            dynamicStatusNote = 'Primary unit BLOCKED by secondary incident; backup awaiting replan';
          } else if (state.step >= 4) {
            dynamicStatusNote = 'Backup unit reached hazard zone — rescue active ✓';
          }
        } else if (item.role === 'rescue_team') {
          const rescueAvail = state.step >= 2 ? item.count - 1 : item.count;
          displayCount = rescueAvail;
          if (state.step >= 2) {
            dynamicStatusNote = 'Team deployed to incident zone via primary route';
          }
        }

        const isLastItem = index === activeScenario.resourcePanel.length - 1;

        return (
          <div
            key={item.id}
            className={`relative group cursor-pointer ${isLastItem ? 'mt-auto mb-1' : ''}`}
          >
            {/* Main Icon Button with hover spring animation */}
            <div className="p-3 rounded-2xl bg-white text-stone-700 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)] group-hover:-translate-y-1 group-hover:scale-110 border border-stone-100 flex items-center justify-center">
              <ResourceIcon type={item.iconType} />
            </div>

            {/* Badge Count with pulsing ping on change */}
            <div className={`absolute -top-1.5 -right-1.5 min-w-[22px] h-5 px-1.5 ${badgeColor} rounded-full border-2 border-white flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md transition-colors duration-300`}>
              {displayCount}
            </div>

            {/* Floating Tooltip with smooth enter animation */}
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-72 z-[9999] translate-x-2 group-hover:translate-x-0 pointer-events-none">
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-l border-b border-stone-200 rotate-45" />
              <div className="relative z-10">
                <span className="text-stone-900 text-sm block mb-1 font-black flex items-center gap-2">
                  <ResourceIcon type={item.iconType} className="w-4 h-4" />
                  {item.tooltipTitle}
                </span>
                <span className="text-xs font-semibold text-stone-700 leading-relaxed block">
                  {dynamicStatusNote}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
