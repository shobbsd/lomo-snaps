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
// import TabOne from "./tabOne";
// import TabTwo from "./tabTwo";
// import TabThree from "./tabThree";

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
    if (!this.state.isReady) {
      return <Text>loading</Text>;
    }
    return (
      <Container>
        <Header hasTabs />
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab
            heading={
              <TabHeading>
                <Icon name="camera" />
                <Text>Camera</Text>
              </TabHeading>
            }
          >
            <Camera event={this.state.event} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="person" />
                {/* <Text>Users</Text> */}
              </TabHeading>
            }
          >
            <UserList />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="apps" />
              </TabHeading>
            }
          >
            <PhotoGallery />
            {/* <Text>3</Text> */}
          </Tab>
          {/* <Tab heading="Tab5">
            <Text>3</Text>
          </Tab> */}
        </Tabs>
      </Container>
    );
  }
}

export default Menu;

// Later on in your component
