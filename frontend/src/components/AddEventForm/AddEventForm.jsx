import "./AddEventForm.css";
import { useState } from "react";

function AddEventForm({ onAdd, onClose }) {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Monta as datas completas
    const start = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
    const end = new Date(`${newEvent.endDate}T${newEvent.endTime}`);

    // Evita erro se o fim for antes do início
    if (end < start) {
      alert("A data/hora de término deve ser posterior ao início.");
      return;
    }

    onAdd({
      title: newEvent.title,
      start,
      end,
      desc: newEvent.desc,
      color: newEvent.color,
    });

    onClose();
  };

  const [open, setOpen] = useState(false);
  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
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

            <label>Início (data e hora):</label>
            <div className="date-input">
              <input
                type="date"
                name="startDate"
                value={newEvent.startDate}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="startTime"
                value={newEvent.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <label>Fim (data e hora):</label>
            <div className="date-input">
              <input
                type="date"
                name="endDate"
                value={newEvent.endDate}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="endTime"
                value={newEvent.endTime}
                onChange={handleChange}
                required
              />
            </div>

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
    </div>
  );
}

export default AddEventForm;
