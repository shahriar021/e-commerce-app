import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters';
import { useDimensionsChange } from 'react-native-responsive-dimensions';

const MyOrders = () => {

    const {width}=useWindowDimensions()
    const navigation: any = useNavigation()
    const [isUpcoming, setIsUpcoming] = useState(true)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleAlign: "center"
        })
    }, [navigation])

    return (
        <View className='bg-white flex-1 items-center p-3 ' style={{width:width}}>
            <View className='flex-row border w-full rounded-full overflow-hidden border-gray-300 p-1 mx-3'>
                <TouchableOpacity className={`${isUpcoming ? "bg-[#C21A1E]" : "bg-white"} py-3 flex-1 rounded-full items-center`} onPress={() => setIsUpcoming(true)}>
                    <Text className={`${isUpcoming ? "text-white" : "text-black"}`}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${!isUpcoming ? "bg-[#C21A1E]" : "bg-white"} py-3 flex-1 rounded-full items-center`} onPress={() => setIsUpcoming(false)}>
                    <Text className={`${!isUpcoming ? "text-white" : "text-black"}`}>History</Text>
                </TouchableOpacity>
            </View>

            {isUpcoming ?
                <View className='mt-3 mb-1 border border-gray-300 rounded-2xl p-2 ' style={{ width: "100%" }}>
                    <View className='flex-row items-center justify-between'>
                        <View className='flex-row items-center gap-2'>
                            <View className='rounded-xl overflow-hidden' style={{ width: scale(48), height: verticalScale(48) }} >
                                <Image source={require("../../../assets/e-icon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <Text className='font-robotoBold font-bold text-black text-xl'>The Burger Spot</Text>
                        </View>
                        <Text className='text-[#3B55C4] border border-[#3B55C4] rounded-full p-2 text-center'>Preparing</Text>
                    </View>
                    <Text className='font-robotoRegular text-lg text-black mt-2 mb-2'>Estimated Arrival</Text>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-semibold font-robotoRegular text-xl'>25 <Text className='text-[#9796A1]'>min</Text></Text>
                        <Text className='font-semibold font-robotoRegular text-xl'>$27.89 <Text className='text-[#9796A1]'>USD</Text></Text>
                    </View>

                    <View className='flex-row  items-center gap-2 mt-3'>
                        <TouchableOpacity className='border p-3 border-[#C21A1E] rounded-full flex-1 items-center'>
                            <Text className='text-[#C21A1E]'>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className='border p-3 border-[#C21A1E] rounded-full flex-1 items-center bg-[#C21A1E]' onPress={() => navigation.navigate("Track Order")}>
                            <Text className='text-white'>Track Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : <View className='mt-3 mb-1 border border-gray-300 rounded-xl p-2 ' style={{ width: "100%" }}>
                    <View className='flex-row items-center justify-between'>
                        <View className='flex-row items-center gap-2'>
                            <View className='rounded-xl overflow-hidden' style={{ width: scale(48), height: verticalScale(48) }} >
                                <Image source={require("../../../assets/e-icon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <Text className='font-robotoBold font-bold text-black text-xl'>The Burger Spot</Text>
                        </View>
                        <Text className='text-[#19CC49] border border-[#19CC49] rounded-full p-2 text-center'>Deliverd</Text>
                    </View>
                    <Text className='font-robotoRegular text-lg text-black mt-2 mb-2'>2x Cheese Burger</Text>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-semibold font-robotoRegular text-xl'>Subtotal </Text>
                        <Text className='font-semibold font-robotoRegular text-xl'>$27.89 <Text className='text-[#9796A1]'>USD</Text></Text>
                    </View>

                    <View className='flex-row  items-center gap-2 mt-3'>
                        <TouchableOpacity className='border p-3 border-[#C21A1E] rounded-full flex-1 items-center' onPress={() => navigation.navigate("View Details")}>
                            <Text className='text-[#C21A1E]'>View Details</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className='border p-3 border-[#C21A1E] rounded-full flex-1 items-center bg-[#C21A1E]'>
                            <Text className='text-white'>Re Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>}


        </View>
    )
}

export default MyOrders