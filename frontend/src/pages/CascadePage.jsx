import React, { useState, useEffect } from "react";
import {
  GitMerge,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { useIncidents } from "../context/IncidentContext";
import { cascadeAPI } from "../services/api";
import { CascadeGraph } from "../components/cascade/CascadeGraph";
import { AISummaryCard } from "../components/cascade/AISummaryCard";
import { SeverityPill } from "../components/common/StatusPill";

export const CascadePage = () => {
  const { incidents, selectedIncident, setSelectedIncident, startUrbanSimulation } = useIncidents();
  const [cascadeData, setCascadeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const activeIncident = selectedIncident || incidents[0];

  useEffect(() => {
    if (!activeIncident) return;
    const fetchCascade = async () => {
      setLoading(true);
      try {
        const res = await cascadeAPI.getAnalysis(activeIncident.id);
        if (res.success) {
          setCascadeData(res.data);
        }
      } catch (err) {
        console.error("Cascade analysis error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCascade();
  }, [activeIncident]);

  return (
    <div className="space-y-6 text-left">
      {/* Page Title & Incident Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Core Intelligence Model
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Cascade Intelligence & Threat Propagation
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Autonomous multi-tier ripple effect prediction for urban disruption mitigation
          </p>
        </div>

        {/* Quick Simulation Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={startUrbanSimulation}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-500/20 hover:scale-102 transition"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Simulate Cascade (13 Stages)</span>
          </button>
        </div>
      </div>

      {/* Incident Switcher Carousel / Select Bar */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
          Select Primary Disruption Event:
        </span>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {incidents.map((inc) => (
            <button
              key={inc.id}
              onClick={() => setSelectedIncident(inc)}
              className={`px-3 py-2 rounded-xl text-left border flex-shrink-0 transition-all duration-200 ${
                activeIncident?.id === inc.id
                  ? "bg-cyan-500/15 border-cyan-500/50 text-white shadow-md shadow-cyan-500/20"
                  : "bg-dark-950 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-cyan-400">{inc.id}</span>
                <SeverityPill severity={inc.severity} />
              </div>
              <div className="text-xs font-bold text-white mt-1 max-w-[180px] truncate">{inc.title}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{inc.location}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Cascade Visualization Component */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 font-mono text-xs bg-dark-900 rounded-2xl border border-white/10 animate-pulse">
          Computing multi-tier cascade matrices & traffic spillover vectors...
        </div>
      ) : (
        <>
          <CascadeGraph cascadeData={cascadeData} />
          {cascadeData?.aiAnalysis && (
            <AISummaryCard aiAnalysis={cascadeData.aiAnalysis} />
          )}
        </>
      )}
    </div>
  );
};
