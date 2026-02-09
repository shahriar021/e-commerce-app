import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'

const History = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTintColor: "#626262",
            headerLeft: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            }
        })
    }, [navigation])

    return (
        <View className='flex-1  p-3'>

            <View className='flex-row justify-between items-center border border-[#0000000D] rounded-2xl p-2  overflow-hidden mt-1 mb-2 shadow-slate-500' style={{
                height: verticalScale(100),// Shadow for iOS
                shadowColor: '#000', // iOS shadow color
                shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
                shadowOpacity: 0.1, // iOS shadow opacity
                shadowRadius: 6, // iOS shadow blur radius
                elevation: 5, // Android shadow (depth)
            }} >
                <View style={{ width: scale(80), height: "100%" }} className=' rounded-xl overflow-hidden'>
                    <Image source={require("../../../assets/e-icon/nearbyRes.png")} style={{ width: "100%", height: "100%", borderRadius: 11 }} />
                </View>

                <View className='flex-col gap-2'>
                    <Text className='text-[#33363F]'>#ORD-78329</Text>
                    <Text className='text-[#33363F]'>From: KFC Main Street</Text>
                    <Text className='text-[#33363F]'>To: John Doe, Elm Street</Text>
                    <Text className='text-[#33363F]'>Delivered at: 2:45 PM</Text>
                    <Text className='text-[#33363F]'>Earnings: $5.75</Text>
                </View>

                <View className='border border-[#308960] bg-green-100 items-center p-2 rounded-full'>
                    <Text className='text-[#308960]'>Completed</Text>
                </View>
            </View>

        </View>
    )
}

export default History