import React, { useState, useEffect } from "react";
import {
  Settings,
  Users,
  Activity,
  Shield,
  Clock,
  CheckCircle2,
  Cpu,
  Database
} from "lucide-react";
import { adminAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export const AdminPage = () => {
  const { user } = useAuth();
  const [health, setHealth] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [hRes, uRes, lRes] = await Promise.all([
          adminAPI.getHealth(),
          adminAPI.getUsers(),
          adminAPI.getLogs()
        ]);
        if (hRes.success) setHealth(hRes.data);
        if (uRes.success) setUsersList(uRes.data);
        if (lRes.success) setLogs(lRes.data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await adminAPI.updateUserRole(userId, newRole);
      if (res.success) {
        setUsersList((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (e) {
      console.error("Role update error:", e);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          System Administration & Audit Trail
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Security clearance, node telemetry health, and chronological operational logs
        </p>
      </div>

      {/* System Health Status Cards */}
      {health && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
              <span>Database Engine</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-extrabold text-white mt-1">{health.engineMode}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">Zero Failure Fallback Active</div>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
              <span>Node Runtime</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-extrabold text-white mt-1">{health.nodeVersion}</div>
            <div className="text-[10px] text-cyan-400 mt-0.5 font-mono">Uptime: {health.uptimeSeconds}s</div>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
              <span>Memory Ingestion</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-sm font-extrabold text-white mt-1">{health.systemMemory?.heapUsedMb} MB</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Heap Allocated: {health.systemMemory?.heapTotalMb}MB</div>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
              <span>WebSocket Stream</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-extrabold text-emerald-400 mt-1">OPERATIONAL</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Port 5000 Active</div>
          </div>
        </div>
      )}

      {/* Users Management */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400" />
          Authorized Operations Personnel
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="border-b border-white/10 font-mono text-[10px] text-slate-400 uppercase">
              <tr>
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Badge</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Clearance Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition">
                  <td className="py-3 font-semibold text-white">{u.name}</td>
                  <td className="py-3 text-slate-300 font-mono">{u.email}</td>
                  <td className="py-3 font-mono text-cyan-400">{u.badge}</td>
                  <td className="py-3 text-slate-400">{u.department}</td>
                  <td className="py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-dark-950 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Emergency Operator">Emergency Operator</option>
                      <option value="Citizen">Citizen</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Audit Activity Logs */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          Chronological Audit Logs
        </h3>

        <div className="space-y-2.5 max-h-72 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-mono text-[10px] font-bold text-cyan-400 mr-2">[{log.action}]</span>
                <span className="text-slate-300">{log.details}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 sm:text-right flex-shrink-0 ml-4">
                <span>By: <b>{log.operator}</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
