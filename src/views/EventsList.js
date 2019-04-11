import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Header,
  TouchableOpacity,
  Image,
  StatusBar
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
    // this.setState({ user });
    const db = firebaseConnect.firestore();
    db.collection("events")
      .where("attendeesUids", "array-contains", user.uid)
      .onSnapshot(snapshot => {
        const updateEvents = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            updateEvents.push(change.doc.data());
          } else if (change.type === "modified") {
            const update = change.doc.data();
            updateEvents.reduce((acc, curr) => {
              if (curr.eventName === update.eventName) {
                return update;
              } else return curr;
            }, []);
          }
        });
        this.setState(state => {
          if (state.events !== updateEvents)
            return { events: [...updateEvents, ...state.events], user };
          else return { events: updateEvents, user };
        });
      });
  }

  componentWillUnmount() {
    this.props.navigation.state.params.stopLoading();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Text style={{ fontSize: 30, textAlign: "center", color: "black" }}>
          Events
        </Text>
        <ScrollView>
          {this.state.events.map(event => {
            return (
              <EventCard
                handleClick={() => {
                  this.handleClick(event, this.state.user);
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

  handleClick = (event, user) => {
    this.props.navigation.navigate("Menu", { event, user });
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
