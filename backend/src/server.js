import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES GLOBAIS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Parser de JSON
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ROTA RAIZ
app.get("/", (req, res) => {
  res.json({ 
    message: "API do Studyplan rodando 🚀",
    endpoints: {
      auth: "/cadastro, /login, /calendario",
      events: "/events",
      goals: "/goals"
    }
  });
});

// ROTAS DA API
app.use(routes);

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});