import "./AddEventForm.css";
import { useState } from "react";

function AddEventForm({ onAdd, onClose }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    desc: "",
    color: "#2196f3",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newEvent);
  };

  return (
    <div className="modal-container modal-form-container">
      <div className="modal modal-form">
        <h2 className="gradient-text sub-title">Adicionar Novo Evento</h2>
        <form onSubmit={handleSubmit} className="form-add-event">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newEvent.title}
            onChange={handleChange}
            placeholder="Nome do evento ou tarefa"
            required
          />

          <label htmlFor="start">Início:</label>
          <input
            type="datetime-local"
            name="start"
            id="start"
            value={newEvent.start}
            onChange={handleChange}
            required
          />

          <label htmlFor="end">Fim:</label>
          <input
            type="datetime-local"
            name="end"
            id="end"
            value={newEvent.end}
            onChange={handleChange}
            required
          />

          <label htmlFor="desc">Descrição:</label>
          <textarea
            name="desc"
            id="desc"
            value={newEvent.desc}
            onChange={handleChange}
            placeholder="Opcional..."
          />

          <label htmlFor="color">Cor do evento:</label>
          <input
            type="color"
            name="color"
            id="color"
            value={newEvent.color}
            onChange={handleChange}
          />

          <div className="btn-group">
            <button type="submit" className="btn save">
              Salvar
            </button>
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
