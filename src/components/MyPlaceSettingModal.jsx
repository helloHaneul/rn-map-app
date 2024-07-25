import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { setValueToStorage } from "../utils/Storage";

const MyPlaceSettingModal = ({
  isVisible,
  setIsVisible,
  selectedDong,
  selectedLocation,
  navigation,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const storeMyDong = async (dong) => {
    await setValueToStorage("my-dong", dong);
  };

  const handleOnPress = (isSet) => {
    setIsVisible(!isVisible);

    if (isSet) {
      storeMyDong(selectedDong);

      navigation.navigate("MyPlace", {
        name: selectedDong,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  return (
    <View>
      <Modal
        useNativeDriver
        isVisible={isVisible}
        animationIn={"slideInUp"}
        animationInTiming={300}
        animationOut={"slideOutDown"}
        animationOutTiming={300}
        backdropOpacity={0.4}
        backdropColor='#000'
        style={{ margin: 0, alignItems: "center", justifyContent: "flex-end" }}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        onBackButtonPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        hideModalContentWhileAnimating
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={8}
          style={{ width: "100%" }}
        >
          <View
            style={{
              padding: 20,
              paddingHorizontal: 16,
              height: SCREEN_HEIGHT / 4,
              backgroundColor: "#FFF",
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
            }}
          >
            <View
              pointerEvents='none'
              style={{
                position: "absolute",
                top: 16,
                left: 0,
                right: 0,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 4,
                  borderRadius: 4,
                  backgroundColor: "#EEE",
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  우리 동네로 설정하시겠습니까?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 32,
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "flex-start",
                  marginTop: 16,
                }}
              >
                <Pressable
                  style={styles.buttonYes}
                  onPress={() => handleOnPress(true)}
                >
                  <Text style={styles.textStyle}>예</Text>
                </Pressable>
                <Pressable
                  style={styles.buttonNo}
                  onPress={() => handleOnPress(false)}
                >
                  <Text style={styles.textStyle}>아니오</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonYes: {
    borderRadius: 16,
    backgroundColor: "#666464",
  },
  buttonNo: {
    borderRadius: 16,
    backgroundColor: "#db4242",
  },
  textStyle: {
    padding: 12,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MyPlaceSettingModal;
