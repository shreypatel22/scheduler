import React from 'react';

export default function Header(props) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onAdd= {onAdd}
    />
  </main>
  )
}