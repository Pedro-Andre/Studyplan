import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import axios from "axios";
import "./AddTaskModal.css";
import {
  validateGoalForm,
  hasErrors,
  getFirstError,
} from "../../services/frontendValidations.js";
import ErrorMessage, {
  FormErrorAlert,
} from "../../components/ErrorMessage/ErrorMessage";

function AddTaskModal({ onGoalAdded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

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

    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setServerError("");
  };

  const handlePriorityChange = (priority) => {
    setFormData((prev) => ({
      ...prev,
      priority,
    }));

    // Limpar erro de prioridade
    if (errors.priority) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.priority;
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validateGoalField(name, formData[name], formData);

    if (hasErrors(fieldErrors)) {
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Validar formulário completo
    const validationErrors = validateGoalForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setServerError(getFirstError(validationErrors));
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
      setErrors({});
      setServerError("");

      // Fechar modal
      setOpen(false);

      // Notificar componente pai para atualizar lista
      if (onGoalAdded) {
        onGoalAdded();
      }
    } catch (err) {
      console.error("Erro ao criar meta:", err);

      // Tratar erros do backend
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          const field = error.path || error.param;
          if (!backendErrors[field]) {
            backendErrors[field] = [];
          }
          backendErrors[field].push(error.msg);
        });
        setErrors(backendErrors);
        setServerError(getFirstError(backendErrors));
      } else if (err.response?.data?.error) {
        setServerError(err.response.data.error);
      } else {
        setServerError("Erro ao criar meta");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setServerError("");
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

            {/* Alerta de Erro */}
            <FormErrorAlert error={serverError} />

            <form onSubmit={handleSubmit}>
              {/* Campo: Nome da tarefa */}
              <label>Nome da tarefa</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Digite o nome da tarefa"
                className={errors.name ? "input-error" : ""}
                disabled={loading}
              />
              <ErrorMessage errors={errors} fieldName="name" />

              {/* Campo: Categoria */}
              <label>Ferramenta utilizada</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ex: Canva, Youtube..."
                className={errors.category ? "input-error" : ""}
                disabled={loading}
              />
              <ErrorMessage errors={errors} fieldName="category" />

              {/* Campo: Data de conclusão */}
              <label>Conclusão estimada</label>
              <input
                type="date"
                name="finishBy"
                value={formData.finishBy}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.finishBy ? "input-error" : ""}
                disabled={loading}
              />
              <ErrorMessage errors={errors} fieldName="finishBy" />

              {/* Campo: Prioridade */}
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
              <ErrorMessage errors={errors} fieldName="priority" />

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn close-modal-btn"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="btn delete-btn"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTaskModal;
