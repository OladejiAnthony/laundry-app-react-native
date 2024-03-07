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
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/ProductSlice";
import { useNavigation } from "@react-navigation/native";

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
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  //console.log("product array", product);

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = () => {
      services.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts(product);
  }, []);
  //console.log()

  const services = [
    {
      id: "0",
      image: "https://shopkiddieswearhouse.com/image/cache/catalog/2020%20DEC/Belk52-875x1000.jpg",
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
      image: "https://img.freepik.com/premium-vector/watercolor-hand-drawn-dress-gown-pastel-colors-isolated-white-background_847658-871.jpg",
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
      image: "https://janusmotorcycles.com/wp-content/uploads/2023/11/RacingSweaterBlack_Grey.webp",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://media.istockphoto.com/id/1483067375/photo/jeans-shorts-pants-for-men-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=CFBeq_-G2g8hcvM1vpon59dQjgXO2-NjJ6D4rI0k-Mw=",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://assets.vogue.com/photos/64b01699395709dba3d825c5/3:4/w_748%2Cc_limit/Layer_9.jpg",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  const cart = useSelector((state) => state.cart.cart);
  //console.log(cart);

  //Total
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  //console.log(cart);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/*Location & Profile*/}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View style={{ fontSize: 18, fontWeight: "600" }}>
            <Text>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.freepik.com/512/0/93.png",
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Pressable>
        </View>
        {/*Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/*Image Carousel*/}
        <Carousel />

        {/*Services */}
        <Services />

        {/*Products */}
        {product.map((item, index) => {
          return <DressItem item={item} key={index} />;
        })}

        {/* Bottom Navigation*/}
        {total === 0 ? null : (
          <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
                {cart.length} items | $ {total}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "white",
                  marginVertical: 6,
                }}
              >
                extra charges might apply
              </Text>
            </View>

            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
                Proceed to pickup
              </Text>
            </Pressable>
          </Pressable>
        )}
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

//1hr, 40mins
