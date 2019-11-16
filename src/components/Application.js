import React, { useState } from "react";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        <nav>
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {props.appointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
