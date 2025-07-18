import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import { LinearGradient } from 'expo-linear-gradient'

const PaymentOption = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Payment Options",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
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
        })
    }, [navigation])
    return (
        <View className='flex-1 justify-between'>
            <View className='p-3'>
                {/* card */}
            <View className='p-2 m-2 border border-gray-200 rounded-3xl overflow-hidden' >
                <View className='flex-row items-center gap-3'>
                    <View className='rounded-2xl overflow-hidden' style={{ width: scale(80),height:verticalScale(80) }}>
                        <Image source={require("../../../assets/restroIcon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} />
                    </View>
                <View>
                        <Text className='font-robotoBold text-xl'>The Burger Spot</Text>
                        <Text className='font-robotoRegular text-lg'>2x Chicken Burger</Text>
                        <Text className='font-robotoRegular text-lg'>1x Fries</Text>
                        <Text className='font-robotoRegular text-lg'>1x Coke</Text>
                </View>
                </View>
                <View className='flex-row items-center gap-3 justify-center w-full mt-2 mb-1'>
                    <Image source={require("../../../assets/restroIcon/location.png")}/><Text className='text-[#606060] text-xl'>123 Main Street, Berlin, Germany, 10115</Text>
                    
                </View>
                <View className='flex-row items-center  justify-between  mt-2 mb-1 mx-2'>
                   <Text className='font-robotoBold text-xl '>Total Amount</Text><Text className='font-robotoBold text-xl'>$89.36</Text>
                    
                </View>
            </View>
            {/* card */}
            <View className='m-2'>
                <Text className='font-robotoBold text-3xl'>Choose your payment method:</Text>
                <View className='flex-row mt-2 items-center justify-between border p-1 border-gray-200 rounded-lg'>
                    <View className='flex-row gap-2'>
                        <Image source={require("../../../assets/restroIcon/cash-02.png")} style={{width:20,height:20}}/>
                        <Text className='font-robotoRegular'>Cash on Delivery</Text>
                    </View>
                    <Entypo name="circle" size={24} color="#027FEE" />
                </View>
                <Text className='mt-1 font-robotoRegular text-black text-xl font-semibold'>Credi & Debit Cards</Text>
                <View className='flex-row mt-2 items-center justify-between border p-1 border-gray-200 rounded-lg'>
                    <View className='flex-row gap-2'>
                        <Image source={require("../../../assets/restroIcon/logos_visa.png")} style={{width:20,height:20}} resizeMode='contain'/>
                        <Text className='font-robotoRegular'>HDFC BANK **** **** **** 5897</Text>
                    </View>
                    <Entypo name="circle" size={24} color="#027FEE" />
                </View>
                <TouchableOpacity className='mt-3 flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/restroIcon/Frame 34913.png")} style={{width:25,height:25}}/>
                    <Text className='text-xl text-[#606060]'>Add New Card</Text>
                </TouchableOpacity>
            </View>
            </View>

            <View className='p-2 flex-row items-center w-full justify-between border border-t-[#BB2821] border-r-white border-l-white border-b-white'>
                <Text className='text-[#308960] font-robotoBold text-3xl'>$89.36</Text>
                <TouchableOpacity className='items-center p-4'>
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{  borderRadius: 999, alignItems: "center",padding:10 }}>
                                 <Text className='font-robotoBold text-white'>Proceed to Pay</Text>
                              </LinearGradient>
                   
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaymentOption