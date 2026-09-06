import React, { useState } from "react";
import {
  Truck,
  HeartPulse,
  Flame,
  Shield,
  Clock,
  Battery,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { useIncidents } from "../context/IncidentContext";
import { StatusPill } from "../components/common/StatusPill";

export const ResponseUnitsPage = () => {
  const { units, incidents, assignUnit } = useIncidents();
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = units.filter((u) => {
    if (typeFilter !== "All" && u.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-cyan-400" />
          Emergency Response Coordination & Fleet Management
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Live tracking and dispatch for Ambulances, Fire Tenders, Police Cruisers, and Rescue Teams
        </p>
      </div>

      {/* Fleet Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["All", "Ambulance", "Fire Truck", "Police Vehicle", "Rescue Team"].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              typeFilter === t
                ? "bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/20"
                : "bg-dark-900 border border-white/10 text-slate-300 hover:bg-white/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((u) => {
          return (
            <div
              key={u.id}
              className="p-5 rounded-2xl bg-dark-900 border border-white/10 flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400">{u.id}</span>
                  <StatusPill status={u.status} />
                </div>

                <h3 className="text-base font-extrabold text-white mt-2">{u.callsign}</h3>
                <div className="text-xs text-slate-300 font-medium">{u.subType || u.type}</div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Base Station:</span>
                    <span className="text-slate-200">{u.baseStation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fuel Level:</span>
                    <span className="text-emerald-400">{u.fuelLevel}%</span>
                  </div>
                  {u.assignedIncident && (
                    <div className="flex items-center justify-between text-amber-400">
                      <span>Assigned:</span>
                      <span className="font-bold">{u.assignedIncident}</span>
                    </div>
                  )}
                  {u.etaMinutes > 0 && (
                    <div className="flex items-center justify-between text-cyan-300">
                      <span>Transit ETA:</span>
                      <span className="font-bold">{u.etaMinutes} mins</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">
                  GPS: {u.coordinates[0]?.toFixed(3)}, {u.coordinates[1]?.toFixed(3)}
                </span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono">
                  Telemetry Active
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
