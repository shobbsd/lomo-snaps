import React from "react";
import { Component } from "react";
import { Button } from "react-native";

export default class Button extends Component {
  render() {
    const { label, onPress } = this.props;
    return <Button onPress={onPress} title={label} />;
  }
}
