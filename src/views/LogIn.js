import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";

export default class LogIn extends Component {
  state = {
    email: "",
    password: "",
    user: {},
  };

  getUser = async uid => {
    const userRes = await firebaseConnect
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    const user = userRes.data();
    this.setState({ user });
    return user;
  };


  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
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
        <CustomButton label="Email Sign up" onPress={() => { this.props.navigation.navigate('SignUp', { getUser: this.getUser }) }} />
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
        return this.getUser(user.uid);
      })
      .then((user) => {
        this.props.navigation.navigate("EventsList", { user: this.state.user });

      })
      .catch(console.log);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'teal'
  }
});
