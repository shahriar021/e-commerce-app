import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const OrderList = () => {
    const [orderHist] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTintColor:"white",
            headerLeft: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            }
        })
    }, [navigation])
    return (
        <View className='flex-1 p-3'>
            <ScrollView showsVerticalScrollIndicator={false}>
                {orderHist?.map(item => <View key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' >
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[#fff] font-helvetica'>#83473</Text>
                        <Text className='text-[#FB923C] p-2 rounded-2xl' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>Processing</Text>
                    </View>
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
                    <View className=''>
                        <Text className='font-helvetica text-[#9CA3AF]'>Placed: June 24</Text>

                    </View>

                    <View className='flex-1 items-center  mt-2 mb-1'>
                        <TouchableOpacity className='w-full flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1'>
                            <AntDesign name="check" size={24} color="white" />
                            <Text className='text-white font-helvetica'>Mark Ready</Text>
                        </TouchableOpacity>

                    </View>

                </View>)}
            </ScrollView>
        </View>
    )
}

export default OrderList