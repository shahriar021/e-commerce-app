import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetBrandHomeGraphQuery, useGetBrandHomeStatsQuery } from 'src/redux/features/brandHome/brandHomeApi';
import { useAppSelector } from 'src/redux/hooks';
import InputYearPicker from 'src/components/shared/inputYearPicker';
import { useGetBrandOrderListQuery } from 'src/redux/features/orders/orderApi';
import { brandHomeStatsName, days, month } from 'src/constants/providerHome';
import { providerHomepage } from './demo';
import { greetingTime } from 'src/utils/greetingTime';
import { BrandProfileResponse } from 'src/types/brand';
import { useGetNotificationQuery } from 'src/redux/features/notification/notificationApi';
import OrderListBrand from 'src/components/shared/OrderListBrand';

const ProviderHomePage = () => {
    const navigation = useNavigation()
    const date = new Date();
    const token = useAppSelector((state) => state.auth.token)
    console.log(token)
    const { width } = Dimensions.get("screen");
    const [profile, setProfile] = useState<BrandProfileResponse | null>(null);
    const currentMonthIndex = new Date().getMonth();
    const [year, setYear] = useState(date.getFullYear())
    const [showModal, setShowModal] = useState(false)
    const { data: getBrandHomeStats } = useGetBrandHomeStatsQuery(token)
    const { data: getBrandHomeGraph } = useGetBrandHomeGraphQuery({ token, year })
    const data = getBrandHomeGraph?.data.map((item: any, index: any) => ({
        value: item.orders,
        label: item.month,
        frontColor: index === currentMonthIndex ? "#DCF3FF" : "#464747",
    }));
    const { data: getOrdersBrand, isLoading: orderBrandLoading } = useGetBrandOrderListQuery({
        token,
        limit: 4,
    });
    const { data: notiData } = useGetNotificationQuery(token)

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

    const onSelectYr = (year: number) => {
        setYear(year)
    }

    const handleModal = () => {
        setShowModal(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", padding: 5 }}>
            <ScrollView className='p-3 flex-1'>
                <View className="flex-row justify-between items-center mb-2">
                    <View className='flex-col'>
                        <Text className=" text-white font-instrumentSansBold text-xl" >
                            Good {greetingTime(date.getHours())},{" "} {profile?.data?.brandName}
                        </Text>
                        <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>{days[date.getDay() as keyof typeof days]} , {month[date.getMonth() as keyof typeof month]} {date.getDate()}</Text>
                    </View>
                    <TouchableOpacity className="relative" onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name="notifications" size={24} color="white" />
                        {notiData?.data?.pagination?.total > 0 && (
                            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1">
                                <Text className="text-white text-[10px] font-bold">
                                    {notiData?.data?.pagination?.total > 99 ? '99+' : notiData?.data?.pagination?.total}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className='flex-row flex-wrap  justify-between'>
                    {getBrandHomeStats?.data &&
                        Object.keys(getBrandHomeStats?.data).map(item =>
                            <View key={item} className='bg-[#2D2D2D] p-3 rounded-lg mb-1 mt-1 ' style={{
                                width: width * 0.45
                            }}>
                                <Text className='text-[#9CA3AF] font-instrumentSansSemiBold mb-2'>{brandHomeStatsName[item as keyof typeof brandHomeStatsName]}</Text>
                                <View className='flex-row justify-between'>
                                    <Text className='flex-row text-white font-instrumentSansSemiBold text-xl'>{(getBrandHomeStats?.data[item])?.toFixed(2)}</Text>
                                    <Image source={providerHomepage[item as keyof typeof providerHomepage]} />
                                </View>
                            </View>)}
                </View>
                {/*  */}
                <View className="bg-[#2D2D2D] p-3 rounded-lg mt-2 mb-2">
                    <View className="flex-row justify-between mt-1 mb-2">
                        <View className="flex-1">
                            <Text className="text-white font-instrumentSansSemiBold">
                                Monthly Orders Trend
                            </Text>
                            <Text className="text-[#ADAEBC] font-instrumentRegular">
                                Track your sales performance over time
                            </Text>
                        </View>
                        <TouchableOpacity
                            className='flex-row items-center justify-between bg-[#464747] p-3 rounded-xl'
                            onPress={handleModal}
                        >
                            <Text className='text-white'>{year}</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center gap-2 w-full mt-1">
                        <View className="border-dashed border-2 border-white flex-1" />
                        <Text className="text-white font-instrumentRegular">$150</Text>
                    </View>
                    <View className="">
                        <BarChart
                            data={data}
                            barWidth={10}
                            frontColor="#DCF3FF"
                            yAxisThickness={0}
                            hideYAxisText
                            xAxisLabelTextStyle={{ color: "white" }}
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
                <OrderListBrand orderBrandListData={getOrdersBrand} loading={orderBrandLoading} token={token} />
            </ScrollView>
            <InputYearPicker visible={showModal} onClose={() => setShowModal(false)} onSelect={onSelectYr} propYear={year} />
        </SafeAreaView>
    )
}

export default ProviderHomePage