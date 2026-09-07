import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldAlert, Zap, Menu, X, ArrowRight, Layers, MapPin, LogIn, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Citizen Portal", href: "/citizen" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Features", href: "/#features" },
    { label: "Technology", href: "/#technology" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Urban Cascade
              </span>
              <span className="block text-[10px] tracking-wider text-cyan-400 uppercase font-mono font-medium -mt-1">
                Intelligence & Response
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Always Visible Sign In Button */}
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-semibold transition hover:border-cyan-500/40"
              title="Sign In as Citizen, Operator, or Admin"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sign In / Login</span>
            </Link>

            <Link
              to="/command-center"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/25"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>
          </div>

          {/* Mobile Actions: Direct Sign In + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-sm shadow-cyan-500/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              title="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-white/10 bg-dark-900/95 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-slate-300 hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-sm flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Login (Citizen, Operator, Admin)</span>
            </Link>
            <Link
              to="/command-center"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-sm"
            >
              Launch Command Center
            </Link>
            <Link
              to="/citizen"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/20"
            >
              Citizen Emergency Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
