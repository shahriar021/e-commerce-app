import { Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "src/routes/AuthStack";
import { useFonts } from "expo-font";
import { useAppSelector } from "src/redux/hooks";
import SplashScreen from "../ui/splashScreen/SplashScreen";
import ToastManager from 'toastify-react-native';

const MainLayout = () => {
  // const token = useAppSelector((state) => state.auth.user?.access_token);
  const token = useAppSelector((state) => state.auth.token);
  // const token = 0;
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [fontsLoaded] = useFonts({
    'prosto-One': require("../../../assets/fonts/ProstoOne-Regular.ttf"),
    'playFairDisplay': require("../../../assets/fonts/PlayfairDisplay-Bold.ttf"),
    'podKova-bold': require("../../../assets/fonts/Podkova-Bold.ttf"),
    'opansans': require("../../../assets/fonts/OpenSans-Regular.ttf"),
    'poppins': require("../../../assets/fonts/Poppins-Bold.ttf"),
    'HelveticaNeue-Black': require("../../../assets/fonts/HelveticaNeueBlack.otf"),

    'instrumentSans-Bold': require("../../../assets/fonts/InstrumentSans-Bold.ttf"),
    'instrumentSans-Regular': require("../../../assets/fonts/InstrumentSans-Regular.ttf"),
    'instrumentSans-SemiBold': require("../../../assets/fonts/InstrumentSans-SemiBold.ttf"),
  });


  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Wait for BOTH fonts and splash timer
  const isAppReady = fontsLoaded && !isSplashVisible;

  if (!isAppReady) {
    return <SplashScreen />;
  }

  // const oldRender = Text.render;
  // Text.render = function (...args) {
  //   const origin = oldRender.call(this, ...args);

  //   // if icon font already set, don't override
  //   const style = Array.isArray(origin.props.style) ? origin.props.style : [origin.props.style];
  //   const hasCustomFont = style.some((s) => s && s.fontFamily);

  //   return React.cloneElement(origin, {
  //     style: hasCustomFont
  //       ? origin.props.style // keep icon font
  //       : [origin.props.style, { fontFamily: "HelveticaNeue-Black" }],
  //   });
  // };


  return (
    <>
      <ToastManager position={'bottom'} duration={1000}
      />
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar style="light" />
          {token ? (
            <StackNavigation />
          ) : (
            <AuthStack />
          )}
        </View>
      </NavigationContainer>
    </>
  );
};

export default MainLayout;
