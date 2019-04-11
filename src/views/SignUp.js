import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Image
} from "react-native";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import verifySignUp from "../utils/verifySignUp";
import { signInWithFacebook } from "../utils/facebookSignUp";
import createCalendar from "../utils/createCalendar";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("../assets/bg_screen.jpg");

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
        {/* <ImageBackground source={BG_IMAGE} style={styles.bgImage} /> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Full Name"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={event => this.onChangeText(event, "name")}
            autoCapitalize="words"
            value={name}
          />
          {toFill.name && (
            <Text style={styles.red}>Please enter your full name</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email Address"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={event => this.onChangeText(event, "email")}
            autoCapitalize="words"
            value={email}
          />
          {toFill.name && (
            <Text style={styles.red}>Please enter a valid email address</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Phone Number:"
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            onChangeText={event => this.onChangeText(event, "phone")}
            autoCapitalize="words"
            value={phone}
          />
          {toFill.name && (
            <Text style={styles.red}>Please enter a valid phone number</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={event => this.onChangeText(event, "password")}
            value={password}
          />
          {toFill.password && (
            <Text style={styles.red}>
              Your password must contain a minimum of 6 characters, one upper
              case, one lower case and one special character
            </Text>
          )}
        </View>

        {/* <Text>Password:</Text>
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
        )} */}
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
        //   .signInAnonymously()
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 25,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
});
