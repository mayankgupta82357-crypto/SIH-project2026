import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Droplets,
  Clock,
  CheckCircle2,
  Zap,
  Filter
} from "lucide-react";
import { useIncidents } from "../context/IncidentContext";
import { useAuth } from "../context/AuthContext";
import { SeverityPill } from "../components/common/StatusPill";

export const AlertsPage = () => {
  const { alerts, acknowledgeAlert, startUrbanSimulation } = useIncidents();
  const { user } = useAuth();
  const [severityFilter, setSeverityFilter] = useState("All");

  const filtered = alerts.filter((a) => {
    if (severityFilter !== "All" && a.severity.toLowerCase() !== severityFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header & Quick Simulation Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-400 animate-pulse" />
            Active Emergency Alert Center
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Autonomous priority broadcasts dispatched across municipal and emergency agencies
          </p>
        </div>

        <button
          onClick={startUrbanSimulation}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-500/20 hover:scale-102 transition"
        >
          <Zap className="w-4 h-4" />
          <span>SIMULATE NEW EMERGENCY</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 mr-2">Severity:</span>
          {["All", "Critical", "High", "Medium", "Low"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                severityFilter === sev
                  ? "bg-cyan-500 text-dark-950"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing <b>{filtered.length}</b> broadcast alerts
        </span>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition text-left flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              alert.acknowledged
                ? "bg-dark-900/50 border-white/5 opacity-70"
                : "bg-dark-900 border-red-500/30 shadow-lg shadow-red-500/5"
            }`}
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400">{alert.id}</span>
                <SeverityPill severity={alert.severity} />
                <span className="text-xs text-slate-400 font-mono">📍 {alert.location}</span>
                <span className="text-xs text-slate-400 font-mono">⏱️ {alert.time}</span>
              </div>

              <h3 className="text-base font-extrabold text-white">
                {alert.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {alert.description}
              </p>

              {alert.recommendedAction && (
                <div className="p-2.5 rounded-lg bg-dark-950 border border-white/5 text-xs text-cyan-300 font-mono">
                  <b>Action Required:</b> {alert.recommendedAction}
                </div>
              )}
            </div>

            {/* Acknowledge Button */}
            <div className="flex-shrink-0">
              {alert.acknowledged ? (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acknowledged by {alert.acknowledgedBy || "Operator"}</span>
                </div>
              ) : (
                <button
                  onClick={() => acknowledgeAlert(alert.id, user?.name)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
                >
                  ✓ Acknowledge Alert
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
