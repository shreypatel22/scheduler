import React, { useState } from 'react';
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const [day, setDay] = useState(props.name);
  const dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": !props.spots})
  
  return (
    <li onClick={() => props.setDay(day)} className={dayClass}>
      <h2 className="text--regular">{day}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}