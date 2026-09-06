import { getStore, resetStore } from "../config/db.js";
import { buildCascadeGraph } from "./cascadeController.js";

export const getSimulationStages = () => [
  {
    step: 1,
    title: "1. Sudden Incident Inception",
    description: "Multi-vehicle collision involving an LPG chemical tanker and 2 SUVs occurs at MG Road - Brigade Junction.",
    metrics: { riskScore: 72, affectedPopulation: 14000, activeIncidents: 6 },
    badge: "INCIDENT OCCURRED",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    step: 2,
    title: "2. Real-Time Dashboard Ingestion",
    description: "AI incident telemetry feeds the incident into the Command Center with priority CRITICAL flag.",
    metrics: { riskScore: 75, affectedPopulation: 18000, activeIncidents: 6 },
    badge: "INGESTED TO PIPELINE",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  {
    step: 3,
    title: "3. Live Map Pinpoint & Geolocation",
    description: "Coordinates [12.9740, 77.6080] mapped with pulsing emergency beacon and live hazard radius circle.",
    metrics: { riskScore: 78, affectedPopulation: 22000, impactRadiusKm: 1.5 },
    badge: "MAP SYNCHRONIZED",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    step: 4,
    title: "4. Roadway Arterial Closure",
    description: "MG Road east-west carriage way marked completely BLOCKED. High chemical vapor hazard requires police cordon.",
    metrics: { riskScore: 82, affectedPopulation: 28000, roadBlocked: true },
    badge: "CORRIDOR IMPASSABLE",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    step: 5,
    title: "5. Traffic Risk Spike (+65%)",
    description: "Connecting radials on Residency Rd, Richmond Rd, and Mayo Hall experience rapid queue build-up.",
    metrics: { riskScore: 85, congestionIndex: "+68%", affectedPopulation: 34000 },
    badge: "CONGESTION CASCADE",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  },
  {
    step: 6,
    title: "6. Secondary Cascade Event Triggered",
    description: "Ambulance AMB-102 caught in spillover tailback. Projected transit delay jumps from 4 min to 22 min.",
    metrics: { riskScore: 88, transitDelay: "+18 min", cascadeDepth: 4 },
    badge: "SECONDARY BOTTLENECK",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    step: 7,
    title: "7. Prototype Risk Score Recalculation",
    description: "Neural heuristic analyzer calculates combined cascade risk: 94/100 (SYSTEMIC CRISIS).",
    metrics: { riskScore: 94, confidenceScore: 94, cascadeDepth: 5 },
    badge: "RISK ELEVATION",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30"
  },
  {
    step: 8,
    title: "8. Critical Alert Broadcast",
    description: "Urgent red alert broadcasted to Emergency Dispatch, Traffic Control, and Municipal Services.",
    metrics: { alertsCount: 5, activeDispatches: 2 },
    badge: "BROADCAST ACTIVE",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  {
    step: 9,
    title: "9. Affected Impact Zone Expansion",
    description: "Threat radius dynamically expanded to 2.8 km, encompassing 45,000 citizens and 3 major trauma corridors.",
    metrics: { impactRadiusKm: 2.8, affectedPopulation: 45000 },
    badge: "ZONE EXPANDED",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
  },
  {
    step: 10,
    title: "10. Intelligent Ambulance Dispatch",
    description: "Command Center auto-selects and dispatches backup ALS Ambulance AMB-101 from Victoria Hospital base.",
    metrics: { dispatchedUnit: "AMB-101", unitStatus: "Dispatched", eta: 9 },
    badge: "UNIT DISPATCHED",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    step: 11,
    title: "11. Green Emergency Corridor Computed",
    description: "Dynamic routing algorithm calculates Richmond Flyover bypass, circumventing all 3 jammed intersections.",
    metrics: { routeTime: "9 mins (Saved 19 mins)", routeDistance: "4.8 km" },
    badge: "ROUTE OPTIMIZED",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30"
  },
  {
    step: 12,
    title: "12. Dashboard Live Statistics Synchronized",
    description: "All charts, telemetry counters, and response unit statuses refreshed in real-time.",
    metrics: { avgResponseTime: 12.4, systemStatus: "Active Response" },
    badge: "TELEMETRY SYNCED",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  },
  {
    step: 13,
    title: "13. Cascade Chain Finalized & Action Plan",
    description: "Complete 6-node cascade tree materialized with multi-agency prioritized response recommendations.",
    metrics: { cascadeComplete: true, recommendedActionsCount: 6 },
    badge: "CASCADE MAPPED",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30"
  }
];

export const runSimulation = async (req, res) => {
  try {
    const store = getStore();

    // Ensure the primary demonstration incident is in full Critical state
    let demoIncident = store.incidents.find(i => i.id === "INC-8901");
    if (!demoIncident) {
      demoIncident = {
        id: "INC-8901",
        title: "Multi-Vehicle Collision & Fuel Leak",
        type: "Accident",
        category: "accident",
        location: "MG Road - Brigade Road Junction",
        coordinates: [12.9740, 77.6080],
        severity: "Critical",
        status: "Responding",
        time: "Just now",
        timestamp: new Date().toISOString(),
        affectedPopulation: 45000,
        impactRadiusKm: 2.8,
        riskScore: 94,
        description: "3 vehicles collided including a fuel tanker. Both east and westbound corridors blocked. Fuel spill hazard triggers secondary arterial gridlock across Residency Rd.",
        assignedUnits: ["AMB-101", "AMB-102", "PCR-12"],
        cascadeDepth: 5,
        roadBlocked: true,
        cascadeEffects: [
          "Road Closure on MG Road Arterial Corridor",
          "Severe Traffic Spillover to Residency & Richmond Roads",
          "Ambulance Delay (+18 min) for Manipal Hospital Corridor",
          "Hospital Trauma Access Route Impairment",
          "Gridlock at Mayo Hall & Brigade Signal Intersections"
        ]
      };
      store.incidents.unshift(demoIncident);
    } else {
      demoIncident.status = "Responding";
      demoIncident.riskScore = 94;
      demoIncident.roadBlocked = true;
      demoIncident.assignedUnits = ["AMB-101", "AMB-102", "PCR-12"];
    }

    // Update units
    const amb101 = store.units.find(u => u.id === "AMB-101");
    if (amb101) {
      amb101.status = "Dispatched";
      amb101.assignedIncident = "INC-8901";
      amb101.etaMinutes = 9;
    }

    // Add activity log
    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "CASCADE_SIMULATION_EXECUTED",
      operator: "Urban Cascade Simulator",
      details: "Executed complete 13-stage automated cascade scenario on MG Road Corridor."
    });

    const stages = getSimulationStages();
    const cascadeGraph = buildCascadeGraph(demoIncident);

    const recommendedResponse = {
      title: "Recommended Multi-Agency Response Protocol",
      actionItems: [
        { title: "Dispatch Ambulance AMB-101", detail: "Prioritize ALS unit via Green Corridor Richmond Flyover", priority: "P1" },
        { title: "Prioritize Emergency Corridor", detail: "Activate automated traffic signal preemption to Victoria Hospital", priority: "P1" },
        { title: "Redirect Traffic", detail: "Enforce heavy vehicle diversions at Mayo Hall and Trinity Circle", priority: "P2" },
        { title: "Alert Traffic Control HQ", detail: "Deploy traffic interceptors PCR-12 and PCR-09 for manual intersection clearance", priority: "P2" },
        { title: "Monitor Nearby Intersections", detail: "Maintain telemetry on Richmond Circle to prevent secondary deadlock", priority: "P3" },
        { title: "Protect Hospital Access", detail: "Establish 500m clear perimeter around Victoria and Bowring Trauma Bays", priority: "P1" }
      ]
    };

    if (global.io) {
      global.io.emit("simulation:executed", { stages, demoIncident, recommendedResponse });
    }

    return res.json({
      success: true,
      stages,
      incident: demoIncident,
      cascadeGraph,
      recommendedResponse
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetSimulation = async (req, res) => {
  try {
    const store = resetStore();
    if (global.io) {
      global.io.emit("system:reset", { message: "System state restored to baseline." });
    }
    return res.json({ success: true, message: "System reset to baseline state.", storeStatus: "OK" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
