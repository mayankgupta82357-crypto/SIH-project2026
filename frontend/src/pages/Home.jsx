import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  Zap,
  Activity,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Radio,
  GitMerge,
  Cpu,
  Database,
  Layers,
  HeartPulse,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Play
} from "lucide-react";
import { Navbar } from "../components/common/Navbar";
import { useIncidents } from "../context/IncidentContext";

export const Home = () => {
  const { startUrbanSimulation } = useIncidents();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Detect", desc: "Sensors, traffic telemetry & citizen reports flag primary disruptions immediately.", icon: Radio, color: "text-blue-400" },
    { title: "Analyze", desc: "Multi-layered urban graph cross-references road density, utility lines & transit flows.", icon: Activity, color: "text-cyan-400" },
    { title: "Predict", desc: "Heuristic AI models secondary and tertiary failure points before gridlocks occur.", icon: GitMerge, color: "text-purple-400" },
    { title: "Respond", desc: "Command center clears automated Green Emergency Corridors and dispatches units.", icon: Truck, color: "text-emerald-400" },
    { title: "Monitor", desc: "Real-time feedback loop ensures hospital trauma access and stabilizes traffic queues.", icon: HeartPulse, color: "text-rose-400" }
  ];

  const features = [
    { title: "Real-Time Incident Detection", desc: "Instant ingestion of collisions, flash floods, and transformer failures with geolocation.", icon: Radio, color: "text-blue-400" },
    { title: "Cascade Impact Prediction", desc: "Models multi-tier domino disruptions across arterial corridors and utility grids.", icon: GitMerge, color: "text-purple-400" },
    { title: "Emergency Route Optimization", desc: "Dynamic green corridors routing around congested bottlenecks with signal preemption.", icon: TrendingUp, color: "text-emerald-400" },
    { title: "Risk-Zone Visualization", desc: "Interactive Leaflet geospatial mapping with dynamic impact radius heat circles.", icon: MapPin, color: "text-amber-400" },
    { title: "Real-Time Alerts", desc: "Categorized priority broadcasts with actionable instructions for city operators.", icon: AlertTriangle, color: "text-rose-400" },
    { title: "Emergency Response Coordination", desc: "Unified dispatch for Ambulances, Fire Trucks, Police cruisers, and Rescue teams.", icon: Truck, color: "text-cyan-400" },
    { title: "AI Incident Analysis", desc: "Heuristic situation briefings detailing immediate threats and secondary risks.", icon: Cpu, color: "text-indigo-400" },
    { title: "Analytics Dashboard", desc: "High-density Recharts visualizations tracking response times, active threats & trends.", icon: Layers, color: "text-teal-400" }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern bg-radial-glow border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Next-Gen Urban Resilience Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Predict Urban Disruptions <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Before They Become Cascades.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                An intelligent emergency response platform that detects disruptions, analyzes cascading impacts, and helps coordinate faster urban responses.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/command-center"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-extrabold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/30 hover:scale-102"
                >
                  Explore Platform
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={startUrbanSimulation}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 font-bold text-sm hover:bg-red-500/25 transition-all shadow-md shadow-red-500/20"
                >
                  <Play className="w-4 h-4 fill-current text-red-400" />
                  View Live Demo
                </button>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-sm transition-all"
                >
                  <span>Sign In / Login</span>
                </Link>
              </div>

              {/* Prototype pill */}
              <div className="pt-2 text-xs text-slate-400 font-mono flex items-center gap-4">
                <span>✓ Zero Setup Required</span>
                <span>✓ Realistic Indian City Grid (Bengaluru)</span>
                <span>✓ Instant Demo Roles</span>
              </div>
            </div>

            {/* Right Interactive Visualizer (Hero City Cascade Visual) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-dark-900/90 border border-white/15 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-mono text-slate-400 ml-2">urban_cascade_radar.v2</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30 animate-pulse">
                    CRITICAL SIMULATION ACTIVE
                  </span>
                </div>

                {/* Animated Graphic Nodes */}
                <div className="mt-5 space-y-3">
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600/30 flex items-center justify-center text-red-400 font-bold text-sm">
                        💥
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">MG Road Tanker Collision</div>
                        <div className="text-[10px] text-red-300 font-mono">Arterial Blockage • Inbound Stalled</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-red-400">P1</span>
                  </div>

                  <div className="flex justify-center -my-1">
                    <div className="h-4 w-0.5 bg-red-500/50"></div>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                        🚦
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Residency Corridor Saturation</div>
                        <div className="text-[10px] text-orange-300 font-mono">+280% Density • Radial Spillover</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-400">+18m Delay</span>
                  </div>

                  <div className="flex justify-center -my-1">
                    <div className="h-4 w-0.5 bg-orange-500/50"></div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                        🚑
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Green Corridor Cleared</div>
                        <div className="text-[10px] text-emerald-300 font-mono">Richmond Flyover Bypass • AMB-101</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">Saved 19m</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Cascade Threat Score:</span>
                  <span className="text-rose-400 font-bold text-sm">94 / 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Urban Cascade? Section */}
      <section className="py-20 bg-dark-900/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            The Systemic Crisis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Why Urban Cascade?
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            In modern megacities, emergency response systems operate in isolated silos: police, fire, traffic, and healthcare don't share unified predictive intelligence. A single localized disruption rapidly triggers secondary domino effects across transit arteries, immobilizing emergency services when seconds count most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 hover:border-cyan-500/30 transition">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Isolated Systems</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Traffic management, ambulance dispatch, and disaster response don't synchronize in real time, causing delayed awareness of cascading bottlenecks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 hover:border-cyan-500/30 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <GitMerge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Unforeseen Cascades</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                A simple road accident turns into an arterial blockage, overflowing into surrounding neighborhoods and paralyzing critical hospital corridors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 hover:border-cyan-500/30 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Predictive Intervention</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Urban Cascade detects patterns early, pre-calculates bypass corridors, pre-empts traffic signals, and protects hospital access before gridlock occurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urban Cascade Example (THE CORE CONCEPT) */}
      <section className="py-24 bg-dark-950 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase">
            Core Project Demonstration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            The Urban Cascade Chain
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto mt-2">
            Watch how a single localized disruption rapidly metastasizes into an urban crisis if left unmanaged:
          </p>

          {/* Stepped Cascade Chain */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="p-5 rounded-2xl bg-dark-900 border border-red-500/40 text-left shadow-lg shadow-red-500/10 hover:scale-102 transition">
              <div className="text-[10px] font-mono font-bold text-red-400 uppercase">Stage 01</div>
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center my-3 font-bold text-lg">
                💥
              </div>
              <h4 className="text-sm font-extrabold text-white">Road Accident</h4>
              <p className="text-xs text-slate-400 mt-1">
                Multi-vehicle collision on arterial bridge or intersection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-orange-500/40 text-left shadow-lg shadow-orange-500/10 hover:scale-102 transition">
              <div className="text-[10px] font-mono font-bold text-orange-400 uppercase">Stage 02</div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center my-3 font-bold text-lg">
                🚧
              </div>
              <h4 className="text-sm font-extrabold text-white">Road Closure</h4>
              <p className="text-xs text-slate-400 mt-1">
                Debris & fuel spill forces police to block 4 carriage lanes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-amber-500/40 text-left shadow-lg shadow-amber-500/10 hover:scale-102 transition">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">Stage 03</div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center my-3 font-bold text-lg">
                🚗
              </div>
              <h4 className="text-sm font-extrabold text-white">Traffic Congestion</h4>
              <p className="text-xs text-slate-400 mt-1">
                Vehicles divert into narrow side roads, saturating 6 radial junctions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-purple-500/40 text-left shadow-lg shadow-purple-500/10 hover:scale-102 transition">
              <div className="text-[10px] font-mono font-bold text-purple-400 uppercase">Stage 04</div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center my-3 font-bold text-lg">
                ⏱️
              </div>
              <h4 className="text-sm font-extrabold text-white">Ambulance Delay</h4>
              <p className="text-xs text-slate-400 mt-1">
                Emergency units trapped in secondary gridlock; ETA +20 mins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-rose-500/40 text-left shadow-lg shadow-rose-500/10 hover:scale-102 transition">
              <div className="text-[10px] font-mono font-bold text-rose-400 uppercase">Stage 05</div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center my-3 font-bold text-lg">
                🏥
              </div>
              <h4 className="text-sm font-extrabold text-white">Hospital Access Risk</h4>
              <p className="text-xs text-slate-400 mt-1">
                Trauma center perimeter blocked, breaching the Golden Hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-dark-900/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Operational Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            How It Works
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            A closed-loop 5-phase intelligence cycle running continuously across city networks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="p-5 rounded-2xl bg-dark-950 border border-white/10 text-left hover:border-cyan-500/30 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 font-bold">0{idx + 1}</span>
                    <Icon className={`w-5 h-5 ${s.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-4">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section id="features" className="py-24 bg-dark-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Comprehensive Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Key Platform Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-5 rounded-2xl bg-dark-900 border border-white/10 hover:border-cyan-500/40 transition hover:scale-102 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                      <Icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <h3 className="text-sm font-extrabold text-white">{f.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Realistic System Prototype Statistics */}
      <section className="py-20 bg-dark-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Prototype Evaluation Telemetry
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Active System Baseline Statistics
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Simulated live telemetry calibrated for Bengaluru Central Grid
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">5</div>
              <div className="text-xs font-bold text-slate-200 mt-1">Active Incidents</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">2 Critical Cascades</div>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">12</div>
              <div className="text-xs font-bold text-slate-200 mt-1">Monitored Zones</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">High Density Corridors</div>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">8</div>
              <div className="text-xs font-bold text-slate-200 mt-1">Emergency Units</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Ambulances, Fire, Police</div>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">11.8m</div>
              <div className="text-xs font-bold text-slate-200 mt-1">Avg Response Time</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Down 35% with Corridor Preempt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-dark-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Architecture Stack
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Engineered with Modern Web Standards
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8">
            {["React 18", "Node.js", "Express", "MongoDB", "Leaflet Maps", "REST APIs", "Socket.IO", "Tailwind CSS", "Recharts", "Heuristic AI"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs font-mono font-bold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to monitor your city?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Experience the complete command center with live maps, interactive cascade graphs, emergency routing, and automated simulation triggers.
          </p>
          <div className="pt-2">
            <Link
              to="/command-center"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-extrabold text-sm hover:scale-105 transition-all shadow-xl shadow-cyan-500/25"
            >
              Launch Command Center
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 bg-dark-950 border-t border-white/10 text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">Urban Cascade Intelligence & Response System</span>
          </div>
          <div>Built for College / Hackathon Emergency Resilience Presentation</div>
          <div>Metropolitan Area: Bengaluru Central Grid</div>
        </div>
      </footer>
    </div>
  );
};
