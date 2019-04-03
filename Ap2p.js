import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8XGOE60ctujub7xfTd0OYWqswRnV- fqk",
  authDomain: "cameraApp.shaq.com",
  // databaseURL: "<YOUR-DATABASE-URL>",
  storageBucket: "gs://retro-snaps.appspot.com/"
};

firebase.initializeApp(firebaseConfig, "retro_snaps");

export default class App extends React.Component {
  render() {
    firebase
      .app("retro_snaps")
      .auth()
      .signInWithEmailAndPassword("apple@icloud.com", "apple123")
      .then(user => {
        console.log(user);
        // console.log("kittensApp user ->", user.toJSON());
      });
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
