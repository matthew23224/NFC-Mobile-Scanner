import React, { useState, useEffect } from 'react';

import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, TouchableOpacity, Image } from 'react-native';

export default function App() {

  const [ scanned, setScanned ] = useState(false);
  const [ scanMode, setScanMode] = useState(false);

  function makePost() {
    fetch('https://hcs-nfc-prototype.herokuapp.com/nfc', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: 'https://hcs-nfc-prototype.herokuapp.com/in'
    })
  }).then((response) => console.log(response))
  }

  function ScannedDisplay() {
    return (
      <View style={styles.container}>
        <View style={{flex: 5, alignContent: 'center', alignItems: 'center'}}>
          
        </View>
        <View style={styles.scanBox}>
          <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Ready to scan</Text>
          <View style={{alignItems: 'center', paddingTop: 50}}>
          <Image
          style={{width: 80, height: 100}}
          source={require('./images/nfc.png')}
          />
          </View>
          <View style={{paddingTop: 50}}>
          <Text style={{fontSize: 14, textAlign: 'center'}}>Hold your phone near the NFC tag</Text>
          <Text style={{fontSize: 14, textAlign: 'center'}}>to unlock ur phone</Text>
          <View style={{paddingTop: 20}}>
          <Button
          title="Send"
          color="darkgrey"
          onPress={() => makePost()}
          />
          <Button
          title="Cancel"
          color="darkgrey"
          onPress={() => setScanMode(false)}
          />
          </View>
          </View>
          </View>
          
        </View>
      </View>
    )
  }

  function WaitingDisplay() {
    return (
      <View style={styles.container}>
        <Text>Scan complete</Text>
      </View>
    )
  }

  function HomeDisplay() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop: 100}}>
        <Text style={{fontWeight: 'bold', fontSize: 26, textAlign: 'center'}}>Welcome to Scanner App!</Text>
        </View>
        
        <View style={{alignItems: 'center', paddingTop: 500}}>
        <TouchableOpacity
        onPress={() => setScanMode(true)}
        style={(styles.roundButton1)}>
        <Text style={{color: 'white', fontSize: 20}}>Scan</Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }

  function Display() {
    if (scanMode == false) {
      return (
        HomeDisplay()
      )
    } else {
      if (scanned == false) {
        return ScannedDisplay()
      }
    }
    
  }
  
  return (
    Display()
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'darkgrey',
  },
  scanBox: {
    flex: 5, 
    alignContent: 'center', 
    alignItems: 'center', 
    shadowColor: "#000",
    shadowOffset: {
  	  width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    
  }
});


