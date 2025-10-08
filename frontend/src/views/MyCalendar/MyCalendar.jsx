import "./MyCalendar.css";
import SideMenu from "../../components/Sidemenu/Sidemenu";
import TopBar from "../../components/TopBar/TopBar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useState } from "react";
import DefaultEvents from "../../components/DefaultEvents/DefaultEvents.js";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import EventModal from "../../components/EventModal/EventModal.jsx";

const DragAndDropCalendar = withDragAndDrop(Calendar);

// Sets the language for the calendar with date-fns
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

  // Function that allows drop the events on calendar
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

  // open the event on calendar
  const handleOpenEvent = (event) => {
    setSelectedEvent(event);
  };

  // close the event on calendar
  const handleCloseEvent = (event) => {
    setSelectedEvent(null);
  };

  // labels for the buttons of the calendar
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
              className="calendar"
              onEventDrop={resizeEvents}
              onEventResize={resizeEvents}
              onSelectEvent={handleOpenEvent}
              eventPropGetter={eventColorStyle}
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

export default MyCalendar;
