import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props) {
  const days = props.days.map((dayObject) => {
    return (
      <DayListItem
      key={dayObject.id}
      name={dayObject.name}
      spots={dayObject.spots} 
      selected={dayObject.name === props.day}
      setDay={props.setDay}  
      />
    )
  })

  return (
    <ul>{days}</ul>
  )
}