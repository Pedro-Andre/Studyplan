import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// Criar nova meta
export const createGoal = async (req, res) => {
  try {
    const { name, category, priority, finishBy, userId, estimatedTime } = req.body;

    // Validações
    if (!name || !priority || !finishBy || !userId) {
      return res.status(400).json({ 
        error: "Campos obrigatórios: name, priority, finishBy, userId" 
      });
    }

    const newGoal = await prisma.goals.create({
      data: {
        name,
        category: category || null,
        priority,
        finishBy: new Date(finishBy),
        userId,
        estimatedTime: parseInt(estimatedTime) || 0, // Converte para número
        status: "Não Iniciado" // Status inicial
      },
    });

    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    res.status(500).json({ 
      error: "Erro ao criar meta", 
      details: error.message 
    });
  }
};

// Buscar metas (com filtro por usuário se fornecido)
export const getGoals = async (req, res) => {
  try {
    const { userId } = req.query;

    const where = userId ? { userId } : {};

    const goals = await prisma.goals.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(goals);
  } catch (error) {
    console.error("Erro ao buscar metas:", error);
    res.status(500).json({ 
      error: "Erro ao buscar metas",
      details: error.message 
    });
  }
};

// Atualizar status da meta (para o botão Play)
export const updateGoalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedGoal = await prisma.goals.update({
      where: { id },
      data: { status },
    });

    res.json(updatedGoal);
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);
    res.status(500).json({ 
      error: "Erro ao atualizar meta",
      details: error.message 
    });
  }
};