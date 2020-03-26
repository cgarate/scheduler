import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import {
  EMPTY,
  SHOW,
  CREATE,
  SAVING,
  CONFIRM,
  DELETING,
  EDIT,
  ERROR_DELETE,
  ERROR_SAVE,
} from "../../constants";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = ({
  time,
  interview,
  interviewers,
  bookInterview,
  id,
  deleteInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const switchToShow = () => transition(SHOW);
  const switchToEmpty = () => transition(EMPTY);
  const switchToCreate = () => transition(CREATE);
  const switchToEdit = () => transition(EDIT);
  const switchToConfirm = () => transition(CONFIRM);
  const switchToSaving = () => transition(SAVING);
  const switchToErrorSave = () => transition(ERROR_SAVE, true);
  const switchToDeleting = () => transition(DELETING, true);
  const switchToErrorDelete = () => transition(ERROR_DELETE, true);

  const saveAppointment = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    switchToSaving();
    bookInterview(id, interview)
      .then(() => switchToShow())
      .catch(error => switchToErrorSave());
  };

  const confirmDeleteAppointment = () => {
    switchToConfirm();
  };
  const editInterview = () => {
    switchToEdit();
  };
  const cancelDeleteAppointment = () => {
    switchToShow();
  };

  const cancelAppointment = () => {
    switchToDeleting();
    deleteInterview(id)
      .then(() => switchToEmpty())
      .catch(error => switchToErrorDelete());
  };

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={switchToCreate} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={confirmDeleteAppointment}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={saveAppointment}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={saveAppointment}
          onCancel={() => back()}
          name={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && (
        <Error
          message="Oopsie Daysies! I could not save that appointment!"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && <Error
          message="Oopsie Daysies! I could not delete the appointment!"
          onClose={() => back()}
        />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel the appointment?"
          onCancel={cancelDeleteAppointment}
          onConfirm={cancelAppointment}
        />
      )}
    </article>
  );
};

export default Appointment;
