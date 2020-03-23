import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import { EMPTY, SHOW, CREATE, SAVING } from "../../constants";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const Appointment = ({ time, interview, interviewers, bookInterview, id }) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const switchToCreate = () => transition(CREATE);
  const switchToShow = () => transition(SHOW);
  const switchToSaving = () => transition(SAVING);

  const saveAppointment = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    switchToSaving();
    bookInterview(id, interview)
      .then(response => switchToShow())
      .catch(error => console.log(error));
  };

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={switchToCreate} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={saveAppointment}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving Appointment" />}
    </article>
  );
};

export default Appointment;
