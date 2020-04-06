import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

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
    <li className={liClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};

DayListItem.propTypes = {
  name: PropTypes.string,
  spots: PropTypes.number,
  selected: PropTypes.bool,
  setDay: PropTypes.func.isRequired,
};

export default DayListItem;
