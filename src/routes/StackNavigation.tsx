import React, { useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation } from "./BottomNavigation";
import { 
  LoginScreen,
  Profile,
  NearbyRestaurantList,
  AboutUs,
  Privacy,
  Terms,
  Address,
  Setting,
  ChangePassword,
  EditProfile,
  RestaurantProfile,
  PopularItems,
  PopularItemDetails,
  PaymentAnimation,
  PaymentInfo,
  TrackOrder,
  ViewDetails,
  PaymentOption,
  SpecialInstructions,
  DeliveryRequestView,
  MapScreen,
  EarningListView,
  Withdraw,
  WithdrawRequest,
  Bank,
  BankEdit,
  History
} from "src/screens";

import { RiderBottomNavigation } from "./RiderBottomNavigation";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "src/redux/hooks";
import BrandDetails from "src/screens/Bage/BrandDetails";
import BrandProducts from "src/screens/Bage/BrandProducts";
import ProductDetails from "src/screens/Bage/ProductDetails";
import Feed from "src/screens/Feed/Feed";


const Stack = createStackNavigator();

const StackNavigation = () => {
  // const userType = useAppSelector((store)=>store.auth.userType)
  const userType="user"


  if(!userType){
    <ActivityIndicator size="large"/>
  }

  return (
    
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#121212",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: "#006400",
          // headerRight: () => <NavRight routeName={routeNameRef.current} />,
        }}
      >
        {<Stack.Screen
          name="BottomScreen"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        />}
        {/* <Stack.Screen name="Notification" component={} /> */}
        <Stack.Screen name="Profile" options={{headerShown:false}} component={Profile} />

        <Stack.Screen name="about" component={AboutUs}/>
        <Stack.Screen name="Privacy" component={Privacy}/>
        <Stack.Screen name="Terms" component={Terms}/>
        <Stack.Screen name="Address" component={Address}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="Edit Profile" component={EditProfile}/>
        <Stack.Screen name="Change Password" component={ChangePassword}/>

        <Stack.Screen name="Nearby Restaurants List" component={NearbyRestaurantList}/>
        <Stack.Screen name="Restaurant Profile" options={{headerShown:false}} component={RestaurantProfile}/>
        <Stack.Screen name="Popular Items"  component={PopularItems}/>
        <Stack.Screen name="Popular Items Details" options={{headerShown:false}} component={PopularItemDetails}/>
        <Stack.Screen name="Payment Animation" options={{headerShown:false}} component={PaymentAnimation}/>
        <Stack.Screen name="Payment Info" options={{headerShown:false}} component={PaymentInfo}/>
        <Stack.Screen name="Track Order" component={TrackOrder}/>
        <Stack.Screen name="View Details" component={ViewDetails}/>
        <Stack.Screen name="Payment Options" component={PaymentOption}/>
        <Stack.Screen name="Special Instructions" component={SpecialInstructions}/>

        <Stack.Screen name="Delivery Request" component={DeliveryRequestView}/>
        <Stack.Screen name="Map" options={{headerShown:false}} component={MapScreen}/>
        <Stack.Screen name="Earning List View" component={EarningListView}/>
        
        <Stack.Screen name="Withdraw" component={Withdraw}/>
        <Stack.Screen name="Withdraw Request" component={WithdrawRequest}/>
        <Stack.Screen name="Bank" component={Bank}/>
        <Stack.Screen name="Bank Edit" component={BankEdit}/>
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen name="Brand Details" options={{headerShown:true}} component={BrandDetails}/>
        <Stack.Screen name="Brand Products" options={{headerShown:true}} component={BrandProducts}/>
        <Stack.Screen name="Product Details" options={{headerShown:true}} component={ProductDetails}/>
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default StackNavigation;
