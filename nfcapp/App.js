import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text,  Button, TouchableOpacity, Image } from 'react-native';

import {BarIndicator} from 'react-native-indicators';

import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

import Modal from 'react-native-modal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ scanned, setScanned ] = useState(false);
  const [ scanMode, setScanMode] = useState(false);

  function readNdef() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
  
    return new Promise((resolve) => {
      let tagFound = null;
  
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound);
        makePost()
        setScanMode(false)
        setScanned(true)
        setModalOpen(false)
        NfcManager.setAlertMessageIOS('NDEF tag found');
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
  
      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });
  
      NfcManager.registerTagEvent();
    });
  }

  function makePost() {
    fetch('https://hfc-nfc-flask.herokuapp.com/nfc', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      imei: 'AA-BBBBBB-CCCCCC-D'
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
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>Scanning</Text>
          <BarIndicator size={50} count={5} color={'#3888EA'}></BarIndicator>
          <View style={{paddingBottom: 30}}>
          <Text style={{fontSize: 14, textAlign: 'center'}}>Hold your phone near the NFC tag</Text>
          <Text style={{fontSize: 14, textAlign: 'center'}}>to login</Text>
          </View>
          <View style={{paddingBottom: 20}}>
          <Button
          title="Cancel"
          color="#3888EA"
          onPress={() => setScanMode(false)}
          />
          </View>
        </View>
      </View>
      </View>
    )
  }

  function WaitingDisplay() {
    return (
      <View style={styles.container}>
        <Modal
        isVisible={modalOpen}
        style={styles.view}>
        <View style={styles.scanBox}>
          <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>Scanning</Text>
          <BarIndicator size={50} count={5} color={'#3888EA'}></BarIndicator>
          <View style={{paddingBottom: 30}}>
          <Text style={{fontSize: 14, textAlign: 'center'}}>Hold your phone near the NFC tag</Text>
          <Text style={{fontSize: 14, textAlign: 'center'}}>to login</Text>
          </View>
          <View style={{paddingBottom: 20}}>
          <Button
          title="Cancel"
          color="#3888EA"
          onPress={() => setModalOpen(false)}
          />
          </View>
        </View>
        </View>
        </Modal>
        <View style={{paddingTop: 100}}>
        <Text style={{fontWeight: 'bold', fontSize: 26, textAlign: 'center'}}>Scan complete!</Text>
        </View>
        <View style={{paddingTop: 150, alignContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 80, height: 100}}
          source={require('./images/nfc.png')}
        />
        </View>
        <View style={{alignItems: 'center', paddingTop: 200}}>
        <TouchableOpacity
        onPress={() => setScanned(false)}
        style={(styles.roundButton1)}>
        <Text style={{color: 'white', fontSize: 20}}>Go back</Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }

  function changeScan() {
    readNdef()
    setModalOpen(true)

  }

  function HomeDisplay() {
    return (
      <View style={styles.container}>
        <Modal
        isVisible={modalOpen}
        style={styles.view}>
        <View style={styles.scanBox}>
          <View style={{paddingTop: 150}}>
          <Text style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>Scanning</Text>
          <BarIndicator size={50} count={5} color={'#3888EA'}></BarIndicator>
          <View style={{paddingBottom: 30}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Hold your phone near the NFC tag</Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}>to login</Text>
          </View>
          <View style={{paddingBottom: 150}}>
          <Button
          title="Cancel"
          color="#3888EA"
          onPress={() => setModalOpen(false)}
          />
          </View>
        </View>
        </View>
        </Modal>
        <View style={{paddingTop: 100}}>
        <Text style={{fontWeight: 'bold', fontSize: 26, textAlign: 'center'}}>Welcome to Scanner App!</Text>
        </View>
        <View style={{paddingTop: 150, alignContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 80, height: 100}}
          source={require('./images/nfc.png')}
        />
        </View>
        <View style={{alignItems: 'center', paddingTop: 200}}>
        <TouchableOpacity
        onPress={() => changeScan()}
        style={(styles.roundButton1)}>
        <Text style={{color: 'white', fontSize: 20}}>Scan</Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }

  function Display() {
    if (scanned == true) {
      return WaitingDisplay()
    }

    if (scanMode == false) {
      return HomeDisplay() 
    } else {
      return ScannedDisplay()  
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
    backgroundColor: '#3888EA',
  },
  scanBox: {
    backgroundColor: 'white',
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
    borderColor: 1,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});