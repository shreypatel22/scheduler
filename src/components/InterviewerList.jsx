import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types'; 

function InterviewerList(props) {
  
  const {interviewers, value, onChange} = props;  

  const interviewersComponents = interviewers.map((interviewer) => {    
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersComponents}</ul>
    </section>
  )
}

// propTypes to check if interviewers is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;