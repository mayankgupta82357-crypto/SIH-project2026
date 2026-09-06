import { getStore } from "../config/db.js";

// Generates the cascade node chain & AI heuristic intelligence
export const buildCascadeGraph = (incident) => {
  const type = incident.type || "Accident";
  const loc = incident.location || "Urban Corridor";
  const sev = incident.severity || "Critical";

  let nodes = [];
  let links = [];
  let aiAnalysis = {};

  if (type === "Accident") {
    nodes = [
      {
        id: "c-1",
        tier: 1,
        title: "Primary Disruption",
        label: `Major Collision & Fuel Hazard`,
        location: loc,
        status: "Critical Active",
        icon: "AlertTriangle",
        riskContribution: 35,
        details: "Multi-vehicle impact with high volatile fluid spillage blocking both carriage lanes."
      },
      {
        id: "c-2",
        tier: 2,
        title: "Infrastructure Impact",
        label: "Arterial Road Closure",
        location: `${loc} Corridor`,
        status: "Full Blockage",
        icon: "ShieldAlert",
        riskContribution: 20,
        details: "Police barricades deployed. 6 lanes of inbound & outbound traffic halted."
      },
      {
        id: "c-3",
        tier: 3,
        title: "Systemic Ripple",
        label: "Spillover Traffic Congestion",
        location: "Connecting Radial Intersections",
        status: "+280% Density",
        icon: "Flame",
        riskContribution: 18,
        details: "Traffic spilling onto Residency, Richmond, and Hosur connector arteries."
      },
      {
        id: "c-4",
        tier: 4,
        title: "Service Degradation",
        label: "Emergency Vehicle Delay",
        location: "Central Trauma Zone",
        status: "+18 Min Response Lag",
        icon: "Clock",
        riskContribution: 15,
        details: "Ambulance units AMB-101 and AMB-102 caught in gridlock; response times triple."
      },
      {
        id: "c-5",
        tier: 5,
        title: "Public Health Vulnerability",
        label: "Hospital Trauma Access Risk",
        location: "Victoria & Manipal Corridors",
        status: "Severe Impairment",
        icon: "HeartPulse",
        riskContribution: 12,
        details: "Emergency ambulance access to critical ICU and trauma bays compromised."
      },
      {
        id: "c-6",
        tier: 6,
        title: "Network Saturation",
        label: "Intersection Overload",
        location: "Mayo Hall & Trinity Junctions",
        status: "Gridlock Saturation",
        icon: "Layers",
        riskContribution: 10,
        details: "Cascading signal timeouts create non-clearing bottleneck across central district."
      }
    ];

    links = [
      { source: "c-1", target: "c-2", label: "Forces full closure" },
      { source: "c-2", target: "c-3", label: "Diverts 14,000 veh/hr" },
      { source: "c-3", target: "c-4", label: "Traps emergency corridors" },
      { source: "c-4", target: "c-5", label: "Breaches Golden Hour window" },
      { source: "c-3", target: "c-6", label: "Exceeds junction clearance" }
    ];

    aiAnalysis = {
      summary: `A severe collision at ${loc} has initiated a multi-tier cascade. Inbound arterial closure has caused rapid traffic spillover into secondary corridors, actively threatening hospital trauma transit corridors.`,
      immediateRisks: [
        "Fuel vapor ignition hazard within 150m blast perimeter",
        "Total stoppage of emergency medical access to Victoria and Manipal Hospitals",
        "Secondary rear-end collisions resulting from sudden deceleration on approach flyovers"
      ],
      secondaryEffects: [
        "Transit delay exceeding 25 minutes for 18 public bus routes",
        "Mayo Hall and Trinity Circle traffic gridlock preventing fire tender movement",
        "Economic dispatch delay for medical logistics and delivery fleets across central zone"
      ],
      recommendedActions: [
        {
          priority: "CRITICAL (P1)",
          action: "Designate Richmond Road Flyover as an automated Green Emergency Corridor",
          assignedTo: "Traffic Control HQ"
        },
        {
          priority: "HIGH (P2)",
          action: "Preempt all traffic signals along Victoria Hospital approach to permanent green for approaching ambulances",
          assignedTo: "Signal Automation System"
        },
        {
          priority: "HIGH (P2)",
          action: "Deploy foam unit FT-07 to neutralize surface fuel spill and prevent combustion",
          assignedTo: "Central Fire Brigade"
        },
        {
          priority: "MEDIUM (P3)",
          action: "Push geo-fenced mobile rerouting notifications to 45,000 citizens in central grid",
          assignedTo: "Citizen Advisory Cell"
        }
      ],
      priority: "CRITICAL - IMMEDIATE INTERVENTION MANDATED",
      confidenceScore: 94,
      disclaimer: "Prototype rule-based heuristic prediction engine for decision-support and emergency simulation purposes."
    };
  } else if (type === "Fire") {
    nodes = [
      {
        id: "c-1",
        tier: 1,
        title: "Primary Disruption",
        label: "Electrical Vault Transformer Fire",
        location: loc,
        status: "Active Blaze",
        icon: "Flame",
        riskContribution: 30,
        details: "Subterranean oil-filled transformer explosion with toxic dense smoke plume."
      },
      {
        id: "c-2",
        tier: 2,
        title: "Utility Outage",
        label: "Grid Feeder & Power Blackout",
        location: "Indiranagar Commercial Sector",
        status: "4 Feeders Tripped",
        icon: "ZapOff",
        riskContribution: 25,
        details: "BESCOM 11kV substation offline. Automatic traffic lights disabled across 6 intersections."
      },
      {
        id: "c-3",
        tier: 3,
        title: "Traffic Instability",
        label: "Unregulated Junction Gridlock",
        location: "100ft & 12th Main Confluence",
        status: "Signal Failure",
        icon: "AlertTriangle",
        riskContribution: 20,
        details: "Traffic light blackout forces chaotic merging, slowing evacuation and rescue access."
      },
      {
        id: "c-4",
        tier: 4,
        title: "Civic Threat",
        label: "Toxic Gas Dispersion & Evacuation",
        location: "Commercial Shopping Corridor",
        status: "Evacuation Perimeter",
        icon: "ShieldAlert",
        riskContribution: 15,
        details: "Sulfur hexafluoride and burning oil particulates necessitate 300m safety radius."
      }
    ];

    links = [
      { source: "c-1", target: "c-2", label: "Feeder auto-trip" },
      { source: "c-2", target: "c-3", label: "Signal deactivation" },
      { source: "c-1", target: "c-4", label: "Windborne plume dispersion" }
    ];

    aiAnalysis = {
      summary: `Substation fire at ${loc} triggered power cutoff, creating traffic signal blackouts and toxic plume dispersion along commercial corridors.`,
      immediateRisks: [
        "Inhalation hazard for retail shoppers and residents downwind",
        "High voltage arc flash during initial suppression attempts",
        "Traffic chaos at unmonitored major junctions"
      ],
      secondaryEffects: [
        "Emergency generator failures in surrounding clinics",
        "Commercial district business shutdown affecting over 18,000 people"
      ],
      recommendedActions: [
        { priority: "CRITICAL (P1)", action: "De-energize remaining 11kV grid sections before applying fire retardant", assignedTo: "BESCOM Grid Desk" },
        { priority: "HIGH (P2)", action: "Deploy traffic police officers with manual hand signals to 12th Main junction", assignedTo: "Traffic Police" },
        { priority: "MEDIUM (P3)", action: "Evacuate buildings within 250m downwind corridor", assignedTo: "Disaster Response Team" }
      ],
      priority: "HIGH - HAZARDOUS MATERIAL PERIMETER",
      confidenceScore: 89,
      disclaimer: "Prototype rule-based heuristic prediction engine."
    };
  } else {
    // Flood / Blockage / Other
    nodes = [
      {
        id: "c-1",
        tier: 1,
        title: "Primary Disruption",
        label: `${type} Event`,
        location: loc,
        status: "Active Hazard",
        icon: "Droplets",
        riskContribution: 35,
        details: `Disruption reported at ${loc} impacting road passability.`
      },
      {
        id: "c-2",
        tier: 2,
        title: "Flow Restriction",
        label: "Transit Choke Point",
        location: `${loc} Peripheral`,
        status: "Capacity Cut by 75%",
        icon: "ShieldAlert",
        riskContribution: 25,
        details: "Vehicular speed reduced to under 5 km/h, tailbacks forming."
      },
      {
        id: "c-3",
        tier: 3,
        title: "Corridor Disruption",
        label: "Arterial Transit Stoppage",
        location: "Outer Ring Connecting Road",
        status: "Heavy Tailback",
        icon: "Clock",
        riskContribution: 20,
        details: "Mass transit bus delays compounding into multi-kilometer tailback."
      },
      {
        id: "c-4",
        tier: 4,
        title: "Economic & Medical Delay",
        label: "Regional Service Stagnation",
        location: "Metropolitan Sector",
        status: "Cascade Stoppage",
        icon: "Layers",
        riskContribution: 20,
        details: "Logistics and shift workers delayed, emergency access severely impeded."
      }
    ];

    links = [
      { source: "c-1", target: "c-2", label: "Water/debris accumulation" },
      { source: "c-2", target: "c-3", label: "Vehicle stalling" },
      { source: "c-3", target: "c-4", label: "Transit gridlock" }
    ];

    aiAnalysis = {
      summary: `Severe ${type} at ${loc} has created an impassable bottleneck, threatening transit links and emergency logistics across surrounding zones.`,
      immediateRisks: [
        "Vehicle stalling and engine damage causing secondary immovable obstructions",
        "Pedestrian stranding and electrical shock risks from submerged cabling"
      ],
      secondaryEffects: [
        "Long-term pavement degradation and commuter gridlock lasting > 3 hours",
        "Emergency response vehicles forced onto circuitous diversion routes"
      ],
      recommendedActions: [
        { priority: "CRITICAL (P1)", action: "Activate high-volume drainage pumps and heavy recovery cranes", assignedTo: "Municipal Works" },
        { priority: "HIGH (P2)", action: "Divert light motor vehicles to elevated bypass expressways", assignedTo: "Traffic Control" }
      ],
      priority: "HIGH - INFRASTRUCTURE ADVISORY",
      confidenceScore: 91,
      disclaimer: "Prototype rule-based heuristic prediction engine."
    };
  }

  return {
    incidentId: incident.id,
    incidentTitle: incident.title,
    location: incident.location,
    severity: incident.severity,
    riskScore: incident.riskScore || 85,
    impactRadiusKm: incident.impactRadiusKm || 2.5,
    affectedPopulation: incident.affectedPopulation || 35000,
    cascadeDepth: nodes.length,
    confidenceScore: aiAnalysis.confidenceScore || 92,
    nodes,
    links,
    aiAnalysis
  };
};

export const getCascadeAnalysis = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const store = getStore();
    const incident = store.incidents.find(i => i.id === incidentId) || store.incidents[0];

    if (!incident) {
      return res.status(404).json({ success: false, message: "No active incidents found." });
    }

    const analysis = buildCascadeGraph(incident);
    return res.json({ success: true, data: analysis });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const simulateCascadeScenario = async (req, res) => {
  try {
    const { scenarioType = "Accident", location = "MG Road Corridor" } = req.body;
    const fakeIncident = {
      id: `SIM-${Date.now().toString().slice(-4)}`,
      title: `Simulated ${scenarioType} Cascade`,
      type: scenarioType,
      location,
      severity: "Critical",
      riskScore: 91,
      impactRadiusKm: 3.0,
      affectedPopulation: 48000
    };
    const analysis = buildCascadeGraph(fakeIncident);
    return res.json({ success: true, data: analysis });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
