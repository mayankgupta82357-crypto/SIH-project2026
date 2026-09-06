import { Router } from "express";
import { runSimulation, resetSimulation } from "../controllers/simulationController.js";
export const simulationRoutes = Router();
simulationRoutes.post("/run", runSimulation);
simulationRoutes.post("/reset", resetSimulation);
