import { getStore } from "../config/db.js";
import { computeCascadeInfo } from "./incidentController.js";

export const getCitizenOverview = async (req, res) => {
  try {
    const store = getStore();
    const activeEmergencies = store.incidents
      .filter(i => i.status !== "Resolved")
      .map(i => ({
        id: i.id,
        title: i.title,
        type: i.type,
        location: i.location,
        coordinates: i.coordinates,
        severity: i.severity,
        roadBlocked: i.roadBlocked,
        time: i.time,
        safetyAdvisory: i.roadBlocked
          ? "CRITICAL: Heavy road blockage. Commuters are advised to divert via outer radial roads."
          : "CAUTION: Moderate delay expected. Follow emergency vehicles instructions."
      }));

    const activeAlerts = store.alerts
      .filter(a => !a.acknowledged)
      .slice(0, 5);

    const saferAlternativeRoutes = [
      {
        name: "Central Bypass via Cubbon Road Corridor",
        avoidArea: "MG Road - Brigade Junction",
        recommendedFor: "East-West Commuters",
        condition: "Flowing smoothly, no active blocks"
      },
      {
        name: "Ring Road Elevated Highway",
        avoidArea: "Silk Board Underpass Inundation",
        recommendedFor: "IT Corridor & Electronic City Transit",
        condition: "Normal speed limit (50 km/h)"
      }
    ];

    return res.json({
      success: true,
      data: {
        activeEmergencies,
        activeAlerts,
        saferAlternativeRoutes
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitCitizenReport = async (req, res) => {
  try {
    const { citizenName = "Anonymous Citizen", contact = "N/A", type, location, description, severity = "Medium" } = req.body;
    const store = getStore();

    if (!type || !location || !description) {
      return res.status(400).json({ success: false, message: "Type, location, and description are required." });
    }

    const reportId = `REP-${Math.floor(100 + Math.random() * 900)}`;
    const newReport = {
      id: reportId,
      citizenName,
      contact,
      type,
      location,
      description,
      severity,
      time: "Just now",
      timestamp: new Date().toISOString(),
      status: "Verified",
      promotedToIncidentId: null
    };

    store.citizenReports.unshift(newReport);

    // If severity is High or Critical, automatically promote into the incident system
    let promotedIncident = null;
    if (severity === "High" || severity === "Critical") {
      const nextIdNum = 8900 + store.incidents.length + 1;
      const incId = `INC-${nextIdNum}`;
      const cascadeMeta = computeCascadeInfo(type, severity, true);

      promotedIncident = {
        id: incId,
        title: `Citizen Reported: ${type} at ${location}`,
        type,
        category: type.toLowerCase().replace(" ", "_"),
        location,
        coordinates: [12.9716 + (Math.random() - 0.5) * 0.04, 77.5946 + (Math.random() - 0.5) * 0.04],
        severity,
        status: "Detected",
        time: "Just now",
        timestamp: new Date().toISOString(),
        affectedPopulation: cascadeMeta.affectedPopulation,
        impactRadiusKm: cascadeMeta.impactRadiusKm,
        riskScore: cascadeMeta.riskScore,
        description: `Citizen verified report (${citizenName}): ${description}`,
        assignedUnits: [],
        cascadeDepth: cascadeMeta.cascadeDepth,
        roadBlocked: true,
        cascadeEffects: [
          `Citizen alerted emergency services for ${type}`,
          `Local traffic restricted at ${location}`,
          `Emergency corridor assessment underway`
        ]
      };

      store.incidents.unshift(promotedIncident);
      newReport.promotedToIncidentId = incId;

      store.alerts.unshift({
        id: `ALT-${Date.now().toString().slice(-4)}`,
        title: `CITIZEN REPORT VERIFIED: ${type} at ${location}`,
        type: "Citizen Emergency Alert",
        severity,
        incidentId: incId,
        location,
        time: "Just now",
        timestamp: new Date().toISOString(),
        description: `Dispatched from civic verification queue. ${description}`,
        recommendedAction: "Operator confirmation required for unit dispatch.",
        acknowledged: false,
        acknowledgedBy: null
      });
    }

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "CITIZEN_REPORT_FILED",
      operator: citizenName,
      details: `Report ${reportId} submitted for ${type} at ${location}.`
    });

    if (global.io) {
      global.io.emit("citizen:newReport", newReport);
      if (promotedIncident) {
        global.io.emit("incident:new", promotedIncident);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Emergency report successfully transmitted to the Central Command Center.",
      data: newReport,
      promotedIncident
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
