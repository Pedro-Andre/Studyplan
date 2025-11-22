import authRoutes from "./auth.js";
import eventsRoutes from "./events.js";
import goalsRoutes from "./goals.js";
import express from "express";

const router = express.Router();

// Centralizar todas as rotas
router.use(authRoutes);
router.use(eventsRoutes);
router.use(goalsRoutes);

export default router;