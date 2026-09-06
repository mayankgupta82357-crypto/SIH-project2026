import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Flame,
  Droplets,
  ShieldAlert,
  Clock,
  HeartPulse,
  Truck,
  TrendingUp,
  MapPin,
  ArrowRight,
  Zap,
  Radio,
  CheckCircle2
} from "lucide-react";
import { useIncidents } from "../context/IncidentContext";
import { SeverityPill, StatusPill } from "../components/common/StatusPill";
import { CityMap } from "../components/map/CityMap";

export const DashboardOverview = () => {
  const {
    incidents,
    activeIncidents,
    criticalIncidents,
    alerts,
    units,
    facilities,
    metrics,
    startUrbanSimulation,
    setSelectedIncident
  } = useIncidents();

  const primaryIncident = incidents.find(i => i.id === "INC-8901") || incidents[0];

  return (
    <div className="space-y-6 text-left">
      {/* Simulation Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/60 via-dark-900 to-dark-900 border border-red-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            Presentation Simulation Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Automated Urban Cascade Demonstration
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Execute the complete 13-stage cascade scenario: from initial multi-vehicle collision at MG Road to arterial gridlock, delayed ambulance dispatch, and dynamic green corridor clearance.
          </p>
        </div>

        <button
          onClick={startUrbanSimulation}
          className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-red-500/25 flex items-center gap-2.5 hover:scale-105"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>RUN URBAN CASCADE SIMULATION</span>
        </button>
      </div>

      {/* 6 Metric Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Active Incidents</span>
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{metrics.activeIncidentsCount}</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Live in Queue</div>
        </div>

        <div className="p-4 rounded-xl bg-dark-900 border border-red-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Critical Threats</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1">{metrics.criticalCount}</div>
          <div className="text-[10px] text-rose-400/80 mt-0.5">High Cascade Risk</div>
        </div>

        <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Affected Zones</span>
            <MapPin className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1">{metrics.monitoredZones}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Metropolitan Sectors</div>
        </div>

        <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Emergency Units</span>
            <Truck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.activeUnits}/{metrics.totalUnits}</div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5">Active Dispatches</div>
        </div>

        <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Avg Response Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400 mt-1">{metrics.avgResponseTime}</div>
          <div className="text-[10px] text-blue-400/80 mt-0.5">-35% with Preemption</div>
        </div>

        <div className="p-4 rounded-xl bg-dark-900 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Overall Risk Score</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400 mt-1">{metrics.overallRiskScore}/100</div>
          <div className="text-[10px] text-purple-400/80 mt-0.5">Elevated State</div>
        </div>
      </div>

      {/* Main Grid: Mini Live Map + Real-Time Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Panel */}
        <div className="lg:col-span-8 rounded-2xl bg-dark-900 border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Live City Geolocation & Risk Radii
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Bengaluru Central Grid • Arterials, Hospitals, and Units
              </p>
            </div>
            <Link
              to="/command-center/map"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Full Screen Map
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-[380px] w-full">
            <CityMap
              incidents={incidents}
              units={units}
              facilities={facilities}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
              selectedIncidentId={primaryIncident?.id}
            />
          </div>
        </div>

        {/* Live Active Cascade Warning & Alerts */}
        <div className="lg:col-span-4 rounded-2xl bg-dark-900 border border-white/10 p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Active Alerts Feed
              </h3>
              <Link to="/command-center/alerts" className="text-xs text-cyan-400 hover:underline font-mono">
                View All ({alerts.length})
              </Link>
            </div>

            <div className="space-y-3 mt-4">
              {alerts.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-xl bg-dark-950/70 border border-white/5 hover:border-red-500/30 transition text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400">{a.type}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{a.time}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white mt-1 leading-snug">{a.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{a.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigate to Cascade Intelligence */}
          <div className="pt-4 border-t border-white/10">
            <Link
              to="/command-center/cascade"
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Inspect Cascade Graph</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Incidents Quick Table */}
      <div className="rounded-2xl bg-dark-900 border border-white/10 p-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Incident Registry</h3>
            <p className="text-[11px] text-slate-400 font-mono">Active queue prioritized by Cascade Risk Score</p>
          </div>
          <Link to="/command-center/incidents" className="text-xs text-cyan-400 hover:underline font-semibold">
            Manage All Incidents →
          </Link>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3">ID</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Cascade Risk</th>
                <th className="pb-3">Assigned Units</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {incidents.slice(0, 5).map((inc) => (
                <tr key={inc.id} className="hover:bg-white/5 transition">
                  <td className="py-3 font-mono font-bold text-cyan-400">{inc.id}</td>
                  <td className="py-3 font-medium text-white">{inc.type}</td>
                  <td className="py-3 text-slate-300">{inc.location}</td>
                  <td className="py-3"><SeverityPill severity={inc.severity} /></td>
                  <td className="py-3"><StatusPill status={inc.status} /></td>
                  <td className="py-3 font-mono font-bold text-rose-400">{inc.riskScore}/100</td>
                  <td className="py-3 text-slate-400 font-mono">
                    {inc.assignedUnits && inc.assignedUnits.length > 0 ? inc.assignedUnits.join(", ") : "None"}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to="/command-center/cascade"
                      onClick={() => setSelectedIncident(inc)}
                      className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold border border-cyan-500/30"
                    >
                      Cascade →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
