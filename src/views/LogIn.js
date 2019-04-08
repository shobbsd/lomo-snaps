import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";

export default class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    const { email, password } = this.state;
    return (
      <View>
        <Text>Email Address</Text>
        <FormTextInput
          placeholder="Enter your email address here"
          onChangeText={event => this.onChangeText(event, "email")}
          autoCapitalize="none"
          value={email}
        />
        <Text>Password:</Text>
        <FormTextInput
          placeholder="Enter your password number here"
          onChangeText={event => this.onChangeText(event, "password")}
          password={true}
          autoCapitalize="none"
          value={password}
        />
        <CustomButton label="Submit" onPress={this.onSubmit} />
        <CustomButton label="Facebook Sign up" onPress={this.onSubmit} />
      </View>
    );
  }

  onChangeText = (event, stateKey) => {
    this.setState({ [stateKey]: event });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    firebaseConnect
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.props.navigation.state.params.getUser(user.uid);
        this.props.navigation.navigate("Home", { uid: user.uid });
      })
      .catch(console.log);
  };
}

const styles = StyleSheet.create({});
