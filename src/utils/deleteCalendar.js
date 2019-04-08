import { Calendar } from 'expo';

const deleteLomoCalendar = () => {
    return Calendar.getCalendarsAsync()
        .then((calendars) => {
            return calendars.filter(calendar => {
                return calendar.title === 'Lomo'
            })
        })
        .then(LomoCal => {
            if (LomoCal.length > 0) {
                const LomoId = LomoCal[0].id;
                Calendar.deleteCalendarAsync(LomoId)
            }
        })
}

export default deleteLomoCalendar;