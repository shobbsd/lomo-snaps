import { Calendar } from 'expo';


// creates new calendar with title Lomo and returns array with timeZone and id number
const createCalendar = (username) => {
    return Calendar.getCalendarsAsync()
        .then((calendars) => {

            const { source, timeZone, ownerAccount } = calendars[0]

            const calendarId = Calendar.createCalendarAsync({
                accessLevel: "owner",
                allowedReminders: [
                    "default",
                    "alert",
                ],
                allowsModifications: true,
                color: "#1E7BA8",
                isPrimary: false,
                isSynced: true,
                isVisible: true,
                name: `Lomo-${username}`,
                ownerAccount,
                source: {
                    isLocalAccount: true,
                    name: "Lomo",
                },
                title: "Lomo",
                timeZone,
            })
            return Promise.all([timeZone, calendarId])
        })
}

export default createCalendar;