import React, { useState } from 'react';

export default function DayListItem(props) {
  const [day, setDay] = useState(props.name);
  
  return (
    <li onClick={() => props.setDay(day)}>
      <h2 className="text--regular">{day}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}