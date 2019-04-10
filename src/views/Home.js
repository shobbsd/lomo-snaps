import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import EventCalendar from "../components/EventCalendar";

export default class Home extends Component {
  state = {
    user: {}
  };

  getUser = async uid => {
    const userRes = await firebaseConnect
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    const user = userRes.data();  
    this.setState({ user });
  };

  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate("LogIn", { getUser: this.getUser });
          }}
        />
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
            this.props.navigation.navigate("SignUp", { getUser: this.getUser });
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
        <EventCalendar />
      </View>
    );
  }
}
