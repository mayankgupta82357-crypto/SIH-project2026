import { Router } from "express";
import { getCitizenOverview, submitCitizenReport } from "../controllers/citizenController.js";
import { getStore } from "../config/db.js";

export const citizenRoutes = Router();
citizenRoutes.get("/overview", getCitizenOverview);
citizenRoutes.get("/reports", (req, res) => {
  try {
    const store = getStore();
    return res.json({ success: true, count: store.citizenReports.length, data: store.citizenReports });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});
citizenRoutes.post("/report", submitCitizenReport);
