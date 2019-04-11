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

import { Facebook, Google } from "expo";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";

import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import verifySignUp from "../utils/verifySignUp";
import { signInWithFacebook } from "../utils/facebookSignUp";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("../assets/image.png");
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

        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        <View style={styles.contentContainer}>

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

            <Text style={styles.red}>!</Text>
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
            <Text style={styles.red}>!</Text>
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

            <Text style={styles.red}>!</Text>
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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Confirm your password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={event => this.onChangeText(event, "passwordConfirmation")}
            value={passwordConfirmation}
          />
          {toFill.passwordConfirmation && (
          <Text style={styles.red}>Passwords do not match</Text>
        )}
        </View>
        {/* <Text>Confirm Password:</Text>

        <FormTextInput
          placeholder="Confirm your password number here"
          onChangeText={event =>
            this.onChangeText(event, "passwordConfirmation")
          }
          password={true}
          autoCapitalize="none"
          value={passwordConfirmation}
        /> */}

          {/* <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.onSubmit}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight> */}

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.onSubmit}
          >
            <Text style={styles.loginText}>Submit</Text>
          </TouchableHighlight>

          <Text style={styles.loginText}>Or</Text>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this._handleFacebookLogin}
          >
            <Text style={styles.loginText}>
            <Image
              source={require('../assets/facebook_logo.png')}
              style={styles.thumbnail}
            />
            Sign In With Facebook</Text>
          </TouchableHighlight>
          
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this._handleGoogleLogin}
          >
            <Text style={styles.loginText}>
            <Image
              source={require('../assets/google_logo.png')}
              style={styles.thumbnail}
            />
            Sign In With Google</Text>
          </TouchableHighlight>
        
        </View>
        </ImageBackground>
      </View>
    );
  }

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "1201211719949057", // Replace with your own app id in standalone app
        { permissions: ["public_profile"] }
      );

      switch (type) {
        case "success": {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          const profile = await response.json();
          Alert.alert("Logged in!", `Hi ${profile.name}!`);
          break;
        }
        case "cancel": {
          Alert.alert("Cancelled!", "Login was cancelled!");
          break;
        }
        default: {
          Alert.alert("Oops!", "Login failed!");
        }
      }
    } catch (e) {
      Alert.alert("Oops!", "Login failed!");
    }
  };

  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: "<ANDROID_CLIENT_ID>",
        iosStandaloneAppClientId: "<IOS_CLIENT_ID>",
        androidClientId:
          "603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com",
        iosClientId:
          "603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      switch (type) {
        case "success": {
          Alert.alert("Logged in!", `Hi ${user.name}!`);
          break;
        }
        case "cancel": {
          Alert.alert("Cancelled!", "Login was cancelled!");
          break;
        }
        default: {
          Alert.alert("Oops!", "Login failed!");
        }
      }
    } catch (e) {
      Alert.alert("Oops!", "Login failed!");
    }
  };

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

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60
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

  thumbnail: {
    height: 18,
    width: 18
  },
  red: {
    color: 'red'
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    borderRadius: 30
  },
  button: {
    backgroundColor: "#00b5ec"
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

    marginBottom: 10,
    marginTop: 10,

    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {

    color: "white",
    textAlign: 'center',
    paddingLeft: 5,
    marginLeft: 5

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
