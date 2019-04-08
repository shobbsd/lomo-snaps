import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "./src/views/SignUp";
import NewEvent from "./src/views/NewEvent";
import Gallery from "./src/views/Gallery";
import LogIn from "./src/views/LogIn";
import Home from "./src/views/Home";
import CameraPage from "./src/views/Camera";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: CameraPage
  },
  SignUp: {
    screen: SignUp
  },
  NewEvent: {
    screen: NewEvent
  },
  Gallery: {
    screen: Gallery
  },
  LogIn: {
    screen: LogIn
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
