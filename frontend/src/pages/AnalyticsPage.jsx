import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldAlert,
  Layers,
  CheckCircle2
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { analyticsAPI } from "../services/api";

export const AnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await analyticsAPI.get(timeframe);
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [timeframe]);

  const COLORS = ["#ef4444", "#f97316", "#06b6d4", "#eab308", "#8b5cf6", "#10b981"];

  return (
    <div className="space-y-6 text-left">
      {/* Header & Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Urban Cascade Analytics & Performance
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Empirical evaluation of response latency, cascade depth, and corridor efficiency
          </p>
        </div>

        {/* Time Filters: Today, 7 Days, 30 Days */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-900 border border-white/10">
          {[
            { id: "today", label: "Today" },
            { id: "7d", label: "7 Days" },
            { id: "30d", label: "30 Days" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                timeframe === t.id
                  ? "bg-cyan-500 text-dark-950 shadow-sm shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {data && (
        <>
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Incidents Over Time & Cascades (AreaChart) */}
            <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Disruptions vs Cascade Triggers</h3>
                <span className="text-[10px] font-mono text-cyan-400">Timeline Frequency</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.timeline}>
                    <defs>
                      <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="cascGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="incidents" stroke="#ef4444" fillOpacity={1} fill="url(#incGrad)" name="Total Incidents" />
                    <Area type="monotone" dataKey="cascades" stroke="#06b6d4" fillOpacity={1} fill="url(#cascGrad)" name="Cascade Multipliers" />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2. Incidents by Type (BarChart) */}
            <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Disruptions by Category</h3>
                <span className="text-[10px] font-mono text-cyan-400">Incident Distribution</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.incidentsByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", fontSize: "12px" }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                      {data.incidentsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3. Average Response Time by Zone (BarChart) */}
            <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Response Time by Metropolitan Zone</h3>
                <span className="text-[10px] font-mono text-emerald-400">Target: 8.0 mins</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.responseByZone}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="zone" stroke="#64748b" fontSize={9} />
                    <YAxis stroke="#64748b" fontSize={11} unit="m" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", fontSize: "12px" }} />
                    <Bar dataKey="avgMinutes" fill="#f59e0b" name="Avg Minutes" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="targetMinutes" fill="#10b981" name="Target Minutes" radius={[4, 4, 0, 0]} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 4. Cascade Depth & Risk (Line/Area) */}
            <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Cascade Progression Depth vs Risk</h3>
                <span className="text-[10px] font-mono text-purple-400">Multi-Tier Severity</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.cascadeDepthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="tier" stroke="#64748b" fontSize={9} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", fontSize: "12px" }} />
                    <Bar dataKey="events" fill="#8b5cf6" name="Events Handled" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avgRisk" fill="#ef4444" name="Avg Risk Index" radius={[4, 4, 0, 0]} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
