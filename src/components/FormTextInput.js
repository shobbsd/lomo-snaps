import React, { Component } from "react";
import { TextInput } from "react-native-gesture-handler";

export default class FormTextInput extends Component {
  render() {
    const {
      onChangeText,
      placeholder,
      password,
      autoCapitalize,
      value,
      keyboardType
    } = this.props;
    return (
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={password}
        autoCapitalize={autoCapitalize}
        value={value}
      />
    );
  }
}
