

export function getAppointmentsForDay(state, day) {
  
  let appointmentArray = state.days.find(dayObject => dayObject.name === day);
  if (state.days.length === 0 || appointmentArray === undefined) {
    return []
  }
  
  return appointmentArray.appointments.map(key => state.appointments[key])
}