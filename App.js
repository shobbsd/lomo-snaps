import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./Components/Camera";
import SignUp from "./Components/SignUp";
import NewEvent from "./Components/NewEvent";
import Gallery from "./Components/Gallery";
import firebaseConnect from "./firebaseConfig";

class Home extends Component {
  render() {
    firebaseConnect
      .auth()
      .signInAnonymously()
      .then(user => console.log(user, "first"));
    firebaseConnect
      .auth()
      .signInWithEmailAndPassword("shobbsdaley@gmail.com", "northCoders")
      .then(user => console.log(user));
    // .app("retro_snaps")
    // .auth()
    // .("apple@icloud.com", "apple123")
    // .then(user => {
    //   console.log(user);
    //   // console.log("kittensApp user ->", user.toJSON());
    // });
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
