import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  const updateSpots = function (appointments) {
    //find the day
    const dayObj = state.days.find((d) => d.name === state.day);

    //calculate spots
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };

    //update days Array
    const days = state.days.map((d) => (d.name === state.day ? day : d));

    //return an updated days array
    return days;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  // appointment functions
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        const days = updateSpots(appointments);
        setState({ ...state, days, appointments });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const days = updateSpots(appointments);
      setState({ ...state, days, appointments });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
