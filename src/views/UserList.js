import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon
} from "native-base";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
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
    console.log(name, uid);
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

    // const arr = attendeesNames.map(element => {
    //   return (
    //     <ListItem>
    //       <Left>
    //         <Text>{element}</Text>
    //       </Left>
    //     </ListItem>
    //   );
    // });
    // console.log(arr);

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
                      <Text>{element}</Text>
                    </Left>
                  </ListItem>
                );
              })}
            {/* <ListItem>
              <Left>
                <Text>Shaq</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Phil</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Chris</Text>
              </Left>
            </ListItem> */}
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

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 60,
    height: 60
    //backgroundColor:'black'
  }
});
