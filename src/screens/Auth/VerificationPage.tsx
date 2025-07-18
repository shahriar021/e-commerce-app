import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

const VerificationPage = () => {
    const {width}=useWindowDimensions()
    const navigation = useNavigation();

    useLayoutEffect(() => {
    navigation.setOptions({
      title: "Verification",
      headerStyle: {
        backgroundColor: "white",
        elevation: 0, // for Android
        shadowOpacity: 0, // for iOS
        borderBottomWidth: 0, // for iOS
      },
      headerTintColor: "#626262",
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
            <Entypo name="chevron-small-left" size={24} color="red" />
          </View>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View className='flex-1 bg-white items-center p-2 relative'>
        {/*  */}
        <View style={{width:width*0.9,height:verticalScale(300)}}>
        <Image source={require("../../../assets/restroIcon/verificaiton.png")} style={{width:"100%",height:"100%"}} resizeMode='contain'/>
      </View>
      <View className='items-center' >
        <Text className='text-[#28A15C] font-robotoBold text-2xl'>Your application is under review</Text>
        <Text  className='text-center font-robotoRegular text-xl'>We will notify you as soon as youraccount has been approved
        </Text>
      </View>
      {/*  */}
      <View style={{ height: verticalScale(50) }} />

      <View style={{width:width,height:verticalScale(200)}} className='absolute bottom-0  ' >
        <Image source={require("../../../assets/restroIcon/Vector.png")} style={{width:"100%",height:"100%"}} resizeMode='stretch'/>
      </View>
    </View>
  )
}

export default VerificationPage