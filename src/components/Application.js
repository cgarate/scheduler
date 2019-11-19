import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "./Appointment";

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get("/api/days")
      .then(response => setDays(response.data))
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

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
