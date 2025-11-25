import express from "express";
import { prisma } from "../controllers/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// OBTER DADOS COMPLETOS DO DASHBOARD
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const goals = await prisma.goals.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        name: true,
        status: true,
        totalTime: true,
        finishBy: true,
        completedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // GRÁFICO 1: Horas Dedicadas nas Metas
    const horasPorMeta = goals.map((goal) => ({
      nome: goal.name,
      horas: Math.floor(goal.totalTime / 3600),
      minutos: Math.floor((goal.totalTime % 3600) / 60),
      totalSegundos: goal.totalTime,
    }));

    // GRÁFICO 2: Status das Metas (Rosca)
    const statusCount = {
      concluidas: goals.filter((g) => g.status === "Finalizado").length,
      emAndamento: goals.filter((g) => g.status === "Em Progresso").length,
      naoIniciadas: goals.filter((g) => g.status === "Não Iniciado").length,
    };

    // GRÁFICO 3: Metas do Mês (Progresso por prazo)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filtrar metas do mês atual
    const metasDoMes = goals.filter((goal) => {
      const deadline = new Date(goal.finishBy);
      return (
        deadline.getMonth() === currentMonth &&
        deadline.getFullYear() === currentYear &&
        goal.status !== "Finalizado"
      );
    });

    // Calcular progresso de cada meta
    const progressoMetasMes = metasDoMes.map((goal) => {
      const created = new Date(goal.createdAt);
      const deadline = new Date(goal.finishBy);
      const totalTime = deadline - created;
      const elapsed = now - created;
      const progresso = Math.min(Math.round((elapsed / totalTime) * 100), 100);

      return {
        id: goal.id,
        nome: goal.name,
        progresso: progresso >= 0 ? progresso : 0,
        prazo: goal.finishBy,
        status: goal.status,
      };
    });

    // GRÁFICO 4: Progresso ao Longo do Tempo (Metas Concluídas por Mês)
    const metasConcluidas = goals.filter(
      (g) => g.status === "Finalizado" && g.completedAt
    );

    // Agrupar por mês
    const metasPorMes = {};
    metasConcluidas.forEach((goal) => {
      const date = new Date(goal.completedAt);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!metasPorMes[monthKey]) {
        metasPorMes[monthKey] = 0;
      }
      metasPorMes[monthKey]++;
    });

    // Últimos 12 meses
    const progressoAoLongoDoTempo = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];

      progressoAoLongoDoTempo.push({
        mes: meses[date.getMonth()],
        ano: date.getFullYear(),
        quantidade: metasPorMes[monthKey] || 0,
      });
    }

    // RESPOSTA FINAL
    res.json({
      // Gráfico 1
      horasPorMeta,

      // Gráfico 2
      statusMetas: statusCount,

      // Gráfico 3
      metasDoMes: {
        total: metasDoMes.length,
        metas: progressoMetasMes,
      },

      // Gráfico 4
      progressoAoLongoDoTempo,

      // Estatísticas gerais
      estatisticas: {
        totalMetas: goals.length,
        metasConcluidas: statusCount.concluidas,
        metasEmAndamento: statusCount.emAndamento,
        metasNaoIniciadas: statusCount.naoIniciadas,
        tempoTotalSegundos: goals.reduce((sum, g) => sum + g.totalTime, 0),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ error: "Erro ao buscar dados do dashboard" });
  }
});

export default router;
