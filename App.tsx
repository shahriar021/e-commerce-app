import "./global.css";
import "./gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "./src/components/layout/MainLayout";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {StripeProvider} from "@stripe/stripe-react-native"

const pb_key="pk_test_51S1Znm9oUvTsjPygQJMcgpHLHo5bZXSHstNGDj02BrAQaiKRov3YuWl8mLDp1TJoH6nECkXCT8j2Ut3sdJMzy58X00KxOsykda"

export default function App() {

  const [publishableKey, setPublishableKey] = useState('');

const fetchPublishableKey = async () => {
    // Replace with your actual publishable key
    setPublishableKey('pk_test_51S1Znm9oUvTsjPygQJMcgpHLHo5bZXSHstNGDj02BrAQaiKRov3YuWl8mLDp1TJoH6nECkXCT8j2Ut3sdJMzy58X00KxOsykda');
  };

useEffect(() => {
    fetchPublishableKey();
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StripeProvider publishableKey={publishableKey} urlScheme="com.sta.ark">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainLayout />
          </PersistGate>
        </Provider>
        </StripeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
