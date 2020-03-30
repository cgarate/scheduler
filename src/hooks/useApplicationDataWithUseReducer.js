import { useReducer, useEffect } from "react";
import axios from "axios";
import {
  SET_INTERVIEW,
  SET_DAY,
  SET_APPLICATION_DATA,
} from "../constants";

const reducer = (state, action) => {
  let result;
  const getDayIndex = state.days.findIndex(day => day.name === state.day);

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
      result = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: { ...action.interview },
          },
        },
        days: [...state.days],
      };
      result.days[getDayIndex] = {
        ...result.days[getDayIndex],
        spots: action.interview
          ? result.days[getDayIndex].spots - 1
          : result.days[getDayIndex].spots + 1,
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
  // Websocket
  const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  // Database
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

  useEffect(() => {
    ws.onopen = event => {
      ws.send("ping");
    };
    ws.onclose = () => {
      ws.close();
    };
    return () => ws.close();
  });

  useEffect(() => {
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === SET_INTERVIEW) {
        dispatch(message);
      }
    };
  });

  const deleteInterview = id => {
    const deleteAppointment = Promise.resolve(
      axios.delete(`/api/appointments/${id}`),
    );

    return deleteAppointment;
  };

  const bookInterview = (id, interview) => {
    const updateDB = Promise.resolve(
      axios.put(`/api/appointments/${id}`, {
        interview: {
          student: interview.student,
          interviewer: interview.interviewer,
        },
      }),
    );

    return updateDB;
  };

  return { state, setDay, deleteInterview, bookInterview };
};

export default useApplicationDataWithUseReducer;
