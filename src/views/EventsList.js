import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Header,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions
} from "react-native";
import EventCard from "../components/EventCard";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Photos from "./Photos";
import "@firebase/firestore";
import firebaseConnect from "../../firebaseConfig";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG_IMAGE = require("../assets/bg_screen.jpg");

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
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <StatusBar hidden={true} />
          <Text style={styles.header}>
            Events
        </Text>
          <ScrollView>
            {this.state.events.map((event, idx) => {
              console.log(event, '<< EVENT')
              return (
                <EventCard
                  handleClick={() => {
                    this.handleClick(event, this.state.user);
                  }}
                  key={idx}
                  eventName={event.eventName}
                  eventEndDate={(event.eventEndDate)}
                  eventDevelopDate={event.eventDevelopDate}
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
        </ImageBackground>
      </View>
    );
  }

  handleClick = (event, user) => {
    this.props.navigation.navigate("Menu", { event, user });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3176C2"
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
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 35,
    color: 'white',
    textAlign: "center"
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 60,
    height: 60
    //backgroundColor:'black'
  }
});
