import { View, Text, Modal, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchModal = ({ visible, onClose }: any) => {
    const [isClothType, setIsClothType] = useState("ALL Results")
    const [items] = useState(Array.from({ length: 2 }))
    return (
        <Modal visible={visible} onRequestClose={onClose}>
            <SafeAreaView className='flex-1 bg-[#121212]'>
                <TouchableOpacity className='flex-row gap-2 items-center ml-2 mt-3 mb-1' onPress={onClose} style={{ marginTop: Platform.OS === "ios" ? 10 : 3 }} >
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text className='text-white text-xl'>Exact Matches</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    <View className='mt-2 mb-2 flex-row bg-[#212121] rounded-lg overflow-hidden p-3 gap-2 items-center'>
                        <View style={{ width: scale(48), height: verticalScale(48) }}><Image source={require("../../../assets/e-icon/serc.png")} style={{ width: "100%", height: "100%" }} /></View>
                        <View className='flex-1 flex-row justify-between  items-center'>
                            <View className='flex-col gap-2'>
                                <Text className='text-[#D1D5DB]'>Searching for</Text>
                                <Text className='text-white'>Black Evening Dress</Text>
                            </View>
                            <View className='items-center justify-center' style={{ width: scale(48), height: verticalScale(48) }}><Image source={require("../../../assets/e-icon/cameraWhite.png")} style={{ width: "50%", height: "50%" }} /></View>
                        </View>
                    </View>
                    <View className='flex-row gap-3 mt-1 mb-2'>
                        <TouchableOpacity className={`${isClothType == "ALL Results" ? "bg-[#DCF3FF]" : "bg-[#1F2937]"} rounded-md items-center p-1 `} onPress={() => setIsClothType("ALL")}>
                            <Text className={`font-prostoOne ${isClothType == "ALL Results" ? "text-[#121212]" : "text-white"}`}>ALL Results</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${isClothType == "In Stock" ? "bg-[#DCF3FF]" : "bg-[#1F2937]"} rounded-md items-center p-1`} onPress={() => setIsClothType("T-Shirts")}>
                            <Text className={`font-prostoOne ${isClothType == "In Stock" ? "text-[#121212]" : "text-white"}`}>In Stock</Text>
                        </TouchableOpacity>

                    </View>
                    <Text className='text-white text-xl mt-2 mb-2'>Available In-App</Text>

                    <View className='flex-row justify-between'>
                        {items?.map(item => <View className='bg-[#212121] rounded-lg overflow-hidden ' style={{ width: "46%" }}>
                            <Image source={require("../../../assets/e-icon/exctmatch.png")} style={{ width: "100%", height: 160 }} />
                            <View className='p-2 '>
                                <Text className='text-white mt-1'>Elegant Black Dress</Text>
                                <Text className='text-[#9CA3AF] mb-1'>Fashion Brand</Text>
                                <View className='flex-row justify-between'>
                                    <Text className='text-[#60A5FA]'>$89</Text>
                                    <Text className='text-[#4ADE80]'>In Stock</Text>
                                </View>
                            </View>
                        </View>)}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default SearchModal