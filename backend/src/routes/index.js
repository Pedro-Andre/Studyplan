import express from "express";
import authRoutes from "./auth.js";
import eventsRoutes from "./events.js";
import goalsRoutes from "./goals.js";
import profileRoutes from "./profile.js";
import dashboardRoutes from "./dashboard.js";

const router = express.Router();

// Centralizar todas as rotas
router.use(authRoutes);
router.use(eventsRoutes);
router.use(goalsRoutes);
router.use(profileRoutes);
router.use(dashboardRoutes);

export default router;
