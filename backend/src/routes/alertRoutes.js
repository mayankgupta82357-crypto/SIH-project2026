import { Router } from "express";
import { getAlerts, acknowledgeAlert, createAlert } from "../controllers/alertController.js";
export const alertRoutes = Router();
alertRoutes.get("/", getAlerts);
alertRoutes.post("/", createAlert);
alertRoutes.patch("/:id/acknowledge", acknowledgeAlert);
