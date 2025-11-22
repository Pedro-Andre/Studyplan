import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { prisma } from "../controllers/database.js";
import * as validations from "../middlewares/validations.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

// Validation Middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

// REGISTRO DE USUÁRIO
router.post(
  "/cadastro",
  validate(validations.validationCreateUser),
  async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      // Verificar se usuário já existe
      const exists = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      });

      if (exists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, username, email, password: hashedPassword },
      });

      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// LOGIN
router.post("/login", validations.validationLoginUser, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Senha inválida ou incorreta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno" });
  }
});

// ROTA DO CALENDÁRIO (obter dados do usuário)
router.get("/calendario", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, username: true },
    });

    res.json({
      message: "Acesso autorizado ao Calendário",
      user,
    });
  } catch (err) {
    console.error("Erro ao buscar dados do usuário:", err);
    res.status(500).json({ error: "Erro interno" });
  }
});

export default router;