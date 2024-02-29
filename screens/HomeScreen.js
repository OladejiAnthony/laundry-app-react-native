//rnfes
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "we are loading your location",
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services not enabbled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    //console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      //console.log(response);
      for (let item of response) {
        let address = `${item.name} ${item.street}, ${item.region} State.`;
        setDisplayCurrentAddress(address);
      }
    }
  };

    // products data 
    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
          name: "shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
          name: "T-shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
          name: "dresses",
          quantity: 0,
          price: 10,
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
          name: "jeans",
          quantity: 0,
          price: 10,
        },
        {
          id: "14",
          image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
          name: "Sweater",
          quantity: 0,
          price: 10,
        },
        {
          id: "15",
          image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
          name: "shorts",
          quantity: 0,
          price: 10,
        },
        {
          id: "16",
          image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
          name: "Sleeveless",
          quantity: 0,
          price: 10,
        },
    ];

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView >
         {/*Location & Profile*/}
         <View style={{flexDirection: "row", alignItems: "center", padding: 10}}>
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View style={{ fontSize: 18, fontWeight: "600" }}>
            <Text>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable style={{marginLeft: "auto", marginRight: 7}}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AF2bZyiaRZafvFoQRmx220qEimQMcp6yg1hR9rBjo3lMJA=s32-c-mo",
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Pressable>
        </View>
        {/*Search Bar */}
        <View style={{padding: 10, margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: 7}}>
          <TextInput  
              placeholder="Search for items or More"

          />
          <Feather name="search" size={24} color="#fd5c63"  /> 
        </View>

        {/*Image Carousel*/}
        <Carousel />

        {/*Services */}
        <Services />

        {/*Products */}
        {services.map((item, index) => {
          return (
            <DressItem item={item} key={index} /> 
          )
        })}


      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "#F0F0F0",
    flexGrow: 1,
  },
});

//

