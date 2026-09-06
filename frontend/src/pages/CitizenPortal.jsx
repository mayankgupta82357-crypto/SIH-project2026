import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldAlert,
  AlertTriangle,
  Send,
  CheckCircle2,
  Navigation,
  MapPin,
  Clock,
  ArrowRight
} from "lucide-react";
import { citizenAPI } from "../services/api";
import { useIncidents } from "../context/IncidentContext";
import { SeverityPill } from "../components/common/StatusPill";

export const CitizenPortal = () => {
  const { refreshData } = useIncidents();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [citizenName, setCitizenName] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("Accident");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("High");

  const fetchCitizenData = async () => {
    try {
      const res = await citizenAPI.getOverview();
      if (res.success) {
        setData(res.data);
      }
    } catch (e) {
      console.error("Citizen data error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await citizenAPI.report({
        citizenName: citizenName || "Civic Commuter",
        contact,
        type,
        location,
        description,
        severity
      });
      if (res.success) {
        setSubmitted(true);
        setDescription("");
        setLocation("");
        await refreshData();
        await fetchCitizenData();
      }
    } catch (err) {
      console.error("Report submit error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Citizen Top Bar */}
      <header className="h-16 border-b border-white/10 bg-dark-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md shadow-emerald-500/20">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white">Urban Cascade</span>
            <span className="text-[10px] text-emerald-400 font-mono block -mt-1">Citizen Emergency Portal</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/command-center"
            className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold transition"
          >
            Switch to Command Center →
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 text-left w-full">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-dark-900 to-dark-900 border border-emerald-500/30">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
            Public Safety & Advisory Network
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Real-Time Metropolitan Disruption Advisories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Stay updated on active arterial blockages, toxic hazard perimeters, and verify recommended civilian detours across Bengaluru.
          </p>
        </div>

        {/* Two-Column Grid: Report Emergency Form + Active Public Advisories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Report Emergency Form */}
          <div className="lg:col-span-5 rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Report Civic Disruption</h3>
                <p className="text-[11px] text-slate-400 font-mono">Transmits directly to Central Command Dispatch</p>
              </div>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Emergency report verified & injected into Central Command incident feed!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Arjun Verma"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Contact Number</label>
                  <input
                    type="text"
                    placeholder="+91 98..."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Incident Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Accident">Accident</option>
                    <option value="Fire">Fire Hazard</option>
                    <option value="Flood">Waterlogging / Flood</option>
                    <option value="Road Blockage">Fallen Tree / Blockage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Observed Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Critical">Critical (Life Threat / Complete Block)</option>
                    <option value="High">High (Major Traffic Saturation)</option>
                    <option value="Medium">Medium (Moderate Delay)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Precise Location / Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Indiranagar Metro Station Pillar 128"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Situation Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe vehicles involved, injuries, or rising water level..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-red-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Emergency Report</span>
              </button>
            </form>
          </div>

          {/* Active Public Emergencies & Safer Civilian Routes */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Advisories */}
            <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Active City Advisories & Blockades
              </h3>

              <div className="space-y-3">
                {data?.activeEmergencies?.map((em) => (
                  <div
                    key={em.id}
                    className="p-4 rounded-xl bg-dark-950 border border-white/5 space-y-2 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{em.title}</span>
                      <SeverityPill severity={em.severity} />
                    </div>
                    <p className="text-xs text-slate-300 font-mono">📍 {em.location}</p>
                    <div className="text-[11px] p-2 rounded bg-red-950/20 border border-red-500/20 text-red-300 font-mono">
                      {em.safetyAdvisory}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safer Alternative Civilian Detours */}
            <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400" />
                Recommended Safer Detours for Civilians
              </h3>

              <div className="space-y-3">
                {data?.saferAlternativeRoutes?.map((route, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20 space-y-1.5 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{route.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">RECOMMENDED</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Avoid Area: <b className="text-rose-400">{route.avoidArea}</b>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Condition: {route.condition} • Intended for: {route.recommendedFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
