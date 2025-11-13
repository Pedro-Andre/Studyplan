// import express from "express";
// import { createGoal, getGoals, updateGoalStatus } from "../controllers/goalsController.js";

// const router = express.Router();

// router.post("/goals", createGoal);
// router.get("/goals", getGoals);
// router.patch("/goals/:id/status", updateGoalStatus); // Nova rota

// //adicionado
// app.patch("/goals/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status, remainingTime } = req.body;

//   try {
//     const goal = await prisma.goals.update({
//       where: { id },
//       data: { status, remainingTime },
//     });
//     res.json(goal);
//   } catch (error) {
//     console.error("Erro ao atualizar meta:", error);
//     res.status(500).json({ error: "Erro ao atualizar meta" });
//   }
// });


// export default router;

import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

// Rota para buscar metas do usuário
router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

  try {
    const goals = await prisma.goal.findMany({
      where: { userId: parseInt(userId) },
    });
    res.json(goals);
  } catch (error) {
    console.error("Erro ao buscar metas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para adicionar uma nova meta
router.post("/", async (req, res) => {
  try {
    const { name, category, status, finishBy, priority, estimatedTime, userId } = req.body;

    const newGoal = await prisma.goal.create({
      data: {
        name,
        category,
        status,
        finishBy: new Date(finishBy),
        priority,
        estimatedTime: estimatedTime || 0,
        userId: parseInt(userId),
      },
    });

    res.json(newGoal);
  } catch (error) {
    console.error("Erro ao adicionar meta:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// ✅ Nova rota PATCH (corrigida)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { remainingTime, status } = req.body;

  try {
    const updatedGoal = await prisma.goal.update({
      where: { id: parseInt(id) },
      data: {
        remainingTime,
        status,
      },
    });

    res.json(updatedGoal);
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);
    res.status(500).json({ error: "Erro interno ao atualizar meta" });
  }
});

export default router;