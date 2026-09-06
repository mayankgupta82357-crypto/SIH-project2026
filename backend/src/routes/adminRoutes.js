import { Router } from "express";
import { getSystemHealth, getUsers, updateUserRole, getActivityLogs } from "../controllers/adminController.js";
export const adminRoutes = Router();
adminRoutes.get("/health", getSystemHealth);
adminRoutes.get("/users", getUsers);
adminRoutes.patch("/users/:id/role", updateUserRole);
adminRoutes.get("/logs", getActivityLogs);
