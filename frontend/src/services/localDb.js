// Local Persistent Client-side Database Engine (for Netlify, Offline & Fallback)
const SEED_INCIDENTS = [
  {
    id: "INC-8901",
    title: "Multi-Vehicle Collision & Fuel Leak",
    type: "Accident",
    category: "accident",
    location: "MG Road - Brigade Road Junction",
    coordinates: [12.9740, 77.6080],
    severity: "Critical",
    status: "Responding",
    time: "10 mins ago",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    affectedPopulation: 45000,
    impactRadiusKm: 2.8,
    riskScore: 92,
    description: "3 vehicles collided including a fuel tanker. Both east and westbound corridors blocked.",
    assignedUnits: ["AMB-102", "PCR-12"],
    cascadeDepth: 5,
    roadBlocked: true,
    cascadeEffects: [
      "Road Closure on MG Road Arterial Corridor",
      "Severe Traffic Spillover to Residency & Richmond Roads",
      "Ambulance Delay (+18 min) for Manipal Hospital Corridor"
    ]
  },
  {
    id: "INC-8902",
    title: "Underground Substation Transformer Fire",
    type: "Fire",
    category: "fire",
    location: "100 Feet Road, Indiranagar",
    coordinates: [12.9784, 77.6408],
    severity: "High",
    status: "Investigating",
    time: "24 mins ago",
    timestamp: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
    affectedPopulation: 18500,
    impactRadiusKm: 1.6,
    riskScore: 78,
    description: "Electrical fire in underground utility vault. Dense toxic smoke escaping manholes.",
    assignedUnits: ["FT-04"],
    cascadeDepth: 3,
    roadBlocked: true,
    cascadeEffects: [
      "Traffic Signal Power Outage at 12th Main",
      "Commercial District Evacuation & Smoke Hazard"
    ]
  },
  {
    id: "INC-8903",
    title: "Severe Waterlogging & Sump Overflow",
    type: "Flood",
    category: "flood",
    location: "Silk Board - Hosur Road Underpass",
    coordinates: [12.9176, 77.6238],
    severity: "High",
    status: "Detected",
    time: "45 mins ago",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    affectedPopulation: 38000,
    impactRadiusKm: 3.2,
    riskScore: 74,
    description: "Stormwater drain backup causing 3.5 ft water level in underpass.",
    assignedUnits: [],
    cascadeDepth: 4,
    roadBlocked: true,
    cascadeEffects: [
      "Hosur Road Inbound Highway Inaccessible",
      "Tech Corridor Commute Halved"
    ]
  }
];

const SEED_ALERTS = [
  {
    id: "ALT-701",
    title: "Critical Cascade Warning: Trauma Corridor Compromised",
    type: "Cascade Risk",
    severity: "Critical",
    incidentId: "INC-8901",
    location: "MG Road & Residency Rd Confluence",
    time: "8 mins ago",
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    description: "MG Road tanker collision has created severe tailback preventing ambulance access.",
    recommendedAction: "Activate Green Emergency Corridor via Richmond Flyover immediately.",
    acknowledged: false,
    acknowledgedBy: null
  },
  {
    id: "ALT-702",
    title: "Substation Electrical Fire & Signal Network Outage",
    type: "Infrastructure Failure",
    severity: "High",
    incidentId: "INC-8902",
    location: "100ft Rd Indiranagar",
    time: "20 mins ago",
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    description: "Transformer vault fire tripped 4 signal nodes.",
    recommendedAction: "Deploy mobile traffic wardens to 12th Main junction.",
    acknowledged: true,
    acknowledgedBy: "Priya Sharma"
  }
];

const SEED_REPORTS = [
  {
    id: "REP-401",
    citizenName: "Rohan Kulkarni",
    contact: "9845012345",
    type: "Accident",
    location: "Near Trinity Metro Station",
    description: "Two motorbikes and an auto rickshaw involved.",
    severity: "Medium",
    time: "15 mins ago",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: "Verified",
    promotedToIncidentId: null
  }
];

const SEED_USERS = [
  {
    id: "usr-admin-01",
    name: "Dr. Rajeshwar Rao (Admin)",
    email: "admin@urbancascade.gov",
    password: "password123",
    role: "Admin",
    badge: "ADM-994",
    department: "Urban Resilience & Command Center"
  },
  {
    id: "usr-operator-01",
    name: "Priya Sharma (Operator)",
    email: "operator@urbancascade.gov",
    password: "password123",
    role: "Emergency Operator",
    badge: "EOC-412",
    department: "Central Emergency Dispatch"
  },
  {
    id: "usr-citizen-01",
    name: "Arjun Verma (Citizen)",
    email: "citizen@urbancascade.gov",
    password: "password123",
    role: "Citizen",
    badge: "CIT-882",
    department: "Public User"
  }
];

export const getLocalUsers = () => {
  try {
    const raw = localStorage.getItem("uc_users_db");
    if (!raw) {
      localStorage.setItem("uc_users_db", JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {}
  localStorage.setItem("uc_users_db", JSON.stringify(SEED_USERS));
  return SEED_USERS;
};

export const saveLocalUser = (newUser) => {
  const users = getLocalUsers();
  const existingIndex = users.findIndex(
    (u) => (u.email || "").toLowerCase() === (newUser.email || "").toLowerCase()
  );
  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...newUser };
  } else {
    users.push(newUser);
  }
  try {
    localStorage.setItem("uc_users_db", JSON.stringify(users));
  } catch (e) {}
  return newUser;
};

// Helper accessors for localStorage
export const getLocalIncidents = () => {
  try {
    const raw = localStorage.getItem("uc_incidents");
    if (!raw) {
      localStorage.setItem("uc_incidents", JSON.stringify(SEED_INCIDENTS));
      return SEED_INCIDENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_INCIDENTS;
  }
};

export const saveLocalIncident = (incident) => {
  const list = getLocalIncidents();
  list.unshift(incident);
  try {
    localStorage.setItem("uc_incidents", JSON.stringify(list));
  } catch (e) {}
  return incident;
};

export const getLocalAlerts = () => {
  try {
    const raw = localStorage.getItem("uc_alerts");
    if (!raw) {
      localStorage.setItem("uc_alerts", JSON.stringify(SEED_ALERTS));
      return SEED_ALERTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_ALERTS;
  }
};

export const saveLocalAlert = (alert) => {
  const list = getLocalAlerts();
  list.unshift(alert);
  try {
    localStorage.setItem("uc_alerts", JSON.stringify(list));
  } catch (e) {}
  return alert;
};

export const getLocalReports = () => {
  try {
    const raw = localStorage.getItem("uc_reports");
    if (!raw) {
      localStorage.setItem("uc_reports", JSON.stringify(SEED_REPORTS));
      return SEED_REPORTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_REPORTS;
  }
};

export const saveLocalCitizenReport = (reportData) => {
  const reports = getLocalReports();
  const reportId = `REP-${Math.floor(100 + Math.random() * 900)}`;

  const newReport = {
    id: reportId,
    citizenName: reportData.citizenName || "Civic Commuter",
    contact: reportData.contact || "N/A",
    type: reportData.type || "Accident",
    location: reportData.location || "Central Metropolitan Area",
    description: reportData.description || "Civic disruption reported via portal.",
    severity: reportData.severity || "High",
    time: "Just now",
    timestamp: new Date().toISOString(),
    status: "Verified",
    promotedToIncidentId: null
  };

  // If High or Critical, automatically promote into the active incident database
  let promotedIncident = null;
  const currentIncidents = getLocalIncidents();
  const incId = `INC-${8900 + currentIncidents.length + 1}`;

  const isCritical = newReport.severity === "Critical";
  const riskScore = isCritical ? 92 : newReport.severity === "High" ? 78 : 55;
  const pop = isCritical ? 45000 : newReport.severity === "High" ? 22000 : 12000;
  const rad = isCritical ? 2.8 : 1.5;

  promotedIncident = {
    id: incId,
    title: `Citizen Reported: ${newReport.type} at ${newReport.location}`,
    type: newReport.type,
    category: newReport.type.toLowerCase().replace(" ", "_"),
    location: newReport.location,
    coordinates: [12.9716 + (Math.random() - 0.5) * 0.04, 77.5946 + (Math.random() - 0.5) * 0.04],
    severity: newReport.severity,
    status: "Detected",
    time: "Just now",
    timestamp: new Date().toISOString(),
    affectedPopulation: pop,
    impactRadiusKm: rad,
    riskScore: riskScore,
    description: `[Citizen Report ${reportId} - ${newReport.citizenName}]: ${newReport.description}`,
    assignedUnits: [],
    cascadeDepth: 3,
    roadBlocked: true,
    cascadeEffects: [
      `Citizen alerted emergency response for ${newReport.type}`,
      `Perimeter cordon active at ${newReport.location}`,
      `Cascade threat assessment in progress`
    ]
  };

  saveLocalIncident(promotedIncident);
  newReport.promotedToIncidentId = incId;

  // Add corresponding critical alert
  saveLocalAlert({
    id: `ALT-${Date.now().toString().slice(-4)}`,
    title: `${newReport.severity.toUpperCase()} CITIZEN REPORT: ${newReport.type} at ${newReport.location}`,
    type: "Citizen Emergency Alert",
    severity: newReport.severity,
    incidentId: incId,
    location: newReport.location,
    time: "Just now",
    timestamp: new Date().toISOString(),
    description: `Reported by ${newReport.citizenName}. ${newReport.description}`,
    recommendedAction: "Operator confirmation required for immediate emergency unit dispatch.",
    acknowledged: false,
    acknowledgedBy: null
  });

  reports.unshift(newReport);
  try {
    localStorage.setItem("uc_reports", JSON.stringify(reports));
  } catch (e) {}

  return {
    success: true,
    message: "Emergency report successfully transmitted and registered in the database.",
    data: newReport,
    promotedIncident
  };
};