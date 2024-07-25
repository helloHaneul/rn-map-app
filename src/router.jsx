import React, { useEffect } from "react";
import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./pages/Splash";
import CustomBottomTab from "./components/CustomBottomTab";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import MyInfo from "./pages/MyInfo";
import MyPage from "./pages/MyPage";
import MyPlace from "./pages/MyPlace";
import SelectRegion from "./pages/SelectRegion";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = (props) => <CustomBottomTab {...props} />;

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyInfo' component={MyInfo} />
      <Stack.Screen name='MyPage' component={MyPage} />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  );
};

const MainTab = ({ route }) => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='홈'
        component={Home}
        initialParams={{
          myLocation: route?.params?.myLocation
            ? route?.params?.myLocation
            : "수궁동",
        }}
      />
      <Tab.Screen name='검색' component={Search} />
      <Tab.Screen name='채팅' component={Chat} />
      <Tab.Screen name='프로필' component={LoginStack} />
    </Tab.Navigator>
  );
};

const Router = () => {
  useEffect(() => {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization("always");
    }
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Splash'
        component={Splash}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen name='MainTab' component={MainTab} />
      <Stack.Screen name='MyPlace' component={MyPlace} />
      <Stack.Screen name='SelectRegion' component={SelectRegion} />
    </Stack.Navigator>
  );
};

export default Router;
