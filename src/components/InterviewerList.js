import React, { useState } from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

/*Takes in Three props
  interviewers: array of objs containing info of each interviewer
  interviewer: id
  setInterviewer:function; accepts id of interviewer
  */ 

  export default function InterviewerList (props) {
    const[value, onChange] = useState()

    const interviewers = props.interviewers.map((interviewerObject) => {
      return (
        <InterviewerListItem
          key={interviewerObject.id}
          name={interviewerObject.name}
          avatar={interviewerObject.avatar}
          selected={interviewerObject.id === value}
          setInterviewer={() => onChange(interviewerObject.id)}
        />
      )
    })

    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewers}</ul>
      </section>
    )
  }