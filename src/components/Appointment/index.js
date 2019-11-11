import React from "react";

import "components/Appointment/styles.scss";

const Appointment = ({time}) => {
  return <article className="appointment">{time}</article>;
};

export default Appointment;
