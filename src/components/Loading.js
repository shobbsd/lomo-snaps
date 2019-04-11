import React, { Component } from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG_IMAGE = require("../assets/bg_screen.jpg");

export default class App extends Component {
    render() {
        return (
            <View style={[styles.container]}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <ActivityIndicator size="large" color="#316b9c" />
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: "center",
        alignItems: "center"
    },
})