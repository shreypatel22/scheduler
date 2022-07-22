import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {
  
  // State object to store all states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day }); 
  
  // Load data from api
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {           
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));  
    })
  }, []);

  // Update spots function when booking or canceling an interview
  const updateSpots = (state, increment)  => {
    const currentDayIndex = state.days.findIndex(day => day.name === state.day);
    const currentDayObject = {...state.days[currentDayIndex]}

    const spot = increment ? -1 : 1;

    const updatedDayObj = { ...currentDayObject, spots: currentDayObject.spots += spot };    
    
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;      

    return updatedDaysArr;    
  }

  // Book new interview
  function bookInterview(id, interview, create) {    

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const days = create ? updateSpots(state, true) : state.days;
        setState({
          ...state,          
          appointments,
          days
        });
      });
  };

  // Cancel existing interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {appointment})
      .then(() => {
        const days = updateSpots(state, false);        
        setState({
          ...state,
          days,
          appointments
        });
      });
  }
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}