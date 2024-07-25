import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: use Google Geocoding API
// 시뮬레이터 환경에서 위도,경도 정보 정확하지 않음
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
  Geolocation.getCurrentPosition(
    (position) => {
      console.log("current position => ", position);
    },
    (error) => {
      console.log("error =========> ", error);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
};

const getLocationInfo = async () => {
  try {
    const location = await AsyncStorage.getItem("my-dong");
    //console.log(`my-dong => ${location}`);
  } catch (error) {
    console.log(error);
  }
};

const Splash = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getLocationInfo();

    getLocationAccPermission();

    navigation.replace("MainTab");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
