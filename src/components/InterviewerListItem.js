import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

const InterviewerListItem = ({
  name,
  avatar,
  selected,
  onChange,
}) => {
  const itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
    <li className={itemClass} onClick={onChange}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
