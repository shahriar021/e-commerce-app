import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { providerHomepage } from './demo';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import OrderHistory from '../Profile/OrderHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetBrandHomeGraphQuery, useGetBrandHomeStatsQuery } from 'src/redux/features/brandHome/brandHomeApi';
import { useAppSelector } from 'src/redux/hooks';
import InputSelectPicker from 'src/components/shared/InputSelectPicker';
import InputSelectYear from 'src/components/shared/InputSelectYear';
import InputYearPicker from 'src/components/shared/inputYearPicker';
import { useGetBrandOrderListQuery } from 'src/redux/features/orders/orderApi';
import { colorStatus, nameStatus } from 'src/constants/productInfos';

const days = {
    0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"
}

const month = { 0: 'January', 1: 'Februay', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'Augest', 8: 'September', 9: 'October', 10: 'November', 11: 'December' };

const brandHomeStatsName = {
    totalOrders: "Total Orders",
    totalSales: "Total Sales",
    totalReviews: "Total Reviews",
    totalProducts: "Total Products",
}


const ProviderHomePage = () => {
    const date = new Date();
    const token = useAppSelector((state) => state.auth.token)
    const [yearsData] = useState([2020, 2021, 2022, 2023, 2024, 2025])
    const { width, height } = Dimensions.get("screen");
    const [isAvailble, setIsAvailable] = useState(false)
    const [requestList] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
    const [profile, setProfile] = useState(null);
    const currentMonthIndex = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, setYear] = useState(date.getFullYear())
    const [showModal, setShowModal] = useState(false)
    const { data: getBrandHomeStats } = useGetBrandHomeStatsQuery(token)
    const { data: getBrandHomeGraph } = useGetBrandHomeGraphQuery({ token, year })
    console.log(token,"brand.")

    const data = getBrandHomeGraph?.data.map((item: any, index: any) => ({
        value: item.earnings,
        label: item.month,
        frontColor: index === currentMonthIndex ? "#DCF3FF" : "#464747", // <-- dynamic color
    }));
    const { data: getOrdersBrand } = useGetBrandOrderListQuery({
        token,
        limit: 4,
    });
    const [orderHist] = useState(Array.from({ length: 10 }, (_, i) => i + 1))

    const navigation = useNavigation()

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user_profile');
                if (jsonValue != null) {
                    setProfile(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error("Failed to load profile from AsyncStorage", e);
            }
        };

        loadProfile();
    }, []);
    useFocusEffect(
        useCallback(() => {
            const loadProfile = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('user_profile');
                    if (jsonValue != null) {
                        setProfile(JSON.parse(jsonValue));
                    }
                } catch (e) {
                    console.error("Failed to load profile from AsyncStorage", e);
                }
            };
            loadProfile();
            return () => {
            };

        }, [])
    );


    const value = date.getHours()
    const greetingTime = (value: any) => {

        if (value >= 6 && value > 12) {
            return "Morning"
        } else if (value >= 12 && value < 18) {
            return "Afternoon"
        } else {
            return "Night"
        }

    }

    const [isListVisible, setIsListVisible] = useState(false);
    // State to hold the currently selected year (optional, but useful)
    const [selectedYear, setSelectedYear] = useState(yearsData[yearsData.length - 1] || 'Select Year');

    const onSelectYr = (year) => {
        setYear(year)
    }

    const handleModal = () => {
        setShowModal(true)
    }
    const handleStatus = async (id: any, status: any) => {
        const info = {
            data: {
                sellerStatus: status,
                cartProductId: id,
            },
        };
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", padding: 5 }}>
            <ScrollView className='p-3 flex-1'>
                <View className="flex-row justify-between items-center mb-2">
                    <View className='flex-col'>
                        <Text className=" text-white font-instrumentSansBold text-xl" >
                            Good {greetingTime(date.getHours())}, {profile?.data?.brandName}
                        </Text>
                        <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>{days[date.getDay() as keyof typeof days]} , {month[date.getMonth() as keyof typeof month]} {date.getDate()}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity ><Ionicons name="notifications" size={24} color="white" /></TouchableOpacity>
                    </View>
                </View>
                <View className='flex-row flex-wrap  justify-between'>
                    {getBrandHomeStats?.data &&
                        Object.keys(getBrandHomeStats?.data).map(item =>
                            <View key={item} className='bg-[#2D2D2D] p-3 rounded-lg mb-1 mt-1 ' style={{
                                width: width * 0.45
                            }}>
                                <Text className='text-[#9CA3AF] font-instrumentSansSemiBold mb-2'>{brandHomeStatsName[item]}</Text>
                                <View className='flex-row justify-between'>
                                    <Text className='flex-row text-white font-instrumentSansSemiBold text-xl'>{getBrandHomeStats?.data[item]}</Text>
                                    <Image source={providerHomepage[item]} />
                                </View>
                            </View>)}
                </View>
                {/*  */}
                <View className='bg-[#2D2D2D] p-3 rounded-lg mt-2 mb-2'>
                    <View className='flex-row justify-between mt-1 mb-2'>
                        <View className='flex-1'>
                            <Text className='text-white font-instrumentSansSemiBold'>Monthly Orders Trend</Text>
                            <Text className='text-[#ADAEBC] font-instrumentRegular'>Track your sales performance over time</Text>
                        </View>
                        <TouchableOpacity
                            className='flex-row items-center justify-between bg-[#464747] p-3 rounded-xl'
                            onPress={handleModal}
                        >
                            <Text className='text-white'>{year}</Text>
                        </TouchableOpacity>

                    </View>
                    <View className='flex-row items-center gap-2 w-full mt-1'>
                        <View className='border-dashed border-2 border-white flex-1' />
                        <Text className='text-white font-instrumentRegular'>$150</Text>
                    </View>
                    <View className=''>
                        <BarChart
                            data={data}
                            barWidth={10}
                            frontColor="#DCF3FF"
                            yAxisThickness={0}
                            hideYAxisText
                            xAxisLabelTextStyle={{ color: 'white' }}
                            xAxisThickness={0}
                            isAnimated
                            hideRules
                        />
                    </View>
                </View>
                <TouchableOpacity className='flex-row justify-between items-center mt-2 mb-2 p-3' onPress={() => navigation.navigate("Order List")}>
                    <Text className='text-white font-instrumentSansSemiBold'>Order List</Text>
                    <View className='flex-row items-center gap-2'>
                        <Text className='text-white font-instrumentSansSemiBold'>See All</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                {/*  */}
                <View className='flex-1 bg-[#121212] p-3'>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {getOrdersBrand?.data?.data?.map(item => <View key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2'>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[#fff] font-instrumentSansSemiBold'>#83473</Text>
                                <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentSansSemiBold' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>Processing</Text>
                            </View>
                            <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                                <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                                    <Image source={require("../../../assets/e-icon/orderHist.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-row justify-between flex-1 items-center'>
                                    <View className='flex-col'>
                                        <Text className='font-instrumentSansSemiBold text-white'>Black Formal Dress</Text>
                                        <Text className='font-instrumentRegular text-[#9CA3AF]'>Qty: 2 | Size: M</Text>
                                    </View>
                                    <View><Text className='font-instrumentSansSemiBold text-white'>৳4,400</Text></View>
                                </View>
                            </View>
                            <View className=''>
                                <Text className='font-instrumentRegular text-[#9CA3AF]'>Placed: June 24</Text>
                            </View>
                            <View className='flex-row items-center gap-2 mt-2 mb-1'>
                                <TouchableOpacity className='flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1' style={{
                                    backgroundColor:
                                        colorStatus[
                                        item?.sellerStatus as keyof typeof colorStatus
                                        ],
                                }}
                                    onPress={() =>
                                        handleStatus(item?.cartProductId, item?.sellerStatus)
                                    }>
                                    <AntDesign name="check" size={24} color="white" />
                                    <Text className='text-white font-instrumentSansBold'>{nameStatus[item?.sellerStatus as keyof typeof nameStatus]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='items-center bg-[#121212] p-2 rounded-md' onPress={() => navigation.navigate("Order Details", { id: item?.cartProductId })}>
                                    <AntDesign name="eye" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </ScrollView>
                </View>
            </ScrollView>
            <InputYearPicker visible={showModal} onClose={() => setShowModal(false)} onSelect={onSelectYr} propYear={year} />
        </SafeAreaView>
    )
}

export default ProviderHomePage