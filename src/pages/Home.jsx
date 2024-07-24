import React from "react";
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Home = ({ navigation }) => {
  getLocationAccPermission();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.headerWrapper}>
        <View style={styles.locationTitle}>
          <Text>현재</Text>
          <Text style={styles.currLocation}>수궁동</Text>
          <Text>입니다.</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchLocationBorder}
            onPress={() => navigation.navigate("MyPlace")}
          >
            <Text style={styles.searchLocation}>다른 동네</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flx: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    justifyContent: "space-between",
  },
  locationTitle: {
    flexDirection: "row",
    gap: 8,
    alignItems: "baseline",
  },
  currLocation: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 19.97,
    color: "#000",
  },
  searchLocationBorder: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    borderColor: "#c8c8c8",
  },
  searchLocation: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Home;
