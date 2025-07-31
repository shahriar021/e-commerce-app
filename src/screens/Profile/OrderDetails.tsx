import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

const OrderDetails = () => {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Order Details",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            <View className='flex-row justify-between items-center bg-[#212121] p-2 rounded-lg mt-2'>
                <View className='flex-col'>
                    <Text className='text-[#fff] font-helvetica text-xl'>Order #83473</Text>
                    <Text className='text-[#9CA3AF] font-helvetica'>June 24,2025</Text>
                </View>

                <Text className='text-[#FB923C] p-2 rounded-2xl' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>Processing</Text>
            </View>

            <View className='flex-row justify-between items-center bg-[#212121] p-2 rounded-lg mt-2'>
                <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                    <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                        <Image source={require("../../../assets/e-icon/orderHist.png")} style={{ width: "100%", height: "100%" }} />
                    </View>
                    <View className='flex-row justify-between flex-1 items-center'>
                        <View className='flex-col'>
                            <Text className='font-helvetica text-white'>Black Formal Dress</Text>
                            <Text className='font-helvetica text-[#9CA3AF]'>Qty: 2 | Size: M</Text>
                        </View>
                        <View><Text className='font-helvetica text-white'>৳4,400</Text></View>
                    </View>
                </View>
            </View>

            <View className=' bg-[#212121] p-2 rounded-lg mt-2'>
                <Text className='text-xl font-helvetica text-[#fff]'>MY Information</Text>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/2 User.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-helvetica text-[#fff] text-lg'>Sarra ahmed</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/Call.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-helvetica text-[#fff] text-lg'>2353563464664</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/n.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-helvetica text-[#fff] text-lg'>House 25, Road 7
                        Dhanmondi, Dhaka-1205</Text>
                </View>
            </View>

            <View className=' bg-[#212121] p-2 rounded-lg mt-2'>
                <Text className='text-xl font-helvetica text-[#fff]'>Payment Information</Text>
                <View className='flex-row justify-between'>
                    <Text className='text-[#ADAEBC] font-helvetica'>Payment Method</Text>
                    <Text className='text-[#ADAEBC] font-helvetica'>Paypel</Text>
                </View>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-helvetica'>Payment Status</Text>
                    <Text className='text-[#4ADE80] font-helvetica'>Paid</Text>

                </View>
                <View className='border border-[#565656] mt-2'/>
                 <View className='flex-row justify-between'>
                    <Text className='text-[#ADAEBC] font-helvetica'>Subtotal</Text>
                    <Text className='text-[#ADAEBC] font-helvetica'>৳4,400</Text>
                </View>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-helvetica'>Shipping Fee</Text>
                    <Text className='text-[#ADAEBC] font-helvetica'>৳80</Text>

                </View>
                <View className='border border-[#565656] mt-2'/>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-helvetica'>Total</Text>
                    <Text className='text-[#ADAEBC] font-helvetica'>৳4,480</Text>

                </View>
            </View>
             
        </ScrollView>
    )
}

export default OrderDetails