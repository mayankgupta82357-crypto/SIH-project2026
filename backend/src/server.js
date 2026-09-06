import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getStore } from "./config/db.js";

// Routes
import { authRoutes } from "./routes/authRoutes.js";
import { incidentRoutes } from "./routes/incidentRoutes.js";
import { cascadeRoutes } from "./routes/cascadeRoutes.js";
import { routeRoutes } from "./routes/routeRoutes.js";
import { alertRoutes } from "./routes/alertRoutes.js";
import { unitRoutes } from "./routes/unitRoutes.js";
import { analyticsRoutes } from "./routes/analyticsRoutes.js";
import { citizenRoutes } from "./routes/citizenRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { simulationRoutes } from "./routes/simulationRoutes.js";
import { mapRoutes } from "./routes/mapRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Cross-origin configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
global.io = io;

io.on("connection", (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  // Send current summary counts on connect
  const store = getStore();
  socket.emit("system:ready", {
    message: "Connected to Urban Cascade Real-Time Telemetry Stream",
    activeIncidents: store.incidents.filter(i => i.status !== "Resolved").length,
    criticalAlerts: store.alerts.filter(a => !a.acknowledged).length,
    activeUnits: store.units.filter(u => u.status !== "Available").length
  });

  socket.on("disconnect", () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});

// API Root & Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    system: "Urban Cascade Intelligence & Response System",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/cascade", cascadeRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/emergency-units", unitRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/citizen", citizenRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/map", mapRoutes);

// Facility landmarks endpoint (hospitals, police stations, fire stations)
app.get("/api/facilities", (req, res) => {
  const store = getStore();
  res.json({ success: true, count: store.facilities.length, data: store.facilities });
});

// Fallback 404 for unknown endpoints
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found.` });
});

const PORT = process.env.PORT || 5000;

// Initialize DB and launch server
await connectDB();

server.listen(PORT, () => {
  console.log("==================================================================");
  console.log(`🚀 Urban Cascade Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO Real-Time Stream active on port ${PORT}`);
  console.log(`🏙️  Metropolitan Area: Bengaluru Central Grid (Latitude 12.97, Longitude 77.59)`);
  console.log("==================================================================");
});
