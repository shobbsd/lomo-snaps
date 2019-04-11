import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  // Button,
  Alert,
  ImageBackground,
  Dimensions
} from "react-native";
import { Constants, Facebook, Google } from "expo";
// import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import Loading from "../components/Loading";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";

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
    // .catch(function(error) {
    //   console.log("Error getting documents: ", error);
    // });
  };

  render() {
    const { email, password } = this.state;
    if (this.state.isLoading) return <Loading />;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {/* <Text>Email Address</Text> */}
          <Form>
            <Item stackedLabel>
              <Label>Login</Label>
              <Input
                placeholder="Enter your email address here"
                onChangeText={event => this.onChangeText(event, "email")}
                autoCapitalize="none"
                value={email}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                style={styles.password}
                secureTextEntry
                placeholder="Enter your password here"
                onChangeText={event => this.onChangeText(event, "password")}
                password={true}
                autoCapitalize="none"
                value={password}
              />
            </Item>
          </Form>
          {/* <FormTextInput
            placeholder="Enter your email address here"
            onChangeText={event => this.onChangeText(event, "email")}
            autoCapitalize="none"
            value={email}
          /> */}
          {/* <Text>Password:</Text>
          <FormTextInput
            placeholder="Enter your password number here"
            onChangeText={event => this.onChangeText(event, "password")}
            password={true}
            autoCapitalize="none"
            value={password}
          /> */}
          {/* <Button
            primary
            style={{
              margin: 15,
              alignContent: "center",
              justifyContent: "center"
            }}
            onPress={this.onSubmit}
          >
            <Text>Submit</Text>
          </Button> */}
          <CustomButton
            style={styles.button}
            label="Submit"
            onPress={this.onSubmit}
          />
          {/* <CustomButton
            label="Facebook Sign up"
            onPress={this._handleFacebookLogin}
          />
          <CustomButton
            label="Google Sign up"
            onPress={this._handleGoogleLogin}
          /> */}
          <CustomButton
            label="Email Sign up"
            onPress={() => {
              this.props.navigation.navigate("SignUp", {
                getUser: this.getUser
              });
            }}
          />
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
    alignItems: "center"
    // height: 50
    // margin: 10
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    borderRadius: 5,
    backgroundColor: "white"
  },
  password: {
    fontSize: 15
  }
});
