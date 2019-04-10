import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import Loading from '../components/Loading';

export default class LogIn extends Component {
  state = {
    email: "",
    password: "",
    user: {},
    events: [],
    isLoading: false
  };

  getUser = async uid => {
    const userRes = await firebaseConnect
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    const user = userRes.data();
    this.setState({ user: { false: true, ...user } });
    return user;
  };

  stopLoading = () => {
    this.setState({ isLoading: false })
  }

  getEvents = async uid => {
    const firebaseArr = await firebaseConnect
      .firestore()
      .collection("events")
      .where("attendees", "array-contains", uid)
      .onSnapshot(QuerySnapshot => {
        const eventArr = [];
        QuerySnapshot.forEach((doc, i) => {
          if ((i = 0)) console.log(doc.data());
          eventArr.push(doc.data());
        });
        this.setState({ events: eventArr });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  render() {
    const { email, password } = this.state;
    if (this.state.isLoading) return <Loading />
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
        <CustomButton
          label="Email Sign up"
          onPress={() => {
            this.props.navigation.navigate("SignUp", { getUser: this.getUser });
          }}
        />
      </View>
    );
  }

  onChangeText = (event, stateKey) => {
    this.setState({ [stateKey]: event });
  };

  onSubmit = event => {
    this.setState({ isLoading: true })
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
        console.log(err, "this is the err");
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  button: {
    borderRadius: 5,
    backgroundColor: "teal"
  }
});
