import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

export default function CalendarFunc() {
  const events = [
    {
      title: "האירוע שלי",
      start: new Date(2025, 7, 2, 10, 0), // (שנה, חודש (0-11), יום, שעה, דקה)
      end: new Date(2025, 7, 2, 12, 0),
    },
  ];

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
