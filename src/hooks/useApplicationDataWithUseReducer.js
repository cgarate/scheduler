import { useReducer, useEffect } from "react";
import axios from "axios";
import { SET_INTERVIEW, SET_DAY, SET_APPLICATION_DATA } from "../constants";
import reducer from "../reducers/application";

const useApplicationDataWithUseReducer = () => {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };
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

  const deleteInterview = id => {
    const deleteAppointment = Promise.resolve(
      axios.delete(`/api/appointments/${id}`),
    );
    dispatch({
      type: SET_INTERVIEW,
      id,
      interview: null,
    });
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
    dispatch({
      type: SET_INTERVIEW,
      id,
      interview,
    });

    return updateDB;
  };

  return { state, setDay, deleteInterview, bookInterview };
};

export default useApplicationDataWithUseReducer;
