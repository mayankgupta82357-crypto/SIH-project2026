import React, { useState, useEffect } from "react";
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  X,
  ArrowRight,
  ShieldAlert,
  Truck,
  HeartPulse,
  Navigation
} from "lucide-react";
import { useIncidents } from "../../context/IncidentContext";

export const SimulationModal = () => {
  const {
    simulationActive,
    setSimulationActive,
    simulationStages,
    simulationResult,
    resetSimulation
  } = useIncidents();

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const totalSteps = simulationStages.length || 13;

  useEffect(() => {
    if (!simulationActive) {
      setCurrentStep(0);
      return;
    }

    if (!isPlaying) return;

    if (currentStep < totalSteps - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [simulationActive, isPlaying, currentStep, totalSteps]);

  if (!simulationActive) return null;

  const currentStage = simulationStages[currentStep] || {
    step: currentStep + 1,
    title: `Stage ${currentStep + 1} Progression`,
    description: "Synthesizing cascading disruptions across urban corridors...",
    badge: "PROCESSING",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  };

  const isComplete = currentStep === totalSteps - 1;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-dark-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-3 sm:p-5 border-b border-white/10 bg-dark-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20 flex-shrink-0">
              <Zap className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Urban Cascade Live Simulation
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono">
                  13-Stage Orchestration
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automated multi-agency incident detection, cascade propagation & response protocol
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>

            <button
              onClick={() => {
                resetSimulation();
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSimulationActive(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Timeline Indicator */}
        <div className="px-6 pt-4 pb-2 bg-dark-950/60 border-b border-white/5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>
              Stage <b className="text-cyan-400">{currentStep + 1}</b> of {totalSteps}
            </span>
            <span className="text-cyan-400 font-bold">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
            </span>
          </div>

          {/* Stepper Bar */}
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500 transition-all duration-500 rounded-full"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active Stage Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-dark-950 to-dark-850 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${currentStage.badgeColor}`}>
                {currentStage.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Real-Time Simulation State
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white mt-3">
              {currentStage.title}
            </h3>

            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {currentStage.description}
            </p>

            {/* Stage Metrics Ticker */}
            {currentStage.metrics && (
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono">
                {currentStage.metrics.riskScore && (
                  <span className="text-rose-400">
                    Risk Score: <b>{currentStage.metrics.riskScore}/100</b>
                  </span>
                )}
                {currentStage.metrics.affectedPopulation && (
                  <span className="text-amber-400">
                    Population Impact: <b>{currentStage.metrics.affectedPopulation.toLocaleString()}</b>
                  </span>
                )}
                {currentStage.metrics.transitDelay && (
                  <span className="text-purple-400">
                    Ambulance Delay: <b>{currentStage.metrics.transitDelay}</b>
                  </span>
                )}
                {currentStage.metrics.congestionIndex && (
                  <span className="text-orange-400">
                    Congestion Spike: <b>{currentStage.metrics.congestionIndex}</b>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Stepper Navigation Pills */}
          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-13 gap-1.5">
            {simulationStages.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`py-2 px-1 rounded text-center font-mono text-[10px] font-bold transition ${
                  idx === currentStep
                    ? "bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/30"
                    : idx < currentStep
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Final Completed Summary (Displays Recommended Multi-Agency Response) */}
          {isComplete && (
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-left space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Simulation Concluded: Recommended Response Strategy
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-dark-950/80 border border-white/5 flex items-start gap-2.5">
                  <HeartPulse className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <b className="text-white block font-semibold">1. Dispatch Ambulance (AMB-101)</b>
                    <span className="text-slate-400">Deploy ALS ambulance via clear Richmond corridor.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/80 border border-white/5 flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <b className="text-white block font-semibold">2. Prioritize Emergency Corridor</b>
                    <span className="text-slate-400">Preempt traffic lights to Victoria & Manipal trauma centers.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/80 border border-white/5 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <b className="text-white block font-semibold">3. Redirect Traffic Flow</b>
                    <span className="text-slate-400">Divert vehicles away from MG Road via Cubbon Road & Residency.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/80 border border-white/5 flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <b className="text-white block font-semibold">4. Alert Traffic Control HQ</b>
                    <span className="text-slate-400">Deploy patrol cars PCR-12 and PCR-09 for junction policing.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/80 border border-white/5 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <b className="text-white block font-semibold">5. Monitor Nearby Intersections</b>
                    <span className="text-slate-400">Track Mayo Hall and Trinity Circle to mitigate secondary stalls.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/80 border border-white/5 flex items-start gap-2.5">
                  <HeartPulse className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <b className="text-white block font-semibold">6. Protect Hospital Access</b>
                    <span className="text-slate-400">Keep emergency access bays unobstructed for oncoming trauma transfers.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-white/10 bg-dark-950 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-lg bg-white/5 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30"
          >
            ← Previous Stage
          </button>

          <div className="flex items-center gap-3">
            {isComplete ? (
              <button
                onClick={() => setSimulationActive(false)}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition"
              >
                Done / Explore Dashboard
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
                className="px-5 py-2 rounded-lg bg-cyan-500 text-dark-950 text-xs font-bold hover:bg-cyan-400 transition flex items-center gap-1.5"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
