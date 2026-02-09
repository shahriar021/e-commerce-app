import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {  Feather } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useAppSelector } from 'src/redux/hooks'
import { useOrderHistoryQuery } from 'src/redux/features/profile/profile/profileApi'
import { RootStackParamList } from 'src/types/screens'
import { Order } from 'src/types/profile'

const OrderHistoryDetails = () => {
     const route = useRoute<RouteProp<RootStackParamList, 'OrderHistoryDetails'>>();
    const { orderId } = route.params
    const navigation = useNavigation()
    const token = useAppSelector((state) => state.auth.token)
    const { data: getOrderHist } = useOrderHistoryQuery(token)  
    console.log(getOrderHist?.data?.data)  

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
            headerTitleStyle: 'instrumentSans-Bold',
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    const orderData = (Array.isArray(getOrderHist?.data?.data)
        ? getOrderHist.data.data
        : []
    ).find(order => order._id === orderId);

    return (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            <View className='flex-row justify-between items-center bg-[#212121] p-2 rounded-lg mt-2'>
                <View className='flex-col'>
                    <Text className='text-[#fff] font-instrumentSansSemiBold text-xl'>
                        Order #{orderData?.orderId?.slice(-4) || 'N/A'}
                    </Text>
                    <Text className='text-[#9CA3AF] font-instrumentRegular'>
                        {orderData?.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : 'N/A'}
                    </Text>
                </View>
                <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentSansSemiBold' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>
                    {orderData?.items?.[0]?.sellerStatus || 'Pending'}
                </Text>
            </View>

            {orderData?.items?.map((item:Order, index) => (
                <View
                    key={item.cartProductId || index} 
                    className='flex-row justify-between items-center bg-[#212121] p-2 rounded-lg mt-2'
                >
                    <View className='flex-row b items-center gap-2'>
                        <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                          
                            <Image
                                source={{ uri: item.productImages?.[0] }}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </View>
                        <View className='flex-col justify-center'>
                            {/* Use item for product details */}
                            <Text className='font-instrumentSansSemiBold text-white'>{item.productName}</Text>
                            <Text className='font-instrumentRegular text-[#9CA3AF]'>Qty: {item.quantity} | Size: {item.size}</Text>
                        </View>
                    </View>
                    <View><Text className='font-instrumentSansSemiBold text-white'>{item.price}$</Text></View>
                </View>
            ))}

            <View className=' bg-[#212121] p-2 rounded-lg mt-2 '>
                <Text className='text-xl font-instrumentSansBold text-[#fff]'>MY Information</Text>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/2 User.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-instrumentSansSemiBold text-[#fff] text-lg'>{orderData?.address?.name}</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/Call.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-instrumentSansSemiBold text-[#fff] text-lg'>{orderData?.address?.contact}</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <Image source={require("../../../assets/e-icon/n.png")} style={{ width: 20, height: 18 }} />
                    <Text className='font-instrumentSansSemiBold text-[#fff] text-lg' style={{ flexShrink: 1 }}>{orderData?.address?.spotDetails}</Text>
                </View>
            </View>

            <View className=' bg-[#212121] p-2 rounded-lg mt-2'>
                <Text className='text-xl font-instrumentSansBold text-[#fff]'>Payment Information</Text>
                <View className='flex-row justify-between'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Payment Method</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>{orderData?.paymentMethod}</Text>
                </View>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Payment Status</Text>
                    <Text className={`${orderData?.paymentStatus === "paid" ? "text-[#4ADE80]" : "text-red-400"} font-instrumentSansSemiBold`}>{orderData?.paymentStatus}</Text>
                </View>
                <View className='border border-[#565656] mt-2' />
                <View className='flex-row justify-between'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Subtotal</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>৳4,400</Text>
                </View>
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Shipping Fee</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>৳80</Text>
                </View>
                <View className='border border-[#565656] mt-2' />
                <View className='flex-row justify-between mt-2'>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>Total</Text>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold'>৳4,480</Text>
                </View>
            </View>

        </ScrollView>
    )
}

export default OrderHistoryDetails