import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import OTPScreen from "src/screens/Auth/OTPScreen";
import VerifyEmailPage from "src/screens/Auth/VerifyEmailPage";
import ForgetPassword from 'src/screens/Auth/ForgetPassword';
import LoginOTPScreen from 'src/screens/Auth/LoginOTPScreen';
import ResetPassword from 'src/screens/Auth/ResetPasswrod';
import VerificationPage from 'src/screens/Auth/VerificationPage';
import OnBoarding from 'src/screens/Auth/OnBoarding';
import LoginScreen from 'src/screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen options={{headerShown:true}} name="Login Screen" component={LoginScreen}/>
      <Stack.Screen options={{headerShown:true}}  name="Forget Password" component={ForgetPassword}/>
      <Stack.Screen options={{headerShown:true}}  name="Login OTP" component={LoginOTPScreen}/>
      <Stack.Screen options={{headerShown:true}}  name="Reset Password" component={ResetPassword}/>
      <Stack.Screen options={{ headerShown: true }} name="VerifyEmail" component={VerifyEmailPage} />
      <Stack.Screen options={{headerShown:true}} name="OTP Screen" component={OTPScreen} />
      <Stack.Screen options={{headerShown:true}} name="Verification Page" component={VerificationPage}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
