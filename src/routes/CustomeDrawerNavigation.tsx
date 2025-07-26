import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useAppSelector } from 'src/redux/hooks';
import { useDispatch } from 'react-redux';
import { setToken, setUserType } from 'src/redux/features/auth/authSlice';

export const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const userItems = [
    {
      label: 'Edit Profile',
      icon: require("../../assets/e-icon/profile.png"),
      screen: 'Edit Profile',
    },
    {
      label: 'Order History',
      icon: require("../../assets/e-icon/b.png"),
      screen: 'Order History',
    },
    {
      label: 'My Favourite',
      icon: require("../../assets/e-icon/b.png"),
      screen: 'My Favourite',
    },
  ];

  // Items for provider only
  const providerItems = [
    {
      label: 'Seller Profile',
      icon: require("../../assets/e-icon/medal-star.png"),
      screen: 'Seller Profile',
    },
    {
      label: 'Brand Profile',
      icon: require("../../assets/e-icon/profile.png"),
      screen: 'Brand Profile',
    },
  ];

  // Common items for both
  const commonItems = [
    {
      label: 'Change Password',
      icon: require("../../assets/e-icon/Password.png"),
      screen: 'Change Password',
    },
    {
      label: 'Terms and conditions',
      icon: require("../../assets/e-icon/termsC.png"),
      screen: 'Terms',
    },
    {
      label: 'Privacy and Policy',
      icon: require("../../assets/e-icon/privac.png"),
      screen: 'Privacy',
    },
   
  ];
   const userType = useAppSelector((store)=>store.auth.userType)

  const items = userType === 'user' ? [...userItems, ...commonItems] : [...providerItems, ...commonItems];

 
  // userType == user or provider
  const handleLogout=()=>{
    dispatch(setUserType(null))
    dispatch(setToken(null))
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#252525' }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View style={{ padding: 16, backgroundColor: '#252525' }}>
          <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
            <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <Image
              source={require("../../assets/e-icon/img (1).png")} // Replace with real image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginBottom: 8,
                borderColor: '#fff',
                borderWidth: 1,
                
              }}
            />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{userType=="user"?"Jack Robo":"Coid Supply"}</Text>
            <View className='w-full border border-[#707070] mt-4'/>
          </View>
        </View>

        {/* Drawer Items */}
        <View style={{ paddingTop: 20 }}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.icon} style={{width:20,height:20}}/>
                <Text style={{ marginLeft: 15, fontSize: 16, color: '#DCF3FF' }}>
                  {item.label}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#DCF3FF" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
              
              onPress={handleLogout}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require("../../assets/e-icon/Frame (2).png")} style={{width:20,height:20}}/>
                <Text style={{ marginLeft: 15, fontSize: 16, color: '#DCF3FF' }}>
                  Logout
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#DCF3FF" />
            </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
