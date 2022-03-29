

export function getAppointmentsForDay(state, day) {
  
  let appointmentArray = state.days.find(dayObject => dayObject.name === day);
  if (state.days.length === 0 || appointmentArray === undefined) {
    return []
  };
  
  return appointmentArray.appointments.map(key => state.appointments[key]);
}

export function getInterview(state, interview) {
  
  if(!interview) {
    return null
  };

  const interviewerObject = state.interviewers[interview.interviewer]
  const studentInfo = interview.student
  return {
    interviewer:interviewerObject,
    student: studentInfo
  };
}

export function getInterviewersForDay(state, day) {
  
  let appointmentArray = state.days.find(dayObject => dayObject.name === day);
  if (state.days.length === 0 || appointmentArray === undefined) {
    return []
  };
  
  return appointmentArray.interviewers.map(key => state.interviewers[key]);
}