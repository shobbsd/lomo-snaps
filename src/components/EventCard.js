import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Photos from '../views/Photos';

export default class EventCard extends Component {

    // style = {{ textAlign: 'center', color: 'white' }}

    render() {

        const { eventName, eventEndDate, eventDevelopDate } = this.props
        const endDate = eventEndDate.toDate()
        const devDate = eventDevelopDate.toDate()

        return (
            <TouchableOpacity style={styles.eventCard} onPress={this.props.handleClick} >
                <Text style={{ color: 'white', fontSize: 24 }} >{eventName}</Text>
                <Text style={{ color: 'white' }}>This Event ends on: {endDate.toLocaleDateString('en-GB')}</Text>
                <Text style={{ color: 'white' }}>Photos available on : {devDate.toLocaleDateString('en-GB')}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = {
    eventCard: {
        backgroundColor: '#E48B74',
        borderRadius: 5,
        margin: 15,
        padding: 15,
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center'
    }
}