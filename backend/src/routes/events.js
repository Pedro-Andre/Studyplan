import express from "express";
import { validationResult } from "express-validator";
import { prisma } from "../controllers/database.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as validations from "../middlewares/validations.js";

const router = express.Router();

// Middleware de validação
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

// BUSCAR TODOS OS EVENTOS DO USUÁRIO
router.get("/events", authMiddleware, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        start: "asc",
      },
    });
    res.json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
});

// CRIAR NOVO EVENTO
router.post(
  "/events",
  authMiddleware,
  validate(validations.validationCreateEvent),
  async (req, res) => {
    try {
      const { title, start, end, desc, color } = req.body;

      const event = await prisma.event.create({
        data: {
          title,
          start: new Date(start),
          end: new Date(end),
          desc: desc || null,
          color: color || "#2196f3",
          userId: req.user.id,
        },
      });

      res.status(201).json(event);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      res.status(500).json({ error: "Erro ao criar evento" });
    }
  }
);

// ATUALIZAR EVENTO
router.put(
  "/events/:id",
  authMiddleware,
  validate(validations.validationUpdateEvent),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, start, end, desc, color } = req.body;

      // Verifica se o evento pertence ao usuário
      const event = await prisma.event.findFirst({
        where: {
          id: id,
          userId: req.user.id,
        },
      });

      if (!event) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      const updatedEvent = await prisma.event.update({
        where: { id: id },
        data: {
          title: title || event.title,
          start: start ? new Date(start) : event.start,
          end: end ? new Date(end) : event.end,
          desc: desc !== undefined ? desc : event.desc,
          color: color || event.color,
        },
      });

      res.json(updatedEvent);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      res.status(500).json({ error: "Erro ao atualizar evento" });
    }
  }
);

// DELETAR EVENTO
router.delete("/events/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o evento pertence ao usuário
    const event = await prisma.event.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    await prisma.event.delete({
      where: { id: id },
    });

    res.json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    res.status(500).json({ error: "Erro ao deletar evento" });
  }
});

export default router;
