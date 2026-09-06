import React, { useState, useEffect } from "react";
import {
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  TrendingDown,
  ArrowRight
} from "lucide-react";
import { RouteMap } from "../components/map/RouteMap";
import { routeAPI } from "../services/api";
import { useIncidents } from "../context/IncidentContext";

export const EmergencyRoutesPage = () => {
  const { units } = useIncidents();

  const [vehicleId, setVehicleId] = useState("AMB-101");
  const [startLocation, setStartLocation] = useState("MG Road Brigade Junction");
  const [destination, setDestination] = useState("Victoria Hospital");
  const [emergencyType, setEmergencyType] = useState("Critical Trauma Evacuation");
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRoute = async () => {
    setLoading(true);
    try {
      const res = await routeAPI.optimize({
        vehicleId,
        startLocation,
        destination,
        emergencyType
      });
      if (res.success) {
        setRouteData(res.data);
      }
    } catch (err) {
      console.error("Route calculation error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateRoute();
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Navigation className="w-5 h-5 text-cyan-400" />
          Emergency Route Optimization & Corridor Clearance
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Dynamic bypass routing avoiding blocked arterials with automated signal preemption
        </p>
      </div>

      {/* Input Parameters Form */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300">Emergency Unit</label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.id} - {u.callsign} ({u.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300">Origin / Incident</label>
          <select
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="MG Road Brigade Junction">MG Road - Brigade Junction (Blocked)</option>
            <option value="Indiranagar 100ft Rd">Indiranagar 100ft Rd (Fire Zone)</option>
            <option value="Central Fire Station">Central Fire Station HQ</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300">Destination Hospital / Base</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Victoria Hospital">Victoria Hospital - Trauma Center</option>
            <option value="Manipal Hospital">Manipal Hospital - Old Airport Rd</option>
            <option value="Bowring Hospital">Bowring & Lady Curzon Hospital</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={calculateRoute}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 text-dark-950 font-bold text-xs hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? "Optimizing..." : "Compute Green Corridor"}
          </button>
        </div>
      </div>

      {/* Route Visualizer & Data */}
      {routeData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map View */}
          <div className="lg:col-span-7 h-[460px]">
            <RouteMap routeData={routeData} />
          </div>

          {/* Details & Recommendation Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            {/* Recommended Green Corridor Card */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  RECOMMENDED GREEN CORRIDOR
                </span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {routeData.recommendedRoute.estimatedTimeMinutes} Mins
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">
                {routeData.recommendedRoute.name}
              </h3>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded bg-dark-950/60 border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono">Distance</div>
                  <div className="font-bold text-white">{routeData.recommendedRoute.distanceKm} km</div>
                </div>
                <div className="p-2 rounded bg-dark-950/60 border border-white/5">
                  <div className="text-[10px] text-slate-400 font-mono">Normal ETA</div>
                  <div className="font-bold text-slate-400 line-through">{routeData.recommendedRoute.normalTimeMinutes}m</div>
                </div>
                <div className="p-2 rounded bg-dark-950/60 border border-emerald-500/30 text-emerald-400">
                  <div className="text-[10px] text-emerald-400/80 font-mono">Time Saved</div>
                  <div className="font-bold text-emerald-400">-{routeData.recommendedRoute.timeSavedMinutes}m</div>
                </div>
              </div>

              {/* Corridor Clearance Protocol */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Active Traffic Preemption Points:
                </span>
                <div className="space-y-1 text-xs">
                  {routeData.recommendedRoute.corridorClearancePoints?.map((pt, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300 text-[11px]">
                      <span>✓ {pt.name}</span>
                      <span className="font-mono text-emerald-400 font-semibold">{pt.signalStatus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blocked Roadway Warning Box */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 font-mono uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                Avoided Impassable Roadway
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {routeData.reason}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
