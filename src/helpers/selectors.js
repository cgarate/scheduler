export const getAppointmentsForDay = (state, day) => {
  const appointmentsForDay = state.days.find(
    currentDay => currentDay.name === day
  );
  if (state.days.length === 0 || !appointmentsForDay) {
    return [];
  }
  return appointmentsForDay.appointments.map(
    currentAppointment => state.appointments[currentAppointment]
  );
};
