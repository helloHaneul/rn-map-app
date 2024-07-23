import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import BasicHeader from "../components/BasicHeader";

const Search = ({ navigation }) => {
  // TODO: 현재 위치 기반으로 지도 표시
  return (
    <SafeAreaView>
      <View>
        <BasicHeader
          title={"수궁동"}
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
