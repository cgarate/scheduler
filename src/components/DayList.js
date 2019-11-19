import React from "react";

import DayListItem from "components/DayListItem";

const DayList = ({ days, day, setDay }) => {
  console.log("days", days);
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

export default DayList;
