import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
// import axios from 'axios';
import firebaseConnect from '../../firebaseConfig';

// STORAGE
const storage = firebaseConnect.storage();
const storageRef = storage.ref();
const singleImageRef = storageRef.child('images/1554725383867');

// DATABASE
const db = firebaseConnect.firestore()

// CLASS
export default class Gallery extends Component {

  state = {
    //imageURL: 'https://cdn.dribbble.com/users/421466/screenshots/2379575/replace-2r-400px.gif',   // default loading gif
    imageTimeCreated: new Date(),
    imageStorageURLs: [],
  }

  // get array of images from album
  // album is a collection of images and cannot identify which user took the photo
  getImageStorageURLs = () => {
    const urls = []
    db.collection("album").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = doc.data()
          urls.push(docData.photoURL)
        });
        return urls
      })
      .then((urls) => {
        // console.log(urls, '<< urls')
        this.setState({ imageStorageURLs: urls })
        console.log(this.state, '<< this.state')
      })
  }

  // TODO remove, single hard-coded image
  getImageURL = () => {
    singleImageRef.getDownloadURL()
      .then(url => { // `url` is the download URL for 'images/stars.jpg'
        this.setState({ imageURL: url })
      }).catch(function (error) {
        // Handle any errors
      });
  }

  // TODO remove, single hard-coded image
  // storage meta-data
  getImageTimeCreated = () => {
    singleImageRef.getMetadata()
      .then(metadata => {
        // console.log(metadata, '<< metadata')
        this.setState({ imageTimeCreated: new Date(metadata.timeCreated) })
        // console.log(this.state, "<< state")
      }).catch(function (error) {
        // Handle any errors
      });
  }

  componentDidMount() {
    // this.getImageURL()
    // this.getImageTimeCreated()
    this.getImageStorageURLs()
  }

  render() {

    const { imageTimeCreated } = this.state;
    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };  TODO
    const uiDate = imageTimeCreated.toLocaleDateString('en-GB')
    const uiTime = imageTimeCreated.toLocaleTimeString('en-GB')

    const { imageStorageURLs } = this.state;

    // =map
    const galleryCards = imageStorageURLs.map(imageStorageURL => {

      const storageRef = firebaseConnect.storage();

      storageRef
        .refFromURL(`gs://lomo-snaps.appspot.com/images/${imageStorageURL}`)
        .getDownloadURL()
        .then(imageURLplusToken => {
          return imageURLplusToken
        });


      return <Card key={imageStorageURL}>
        {/* <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'https://pbs.twimg.com/profile_images/578519382650974209/idoLfRxY_400x400.jpeg' }} />
                <Body>
                  <Text>Photo by: name</Text>
                  <Text>{uiDate} @ {uiTime}</Text>
                </Body>
              </Left>
            </CardItem> */}
        <CardItem cardBody>
          {/* <Image source={{ uri: 'https://lomo-snaps.appspot.com/images/1554725383867' }} style={{ height: 200, width: null, flex: 1 }} /> */}
          <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/lomo-snaps.appspot.com/o/images/${imageStorageURL}?alt=media&token=864a82af-de5d-4d8e-b7a0-c774d3559104` }} style={{ height: 200, width: null, flex: 1 }} />
          {/* <Image source={{ uri: `gs://lomo-snaps.appspot.com/images/${imageStorageURL}` }} style={{ height: 400, width: null, flex: 1 }} /> */}
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
    })

    return (
      <Container>
        <Header />
        <Content>
          {galleryCards}
        </Content>
      </Container>
    );
  }

}

// TODO better loading gif
// REF https://github.com/firebase/quickstart-js/blob/master/firestore/scripts/FriendlyEats.Data.js