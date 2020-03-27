import { useReducer, useEffect } from "react";
import axios from "axios";
import {
  SET_INTERVIEW,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_SPOTS_COUNT,
} from "../constants";

const reducer = (state, action) => {
  let result;
  switch (action.type) {
    case SET_DAY:
      result = { ...state, day: action.value };
      break;
    case SET_APPLICATION_DATA:
      result = {
        ...state,
        days: action.value[0].data,
        appointments: action.value[1].data,
        interviewers: action.value[2].data,
      };
      break;
    case SET_INTERVIEW:
      result = { ...state, appointments: action.value };
      break;
    case SET_SPOTS_COUNT:
      const getDayIndex = state.days.findIndex(day => day.name === state.day);
      result = { ...state };
      result.days = [...result.days];
      result.days[getDayIndex] = {
        ...result.days[getDayIndex],
        spots: action.value,
      };
      break;
    default:
      result = state;
      break;
  }
  return result;
};

const useApplicationDataWithUseReducer = () => {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  const appointmentsForDay = (dayName, state) =>
    state.days.find(day => day.name === dayName).appointments;

  const getNewSpotsCount = (day, state) => {
    let spotsOpen = 0;
    appointmentsForDay(day, state).forEach(id => {
      if (!state.appointments[id].interview) {
        spotsOpen = spotsOpen + 1;
      }
    });
    return spotsOpen;
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("api/days")),
      Promise.resolve(axios.get("api/appointments")),
      Promise.resolve(axios.get("api/interviewers")),
    ])
      .then(allResolved => {
        dispatch({ type: SET_APPLICATION_DATA, value: allResolved });
      })
      .catch(error => console.log(error));
  }, []);

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
        dispatch({ type: SET_INTERVIEW, value: appointments });
        dispatch({
          type: SET_SPOTS_COUNT,
          value: getNewSpotsCount(state.day, state),
        });
      })
      .catch(error => console.log("delete", error));

    return deleteAppointment;
  };

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
        dispatch({
          type: SET_INTERVIEW,
          value: appointments,
        });
        dispatch({
          type: SET_SPOTS_COUNT,
          value: getNewSpotsCount(state.day, state),
        });
      })
      .catch(error => console.log("update", error));
    return updateDB;
  };

  return { state, setDay, deleteInterview, bookInterview };
};

export default useApplicationDataWithUseReducer;
