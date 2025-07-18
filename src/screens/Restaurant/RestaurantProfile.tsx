import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import PopularItemsList from './PopularItemsList';
import AllItemList from './AllItemList';

const { width, height } = Dimensions.get("screen");

const RestaurantProfile = () => {

    const navigation = useNavigation()

    const [isPopular, setIsPopular] = useState(true)

    return (
        <View className='flex-1 relative'>
            <Image source={require("../../../assets/restroIcon/rProfile.jpg")} style={{ width: "100%", height: 250 }} />
            <TouchableOpacity className='p-1 absolute left-2 top-14' onPress={() => navigation.goBack()}>
                <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full bg-white'>
                    <Entypo name="chevron-small-left" size={24} color="red" />
                </View>
            </TouchableOpacity>
            <View className='flex-1 bg-white p-3'>
                <Text className='mt-2 text-start text-black font-robotoBold text-xl'>Urban Palate</Text>
                {/* <View className='flex-row  gap-2'>
                    <View className='flex-col items-start  mt-3 w-1/2 gap-2'>
                    <View className='flex-row gap-2 items-center'>
                        <Image source={require("../../../assets/restroIcon/Message_light.png")} style={{width:20,height:20}}/>
                        <Text>(605) 955-126</Text>
                    </View>
                    <View className='flex-row gap-2 items-center'>
                        <Image source={require("../../../assets/restroIcon/Phone_light.png")} style={{width:20,height:20}}/>
                        <Text>gmai.com</Text>
                    </View>
                 </View>
                <View className='flex-col items-right  mt-3 w-1/2 gap-2 bg-red-500 self-end items-start '>
                    <View className='flex-row gap-2 items-center'>
                        <Image source={require("../../../assets/restroIcon/elements.png")} style={{width:20,height:20}}/>
                        <Text>Mon-Sun</Text>
                    </View>
                    <View className='flex-row gap-2 items-center'>
                        <Image source={require("../../../assets/restroIcon/clock-01.png")} style={{width:20,height:20}}/>
                        <Text>8.00 pm 10.00 pm</Text>
                    </View>
                 </View>
                 </View> */}

                <View style={{height:height*0.25}}>
                    <View className="flex-row w-full mt-3 gap-2 items-center">
                    {/* Left Column */}
                    <View className="flex-col w-1/2 gap-2">
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={require("../../../assets/restroIcon/Message_light.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text>(605) 955-126</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={require("../../../assets/restroIcon/Phone_light.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text>gmail.com</Text>
                        </View>
                    </View>

                    {/* Right Column */}
                    <View className="flex-col w-1/2 ml-auto gap-2 items-start">
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={require("../../../assets/restroIcon/elements.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text>Mon-Sun</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={require("../../../assets/restroIcon/clock-01.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text>8.00 pm - 10.00 pm</Text>
                        </View>
                    </View>
                </View>

                <View className='flex-row items-center mt-3'>
                    <Entypo name="dot-single" size={24} color="black" />
                    <Text>Happy Hour: 5:00 – 7:00 PM | 2-for-1 Cocktails</Text>
                </View>
                <View className='flex-row mt-3 items-center'>
                    <Entypo name="dot-single" size={24} color="black" />
                    <Text>NikoSafe Verified: Scan QR for Safe Entry   Certified by xxxx Health Dept, 2025</Text>
                </View>
                

                <Text className='mt-2 text-start text-black font-robotoBold text-xl'>Menu<Text className='text-gray-300'>(List of Dishes)</Text></Text>

                <View className='flex-row gap-5 mt-3'>
                    <TouchableOpacity onPress={() => setIsPopular(true)}>
                        <Text className={`${isPopular ? "underline text-[#C21A1E]" : "text-black"} font-robotoRegular`}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsPopular(false)}>
                        <Text className={`${!isPopular ? "underline text-[#C21A1E]" : "text-black"} font-robotoRegular`}>All</Text>
                    </TouchableOpacity>
                </View>
                </View>

                <View className='flex-1 items-center mt-4'>
                    {isPopular ? <PopularItemsList /> : <AllItemList />}
                </View>
            </View>
        </View>
    )
}

export default RestaurantProfile