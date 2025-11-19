import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useAppSelector } from 'src/redux/hooks'
import { useOrderHistoryQuery } from 'src/redux/features/profile/profile/profileApi'
// Import dayjs for date formatting
import dayjs from 'dayjs' 

const OrderHistory = () => {
    // ⚠️ Removed the unused local 'orderHist' state for cleanliness
    // const [orderHist]=useState(Array.from({length:10},(_,i)=>i+1)) 
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()
    const token = useAppSelector((state)=>state.auth.token)
    const {data:getOrderHist}=useOrderHistoryQuery(token)
    
    console.log(token,"order history..")
   

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Order History",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, 
                shadowOpacity: 0, 
                borderBottomWidth: 0,
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            // Corrected font style property name
            headerTitleStyle: { fontFamily: 'instruemntSans-Bold' }, 
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    
    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <ScrollView showsVerticalScrollIndicator={false}>
               {Array.isArray(getOrderHist?.data?.data) && getOrderHist?.data?.data?.map(item => {
                    // Get the first item in the order for display details
                    const firstItem = item.items?.[0]; 
                    
                    // Calculate total price (Assuming price is stored in the first item)
                    const totalPrice = firstItem ? (firstItem.price * firstItem.quantity).toFixed(2) : 'N/A';
                    
                    // Format the date using dayjs (requires dayjs import from your package.json)
                    const placedDate = item.createdAt ? dayjs(item.createdAt).format('MMMM DD') : 'N/A';
                    
                    return (
                        <TouchableOpacity 
                            // ❌ FIX: Key prop must be the unique string ID
                            key={item._id} 
                            className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' 
                            // Navigate to details and pass the order ID
                            onPress={() => navigation.navigate("OrderHistoryDetails", { orderId: item._id })}
                        >
                            <View className='flex-row justify-between items-center'>
                                {/* ✅ DYNAMIC: Order ID */}
                                <Text className='text-[#fff] font-instrumentSansSemiBold'>
                                    #{item._id ? item._id.slice(-8) : 'N/A'}
                                </Text>
                                {/* ✅ DYNAMIC: Status (using sellerStatus as example) */}
                                <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentSansSemiBold' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>
                                    {firstItem?.sellerStatus || 'Processing'}
                                </Text>
                            </View>
                            <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                                <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                                    {/* ✅ DYNAMIC: Product Image */}
                                    <Image 
                                        source={{ uri: firstItem?.productImages?.[0] }} 
                                        style={{ width: "100%", height: "100%" }} 
                                        resizeMode="cover" 
                                    />
                                </View>
                                <View className='flex-row justify-between flex-1 items-center'>
                                    <View className='flex-col'>
                                        {/* ✅ DYNAMIC: Product Name (Already correct) */}
                                        <Text className='font-instrumentSansSemiBold text-white'>{firstItem?.productName}</Text>
                                        {/* ✅ DYNAMIC: Quantity and Size */}
                                        <Text className='font-instrumentRegular text-[#9CA3AF]'>
                                            Qty: {firstItem?.quantity || 1} | Size: {firstItem?.size || 'M'}
                                        </Text>
                                    </View>
                                    {/* ✅ DYNAMIC: Total Price */}
                                    <View>
                                        <Text className='font-instrumentSansSemiBold text-white'>
                                            ৳{totalPrice}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View className='flex-row justify-between  items-center'>
                                {/* ✅ DYNAMIC: Placed Date */}
                                <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>Placed: {placedDate}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Order Details", { orderId: item._id })}>
                                    <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>View -></Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
               })}
            </ScrollView>
        </View>
    )
}

export default OrderHistory