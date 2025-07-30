import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const Products = () => {
    const [orderHist] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
            },
            headerTitle: '',
            
        })
    }, [navigation])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", padding: 10 }}>

            <ScrollView className='py-3 flex-1'>
                <View className="flex-row justify-between items-center mb-2">
                    <View className='flex-col'>
                        <Text className=" text-white font-helvetica text-xl" >
                            Manage Your Products
                        </Text>
                        <Text className='font-helvetica text-[#9CA3AF] w-[70%]'>Easily add new items or view your product catalog</Text>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity ><Ionicons name="notifications" size={24} color="white" /></TouchableOpacity>
                    </View>
                </View>

                <View className='flex-row gap-2 mt-2 mb-2'>
                    <TouchableOpacity className='bg-[#212121] p-2 items-center justify-center flex-col gap-2 rounded-lg flex-1' onPress={()=>navigation.navigate("Add Products")}>
                        <Image source={require("../../../assets/e-icon/add-circle.png")} style={{ width: scale(32), height: scale(32) }} />
                        <Text className='text-white font-helvetica text-xl'>Upload Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-[#212121] p-2 items-center justify-center flex-col gap-2 rounded-lg flex-1' onPress={()=>navigation.navigate("All Products")}>
                        <Image source={require("../../../assets/e-icon/list.png")} style={{ width: scale(32), height: scale(32) }} />
                        <Text className='text-white font-helvetica text-xl'>Product List</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex-row justify-between items-center mt-2 mb-2 py-1'>
                    <Text className='text-white font-helvetica'>Order List</Text>
        
                    <TouchableOpacity className='flex-row items-center gap-2' onPress={()=>navigation.navigate("Order List")}>
                        <Text className='text-white font-helvetica'>See All</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/*  */}

                <View className='flex-1 bg-[#121212] py-3'>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orderHist?.map(item => <View key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' >
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[#fff] font-helvetica'>#83473</Text>
                                <Text className='text-[#FB923C] p-2 rounded-2xl' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>Processing</Text>
                            </View>
                            <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                                <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                                    <Image source={require("../../../assets/e-icon/orderHist.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-row justify-between flex-1 items-center'>
                                    <View className='flex-col'>
                                        <Text className='font-helvetica text-white'>Black Formal Dress</Text>
                                        <Text className='font-helvetica text-[#9CA3AF]'>Qty: 2 | Size: M</Text>
                                    </View>
                                    <View><Text className='font-helvetica text-white'>৳4,400</Text></View>
                                </View>
                            </View>
                            <View className=''>
                                <Text className='font-helvetica text-[#9CA3AF]'>Placed: June 24</Text>

                            </View>

                            <View className='flex-row items-center gap-2 mt-2 mb-1'>
                                <TouchableOpacity className='flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1'>
                                    <AntDesign name="check" size={24} color="white" />
                                    <Text className='text-white font-helvetica'>Mark Ready</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='items-center bg-[#121212] p-2 rounded-md' onPress={() => navigation.navigate("Order Details")}>
                                    <AntDesign name="eye" size={24} color="white" />
                                </TouchableOpacity>
                            </View>

                        </View>)}
                    </ScrollView>

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Products