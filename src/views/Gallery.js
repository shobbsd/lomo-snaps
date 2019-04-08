// import React from "react";
// import { View, Image, ScrollView } from "react-native";

// import styles from "../styles/cameraStyle";

// export default ({ captures = [] }) => (
//   <ScrollView
//     horizontal={true}
//     style={[styles.bottomToolbar, styles.galleryContainer]}
//   >
//     {captures.map(({ uri }) => (
//       <View style={styles.galleryImageContainer} key={uri}>
//         <Image source={{ uri }} style={styles.galleryImage} />
//       </View>
//     ))}
//   </ScrollView>
// );

import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import firebaseConnect from '../../firebaseConfig'

const storage = firebaseConnect.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images/1554725383867');

export default class Gallery extends Component {

  state = {
    imageURL: 'https://cdn.dribbble.com/users/421466/screenshots/2379575/replace-2r-400px.gif',   // default loading gif
    imageTimeCreated: new Date(),
  }

  getImageURL = () => {
    imagesRef.getDownloadURL()
      .then(url => { // `url` is the download URL for 'images/stars.jpg'
        this.setState({ imageURL: url })
      }).catch(function (error) {
        // Handle any errors
      });
  }

  // storage meta-data
  getImageTimeCreated = () => {
    imagesRef.getMetadata()
      .then(metadata => {
        console.log(metadata, '<< metadata')
        this.setState({ imageTimeCreated: new Date(metadata.timeCreated) })
        console.log(this.state, "<< state")
      }).catch(function (error) {
        // Handle any errors
      });
  }

  componentDidMount() {
    this.getImageURL()
    this.getImageTimeCreated()
  }

  render() {

    const { imageTimeCreated } = this.state
    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };  TODO
    const uiDate = imageTimeCreated.toLocaleDateString('en-GB')
    const uiTime = imageTimeCreated.toLocaleTimeString('en-GB')

    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://pbs.twimg.com/profile_images/578519382650974209/idoLfRxY_400x400.jpeg' }} />
                <Body>
                  <Text>Photo by: name</Text>
                  <Text>{uiDate} @ {uiTime}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              {/* <Image source={{ uri: 'gs://lomo-snaps.appspot.com/images/1554725383867' }} style={{ height: 200, width: null, flex: 1 }} /> */}
              <Image source={{ uri: this.state.imageURL }} style={{ height: 400, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}

// TODO better loading gif