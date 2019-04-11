import React, { Component } from "react";
import {
  Platform,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableHighlight,
  DatePickerIOS,
  DatePickerAndroid,
  Picker
} from "react-native";
import firebaseConnect from "../../firebaseConfig";
import "@firebase/firestore";
import { Permissions } from "expo";

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
    // console.log(this.state); // logs to expo start console
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
    // https://firebase.google.com/docs/firestore/quickstart
    // NB firestore generates unique ID eg. 8pWgaC79rQ8KbhtjTrnN
    const { user, eventName, eventEndDate, eventDevelopDate, limit } = this.state;
    // add first attendee who is the organiser
    const { uid } = user
    const docname = uid + eventName;
    console.log(docname);
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
        photosleft: { [uid]: +limit }
      });
    // .catch(function(error) {
    //   console.error("Error adding document: ", error);
    // });
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
        <>
          <Text style={{ textAlign: "center", padding: 40, fontSize: 18 }}>Enter your Event Name</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 20,
              marginTop: 0
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
            <Text style={{ textAlign: "center", padding: 40, fontSize: 18 }}>Choose a photo limit...</Text>
          </TouchableHighlight>

          <Modal
            animationType="none"
            transparent={false}
            visible={this.state.modalVisiblePhotoLimit}
            onRequestClose={() => {
              console.log('modal closed')
            }}
          >

            <Text style={{ textAlign: "center", padding: 40, fontSize: 18 }}>How many photos each ?</Text>
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
              onPress={() => {
                this.setModalVisiblePhotoLimit(!this.state.modalVisiblePhotoLimit);
              }}>
              <Text style={{ textAlign: "center", padding: 10 }}>DONE</Text>
            </TouchableHighlight>

          </Modal>

          {pf === "ios" && (
            <>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisibleEventEndDate(true);
                }}>
                <Text style={{ textAlign: "center", padding: 40, fontSize: 18 }}>Event End Date:</Text>
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
                  onPress={() => {
                    this.setModalVisibleEventEndDate(!this.state.modalVisibleEventEndDate);
                  }}>
                  <Text style={{ textAlign: "center", padding: 10 }}>DONE</Text>
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
              {/* <Text style={{ textAlign: "center", padding: 40, fontSize: 18 }}>Develop Photos Date:</Text> */}

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisibleDevelopEndDate(true);
                }}>
                <Text style={{ textAlign: "center", padding: 40, fontSize: 18 }}>Develop End Date:</Text>
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
                  onPress={() => {
                    this.setModalVisibleDevelopEndDate(!this.state.modalVisibleDevelopEndDate);
                  }}>
                  <Text style={{ textAlign: "center", padding: 10 }}>DONE</Text>
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
              title="Develop Photos Date.."
              onPress={this.handleAndroidDevelopDate}
            />
          )}

          <Button
            style={{
              color: 'red',
              padding: 20,
              borderWidth: 1,
              marginBottom: 40
            }}
            title="Submit your event"
            onPress={this.handleEventSubmit}
          />
        </>
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

// TODO UI polish
// TODO can not style react-native <Button /> goto https://facebook.github.io/react-native/docs/touchableopacity.html
// TODO simplify IOS date picker ( no time required )
// TODO default time of events is midday
