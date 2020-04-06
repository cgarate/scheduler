import { SET_INTERVIEW, SET_DAY, SET_APPLICATION_DATA } from "../constants";

const reducer = (state, action) => {
  let result;
  const getDayIndex =
    Array.isArray(state.days) &&
    state.days.findIndex(day => day.name === state.day);

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value[0].data,
        appointments: action.value[1].data,
        interviewers: action.value[2].data,
      };
    case SET_INTERVIEW:
      // if the current interview id is not null and action.interview is not null
      // then user is editing an existing record and we don't need to update the spot count
      const isEdit =
        state.appointments[action.id].interview && action.interview
          ? true
          : false;
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
      if (!isEdit) {
        result.days[getDayIndex] = {
          ...result.days[getDayIndex],
          spots: action.interview
            ? result.days[getDayIndex].spots - 1
            : result.days[getDayIndex].spots + 1,
        };
      }

      return result;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`,
      );
  }
};

export default reducer;
