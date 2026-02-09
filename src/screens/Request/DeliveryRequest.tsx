import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

const DeliveryRequestView = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTitleAlign:"center",
            headerTintColor:"#626262",
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
        <View className='flex-1 p-2'>
            <View style={{ width: "100%", height: verticalScale(100) }} className='border border-gray-300 rounded-2xl overflow-hidden p-1 flex-row gap-2'>
                <View style={{ width: scale(80), height: "100%" }}>
                    <Image source={require("../../../assets/e-icon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} className='rounded-2xl' />
                </View>
                <View className='flex-1 '>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-robotoBold text-xl'>Red n hot pizza</Text>

                    </View>
                    <Text className='text-[#222222]'>Order ID:1fd21rg</Text>
                    <View className='flex-1 flex-row items-center  gap-3'>
                        <View className='flex-row items-center gap-2'><Image source={require("../../../assets/e-icon/calendar-03.png")} />
                            <Text>May 10</Text>
                        </View>
                        <View className='flex-row items-center gap-2 '>
                            <Image source={require("../../../assets/e-icon/clock-01.png")} />
                            <Text>08:00 pm</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
                <View>
                    <Text className='font-robotoBold text-2xl mt-2'>Receiver</Text>
                    <Text className='font-robotoRegular mt-1 mb-1'>Name: <Text className='font-robotoBold'>Sarah Okechukwu</Text></Text>
                    <Text className='font-robotoRegular mt-1 mb-1'>Phone: <Text className='font-robotoBold'>+234 803 123 4567</Text></Text>

                    <Text className='font-robotoBold text-2xl mt-2'>Special Instructions</Text>
                    <Text className='font-robotoRegular mt-1 mb-1'>Call me when you arrive. Leave it at the door. Use the side gate.</Text>
                    <View className='flex-row items-center gap-2 mt-1 mb-1'>
                        <Image source={require("../../../assets/e-icon/orderLocation.png")} style={{ width: 20, height: 20 }} />
                        <Text className='text-[#BA2720]'>Pickup Location</Text>
                        
                    </View>
                    <Text className='font-robotoBold text-xl mt-1 mb-1'>32 Samwell Sq, Chevron</Text>
                    <View className='border border-gray-200' />
                    <View className='flex-row items-center gap-2 mt-1 mb-1'>
                        <Image source={require("../../../assets/e-icon/orderLocation.png")} style={{ width: 20, height: 20 }} />
                        <Text className='text-[#BA2720]'>Delivery Location</Text>
                        
                    </View>
                    <Text className='font-robotoBold text-xl mt-1 mb-1'>21b, Karimu Kotun Street, Victoria Island</Text>
                    <View className='border border-gray-200' />
                    <View className='w-full mt-2'>
                        <Text className='font-robotoBold'>21b, Karimu Kotun Street, Victoria Island</Text>
                        <Text className='font-robotoBold mt-1'>Order Details</Text>
                        <Text>2x Chicken Burger</Text>
                        <Text>1x Fries</Text>
                        <Text>1x Coke</Text>

                    </View>
                    <View className='border border-gray-100 w-full mx-3 mb-1' />
                    <View className='flex-row justify-between w-full'>
                        <Text className='font-robotoBold'>Subtotal</Text>
                        <Text className='font-robotoBold'>$33.56 <Text className='text-[#9796A1] font-robotoBold'>USD</Text></Text>
                    </View>

                    <TouchableOpacity className='flex-row items-center justify-center gap-1 mt-3 mb-3' onPress={()=>navigation.navigate("Map" as never)}>
                        <Text className='text-[#BD2923]'>View Map Route</Text>
                        <AntDesign name="arrowright" size={24} color="#BD2923" />
                    </TouchableOpacity>
                    <View className='flex-row items-center justify-between gap-2 mt-3'>
                        <TouchableOpacity className='flex-1 p-4 items-center border border-[#4BB54B] rounded-full bg-green-100'>
                            <Image source={require("../../../assets/e-icon/tick.png")} style={{width:30,height:30}}/>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-1 p-4 items-center border border-[#BA2A23] rounded-full bg-red-100'>
                            <Image source={require("../../../assets/e-icon/crs.png")} style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DeliveryRequestView