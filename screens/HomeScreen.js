import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Alert } from 'react-native'
import * as Location from "expo-location"


const HomeScreen = () => {
const [displayCurrentAddress, setDisplayCurrentAddress] = useState("we are loading your location")
const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)

 useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
 },[])

 const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if(!enabled) {
        Alert.alert(
            'Location Services not enabbled', 
            'Please enable the location services', 
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        );
    } else {
        setLocationServicesEnabled(enabled)
    }
 }

 const getCurrentLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            'Permission denied', 
            'Allow the app to use the location services', 
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        );
    }

    const {coords} = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
        const {latitude, longitude} = coords;
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        console.log(response)
        for (let item of response) {
            let address = `${item.name} ${item.city} ${item.postalCode}`
            setDisplayCurrentAddress(address)
        }
    }
  }
  return (
    <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar style="auto" />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    SafeAreaView : {
        paddingTop: StatusBar.currentHeight || 0
    }
})

//22mins
