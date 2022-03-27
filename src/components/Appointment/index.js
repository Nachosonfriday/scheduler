import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  console.log("test", props)

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    console.log("mode", mode)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
        //optional chaining null or undefined check
        // interviewer={(props.interview?.interviewer)}
        interviewer={(props.interview ? props.interview.interviewer : null)} 
        interviewers = {[]}
        onCancel = {back}
        
      />
      )}
    </article>
  );
}


