import axios from "axios";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoAddCircle } from "react-icons/io5";
import classes from "./calendarFunc.module.css";

// הגדרות לוקליזציה של לוח השנה
const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function CalendarFunc({ functionId }) {
  // state לניהול האירועים, מצב הוספה ועריכה
  const [eventsData, setEventsData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    allDay: false,
  });

  // פונקציה לשליפת אירועים מהשרת
  function getEventsData() {
    axios
      .post("/events", { functionId })
      .then((res) => {
        const eventsIds = res.data.map((row) => row.eventId);
        if (eventsIds.length > 0) {
          axios
            .post("/events/data", { eventsIds })
            .then((result) => {
              const formattedEvents = result.data.map((ev) => ({
                id: ev.eventId, // מזהה לאירוע כדי לאפשר עדכון/מחיקה
                title: ev.eventTitle,
                start: new Date(ev.startTime),
                end: new Date(ev.endTime),
                allDay: ev.allDay === 1,
              }));
              setEventsData(formattedEvents);
            })
            .catch((err) => console.error("Error in /events/data:", err));
        } else setEventsData([]);
      })
      .catch((err) => console.error("Error in /events:", err));
  }

  // useEffect טוען את האירועים בכל פעם ש־functionId משתנה
  useEffect(() => {
    getEventsData();
  }, [functionId]);

  // הוספת אירוע חדש
  const handleAddEvent = (e) => {
    e.preventDefault();
    axios
      .post("/events/add", {
        functionId,
        title: newEvent.title,
        startTime: newEvent.start,
        endTime: newEvent.end,
        allDay: newEvent.allDay ? 1 : 0,
      })
      .then(() => {
        setIsAdding(false);
        setNewEvent({ title: "", start: "", end: "", allDay: false });
        getEventsData();
      })
      .catch((err) => console.error("Error adding event:", err));
  };

  // עדכון אירוע קיים
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    axios
      .post("/events/update", {
        eventId: editingEvent.id,
        title: editingEvent.title,
        startTime: editingEvent.start,
        endTime: editingEvent.end,
        allDay: editingEvent.allDay ? 1 : 0,
      })
      .then(() => {
        setEditingEvent(null);
        getEventsData();
      })
      .catch((err) => console.error("Error updating event:", err));
  };

  // מחיקת אירוע
  const handleDeleteEvent = (e) => {
    console.log(e);
    axios
      .delete(`/events/delete/${e.id}`)
      .then((result) => {
        console.log(result.data);
        getEventsData(); // ריענון הנתונים אחרי מחיקה
        setEditingEvent(false);
      })
      .catch((error) => {
        console.error("Error in /posts/delete:", error);
      });
  };

  return (
    <div className={classes.calendar_container}>
      {/* כותרת הלוח + כפתור הוספה */}
      <div className={classes.calendar_header}>
        <div>Calendar</div>
        <IoAddCircle
          className={classes.add_icon}
          onClick={() => setIsAdding(true)}
        />
      </div>

      {/* הצגת לוח השנה עצמו */}
      <div className={classes.calendar_body}>
        <Calendar
          localizer={localizer}
          events={eventsData}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 620, width: 850 }}
          onSelectEvent={(event) => setEditingEvent(event)} // לחיצה על אירוע פותחת עריכה
        />
      </div>

      {/* פופאפ להוספת אירוע */}
      {isAdding && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <h2>Add Event</h2>
            <form onSubmit={handleAddEvent}>
              <label>Title:</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
              />
              <label>Start:</label>
              <input
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
                required
              />
              <label>End:</label>
              <input
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={newEvent.allDay}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, allDay: e.target.checked })
                  }
                />
                All Day
              </label>
              <div className={classes.popup_buttons}>
                <button type="submit">Add</button>
                <button type="button" onClick={() => setIsAdding(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* פופאפ לעריכת אירוע */}
      {editingEvent && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <h2>Edit Event</h2>
            <form onSubmit={handleUpdateEvent}>
              <label>Title:</label>
              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                required
              />
              <label>Start:</label>
              <input
                type="datetime-local"
                value={editingEvent.start.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    start: new Date(e.target.value),
                  })
                }
                required
              />
              <label>End:</label>
              <input
                type="datetime-local"
                value={editingEvent.end.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    end: new Date(e.target.value),
                  })
                }
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={editingEvent.allDay}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      allDay: e.target.checked,
                    })
                  }
                />
                All Day
              </label>
              <div className={classes.popup_buttons}>
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(editingEvent)}
                >
                  Delete
                </button>
                <button type="button" onClick={() => setEditingEvent(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
