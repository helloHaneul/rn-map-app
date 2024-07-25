import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const more = require("../assets/icons/more.png");

const dummy_products = [
  {
    id: 1,
    img: "https://picsum.photos/200/200",
    title: "Midea 냉장고 87L",
    location: "역곡동",
    price: "140,000원",
  },
  {
    id: 2,
    img: "https://picsum.photos/200/200",
    title: "라면장 판매합니다.",
    location: "개봉동",
    price: "250,000원",
  },
  {
    id: 3,
    img: "https://picsum.photos/200/200",
    title: "1인용 패브릭 쇼파",
    location: "역곡동",
    price: "80,000원",
  },
  {
    id: 4,
    img: "https://picsum.photos/200/200",
    title: "전신거울 나눔합니다. 무겁습니다",
    location: "역곡동",
    price: "0원",
  },
  {
    id: 5,
    img: "https://picsum.photos/200/200",
    title: "대통령 벽시계",
    location: "고척동",
    price: "100,000원",
  },
  {
    id: 6,
    img: "https://picsum.photos/200/200",
    title: "닌텐도 스위치",
    location: "천왕동",
    price: "150,000원",
  },
  {
    id: 7,
    img: "https://picsum.photos/200/200",
    title: "가찌아 커피머신",
    location: "신정7동",
    price: "100,000원",
  },
];

const Home = ({ navigation, route }) => {
  // TODO: 현재 위치(stored my location)정보 useState로 관리하기

  const renderProducts = ({ item, index }) => {
    return (
      <View
        style={{
          padding: 12,
          marginVertical: 4,
          borderBottomColor: "#EAEAEA",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Image
              source={{ uri: item.img }}
              style={{ width: 100, height: 100, borderRadius: 4 }}
            />
            <View style={{ width: "60%", gap: 4 }}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productLocation}>{item.location}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
            <Image source={more} style={{ width: 24, height: 24 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.headerWrapper}>
        <View style={styles.locationTitle}>
          <Text>현재</Text>
          <Text style={styles.currLocation}>{route.params.myLocation}</Text>
          <Text>입니다.</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchLocationBorder}
            onPress={() =>
              navigation.navigate("MyPlace", { name: route.params.myLocation })
            }
          >
            <Text style={styles.searchLocation}>다른 동네</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
          backgroundColor: "#FFF",
        }}
      >
        <FlatList
          data={dummy_products}
          renderItem={renderProducts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
        />
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
  productTitle: {
    fontSize: 16,
  },
  productLocation: {
    fontSize: 10,
    color: "#828282",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Home;
