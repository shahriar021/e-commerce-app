import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

const OrderHistory = () => {
    const [orderHist]=useState(Array.from({length:10},(_,i)=>i+1))
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Order History",
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
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <View className='flex-1 bg-[#121212] p-3'>

            <ScrollView showsVerticalScrollIndicator={false}>
               {orderHist.map(item=> <TouchableOpacity key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' onPress={()=>navigation.navigate("Order Details")}>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[#fff] font-prostoOne'>#83473</Text>
                        <Text className='text-[#FB923C] p-2 rounded-2xl' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>Processing</Text>
                    </View>
                    <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                        <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                            <Image source={require("../../../assets/e-icon/orderHist.png")} style={{ width: "100%", height: "100%" }} />
                        </View>
                        <View className='flex-row justify-between flex-1 items-center'>
                            <View className='flex-col'>
                                <Text className='font-prostoOne text-white'>Black Formal Dress</Text>
                                <Text className='font-prostoOne text-[#9CA3AF]'>Qty: 2 | Size: M</Text>
                            </View>
                            <View><Text className='font-prostoOne text-white'>৳4,400</Text></View>
                        </View>
                    </View>
                    <View className='flex-row justify-between  items-center'>
                            <Text className='font-prostoOne text-[#9CA3AF]'>Placed: June 24</Text>
                        <TouchableOpacity><Text className='font-prostoOne text-[#9CA3AF]'>View -></Text></TouchableOpacity>
                    </View>
                </TouchableOpacity>)}
            </ScrollView>

        </View>
    )
}

export default OrderHistory