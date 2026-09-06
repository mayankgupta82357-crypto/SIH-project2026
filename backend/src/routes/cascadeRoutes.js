import { Router } from "express";
import { getCascadeAnalysis, simulateCascadeScenario } from "../controllers/cascadeController.js";
export const cascadeRoutes = Router();
cascadeRoutes.get("/:incidentId", getCascadeAnalysis);
cascadeRoutes.post("/simulate", simulateCascadeScenario);
