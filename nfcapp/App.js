import React, { useState, useEffect } from 'react';

import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';

export default function App() {

  const [ scanned, setScanned ] = useState(false);

  function ScannedDisplay() {
    return (
      <View style={styles.container}>
        <View style={{flex: 5, alignContent: 'center', alignItems: 'center'}}>
          <Text>Scan App</Text>
        </View>
        <View style={{flex: 5, alignContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 3, borderRadius: 20}}>
          <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Ready to scan</Text>
          <View style={{paddingTop: 200}}>
          <Text style={{fontSize: 14, textAlign: 'center'}}>Hold your phone near the NFC tag</Text>
          <Text style={{fontSize: 14, textAlign: 'center'}}>to unlock ur phone</Text>
          <View style={{paddingTop: 20}}>
          <Button
          title="Cancel"
          color="darkgrey"
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
        <Text>scanned</Text>
      </View>
    )
  }

  function Display() {
    if (scanned) {
      ScannedDisplay()
    } else {
      WaitingDisplay()
    }
  }
  
  return (
    ScannedDisplay()
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  }
});


