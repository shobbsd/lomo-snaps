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
import { Constants, Facebook, Google } from "expo";
// import FormTextInput from "../components/FormTextInput";


import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import Loading from "../components/Loading";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;


const BG_IMAGE = require("../assets/bg_screen1.jpg");

export default class LogIn extends Component {
  state = {
    email: "",
    password: "",
    user: {},
    events: [],
    isLoading: false
  };

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

  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  getEvents = async uid => {
    const firebaseArr = await firebaseConnect
      .firestore()
      .collection("events")
      .where("attendeesUids", "array-contains", uid)
      .onSnapshot(QuerySnapshot => {
        const eventArr = [];
        QuerySnapshot.forEach((doc, i) => {
          eventArr.push(doc.data());
        });
        this.setState({ events: eventArr });
      });
  };

  render() {
    const { email, password } = this.state;
    if (this.state.isLoading) return <Loading />;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.inputContainer}>
            {/* <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
            /> */}
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={event => this.onChangeText(event, "email")}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={event => this.onChangeText(event, "password")}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.onSubmit}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}

            onPress={() => {
              this.props.navigation.navigate("SignUp", {
                getUser: this.getUser
              });
            }}
          >
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>

        </ImageBackground>
      </View>
    );
  }

  onChangeText = (event, stateKey) => {
    this.setState({ [stateKey]: event });
  };

  onSubmit = event => {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    event.preventDefault();
    firebaseConnect
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        //
        this.getEvents(user.uid);
        return this.getUser(user.uid);
      })
      .then(user => {
        this.props.navigation.navigate("EventsList", {
          user: this.state.user,
          events: this.state.events,
          stopLoading: this.stopLoading
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err, "this is the err");
      });
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
