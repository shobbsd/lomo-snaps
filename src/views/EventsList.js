import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Header,
  TouchableOpacity,
  Image
} from "react-native";
import EventCard from "../components/EventCard";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Photos from "./Photos";
import "@firebase/firestore";
import firebaseConnect from "../../firebaseConfig";

export default class EventsList extends Component {
  state = {
    events: [],
    loadedUser: false,
    user: {}
  };

  componentDidMount() {
    const { user, events } = this.props.navigation.state.params;
    this.setState({ user, events });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, textAlign: "center", color: "black" }}>
          Events
        </Text>
        <ScrollView>
          {this.state.events.map(event => {
            return (
              <EventCard
                handleClick={() => {
                  this.handleClick(event);
                }}
                key={event.eventName}
                name={event.eventName}
              />
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("NewEvent", {
              user: this.state.user
            });
          }}
          style={styles.TouchableOpacityStyle}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/cotton/2x/plus--v1.png"
            }}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  handleClick = event => {
    this.props.navigation.navigate("Menu", { event });
  };
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5"
  },

  TouchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 60,
    height: 60
    //backgroundColor:'black'
  }
});
