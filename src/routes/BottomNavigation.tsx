import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import NavRight from "src/components/shared/NavRight";
import { Image, Platform, Text, useWindowDimensions, View } from "react-native";
import { useAppSelector } from "src/redux/hooks";

const BottomTabs = createBottomTabNavigator();

import { TouchableOpacity } from 'react-native';
import { HomeScreen } from "src/screens";
import Bage from "src/screens/Bage/Bage";
import Feed from "src/screens/Feed/Feed";
import { DrawerNavigation } from "./DrawerNavigation";
import Search from "src/screens/Search/Search";
import { moderateScale } from "react-native-size-matters";

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
        borderTopColor: focused ? '#1D3725' : 'transparent',
      }}
    >
      {children}
    </TouchableOpacity>
  );
};


export const BottomNavigation = () => {


  const { width } = useWindowDimensions();

  return (
    <View className="bg-transparent flex-1">
      <BottomTabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            borderRadius: 60,
            marginHorizontal: 7,
            marginBottom: Platform.OS === "android" ? 10 : 16,
            paddingBottom: 7,
            height: 72,
            backgroundColor: "#252525",
            overflow: "hidden"
          },
          tabBarLabelStyle: {
            fontSize: width > 450 ? 14 : 10,
            width: "100%",
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#C5BAFF",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: "HelveticaNeue-Black",
            
          },
          tabBarLabelPosition: "below-icon",
          headerTintColor: "#5b21b6",
        }}
      >


        <BottomTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitle: () => null,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }} className="">
                <Image source={require("../../assets/e-icon/home-olive.png")} style={{ width: 24, height: 24 }} />
                {focused && <Text className="text-center w-[50]" style={{ color: "#1D3725", fontSize: 10 }}>Home</Text>}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />


        <BottomTabs.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Image source={require("../../assets/e-icon/feed-olive.png")} style={{ width: 24, height: 24 }} />
                {focused && <Text className="text-center w-[50]" style={{ color: "#1D3725", fontSize: 10 }}>Feed</Text>}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />

        <BottomTabs.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Image source={require("../../assets/e-icon/search-olive.png")} style={{ width: 24, height: 24 }} />
                {focused && <Text className="text-center w-[50]" style={{ color: "#1D3725", fontSize: 10 }}>Search</Text>}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <BottomTabs.Screen
          name="Brand"
          component={Bage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>

                <Image source={require("../../assets/e-icon/brand-olive.png")} style={{ width: 24, height: 24 }} />
                {focused && <Text className="text-center w-[50]" style={{ color: "#1D3725", fontSize: 10 }}>Brand</Text>}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <BottomTabs.Screen
          name="DrawerProfile"
          component={DrawerNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }} className="">

                <Image source={require("../../assets/e-icon/profile-olive.png")} style={{ width: 24, height: 24 }} />
                {focused && <Text className="text-center w-[50]" style={{ color: "#1D3725", fontSize: 10 }}>Profile</Text>}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />


      </BottomTabs.Navigator>
    </View>
  );
};
