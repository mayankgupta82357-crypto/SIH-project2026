import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  CheckCircle2,
  Truck,
  GitMerge,
  X
} from "lucide-react";
import { useIncidents } from "../context/IncidentContext";
import { SeverityPill, StatusPill } from "../components/common/StatusPill";

export const IncidentsPage = () => {
  const {
    incidents,
    units,
    createIncident,
    updateIncidentStatus,
    assignUnit,
    setSelectedIncident
  } = useIncidents();

  const [typeFilter, setTypeFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [targetIncident, setTargetIncident] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState("");

  // Add Incident Form
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Accident");
  const [newLocation, setNewLocation] = useState("");
  const [newSeverity, setNewSeverity] = useState("High");
  const [newDescription, setNewDescription] = useState("");
  const [newRoadBlocked, setNewRoadBlocked] = useState(true);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;
    await createIncident({
      title: newTitle,
      type: newType,
      location: newLocation,
      severity: newSeverity,
      description: newDescription,
      roadBlocked: newRoadBlocked
    });
    setShowAddModal(false);
    setNewTitle("");
    setNewLocation("");
    setNewDescription("");
  };

  const handleAssignUnit = async (e) => {
    e.preventDefault();
    if (!targetIncident || !selectedUnitId) return;
    await assignUnit(targetIncident.id, selectedUnitId);
    setShowAssignModal(false);
    setTargetIncident(null);
    setSelectedUnitId("");
  };

  const filtered = incidents.filter((i) => {
    if (typeFilter !== "All" && i.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    if (severityFilter !== "All" && i.severity.toLowerCase() !== severityFilter.toLowerCase()) return false;
    if (statusFilter !== "All" && i.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return i.title.toLowerCase().includes(q) || i.location.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-cyan-400" />
            Urban Incident Registry & Management
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Direct real-time CRUD, status escalation, and emergency fleet assignment
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-extrabold text-xs flex items-center gap-2 hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Incident</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Accident">Accident</option>
            <option value="Fire">Fire</option>
            <option value="Flood">Flood</option>
            <option value="Road Blockage">Road Blockage</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Detected">Detected</option>
            <option value="Investigating">Investigating</option>
            <option value="Responding">Responding</option>
            <option value="Contained">Contained</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing <b className="text-white">{filtered.length}</b> incidents
        </span>
      </div>

      {/* Incidents Table */}
      <div className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-dark-950/70 text-slate-400 font-mono uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Incident ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Population</th>
                <th className="px-4 py-3">Assigned Units</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((inc) => (
                <tr key={inc.id} className="hover:bg-white/5 transition">
                  <td className="px-4 py-3 font-mono font-bold text-cyan-400">{inc.id}</td>
                  <td className="px-4 py-3 font-semibold text-white">{inc.type}</td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs truncate">{inc.location}</td>
                  <td className="px-4 py-3"><SeverityPill severity={inc.severity} /></td>
                  <td className="px-4 py-3">
                    <select
                      value={inc.status}
                      onChange={(e) => updateIncidentStatus(inc.id, e.target.value)}
                      className="bg-dark-950 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value="Detected">Detected</option>
                      <option value="Investigating">Investigating</option>
                      <option value="Responding">Responding</option>
                      <option value="Contained">Contained</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{inc.time}</td>
                  <td className="px-4 py-3 font-mono text-slate-300">{inc.affectedPopulation?.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-cyan-300">
                    {inc.assignedUnits && inc.assignedUnits.length > 0 ? inc.assignedUnits.join(", ") : "None"}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setTargetIncident(inc);
                        setShowAssignModal(true);
                      }}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-[10px]"
                      title="Assign Unit"
                    >
                      + Unit
                    </button>
                    <Link
                      to="/command-center/cascade"
                      onClick={() => setSelectedIncident(inc)}
                      className="px-2 py-1 rounded bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold"
                    >
                      Cascade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-dark-900 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Log New Urban Incident
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold">Incident Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanker Collision on Richmond Circle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold">Incident Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Accident">Accident</option>
                    <option value="Fire">Fire</option>
                    <option value="Flood">Flood</option>
                    <option value="Road Blockage">Road Blockage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold">Initial Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold">Metropolitan Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Richmond Flyover West Incline, Bengaluru"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold">Description & Threat Factors</label>
                <textarea
                  rows={3}
                  placeholder="Details of disruption, spill hazards, or blocked lanes..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="roadBlockCheck"
                  checked={newRoadBlocked}
                  onChange={(e) => setNewRoadBlocked(e.target.checked)}
                  className="rounded bg-dark-950 border-white/20 text-cyan-500"
                />
                <label htmlFor="roadBlockCheck" className="text-slate-300">
                  Mark roadway as fully blocked (triggers immediate cascade prediction)
                </label>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 text-dark-950 font-bold hover:bg-cyan-400 transition"
                >
                  Create Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Unit Modal */}
      {showAssignModal && targetIncident && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-dark-900 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Dispatch Unit to {targetIncident.id}
              </h3>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignUnit} className="space-y-4 text-xs">
              <p className="text-slate-300">
                Assign an emergency unit to <b>{targetIncident.title}</b> at {targetIncident.location}.
              </p>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Available Fleet Units</label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none"
                  required
                >
                  <option value="">Select a response unit...</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.id} - {u.callsign} ({u.type} • {u.status})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedUnitId}
                  className="px-5 py-2 rounded-lg bg-cyan-500 text-dark-950 font-bold hover:bg-cyan-400 transition disabled:opacity-40"
                >
                  Dispatch Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
