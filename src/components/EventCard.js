import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Photos from '../views/Photos';

export default class EventCard extends Component {

    render() {
        return (
            <View style={styles.eventCard}>
                <Text onPress={this.props.handleClick} style={{ textAlign: 'center', color: 'white' }} >{this.props.name}</Text>
            </View>
        )
    }
}

const styles = {
    eventCard: {
        backgroundColor: '#2957a0',
        borderColor: '#4286f4',
        borderRadius: 5,
        borderWidth: 0.5,
        margin: 10,
        padding: 10,
        fontSize: 100,
        alignContent: 'center',
        justifyContent: 'center'
    }
}