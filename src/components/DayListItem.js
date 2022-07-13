import React, { useState } from 'react';
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const [day, setDay] = useState(props.name);
  const dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": !props.spots});

  const formatSpots = () => {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }

    if (props.spots === 1) {
      return `1 spot remaining`;
    }
    
    if (props.spots === 0) {
      return `no spots remaining`;
    }
  }
  
  return (
    <li onClick={() => props.setDay(day)} className={dayClass}>
      <h2 className="text--regular">{day}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}