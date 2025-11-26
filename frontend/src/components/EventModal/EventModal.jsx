import "./EventModal.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function EventModal({ event, onClose, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar este evento?")) {
      onDelete(event.id);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal">
          <h2 className="gradient-text sub-title event-name">{event.title}</h2>

          <div className="modal-item">
            {event.desc && (
              <div className="event-detail">
                <p className="item">Descrição:</p>
                <p className="event-desc">{event.desc}</p>
              </div>
            )}
          </div>

          <div className="modal-item">
            <p className="item">Início:</p>
            <p className="event-start">
              {format(event.start, "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="modal-item">
            <p className="item">Fim:</p>
            <p className="event-end">
              {format(event.end, "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn close-modal-btn" onClick={onClose}>
              Fechar
            </button>
            <button className="btn delete-btn" onClick={handleDelete}>
              Deletar Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
