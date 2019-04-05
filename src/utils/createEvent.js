import { Calendar } from 'expo';

const createEvent = (calendarId, eventName, eventEndDate, developDate) => {
    // return Calendar.getCalendarsAsync()
    //     .then(calendars => {
    //         return calendars.filter(calendar => calendar.id === calendarId)
    //     })
    const details = {
        title: eventName,
        startDate: developDate,
        endDate: developDate,
        allDay: true,
        timeZone: null

    }
    Calendar.createEventAsync(calendarId, details)

}

export default createEvent;