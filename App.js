import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "./src/views/SignUp";
import LogIn from "./src/views/LogIn";
import EventsList from './src/views/EventsList';
import '@firebase/firestore';
import NewEvent from './src/views/NewEvent';


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
    }
    // Event: {
    //   screen: null,
    // }
  }, { initialRouteName: 'LogIn' });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}
