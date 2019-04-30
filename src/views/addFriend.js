import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Picker,
  StyleSheet
} from "react-native";
import { Contacts, Permissions } from "expo";
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

    const single = this.state.contacts.map(contact => {
      if (contact.phoneNumbers) {
        return (
          <Picker.Item
            key={contact.phoneNumbers[0].digits}
            label={`${contact.name}`}
            value={contact.phoneNumbers[0].digits}
          />
        );
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
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)
    const contacts = await Contacts.getContactsAsync();
    this.setState({ contacts: contacts.data });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          style={{ justifyContent: 'center' }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 200, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.header}>Select who you would like to invite:</Text>
              {this.state.contacts && (
                <Picker
                  selectedValue={this.state.toAdd}
                  style={{ height: 100, width: 200 }}
                  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                  onValueChange={itemValue =>
                    this.setState({ toAdd: itemValue })
                  }
                >
                  {this.pickerOptions()}
                </Picker>
              )}
            </View>

            <View >
              <TouchableHighlight
                block
                style={[styles.buttonContainer, styles.buttonAdd]}
                onPress={this.handlePress}
              >
                <Text style={styles.loginText}>Add</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                danger
                block
                style={[styles.buttonContainer, styles.buttonCancel]}
                onPress={this.props.closeModal}
              >
                <Text style={styles.loginText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    borderRadius: 30
  },
  buttonAdd: {
    backgroundColor: "#3176C2"
  },
  buttonCancel: {
    backgroundColor: "#FF0000"
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white",
    textAlign: 'center',
    paddingLeft: 5,
    marginLeft: 5
  },
  header: {
    fontSize: 20,
  }
})