// import "./EventModal.css";

// const EventModal = function ({ event, onClose }) {
//   return (
//     <div className="modal-container">
//       <div className="modal">
//         <div className="modal-item">
//           <p className="item">Item:</p>
//           <h2 className="event-name">{event.title}</h2>
//         </div>

//         <div className="modal-item">
//           <p className="item">Descrição:</p>
//           <p className="event-desc">{event.desc}</p>
//         </div>

//         <div className="modal-item">
//           <p className="item">Início:</p>
//           <p className="event-start">{event.start.toLocaleString()}</p>
//         </div>

//         <div className="modal-item">
//           <p className="item">Fim:</p>
//           <p className="event-end">{event.end.toLocaleString()}</p>
//         </div>

//         <button onClick={onClose} className="btn">
//           Fechar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventModal;

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
    // <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal">
          <div className="modal-item">
            <h2 className="gradient-text sub-title event-name">{event.title}</h2>
          </div>

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
            

            <div className="modal-item">
              <p className="item">Fim:</p>
              <p className="event-end">
                {format(event.end, "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>

            <div className="event-detail">
              <strong>Cor:</strong>
              <div
                className="color-preview"
                style={{ backgroundColor: event.color }}
              ></div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn delete-btn" onClick={handleDelete}>
              Deletar Evento
            </button>
            <button className="btn close-modal-btn" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default EventModal;
