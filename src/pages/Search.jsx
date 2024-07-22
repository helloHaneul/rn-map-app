import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import BasicHeader from "../components/BasicHeader";

const Search = () => {
  return (
    <SafeAreaView>
      <View>
        <BasicHeader title={"수궁동"} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Search</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
