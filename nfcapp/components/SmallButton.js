import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

 function SmallButton({ buttonTitle, ...rest }) {
    return (
      <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
    }

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth / 4.5,
    height: windowHeight / 22.5,
    backgroundColor: 'darkgrey',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff'
  }
});