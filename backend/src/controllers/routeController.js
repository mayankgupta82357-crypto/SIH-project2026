import { getStore } from "../config/db.js";

export const optimizeRoute = async (req, res) => {
  try {
    const {
      vehicleId = "AMB-101",
      startLocation = "MG Road Brigade Junction",
      destination = "Victoria Hospital",
      emergencyType = "Trauma Patient"
    } = req.body;

    const store = getStore();
    const blockedIncidents = store.incidents.filter(i => i.roadBlocked);

    // Coordinate definitions for Indian metropolitan landmarks (Bengaluru)
    const waypoints = {
      "MG Road Brigade Junction": [12.9740, 77.6080],
      "Victoria Hospital": [12.9628, 77.5753],
      "Manipal Hospital": [12.9592, 77.6499],
      "Bowring Hospital": [12.9833, 77.6033],
      "Central Fire Station": [12.9736, 77.5975],
      "Indiranagar 100ft Rd": [12.9784, 77.6408],
      "Richmond Flyover": [12.9650, 77.5980],
      "K.R. Circle": [12.9730, 77.5850],
      "Cubbon Park Corridor": [12.9770, 77.5910]
    };

    const startCoord = waypoints[startLocation] || [12.9740, 77.6080];
    const endCoord = waypoints[destination] || [12.9628, 77.5753];

    // Primary direct path (which goes straight through congested MG Road)
    const blockedRoutePath = [
      startCoord,
      [12.9745, 77.6050],
      [12.9730, 77.5970],
      [12.9700, 77.5880],
      [12.9660, 77.5800],
      endCoord
    ];

    // Recommended Route (Green Corridor: Richmond Flyover -> K.R. Circle Bypass)
    const recommendedRoute = {
      name: "Emergency Green Corridor (Richmond Flyover Bypass)",
      status: "Optimized & Cleared",
      isRecommended: true,
      distanceKm: 4.8,
      estimatedTimeMinutes: 9,
      normalTimeMinutes: 28,
      timeSavedMinutes: 19,
      riskLevel: "Low",
      path: [
        startCoord,
        [12.9710, 77.6070], // Divert south towards Residency Rd
        [12.9670, 77.6020], // Richmond Circle
        [12.9650, 77.5940], // Richmond Flyover ramp (Priority Signal Preempt)
        [12.9640, 77.5860], // Lalbagh North Link
        [12.9632, 77.5790], // K.R. Market Express link
        endCoord
      ],
      corridorClearancePoints: [
        { name: "Residency Cross", signalStatus: "Preempted Green", officerAssigned: "PCR-12" },
        { name: "Richmond Flyover Entry", signalStatus: "Open Dedicated Lane", officerAssigned: "Traffic Control" },
        { name: "Victoria Hospital Gate 2", signalStatus: "Emergency Barrier Raised", officerAssigned: "Hospital Security" }
      ]
    };

    // Alternative Secondary Route
    const alternativeRoute = {
      name: "Secondary Northern Bypass (Cubbon Park Expressway)",
      status: "Available Alternative",
      isRecommended: false,
      distanceKm: 5.6,
      estimatedTimeMinutes: 14,
      normalTimeMinutes: 24,
      timeSavedMinutes: 10,
      riskLevel: "Medium",
      path: [
        startCoord,
        [12.9780, 77.6070],
        [12.9820, 77.6010],
        [12.9790, 77.5920],
        [12.9740, 77.5830],
        [12.9680, 77.5780],
        endCoord
      ],
      corridorClearancePoints: [
        { name: "General Post Office Signal", signalStatus: "Manual Green Override", officerAssigned: "PCR-09" },
        { name: "Hudson Circle Bypass", signalStatus: "Caution - Moderate Traffic", officerAssigned: "None" }
      ]
    };

    const blockedRoads = blockedIncidents.map(inc => ({
      incidentId: inc.id,
      roadName: inc.location,
      severity: inc.severity,
      reason: inc.description,
      impact: "Total vehicular stall. Extreme cascade delay."
    }));

    const reason = `Primary direct route via MG Road is heavily compromised by ${blockedIncidents[0]?.id || "INC-8901"} (${blockedIncidents[0]?.title || "Accident"}). Green Corridor via Richmond Flyover utilizes dynamic signal preemption, bypassing 3 gridlocked radial intersections to save 19 minutes of critical Golden Hour transit time.`;

    return res.json({
      success: true,
      data: {
        vehicleId,
        startLocation,
        destination,
        emergencyType,
        recommendedRoute,
        alternativeRoute,
        blockedRoute: {
          name: "Direct Route (Compromised / Gridlocked)",
          estimatedTimeMinutes: 32,
          riskLevel: "Critical",
          path: blockedRoutePath
        },
        blockedRoads,
        reason
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
