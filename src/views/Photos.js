import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Photos extends Component {

    render() {
        return (
            <View style={styles.eventCard}>
                <Text> PHOTOS IN HERE</Text>
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