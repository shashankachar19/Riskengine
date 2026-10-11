import React from 'react';
import CommandLog from './CommandLog';

export default function RightSidebarResizable() {
  return (
    <div
      id="right-sidebar-container"
      className="h-full w-full flex flex-col relative overflow-hidden bg-white font-sans text-stone-900 rounded-2xl select-none"
    >
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
        <CommandLog />
      </div>
    </div>
  );
}
