import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Carlos Garate",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  { id: 4, time: "3pm" },
  { id: 5, time: "4pm" },
  { id: 6, time: "5pm" }
];

ReactDOM.render(
  <Application appointments={appointments} />,
  document.getElementById("root")
);
