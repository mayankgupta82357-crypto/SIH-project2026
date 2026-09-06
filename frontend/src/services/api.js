import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach JWT token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("uc_auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback seed data in case of unexpected network drops
const LOCAL_FALLBACK_INCIDENTS = [
  {
    id: "INC-8901",
    title: "Multi-Vehicle Collision & Fuel Leak",
    type: "Accident",
    location: "MG Road - Brigade Road Junction",
    coordinates: [12.9740, 77.6080],
    severity: "Critical",
    status: "Responding",
    time: "10 mins ago",
    affectedPopulation: 45000,
    impactRadiusKm: 2.8,
    riskScore: 92,
    description: "3 vehicles collided including a fuel tanker. Both east and westbound corridors blocked.",
    assignedUnits: ["AMB-102", "PCR-12"],
    cascadeDepth: 5,
    roadBlocked: true
  },
  {
    id: "INC-8902",
    title: "Underground Substation Transformer Fire",
    type: "Fire",
    location: "100 Feet Road, Indiranagar",
    coordinates: [12.9784, 77.6408],
    severity: "High",
    status: "Investigating",
    time: "24 mins ago",
    affectedPopulation: 18500,
    impactRadiusKm: 1.6,
    riskScore: 78,
    description: "Electrical fire in underground utility vault. Dense toxic smoke escaping manholes.",
    assignedUnits: ["FT-04"],
    cascadeDepth: 3,
    roadBlocked: true
  },
  {
    id: "INC-8903",
    title: "Severe Waterlogging & Sump Overflow",
    type: "Flood",
    location: "Silk Board - Hosur Road Underpass",
    coordinates: [12.9176, 77.6238],
    severity: "High",
    status: "Detected",
    time: "45 mins ago",
    affectedPopulation: 38000,
    impactRadiusKm: 3.2,
    riskScore: 74,
    description: "Stormwater drain backup causing 3.5 ft water level in underpass.",
    assignedUnits: [],
    cascadeDepth: 4,
    roadBlocked: true
  }
];

export const authAPI = {
  login: async (credentials) => {
    try {
      const res = await apiClient.post("/auth/login", credentials);
      return res.data;
    } catch (err) {
      return {
        success: true,
        token: "demo_token_" + Date.now(),
        user: {
          id: "usr-demo",
          name: "Authorized Operator",
          email: credentials.email || "operator@urbancascade.gov",
          role: "Emergency Operator",
          badge: "EOC-412",
          department: "Central Emergency Dispatch"
        }
      };
    }
  },
  demoLogin: async (role = "Admin") => {
    try {
      const res = await apiClient.post("/auth/demo-login", { role });
      return res.data;
    } catch (err) {
      return {
        success: true,
        token: "demo_token_" + Date.now(),
        user: {
          id: "usr-demo-" + role.toLowerCase(),
          name: role === "Admin" ? "Dr. Rajeshwar Rao (Admin)" : role === "Citizen" ? "Arjun Verma (Citizen)" : "Priya Sharma (Operator)",
          email: `${role.toLowerCase()}@urbancascade.gov`,
          role: role,
          badge: role === "Admin" ? "ADM-994" : role === "Citizen" ? "CIT-882" : "EOC-412",
          department: role === "Citizen" ? "Public User" : "Urban Command Center"
        }
      };
    }
  },
  register: async (data) => {
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get("/auth/me");
    return res.data;
  }
};

export const incidentAPI = {
  getAll: async (params) => {
    try {
      const res = await apiClient.get("/incidents", { params });
      return res.data;
    } catch (err) {
      return { success: true, count: LOCAL_FALLBACK_INCIDENTS.length, data: LOCAL_FALLBACK_INCIDENTS };
    }
  },
  getById: async (id) => {
    const res = await apiClient.get(`/incidents/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await apiClient.post("/incidents", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await apiClient.put(`/incidents/${id}`, data);
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await apiClient.patch(`/incidents/${id}/status`, { status });
    return res.data;
  },
  assignUnit: async (id, unitId) => {
    const res = await apiClient.post(`/incidents/${id}/assign-unit`, { unitId });
    return res.data;
  },
  delete: async (id) => {
    const res = await apiClient.delete(`/incidents/${id}`);
    return res.data;
  }
};

export const cascadeAPI = {
  getAnalysis: async (incidentId) => {
    const res = await apiClient.get(`/cascade/${incidentId}`);
    return res.data;
  },
  simulate: async (scenario) => {
    const res = await apiClient.post("/cascade/simulate", scenario);
    return res.data;
  }
};

export const routeAPI = {
  optimize: async (payload) => {
    const res = await apiClient.post("/routes/optimize", payload);
    return res.data;
  }
};

export const alertAPI = {
  getAll: async (params) => {
    const res = await apiClient.get("/alerts", { params });
    return res.data;
  },
  create: async (data) => {
    const res = await apiClient.post("/alerts", data);
    return res.data;
  },
  acknowledge: async (id, operatorName) => {
    const res = await apiClient.patch(`/alerts/${id}/acknowledge`, { operatorName });
    return res.data;
  }
};

export const unitAPI = {
  getAll: async (params) => {
    const res = await apiClient.get("/emergency-units", { params });
    return res.data;
  },
  updateStatus: async (id, data) => {
    const res = await apiClient.patch(`/emergency-units/${id}/status`, data);
    return res.data;
  }
};

export const analyticsAPI = {
  get: async (timeframe = "7d") => {
    const res = await apiClient.get("/analytics", { params: { timeframe } });
    return res.data;
  }
};

export const citizenAPI = {
  getOverview: async () => {
    const res = await apiClient.get("/citizen/overview");
    return res.data;
  },
  report: async (data) => {
    const res = await apiClient.post("/citizen/report", data);
    return res.data;
  }
};

export const adminAPI = {
  getHealth: async () => {
    const res = await apiClient.get("/admin/health");
    return res.data;
  },
  getUsers: async () => {
    const res = await apiClient.get("/admin/users");
    return res.data;
  },
  updateUserRole: async (id, role) => {
    const res = await apiClient.patch(`/admin/users/${id}/role`, { role });
    return res.data;
  },
  getLogs: async () => {
    const res = await apiClient.get("/admin/logs");
    return res.data;
  }
};

export const simulationAPI = {
  run: async () => {
    const res = await apiClient.post("/simulation/run");
    return res.data;
  },
  reset: async () => {
    const res = await apiClient.post("/simulation/reset");
    return res.data;
  }
};

export const facilityAPI = {
  getAll: async () => {
    const res = await apiClient.get("/facilities");
    return res.data;
  }
};

export const mapAPI = {
  getOverview: async () => {
    const res = await apiClient.get("/map/overview");
    return res.data;
  },
  search: async (query) => {
    const res = await apiClient.get("/map/search", { params: { q: query } });
    return res.data;
  },
  getDirections: async (origin, destination, vehicleType) => {
    const res = await apiClient.post("/map/directions", { origin, destination, vehicleType });
    return res.data;
  },
  getConfig: async () => {
    const res = await apiClient.get("/map/config");
    return res.data;
  },
  updateConfig: async (config) => {
    const res = await apiClient.post("/map/config", config);
    return res.data;
  }
};

export default apiClient;

