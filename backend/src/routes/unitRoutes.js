import { Router } from "express";
import { getUnits, updateUnitStatus } from "../controllers/unitController.js";
export const unitRoutes = Router();
unitRoutes.get("/", getUnits);
unitRoutes.patch("/:id/status", updateUnitStatus);
