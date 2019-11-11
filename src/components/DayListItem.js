import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = spots => {
  const spotsString = spots === 1 ? "spot" : "spots";
  return spots === 0
    ? `no ${spotsString} remaining`
    : `${spots} ${spotsString} remaining`;
};

const DayListItem = ({ name, spots, selected, setDay }) => {
  const liClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  return (
    <li className={liClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};

export default DayListItem;
