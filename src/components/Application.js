import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios
      .get("/api/days")
      .then(response => setDays(response.data))
      .catch(error => {
        console.log("ERROR: ", error);
      });
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <nav>
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
