import { Calendar } from 'expo';


// creates event in calendar and returns new event id
const createCalendarEvent = (calendarId, eventName, developDate) => {
    const date = new Date();
    const alarm = {
        method: Calendar.AlarmMethod.ALERT,
        absoluteDate: developDate,
        relativeOffset: 720,
    }
    const details = {
        title: `LOMO: ${eventName} photos`,
        startDate: developDate,
        endDate: developDate,
        allDay: true,
        timeZone: date.getTimezoneOffset(),
        notes: `Your ${eventName} photos will be ready to view today!`,
        alarms: [alarm]
    }
    return Calendar.createEventAsync(calendarId, details)
}

export default createCalendarEvent;