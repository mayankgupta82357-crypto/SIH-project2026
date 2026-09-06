import { getStore } from "../config/db.js";

export const getAnalytics = async (req, res) => {
  try {
    const { timeframe = "7d" } = req.query;
    const store = getStore();

    // Incident types breakdown
    const typeCounts = {
      Accident: 0,
      Fire: 0,
      Flood: 0,
      "Road Blockage": 0,
      "Infrastructure Failure": 0,
      Other: 0
    };
    store.incidents.forEach(i => {
      if (typeCounts[i.type] !== undefined) {
        typeCounts[i.type]++;
      } else {
        typeCounts.Other++;
      }
    });

    const incidentsByType = Object.entries(typeCounts).map(([name, value]) => ({
      name,
      count: value
    }));

    // Timeline trends based on timeframe
    let timeline = [];
    if (timeframe === "today") {
      timeline = [
        { time: "06:00", incidents: 1, cascades: 0, responseTime: 8.2 },
        { time: "08:00", incidents: 3, cascades: 2, responseTime: 12.4 },
        { time: "10:00", incidents: 4, cascades: 3, responseTime: 14.1 },
        { time: "12:00", incidents: 2, cascades: 1, responseTime: 9.8 },
        { time: "14:00", incidents: 3, cascades: 2, responseTime: 11.2 },
        { time: "16:00", incidents: 6, cascades: 5, responseTime: 17.5 },
        { time: "18:00", incidents: 5, cascades: 4, responseTime: 15.3 },
        { time: "20:00", incidents: 2, cascades: 1, responseTime: 8.9 }
      ];
    } else if (timeframe === "30d") {
      timeline = [
        { time: "Week 1", incidents: 28, cascades: 14, responseTime: 11.2 },
        { time: "Week 2", incidents: 34, cascades: 19, responseTime: 12.8 },
        { time: "Week 3", incidents: 22, cascades: 11, responseTime: 9.7 },
        { time: "Week 4", incidents: 31, cascades: 16, responseTime: 13.4 }
      ];
    } else {
      // 7 days (default)
      timeline = [
        { time: "Mon", incidents: 4, cascades: 2, responseTime: 10.5 },
        { time: "Tue", incidents: 6, cascades: 4, responseTime: 12.1 },
        { time: "Wed", incidents: 3, cascades: 1, responseTime: 9.4 },
        { time: "Thu", incidents: 8, cascades: 6, responseTime: 14.8 },
        { time: "Fri", incidents: 7, cascades: 5, responseTime: 13.9 },
        { time: "Sat", incidents: 5, cascades: 3, responseTime: 11.0 },
        { time: "Sun", incidents: 3, cascades: 1, responseTime: 8.5 }
      ];
    }

    // Response time by metropolitan zone
    const responseByZone = [
      { zone: "Central Core (MG/Brigade)", avgMinutes: 14.2, targetMinutes: 8.0 },
      { zone: "East Corridor (Indiranagar)", avgMinutes: 11.8, targetMinutes: 8.0 },
      { zone: "South Belt (Koramangala/Silk Board)", avgMinutes: 16.5, targetMinutes: 8.0 },
      { zone: "North Radial (Hebbal)", avgMinutes: 13.1, targetMinutes: 8.0 },
      { zone: "West Industrial (Majestic)", avgMinutes: 9.6, targetMinutes: 8.0 }
    ];

    // Cascade event severity depth distribution
    const cascadeDepthData = [
      { tier: "Tier 1: Disruption", events: 24, avgRisk: 90 },
      { tier: "Tier 2: Arterial Block", events: 18, avgRisk: 82 },
      { tier: "Tier 3: Gridlock Ripple", events: 14, avgRisk: 75 },
      { tier: "Tier 4: Vehicle Delay", events: 11, avgRisk: 68 },
      { tier: "Tier 5: Hospital Risk", events: 8, avgRisk: 88 }
    ];

    // Overall summary metrics
    const activeIncidents = store.incidents.filter(i => i.status !== "Resolved").length;
    const resolvedIncidents = store.incidents.filter(i => i.status === "Resolved").length;
    const criticalIncidents = store.incidents.filter(i => i.severity === "Critical" && i.status !== "Resolved").length;
    const totalAffectedPopulation = store.incidents
      .filter(i => i.status !== "Resolved")
      .reduce((sum, i) => sum + (i.affectedPopulation || 0), 0);
    const avgResponseTime = 11.8; // Prototype average response minutes

    return res.json({
      success: true,
      timeframe,
      summary: {
        activeIncidents,
        resolvedIncidents,
        criticalIncidents,
        totalAffectedPopulation,
        avgResponseTime,
        monitoredZones: 12,
        activeEmergencyUnits: store.units.filter(u => u.status !== "Available").length,
        totalEmergencyUnits: store.units.length,
        overallRiskScore: 84
      },
      incidentsByType,
      timeline,
      responseByZone,
      cascadeDepthData,
      resolutionRatio: [
        { name: "Active", value: activeIncidents },
        { name: "Resolved", value: resolvedIncidents || 3 }
      ]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
