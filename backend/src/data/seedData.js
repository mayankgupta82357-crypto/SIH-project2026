export const INITIAL_USERS = [
  {
    id: "usr-admin-01",
    name: "Dr. Rajeshwar Rao",
    email: "admin@urbancascade.gov",
    password: "password123",
    role: "Admin",
    badge: "ADM-994",
    department: "Urban Resilience & Command Center",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr-operator-01",
    name: "Priya Sharma",
    email: "operator@urbancascade.gov",
    password: "password123",
    role: "Emergency Operator",
    badge: "EOC-412",
    department: "Central Emergency Dispatch",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr-citizen-01",
    name: "Arjun Verma",
    email: "citizen@urbancascade.gov",
    password: "password123",
    role: "Citizen",
    badge: "CIT-882",
    department: "Public User",
    createdAt: new Date().toISOString()
  }
];

export const CITY_FACILITIES = [
  {
    id: "HOSP-01",
    name: "Victoria Hospital - Trauma Center",
    type: "Hospital",
    category: "hospital",
    coordinates: [12.9628, 77.5753],
    address: "Fort, K.R. Market, Bengaluru",
    capacity: "45 ICU Beds Available",
    contact: "+91 80 2670 1150",
    status: "Operational"
  },
  {
    id: "HOSP-02",
    name: "Manipal Hospital",
    type: "Hospital",
    category: "hospital",
    coordinates: [12.9592, 77.6499],
    address: "98, HAL Old Airport Rd, Kodihalli",
    capacity: "22 ICU Beds Available",
    contact: "+91 80 2502 4444",
    status: "High Congestion Access"
  },
  {
    id: "HOSP-03",
    name: "Bowring & Lady Curzon Hospital",
    type: "Hospital",
    category: "hospital",
    coordinates: [12.9833, 77.6033],
    address: "Lady Curzon Rd, Shivaji Nagar",
    capacity: "30 Trauma Beds",
    contact: "+91 80 2559 1325",
    status: "Operational"
  },
  {
    id: "FIRE-01",
    name: "Central Fire Station (HQ)",
    type: "Fire Station",
    category: "fire_station",
    coordinates: [12.9736, 77.5975],
    address: "Near Hudson Circle, Kasturba Rd",
    fleetCount: 8,
    status: "Active Alert"
  },
  {
    id: "FIRE-02",
    name: "Ulsoor Fire Station",
    type: "Fire Station",
    category: "fire_station",
    coordinates: [12.9818, 77.6255],
    address: "Kensington Rd, Someshwarpura, Ulsoor",
    fleetCount: 5,
    status: "Standby"
  },
  {
    id: "POL-01",
    name: "Cubbon Park Police Station",
    type: "Police Station",
    category: "police_station",
    coordinates: [12.9784, 77.5937],
    address: "Kasturba Rd, Sampangi Rama Nagar",
    patrolUnits: 12,
    status: "Active Monitoring"
  },
  {
    id: "POL-02",
    name: "Ashok Nagar Traffic Police Station",
    type: "Police Station",
    category: "police_station",
    coordinates: [12.9698, 77.6087],
    address: "Residency Rd, Shanthala Nagar",
    patrolUnits: 8,
    status: "Managing Diversions"
  }
];

export const INITIAL_UNITS = [
  {
    id: "AMB-101",
    callsign: "Lifeline-101",
    type: "Ambulance",
    subType: "Advanced Life Support (ALS)",
    coordinates: [12.9720, 77.6010],
    status: "Available",
    assignedIncident: null,
    baseStation: "Victoria Hospital",
    fuelLevel: 88,
    etaMinutes: 0
  },
  {
    id: "AMB-102",
    callsign: "Lifeline-102",
    type: "Ambulance",
    subType: "Basic Life Support (BLS)",
    coordinates: [12.9610, 77.6380],
    status: "Dispatched",
    assignedIncident: "INC-8901",
    baseStation: "Manipal Hospital",
    fuelLevel: 76,
    etaMinutes: 14
  },
  {
    id: "AMB-103",
    callsign: "Lifeline-103",
    type: "Ambulance",
    subType: "Mobile ICU",
    coordinates: [12.9860, 77.6090],
    status: "Available",
    assignedIncident: null,
    baseStation: "Bowring Hospital",
    fuelLevel: 94,
    etaMinutes: 0
  },
  {
    id: "FT-04",
    callsign: "Blaze-Tender-04",
    type: "Fire Truck",
    subType: "Heavy Water Tender & Hydraulic Cutter",
    coordinates: [12.9730, 77.5990],
    status: "En Route",
    assignedIncident: "INC-8902",
    baseStation: "Central Fire Station",
    fuelLevel: 82,
    etaMinutes: 6
  },
  {
    id: "FT-07",
    callsign: "Blaze-Tender-07",
    type: "Fire Truck",
    subType: "Chemical Hazard Foam Unit",
    coordinates: [12.9818, 77.6255],
    status: "Available",
    assignedIncident: null,
    baseStation: "Ulsoor Fire Station",
    fuelLevel: 91,
    etaMinutes: 0
  },
  {
    id: "PCR-12",
    callsign: "Hawk-12",
    type: "Police Vehicle",
    subType: "Traffic Rapid Interceptor",
    coordinates: [12.9745, 77.6070],
    status: "On Scene",
    assignedIncident: "INC-8901",
    baseStation: "Ashok Nagar Traffic Police",
    fuelLevel: 65,
    etaMinutes: 0
  },
  {
    id: "PCR-09",
    callsign: "Hawk-09",
    type: "Police Vehicle",
    subType: "Patrol Cruiser",
    coordinates: [12.9760, 77.5950],
    status: "Available",
    assignedIncident: null,
    baseStation: "Cubbon Park Police",
    fuelLevel: 80,
    etaMinutes: 0
  },
  {
    id: "SDRF-01",
    callsign: "Resilience-01",
    type: "Rescue Team",
    subType: "Urban Search & Flood Response",
    coordinates: [12.9900, 77.5850],
    status: "Available",
    assignedIncident: null,
    baseStation: "State Disaster Cell",
    fuelLevel: 85,
    etaMinutes: 0
  }
];

export const INITIAL_INCIDENTS = [
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
    description: "3 vehicles collided including a fuel tanker. Both east and westbound corridors blocked. Fuel spill hazard triggers secondary arterial gridlock across Residency Rd.",
    assignedUnits: ["AMB-102", "PCR-12"],
    cascadeDepth: 5,
    roadBlocked: true,
    cascadeEffects: [
      "Road Closure on MG Road Arterial Corridor",
      "Severe Traffic Spillover to Residency & Richmond Roads",
      "Ambulance Delay (+18 min) for Manipal Hospital Corridor",
      "Hospital Trauma Access Route Impairment",
      "Gridlock at Mayo Hall & Brigade Signal Intersections"
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
    description: "Electrical fire in underground utility vault. Dense toxic smoke escaping manholes. BESCOM feeder trips affecting 4 commercial sectors and traffic signal networks.",
    assignedUnits: ["FT-04"],
    cascadeDepth: 3,
    roadBlocked: true,
    cascadeEffects: [
      "Traffic Signal Power Outage at 12th Main",
      "Commercial District Evacuation & Smoke Hazard",
      "Secondary Traffic Diversion through Residential By-lanes"
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
    description: "Stormwater drain backup causing 3.5 ft water level in underpass. Transit buses stranded, creating a 4km tailback towards Electronic City corridor.",
    assignedUnits: [],
    cascadeDepth: 4,
    roadBlocked: true,
    cascadeEffects: [
      "Hosur Road Inbound Highway Inaccessible",
      "Tech Corridor Commute Halved",
      "Freight Delay to South Industrial Belt"
    ]
  },
  {
    id: "INC-8904",
    title: "Structural Joint Displacement Alert",
    type: "Road Blockage",
    category: "blockage",
    location: "Hebbal Flyover Southbound Incline",
    coordinates: [13.0358, 77.5970],
    severity: "Critical",
    status: "Responding",
    time: "1 hour ago",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    affectedPopulation: 62000,
    impactRadiusKm: 4.1,
    riskScore: 88,
    description: "Expansion joint gap widened on main airport flyover ramp. Precautionary lane restriction slows international airport transit link.",
    assignedUnits: ["PCR-09"],
    cascadeDepth: 3,
    roadBlocked: true,
    cascadeEffects: [
      "Outer Ring Road North Bottleneck",
      "Airport Express Bus Fleet Delay (+35 min)",
      "Bellary Road Arterial Spillover"
    ]
  },
  {
    id: "INC-8905",
    title: "Hydraulic Crane Breakdown",
    type: "Road Blockage",
    category: "blockage",
    location: "Trinity Circle Metro Pillar 140",
    coordinates: [12.9729, 77.6169],
    severity: "Medium",
    status: "Contained",
    time: "2 hours ago",
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    affectedPopulation: 12000,
    impactRadiusKm: 1.0,
    riskScore: 54,
    description: "Construction vehicle boom arm obstruction cleared to single lane. Traffic flow restoring gradually.",
    assignedUnits: [],
    cascadeDepth: 2,
    roadBlocked: false,
    cascadeEffects: [
      "Moderate delay on Old Airport Road exit"
    ]
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-701",
    title: "Critical Cascade Warning: Trauma Corridor Compromised",
    type: "Cascade Risk",
    severity: "Critical",
    incidentId: "INC-8901",
    location: "MG Road & Residency Rd Confluence",
    time: "8 mins ago",
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    description: "MG Road tanker collision has created severe tailback preventing ambulance access to Manipal and Bowring hospitals. Secondary intersection failure imminent.",
    recommendedAction: "Activate Green Emergency Corridor via Richmond Flyover immediately. Signal priority preempt required.",
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
    description: "Transformer vault fire tripped 4 signal nodes. Traffic officers required for manual intersection regulation.",
    recommendedAction: "Deploy mobile traffic wardens to 12th Main junction and cut gas mains in 200m radius.",
    acknowledged: true,
    acknowledgedBy: "Priya Sharma (EOC-412)"
  },
  {
    id: "ALT-703",
    title: "Severe Underpass Inundation: Arterial Highway Cut",
    type: "Flood Warning",
    severity: "High",
    incidentId: "INC-8903",
    location: "Silk Board Junction",
    time: "35 mins ago",
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    description: "Underpass water levels reached 3.5ft. Heavy vehicle stalling risks cascade blockage on Outer Ring Road.",
    recommendedAction: "Divert all outbound traffic via BTM 2nd Stage. Deploy high-capacity dewatering pumps.",
    acknowledged: false,
    acknowledgedBy: null
  },
  {
    id: "ALT-704",
    title: "Emergency Vehicle Transit Delay Exceeds 15 Minutes",
    type: "Emergency Vehicle Delay",
    severity: "Critical",
    incidentId: "INC-8901",
    location: "Brigade Road - Mayo Hall Stretch",
    time: "4 mins ago",
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    description: "Ambulance AMB-102 stuck in secondary ripple congestion. ETA degraded from 6m to 24m.",
    recommendedAction: "Reroute AMB-102 via Kensington Oval bypass. Clear lane 1 with siren priority.",
    acknowledged: false,
    acknowledgedBy: null
  }
];

export const INITIAL_CITIZEN_REPORTS = [
  {
    id: "REP-401",
    citizenName: "Rohan Kulkarni",
    contact: "9845012345",
    type: "Accident",
    location: "Near Trinity Metro Station",
    description: "Two motorbikes and an auto rickshaw involved. Traffic piling up quickly near pillar 142.",
    severity: "Medium",
    time: "15 mins ago",
    status: "Verified",
    promotedToIncidentId: null
  },
  {
    id: "REP-402",
    citizenName: "Deepa Menon",
    contact: "9731245678",
    type: "Flood",
    location: "Koramangala 4th Block 80ft Road",
    description: "Water accumulating over 1.5 feet after burst water main. Cars cannot pass.",
    severity: "High",
    time: "30 mins ago",
    status: "Under Review",
    promotedToIncidentId: null
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: "LOG-1001",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    action: "INCIDENT_DETECTED",
    operator: "AI Cascade Sensor Node BGLR-09",
    details: "Detected multi-vehicle collision at MG Road. Initial severity assessed at Critical (92/100)."
  },
  {
    id: "LOG-1002",
    timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    action: "CASCADE_PREDICTED",
    operator: "Cascade Intelligence Engine v2.4",
    details: "Projected 5-tier cascade impact affecting 45,000 residents and delaying hospital corridor access."
  },
  {
    id: "LOG-1003",
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    action: "UNIT_DISPATCHED",
    operator: "Priya Sharma (EOC-412)",
    details: "Dispatched AMB-102 and PCR-12 to MG Road - Brigade Junction."
  },
  {
    id: "LOG-1004",
    timestamp: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    action: "ALERT_BROADCAST",
    operator: "Automated Urban Broadcast",
    details: "Issued Alert ALT-701: Critical Cascade Warning for Trauma Corridor."
  }
];
