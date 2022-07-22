 // Returns an array of appointments for that day
 export function getAppointmentsForDay(state, day) {
  const days = state.days;
  const appointments = state.appointments; 
  const selectedDay = days.filter(eachDay => eachDay.name === day);
  const bookedAppointments = [];
  
  if (selectedDay[0]) {
    const bookedAppointmentsIds = selectedDay[0].appointments    
    for (const id of bookedAppointmentsIds) {
      bookedAppointments.push(appointments[id]);
    }      
  }
 
  return bookedAppointments;
}

// Return interview object
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  
  const interviewerID = interview.interviewer
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interviewerID]
  }  
  return interviewObj;
}

// Returns interviewrs array for that day
export function getInterviewersForDay(state, day) {  
  const days = state.days;
  const interviewers = state.interviewers; 
  const selectedDay = days.filter(eachDay => eachDay.name === day);
  const interviewersArray = [];
  
  if (selectedDay[0]) {
    const interviewersIds = selectedDay[0].interviewers    
    for (const id of interviewersIds) {
      interviewersArray.push(interviewers[id]);
    }      
  }
 
  return interviewersArray;
}