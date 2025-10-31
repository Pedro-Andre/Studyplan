import "./EventModal.css";

const EventModal = function ({ event, onClose }) {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-item">
          <p className="item">Item:</p>
          <h2 className="event-name">{event.title}</h2>
        </div>

        <div className="modal-item">
          <p className="item">Descrição:</p>
          <p className="event-desc">{event.desc}</p>
        </div>

        <div className="modal-item">
          <p className="item">Início:</p>
          <p className="event-start">{event.start.toLocaleString()}</p>
        </div>

        <div className="modal-item">
          <p className="item">Fim:</p>
          <p className="event-end">{event.end.toLocaleString()}</p>
        </div>

        <button onClick={onClose} className="btn">
          Fechar
        </button>
      </div>
    </div>
  );
};

export default EventModal;
