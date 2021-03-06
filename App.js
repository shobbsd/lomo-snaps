import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "./src/views/SignUp";
import LogIn from "./src/views/LogIn";
import EventsList from "./src/views/EventsList";
import "@firebase/firestore";
import NewEvent from "./src/views/NewEvent";
import Menu from "./src/views/Menu";
import clearError from "./src/views/removeError";

clearError();

const AppNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null
      }
    },
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        header: null
      }
    },
    EventsList: {
      screen: EventsList,
      navigationOptions: {
        header: null
      }
    },
    NewEvent: {
      screen: NewEvent,
      navigationOptions: {
        header: null
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        header: null
      }
    }
  },
  { initialRouteName: "LogIn" }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
