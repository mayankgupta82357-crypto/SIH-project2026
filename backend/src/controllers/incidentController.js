import { getStore } from "../config/db.js";

// Helper to compute cascade metadata
export const computeCascadeInfo = (type, severity, roadBlocked = true) => {
  const severityMultipliers = { Low: 1.2, Medium: 2.0, High: 3.2, Critical: 4.5 };
  const mult = severityMultipliers[severity] || 2.0;

  let basePop = 10000;
  let baseRadius = 1.0;
  let baseRisk = 45;
  let depth = 2;

  if (type === "Accident") {
    basePop = 12000;
    baseRadius = 1.2;
    baseRisk = 50;
    depth = 5;
  } else if (type === "Fire") {
    basePop = 8000;
    baseRadius = 0.9;
    baseRisk = 55;
    depth = 4;
  } else if (type === "Flood") {
    basePop = 15000;
    baseRadius = 2.0;
    baseRisk = 48;
    depth = 4;
  } else if (type === "Road Blockage") {
    basePop = 9000;
    baseRadius = 1.1;
    baseRisk = 40;
    depth = 3;
  }

  const affectedPopulation = Math.round(basePop * mult * (roadBlocked ? 1.3 : 0.8));
  const impactRadiusKm = parseFloat((baseRadius * (mult * 0.4 + 0.6)).toFixed(1));
  const riskScore = Math.min(99, Math.round(baseRisk + (mult * 10)));

  return { affectedPopulation, impactRadiusKm, riskScore, cascadeDepth: depth };
};

export const getIncidents = async (req, res) => {
  try {
    const { type, severity, status, search } = req.query;
    const store = getStore();
    let list = [...store.incidents];

    if (type && type !== "All") {
      list = list.filter(i => i.type.toLowerCase() === type.toLowerCase());
    }
    if (severity && severity !== "All") {
      list = list.filter(i => i.severity.toLowerCase() === severity.toLowerCase());
    }
    if (status && status !== "All") {
      list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = getStore();
    const incident = store.incidents.find(i => i.id === id);

    if (!incident) {
      return res.status(404).json({ success: false, message: "Incident not found." });
    }

    return res.json({ success: true, data: incident });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createIncident = async (req, res) => {
  try {
    const store = getStore();
    const {
      title,
      type = "Accident",
      location,
      coordinates,
      severity = "Medium",
      description = "",
      roadBlocked = false
    } = req.body;

    if (!title || !location) {
      return res.status(400).json({ success: false, message: "Title and location are required." });
    }

    const nextIdNum = 8900 + store.incidents.length + 1;
    const id = `INC-${nextIdNum}`;

    // Default coordinates in Bengaluru central area if none provided
    const coords = coordinates && coordinates.length === 2
      ? coordinates
      : [12.9716 + (Math.random() - 0.5) * 0.05, 77.5946 + (Math.random() - 0.5) * 0.05];

    const cascadeMeta = computeCascadeInfo(type, severity, roadBlocked);

    const defaultEffects = [
      `${type} occurred at ${location}`,
      roadBlocked ? "Primary roadway blocked, triggering regional gridlock" : "Local traffic flow disrupted",
      "Emergency response routes diverted to secondary arterials",
      "Nearby intersection congestion index heightened"
    ];

    const newIncident = {
      id,
      title,
      type,
      category: type.toLowerCase().replace(" ", "_"),
      location,
      coordinates: coords,
      severity,
      status: "Detected",
      time: "Just now",
      timestamp: new Date().toISOString(),
      affectedPopulation: cascadeMeta.affectedPopulation,
      impactRadiusKm: cascadeMeta.impactRadiusKm,
      riskScore: cascadeMeta.riskScore,
      description: description || `Automated cascade incident record for ${type} at ${location}.`,
      assignedUnits: [],
      cascadeDepth: cascadeMeta.cascadeDepth,
      roadBlocked,
      cascadeEffects: defaultEffects
    };

    store.incidents.unshift(newIncident);

    // Auto-generate high-level alert
    const newAlert = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      title: `${severity.toUpperCase()} ALERT: ${title}`,
      type: severity === "Critical" ? "Critical Incident" : "Cascade Risk",
      severity,
      incidentId: id,
      location,
      time: "Just now",
      timestamp: new Date().toISOString(),
      description: `New ${severity} ${type} reported at ${location}. Cascade Risk Score: ${cascadeMeta.riskScore}/100.`,
      recommendedAction: "Dispatch first response units and inspect connecting arterials for cascade blockages.",
      acknowledged: false,
      acknowledgedBy: null
    };
    store.alerts.unshift(newAlert);

    // Log action
    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "INCIDENT_CREATED",
      operator: req.body.operator || "Command Center Operator",
      details: `Created incident ${id}: ${title} (${severity}) at ${location}.`
    });

    // Broadcast if global socket emitter exists
    if (global.io) {
      global.io.emit("incident:new", newIncident);
      global.io.emit("alert:new", newAlert);
    }

    return res.status(201).json({ success: true, data: newIncident });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const store = getStore();
    const index = store.incidents.findIndex(i => i.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Incident not found." });
    }

    const updated = { ...store.incidents[index], ...req.body, id };
    store.incidents[index] = updated;

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "INCIDENT_UPDATED",
      operator: req.body.operator || "Operator",
      details: `Updated incident ${id}: ${updated.title}.`
    });

    if (global.io) {
      global.io.emit("incident:updated", updated);
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const store = getStore();
    const incident = store.incidents.find(i => i.id === id);

    if (!incident) {
      return res.status(404).json({ success: false, message: "Incident not found." });
    }

    incident.status = status;
    if (status === "Resolved") {
      incident.riskScore = Math.round(incident.riskScore * 0.2);
      incident.roadBlocked = false;

      // Free assigned units
      incident.assignedUnits.forEach(uId => {
        const u = store.units.find(unit => unit.id === uId);
        if (u) {
          u.status = "Available";
          u.assignedIncident = null;
        }
      });
    }

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "STATUS_CHANGED",
      operator: req.body.operator || "Operator",
      details: `Incident ${id} status changed to ${status}.`
    });

    if (global.io) {
      global.io.emit("incident:statusChanged", { id, status, incident });
    }

    return res.json({ success: true, data: incident });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const assignUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { unitId } = req.body;
    const store = getStore();
    const incident = store.incidents.find(i => i.id === id);
    const unit = store.units.find(u => u.id === unitId);

    if (!incident) {
      return res.status(404).json({ success: false, message: "Incident not found." });
    }
    if (!unit) {
      return res.status(404).json({ success: false, message: "Unit not found." });
    }

    if (!incident.assignedUnits.includes(unitId)) {
      incident.assignedUnits.push(unitId);
    }
    unit.status = "Dispatched";
    unit.assignedIncident = id;
    unit.etaMinutes = Math.floor(Math.random() * 8) + 5;

    if (incident.status === "Detected") {
      incident.status = "Responding";
    }

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "UNIT_ASSIGNED",
      operator: req.body.operator || "Dispatch Officer",
      details: `Assigned unit ${unit.callsign} (${unit.id}) to incident ${incident.id}.`
    });

    if (global.io) {
      global.io.emit("unit:assigned", { incidentId: id, unitId, unit, incident });
    }

    return res.json({ success: true, data: { incident, unit } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const store = getStore();
    const index = store.incidents.findIndex(i => i.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Incident not found." });
    }

    const removed = store.incidents.splice(index, 1)[0];

    // Free assigned units
    removed.assignedUnits.forEach(uId => {
      const u = store.units.find(unit => unit.id === uId);
      if (u) {
        u.status = "Available";
        u.assignedIncident = null;
      }
    });

    return res.json({ success: true, message: `Incident ${id} removed.`, data: removed });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
