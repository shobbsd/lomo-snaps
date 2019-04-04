import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebaseConnect from '../firebaseConfig';
import '@firebase/firestore';

const db = firebaseConnect.firestore();

export default class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
            eventName: '',
            eventEndDate: '',
            eventDevelopDate: '',
        }
    }

    handleEventSubmit = () => {
        console.log(this.state) // logs to expo start console
        this.addEvent()
    }

    addEvent = () => {
        // https://firebase.google.com/docs/firestore/quickstart
        // NB generated ID
        // TODO app generates ID ?
        db.collection('events').add(this.state)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <>
                <Text>
                    Event Name:
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 40, }}
                    placeholder="Enter your event name.."
                    onChangeText={(eventName) => this.setState({ eventName })}
                    value={this.state.eventName}
                />
                <Text>
                    Event End Date:
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 40, }}
                    placeholder="DD/MM/YYYY"
                    onChangeText={(eventEndDate) => this.setState({ eventEndDate })}
                    value={this.state.eventEndDate}
                />
                <Text>
                    Develop Photos Date:
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 40, }}
                    placeholder="DD/MM/YYYY"
                    onChangeText={(eventDevelopDate) => this.setState({ eventDevelopDate })}
                    value={this.state.eventDevelopDate}
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
