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
  Withdraw,
  WithdrawRequest,
  Bank,
  BankEdit,
  History
} from "src/screens";

import { ProviderBottomNavigation } from "./ProviderBottomNavigation";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "src/redux/hooks";
import BrandDetails from "src/screens/Bage/BrandDetails";
import BrandProducts from "src/screens/Bage/BrandProducts";
import ProductDetails from "src/screens/Bage/ProductDetails";
import Feed from "src/screens/Feed/Feed";
import UsersORBrandProfile from "src/screens/Feed/UsersORBrandProfile";
import MyFavourite from "src/screens/Profile/MyFavourite";
import OrderHistory from "src/screens/Profile/OrderHistory";
import OrderDetails from "src/screens/Profile/OrderDetails";
import CartPage from "src/screens/Cart/CartPage";
import Review from "src/screens/Review/Review";
import Products from "src/screens/Products/Products";
import AddProducts from "src/screens/Products/AddProducts";
import AllProducts from "src/screens/Products/AllProducts";
import SellerProfile from "src/screens/Profile/SellerProfile";
import BrandProfile from "src/screens/Profile/BrandProfile";
import SeeAllProducts from "src/screens/Bage/SeeAllProducts";
import SeeAllBrands from "src/screens/Bage/SeeAllBrands";
import OrderList from "src/screens/Orders/OrderList";
import SearchResult from "src/screens/Search/SearchModal";


const Stack = createStackNavigator();

const StackNavigation = () => {
  const userType = useAppSelector((store)=>store.auth.userType)
  // const userType="rider"
  console.log(userType)


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
          component={userType=="user"?BottomNavigation:ProviderBottomNavigation}
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
        <Stack.Screen name="My Favourite" component={MyFavourite}/>
        <Stack.Screen name="Order History" component={OrderHistory}/>
        <Stack.Screen name="Order Details" component={OrderDetails}/>
        <Stack.Screen name="Order List" options={{headerShown:true}} component={OrderList}/>

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
        <Stack.Screen name="Search Result" options={{headerShown:false}} component={SearchResult}/>
        
        <Stack.Screen name="Withdraw" component={Withdraw}/>
        <Stack.Screen name="Withdraw Request" component={WithdrawRequest}/>
        <Stack.Screen name="Bank" component={Bank}/>
        <Stack.Screen name="Bank Edit" component={BankEdit}/>
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen name="Brand Details" options={{headerShown:true}} component={BrandDetails}/>
        <Stack.Screen name="Brand Products" options={{headerShown:true}} component={BrandProducts}/>
        <Stack.Screen name="See all products" options={{headerShown:true}} component={SeeAllProducts}/>
        <Stack.Screen name="See all brands" options={{headerShown:true}} component={SeeAllBrands}/>
        <Stack.Screen name="Product Details" options={{headerShown:true}} component={ProductDetails}/>
        <Stack.Screen name="Other/brand profile" options={{headerShown:true}} component={UsersORBrandProfile}/>
        <Stack.Screen name="Cart Page" options={{headerShown:true}} component={CartPage}/>
        <Stack.Screen name="Review" options={{headerShown:true}} component={Review}/>
        <Stack.Screen name="Products" options={{headerShown:true}} component={Products}/>
        <Stack.Screen name="Add Products" options={{headerShown:true}} component={AddProducts}/>
        <Stack.Screen name="All Products" options={{headerShown:true}} component={AllProducts}/>
         <Stack.Screen name="Seller Profile" options={{headerShown:true}} component={SellerProfile}/>
        <Stack.Screen name="Brand Profile" options={{headerShown:true}} component={BrandProfile}/>

      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default StackNavigation;
