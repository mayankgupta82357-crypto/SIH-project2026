import React from "react";
import { Sparkles, AlertCircle, ShieldAlert, CheckCircle2, Bot } from "lucide-react";

export const AISummaryCard = ({ aiAnalysis }) => {
  if (!aiAnalysis) return null;

  return (
    <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              AI Situation Analysis Engine
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                Autonomous Rule-Engine v2.4
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Heuristic evaluation of systemic failure propagation
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
          {aiAnalysis.priority || "HIGH PRIORITY"}
        </span>
      </div>

      {/* Summary Narrative */}
      <div className="p-3.5 rounded-xl bg-dark-950/70 border border-white/5 text-xs text-slate-200 leading-relaxed">
        <span className="font-bold text-cyan-400 font-mono uppercase text-[10px] block mb-1">
          Executive Situation Summary:
        </span>
        {aiAnalysis.summary}
      </div>

      {/* Two Column Risks Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Immediate Risks */}
        <div className="p-4 rounded-xl bg-red-950/15 border border-red-500/20">
          <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase font-mono tracking-wider mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            Immediate Critical Risks
          </h4>
          <ul className="space-y-2">
            {aiAnalysis.immediateRisks?.map((risk, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Possible Secondary Effects */}
        <div className="p-4 rounded-xl bg-amber-950/15 border border-amber-500/20">
          <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Projected Secondary Effects
          </h4>
          <ul className="space-y-2">
            {aiAnalysis.secondaryEffects?.map((effect, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Action Items */}
      <div className="p-4 rounded-xl bg-dark-950/60 border border-white/10">
        <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono tracking-wider mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Recommended Response Protocols
        </h4>
        <div className="space-y-2.5">
          {aiAnalysis.recommendedActions?.map((act, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/5 gap-2"
            >
              <div className="flex items-start gap-2 text-xs text-slate-200">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex-shrink-0">
                  {act.priority}
                </span>
                <span>{act.action}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono sm:text-right flex-shrink-0">
                Unit: <b className="text-slate-200">{act.assignedTo}</b>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Disclaimer */}
      <div className="text-[10px] text-slate-400 font-mono text-center italic">
        {aiAnalysis.disclaimer || "Academic prototype simulation model. Predictions calculated by heuristic city graph analysis."}
      </div>
    </div>
  );
};
