import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class NoPhotos extends Component {


    render() {
        return <View style={styles.container}>
            <Text style={styles.header} >You're out of film</Text>
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