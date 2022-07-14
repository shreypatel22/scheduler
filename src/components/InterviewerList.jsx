import React from 'react';
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList(props) {
  
  const {interviewers, setInterviewer} = props;
  

  const interviewersComponents = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key = {interviewer.id}
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        setInterviewer = {() => setInterviewer(interviewer.id)}
        selected = {props.interviewer === interviewer.id}
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