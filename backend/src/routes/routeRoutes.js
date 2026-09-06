import { Router } from "express";
import { optimizeRoute } from "../controllers/routeController.js";
export const routeRoutes = Router();
routeRoutes.post("/optimize", optimizeRoute);
