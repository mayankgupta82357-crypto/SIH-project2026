import { getStore } from "../config/db.js";

export const getUnits = async (req, res) => {
  try {
    const { type, status } = req.query;
    const store = getStore();
    let list = [...store.units];

    if (type && type !== "All") {
      list = list.filter(u => u.type.toLowerCase() === type.toLowerCase());
    }
    if (status && status !== "All") {
      list = list.filter(u => u.status.toLowerCase() === status.toLowerCase());
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUnitStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, etaMinutes, assignedIncident } = req.body;
    const store = getStore();
    const unit = store.units.find(u => u.id === id);

    if (!unit) {
      return res.status(404).json({ success: false, message: "Unit not found." });
    }

    if (status) unit.status = status;
    if (etaMinutes !== undefined) unit.etaMinutes = etaMinutes;
    if (assignedIncident !== undefined) unit.assignedIncident = assignedIncident;

    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "UNIT_STATUS_UPDATED",
      operator: req.body.operator || "Fleet Controller",
      details: `Unit ${unit.callsign} status set to ${unit.status}.`
    });

    if (global.io) {
      global.io.emit("unit:statusChanged", unit);
    }

    return res.json({ success: true, data: unit });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
