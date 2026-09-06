import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  GitMerge,
  Navigation,
  Bell,
  Truck,
  BarChart3,
  Users,
  Settings,
  Zap,
  Radio,
  ShieldAlert
} from "lucide-react";
import { useIncidents } from "../../context/IncidentContext";

export const Sidebar = () => {
  const location = useLocation();
  const { metrics, startUrbanSimulation } = useIncidents();

  const navigation = [
    { name: "Overview", href: "/command-center", icon: LayoutDashboard },
    { name: "Live Map", href: "/command-center/map", icon: MapPin },
    { name: "Incidents", href: "/command-center/incidents", icon: AlertTriangle, badge: metrics.activeIncidentsCount },
    { name: "Cascade Intelligence", href: "/command-center/cascade", icon: GitMerge, highlight: true },
    { name: "Emergency Routes", href: "/command-center/routes", icon: Navigation },
    { name: "Alerts", href: "/command-center/alerts", icon: Bell, badge: metrics.criticalCount, badgeColor: "bg-red-500" },
    { name: "Response Units", href: "/command-center/units", icon: Truck, badge: `${metrics.activeUnits}/${metrics.totalUnits}` },
    { name: "Analytics", href: "/command-center/analytics", icon: BarChart3 },
    { name: "Citizen Reports", href: "/citizen", icon: Users },
    { name: "Admin Panel", href: "/command-center/admin", icon: Settings }
  ];

  return (
    <aside className="w-64 bg-dark-900 border-r border-white/10 flex flex-col flex-shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Simulation Quick Trigger Banner */}
      <div className="p-4 border-b border-white/10">
        <button
          onClick={startUrbanSimulation}
          className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-0.5 text-left shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all"
        >
          <div className="bg-dark-950/90 rounded-[10px] p-3 group-hover:bg-dark-950/75 transition">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-[10px] font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Live Demo Trigger
            </div>
            <p className="text-white text-xs font-extrabold mt-0.5 tracking-tight">
              RUN URBAN CASCADE SIMULATION
            </p>
            <p className="text-slate-400 text-[10px] mt-1 leading-snug">
              Auto-demonstrates 13-stage cascade chain & corridor clearance
            </p>
          </div>
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
          Command Systems
        </div>

        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              } ${item.highlight && !isActive ? "text-cyan-400/90 font-bold" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? "text-cyan-400"
                      : item.highlight
                      ? "text-cyan-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    item.badgeColor
                      ? `${item.badgeColor} text-white`
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 border-t border-white/10 bg-dark-950/40">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow"></span>
            Telemetry Feed
          </span>
          <span className="font-mono text-emerald-400 font-bold">100% ONLINE</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 font-mono">
          Bengaluru Metro Grid v2.4
        </div>
      </div>
    </aside>
  );
};
