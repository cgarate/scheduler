import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = ({ value, interviewers, onChange }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list" data-testid="interviewers-list">
        {interviewers.map((currentInterviewer) => {
          return (
            <InterviewerListItem
              key={currentInterviewer.id}
              id={currentInterviewer.id}
              name={currentInterviewer.name}
              avatar={currentInterviewer.avatar}
              selected={currentInterviewer.id === value}
              onChange={() => onChange(currentInterviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  // interviewers: PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  //   avatar: PropTypes.string,
  // }),
};

export default InterviewerList;

// PropTypes.shape({
//     id: PropTypes.objectOf(
//       PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//         avatar: PropTypes.string,
//       }),
//     ),
//   }),
