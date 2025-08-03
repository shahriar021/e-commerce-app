import { View, Text, Modal, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { AntDesign, Feather } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const SearchPage = ({ visible, onClose }: any) => {
    const [isClothType, setIsClothType] = useState("ALL Results")
    const [items] = useState(Array.from({ length: 2 }))
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    return (
        <View className='flex-1'>
            <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#121212',  }}>
                
                <TouchableOpacity
                    className='flex-row gap-2 items-center ml-2 mb-1'
                    onPress={()=>navigation.goBack()}
                    style={{ marginTop: 3 }}  // <-- no extra iOS gap now
                >
                                   <Feather name="arrow-left-circle" size={24} color="white" />
                    <Text className='text-white text-xl font-instrumentSansBold'>Exact Matches</Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 100 }}>
                    <View className='mt-2 mb-2 flex-row bg-[#212121] rounded-lg overflow-hidden p-3 gap-2 items-center'>
                        <View style={{ width: scale(48), height: verticalScale(48) }}><Image source={require("../../../assets/e-icon/serc.png")} style={{ width: "100%", height: "100%" }} /></View>
                        <View className='flex-1 flex-row justify-between  items-center'>
                            <View className='flex-col gap-2'>
                                <Text className='text-[#D1D5DB] font-instrumentRegular'>Searching for</Text>
                                <Text className='text-white font-instrumentSansSemiBold'>Black Evening Dress</Text>
                            </View>
                            <View className='items-center justify-center' style={{ width: scale(48), height: verticalScale(48) }}><Image source={require("../../../assets/e-icon/cameraWhite.png")} style={{ width: "50%", height: "50%" }} /></View>
                        </View>
                    </View>
                    <View className='flex-row gap-3 mt-1 mb-2'>
                        <TouchableOpacity className={`${isClothType == "ALL Results" ? "bg-[#DCF3FF]" : "bg-[#1D3725]"} rounded-md items-center p-1 `} onPress={() => setIsClothType("ALL Results")}>
                            <Text className={`font-instrumentSansBold ${isClothType == "ALL Results" ? "text-[#121212]" : "text-white"}`}>ALL Results</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${isClothType == "In Stock" ? "bg-[#DCF3FF]" : "bg-[#1D3725]"} rounded-md items-center p-1`} onPress={() => setIsClothType("In Stock")}>
                            <Text className={`font-instrumentSansBold ${isClothType == "In Stock" ? "text-[#121212]" : "text-white"}`}>In Stock</Text>
                        </TouchableOpacity>

                    </View>
                    <Text className='text-white text-xl mt-2 mb-2 font-instrumentSansBold'>Available In-App</Text>

                    <View className='flex-row justify-between'>
                        {items?.map((item,index) => <View key={index} className='bg-[#212121] rounded-lg overflow-hidden ' style={{ width: "46%" }}>
                            <Image source={require("../../../assets/e-icon/exctmatch.png")} style={{ width: "100%", height: 160 }} />
                            <View className='p-2 '>
                                <Text className='text-white mt-1 font-instrumentSansSemiBold'>Elegant Black Dress</Text>
                                <Text className='text-[#9CA3AF] mb-1 font-instrumentRegular'>Fashion Brand</Text>
                                <View className='flex-row justify-between'>
                                    <Text className='text-[#60A5FA] font-instrumentRegular'>$89</Text>
                                    <Text className='text-[#4ADE80] font-instrumentRegular'>In Stock</Text>
                                </View>
                            </View>
                        </View>)}
                    </View>

                    <Text className='text-white text-xl mt-2 mb-2 font-instrumentSansSemiBold'>Similar Items Online</Text>

                    {items?.map((item, index) => <View key={index} className='bg-[#212121] p-3 rounded-lg mt-2 mb-2 border border-[#2A2A2A]'>
                        <View className='flex-row gap-2'>
                            <View style={{ width: scale(64), height: scale(64) }}>
                                <Image source={require("../../../assets/e-icon/suit.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <View className='flex-1'>
                                <View className='flex-row justify-between flex-1'>
                                    <View>
                                        <Text className='text-white font-instrumentSansSemiBold text-xl'>Black Formal Dress</Text>
                                        <Text className='text-[#9CA3AF] font-instrumentRegular'>Nordstrom</Text>
                                    </View>
                                    <Image source={require("../../../assets/e-icon/link.png")} style={{ width: 12, height: 12 }} />
                                </View>
                                <View className='flex-row gap-3 items-center'>
                                    <Text className='text-white text-xl font-instrumentSansSemiBold'>$329</Text>
                                    <View className='flex-row gap-1 items-center '>
                                        <Image source={require("../../../assets/e-icon/amazon.png")} style={{ width: scale(16), height: verticalScale(16) }} />
                                        <Text className='text-[#9CA3AF] font-instrumentSansSemiBold'>Amazon</Text>
                                    </View>

                                </View>
                                <TouchableOpacity className='flex-row items-center gap-2 bg-[#1D3725] p-3 rounded-lg mt-3 mb-1 justify-center'>
                                    <Text className='text-white font-instrumentRegular'>View on Amazon</Text>
                                    <Image source={require("../../../assets/e-icon/link.png")} style={{ width: 12, height: 12 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default SearchPage