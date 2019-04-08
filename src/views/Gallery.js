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
import { View, Text } from "react-native";

export default class Gallery extends Component {
  render() {
    return (
      <View>
        <Text>Events</Text>
      </View>
    );
  }
}
