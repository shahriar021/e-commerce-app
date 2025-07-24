import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { providerHomepage } from './demo';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import OrderHistory from '../Profile/OrderHistory';

const ProviderHomePage = () => {
    const { width, height } = Dimensions.get("screen");
    const [isAvailble, setIsAvailable] = useState(false)
    const [requestList] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
    const data = [
        { value: 50, label: 'Jan' },
        { value: 80, label: 'Feb' },
        { value: 90, label: 'Mar' },
        { value: 70, label: 'Apr' },
        { value: 60, label: 'May' },
        { value: 95, label: 'Jun' },
        { value: 75, label: 'Jul' },
        { value: 85, label: 'Aug' },
        { value: 55, label: 'Sep' },
        { value: 100, label: 'Oct' },
        { value: 65, label: 'Nov' },
        { value: 88, label: 'Dec' },
    ];
    const [orderHist] = useState(Array.from({ length: 10 }, (_, i) => i + 1))

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", padding: 5 }}>

            <ScrollView className='p-3 flex-1'>
                <View className="flex-row justify-between items-center mb-2">
                    <View className='flex-col'>
                        <Text className=" text-white font-prostoOne text-xl" >
                            Good Morning, Sarah
                        </Text>
                        <Text className='font-prostoOne text-[#9CA3AF]'>Tuesday, December 26</Text>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity ><Ionicons name="notifications" size={24} color="white" /></TouchableOpacity>
                    </View>
                </View>

                <View className='flex-row flex-wrap  justify-between'>
                    {
                        providerHomepage?.map(item =>
                            <View className='bg-[#2D2D2D] p-3 rounded-lg mb-1 mt-1 ' style={{
                                width: width * 0.45
                            }}>
                                <Text className='text-[#9CA3AF] font-prostoOne mb-2'>{item.name}</Text>
                                <View className='flex-row justify-between'>
                                    <Text className='flex-row text-white font-prostoOne text-xl'>{item.info}</Text>
                                    <Image source={item.image} />
                                </View>
                            </View>)}
                </View>

                {/*  */}

                <View className='bg-[#2D2D2D] p-3 rounded-lg mt-2 mb-2'>
                    <View className='flex-row justify-between mt-1 mb-2'>
                        <View className='flex-1'>
                            <Text className='text-white font-prostoOne'>Monthly Orders Trend</Text>
                            <Text className='text-[#ADAEBC] font-prostoOne'>Track your sales performance over time</Text>
                        </View>
                        <TouchableOpacity className='flex-row items-center bg-[#464747]  p-2 rounded-xl gap-2'>
                            <Text className='text-white'>2025</Text>
                            <AntDesign name="down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className=''>
                        <BarChart
                            data={data}
                            barWidth={10}
                            frontColor="#4A90E2"
                            yAxisThickness={0}
                            hideYAxisText
                            xAxisLabelTextStyle={{ color: 'white' }}
                            xAxisThickness={0}
                            isAnimated
                            hideRules

                        />
                    </View>

                </View>

                <View className='flex-row justify-between items-center mt-2 mb-2 p-3'>
                    <Text className='text-white font-prostoOne'>Order List</Text>
                    <View className='flex-row items-center gap-2'>
                        <Text className='text-white font-prostoOne'>See All</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </View>
                </View>

                {/*  */}

                <View className='flex-1 bg-[#121212] p-3'>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orderHist?.map(item => <TouchableOpacity key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' onPress={() => navigation.navigate("Order Details")}>
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
                            <View className=''>
                                <Text className='font-prostoOne text-[#9CA3AF]'>Placed: June 24</Text>

                            </View>

                            <View className='flex-row items-center gap-2 mt-2 mb-1'>
                                <TouchableOpacity className='flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1'>
                                    <AntDesign name="check" size={24} color="white" />
                                    <Text className='text-white font-prostoOne'>Mark Ready</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='items-center bg-[#121212] p-2 rounded-md'>
                                    <AntDesign name="eye" size={24} color="white" />
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>)}
                    </ScrollView>

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default ProviderHomePage