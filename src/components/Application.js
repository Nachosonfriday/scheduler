import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  const setDay = day => setState({ ...state, day });

 

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data
       }));
    })
      .catch((err) => {
        console.log("error", err.message)
        })
    }, [])
  

  // appointment functions
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment )
      .then((response) =>  console.log(response))
      .then (() => setState({
        ...state,
        appointments
      })
    )
    // .catch(err, "its broken")
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => console.log(response))
      .then(() => setState({
        ...state,
        appointments
      })
    )
  }
  

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  const appointment = dailyAppointments.map((appointmentObject) => {
    const interview = getInterview(state, appointmentObject.interview);
    console.log("appointmentobj", interview)
    return (
      <Appointment 
        key={appointmentObject.id}
        appointmentId={appointmentObject.id}
        {...appointmentObject}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      )
    })

  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule" >
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
