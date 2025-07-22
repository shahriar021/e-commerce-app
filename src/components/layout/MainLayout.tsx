import { View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "src/routes/AuthStack";
import { useFonts } from "expo-font";
import { useAppSelector } from "src/redux/hooks";
import SplashScreen from "../ui/splashScreen/SplashScreen";

const MainLayout = () => {
  // const token = useAppSelector((state) => state.auth.user?.access_token);
  // const token = useAppSelector((state)=>state.auth.token);
  const token = 1;
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [fontsLoaded] = useFonts({
    'prosto-One':require("../../../assets/fonts/ProstoOne-Regular.ttf"),
    'playFairDisplay':require("../../../assets/fonts/PlayfairDisplay-Bold.ttf"),
    'podKova-bold':require("../../../assets/fonts/Podkova-Bold.ttf"),
    'opansans':require("../../../assets/fonts/OpenSans-Regular.ttf")
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

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        {token ? (
          <StackNavigation  />
        ) : (
          <AuthStack />
        )}
      </View>
    </NavigationContainer>
  );
};

export default MainLayout;
