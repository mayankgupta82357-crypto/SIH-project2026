import React, { useState, useEffect } from "react";
import { Search, Bell, Shield, Clock, User, CheckCircle2, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useIncidents } from "../../context/IncidentContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuth();
  const { alerts, acknowledgeAlert } = useIncidents();
  const [timeStr, setTimeStr] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadAlerts = alerts.filter(a => !a.acknowledged);

  return (
    <header className="h-16 border-b border-white/10 bg-dark-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search incident ID, arterial road, or landmark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-dark-950/70 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Right status & controls */}
      <div className="flex items-center gap-5">
        {/* Live Clock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-950/60 border border-white/5 font-mono text-xs text-cyan-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{timeStr}</span>
        </div>

        {/* System Health Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>CASCADE ENGINE READY</span>
        </div>

        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-dark-900 border border-white/15 rounded-xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Active System Alerts ({unreadAlerts.length})
                </span>
                <Link
                  to="/command-center/alerts"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                {unreadAlerts.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No unacknowledged alerts.</p>
                ) : (
                  unreadAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-2.5 rounded-lg bg-dark-950/60 border border-white/5 hover:border-cyan-500/30 transition text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {alert.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{alert.time}</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1 line-clamp-2">{alert.title}</p>
                      <button
                        onClick={() => acknowledgeAlert(alert.id, user?.name)}
                        className="mt-2 text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        ✓ Acknowledge
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "OP"}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-200 leading-tight">{user?.name || "Emergency Operator"}</div>
            <div className="text-[10px] text-cyan-400 font-mono font-medium">{user?.role || "Operator"}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
