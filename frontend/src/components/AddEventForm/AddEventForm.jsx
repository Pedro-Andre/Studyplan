import "./AddEventForm.css";
import { useState } from "react";
import {
  validateEventForm,
  hasErrors,
  getFirstError,
} from "../../services/frontendValidations.js";
import ErrorMessage, {
  FormErrorAlert,
} from "../../components/ErrorMessage/ErrorMessage";

function AddEventForm({ onAdd, onClose }) {
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    desc: "",
    color: "#2196f3",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });

    // Limpar erro do campo ao digitar
    if (errors[name] || errors.dates) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.dates; // Limpar erro de datas
        return newErrors;
      });
    }
    setServerError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    // Quando o campo for parte das datas, validar com todo o objeto newEvent
    const fieldErrors = validateEventField(name, newEvent);

    if (hasErrors(fieldErrors)) {
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    } else {
      // limpar erro do campo/dates se não houver erros
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.dates;
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");

    // Validar formulário completo
    const validationErrors = validateEventForm(newEvent);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setServerError(getFirstError(validationErrors));
      return;
    }

    // Monta as datas completas
    const start = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
    const end = new Date(`${newEvent.endDate}T${newEvent.endTime}`);

    onAdd({
      title: newEvent.title,
      start,
      end,
      desc: newEvent.desc,
      color: newEvent.color,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-form-container">
        <div className="modal modal-form" onClick={(e) => e.stopPropagation()}>
          <h2 className="gradient-text sub-title">Adicionar Novo Evento</h2>

          {/* Alerta de Erro */}
          <FormErrorAlert error={serverError} />

          <form onSubmit={handleSubmit} className="form-add-event">
            {/* Campo: Título */}
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={newEvent.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nome do evento ou tarefa"
              className={errors.title ? "input-error" : ""}
            />
            <ErrorMessage errors={errors} fieldName="title" />

            {/* Campos: Data e Hora de Início */}
            <label>Início (data e hora):</label>
            <div className="date-input">
              <input
                type="date"
                name="startDate"
                value={newEvent.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.dates ? "input-error" : ""}
              />
              <input
                type="time"
                name="startTime"
                value={newEvent.startTime}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.dates ? "input-error" : ""}
              />
            </div>

            {/* Campos: Data e Hora de Término */}
            <label>Fim (data e hora):</label>
            <div className="date-input">
              <input
                type="date"
                name="endDate"
                value={newEvent.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.dates ? "input-error" : ""}
              />
              <input
                type="time"
                name="endTime"
                value={newEvent.endTime}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.dates ? "input-error" : ""}
              />
            </div>
            <ErrorMessage errors={errors} fieldName="dates" />

            {/* Campo: Descrição */}
            <label htmlFor="desc">Descrição:</label>
            <textarea
              name="desc"
              id="desc"
              value={newEvent.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Opcional..."
              className={errors.desc ? "input-error" : ""}
            />
            <ErrorMessage errors={errors} fieldName="desc" />

            {/* Campo: Cor */}
            <label htmlFor="color">Cor do evento:</label>
            <input
              type="color"
              name="color"
              id="color"
              value={newEvent.color}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.color ? "input-error" : ""}
            />
            <ErrorMessage errors={errors} fieldName="color" />

            <div className="btn-group">
              <button type="button" className="btn cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn save">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEventForm;
