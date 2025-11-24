import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../views/Goals/Goals.css";

function EditTaskModal({ goal, onClose, onGoalUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    finishBy: "",
    priority: "Baixo",
  });

  // Preencher formulário com dados da meta
  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        category: goal.category || "",
        finishBy: new Date(goal.finishBy).toISOString().split("T")[0],
        priority: goal.priority,
      });
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriorityChange = (priority) => {
    setFormData((prev) => ({
      ...prev,
      priority,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!formData.name.trim()) {
      setError("Nome da tarefa é obrigatório");
      return;
    }

    if (!formData.finishBy) {
      setError("Data de conclusão é obrigatória");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/goals/${goal.id}`,
        {
          name: formData.name,
          category: formData.category || null,
          priority: formData.priority,
          finishBy: formData.finishBy,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onClose();
      onGoalUpdated();
    } catch (err) {
      console.error("Erro ao atualizar meta:", err);
      setError(err.response?.data?.error || "Erro ao atualizar meta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="gradient-text sub-title">Editar Tarefa</h2>

        {error && (
          <div
            style={{
              color: "#ff4444",
              backgroundColor: "#ff444420",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Nome da tarefa</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome da tarefa"
            disabled={loading}
          />

          <label>Ferramenta utilizada</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ex: Canva, Youtube..."
            disabled={loading}
          />

          <label>Conclusão estimada</label>
          <input
            type="date"
            name="finishBy"
            value={formData.finishBy}
            onChange={handleChange}
            disabled={loading}
          />

          <label className="priority-title">Nível de prioridade</label>
          <div className="priority-options">
            <label className="radio-input">
              <input
                type="radio"
                name="priority"
                checked={formData.priority === "Baixo"}
                onChange={() => handlePriorityChange("Baixo")}
                disabled={loading}
              />
              Baixo
            </label>
            <label className="radio-input">
              <input
                type="radio"
                name="priority"
                checked={formData.priority === "Médio"}
                onChange={() => handlePriorityChange("Médio")}
                disabled={loading}
              />
              Médio
            </label>
            <label className="radio-input">
              <input
                type="radio"
                name="priority"
                checked={formData.priority === "Alta"}
                onChange={() => handlePriorityChange("Alta")}
                disabled={loading}
              />
              Alta
            </label>
          </div>

          <div className="modal-footer">
            <button
              className="btn close-modal-btn"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn delete-btn"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
