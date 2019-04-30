import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'expo';
import createCalendar from '../utils/createCalendar';
import createEvent from '../utils/createEvent';

export default class EventCalendar extends Component {

    state = {
        calendars: [],
        newCalendar: []
    }

    myCalendar() {
        let details = {
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
            name: "testCalendar",
            ownerAccount: "addressbook#contacts@group.v.calendar.google.com",
            source: {
                isLocalAccount: false,
                name: "c.keogh.10.ck@gmail.com",
                type: "com.google",
            },
            title: "Contacts",
        }

        Calendar.createCalendarAsync(details)
            .then(event => {
                this.setState({ newCalendar: event })
                console.log(this.state.newCalendar)
            })
    }

    render() {
        return <View>
            <Button
                title='make calendar'
                onPress={() => {
                    createCalendar('grumpy19')
                        .then(id => {
                            return createEvent(id)
                        })
                        .then(calendar => console.log(calendar));

                }}
            />
            <Button
                title='get calendars'
                onPress={() => {
                    getCalendars()
                        .then((calendars) => console.log(calendars.length))
                }}
            />
            <Text>{this.state.newCalendar.toString()}</Text>
        </View>

    }
}

async function getCalendars() {
    const calendars = await Calendar.getCalendarsAsync();
    return calendars;
}

const findPrimaryCalendar = (calendars) => {
    return calendars.filter((calendar => calendar.isPrimary))[0]
}