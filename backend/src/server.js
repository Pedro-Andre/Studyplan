import express from "express";
import cors from "cors";
import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import * as validations from "./middlewares/validations.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// CORS config, it allows access from differents port 5173 (front) and 3000 (back)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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

app.get("/", (req, res) => {
  res.send("API do Studyplan rodando 🚀");
});

// Register user
app.post("/cadastro", validations.validationCreateUser, async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Verify if user exists
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (exists) return res.status(400).json({ error: "Usuário já existe" });

    // Password hash
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
    res.status(500).json({ error: "Erro interno" });
  }
});

// Login
app.post("/login", validations.validationLoginUser, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Senha inválida" });

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
    res.status(500).json({ error: "Erro interno" });
  }
});

// Calendar
app.get("/calendario", authMiddleware, async (req, res) => {
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
    res.status(500).json({ error: "Erro interno" });
  }
});

app.listen(3000, () => console.log("Server rodando na porta 3000 🚀"));
