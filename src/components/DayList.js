import React from "react";
import PropTypes from "prop-types";

import DayListItem from "components/DayListItem";

const DayList = ({ days, day, setDay }) => {
  return (
    <ul>
      {days.map((currentDay, index) => {
        return (
          <DayListItem
            key={`${currentDay.name}-${index}`}
            name={currentDay.name}
            spots={currentDay.spots}
            selected={currentDay.name === day}
            setDay={setDay}
          />
        );
      })}
    </ul>
  );
};

DayList.propTypes = {
  days: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    appointments: PropTypes.arrayOf(PropTypes.number),
    interviewers: PropTypes.arrayOf(PropTypes.number)
  })),
  day: PropTypes.string,
  setDay: PropTypes.func.isRequired
}

export default DayList;
