import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { eventName: '', eventEndDate: '', eventDevelopDate: '' };
    }

    handleEventSubmit = (event) => {
        console.log(this.state) // logs to expo start console
    }

    render() {
        return (
            <>
                <Text>
                    Enter your event name :
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 40, }}
                    onChangeText={(eventName) => this.setState({ eventName })}
                    value={this.state.eventName}
                />
                <Text>
                    Event Date as DD/MM/YYYY :
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 40, }}
                    onChangeText={(eventEndDate) => this.setState({ eventEndDate })}
                    value={this.state.eventEndDate}
                />
                <Text>
                    Develop Photos Date as DD/MM/YYYY :
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 40, }}
                    onChangeText={(eventDevelopDate) => this.setState({ eventDevelopDate })}
                    value={this.state.eventDevelopDate}
                />
                <Button title="Submit your event" onPress={this.handleEventSubmit} />
            </>
        );
    }
}
