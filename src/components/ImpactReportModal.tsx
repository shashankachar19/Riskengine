import { useSimulation } from '../store/SimContext';
import { ShieldCheck, Download, Presentation, X, RotateCcw, Home } from 'lucide-react';
import { RiskEngineLogo, getRiskEngineLogoSvgHtml } from './icons/SvgIcons';

export default function ImpactReportModal() {
  const { state, activeScenario, closeImpactReport, resetSimulation, returnToHome } = useSimulation();

  if (state.step < 4 || !state.showImpactReport) return null;

  const { totalWorkers, exposedWorkers, coordCycleTime, replanningTime, metrics } = activeScenario.impactReport;

  // ── 1. Formal Executive PDF Audit Report ──
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    const logoSvg = getRiskEngineLogoSvgHtml(38);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>RiskEngine Incident Impact Report — ${activeScenario.name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Outfit', sans-serif; background: #fff; color: #1c1917; padding: 48px; line-height: 1.5; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #10b981; padding-bottom: 24px; margin-bottom: 28px; }
          .brand { display: flex; align-items: center; gap: 14px; }
          .logo-text { font-size: 26px; font-weight: 900; letter-spacing: -0.5px; }
          .logo-text span { color: #047857; }
          .tagline { font-size: 10px; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #78716c; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
          .meta { font-size: 11px; color: #78716c; font-family: 'JetBrains Mono', monospace; text-align: right; line-height: 1.6; }
          
          .banner { background: #ecfdf5; border: 2px solid #10b981; border-radius: 14px; padding: 18px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; }
          .banner h2 { color: #047857; font-size: 18px; font-weight: 900; display: flex; align-items: center; gap: 10px; }
          .banner p { color: #065f46; font-size: 13px; font-weight: 600; margin-top: 3px; }
          .stamp { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; background: #047857; color: #fff; padding: 6px 12px; border-radius: 8px; letter-spacing: 1.5px; }

          .stats { display: flex; gap: 16px; margin-bottom: 28px; }
          .stat { flex: 1; text-align: center; padding: 18px 12px; border-radius: 12px; border: 2px solid #e7e5e4; background: #fafaf9; }
          .stat .num { font-size: 28px; font-weight: 900; font-family: 'JetBrains Mono', monospace; }
          .stat .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; margin-top: 4px; }
          .stat.emerald .num { color: #047857; }
          .stat.blue .num { color: #0369a1; }
          .stat.dark .num { color: #1c1917; }

          .sec-title { font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #44403c; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
          .sec-title::before { content: ""; display: inline-block; width: 4px; height: 14px; background: #10b981; border-radius: 2px; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
          th { text-align: left; padding: 10px 14px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; background: #f5f5f4; border-bottom: 2px solid #e7e5e4; }
          td { padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #f5f5f4; }
          .manual { color: #78716c; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
          .ai { color: #047857; font-weight: 700; font-family: 'JetBrains Mono', monospace; font-size: 12px; }

          .footer { border-top: 2px solid #e7e5e4; padding-top: 18px; font-size: 11px; color: #78716c; display: flex; justify-content: space-between; align-items: center; font-family: 'JetBrains Mono', monospace; }
          @media print { body { padding: 24px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">
            ${logoSvg}
            <div>
              <div class="logo-text">RISK<span>ENGINE.</span></div>
              <div class="tagline">Autonomous Crisis Command & Response Platform</div>
            </div>
          </div>
          <div class="meta">
            AUDIT CERTIFICATION // HITL-409<br/>
            Scenario: ${activeScenario.name}<br/>
            Location: ${activeScenario.location.name} (${activeScenario.location.lat.toFixed(4)}°N, ${activeScenario.location.lng.toFixed(4)}°E)<br/>
            Timestamp: ${dateStr} — ${timeStr} IST
          </div>
        </div>

        <div class="banner">
          <div>
            <h2>MISSION ACCOMPLISHED // ZERO CASUALTIES</h2>
            <p>${totalWorkers} of ${totalWorkers} site personnel successfully extracted via autonomous multi-agent dynamic bypass.</p>
          </div>
          <div class="stamp">VERIFIED: PASS</div>
        </div>

        <div class="stats">
          <div class="stat emerald"><div class="num">${coordCycleTime}</div><div class="label">Coordination Cycle</div></div>
          <div class="stat blue"><div class="num">${replanningTime}</div><div class="label">Dynamic Replanning</div></div>
          <div class="stat dark"><div class="num">${totalWorkers}/${totalWorkers}</div><div class="label">Personnel Secured</div></div>
          <div class="stat emerald"><div class="num">0</div><div class="label">Casualties / Injuries</div></div>
        </div>

        <div class="sec-title">Operational Telemetry & Simulation Parameters</div>
        <table>
          <thead>
            <tr>
              <th>Evaluation Parameter</th>
              <th>System Module</th>
              <th>Observed Result</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.map(m => `
              <tr>
                <td style="font-weight:700">${m.label}</td>
                <td class="manual">${m.simType}</td>
                <td class="ai">${m.result}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div>RiskEngine Mission Execution Platform — Multi-Agent Autonomous Command Layer</div>
          <div>ISO 22320 Emergency Operations Standard Compliant</div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 400);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center font-sans select-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={closeImpactReport} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl mx-4 bg-white border border-stone-200 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.25)] animate-in zoom-in-95 fade-in duration-300 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-stone-900 rounded-2xl border border-stone-800 shadow-md flex items-center justify-center">
              <RiskEngineLogo size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-stone-900 uppercase">
                  Incident Impact Report
                </h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full uppercase">
                  {activeScenario.badge}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono tracking-wide mt-1">
                RiskEngine // {activeScenario.name} ({activeScenario.location.district})
              </p>
            </div>
          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Audit PDF</span>
            </button>

            <button
              onClick={closeImpactReport}
              className="p-2 text-stone-400 hover:text-stone-800 rounded-xl transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl text-center">
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                Coordination Cycle
              </span>
              <div className="text-3xl font-mono font-black text-emerald-800">{coordCycleTime}</div>
              <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Autonomous multi-agent eval</span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl text-center">
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-widest block mb-1">
                Dynamic Replanning
              </span>
              <div className="text-3xl font-mono font-black text-blue-800">{replanningTime}</div>
              <span className="text-[11px] text-blue-600 font-medium mt-1 block">Alternate route calculated</span>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl text-center">
              <span className="text-[10px] font-mono font-bold text-stone-600 uppercase tracking-widest block mb-1">
                Personnel Accountability
              </span>
              <div className="text-3xl font-mono font-black text-stone-900">{totalWorkers}/{totalWorkers}</div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">100% Safe (0 Casualties)</span>
            </div>
          </div>

          {/* Detailed Parameter Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
              <span>Metric Analysis</span>
              <span>Observed Simulation Result</span>
            </div>
            <div className="divide-y divide-stone-100">
              {metrics.map((m, idx) => (
                <div key={idx} className="px-5 py-3.5 flex items-center justify-between hover:bg-stone-50/60 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-stone-800">{m.label}</div>
                    <div className="text-[11px] text-stone-400 font-mono">{m.simType}</div>
                  </div>
                  <div className={`text-xs font-mono font-black ${m.resultColor}`}>
                    {m.result}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="text-xs text-stone-500 text-center font-mono py-2 border-t border-stone-100">
            RiskEngine Autonomous Command Platform — Dynamic Incident Orchestration for High-Risk Operations
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                closeImpactReport();
                returnToHome();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase transition-colors border border-emerald-200"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>Return to Home</span>
            </button>

            <button
              onClick={() => {
                closeImpactReport();
                resetSimulation();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-mono font-bold tracking-wider uppercase transition-colors hover:bg-stone-200/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Scenario</span>
            </button>
          </div>

          <button
            onClick={closeImpactReport}
            className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-sm"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
