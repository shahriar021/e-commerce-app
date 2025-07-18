import { View, Text, TouchableOpacity, useWindowDimensions, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
const tableEarData = [
{ date: "2023-07-01", amount: "$150.00", status: "Completed" },
  { date: "2023-07-02", amount: "$200.00", status: "Pending" },
  { date: "2023-07-03", amount: "$320.50", status: "Failed" },
  { date: "2023-07-04", amount: "$450.75", status: "Completed" },
  { date: "2023-07-05", amount: "$120.00", status: "Pending" },
  { date: "2023-07-06", amount: "$95.99", status: "Completed" },
  { date: "2023-07-07", amount: "$399.49", status: "Failed" },
  { date: "2023-07-08", amount: "$205.25", status: "Pending" },
  { date: "2023-07-09", amount: "$789.90", status: "Completed" },
  { date: "2023-07-10", amount: "$645.40", status: "Completed" },
];

const Withdraw = () => {

    const navigation = useNavigation();
    const { width } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleAlign: "center",
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
        <View className='flex-1 items-center p-3'>
            <View className='flex-row bg-[#BC29241A] rounded-3xl overflow-hidden' style={{ width: width * .95, height: verticalScale(200) }}>
                <View className='px-2 p-2 flex-col justify-around ' style={{ width: width * 0.6 }}>
                    <View className='flex-col gap-2'>
                        <Text className='text-[#33363F] text-sm font-urbanistRegular'>Your Balance.</Text>
                        <Text className='text-6xl text-[#33363F] font-urbanistBold'>$1000</Text>
                    </View>
                    <View className="items-center ">
                        <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden  w-full" onPress={() => navigation.navigate("Withdraw Request")}>
                            <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width: "100%", borderRadius: 999, alignItems: "center" }}>
                                <Text className="text-white p-3 font-urbanistRegular text-lg">Withdraw</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='' style={{ width: width * 0.4 }}>
                    <Image source={require("../../../assets/restroIcon/ion_wallet.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                </View>
            </View>

            <ScrollView style={{ flex: 1, marginTop: 10, padding: 5,paddingBottom:200 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {/* Table Header */}
                <View style={{ flexDirection: "row", marginBottom: 1,  }} className='bg-red-50 rounded-t-lg border border-gray-100'>
                    <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.35, padding: 10, borderRightWidth: 1, borderRightColor: "#fee2e2" }}>
                        <Text style={{ fontWeight: "bold", color: "#BB2823" }}>Date</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.30, padding: 10, borderRightWidth: 1, borderRightColor: "#fee2e2" }}>
                        <Text style={{ fontWeight: "bold", color: "#BB2823" }}>Amount</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.25, padding: 10, }}>
                        <Text style={{ fontWeight: "bold", color: "#BB2823" }}>Status</Text>
                    </View>
                    
                </View>

                {/* Table Rows */}
                {tableEarData.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", marginBottom: 1,  }} className=''>
                        <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.35, padding: 10, }} className='border-r border-red-100 border-b border-b-red-100'>
                            <Text style={{ color: "#1D242D" }}>{item.date}</Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.30, padding: 10,  flexDirection: "row", }} className='border-r border-red-100 border-b border-b-red-100'>
                            <Image source={{ uri: "https://via.placeholder.com/30" }} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 5 }} />
                            <Text style={{ color: "#1D242D" }}>{item.amount}</Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.25, padding: 10, }} className=' border-b border-b-red-100'>
                            <Text style={{ color: "#1D242D" }}>{item.status}</Text>
                        </View>
                        
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Withdraw