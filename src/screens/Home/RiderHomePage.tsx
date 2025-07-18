import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const RiderHomePage = () => {
    const { width, height } = Dimensions.get("screen");
    const [isAvailble, setIsAvailable] = useState(false)
    const [requestList]=useState(Array.from({length:10},(_,i)=>i+1))

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <View className='p-2 flex-1'>
                <View className="flex-row justify-between items-center mb-2">
                    <View className=" rounded-full overflow-hidden " style={{ width: width * 0.15, height: width * 0.15, }}>
                        <Image source={require("../../../assets/restroIcon/image 13.png")} style={{ width: "100%", height: "100%", resizeMode: "stretch" }} />
                    </View>
                    <View className="flex-row items-center">

                        {isAvailble ? <TouchableOpacity onPress={() => setIsAvailable(false)}><MaterialCommunityIcons name="toggle-switch" size={54} color="#4BB54B" /></TouchableOpacity>
                            : <TouchableOpacity onPress={() => setIsAvailable(true)}><MaterialCommunityIcons name="toggle-switch-off" size={54} color="#4BB54B" /></TouchableOpacity>}
                    </View>
                </View>

                <View className='border mt-2 mb-1 border-gray-200 p-2 rounded-md '>
                    <Text className='text-[#6B6B6B] font-dmsansBold text-xl'>Available Balance</Text>
                    <Text className='text-[#1E1E1E] text-2xl font-robotoBold'>$322.40</Text>
                </View>

                <View className='flex-row items-center justify-between mt-1 mb-2 px-2'>
                    <View className='flex-row gap-2 items-center'>
                        <Text className='font-robotoBold text-xl'>Available Requests</Text>
                        <Text className='text-[#BA2720]'>(12)</Text>
                    </View>
                    <TouchableOpacity>
                        <Text className='text-[#BA2720] text-xl'>See All..</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: 10,  }} showsVerticalScrollIndicator={false}>
                    {/* card start */}
                    {requestList.map(item=>
                    <TouchableOpacity key={item} className='border p-1 border-gray-200 rounded-xl mb-3' onPress={()=>navigation.navigate("Delivery Request")}>
                        {/* first view */}
                        <View className='flex-row items-center justify-between  p-2 '>
                            <View className='flex-row gap-2'>
                                <View style={{ width: scale(50), height: verticalScale(70) }} className='rounded-md overflow-hidden'>
                                    <Image source={require("../../../assets/restroIcon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col'>
                                    <Text className='font-robotoBold text-xl'>Urban Palate</Text>
                                    <Text className='font-robotoBold'>
                                        Receiver Name: <Text className='font-robotoRegular text-[#222222]'>Robert Fox</Text>
                                    </Text>
                                </View>
                            </View>
                            <View className='flex-row items-center gap-2'>
                                <Image source={require("../../../assets/restroIcon/clock-01 2.png")} style={{ width: 20, height: 20 }} />
                                <Text className='text-[#2E2E2E]'>8:00 PM</Text>
                            </View>
                        </View>

                        {/* second view */}
                        <View className='flex-row items-center justify-between'>
                        <View className='flex-col p-2 mt-2 rounded-md'>
                            <Text className='text-[#888888]'>Drop off: <Text className='text-[#222222]'>Downtown LA</Text></Text>
                            <Text className='text-[#888888]'>Earning: <Text className='text-[#222222]'>$3.75</Text></Text>
                        </View>
                        <View className='flex-row gap-4'>
                            <TouchableOpacity>
                                <Image source={require("../../../assets/restroIcon/ok.png")} style={{width:34,height:34}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../../assets/restroIcon/cross.png")} style={{width:34,height:34}}/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </TouchableOpacity>)}
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default RiderHomePage