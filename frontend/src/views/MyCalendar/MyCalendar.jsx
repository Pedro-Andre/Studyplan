import "./MyCalendar.css";
import SideMenu from "../../components/SideMenu/SideMenu.jsx";
import TopBar from "../../components/TopBar/TopBar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useState, useRef, useEffect } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import AddEventForm from "../../components/AddEventForm/AddEventForm.jsx";
import EventModal from "../../components/EventModal/EventModal.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import axios from "axios";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Buscar eventos do banco ao carregar o componente
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("🔍 Token encontrado:", token);
      console.log("🔍 Token length:", token?.length);

      if (!token) {
        console.error("Token não encontrado");
        setLoading(false);
        return;
      }

      console.log("📤 Enviando requisição para /events com token");

      const response = await axios.get("http://localhost:3000/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Eventos recebidos:", response.data);

      // Converte as strings de data em objetos Date
      const formattedEvents = response.data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setEvents(formattedEvents);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      console.error("❌ Detalhes do erro:", error.response?.data);
      setLoading(false);
    }
  };

  const eventColorStyle = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  // ✅ Atualizar evento no banco ao arrastar/redimensionar
  const resizeEvents = async (data) => {
    const { start, end } = data;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/events/${data.event.id}`,
        {
          start: start.toISOString(),
          end: end.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza o estado local
      const updatedEvents = events.map((event) => {
        if (event.id === data.event.id) {
          return {
            ...event,
            start: new Date(start),
            end: new Date(end),
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento");
    }
  };

  const handleOpenEvent = (event) => setSelectedEvent(event);
  const handleCloseEvent = () => setSelectedEvent(null);
  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // ✅ Adicionar novo evento no banco
  const handleAddEvent = async (newEvent) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/events",
        {
          title: newEvent.title,
          start: newEvent.start.toISOString(),
          end: newEvent.end.toISOString(),
          desc: newEvent.desc,
          color: newEvent.color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Adiciona o evento ao estado local
      const eventWithDates = {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      };

      setEvents([...events, eventWithDates]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
      alert("Erro ao adicionar evento");
    }
  };

  // ✅ Deletar evento do banco
  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove do estado local
      setEvents(events.filter((event) => event.id !== eventId));
      handleCloseEvent();
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      alert("Erro ao deletar evento");
    }
  };

  const messages = {
    allDay: "Dia inteiro",
    previous: "Anterior",
    next: "Próximo",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Não há eventos neste período.",
    showMore: (total) => `+ ${total} eventos`,
  };

  if (loading) {
    return (
      <main className="view-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <SideMenu />
        <div className="content">
          <TopBar />
          <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>
            <h2 className="loading-text">Carregando eventos...</h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="view-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <SideMenu />
        <div className="content">
          <TopBar />

          <h2 className="gradient-text page-title">Calendário</h2>

          <div className="calendar-container">
            <button
              className="add-task-btn add-btn"
              onClick={handleOpenAddModal}
            >
              <HugeiconsIcon icon={Add01Icon} />
              Adicionar Evento
            </button>

            <DragAndDropCalendar
              date={date}
              view={view}
              onView={(newView) => setView(newView)}
              onNavigate={(newDate) => setDate(newDate)}
              defaultView={"month"}
              events={events}
              localizer={localizer}
              messages={messages}
              culture="pt-BR"
              resizable
              selectable
              onEventDrop={resizeEvents}
              onEventResize={resizeEvents}
              onSelectEvent={handleOpenEvent}
              eventPropGetter={eventColorStyle}
              length={30}
              components={{
                toolbar: CustomToolBar,
              }}
              className="calendar"
            />

            {selectedEvent && (
              <EventModal
                event={selectedEvent}
                onClose={handleCloseEvent}
                onDelete={handleDeleteEvent}
              />
            )}

            {showAddModal && (
              <AddEventForm
                onAdd={handleAddEvent}
                onClose={handleCloseAddModal}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

const CustomToolBar = ({ label, onView, onNavigate, view }) => {
  const [itemText, setItemText] = useState("month");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setItemText(value);
    setOpen(false);
    onView(value);
  };

  const getViewLabel = (viewName) => {
    const labels = {
      month: "Mês",
      week: "Semana",
      day: "Dia",
      agenda: "Agenda",
    };
    return labels[viewName] || viewName;
  };

  return (
    <div className="toolbar-container">
      <h1 className="mesAno">{label}</h1>

      <div className="drop-container">
        <button className="btn days-btn" onClick={() => onNavigate("TODAY")}>
          Hoje
        </button>
        <button
          className="btn days-btn prev-month"
          onClick={() => onNavigate("PREV")}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
        </button>

        <div className="custom-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-btn"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>{getViewLabel(itemText)}</span>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className={`drop-icon ${open ? "open" : ""}`}
            />
          </button>

          {open && (
            <ul className="dropdown-menu">
              <li onClick={() => handleSelect("month")}>Mês</li>
              <li onClick={() => handleSelect("week")}>Semana</li>
              <li onClick={() => handleSelect("day")}>Dia</li>
              <li onClick={() => handleSelect("agenda")}>Agenda</li>
            </ul>
          )}
        </div>

        <button
          className="btn days-btn next-month"
          onClick={() => onNavigate("NEXT")}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </button>

        <div className="toolbar-navigation"></div>
      </div>
    </div>
  );
};

export default MyCalendar;
