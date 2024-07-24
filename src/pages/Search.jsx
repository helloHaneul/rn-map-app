import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BasicHeader from "../components/BasicHeader";

const defaultRegion = "수궁동";
const defaultLatitude = 37.50065031882216;
const defaultLongitude = 126.83641399858068;

const Search = ({ navigation, route }) => {
  const headerRef = useRef(null);
  const [measure, setMeasure] = useState(null);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measureInWindow((left, top, width, height) => {
        if (height > 0) {
          setMeasure({ left, top, width, height });
          console.log(
            `left(${left}), top(${top}), width(${width}), height(${height})`
          );
        }
      });
    }
  }, [headerRef]);

  return (
    <SafeAreaView>
      <View ref={headerRef}>
        <BasicHeader
          title={route.params?.name ? route.params.name : defaultRegion}
          subs={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginVertical: "auto",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("SelectRegion")}
              >
                <Text style={{ fontSize: 16, fontWeight: "700" }}>동 검색</Text>
              </TouchableOpacity>
            </View>
          }
        />
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

export default Search;
