import React from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { View, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";

const getLocationAccPermission = async () => {
  if (Platform.OS === "android") {
    const andr_granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (andr_granted === PermissionsAndroid.RESULTS.GRANTED) {
      getMyLocation();
    }
  } else {
    const ios_granted = await Geolocation.requestAuthorization("always");
    if (ios_granted === "granted") {
      getMyLocation();
    }
  }
};

const getMyLocation = () => {
  console.log("get My Location =========> ");
  Geolocation.getCurrentPosition(
    (position) => {
      console.log("position =========> ", position);
    },
    (error) => {
      console.log("error =========> ", error);
    },
    { enableHighAccuracy: false, timeout: 10000 }
  );
};

const Home = () => {
  getLocationAccPermission();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
