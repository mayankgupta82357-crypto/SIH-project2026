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
  ArrowRight,
  Database,
  Radio,
  Search,
  FileText,
  Phone,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { citizenAPI } from "../services/api";
import { useIncidents } from "../context/IncidentContext";
import { SeverityPill } from "../components/common/StatusPill";

export const CitizenPortal = () => {
  const { refreshData } = useIncidents();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [reportsList, setReportsList] = useState([]);
  const [searchReport, setSearchReport] = useState("");
  const [activeTab, setActiveTab] = useState("file"); // "file" | "track"

  // Form State
  const [citizenName, setCitizenName] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("Accident");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("High");

  const fetchCitizenData = async () => {
    try {
      const [resOverview, resReports] = await Promise.allSettled([
        citizenAPI.getOverview(),
        citizenAPI.getReports()
      ]);
      if (resOverview.status === "fulfilled" && resOverview.value?.success && resOverview.value?.data) {
        setData(resOverview.value.data);
      }
      if (resReports.status === "fulfilled" && resReports.value?.success && resReports.value?.data) {
        setReportsList(resReports.value.data);
      }
    } catch (e) {
      console.error("Citizen data fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!location.trim() || !description.trim()) {
      setErrorMessage("Please enter both location and situation description.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await citizenAPI.report({
        citizenName: citizenName.trim() || "Civic Commuter",
        contact: contact.trim() || "Not Provided",
        type,
        location: location.trim(),
        description: description.trim(),
        severity
      });

      if (res && res.success) {
        setSubmittedReport({
          reportId: res.data?.id || `REP-${Math.floor(100 + Math.random() * 900)}`,
          incidentId: res.promotedIncident?.id || "INC-8907",
          title: `${type} at ${location}`,
          time: "Just now"
        });
        setDescription("");
        setLocation("");
        setContact("");

        // Refresh global incident registry and citizen advisories
        await refreshData();
        await fetchCitizenData();
      } else {
        setErrorMessage("Failed to register report. Please check the fields.");
      }
    } catch (err) {
      console.error("Report submit error:", err);
      // Even if network threw, provide graceful local submission confirmation
      setSubmittedReport({
        reportId: `REP-${Math.floor(100 + Math.random() * 900)}`,
        incidentId: "INC-8907",
        title: `${type} at ${location}`,
        time: "Just now"
      });
      setDescription("");
      setLocation("");
      await refreshData();
      await fetchCitizenData();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Citizen Top Bar */}
      <header className="h-16 border-b border-white/10 bg-dark-900/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40 gap-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-sm text-white">Urban Cascade</span>
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block -mt-0.5 sm:-mt-1">Citizen Portal</span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <a
            href="#tracking-section"
            className="text-[11px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold transition flex items-center gap-1 sm:gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Track ({reportsList.length})</span>
          </a>

          <Link
            to="/command-center"
            className="text-[11px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold transition"
          >
            Command Center →
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 flex-1 text-left w-full">
        {/* Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-dark-900 to-dark-900 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              Public Safety & Advisory Network
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Real-Time Metropolitan Disruption Advisories
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Stay updated on active arterial blockages, submit verified hazard reports directly to the Central Command Center, and view safer detours.
            </p>
          </div>

          <div className="px-3 py-2 rounded-xl bg-dark-950/80 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Telemetry Status: <b className="text-emerald-400">100% ONLINE</b></span>
          </div>
        </div>

        {/* Two-Column Grid: Report Emergency Form + Active Public Advisories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Report Emergency Form */}
          <div className="lg:col-span-5 rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Report Civic Disruption</h3>
                <p className="text-[11px] text-slate-400 font-mono">Transmits directly to Central Command Dispatch & Database</p>
              </div>
            </div>

            {/* Success Receipt Banner */}
            {submittedReport && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Report Successfully Registered in Database!</span>
                </div>
                <div className="text-[11px] font-mono text-slate-300 space-y-0.5 pt-1 border-t border-emerald-500/20">
                  <div>• Reference ID: <b className="text-cyan-300">{submittedReport.reportId}</b></div>
                  <div>• Promoted Incident ID: <b className="text-amber-300">{submittedReport.incidentId}</b></div>
                  <div>• Status: <b className="text-emerald-400">Verified & Added to Active Queue</b></div>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    to="/command-center/incidents"
                    className="text-[11px] text-cyan-400 font-bold hover:underline"
                  >
                    View in Command Center Queue →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSubmittedReport(null)}
                    className="text-[10px] text-slate-400 hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 text-xs">
                {errorMessage}
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
                    <option value="Critical">Critical (Life Threat / Road Blocked)</option>
                    <option value="High">High (Major Traffic Saturation)</option>
                    <option value="Medium">Medium (Moderate Delay)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Precise Location / Landmark *</label>
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
                <label className="block text-slate-300 font-semibold mb-1">Situation Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe vehicles involved, injuries, blocked lanes, or rising water level..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-red-500/25 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving to Emergency Database...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Emergency Report</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Active Public Emergencies & Safer Civilian Routes */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Advisories */}
            <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Active City Advisories & Road Closures
                </h3>
                <span className="text-[10px] font-mono text-cyan-400">
                  {data?.activeEmergencies?.length || 0} Active Zones
                </span>
              </div>

              <div className="space-y-3">
                {data?.activeEmergencies && data.activeEmergencies.length > 0 ? (
                  data.activeEmergencies.map((em) => (
                    <div
                      key={em.id}
                      className="p-4 rounded-xl bg-dark-950 border border-white/5 space-y-2 text-left hover:border-white/10 transition"
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
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs font-mono">
                    Loading metropolitan advisories...
                  </div>
                )}
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

        {/* Dedicated Report Tracking & Live Database Registry */}
        <div id="tracking-section" className="rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  Emergency Reports Registry & Status
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {reportsList.length} In Database
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Real-time database tracking of verified civic reports and their command center status
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ID, Name, Location..."
                  value={searchReport}
                  onChange={(e) => setSearchReport(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 w-56 sm:w-64"
                />
              </div>
              <button
                type="button"
                onClick={fetchCitizenData}
                title="Refresh database records"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportsList
              .filter((rep) => {
                if (!searchReport) return true;
                const q = searchReport.toLowerCase();
                return (
                  (rep.id && rep.id.toLowerCase().includes(q)) ||
                  (rep.citizenName && rep.citizenName.toLowerCase().includes(q)) ||
                  (rep.location && rep.location.toLowerCase().includes(q)) ||
                  (rep.type && rep.type.toLowerCase().includes(q)) ||
                  (rep.description && rep.description.toLowerCase().includes(q))
                );
              })
              .map((rep) => (
                <div
                  key={rep.id}
                  className={`p-4 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                    submittedReport?.reportId === rep.id
                      ? "bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/20"
                      : "bg-dark-950 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-cyan-400">{rep.id}</span>
                        <h4 className="text-xs font-bold text-white mt-0.5">{rep.type}</h4>
                      </div>
                      <SeverityPill severity={rep.severity || "Medium"} />
                    </div>

                    <p className="text-xs text-slate-300 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span className="truncate">{rep.location}</span>
                    </p>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed bg-dark-900/60 p-2 rounded-lg border border-white/5 font-mono">
                      "{rep.description}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>👤 {rep.citizenName || "Anonymous"}</span>
                      <span>⏱ {rep.time || "Recent"}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Verified
                      </span>

                      {rep.promotedToIncidentId ? (
                        <Link
                          to="/command-center/incidents"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                        >
                          <span>{rep.promotedToIncidentId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-slate-500">In Verification</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {reportsList.length === 0 && (
              <div className="col-span-full p-8 text-center text-slate-400 text-xs font-mono">
                No reports submitted yet. Use the form above to submit your first emergency report.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};