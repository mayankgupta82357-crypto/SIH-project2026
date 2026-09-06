import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("admin@urbancascade.gov");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const { login, demoLogin, loading } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-dark-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-grid-pattern bg-radial-glow">
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
          Operational Portal Sign In
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-mono">
          Access the Command Center or Citizen Advisory Grid
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-dark-900 border border-white/10 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          {/* 1-Click Demo Login Badges */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2.5">
            <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              Fast 1-Click Demo Logins (No Setup Required)
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleDemoLogin("Admin")}
                className="px-2 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
              >
                Demo Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("Emergency Operator")}
                className="px-2 py-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 font-bold text-xs transition"
              >
                Demo Operator
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("Citizen")}
                className="px-2 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition"
              >
                Demo Citizen
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-dark-900 px-3 text-[11px] font-mono text-slate-400 uppercase">
              Or Sign In Manually
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs">
              {error}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
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
