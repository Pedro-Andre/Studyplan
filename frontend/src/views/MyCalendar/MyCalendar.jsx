import "./MyCalendar.css";
import SideMenu from "../../components/Sidemenu/Sidemenu";
import TopBar from "../../components/TopBar/TopBar";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useState } from "react";
import DefaultEvents from "../../components/DefaultEvents/DefaultEvents.js";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState(DefaultEvents);
  const [date, setDate] = useState(moment().toDate());

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
              onNavigate={(newDate) => setDate(newDate)}
              defaultView="month"
              events={events}
              localizer={localizer}
              resizable
              className="calendar"
              selectable
              onSelectSlot={(slotInfo) => {
                console.log("Clique no dia:", slotInfo.start);
              }}
              onSelectEvent={(event) => {
                console.log("Clique no evento:", event);
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default MyCalendar;
