import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation } from "./BottomNavigation";
import {
  Profile,
  Privacy,
  Terms,
  Address,
  Setting,
  ChangePassword,
  EditProfile,
  Withdraw,
} from "src/screens";

import { ProviderBottomNavigation } from "./ProviderBottomNavigation";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "src/redux/hooks";
import BrandDetails from "src/screens/Bage/BrandDetails";
import BrandProducts from "src/screens/Bage/BrandProducts";
import ProductDetails from "src/screens/Bage/ProductDetails";
import UsersORBrandProfile from "src/screens/Feed/UsersORBrandProfile";
import MyFavourite from "src/screens/Profile/MyFavourite";
import OrderHistory from "src/screens/Profile/OrderHistory";
import OrderDetails from "src/screens/Profile/OrderDetails";
import CartPage from "src/screens/Cart/CartPage";
import Review from "src/screens/Review/Review";
import Products from "src/screens/Products/Products";
import AddProducts from "src/screens/Products/AddProducts";
import AllProducts from "src/screens/Products/AllProducts";
import BrandProfile from "src/screens/Profile/BrandProfile";
import SeeAllProducts from "src/screens/Bage/SeeAllProducts";
import SeeAllBrands from "src/screens/Bage/SeeAllBrands";
import OrderList from "src/screens/Orders/OrderList";
import SearchResult from "src/screens/Search/SearchModal";
import DetailsProduct from "src/screens/Products/DetailsProduct";
import Reward from "src/screens/Profile/Reward";
import EditProducts from "src/screens/Products/EditProducts";
import SearchPage from "src/screens/Search/SearchPage";
import PaymentScreen from "src/screens/Payment/PaymentScreen";
import Transaction from "src/screens/Earning/Transaction";
import OrderHistoryDetails from "src/screens/Profile/orderHistoryDetails";
import { RootStackParamList } from "src/types/screens";
import Notification from "src/screens/Notification/Notification";
import CameraScreen from "src/screens/Search/CameraScreen";
import CameraScreenFeed from "src/screens/Feed/CameraScreenFeed";


const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const userType = useAppSelector((store) => {
    return store?.auth?.userType ?? null;
  });



  // if(!userType){
  //   return <ActivityIndicator size="large"/>
  // }
  if (!userType) {
    return <ActivityIndicator size="large" />
  }

  return (
    <>
      {/* @ts-ignore */}
      <Stack.Navigator
        key={userType}
        screenOptions={{
          cardStyle: {
            backgroundColor: "#121212",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: "HelveticaNeue-Black",
          },
          headerTintColor: "#006400",
        }}
      >
        {
          <Stack.Screen
            key={userType}
            name="BottomScreen"
            component={userType == "User" ? BottomNavigation : ProviderBottomNavigation}
            options={{
              headerShown: false,
            }}
          />
        }
        {/* <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} /> */}
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
        <Stack.Screen name="My Favourite" component={MyFavourite} />
        <Stack.Screen name="Order History" component={OrderHistory} />
        <Stack.Screen name="Order Details" component={OrderDetails} />
        <Stack.Screen name="Order List" options={{ headerShown: true }} component={OrderList} />
        <Stack.Screen name="Search Result" options={{ headerShown: false }} component={SearchResult} />
        <Stack.Screen name="Search Page" options={{ headerShown: false }} component={SearchPage} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="Brand Details" options={{ headerShown: true }} component={BrandDetails} />
        <Stack.Screen name="Brand Products" options={{ headerShown: true }} component={BrandProducts} />
        <Stack.Screen name="See all products" options={{ headerShown: true }} component={SeeAllProducts} />
        <Stack.Screen name="See all brands" options={{ headerShown: true }} component={SeeAllBrands} />
        <Stack.Screen name="Product Details" options={{ headerShown: true }} component={ProductDetails} />
        <Stack.Screen name="Details Product" options={{ headerShown: true }} component={DetailsProduct} />
        <Stack.Screen name="Other/brand profile" options={{ headerShown: true }} component={UsersORBrandProfile} />
        <Stack.Screen name="Cart Page" options={{ headerShown: true }} component={CartPage} />
        <Stack.Screen name="Review" options={{ headerShown: true }} component={Review} />
        <Stack.Screen name="Products" options={{ headerShown: true }} component={Products} />
        <Stack.Screen name="Add Products" options={{ headerShown: true }} component={AddProducts} />
        <Stack.Screen name="Edit Products" options={{ headerShown: true }} component={EditProducts} />
        <Stack.Screen name="All Products" options={{ headerShown: true }} component={AllProducts} />
        <Stack.Screen name="Brand Profile" options={{ headerShown: true }} component={BrandProfile} />
        <Stack.Screen name="Reward" options={{ headerShown: true }} component={Reward} />
        <Stack.Screen name="Payment screen" options={{ headerShown: true }} component={PaymentScreen} />
        <Stack.Screen name="Transaction" options={{ headerShown: true }} component={Transaction} />
        <Stack.Screen name="OrderHistoryDetails" options={{ headerShown: true }} component={OrderHistoryDetails} />
        <Stack.Screen name="Notification" options={{ headerShown: true }} component={Notification} />
        <Stack.Screen name="CameraScreen" options={{ headerShown: true }} component={CameraScreen} />
        <Stack.Screen name="CameraScreenFeed" options={{ headerShown: true }} component={CameraScreenFeed} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
