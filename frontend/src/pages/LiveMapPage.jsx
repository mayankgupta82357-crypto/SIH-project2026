import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  Layers,
  ShieldAlert,
  GitMerge,
  Truck,
  Building2,
  Maximize2,
  RotateCcw
} from "lucide-react";
import { CityMap } from "../components/map/CityMap";
import { useIncidents } from "../context/IncidentContext";
import { SeverityPill, StatusPill } from "../components/common/StatusPill";

export const LiveMapPage = () => {
  const { incidents, units, facilities, selectedIncident, setSelectedIncident } = useIncidents();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIncidents = incidents.filter(i =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSelected = selectedIncident || incidents[0];

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Live Geospatial Command Map
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Interactive OpenStreetMap & Leaflet Telemetry • Bengaluru Central Grid
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search map incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-dark-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Map Layout Grid: Large Map + Selected Incident Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Full Interactive Map */}
        <div className="lg:col-span-8 h-[360px] sm:h-[480px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <CityMap
            incidents={filteredIncidents}
            units={units}
            facilities={facilities}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
            selectedIncidentId={activeSelected?.id}
          />
        </div>

        {/* Selected Incident Drawer */}
        <div className="lg:col-span-4 min-h-[360px] lg:h-[600px] rounded-2xl bg-dark-900 border border-white/10 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto">
          {activeSelected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-cyan-400">{activeSelected.id}</span>
                <SeverityPill severity={activeSelected.severity} />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white leading-tight">
                  {activeSelected.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-mono">
                  <span>📍</span> {activeSelected.location}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-dark-950 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Status:</span>
                  <StatusPill status={activeSelected.status} />
                </div>
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Cascade Threat:</span>
                  <b className="text-rose-400">{activeSelected.riskScore}/100</b>
                </div>
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Impact Radius:</span>
                  <b className="text-cyan-300">{activeSelected.impactRadiusKm} km</b>
                </div>
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Affected Citizens:</span>
                  <b className="text-slate-200">{activeSelected.affectedPopulation?.toLocaleString()}</b>
                </div>
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Roadway Access:</span>
                  <b className={activeSelected.roadBlocked ? "text-red-400" : "text-emerald-400"}>
                    {activeSelected.roadBlocked ? "BLOCKED" : "CLEAR"}
                  </b>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Tactical Description:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSelected.description}
                </p>
              </div>

              {activeSelected.cascadeEffects && (
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1.5 font-bold">
                    Cascading Secondary Impacts:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeSelected.cascadeEffects.map((eff, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{eff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs">
              Click any map marker to view tactical cascade parameters.
            </div>
          )}

          {activeSelected && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                to="/command-center/cascade"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 transition hover:opacity-90"
              >
                <GitMerge className="w-4 h-4" />
                <span>Open Cascade Intelligence</span>
              </Link>
              <Link
                to="/command-center/routes"
                className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Optimize Emergency Route</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
