import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Platform, useWindowDimensions, Image } from "react-native";
import { HomeScreen, Profile } from "src/screens";
import CartPage from "src/screens/Cart/CartPage";
import MyOrders from "src/screens/Orders/MyOrders";
import { scale, verticalScale } from "react-native-size-matters";

const BottomTabs = createBottomTabNavigator();

const ACTIVE_BG_COLOR = "#c21a1e";
const ACTIVE_ICON_COLOR = "#fff";

export const BottomNavigation = () => {
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
        // tabBarIcon: ({ focused }) => {
        //   let iconSource;

        //   if (route.name === "Home") {
        //     iconSource = focused
        //       ? require("../../assets/restroIcon/home-active.png")
        //       : require("../../assets/restroIcon/homeInactive.png");
        //   }
        //   else if (route.name === "Cart") {
        //     iconSource = focused
        //       ? require("../../assets/restroIcon/cart-active.png")
        //       : require("../../assets/restroIcon/cart-inactive.png");
        //   }
        //   else if (route.name === "My Orders") {
        //     iconSource = focused
        //       ? require("../../assets/restroIcon/order-active.png")
        //       : require("../../assets/restroIcon/order-inactive.png");
        //   } else if (route.name === "Profile") {
        //     iconSource = focused
        //       ? require("../../assets/restroIcon/profile-active.png")
        //       : require("../../assets/restroIcon/profile-inactive.png");
        //   }

        //   if (focused) {
        //     return (
        //       <View
        //         style={{
        //           flexDirection: "row",
        //           alignItems: "center",
        //           justifyContent: "center",
        //           backgroundColor: ACTIVE_BG_COLOR,
        //           paddingHorizontal: 12,
        //           paddingVertical: 8,
        //           borderRadius: 30,

        //           // minWidth: scale(100),
        //           // minHeight: 50,
        //           // flexShrink: 1,
        //           // maxWidth: width * 0.7,
        //           minWidth: scale(100),
        //           maxWidth: scale(100),
        //           zIndex: 10,
        //         }}
        //       >
        //         <Image source={iconSource} style={{ width: 24, height: 24 }} resizeMode="contain" />
        //         <Text
        //           numberOfLines={1}
        //           style={{
        //             color: ACTIVE_ICON_COLOR,
        //             marginLeft: 8,
        //             fontWeight: "600",
        //             fontSize: width > 450 ? 14 : 12,
        //             flexShrink: 1,
        //           }}
        //         >
        //           {route.name === "Profile"
        //             ? "Profile"
        //             : route.name === "Restaurant Order"
        //               ? "Schedule"
        //               : route.name}
        //         </Text>
        //       </View>
        //     );
        //   } else {
        //     return <Image source={iconSource} style={{ width: scale(24), height: verticalScale(24) }} resizeMode="contain" />;
        //   }
        // }
        tabBarIcon: ({ focused }) => {
          let iconSource;
          const routeIndex = TAB_NAMES.indexOf(route.name);
          const isFirst = routeIndex === 0;
          const isLast = routeIndex === TAB_NAMES.length - 1;

          if (route.name === "Home") {
            iconSource = focused
              ? require("../../assets/restroIcon/home-active.png")
              : require("../../assets/restroIcon/homeInactive.png");
          } else if (route.name === "Cart") {
            iconSource = focused
              ? require("../../assets/restroIcon/cart-active.png")
              : require("../../assets/restroIcon/cart-inactive.png");
          } else if (route.name === "My Orders") {
            iconSource = focused
              ? require("../../assets/restroIcon/order-active.png")
              : require("../../assets/restroIcon/order-inactive.png");
          } else if (route.name === "Profile") {
            iconSource = focused
              ? require("../../assets/restroIcon/profile-active.png")
              : require("../../assets/restroIcon/profile-inactive.png");
          }

          if (focused) {
            // Calculate horizontal shift to keep content inside edges
            // Shift right for first tab, left for last tab, no shift for others
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
      <BottomTabs.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <BottomTabs.Screen name="Cart" component={CartPage} />
      <BottomTabs.Screen name="My Orders" component={MyOrders} />
      <BottomTabs.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
    </BottomTabs.Navigator>
  );




};
