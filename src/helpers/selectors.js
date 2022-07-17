export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
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