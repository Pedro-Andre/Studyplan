import React, { useState } from "react";
import axios from "axios";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import "./AddTaskModal.css";

function AddTaskModal({ userId, onGoalAdded }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [finishBy, setFinishBy] = useState("");
  const [priority, setPriority] = useState("Baixo");
  const [estimatedTime, setEstimatedTime] = useState(""); // Novo campo
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ Token não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/goals",
        {
          name,
          category,
          priority,
          finishBy,
          estimatedTime: Number(estimatedTime), // Envia tempo
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      // Atualiza tabela
      if (onGoalAdded) onGoalAdded(response.data);

      // Limpa campos
      setOpen(false);
      setName("");
      setCategory("");
      setFinishBy("");
      setPriority("Baixo");
      setEstimatedTime("");
    } catch (error) {
      console.error("Erro completo:", error);
      if (error.code === "ECONNABORTED") {
        setError("⏱️ Tempo esgotado. O servidor demorou muito para responder.");
      } else if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        setError("❌ Servidor offline. Verifique se está rodando em http://localhost:3000");
      } else if (error.response) {
        const msg = error.response.data?.message || error.response.data?.error || "Erro desconhecido";
        setError(`Erro ${error.response.status}: ${msg}`);
      } else {
        setError("❌ Erro de conexão. Verifique sua internet e o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="add-task-btn" onClick={() => setOpen(true)}>
        <HugeiconsIcon icon={Add01Icon} />
        Adicionar Tarefa
      </button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="gradient-text sub-title">Adicionar Tarefa</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="task-name">Nome da tarefa</label>
              <input
                id="task-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome da tarefa"
                required
                disabled={loading}
              />

              <label htmlFor="task-category">Ferramenta utilizada</label>
              <input
                id="task-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Canva, Youtube..."
                disabled={loading}
              />

              <label htmlFor="task-date">Conclusão estimada</label>
              <input
                id="task-date"
                type="date"
                value={finishBy}
                onChange={(e) => setFinishBy(e.target.value)}
                required
                disabled={loading}
              />

              {/* Novo campo de tempo */}
              <label htmlFor="task-time">Tempo estimado (em minutos)</label>
              <input
                id="task-time"
                type="number"
                min="1"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="Ex: 60 para 1 hora"
                disabled={loading}
              />

              <label className="priority-title">Nível de prioridade</label>
              <div className="priority-options">
                {["Baixo", "Médio", "Alta"].map((p) => (
                  <label className="radio-input" key={p}>
                    <input
                      type="radio"
                      name="priority"
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                      disabled={loading}
                    />
                    {p}
                  </label>
                ))}
              </div>

              {error && <p className="error" style={{ color: "red", marginTop: "10px" }}>{error}</p>}

              <button type="submit" className="confirm-btn" disabled={loading}>
                {loading ? "Salvando..." : "Confirmar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTaskModal;
