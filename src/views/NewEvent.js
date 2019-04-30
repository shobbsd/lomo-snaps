import React, { Component } from "react";
import {
  Platform,
  Text,
  TextInput,
  ImageBackground,
  Button,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  DatePickerIOS,
  DatePickerAndroid,
  Picker
} from "react-native";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import { Permissions } from "expo";

const BG_IMAGE = require("../assets/bg_screen.jpg");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const db = firebaseConnect.firestore();
const pf = Platform.OS;

export default class NewEvent extends Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      eventEndDate: new Date(),
      eventDevelopDate: new Date(),
      isEventNameError: null, // local state only.
      hasCalendarPermission: false,
      user: {},
      limit: "24",
      modalVisiblePhotoLimit: false,
      modalVisibleEventEndDate: false,
      modalVisibleDevelopEndDate: false,
    };
  }

  setModalVisiblePhotoLimit(visible) {
    this.setState({ modalVisiblePhotoLimit: visible });
  }

  setModalVisibleEventEndDate(visible) {
    this.setState({ modalVisibleEventEndDate: visible });
  }

  setModalVisibleDevelopEndDate(visible) {
    this.setState({ modalVisibleDevelopEndDate: visible });
  }

  handleEventSubmit = () => {
    const { eventName } = this.state;
    if (eventName.length >= 5) {
      this.addEvent();
      this.props.navigation.navigate("EventsList");
    } else {
      this.setState({ isEventNameError: true });
    }
  };

  handleAndroidEventDate = () => {
    loadAndroidDatePicker()
      .then(androidEventDate =>
        this.setState({ eventEndDate: androidEventDate })
      )
      .catch(console.log("something went wrong with returned Event Date"));
  };

  handleAndroidDevelopDate = () => {
    loadAndroidDatePicker()
      .then(androidDevelopDate =>
        this.setState({ eventDevelopDate: androidDevelopDate })
      )
      .catch(console.log("something went wrong with returned Develop Date"));
  };

  addEvent = () => {
    const {
      user,
      eventName,
      eventEndDate,
      eventDevelopDate,
      limit
    } = this.state;
    const { uid } = user;
    const docname = uid + eventName;
    db.collection("events")
      .doc(docname)
      .set({
        eventName,
        eventEndDate,
        eventDevelopDate,
        organiser: uid,
        attendeesUids: [uid],
        attendeesNames: { [uid]: user.name },
        images: [],
        limit: +limit,
        photosleft: { [uid]: +limit },
        eventUid: docname
      });
  };

  async componentDidMount() {
    const { user } = this.props.navigation.state.params;
    const calendar = await Permissions.askAsync(Permissions.CALENDAR);
    const hasCalendarPermission = calendar.status === "granted";

    this.setState({ user, hasCalendarPermission });
  }

  render() {
    const { isEventNameError } = this.state;
    if (this.state.hasCalendarPermission === false)
      return <Text>Calendar permissions not given</Text>;
    else {
      return (
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <>
            <Text style={{ textAlign: "center", padding: 10, color: 'white', fontSize: 18 }}>Enter your Event Name</Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                marginTop: 0,
                backgroundColor: '#E48B74',
                borderRadius: 10,
                color: 'white'
              }}
              placeholder="Enter your event name, at least 5 characters..."
              onChangeText={eventName =>
                this.setState({ eventName: eventName, isEventNameError: false })
              }
              value={this.state.eventName}
            />
            {isEventNameError && (
              <Text style={{ textAlign: "center", padding: 10, color: "red" }}>
                Event Name must be at least 5 characters
            </Text>
            )}

            <TouchableHighlight
              onPress={() => {
                this.setModalVisiblePhotoLimit(true);
              }}>
              <Text style={{ textAlign: "center", paddingTop: 40, paddingBottom: 10, color: 'white', fontSize: 18 }}>Choose a photo limit...</Text>
            </TouchableHighlight>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisiblePhotoLimit}
              onRequestClose={() => {
                console.log('modal closed')
              }}
            >

              <Text style={{ textAlign: "center", paddingTop: 40, paddingBottom: 10, color: 'white', fontSize: 18 }}>How many photos each ?</Text>
              <Picker style={{ textAlign: "center", padding: 10 }}
                selectedValue={this.state.limit}
                style={{ height: 200, margin: 20 }}
                onValueChange={(limit) =>
                  this.setState({ limit })
                }>
                <Picker.Item label="24" value="24" />
                <Picker.Item label="48" value="48" />
                <Picker.Item label="72" value="72" />
                <Picker.Item label="96" value="96" />
              </Picker>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => {
                  this.setModalVisiblePhotoLimit(!this.state.modalVisiblePhotoLimit);
                }}>
                <Text style={styles.loginText}>DONE</Text>
              </TouchableHighlight>

            </Modal>
            <Text>{this.state.limit}</Text>
            {pf === "ios" && (
              <>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisibleEventEndDate(true);
                  }}>
                  <Text style={{ textAlign: "center", paddingTop: 40, paddingBottom: 10, color: 'white', fontSize: 18 }}>Event End Date:</Text>
                </TouchableHighlight>

                <Modal
                  animationType="none"
                  transparent={false}
                  visible={this.state.modalVisibleEventEndDate}
                  style={{ marginTop: 100 }}
                  onRequestClose={() => {
                    console.log('modal closed')
                  }}
                >

                  <DatePickerIOS
                    minimumDate={new Date()}
                    date={this.state.eventEndDate}
                    onDateChange={eventEndDate => this.setState({ eventEndDate })}
                  />

                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => {
                      this.setModalVisibleEventEndDate(!this.state.modalVisibleEventEndDate);
                    }}>
                    <Text style={styles.loginText}>DONE</Text>
                  </TouchableHighlight>

                </Modal>
              </>
            )}

            {pf === "android" && (

              <>
                <Button
                  style={{
                    color: "red",
                    padding: 40,
                    borderWidth: 1,
                    margin: 40
                  }}
                  title="Event End Date.."
                  onPress={this.handleAndroidEventDate}
                />
              </>

            )}


            {pf === "ios" && (
              <>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisibleDevelopEndDate(true);
                  }}>
                  <Text style={{ textAlign: "center", paddingTop: 40, paddingBottom: 10, color: 'white', fontSize: 18 }}>Develop End Date:</Text>
                </TouchableHighlight>

                <Modal
                  animationType="none"
                  transparent={false}
                  visible={this.state.modalVisibleDevelopEndDate}
                  style={{ marginTop: 100 }}
                  onRequestClose={() => {
                    console.log('modal closed')
                  }}
                >

                  <DatePickerIOS
                    minimumDate={this.state.eventEndDate}
                    date={this.state.eventDevelopDate}
                    onDateChange={eventDevelopDate =>
                      this.setState({ eventDevelopDate })
                    }
                  />

                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => {
                      this.setModalVisibleDevelopEndDate(!this.state.modalVisibleDevelopEndDate);
                    }}>
                    <Text style={styles.loginText}>DONE</Text>
                  </TouchableHighlight>

                </Modal>
              </>
            )}

            {pf === "android" && (
              <Button
                style={{
                  color: 'red',
                  padding: 40,
                  borderWidth: 1,
                  margin: 40
                }}
                title="Develop Photos Date..."
                onPress={this.handleAndroidDevelopDate}
              />
            )}

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.handleEventSubmit}
            >
              <Text style={styles.loginText}>Submit your event</Text>
            </TouchableHighlight>

          </>
        </ImageBackground>
      );
    }
  }
}

async function loadAndroidDatePicker() {
  try {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      const androidDate = new Date(year, month, day);
      return androidDate;
    }
  } catch ({ code, message }) {
    console.warn("Cannot open date picker" + message);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 25,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
});