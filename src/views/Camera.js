import React from "react";
import { View, Text } from "react-native";
import { Camera, Permissions, FileSystem } from "expo";

import styles from "../styles/cameraStyle";
import Toolbar from "./toolbar.component";
import firebaseConnect from "../../firebaseConfig";
import { database } from "firebase";

// import * as firebase from "firebase";
// import Gallery from "./Gallery";

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [], // stores all photos
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    user: {}
  };

  getUser = () => {
    const db = firebaseConnect.firestore();
    const dbRef = db.collection("users").doc("bUmnUiS6N91y4BfC2Q49");

    dbRef.get().then(doc => {
      this.setState({ user: doc.data() });
      console.log(this.state.user, "this");
    });
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  //   handleCaptureOut = () => {
  //     if (this.state.capturing) this.camera.stopRecording();
  //   };

  handleShortCapture = async () => {
    const { uri } = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [uri, ...this.state.captures]
    });
    this.uploadImage(uri)
      .then(res => {
        console.log(res, "success");
      })
      .catch(console.log);
    console.log(this.state.captures, "this");
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
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  };

  uploadImage = async uri => {
    // console.log(uri, "uri");
    // const response = await FileSystem.getInfoAsync(uri);
    // console.log(response, "res");

    this._urlToBlob(uri)
      .then(blob => {
        const imageName = Date.now();
        const ref = firebaseConnect
          .storage()
          .ref()
          .child("images/" + imageName);

        return ref.put(blob);
      })
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  };

  //   handleLongCapture = async () => {
  //     const videoData = await this.camera.recordAsync();
  //     this.setState({
  //       capturing: false,
  //       captures: [videoData, ...this.state.captures]
  //     });
  //   };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    // const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = camera.status === "granted";
    //    && audio.status === "granted";

    this.getUser();
    this.setState({ hasCameraPermission });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

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

        {/* {captures.length > 0 && <Gallery captures={captures} />} */}

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          //   onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
