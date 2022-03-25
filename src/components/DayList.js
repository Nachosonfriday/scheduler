import React from "react";
import DayListItem from "components/DayListItem"

// The DayList Component Props: 
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

export default function DayList(props) {
  const days = props.days.map((dayObject) => {
    return (
      <DayListItem
      key={dayObject.id}
      name={dayObject.name}
      spots={dayObject.spots} 
      selected={dayObject.name === props.value}
      setDay={props.onChange}  
      />
    )
  })

  return (
    <ul>{days}</ul>
  )
}