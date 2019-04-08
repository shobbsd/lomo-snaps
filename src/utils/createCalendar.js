import { Calendar } from 'expo';

// checks if Lomo calendar exists and if not creates new calendar and returns timeZone and calendar id
const createCalendar = (username) => {

    return Calendar.getCalendarsAsync()
        .then((calendars) => {
            const lomoCal = calendars.filter(calendar => {
                return calendar.title === 'Lomo'
            })

            let calendarId = null;
            const { timeZone, ownerAccount } = calendars[0]

            if (lomoCal.length != 0) {
                calendarId = lomoCal.id
            } else {
                calendarId = Calendar.createCalendarAsync({
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
                    entityType: Calendar.EntityTypes.REMINDER
                })
            }
            return Promise.all([timeZone, calendarId])
        })
}

export default createCalendar;