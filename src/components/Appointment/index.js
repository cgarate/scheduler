import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import { EMPTY, SHOW, CREATE } from "../../constants";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

const Appointment = ({ time, interview, interviewers }) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  const addAppointment = () => transition(CREATE);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={addAppointment} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          // onSave={}
          onCancel={() => back()}
        />
      )}
    </article>
  );
};

export default Appointment;
