import React, { Component } from 'react'
import { Platform, Text, TextInput, Button, DatePickerIOS } from 'react-native'
import firebaseConnect from '../firebaseConfig'
import '@firebase/firestore'

const db = firebaseConnect.firestore();
const plat = Platform.OS
console.log(plat, "platform")

export default class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
            eventName: '',
            eventEndDate: new Date(),
            eventDevelopDate: new Date(),
            isEventNameError: false, // local state only.
        }
    }

    handleEventSubmit = () => {
        const { eventName } = this.state
        console.log(this.state) // logs to expo start console
        if (eventName.length >= 5) {
            this.addEvent()
        } else {
            this.setState({ isEventNameError: true })
        }
    }

    addEvent = () => {
        // https://firebase.google.com/docs/firestore/quickstart
        // NB firestore generates unique ID eg. 8pWgaC79rQ8KbhtjTrnN
        const { eventName, eventEndDate, eventDevelopDate, } = this.state
        db.collection('events').add({ eventName, eventEndDate, eventDevelopDate })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { isEventNameError } = this.state
        return (
            <>
                <Text style={{ textAlign: 'center', padding: 10 }}>
                    Event Name:
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 20, marginTop: 0 }}
                    placeholder="Enter your event name, at least 5 characters..."
                    onChangeText={(eventName) => this.setState({ eventName: eventName, isEventNameError: false })}
                    value={this.state.eventName}
                />
                {isEventNameError && <Text style={{ textAlign: 'center', padding: 10, color: 'red' }}>
                    Event Name must be at least 5 characters
                </Text>}

                <Text style={{ textAlign: 'center' }}>
                    Event End Date:
                </Text>

                <DatePickerIOS
                    minimumDate={new Date()}
                    date={this.state.eventEndDate}
                    onDateChange={eventEndDate => this.setState({ eventEndDate })}
                />

                <Text style={{ textAlign: 'center' }}>
                    Develop Photos Date:
                </Text>

                <DatePickerIOS
                    minimumDate={this.state.eventEndDate}
                    date={this.state.eventDevelopDate}
                    onChangeText={(eventDevelopDate) => this.setState({ eventDevelopDate })}
                />

                <Button
                    style={{ color: 'red', padding: 20, borderWidth: 1, marginBottom: 40, }}
                    title="Submit your event"
                    onPress={this.handleEventSubmit}
                />
            </>
        );
    }
}
