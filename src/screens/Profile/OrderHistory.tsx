import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useAppSelector } from 'src/redux/hooks'
import { useOrderHistoryQuery } from 'src/redux/features/profile/profile/profileApi'
import dayjs from 'dayjs' 
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'src/types/screens'
import { Order } from 'src/types/profile'

type Props={
  navigation:StackNavigationProp<RootStackParamList,"Order History">
}

const OrderHistory = ({navigation}:Props) => {
    const token = useAppSelector((state)=>state.auth.token)
    const {data:getOrderHist,isLoading}=useOrderHistoryQuery(token)
    
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

    if(isLoading){
       return <View className='flex-1'><ActivityIndicator size={"large"} color={"white"}/></View>
    }

    
    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <ScrollView showsVerticalScrollIndicator={false}>
               {Array.isArray(getOrderHist?.data?.data) && getOrderHist?.data?.data?.length>0? 
               getOrderHist?.data?.data?.map((item:Order) => {
                    const firstItem = item.items?.[0]; 
                    
                    const totalPrice = firstItem ? (firstItem.price * firstItem.quantity).toFixed(2) : 'N/A';
                    
                    const placedDate = item.createdAt ? dayjs(item.createdAt).format('MMMM DD') : 'N/A';
                    
                    return (
                        <TouchableOpacity 
                            key={item._id} 
                            className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' 
                            onPress={() => navigation.navigate("OrderHistoryDetails", { orderId: item._id })}
                        >
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[#fff] font-instrumentSansSemiBold'>
                                    #{item._id ? item._id.slice(-8) : 'N/A'}
                                </Text>
                                <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentSansSemiBold' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>
                                    {firstItem?.sellerStatus || 'Processing'}
                                </Text>
                            </View>
                            <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                                <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                                    <Image 
                                        source={{ uri: firstItem?.productImages?.[0] }} 
                                        style={{ width: "100%", height: "100%" }} 
                                        resizeMode="cover" 
                                    />
                                </View>
                                <View className='flex-row justify-between flex-1 items-center'>
                                    <View className='flex-col'>
                                        <Text className='font-instrumentSansSemiBold text-white'>{firstItem?.productName}</Text>
                                        <Text className='font-instrumentRegular text-[#9CA3AF]'>
                                            Qty: {firstItem?.quantity || 1} | Size: {firstItem?.size || 'M'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text className='font-instrumentSansSemiBold text-white'>
                                            ৳{totalPrice}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View className='flex-row justify-between  items-center'>
                                <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>Placed: {placedDate}</Text>
                                <View >
                                    <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>View {'->'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
               }):<Text className='text-white text-xl text-center'>No Order History!</Text>}
            </ScrollView>
        </View>
    )
}

export default OrderHistory