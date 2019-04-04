import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./src/views/Camera";
import SignUp from "./src/views/SignUp";
import NewEvent from "./src/views/NewEvent";
import Gallery from "./src/views/Gallery";

class Home extends Component {
  render() {
    return (
      <View>
        <Text>This is the home screen</Text>
        <Button
          title="open camera"
          onPress={() => {
            this.props.navigation.navigate("Camera");
          }}
        />
        <Button
          title="open SignUp"
          onPress={() => {
            this.props.navigation.navigate("SignUp");
          }}
        />
        <Button
          title="open new event"
          onPress={() => {
            this.props.navigation.navigate("NewEvent");
          }}
        />
        <Button
          title="open Gallery"
          onPress={() => {
            this.props.navigation.navigate("Gallery");
          }}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: Camera
  },
  SignUp: {
    screen: SignUp
  },
  NewEvent: {
    screen: NewEvent
  },
  Gallery: {
    screen: Gallery
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
