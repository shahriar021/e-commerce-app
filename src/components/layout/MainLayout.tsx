import { View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "src/routes/AuthStack";
import { useFonts } from "expo-font";
import { useAppSelector } from "src/redux/hooks";
import SplashScreen from "../ui/splashScreen/SplashScreen";
import ToastManager from 'toastify-react-native';
import { useGetProfileQuery } from "src/redux/features/profile/profile/profileApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { usePostNotificationRegisterMutation } from "src/redux/features/notification/notificationApi";
import { FirebaseNotificationService } from "src/services/firebasaeNotificationService";

const MainLayout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const {data:getProfile,isSuccess}=useGetProfileQuery(token)
  const [postNotiRegis]=usePostNotificationRegisterMutation()

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

  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     // 1. Request permission and get the FCM token
  //     const fcToken = await FirebaseNotificationService.requestPermissionAndGetToken();

  //     // 2. Get the device type (Android or iOS)
  //     const deviceType = Platform.OS;  // Will return 'android' or 'ios'

  //     // 3. Send the FCM token and device type to the backend
  //     if (fcToken) {
  //       const payload = {
  //         data: {
  //           token: fcToken,
  //           device: deviceType, // Add device type here
  //         },
  //       };

  //       console.log('Payload for Backend:', payload);

  //       // Send the token to the backend using RTK Query's mutation
  //       try {
  //         const res = await postNotiRegis({ token, body: payload }).unwrap();
  //         console.log('FCM Token synced with backend', res);
  //       } catch (err) {
  //         console.error('Failed to sync FCM token', err);
  //       }
  //     }

  //     // 4. Handle foreground notifications
  //     const unsubscribeForeground = FirebaseNotificationService.handleForegroundNotifications();

  //     // 5. Handle background notifications
  //     FirebaseNotificationService.handleBackgroundNotifications();

  //     // 6. Handle notification response (when tapped)
  //     FirebaseNotificationService.handleNotificationResponse();

  //     // Cleanup listeners
  //     return () => {
  //       unsubscribeForeground();
  //     };
  //   };

  //   setupNotifications(); // Initialize notifications

  // }, [postNotiRegis]);

 useEffect(() => {
    const getAndSendFCMToken = async () => {
      try {
        // 1. Request permission for notifications (For iOS)
        await messaging().requestPermission();
        console.log('Notification permission granted');
        
        // 2. Get the FCM token (To send push notifications)
        const fcToken = await messaging().getToken();
        console.log('FCM Token:', fcToken);
        
        // 3. Send token to the backend
        const payload = {
          data: {
            token: fcToken,
            device: 'android' // Optional: Add any device information you need to send
          }
        };
        
        console.log('Payload for Backend:', payload);

        try {
          // Example API call to sync token with the backend
          const res = await postNotiRegis({ token, body: payload }).unwrap();
          console.log('FCM Token synced with backend', res);
        } catch (err) {
          console.error('Failed to sync FCM token', err);
        }
      } catch (error) {
        console.log('Notification permission denied:', error);
      }
    };

    getAndSendFCMToken(); // Call the function to get and send FCM token

    // 4. Handle foreground notifications (When the app is open)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message:', remoteMessage);

      // Display the notification using expo-notifications
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Trigger the notification immediately
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        },
        trigger: { seconds: 1 }, // Show immediately
      });
    });

    // 5. Handle background notifications (When the app is in the background or terminated)
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background message:', remoteMessage);
      // Optionally handle background notifications here
    });

    // 6. Handle notifications in the background or when tapped
    Notifications.addNotificationReceivedListener((notification) => {
      console.log('Received notification in background:', notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('User tapped the notification:', response);
      // You can navigate or perform any action when the user taps the notification
    });

    // Cleanup the listeners when the component is unmounted
    return unsubscribe;
  }, []);


  useEffect(() => {
    if (isSuccess && getProfile) {
      const saveProfile = async () => {
        try {
          const jsonValue = JSON.stringify(getProfile);
          await AsyncStorage.setItem('user_profile', jsonValue);
          setIsSplashVisible(false);
        } catch (e) {
          console.error("Failed to save profile to AsyncStorage", e);
        }
      };
      
      saveProfile();
    }
    
  }, [getProfile, isSuccess]);

  

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
