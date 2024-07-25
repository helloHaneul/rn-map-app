import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { getValueFromStorage } from "../utils/Storage";

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

const Splash = ({ navigation }) => {
  const [myLocation, setMyLocation] = useState();

  const getLocationInfo = async () => {
    const storedLocation = await getValueFromStorage("my-dong");

    if (!storedLocation) {
      getLocationAccPermission();
      setMyLocation("수궁동"); // TODO: should be revised (get addres by position)
    } else {
      setMyLocation(storedLocation);
    }
  };

  getLocationInfo();

  useEffect(() => {
    if (myLocation) {
      setTimeout(() => {
        navigation.replace("MainTab", {
          myLocation: myLocation,
        });
      }, 5000);
    }
  }, [myLocation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
