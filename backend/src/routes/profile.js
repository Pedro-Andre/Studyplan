import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../controllers/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ============================================
// OBTER DADOS DO PERFIL DO USUÁRIO
// ============================================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
        createdAt: true,
        goals: {
          select: {
            status: true,
            totalTime: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Calcular estatísticas
    const metasConcluidas = user.goals.filter(
      (g) => g.status === "Finalizado"
    ).length;

    const tempoTotalSegundos = user.goals.reduce(
      (sum, g) => sum + g.totalTime,
      0
    );

    const horas = Math.floor(tempoTotalSegundos / 3600);
    const minutos = Math.floor((tempoTotalSegundos % 3600) / 60);

    res.json({
      id: user.id,
      nome: user.name,
      username: user.username,
      email: user.email,
      foto: user.profileImage || null,
      metasConcluidas,
      tempoTotal: {
        horas,
        minutos,
        texto: `${horas}h e ${minutos}min`,
      },
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
});

// ============================================
// ATUALIZAR DADOS DO PERFIL (nome, email)
// ============================================
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validações
    if (!name || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    // Verificar se o email já está em uso por outro usuário
    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: req.user.id },
      },
    });

    if (emailExists) {
      return res.status(400).json({ error: "Email já está em uso" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
      },
    });

    res.json({
      message: "Perfil atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
});

// ============================================
// ATUALIZAR SENHA
// ============================================
router.put("/profile/password", authMiddleware, async (req, res) => {
  try {
    const { senhaAtual, novaSenha, confirmarSenha } = req.body;

    // Validações
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    if (novaSenha.length < 6) {
      return res
        .status(400)
        .json({ error: "A senha deve ter no mínimo 6 caracteres" });
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Verificar senha atual
    const isPasswordValid = await bcrypt.compare(senhaAtual, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Senha atual incorreta" });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    // Atualizar senha
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    res.json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    res.status(500).json({ error: "Erro ao atualizar senha" });
  }
});

// ============================================
// ATUALIZAR FOTO DE PERFIL (URL/Base64)
// ============================================
router.put("/profile/photo", authMiddleware, async (req, res) => {
  try {
    const { profileImage } = req.body;

    if (!profileImage) {
      return res.status(400).json({ error: "URL da imagem é obrigatória" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { profileImage },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
      },
    });

    res.json({
      message: "Foto atualizada com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar foto:", error);
    res.status(500).json({ error: "Erro ao atualizar foto" });
  }
});

// ============================================
// DELETAR CONTA
// ============================================
router.delete("/profile", authMiddleware, async (req, res) => {
  try {
    const { senha } = req.body;

    if (!senha) {
      return res
        .status(400)
        .json({ error: "Senha é obrigatória para deletar a conta" });
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // Deletar usuário (cascade vai deletar metas e eventos)
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.json({ message: "Conta deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
    res.status(500).json({ error: "Erro ao deletar conta" });
  }
});

export default router;
