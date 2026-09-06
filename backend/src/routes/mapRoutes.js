import { Router } from "express";
import {
  getMapOverview,
  searchLocation,
  calculateMapDirections,
  getMapConfig,
  updateMapConfig
} from "../controllers/mapController.js";

export const mapRoutes = Router();

mapRoutes.get("/overview", getMapOverview);
mapRoutes.get("/search", searchLocation);
mapRoutes.post("/directions", calculateMapDirections);
mapRoutes.get("/config", getMapConfig);
mapRoutes.post("/config", updateMapConfig);