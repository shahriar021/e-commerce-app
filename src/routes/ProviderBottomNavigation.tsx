import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import NavRight from "src/components/shared/NavRight";
import { Image, Platform, useWindowDimensions, View } from "react-native";
import { useAppSelector } from "src/redux/hooks";

const BottomTabs = createBottomTabNavigator();

import { TouchableOpacity } from 'react-native';
import { HomeScreen } from "src/screens";
import Bage from "src/screens/Bage/Bage";
import Feed from "src/screens/Feed/Feed";
import { DrawerNavigation } from "./DrawerNavigation";
import Search from "src/screens/Search/Search";
import ProviderHomePage from "src/screens/Home/ProviderHomePage";

const CustomTabBarButton = ({ children, onPress, accessibilityState }: any) => {
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 5,
        borderTopColor: focused ? '#DCF3FF' : 'transparent',
      }}
    >
      {children}
    </TouchableOpacity>
  );
};


export const ProviderBottomNavigation = () => {


  const { width } = useWindowDimensions();

  return (
    <View className="bg-transparent flex-1">
      <BottomTabs.Navigator
        screenOptions={{
          tabBarStyle: {
            borderRadius: 60,
            marginHorizontal: 7,
            marginBottom: Platform.OS === "android" ? 10 : 16,
            paddingBottom: 7,
            height: 68,
            backgroundColor: "#252525",
            overflow: "hidden"
          },
          tabBarLabelStyle: {
            fontSize: width > 450 ? 14 : 12,
            width: "100%",
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#C5BAFF",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarLabelPosition: "below-icon",
          headerTintColor: "#5b21b6",
        }}
      >


        <BottomTabs.Screen
          name="Home"
          component={ProviderHomePage}
          options={{
            headerShown:false,
            headerTitle: () => null,
            tabBarIcon: ({ color, size }) => (
              <Image source={require("../../assets/e-icon/home-2.png")} style={{ width: 24, height: 24 }} />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />


        <BottomTabs.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={require("../../assets/e-icon/image 2.png")} style={{ width: 24, height: 24 }} />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />

        <BottomTabs.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={require("../../assets/e-icon/search-zoom-out.png")} style={{ width: 24, height: 24 }} />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <BottomTabs.Screen
          name="Brand"
          component={Bage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View className="relative">

                <Image source={require("../../assets/e-icon/medal-star.png")} style={{ width: 24, height: 24 }} />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <BottomTabs.Screen
          name="Profile"
          component={DrawerNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <View className="relative">

                <Image source={require("../../assets/e-icon/profile.png")} style={{ width: 24, height: 24 }} />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />


      </BottomTabs.Navigator>
    </View>
  );
};
