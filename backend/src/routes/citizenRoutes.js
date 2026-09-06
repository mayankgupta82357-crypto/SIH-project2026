import { Router } from "express";
import { getCitizenOverview, submitCitizenReport } from "../controllers/citizenController.js";
export const citizenRoutes = Router();
citizenRoutes.get("/overview", getCitizenOverview);
citizenRoutes.post("/report", submitCitizenReport);
