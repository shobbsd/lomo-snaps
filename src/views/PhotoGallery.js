import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet
} from "react-native";

import PhotoGrid from "react-native-image-grid";

export default class PhotoGallery extends React.Component {
  state = {
    imageuri: "",
    ModalVisibleStatus: false,
    items: [{ id: 0, src: "http://placehold.it/200x200?text=due%20soon" }]
  };


  componentDidMount() {
    const { imagesArray, eventDevelopDate } = this.props;

    if (imagesArray.length > 0) {
      if (
        imagesArray.length !== 0 &&
        Date.now() > eventDevelopDate.toMillis() + 3600000
      ) {
        const updateGallery = imagesArray.map((imgSRC, i) => {
          return { id: i, src: imgSRC }; // make objects
        });

        this.setState({ items: updateGallery });
      } else if (
        imagesArray.length !== 0 &&
        Date.now() < eventDevelopDate.toMillis() + 3600000
      ) {
        const items = Array.apply(null, Array(imagesArray.length)).map(
          (v, i) => {
            return {
              id: i,
              src: "http://placehold.it/200x200?text=due%20soon..."
            };
          }
        );
        this.setState({ items });
      } else {
        const items = {
          id: 1,
          src: "http://placehold.it/200x200?text=Take%20some%20photos!"
        };
        this.setState({ items });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
  }

  ShowModalFunction(visible, imageURL) {
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL
    });
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal
        }}
        onPress={() => {
          this.ShowModalFunction(true, item.src);
        }}
      >
        <Image
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: item.src }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType={"fade"}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus, "");
          }}
        >
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus, "");
              }}
            >
              <Image
                source={{
                  uri:
                    "https://aboutreact.com/wp-content/uploads/2018/09/close.png"
                }}
                style={{ width: 25, height: 25, marginTop: 16 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return (
        <View style={styles.containerStyle}>
          <PhotoGrid
            data={this.state.items}
            itemsPerRow={3}
            itemMargin={1}
            itemPaddingHorizontal={1}
            renderHeader={this.renderHeader}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    flex: 1,
    marginTop: 0
  },
  fullImageStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "98%",
    resizeMode: "contain"
  },
  modelStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: "absolute"
  }
});
