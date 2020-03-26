import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = day => setState({ ...state, day });
  // retrieve the appointments ids for the day
  const appointmentsForDay = (dayName, state) =>
    state.days.find(day => day.name === dayName).appointments;
  const getDayIndex = state.days.findIndex(day => day.name === state.day);

  const getNewSpotsCount = (day, state) => {
    let spotsOpen = 0;
    appointmentsForDay(day, state).forEach(id => {
      if (!state.appointments[id].interview) {
        spotsOpen = spotsOpen + 1;
      }
    });
    return spotsOpen;
  };

  const updateSpotsCount = state => {
    const stateCopy = { ...state };
    stateCopy.days = [...stateCopy.days];
    stateCopy.days[getDayIndex] = {
      ...stateCopy.days[getDayIndex],
      spots: getNewSpotsCount(state.day, state),
    };
    return stateCopy;
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("api/days")),
      Promise.resolve(axios.get("api/appointments")),
      Promise.resolve(axios.get("api/interviewers")),
    ])
      .then(allResolved => {
        setState(prev => ({
          ...prev,
          days: allResolved[0].data,
          appointments: allResolved[1].data,
          interviewers: allResolved[2].data,
        }));
      })
      .catch(error => console.log(error));
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const updateDB = Promise.resolve(
      axios.put(`/api/appointments/${id}`, {
        interview: {
          student: interview.student,
          interviewer: interview.interviewer,
        },
      }),
    );
    updateDB
      .then(() => {
        setState({
          ...state,
          appointments,
        });
        setState(prev => ({
          ...updateSpotsCount(prev),
        }));
      })
      .catch(error => console.log("update", error));
    return updateDB;
  };

  const deleteInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const deleteAppointment = Promise.resolve(
      axios.delete(`/api/appointments/${id}`),
    );
    deleteAppointment
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
        setState(prev => ({ ...updateSpotsCount(prev) }));
      })
      .catch(error => console.log("delete", error));

    return deleteAppointment;
  };

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;
