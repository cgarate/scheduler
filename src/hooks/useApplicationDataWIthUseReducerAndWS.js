import { useReducer, useEffect } from "react";
import axios from "axios";
import { SET_INTERVIEW, SET_DAY, SET_APPLICATION_DATA } from "../constants";
import reducer from "../reducers/application";

const useApplicationDataWithUseReducerAndWS = () => {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };
  // Websocket
  const ws = new WebSocket(
    process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001",
  );
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

export default useApplicationDataWithUseReducerAndWS;
