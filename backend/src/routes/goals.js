import express from "express";
import { prisma } from "../controllers/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  validationCreateGoal,
  validationUpdateGoal,
  validationUpdateGoalStatus,
} from "../middlewares/validations.js";

const router = express.Router();

// CRIAR NOVA META
router.post(
  "/goals",
  authMiddleware,
  validationCreateGoal,
  async (req, res) => {
    try {
      const { name, category, priority, finishBy } = req.body;

      const goal = await prisma.goals.create({
        data: {
          name,
          category: category || null,
          priority,
          finishBy: new Date(finishBy),
          userId: req.user.id,
          status: "Não Iniciado",
          totalTime: 0,
        },
      });

      res.status(201).json(goal);
    } catch (error) {
      console.error("Erro ao criar meta:", error);
      res.status(500).json({ error: "Erro ao criar meta" });
    }
  }
);

// LISTAR TODAS AS METAS DO USUÁRIO
router.get("/goals", authMiddleware, async (req, res) => {
  try {
    const goals = await prisma.goals.findMany({
      where: { userId: req.user.id },
      include: {
        timeSessions: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calcular estatísticas
    const totalGoals = goals.length;
    const notStarted = goals.filter((g) => g.status === "Não Iniciado").length;
    const completed = goals.filter((g) => g.status === "Finalizado").length;
    const totalSeconds = goals.reduce((sum, g) => sum + g.totalTime, 0);

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);

    res.json({
      goals,
      stats: {
        total: totalGoals,
        notStarted,
        completed,
        totalHours,
        totalMinutes,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar metas:", error);
    res.status(500).json({ error: "Erro ao buscar metas" });
  }
});

// BUSCAR UMA META ESPECÍFICA
router.get("/goals/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await prisma.goals.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        timeSessions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!goal) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    res.json(goal);
  } catch (error) {
    console.error("Erro ao buscar meta:", error);
    res.status(500).json({ error: "Erro ao buscar meta" });
  }
});

// INICIAR CRONÔMETRO (CRIAR SESSÃO)
router.post("/goals/:id/start", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a meta pertence ao usuário
    const goal = await prisma.goals.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!goal) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    // Verificar se já existe uma sessão ativa
    const activeSession = await prisma.timeSession.findFirst({
      where: {
        goalId: id,
        endTime: null,
      },
    });

    if (activeSession) {
      return res.status(400).json({ error: "Já existe uma sessão ativa" });
    }

    // Criar nova sessão
    const session = await prisma.timeSession.create({
      data: {
        goalId: id,
        startTime: new Date(),
      },
    });

    // Atualizar status da meta para "Em Progresso"
    await prisma.goals.update({
      where: { id },
      data: { status: "Em Progresso" },
    });

    res.json(session);
  } catch (error) {
    console.error("Erro ao iniciar cronômetro:", error);
    res.status(500).json({ error: "Erro ao iniciar cronômetro" });
  }
});

// PAUSAR CRONÔMETRO (FINALIZAR SESSÃO)
router.post("/goals/:id/pause", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar sessão ativa
    const activeSession = await prisma.timeSession.findFirst({
      where: {
        goalId: id,
        endTime: null,
      },
    });

    if (!activeSession) {
      return res.status(400).json({ error: "Nenhuma sessão ativa encontrada" });
    }

    const endTime = new Date();
    const duration = Math.floor((endTime - activeSession.startTime) / 1000); // em segundos

    // Atualizar sessão
    const updatedSession = await prisma.timeSession.update({
      where: { id: activeSession.id },
      data: {
        endTime,
        duration,
      },
    });

    // Atualizar tempo total da meta
    const goal = await prisma.goals.findUnique({
      where: { id },
    });

    await prisma.goals.update({
      where: { id },
      data: {
        totalTime: goal.totalTime + duration,
      },
    });

    res.json(updatedSession);
  } catch (error) {
    console.error("Erro ao pausar cronômetro:", error);
    res.status(500).json({ error: "Erro ao pausar cronômetro" });
  }
});

// ATUALIZAR STATUS DA META
router.patch(
  "/goals/:id/status",
  authMiddleware,
  validationUpdateGoalStatus,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const goal = await prisma.goals.findFirst({
        where: { id, userId: req.user.id },
      });

      if (!goal) {
        return res.status(404).json({ error: "Meta não encontrada" });
      }

      const updateData = { status };

      // Se finalizar, adicionar data de conclusão
      if (status === "Finalizado") {
        updateData.completedAt = new Date();
      }

      const updatedGoal = await prisma.goals.update({
        where: { id },
        data: updateData,
      });

      res.json(updatedGoal);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      res.status(500).json({ error: "Erro ao atualizar status" });
    }
  }
);

// ATUALIZAR META
router.put(
  "/goals/:id",
  authMiddleware,
  validationUpdateGoal,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, priority, finishBy } = req.body;

      const goal = await prisma.goals.findFirst({
        where: { id, userId: req.user.id },
      });

      if (!goal) {
        return res.status(404).json({ error: "Meta não encontrada" });
      }

      const updatedGoal = await prisma.goals.update({
        where: { id },
        data: {
          name: name || goal.name,
          category: category !== undefined ? category : goal.category,
          priority: priority || goal.priority,
          finishBy: finishBy ? new Date(finishBy) : goal.finishBy,
        },
      });

      res.json(updatedGoal);
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
      res.status(500).json({ error: "Erro ao atualizar meta" });
    }
  }
);

// DELETAR META
router.delete("/goals/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await prisma.goals.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!goal) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    await prisma.goals.delete({
      where: { id },
    });

    res.json({ message: "Meta deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar meta:", error);
    res.status(500).json({ error: "Erro ao deletar meta" });
  }
});

// VERIFICAR SE HÁ SESSÃO ATIVA
router.get("/goals/:id/active-session", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const activeSession = await prisma.timeSession.findFirst({
      where: {
        goalId: id,
        endTime: null,
      },
    });

    res.json({
      hasActiveSession: !!activeSession,
      session: activeSession,
    });
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    res.status(500).json({ error: "Erro ao verificar sessão" });
  }
});

export default router;
