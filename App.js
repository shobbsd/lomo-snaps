import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "./src/views/SignUp";
<<<<<<< HEAD
import NewEvent from "./src/views/NewEvent";
import Gallery from "./src/views/Gallery";
import EventCalendar from "./src/components/EventCalendar";
import Menu from "./src/views/Menu";

class Home extends Component {
  render() {
    return (
      // <View>
      //   <Text>This is the home screen</Text>
      //   <Button
      //     title="open camera"
      //     onPress={() => {
      //       this.props.navigation.navigate("Camera");
      //     }}
      //   />
      //   <Button
      //     title="open SignUp"
      //     onPress={() => {
      //       this.props.navigation.navigate("SignUp");
      //     }}
      //   />
      //   <Button
      //     title="open new event"
      //     onPress={() => {
      //       this.props.navigation.navigate("NewEvent");
      //     }}
      //   />
      //   <Button
      //     title="open Gallery"
      //     onPress={() => {
      //       this.props.navigation.navigate("Gallery");
      //     }}
      //   />
      //   <EventCalendar />
      // </View>
      <Menu />
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Camera: {
    screen: Camera
  },
  SignUp: {
    screen: SignUp
  },
  NewEvent: {
    screen: NewEvent
  },
  Gallery: {
    screen: Gallery
  }
});
=======
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
>>>>>>> 31a383378485d5f793872e6e7f400f8632b62330

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}
