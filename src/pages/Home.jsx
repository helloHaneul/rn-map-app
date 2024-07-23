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
    { enableHighAccuracy: true, timeout: 10000 }
  );
};

const Home = () => {
  // const addressFile = require("../../Mapped-dong.json");
  // const address = JSON.parse(JSON.stringify(addressFile));
  // for (const dong of address) {
  //   const arr = dong;
  //   console.log(arr[0][0]);
  // }
  // console.log(Object.keys(address));

  getLocationAccPermission();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
