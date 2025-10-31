import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import "./AddTaskModal.css";

function AddTaskModal() {
  const [open, setOpen] = useState(false);

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

            <form>
              <label>Nome da tarefa</label>
              <input type="text" placeholder="Digite o nome da tarefa" />

              <label>Ferramenta utilizada</label>
              <input type="text" placeholder="Ex: Canva, Youtube..." />

              <label>Conclusão estimada</label>
              <input type="date" />

              <label>Tempo</label>
              <select>
                <option>30min</option>
                <option>1h</option>
                <option>2h</option>
                <option>3h</option>
              </select>

              <label className="priority-title">Nível de prioridade</label>
              <div className="priority-options">
                <label className="radio-input">
                  <input type="radio" name="priority" defaultChecked /> Baixo
                </label>
                <label className="radio-input">
                  <input type="radio" name="priority" /> Médio
                </label>
                <label className="radio-input">
                  <input type="radio" name="priority" />
                  Alta
                </label>
              </div>

              <button
                type="button"
                className="confirm-btn"
                onClick={() => setOpen(false)}
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTaskModal;
