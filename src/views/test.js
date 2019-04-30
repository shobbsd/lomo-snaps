import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import verifySignUp from "../utils/verifySignUp";
import { signInWithFacebook } from "../utils/facebookSignUp";

const styles = StyleSheet.create({
  red: {
    color: "red"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: null,
      password: "",
      passwordConfirmation: "",
      toFill: {}
    };
  }

  render() {
    const {
      name,
      email,
      password,
      phone,
      passwordConfirmation,
      toFill
    } = this.state;
    return (
      <View style={styles.container}>
        <Text>Full Name:</Text>
        <FormTextInput
          placeholder="Enter your name here"
          onChangeText={event => this.onChangeText(event, "name")}
          autoCapitalize="words"
          value={name}
        />
        {toFill.name && (
          <Text style={styles.red}>Please enter your full name</Text>
        )}
        <Text>Email Address</Text>
        <FormTextInput
          placeholder="Enter your email address here"
          onChangeText={event => this.onChangeText(event, "email")}
          autoCapitalize="none"
          value={email}
        />
        {toFill.email && (
          <Text style={styles.red}>Please enter a valid email address</Text>
        )}
        <Text>Phone Number:</Text>
        <FormTextInput
          placeholder="Enter your phone number here"
          onChangeText={event => this.onChangeText(event, "phone")}
          value={phone}
          keyboardType="numeric"
        />
        {toFill.phone && (
          <Text style={styles.red}>Please enter a valid phone number</Text>
        )}
        <Text>Password:</Text>
        <FormTextInput
          placeholder="Enter your password number here"
          onChangeText={event => this.onChangeText(event, "password")}
          password={true}
          autoCapitalize="none"
          value={password}
        />
        {toFill.password && (
          <Text style={styles.red}>
            Your password must contain a minimum of 6 characters, one upper
            case, one lower case and one special character
          </Text>
        )}
        <Text>Confirm Password:</Text>
        <FormTextInput
          placeholder="Confirm your password number here"
          onChangeText={event =>
            this.onChangeText(event, "passwordConfirmation")
          }
          password={true}
          autoCapitalize="none"
          value={passwordConfirmation}
        />
        {toFill.passwordConfirmation && (
          <Text style={styles.red}>Your passwords do not match</Text>
        )}
        <CustomButton label="Submit" onPress={this.onSubmit} />
        <CustomButton label="Facebook Sign up" onPress={this.handleFacebook} />
      </View>
    );
  }

  onChangeText = (event, stateKey) => {
    this.setState({ [stateKey]: event });
  };

  handleFacebook = event => {
    event.preventDefault();
    signInWithFacebook().then(e => console.log(e, "worked?"));
  };

  onSubmit = event => {
    let uid;
    const verified = verifySignUp(this.state);
    if (verified === true) {
      const db = firebaseConnect.firestore();
      const { name, email, phone, password } = this.state;
      event.preventDefault();
      firebaseConnect
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          db.collection("users")
            .doc(user.uid)
            .set({
              email,
              name,
              phone,
              uid: user.uid
            });
          return user.uid;
        })
        .then(uid => {
          this.props.navigation.state.params.getUser(uid);
          this.props.navigation.navigate("EventsList", {
            uid: uid,
            events: []
          });
        })
        .catch(e => console.log(e));
    } else {
      this.setState({
        toFill: { ...verified }
      });
    }
  };
}
