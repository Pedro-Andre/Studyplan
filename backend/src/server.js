import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json("Usuário logado");
  console.log("Usuário logado");
});

app.get("/perfil", (req, res) => {
  res.json("Usuário logado");
});

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
