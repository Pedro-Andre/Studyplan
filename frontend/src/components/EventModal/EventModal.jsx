import "./EventModal.css";

const EventModal = function ({ event, onClose }) {
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>{event.title}</h2>
        <p>{event.desc}</p>
        <p>Início: {event.start.toLocaleString()}</p>
        <p>Fim: {event.end.toLocaleString()}</p>

        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default EventModal;
