import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";

const homeOn = require("../assets/icons/bottombar_main_fill.png");
const homeOff = require("../assets/icons/bottombar_main.png");
const searchOn = require("../assets/icons/bottombar_search_fill.png");
const searchOff = require("../assets/icons/bottombar_search.png");
const communityOn = require("../assets/icons/bottombar_community_fill.png");
const communityOff = require("../assets/icons/bottombar_community.png");
const mypageOn = require("../assets/icons/bottombar_mypage_fill.png");
const mypageOff = require("../assets/icons/bottombar_mypage.png");

const CustomBottomTab = ({ state, navigation, insets, descriptors }) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;

  const scaleAnimated = (value, animatedValue) =>
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 150,
    });

  const animatedValues = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
  };

  return (
    <View
      style={[styles.BottomTabBarWrapper, { paddingBottom: insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        const animatedOf = animatedValues[index];

        const iconFlag = (bool) => {
          switch (label) {
            case "홈":
              return bool ? homeOn : homeOff;
            case "검색":
              return bool ? searchOn : searchOff;
            case "채팅":
              return bool ? communityOn : communityOff;
            default:
              return bool ? mypageOn : mypageOff;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          scaleAnimated(1, animatedOf).start(({ finished }) => {
            if (finished) {
              scaleAnimated(0, animatedOf).start();
            }
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Animated.Image
              source={iconFlag(isFocused)}
              resizeMode={"contain"}
              style={{
                width: 24,
                height: 24,
                transform: [
                  {
                    scale: animatedOf.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.9],
                    }),
                  },
                ],
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  BottomTabBarWrapper: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    borderStyle: "solid",
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#EEE",
    backgroundColor: "#FFF",
    paddingTop: 10,
    zIndex: 10,
  },
});
export default CustomBottomTab;
