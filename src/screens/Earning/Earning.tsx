import {
    View,
    Text,
    useWindowDimensions,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-gifted-charts";
import { useAppSelector } from "src/redux/hooks";
import { useGetEarningStatsQuery, useGetGraphQuery, useGetTransactionQuery } from "src/redux/features/earning/earningApi";
import InputYearPicker from "src/components/shared/inputYearPicker";

const Earning = () => {
    const navigation = useNavigation<any>();
    const { width } = useWindowDimensions();
    const date = new Date();
    const token = useAppSelector((state) => state.auth.token);
    const currentMonthIndex = new Date().getMonth();
    const [year, setYear] = useState(date.getFullYear())
    const [showModal, setShowModal] = useState(false)
    const { data: getEarningGraph } = useGetGraphQuery({token,year});
    const { data: getEarningStats } = useGetEarningStatsQuery(token);
    const { data: getTransaction } = useGetTransactionQuery(String(token));
    const data = getEarningGraph?.data.map((item: any, index: any) => ({
        value: item.earnings,
        label: item.month,
        frontColor: index === currentMonthIndex ? "#DCF3FF" : "#464747",
    }));

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                fontFamily: "instrumentSans-BOld",
                fontSize: 20,
                color: "white",
            },
            headerTitle: "Earning",
            headerTintColor: "#33363F",
            headerTitleAlign: "start",
        });
    }, [navigation]);
    const onSelectYr = (year: number) => {
        setYear(year)
    }

    const handleModal = () => {
        setShowModal(true)
    }

    return (
        <ScrollView
            className="flex-1 bg-[#121212] p-5"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <View className="flex-row flex-wrap justify-between">
                <View
                    className="rounded-lg overflow-hidden"
                    style={{ width: width * 0.45 }}
                >
                    <LinearGradient
                        colors={["#10B981", "#16A34A"]}
                        style={{ padding: 10 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View className="flex-row justify-between items-center">
                            <Image source={require("../../../assets/e-icon/Wallet.png")} />
                            <Text className="text-[#DCF3FF] font-instrumentRegular">
                                Total Earnings
                            </Text>
                        </View>
                        <Text className="text-white text-xl mt-2 font-instrumentSansSemiBold">
                            {(getEarningStats?.data?.totalEarning)?.toFixed(2)} $
                        </Text>
                        <Text className="text-white font-instrumentSansSemiBold">
                            Total Earnings
                        </Text>
                    </LinearGradient>
                </View>
                <View
                    className="rounded-lg overflow-hidden"
                    style={{ width: width * 0.45 }}
                >
                    <LinearGradient
                        colors={["#3B82F6", "#2563EB"]}
                        style={{ padding: 10 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View className="flex-row justify-between items-center">
                            <Image source={require("../../../assets/e-icon/Wallet.png")} />
                            <Text className="text-[#DCF3FF] font-instrumentRegular">
                                Monthly
                            </Text>
                        </View>
                        <Text className="text-white text-xl mt-2 font-instrumentSansSemiBold">
                            {(getEarningStats?.data?.monthlyEarning)?.toFixed(2)} $
                        </Text>
                        <Text className="text-white font-instrumentSansSemiBold">
                            Total Earnings
                        </Text>
                    </LinearGradient>
                </View>
            </View>
            <View className="flex-row flex-wrap justify-between mt-2 mb-2">
                <View
                    className="rounded-lg overflow-hidden"
                    style={{ width: width * 0.45 }}
                >
                    <LinearGradient
                        colors={["#212121", "#212121"]}
                        style={{ padding: 10 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View className="flex-row justify-between items-center">
                            <Image source={require("../../../assets/e-icon/Wallet.png")} />
                            <Text
                                className={`{
 text-[#4ADE80] font-instrumentRegular`}
                            >
                                Available
                            </Text>
                        </View>
                        <Text className="text-white text-xl mt-2 font-instrumentSansSemiBold">
                            {(getEarningStats?.data?.available)?.toFixed(2)} $
                        </Text>
                        <Text className="text-[#DCF3FF] font-instrumentSansSemiBold">
                            For Withdrawal
                        </Text>
                    </LinearGradient>
                </View>
                <View
                    className="rounded-lg overflow-hidden"
                    style={{ width: width * 0.45 }}
                >
                    <LinearGradient
                        colors={["#212121", "#212121"]}
                        style={{ padding: 10 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View className="flex-row justify-between items-center">
                            <Image source={require("../../../assets/e-icon/Wallet.png")} />
                            <Text
                                className={`{
                                                text-[#FB923C] font-instrumentRegular`}
                            >
                                Pending
                            </Text>
                        </View>
                        <Text className="text-white text-xl mt-2 font-instrumentSansSemiBold">
                            {(getEarningStats?.data?.totalPending)?.toFixed(2)} $
                        </Text>
                        <Text className="text-[#DCF3FF] font-instrumentSansSemiBold">
                            Processing
                        </Text>
                    </LinearGradient>
                </View>
            </View>

            <View className="bg-[#212121] p-3 rounded-lg">
                <Text className="text-white font-instrumentSansSemiBold text-xl">
                    Quick Withdraw
                </Text>

                <TouchableOpacity
                    className="bg-[#1D3725] p-2 items-center rounded-lg mt-4"
                    onPress={() => navigation.navigate("Withdraw")}
                >
                    <Text className="text-white font-instrumentSansSemiBold text-center text-xl">
                        Withdraw
                    </Text>
                </TouchableOpacity>
            </View>

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

            {/* */}

            <View className="bg-[#212121] p-3 rounded-lg">
                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-xl font-instrumentSansSemiBold">
                        Transaction{" "}
                    </Text>
                    <TouchableOpacity className="flex-row gap-2 items-center" onPress={() => navigation.navigate("Transaction")}>
                        <Text className="text-white text-xl font-instrumentSansSemiBold">
                            See All
                        </Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {getTransaction?.data?.data?.map((item,index) => (
                    <View key={index} className="bg-[#121212] p-1 rounded-md mt-2">
                        <View className="flex-row justify-between p-1">
                            <Text className="text-white text-lg font-instrumentSansSemiBold">
                                Order #{item?.cartProductId?.slice(-4)}
                            </Text>
                            <Text className="text-[#4ADE80] font-instrumentRegular">
                                {item?.earning}
                            </Text>
                        </View>
                        <View className="flex-row justify-between p-1 mt-1">
                            <Text className="text-[#9CA3AF] text-base font-instrumentRegular">
                                {new Date(item?.createdAt)?.toLocaleDateString()}
                            </Text>
                            <Text
                                className={`${item?.earningStatus == "paid"
                                    ? "text-[#4ADE80]"
                                    : "text-[#FB923C]"
                                    }  font-instrumentRegular`}
                            >
                                {item?.earningStatus}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
            <InputYearPicker visible={showModal} onClose={() => setShowModal(false)} onSelect={onSelectYr} propYear={year} />
        </ScrollView>
    );
};

export default Earning;