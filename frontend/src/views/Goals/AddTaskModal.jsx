// import React, { useState } from "react";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { Add01Icon } from "@hugeicons/core-free-icons";
// import "./AddTaskModal.css";

// function AddTaskModal() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button className="add-task-btn" onClick={() => setOpen(true)}>
//         <HugeiconsIcon icon={Add01Icon} />
//         Adicionar Tarefa
//       </button>

//       {open && (
//         <div className="modal-overlay" onClick={() => setOpen(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2 className="gradient-text sub-title">Adicionar Tarefa</h2>

//             <form>
//               <label>Nome da tarefa</label>
//               <input type="text" placeholder="Digite o nome da tarefa" />

//               <label>Ferramenta utilizada</label>
//               <input type="text" placeholder="Ex: Canva, Youtube..." />

//               <label>Conclusão estimada</label>
//               <input type="date" />

//               {/* <label>Tempo</label>
//               <select>
//                 <option>30min</option>
//                 <option>1h</option>
//                 <option>2h</option>
//                 <option>3h</option>
//               </select> */}

//               <label className="priority-title">Nível de prioridade</label>
//               <div className="priority-options">
//                 <label className="radio-input">
//                   <input type="radio" name="priority" defaultChecked /> Baixo
//                 </label>
//                 <label className="radio-input">
//                   <input type="radio" name="priority" /> Médio
//                 </label>
//                 <label className="radio-input">
//                   <input type="radio" name="priority" />
//                   Alta
//                 </label>
//               </div>

//               <button
//                 type="button"
//                 className="confirm-btn"
//                 onClick={() => setOpen(false)}
//               >
//                 Confirmar
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default AddTaskModal;

// ===========

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import axios from "axios";
import "./AddTaskModal.css";

function AddTaskModal({ onGoalAdded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    finishBy: "",
    priority: "Baixo",
  });

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

      const response = await axios.post(
        "http://localhost:3000/goals",
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

      console.log("Meta criada:", response.data);

      // Resetar formulário
      setFormData({
        name: "",
        category: "",
        finishBy: "",
        priority: "Baixo",
      });

      // Fechar modal
      setOpen(false);

      // Notificar componente pai para atualizar lista
      if (onGoalAdded) {
        onGoalAdded();
      }
    } catch (err) {
      console.error("Erro ao criar meta:", err);
      setError(err.response?.data?.error || "Erro ao criar meta");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setFormData({
      name: "",
      category: "",
      finishBy: "",
      priority: "Baixo",
    });
  };

  return (
    <>
      <button className="add-task-btn" onClick={() => setOpen(true)}>
        <HugeiconsIcon icon={Add01Icon} />
        Adicionar Tarefa
      </button>

      {open && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="gradient-text sub-title">Adicionar Tarefa</h2>

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
