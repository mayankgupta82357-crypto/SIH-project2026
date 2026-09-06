import { getStore } from "../config/db.js";

export const getSystemHealth = async (req, res) => {
  try {
    const store = getStore();
    const memoryUsage = process.memoryUsage();

    return res.json({
      success: true,
      data: {
        status: "Operational",
        engineMode: store.isUsingMemory ? "High-Performance In-Memory Store" : "MongoDB Atlas Replica Set",
        uptimeSeconds: Math.floor(process.uptime()),
        nodeVersion: process.version,
        activeWebSockets: global.io ? global.io.engine?.clientsCount || 1 : 1,
        systemMemory: {
          rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
          heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024)
        },
        counts: {
          users: store.users.length,
          incidents: store.incidents.length,
          alerts: store.alerts.length,
          units: store.units.length,
          citizenReports: store.citizenReports.length,
          logs: store.activityLogs.length
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const store = getStore();
    return res.json({
      success: true,
      count: store.users.length,
      data: store.users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        badge: u.badge,
        department: u.department,
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const store = getStore();
    const user = store.users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.role = role;
    store.activityLogs.unshift({
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      action: "USER_ROLE_UPDATED",
      operator: req.body.operator || "Admin",
      details: `User ${user.email} updated to role ${role}.`
    });

    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getActivityLogs = async (req, res) => {
  try {
    const store = getStore();
    return res.json({
      success: true,
      count: store.activityLogs.length,
      data: store.activityLogs
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
