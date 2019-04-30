import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class EventEnded extends Component {


    render() {
        return <View style={styles.container}>
            <Text style={styles.header} >This event has ended</Text>
            {/* <Text style={styles.subheader} >Your photos will be developed on {dateString}</Text> */}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 30,
    },
    subheader: {
        fontSize: 25
    }
})