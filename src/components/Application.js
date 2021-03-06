import React from "react";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./selectors";
import "components/Application.scss";
import useApplicationDataWithUseReducer from "../hooks/useApplicationDataWithUseReducer";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationDataWithUseReducer();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar" data-testid="daylist-section">
        <nav>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
      </section>
      <section className="schedule" data-testid="schedule-section">
        {schedule}
      </section>
    </main>
  );
}
