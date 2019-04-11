import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class NoPhotos extends Component {


    render() {
        return <View style={styles.container}>
            <Text style={styles.header} >You're out of film</Text>
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