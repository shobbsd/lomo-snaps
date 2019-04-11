import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Picker
} from "react-native";
import { Contacts } from "expo";
import { Button } from "native-base";
import firebaseConnect from "../../firebaseConfig";

export default class AddFriend extends Component {
  state = {
    modalVisible: false,
    contacts: [],
    toAdd: ""
  };

  handlePress = () => {
    const updateEvent = this.props.updateEvent;
    const closeModal = this.props.closeModal;
    const toAdd = this.state.toAdd;
    closeModal();
    const db = firebaseConnect.firestore();
    db.collection("users")
      .where("phone", "==", toAdd)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const docToo = doc.data();
          updateEvent(docToo.name, docToo.uid);
        });
      });
  };

  pickerOptions = () => {
    const multiple = this.state.contacts.map(contact => {
      if (contact.phoneNumbers.length > 1) {
        return contact.phoneNumbers.map(phoneNumber => {
          return (
            <Picker.Item
              key={phoneNumber.digits}
              label={`${contact.name}: ${phoneNumber.digits}`}
              value={phoneNumber.digits}
            />
          );
        });
      }
    });

    const single = this.state.contacts.map(contact => {
      return (
        <Picker.Item
          key={contact.phoneNumbers[0].digits}
          label={`${contact.name}`}
          value={contact.phoneNumbers[0].digits}
        />
      );
    });

    multiple.forEach(element => {
      if (element) {
        if (Array.isArray(element)) {
          element.forEach(number => {
            single.push(number);
          });
        } else single.push(element);
      }
    });

    return single;
  };

  componentDidUpdate() {
    if (this.state.modalVisible !== this.props.isVisible) {
      this.setState({ modalVisible: this.props.isVisible });
    }
  }

  async componentDidMount() {
    const contacts = await Contacts.getContactsAsync();
    this.setState({ contacts: contacts.data });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    if (this.state.contacts) this.pickerOptions();
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 200 }}>
            <View>
              <Text>Select who you would like to invite:</Text>
              {this.state.contacts && (
                <Picker
                  selectedValue={this.state.toAdd}
                  style={{ height: 80 }}
                  onValueChange={itemValue =>
                    this.setState({ toAdd: itemValue })
                  }
                >
                  {this.pickerOptions()}
                </Picker>
              )}
            </View>

            <View style={{ marginTop: 200 }}>
              <Button block onPress={this.handlePress}>
                <Text> Add </Text>
              </Button>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button danger block onPress={this.props.closeModal}>
                <Text> Cancel </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>

      //   <TouchableHighlight
      //     onPress={() => {
      //       this.setModalVisible(true);
      //     }}
      //   >
      //     <Text>Show Modal</Text>
      //   </TouchableHighlight>
      // </View>
    );
  }
}
