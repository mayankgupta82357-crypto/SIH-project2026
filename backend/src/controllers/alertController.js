import { getStore } from "../config/db.js";

export const getAlerts = async (req, res) => {
  try {
    const { severity, unacknowledgedOnly } = req.query;
    const store = getStore();
    let list = [...store.alerts];

    if (severity && severity !== "All") {
      list = list.filter(a => a.severity.toLowerCase() === severity.toLowerCase());
    }
    if (unacknowledgedOnly === "true") {
      list = list.filter(a => !a.acknowledged);
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const acknowledgeAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const { operatorName = "Operator" } = req.body;
    const store = getStore();
    const alert = store.alerts.find(a => a.id === id);

    if (!alert) {
      return res.status(404).json({ success: false, message: "Alert not found." });
    }

    alert.acknowledged = true;
    alert.acknowledgedBy = operatorName;

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "ALERT_ACKNOWLEDGED",
      operator: operatorName,
      details: `Acknowledged alert ${id}: ${alert.title}`
    });

    if (global.io) {
      global.io.emit("alert:acknowledged", { id, alert });
    }

    return res.json({ success: true, data: alert });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAlert = async (req, res) => {
  try {
    const { title, type = "Cascade Risk", severity = "High", location, description, recommendedAction } = req.body;
    const store = getStore();

    const newAlert = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      title,
      type,
      severity,
      location: location || "Central Metropolitan Area",
      time: "Just now",
      timestamp: new Date().toISOString(),
      description: description || "Automated system alert generated.",
      recommendedAction: recommendedAction || "Inspect perimeter and deploy emergency teams.",
      acknowledged: false,
      acknowledgedBy: null
    };

    store.alerts.unshift(newAlert);

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "ALERT_ISSUED",
      operator: "Alert Monitoring Daemon",
      details: `Generated alert ${newAlert.id}: ${newAlert.title}`
    });

    if (global.io) {
      global.io.emit("alert:new", newAlert);
    }

    return res.status(201).json({ success: true, data: newAlert });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
