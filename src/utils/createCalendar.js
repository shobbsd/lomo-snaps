import { Calendar } from 'expo';

const createCalendar = (username) => {
    return Calendar.getCalendarsAsync()
        .then((calendars) => {
            const { source } = calendars[0]
            return Calendar.createCalendarAsync({
                accessLevel: "write",
                allowedReminders: [
                    "default",
                    "alert",
                ],
                allowsModifications: true,
                color: "#C2C2C2",
                isPrimary: false,
                isSynced: true,
                isVisible: true,
                name: `Lomo-${username}`,
                ownerAccount: "Lomo_snaps@group.v.calendar.google.com",
                source: {
                    isLocalAccount: false,
                    name: "c.keogh.10.ck@gmail.com",
                    type: "com.google",
                },
                title: "Lomo",
            })
        })
}

export default createCalendar;