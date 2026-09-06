// authRoutes.js
import { Router } from "express";
import { login, demoLogin, register, getMe } from "../controllers/authController.js";
export const authRoutes = Router();
authRoutes.post("/login", login);
authRoutes.post("/demo-login", demoLogin);
authRoutes.post("/register", register);
authRoutes.get("/me", getMe);
