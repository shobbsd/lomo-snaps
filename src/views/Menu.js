import React, { Component } from "react";
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Body,
  Text,
  TabHeading,
  ScrollableTab
} from "native-base";
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Camera from "./Camera";
import UserList from "./UserList";
import PhotoGallery from "./PhotoGallery";
import Loading from "../components/Loading";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";

class Menu extends Component {
  state = {
    isReady: false,
    event: {},
    photosleft: 0,
    user: {}
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    const { event, user } = this.props.navigation.state.params;
    const photosleft = event.photosleft[user.uid]

    this.setState({ isReady: true, event, photosleft, user });
  }

  depreciatePhotosLeft = () => {
    const db = firebaseConnect.firestore();
    const { event } = this.state
    const docname = event.organiser + event.eventName
    const photosleftObj = `photosleft.${this.state.user.uid}`
    this.setState((prevState) => {
      return { photosleft: prevState.photosleft - 1 }
    })
    db.collection('events')
      .doc(docname)
      .update({
        [photosleftObj]: this.state.photosleft
      })

  }

  render() {
    const {
      eventName,
      images: imagesArray,
      eventDevelopDate
    } = this.state.event;
    // const eventDevelopDate = this.state.event.eventDevelopDate
    // const devDate = new (Date).toLocaleDateString('en-GB')
    if (!this.state.isReady) {
      return <Loading />;
    }
    return (
      <Container style={{ color: '#E48B74' }}>
        <StatusBar hidden={true} />
        <Header hasTabs>
          <Left />
          <Body>
            <Title>{eventName}</Title>
            {/* <Subtitle>Released on : {devDate}</Subtitle> */}
          </Body>
          <Right>
            <Text style={{ color: 'white' }}>{this.state.photosleft}</Text>
          </Right>
        </Header>

        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab
            heading={
              <TabHeading>
                <Icon name="camera" />
                {/* <Text>Camera</Text> */}
              </TabHeading>
            }
          >
            <Camera event={this.state.event} photosleft={this.state.photosleft} depreciatePhotosLeft={this.depreciatePhotosLeft} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="person" />
                <Text>People</Text>
              </TabHeading>
            }
          >
            <UserList event={this.state.event} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="md-photos" />
                <Text>Album</Text>
              </TabHeading>
            }
          >
            <PhotoGallery
              imagesArray={imagesArray}
              eventDevelopDate={eventDevelopDate}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Menu;
