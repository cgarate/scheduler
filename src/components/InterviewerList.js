import React from "react";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = ({ value, interviewers, onChange }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((currentInterviewer) => {
          return (
            <InterviewerListItem
              key={currentInterviewer.id}
              id={currentInterviewer.id}
              name={currentInterviewer.name}
              avatar={currentInterviewer.avatar}
              selected={currentInterviewer.id === value}
              onChange={(event) => onChange(currentInterviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default InterviewerList;
