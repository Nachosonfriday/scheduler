import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

const formatSpots = (spots) => {
  if (!spots) {
    return `no spots remaining`;
  }
  if (spots === 1) {
    return `1 spot remaining`;
  }
  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const availability = formatSpots(props.spots);

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{availability}</h3>
    </li>
  );
}
