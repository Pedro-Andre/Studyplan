import "./MyCalendar.css";
import SideMenu from "../../components/Sidemenu/Sidemenu";
import TopBar from "../../components/TopBar/TopBar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useState, useRef, useEffect } from "react";
import DefaultEvents from "../../components/DefaultEvents/DefaultEvents.js";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import EventModal from "../../components/EventModal/EventModal.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const DragAndDropCalendar = withDragAndDrop(Calendar);

// Define o idioma utilizando o 'date-fns'
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
  const [events, setEvents] = useState(DefaultEvents);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventColorStyle = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  // Função para arrastar os eventos no calendário
  const resizeEvents = (data) => {
    const { start, end } = data;
    const updateEvents = events.map((event) => {
      if (event.id === data.event.id) {
        return {
          ...event,
          start: new Date(start),
          end: new Date(end),
        };
      }
      return event;
    });
    setEvents(updateEvents);
  };

  // abre o evento no calendário
  const handleOpenEvent = (event) => {
    setSelectedEvent(event);
  };

  // fecha o evento no calendário
  const handleCloseEvent = (event) => {
    setSelectedEvent(null);
  };

  // Nomes em português para os botões do calendário
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
    showMore: (total) => `+ ${total} eventos`,
  };

  return (
    <>
      <main className="view-container">
        <SideMenu />
        <div className="content">
          <TopBar />
          <h2 className="gradient-text calendar-title">Calendário</h2>
          <div className="container">
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
              components={{
                toolbar: CustomToolBar,
              }}
              className="calendar"
            />
            {selectedEvent && (
              <EventModal event={selectedEvent} onClose={handleCloseEvent} />
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

  // Função para traduzir o nome da visualização
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
