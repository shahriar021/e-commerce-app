import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useAppSelector } from 'src/redux/hooks'
import { useGetBrandOrderDetailsQuery } from 'src/redux/features/orders/orderApi'
import { nameStatus } from 'src/constants/productInfos'

const OrderDetails = () => {
    const { width, height } = useWindowDimensions()
     const route=useRoute()
        const {id}=route.params
        const navigation = useNavigation()
        const token=useAppSelector((state)=>state.auth.token)
        const {data:details}=useGetBrandOrderDetailsQuery({token,id})
        
        const info = details?.data?.data[0]
        console.log(info[0],"details")
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
            headerTitleStyle:'instrumentSans-Bold',
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
                    <Text className='text-[#fff] font-instrumentSansSemiBold text-xl'>Order #{info?.orderId?.slice(-4)}</Text>
                    <Text className='text-[#9CA3AF] font-instrumentRegular'>{new Date(info?.createdAt).toLocaleDateString()}</Text>
                </View>

                <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentSansSemiBold' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>{nameStatus[info?.sellerStatus as keyof typeof nameStatus]}</Text>
            </View>

            <View className='flex-row justify-between items-center bg-[#212121] p-2 rounded-lg mt-2'>
                <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                    <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                        <Image source={{uri:info?.productImages[0]}} style={{ width: "100%", height: "100%" }} />
                    </View>
                    <View className='flex-row justify-between flex-1 items-center'>
                        <View className='flex-col'>
                            <Text className='font-instrumentSansSemiBold text-white'>{info?.productName}</Text>
                            <Text className='font-instrumentRegular text-[#9CA3AF]'>Qty: {info?.quantity} | Size: {info?.size}</Text>
                        </View>
                        <View><Text className='font-instrumentSansSemiBold text-white'>{info?.price}$</Text></View>
                    </View>
                </View>
            </View>

            <View className=' bg-[#212121] p-2 rounded-lg mt-2 '>
                <Text className='text-xl font-instrumentSansBold text-[#fff]'>MY Information</Text>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/2 User.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-instrumentSansSemiBold text-[#fff] text-lg'>{info?.address?.name}</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/Call.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-instrumentSansSemiBold text-[#fff] text-lg'>{info?.address?.contact}</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/n.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-instrumentSansSemiBold text-[#fff] text-lg' style={{flexShrink:1}}>{info?.address?.spotDetails}</Text>
                </View>
            </View>

            <View className=' bg-[#212121] p-2 rounded-lg mt-2'>
                <Text className='text-xl font-instrumentSansBold text-[#fff]'>Payment Information</Text>
                <View className='flex-row justify-between'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Payment Method</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>{info?.paymentMethod}</Text>
                </View>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Payment Status</Text>
                    <Text className={`${info?.paymentStatus=="paid"?"text-[#4ADE80]":"text-red-400"} font-instrumentSansSemiBold`}>{info?.paymentStatus}</Text>

                </View>
                <View className='border border-[#565656] mt-2'/>
                 <View className='flex-row justify-between'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Subtotal</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>৳4,400</Text>
                </View>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Shipping Fee</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>৳80</Text>

                </View>
                <View className='border border-[#565656] mt-2'/>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Total</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>৳4,480</Text>

                </View>
            </View>
             
        </ScrollView>
    )
}

export default OrderDetails