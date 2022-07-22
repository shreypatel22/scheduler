import React, { useState } from 'react';
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function Form(props) {

  // States
  const {interviewers, onCancel, onSave} = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState();

  // Function to validate user input
  const validate = () => {
    if(!student) {
      setError("student name cannot be blank")    
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer)
  }

  // Reset function
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
  }

  // Cancel function
  const cancel = () => {
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">      
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          value={interviewer}
          onChange={setInterviewer}
          interviewers = {interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}