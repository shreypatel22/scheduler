import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day }); 
 
    

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));  
    })
  }, []);

  const updateSpots = state => {
    const currentDayIndex = state.days.findIndex(day => day.name === state.day);
    const currentDayObject = state.days[currentDayIndex];

    const spots = currentDayObject.appointments.filter(id => 
      !state.appointments[id].interview
    ).length

    const updatedDayObj = { ...currentDayObject, spots };
    
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;
  
    const updatedState = { ...state, days: updatedDaysArr };
      
    console.log(updatedState)
    return updatedState;
    
  }


  function bookInterview(id, interview) {
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        const updatedState = updateSpots(state);
        setState({
          ...state,          
          appointments,
          updatedState
        });
      });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {appointment})
      .then(() => {
        const updatedState = updateSpots(state);        
        setState({
          ...state,
          updatedState,
          appointments
        });
      });
  }

  console.log(state);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}