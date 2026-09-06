import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Emergency Operator", "Citizen"], default: "Citizen" },
  badge: { type: String },
  department: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

const incidentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ["Accident", "Fire", "Flood", "Road Blockage", "Infrastructure Failure", "Other"] },
  category: { type: String },
  location: { type: String, required: true },
  coordinates: { type: [Number], required: true }, // [lat, lng]
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  status: { type: String, enum: ["Detected", "Investigating", "Responding", "Contained", "Resolved"], default: "Detected" },
  time: { type: String },
  timestamp: { type: Date, default: Date.now },
  affectedPopulation: { type: Number, default: 0 },
  impactRadiusKm: { type: Number, default: 1.0 },
  riskScore: { type: Number, default: 50 },
  description: { type: String },
  assignedUnits: [{ type: String }],
  cascadeDepth: { type: Number, default: 1 },
  roadBlocked: { type: Boolean, default: false },
  cascadeEffects: [{ type: String }]
});

export const IncidentModel = mongoose.models.Incident || mongoose.model("Incident", incidentSchema);

const alertSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  incidentId: { type: String },
  location: { type: String, required: true },
  time: { type: String },
  timestamp: { type: Date, default: Date.now },
  description: { type: String },
  recommendedAction: { type: String },
  acknowledged: { type: Boolean, default: false },
  acknowledgedBy: { type: String, default: null }
});

export const AlertModel = mongoose.models.Alert || mongoose.model("Alert", alertSchema);

const unitSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  callsign: { type: String, required: true },
  type: { type: String, enum: ["Ambulance", "Fire Truck", "Police Vehicle", "Rescue Team"], required: true },
  subType: { type: String },
  coordinates: { type: [Number], required: true },
  status: { type: String, enum: ["Available", "Dispatched", "En Route", "On Scene", "Returning"], default: "Available" },
  assignedIncident: { type: String, default: null },
  baseStation: { type: String },
  fuelLevel: { type: Number, default: 100 },
  etaMinutes: { type: Number, default: 0 }
});

export const UnitModel = mongoose.models.Unit || mongoose.model("Unit", unitSchema);

const citizenReportSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  citizenName: { type: String, required: true },
  contact: { type: String },
  type: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: { type: [Number] },
  description: { type: String, required: true },
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  time: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["Under Review", "Verified", "Rejected", "Actioned"], default: "Under Review" },
  promotedToIncidentId: { type: String, default: null }
});

export const CitizenReportModel = mongoose.models.CitizenReport || mongoose.model("CitizenReport", citizenReportSchema);

const activityLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
  action: { type: String, required: true },
  operator: { type: String, required: true },
  details: { type: String, required: true }
});

export const ActivityLogModel = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);
