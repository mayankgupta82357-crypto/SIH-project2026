import mongoose from "mongoose";
import {
  INITIAL_USERS,
  INITIAL_INCIDENTS,
  INITIAL_ALERTS,
  INITIAL_UNITS,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_ACTIVITY_LOGS,
  CITY_FACILITIES
} from "../data/seedData.js";

// In-Memory Storage (deep clones of initial data)
let memoryDb = {
  users: JSON.parse(JSON.stringify(INITIAL_USERS)),
  incidents: JSON.parse(JSON.stringify(INITIAL_INCIDENTS)),
  alerts: JSON.parse(JSON.stringify(INITIAL_ALERTS)),
  units: JSON.parse(JSON.stringify(INITIAL_UNITS)),
  citizenReports: JSON.parse(JSON.stringify(INITIAL_CITIZEN_REPORTS)),
  activityLogs: JSON.parse(JSON.stringify(INITIAL_ACTIVITY_LOGS)),
  facilities: JSON.parse(JSON.stringify(CITY_FACILITIES)),
  isUsingMemory: true
};

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log("[UrbanCascade DB] No MONGO_URI provided. Running in High-Performance In-Memory Mode with pre-seeded Bengaluru Metropolitan Data.");
    memoryDb.isUsingMemory = true;
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[UrbanCascade DB] MongoDB Connected: ${conn.connection.host}`);
    memoryDb.isUsingMemory = false;
  } catch (error) {
    console.warn(`[UrbanCascade DB] MongoDB Connection failed (${error.message}). Falling back to In-Memory Engine.`);
    memoryDb.isUsingMemory = true;
  }
};

export const getStore = () => memoryDb;

export const resetStore = () => {
  memoryDb.users = JSON.parse(JSON.stringify(INITIAL_USERS));
  memoryDb.incidents = JSON.parse(JSON.stringify(INITIAL_INCIDENTS));
  memoryDb.alerts = JSON.parse(JSON.stringify(INITIAL_ALERTS));
  memoryDb.units = JSON.parse(JSON.stringify(INITIAL_UNITS));
  memoryDb.citizenReports = JSON.parse(JSON.stringify(INITIAL_CITIZEN_REPORTS));
  memoryDb.activityLogs = JSON.parse(JSON.stringify(INITIAL_ACTIVITY_LOGS));
  memoryDb.facilities = JSON.parse(JSON.stringify(CITY_FACILITIES));
  return memoryDb;
};
