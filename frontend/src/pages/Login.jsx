import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, ArrowRight, UserCheck, CheckCircle2, AlertTriangle, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [selectedRole, setSelectedRole] = useState("Citizen");
  const [email, setEmail] = useState("citizen@urbancascade.gov");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const { login, demoLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleRoleTabClick = (role) => {
    setSelectedRole(role);
    if (role === "Citizen") {
      setEmail("citizen@urbancascade.gov");
    } else if (role === "Emergency Operator") {
      setEmail("operator@urbancascade.gov");
    } else {
      setEmail("admin@urbancascade.gov");
    }
    setPassword("password123");
    setError("");
  };

  const handleRegularLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === "Citizen") {
        navigate("/citizen");
      } else {
        navigate("/command-center");
      }
    } else {
      setError(res.message || "Login failed");
    }
  };

  const handleDemoLogin = async (role) => {
    setError("");
    const res = await demoLogin(role);
    if (res.success) {
      if (role === "Citizen") {
        navigate("/citizen");
      } else {
        navigate("/command-center");
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern bg-radial-glow">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/25">
            <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="text-xl font-extrabold text-white">Urban Cascade</span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-white tracking-tight">
          User & Operations Sign In
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-mono">
          Login as Citizen, Emergency Operator, or System Administrator
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-900 border border-white/10 py-8 px-5 sm:px-8 shadow-2xl rounded-2xl space-y-5 text-left">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-2">
              Select Your Role / Portal:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleTabClick("Citizen")}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 border ${
                  selectedRole === "Citizen"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20"
                    : "bg-dark-950 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span>👤 Citizen</span>
                <span className="text-[9px] font-mono opacity-75">Public User</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleTabClick("Emergency Operator")}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 border ${
                  selectedRole === "Emergency Operator"
                    ? "bg-blue-500/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/20"
                    : "bg-dark-950 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span>🚨 Operator</span>
                <span className="text-[9px] font-mono opacity-75">Dispatch HQ</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleTabClick("Admin")}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 border ${
                  selectedRole === "Admin"
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/20"
                    : "bg-dark-950 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span>🛡️ Admin</span>
                <span className="text-[9px] font-mono opacity-75">Full Access</span>
              </button>
            </div>
          </div>

          {/* Quick 1-Click Login Button */}
          <button
            type="button"
            onClick={() => handleDemoLogin(selectedRole)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
          >
            <UserCheck className="w-4 h-4" />
            <span>1-Click Instant Sign In as {selectedRole}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-dark-900 px-3 text-[10px] font-mono text-slate-400 uppercase">
              Or Sign In With Password
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 shadow-lg shadow-red-500/10">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-200">Authentication Failed</p>
                <p className="mt-0.5 text-[11px] text-red-300/90 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleRegularLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300">Email Address</label>
              <div className="mt-1 relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g. operator@urbancascade.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <div className="mt-1 relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In to Operations"}
            </button>
          </form>

          {/* Authorized Demo Logins Card */}
          <div className="p-3 rounded-xl bg-dark-950/80 border border-white/10 space-y-1.5 text-[11px] font-mono">
            <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" /> Valid Demo Logins (Password: password123)
            </div>
            <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-400">
              <div>• <span className="text-emerald-400 font-semibold">Citizen:</span> citizen@urbancascade.gov</div>
              <div>• <span className="text-blue-400 font-semibold">Operator:</span> operator@urbancascade.gov</div>
              <div>• <span className="text-cyan-400 font-semibold">Admin:</span> admin@urbancascade.gov</div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline font-semibold">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
