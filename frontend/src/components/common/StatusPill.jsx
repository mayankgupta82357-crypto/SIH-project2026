import React from "react";

export const SeverityPill = ({ severity = "Medium" }) => {
  const styles = {
    Critical: "bg-red-500/15 text-red-400 border-red-500/30",
    High: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  };

  const dots = {
    Critical: "bg-red-400 animate-ping",
    High: "bg-amber-400",
    Medium: "bg-yellow-400",
    Low: "bg-emerald-400"
  };

  const style = styles[severity] || styles.Medium;
  const dot = dots[severity] || dots.Medium;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      {severity}
    </span>
  );
};

export const StatusPill = ({ status = "Detected" }) => {
  const styles = {
    Detected: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Investigating: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    Responding: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    Contained: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    Resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Dispatched: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    "En Route": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "On Scene": "bg-rose-500/15 text-rose-400 border-rose-500/30",
    Returning: "bg-slate-500/15 text-slate-300 border-slate-500/30"
  };

  const style = styles[status] || "bg-slate-700 text-slate-300 border-slate-600";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`}>
      {status}
    </span>
  );
};
