import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Platform, useWindowDimensions, Image } from "react-native";
import { HomeScreen, Profile } from "src/screens";
import CartPage from "src/screens/Cart/CartPage";
import MyOrders from "src/screens/Orders/MyOrders";
import { scale, verticalScale } from "react-native-size-matters";
import RiderHomePage from "src/screens/Home/RiderHomePage";
import RiderOrder from "src/screens/Orders/RiderOrder";
import EarningList from "src/screens/Earning/EarningList";

const BottomTabs = createBottomTabNavigator();

const ACTIVE_BG_COLOR = "#c21a1e";
const ACTIVE_ICON_COLOR = "#fff";

export const RiderBottomNavigation = () => {
  const { width } = useWindowDimensions();
  const TAB_NAMES = ["Home", "Cart", "My Orders", "Profile"];

  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 68,
          paddingBottom: 7,
          paddingTop: 17,
          backgroundColor: "#F7F7F7",
          borderTopWidth: 0,
          elevation: 0,
          marginHorizontal: 17,
          borderRadius: 60,
          marginBottom: Platform.OS === "android" ? 10 : 16,
          paddingHorizontal: 5,

          overflow: "visible",

        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarShowLabel: false,
       
        tabBarIcon: ({ focused }) => {
          let iconSource;
          const routeIndex = TAB_NAMES.indexOf(route.name);
          const isFirst = routeIndex === 0;
          const isLast = routeIndex === TAB_NAMES.length - 1;

          if (route.name === "Home") {
            iconSource = focused
              ? require("../../assets/restroIcon/home-active.png")
              : require("../../assets/restroIcon/homeInactive.png");
          } else if (route.name === "Order") {
            iconSource = focused
              ? require("../../assets/restroIcon/order-active.png")
              : require("../../assets/restroIcon/order-inactive.png");
          } else if (route.name === "Earnings") {
            iconSource = focused
              ? require("../../assets/restroIcon/Chart.png")
              : require("../../assets/restroIcon/earningRes.png");
          } else if (route.name === "Profile") {
            iconSource = focused
              ? require("../../assets/restroIcon/profile-active.png")
              : require("../../assets/restroIcon/profile-inactive.png");
          }

          if (focused) {
           
            const translateX = isFirst ? scale(15) : isLast ? -scale(15) : 0;

            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: ACTIVE_BG_COLOR,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 30,
                  minWidth: scale(100),
                  maxWidth: scale(100),
                  zIndex: 10,
                  transform: [{ translateX }],
                }}
              >
                <Image source={iconSource} style={{ width: 24, height: 24 }} resizeMode="contain" />
                <Text
                  numberOfLines={1}
                  style={{
                    color: ACTIVE_ICON_COLOR,
                    marginLeft: 8,
                    fontWeight: "600",
                    fontSize: width > 450 ? 14 : 12,
                    flexShrink: 1,
                  }}
                >
                  {route.name === "Profile"
                    ? "Profile"
                    : route.name === "Restaurant Order"
                      ? "Schedule"
                      : route.name}
                </Text>
              </View>
            );
          } else {
            return (
              <Image
                source={iconSource}
                style={{ width: scale(24), height: verticalScale(24) }}
                resizeMode="contain"
              />
            );
          }
        }
      })}
    >
      <BottomTabs.Screen name="Home" options={{ headerShown: false }} component={RiderHomePage} />
      <BottomTabs.Screen name="Order" component={RiderOrder} />
      <BottomTabs.Screen name="Earnings" component={EarningList} />
      <BottomTabs.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
    </BottomTabs.Navigator>
  );




};
