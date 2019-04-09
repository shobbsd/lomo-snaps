
import React, { Component } from 'react';
import { View, Text, ScrollView, Header } from 'react-native';
import EventCard from '../components/EventCard';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Photos from './Photos';
import '@firebase/firestore';
import firebaseConnect from '../../firebaseConfig';

export default class EventsList extends Component {

    state = {
        events: [
            { name: 'wedding', key: 1 },
            { name: 'holiday', key: 2 },
            { name: 'stag party', key: 3 },
            { name: 'barmitzvah', key: 4 },
        ],
        loadedUser: false,
        user: {}
    }

    // getEvents = async (uid) => {
    //     const userRes = await firebaseConnect
    //         .firestore()
    //         .collection('events')
    //     console.log(userRes)
    // }

    componentDidMount() {
        const user = this.props.navigation.getParam('user')
        this.setState({ user })
    }

    render() {
        console.log(this.state.user)
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }} >Events</Text>
                <ScrollView>
                    {this.state.events.map((event) => {
                        return <EventCard handleClick={this.handleClick} key={event.key} name={event.name} />
                    })}
                </ScrollView>
            </View>
        )
    }

    handleClick = () => {
        this.props.navigation.navigate('SignUp')
    }
}