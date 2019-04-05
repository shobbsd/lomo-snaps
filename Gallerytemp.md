
```
import React, { Component } from 'react';
import { View, Text, ScrollView, Header } from 'react-native';
import EventCard from '../components/EventCard';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Photos from './Photos';
import firebaseConnect from '../../firebaseConfig';
// import 'firebase/firestore'

// npm i firebase/firestore

class GalleryScreen extends Component {

    state = {
        events: [
            { name: 'wedding', key: 1 },
            { name: 'holiday', key: 2 },
            { name: 'stag party', key: 3 },
            { name: 'barmitzvah', key: 4 },
            { name: 'wedding', key: 5 },
            { name: 'holiday', key: 6 },
            { name: 'stag party', key: 7 },
            { name: 'barmitzvah', key: 8 },
            { name: 'wedding', key: 11 },
            { name: 'holiday', key: 12 },
            { name: 'stag party', key: 13 },
            { name: 'barmitzvah', key: 14 },
            { name: 'wedding', key: 15 },
            { name: 'holiday', key: 16 },
            { name: 'stag party', key: 17 },
            { name: 'barmitzvah', key: 18 }
        ]
    }

    // componentDidMount() {
    //     firebaseConnect.firestore().collection('events')
    //         .then(console.log)
    // }

    render() {
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
        this.props.navigation.navigate('Photos')
    }
}

const AppNavigator = createStackNavigator({
    Gallery: {
        screen: GalleryScreen,
        navigationOptions: {
            header: null
        }
    },
    Photos: {
        screen: Photos,
        navigationOptions: {
            header: null
        }
    }
}, { initialRouteName: 'Gallery' })

const AppContainer = createAppContainer(AppNavigator);

export default class Gallery extends Component {
    render() {
        return <AppContainer />
    }
}
```