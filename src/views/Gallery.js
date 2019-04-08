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
// import { Font } from 'expo';
// import { Ionicons } from '@expo/vector-icons';

const storage = firebaseConnect.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images/1554725383867');
// const imageURL = imagesRef.getDownloadURL()
// console.log(imagesRef);

export default class Gallery extends Component {

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  //     ...Ionicons.font,
  //   });
  // }

  state = {
    imageURL: ''
  }

  getImageURL = () => {
    imagesRef.getDownloadURL()
      .then(url => { // `url` is the download URL for 'images/stars.jpg'
        console.log(url, '<< URL')
        this.setState({ imageURL: url })
        console.log(this.state, "<< this.state")
      }).catch(function (error) {
        // Handle any errors
      });
  }

  componentDidMount() {
    this.getImageURL()
  }

  render() {

    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://pbs.twimg.com/profile_images/578519382650974209/idoLfRxY_400x400.jpeg' }} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              {/* <Image source={{ uri: 'gs://lomo-snaps.appspot.com/images/1554725383867' }} style={{ height: 200, width: null, flex: 1 }} /> */}
              <Image source={{ uri: this.state.imageURL }} style={{ height: 200, width: null, flex: 1 }} />
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
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}
