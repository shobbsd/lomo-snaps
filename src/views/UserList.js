import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
} from "native-base";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AddFriend from "./addFriend";
import firebaseConnect from "../../firebaseConfig";
import * as firebase from "firebase";

export default class UserList extends Component {
  state = {
    event: {},
    showModal: false
  };

  componentDidMount() {
    const event = this.props.event;
    this.setState({ event });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  updateEvent = (name, uid) => {
    let newEvent = { ...this.state.event };
    newEvent.attendeesNames = {
      [uid]: name,
      ...this.state.event.attendeesNames
    };
    newEvent.attendeesUids = [uid, ...this.state.event.attendeesUids];
    this.setState({
      event: newEvent
    });
    const db = firebaseConnect.firestore();
    const attendeesObj = `attendeesNames.${uid}`;
    const photosleftObj = `photosleft.${uid}`;
    db.collection("events")
      .doc(newEvent.eventUid)
      .update({
        [photosleftObj]: newEvent.limit,
        [attendeesObj]: name,
        attendeesUids: firebase.firestore.FieldValue.arrayUnion(uid)
      });
  };

  render() {
    const attendeesObj = this.state.event.attendeesNames;
    const attendeesNames = [];
    for (const uid in attendeesObj) {
      attendeesNames.push(attendeesObj[uid]);
    }

    return (
      <Container>
        <AddFriend
          isVisible={this.state.showModal}
          closeModal={this.closeModal}
          updateEvent={this.updateEvent}
        />
        <Content>
          <List>
            {this.state.event.attendeesNames &&
              attendeesNames.map(element => {
                return (
                  <ListItem key={element}>
                    <Left>
                      <Text style={styles.name} >{element}</Text>
                    </Left>
                  </ListItem>
                );
              })}
          </List>
        </Content>
        <TouchableOpacity
          onPress={() => {
            this.setState({ showModal: true });
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },
  name: {
    fontSize: 30
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 60,
    height: 60
  }
});
