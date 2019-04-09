
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Header, TouchableOpacity, Image } from 'react-native';
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
            { name: 'wedding', key: 11 },
            { name: 'holiday', key: 12 },
            { name: 'stag party', key: 13 },
            { name: 'barmitzvah', key: 14 },
            { name: 'wedding', key: 21 },
            { name: 'holiday', key: 22 },
            { name: 'stag party', key: 23 },
            { name: 'barmitzvah', key: 24 },
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
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }} >Events</Text>
                <ScrollView>
                    {this.state.events.map((event) => {
                        return <EventCard handleClick={this.handleClick} key={event.key} name={event.name} />
                    })}
                </ScrollView>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('NewEvent') }} style={styles.TouchableOpacityStyle}>
                    <Image source={{
                        uri: 'https://img.icons8.com/cotton/2x/plus--v1.png',
                    }} style={styles.FloatingButtonStyle} />
                </TouchableOpacity>
            </View>
        )
    }

    handleClick = () => {
        this.props.navigation.navigate('SignUp')
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },

    TouchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        //backgroundColor:'black'
    },
});