import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

/*Takes in Three props
  interviewers: array of objs containing info of each interviewer
  interviewer: id
  setInterviewer:function; accepts id of interviewer
  */ 

  export default function InterviewerList (props) {
    console.log("props", props)
    const interviewers = props.interviewers.map((interviewerObject) => {
      return (
        <InterviewerListItem
          key={interviewerObject.id}
          name={interviewerObject.name}
          avatar={interviewerObject.avatar}
          setInterviewer={props.setInterviewer}
          selected={interviewerObject.id === props.interviewer}
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