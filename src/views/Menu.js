import React, { Component } from "react";

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
import Loading from '../components/Loading'

class Menu extends Component {
  state = {
    isReady: false,
    event: {}
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    const event = this.props.navigation.state.params.event;
    this.setState({ isReady: true, event });
  }
  render() {

    const imagesArray = this.state.event.images
    const { eventName } = this.state.event
    // const eventDevelopDate = this.state.event.eventDevelopDate
    // const devDate = new (Date).toLocaleDateString('en-GB')

    if (!this.state.isReady) {
      return <Loading />;
    }
    return (
      <Container>
        <Header hasTabs>
          <Left />
          <Body>
            <Title>{eventName}</Title>
            {/* <Subtitle>Released on : {devDate}</Subtitle> */}
          </Body>
          <Right />
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
            <Camera event={this.state.event} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="person" />
                <Text>People</Text>
              </TabHeading>
            }
          >
            <UserList />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="md-photos" />
                <Text>Album</Text>
              </TabHeading>
            }
          >
            <PhotoGallery imagesArray={imagesArray} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Menu;
