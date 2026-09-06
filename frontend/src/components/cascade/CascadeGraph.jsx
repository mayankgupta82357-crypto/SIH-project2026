import React, { useState } from "react";
import {
  AlertTriangle,
  Flame,
  Droplets,
  ShieldAlert,
  Clock,
  HeartPulse,
  Layers,
  ZapOff,
  ArrowDown,
  ArrowRight,
  TrendingUp,
  Info
} from "lucide-react";

export const CascadeGraph = ({ cascadeData }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!cascadeData || !cascadeData.nodes) {
    return (
      <div className="p-8 text-center text-slate-400 bg-dark-900 rounded-2xl border border-white/10">
        No active cascade model selected.
      </div>
    );
  }

  const { nodes, links, incidentTitle, riskScore, cascadeDepth, confidenceScore } = cascadeData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Flame": return <Flame className="w-5 h-5 text-orange-400" />;
      case "Droplets": return <Droplets className="w-5 h-5 text-blue-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case "Clock": return <Clock className="w-5 h-5 text-amber-400" />;
      case "HeartPulse": return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case "Layers": return <Layers className="w-5 h-5 text-purple-400" />;
      case "ZapOff": return <ZapOff className="w-5 h-5 text-yellow-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-red-400" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 1: return "from-red-600/30 to-rose-600/10 border-red-500/50 text-red-400";
      case 2: return "from-orange-600/30 to-amber-600/10 border-orange-500/50 text-orange-400";
      case 3: return "from-amber-600/30 to-yellow-600/10 border-amber-500/50 text-amber-400";
      case 4: return "from-purple-600/30 to-indigo-600/10 border-purple-500/50 text-purple-400";
      case 5: return "from-rose-600/30 to-pink-600/10 border-rose-500/50 text-rose-400";
      default: return "from-cyan-600/30 to-blue-600/10 border-cyan-500/50 text-cyan-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl bg-dark-900 border border-white/10">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Cascade Risk</div>
          <div className="text-xl font-extrabold text-rose-400 mt-0.5">{riskScore}/100</div>
          <div className="text-[10px] text-rose-400/80">Critical Threshold</div>
        </div>
        <div className="p-3 rounded-xl bg-dark-900 border border-white/10">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Impact Radius</div>
          <div className="text-xl font-extrabold text-cyan-400 mt-0.5">{cascadeData.impactRadiusKm || 2.8} km</div>
          <div className="text-[10px] text-slate-400">Arterial Span</div>
        </div>
        <div className="p-3 rounded-xl bg-dark-900 border border-white/10">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Affected Population</div>
          <div className="text-xl font-extrabold text-amber-400 mt-0.5">{cascadeData.affectedPopulation?.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400">Estimated Residents</div>
        </div>
        <div className="p-3 rounded-xl bg-dark-900 border border-white/10">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Cascade Depth</div>
          <div className="text-xl font-extrabold text-purple-400 mt-0.5">{cascadeDepth} Tiers</div>
          <div className="text-[10px] text-purple-400/80">Deep Progression</div>
        </div>
        <div className="p-3 rounded-xl bg-dark-900 border border-white/10 col-span-2 md:col-span-1">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Confidence Score</div>
          <div className="text-xl font-extrabold text-emerald-400 mt-0.5">{confidenceScore}%</div>
          <div className="text-[10px] text-emerald-400/80">Heuristic Match</div>
        </div>
      </div>

      {/* Visual Flow Representation */}
      <div className="relative p-6 rounded-2xl bg-dark-900 border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Cascade Failure Vector Diagram
            </span>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Multi-Tier Disruption Progression
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Click any node for tactical parameters
          </span>
        </div>

        {/* Dynamic Nodes Chain */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-x-auto pb-4">
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const tierStyle = getTierColor(node.tier);

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`flex-shrink-0 w-full md:w-48 p-4 rounded-xl border bg-gradient-to-b cursor-pointer transition-all duration-300 ${tierStyle} ${
                    isSelected ? "ring-2 ring-cyan-400 scale-105 shadow-xl shadow-cyan-500/20" : "hover:scale-102"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-slate-300 uppercase">
                      Tier {node.tier}
                    </span>
                    {getIcon(node.icon)}
                  </div>

                  <h4 className="font-extrabold text-xs text-white mt-2 leading-tight">
                    {node.label}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 font-mono">
                    {node.location}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-rose-300">{node.status}</span>
                    <span className="font-mono text-slate-400">+{node.riskContribution}%</span>
                  </div>
                </div>

                {/* Connecting arrow if not last */}
                {index < nodes.length - 1 && (
                  <div className="hidden md:flex flex-col items-center justify-center text-cyan-400 px-1">
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                    <span className="text-[8px] font-mono text-cyan-400/80 -mt-0.5 uppercase">triggers</span>
                  </div>
                )}
                {index < nodes.length - 1 && (
                  <div className="md:hidden flex items-center justify-center text-cyan-400 py-1">
                    <ArrowDown className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Node Detailed Inspection Drawer */}
        {selectedNode && (
          <div className="mt-4 p-4 rounded-xl bg-dark-950 border border-cyan-500/30 text-left animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Tier {selectedNode.tier} Parameter Deep-Dive: {selectedNode.label}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {selectedNode.details}
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">
              Operational Impact: <b>{selectedNode.status}</b> | Primary Contributing Risk: <b>+{selectedNode.riskContribution}%</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
