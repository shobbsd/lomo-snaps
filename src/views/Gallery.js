import React, { Component } from "react";
import { View, Image } from "react-native";
import firebaseConnect from "../../firebaseConfig";

export default class Gallery extends Component {
  state = {
    images: ""
  };
  componentDidMount() {
    const storage = firebaseConnect.storage().ref();
    storage
      .child("/images/1554477181787")
      .getDownloadURL()
      .then(url => {
        this.setState({ images: url });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: 300, height: 500 }}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/lomo-snaps.appspot.com/o/images%2F1554477181787?alt=media&token=e008e275-ca56-461e-a7dd-bf93aa63dd71"
          }}
        />
      </View>
    );
  }
}
