import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const close = require("../assets/icons/close.png");

const defaultRegion = "수궁동";
const defaultLatitude = 37.50065031882216;
const defaultLongitude = 126.83641399858068;

const MyPlace = ({ navigation, route }) => {
  const headerRef = useRef(null);
  const [measure, setMeasure] = useState(null);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measureInWindow((left, top, width, height) => {
        if (height > 0) {
          setMeasure({ left, top, width, height });
        }
      });
    }
  }, [headerRef]);

  return (
    <SafeAreaView>
      <View ref={headerRef}>
        <View style={styles.headerWrapper}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={close} style={styles.closeButton} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.headerTitle}>
              {route.params?.name ? route.params.name : defaultRegion}
            </Text>
          </View>

          <View style={styles.searchButton}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectRegion")}
            >
              <Text style={{ fontSize: 16, fontWeight: "700" }}>동 검색</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {headerRef && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            top: measure?.height ? measure.height + 10 : 100,
            height: SCREEN_HEIGHT,
          }}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ ...StyleSheet.absoluteFillObject }}
            region={{
              latitude: route.params?.latitude
                ? route.params.latitude
                : defaultLatitude,
              longitude: route.params?.longitude
                ? route.params.longitude
                : defaultLongitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </View>
      )}
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
  },
  titleArea: {
    flex: 1,
    alignItems: "center",
  },
  closeButton: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19.97,
    color: "#000",
  },
  searchButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: "auto",
    borderWidth: 0.5,
    borderColor: "#c8c8c8",
    borderRadius: 4,
    padding: 4,
  },
});

export default MyPlace;
