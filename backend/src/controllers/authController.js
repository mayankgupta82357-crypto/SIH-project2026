import jwt from "jsonwebtoken";
import { getStore } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "urban-cascade-secret-key-2026";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const store = getStore();
    const user = store.users.find(u => u.email.toLowerCase() === (email || "").toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or credentials." });
    }

    // In demo / prototype mode, accept standard password or user password
    if (password !== user.password && password !== "demo123" && password !== "password123") {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        badge: user.badge,
        department: user.department
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const demoLogin = async (req, res) => {
  try {
    const { role = "Admin" } = req.body;
    const store = getStore();
    let user = store.users.find(u => u.role.toLowerCase() === role.toLowerCase());

    if (!user) {
      user = store.users[0];
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        badge: user.badge,
        department: user.department
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "Citizen" } = req.body;
    const store = getStore();

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: "User with this email already exists." });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password,
      role: ["Admin", "Emergency Operator", "Citizen"].includes(role) ? role : "Citizen",
      badge: role === "Admin" ? `ADM-${Math.floor(100 + Math.random()*900)}` :
             role === "Emergency Operator" ? `EOC-${Math.floor(100 + Math.random()*900)}` :
             `CIT-${Math.floor(100 + Math.random()*900)}`,
      department: role === "Citizen" ? "Civic User" : "Emergency Operations",
      createdAt: new Date().toISOString()
    };

    store.users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        badge: newUser.badge,
        department: newUser.department
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const store = getStore();
    const user = store.users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        badge: user.badge,
        department: user.department
      }
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};
