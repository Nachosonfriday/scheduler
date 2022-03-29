import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  console.log("props",props)

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    
  }

  function remove() { 
      transition(DELETING)
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
  }

  function edit() {
    transition(EDIT)
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : null}
          interviewer={props.interview.interviewer}
          appointmentId={props.appointmentId}
          onDelete={()=> transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewer={(props.interview ? props.interview.interviewer : null)} 
        interviewers = {props.interviewers}
        onCancel={back}
        onSave={save}
      />
      )}
      {mode === CONFIRM && 
        <Confirm 
      onConfirm={remove}
      onCancel={back}
      message="Would you like to delete the appointment?"
      />}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === EDIT && 
        <Form 
        interviewers = {props.interviewers}
        interviewer={(props.interview && props.interview.interviewer ? props.interview.interviewer.id : null)}
        student={props.interview.student}
        onCancel={back}
        onSave={save}
        />
      }
    </article>
  );
}


