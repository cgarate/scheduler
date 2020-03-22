export const getAppointmentsForDay = (state, day) => {
  const appointmentsForDay = state.days.find(
    currentDay => currentDay.name === day,
  );
  if (state.days.length === 0 || !appointmentsForDay) {
    return [];
  }
  return appointmentsForDay.appointments.map(
    currentAppointment => state.appointments[currentAppointment],
  );
};

export const getInterview = (state, interview) => {
  const interviewObject =
    interview && interview.interviewer
      ? state.interviewers[interview.interviewer]
      : undefined;
  return !interviewObject
    ? null
    : {
        student: interview.student,
        interviewer: {
          ...interviewObject,
        },
      };
};

export const getInterviewersForDay = (state, day) => {
  const appointmentsForDay = state.days.find(
    currentDay => currentDay.name === day,
  );
  if (state.days.length === 0 || !appointmentsForDay) {
    return [];
  }
  return appointmentsForDay.interviewers.map(
    currentInterviewer => state.interviewers[currentInterviewer],
  );
};

