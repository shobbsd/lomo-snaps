import React, { Component } from "react";
import { View, Text } from "react-native";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";
import "firebase/firestore";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: null,
      password: "",
      passwordConfirmation: ""
    };
  }

  render() {
    const { name, email, password, phone, passwordConfirmation } = this.state;
    return (
      <View>
        <Text>Full Name:</Text>
        <FormTextInput
          placeholder="Enter your name here"
          onChangeText={event => this.onChangeText(event, "name")}
          autoCapitalize="words"
          value={name}
        />
        <Text>Email Address</Text>
        <FormTextInput
          placeholder="Enter your email address here"
          onChangeText={event => this.onChangeText(event, "email")}
          autoCapitalize="none"
          value={email}
        />
        <Text>Phone Number:</Text>
        <FormTextInput
          placeholder="Enter your phone number here"
          onChangeText={event => this.onChangeText(event, "phone")}
          value={phone}
          keyboardType="numeric"
        />
        <Text>Password:</Text>
        <FormTextInput
          placeholder="Enter your password number here"
          onChangeText={event => this.onChangeText(event, "password")}
          password={true}
          autoCapitalize="none"
          value={password}
        />
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
        <CustomButton label="Submit" onPress={this.onSubmit} />
      </View>
    );
  }

  onChangeText = (event, stateKey) => {
    this.setState({ [stateKey]: event });
  };

  onSubmit = event => {
    const db = firebaseConnect.firestore();
    user = firebaseConnect.auth().currentUser;
    console.log(user);
    const { name, email, phone, password } = this.state;
    event.preventDefault();
    firebaseConnect
      .auth()
      //   .signInAnonymously()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebaseConnect.auth().currentUser.updateProfile({
          name,
          email,
          phoneNumber: phone
        });
      })
      .then(() => {
        // console.log(email);
        db.collection("users")
          .doc(email)
          .set({
            email
          });
      })
      .then(docRef => console.log(docRef, "went well"))
      .catch(e => console.log(e));
  };
}
