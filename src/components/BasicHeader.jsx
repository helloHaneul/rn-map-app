import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const leftArrow = require("../assets/icons/back.png");

const BasicHeader = ({ title, subs }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.backArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={styles.backButton} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleArea}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.subArea}>{subs}</View>
    </View>
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
  backArea: {
    flex: 1,
  },
  titleArea: {
    flex: 1,
    alignItems: "center",
  },
  subArea: {
    flex: 1,
  },
  backButton: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 19.97,
    color: "#000",
  },
});

export default BasicHeader;
