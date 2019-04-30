import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, Permissions, FileSystem } from "expo";

import styles from "../styles/cameraStyle";
import Toolbar from "./toolbar.component";
import firebaseConnect from "../../firebaseConfig";
import * as firebase from "firebase";
import NoPhotos from '../components/NoPhotos';
import EventEnded from '../components/EventEnded';

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [], // stores all photos
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    event: {},
    user: {}
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleShortCapture = async () => {
    const { uri } = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [uri, ...this.state.captures],
      shutter: true
    });
    this.uploadImage(uri);
    this.setState({
      shutter: false
    })
    this.props.depreciatePhotosLeft();
  };

  _urlToBlob = url => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  uploadImage = async uri => {

    const currentEvent = this.state.event;
    this._urlToBlob(uri).then(blob => {
      const imageName = Date.now();
      const ref = firebaseConnect
        .storage()
        .ref()
        .child("images/" + imageName);

      const task = ref.put(blob);
      task.on(
        "state_changed",
        function (snapshot) {
        },
        function (error) {
          // Handle unsuccessful uploads
        },
        function () {

          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const { organiser, eventName, images = [] } = currentEvent;
            const docName = organiser.concat(eventName);

            const db = firebaseConnect.firestore();
            db.collection("events")
              .doc(docName)
              .update({
                images: firebase.firestore.FieldValue.arrayUnion(downloadURL)
              });
          });
        }
      );
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";

    const event = this.props.event;
    const { user } = this.props;
    this.setState({ hasCameraPermission, event, user });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      event
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    console.log(Date.now())
    if (event.eventEndDate.toMillis() < Date.now()) return <EventEnded />
    if (this.props.photosleft === 0) return <NoPhotos />
    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        </View>

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}