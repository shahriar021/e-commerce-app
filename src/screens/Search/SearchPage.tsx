import { View, Text, Modal, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { AntDesign, Feather } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useGetSearchProductByTextQuery } from 'src/redux/features/scan/scabApi'
import { useAppSelector } from 'src/redux/hooks'

const SearchPage = ({ visible, onClose }: any) => {
    const token=useAppSelector((state)=>state.auth.token)
    const [isClothType, setIsClothType] = useState("ALL Results")
    const [items] = useState(Array.from({ length: 2 }))
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>()
    const route=useRoute()
    const {search}=route.params
    const {data:getSearchData}=useGetSearchProductByTextQuery({token,text:search})
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
                        {/* <View style={{ width: scale(48), height: verticalScale(48) }}><Image source={require("../../../assets/e-icon/serc.png")} style={{ width: "100%", height: "100%" }} /></View> */}
                        <View className='flex-1 flex-row justify-between  items-center'>
                            <View className='flex-col gap-2'>
                                <Text className='text-[#D1D5DB] font-instrumentRegular'>Searching for</Text>
                                <Text className='text-white font-instrumentSansSemiBold'>{search}</Text>
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
                    <ScrollView horizontal>
                    <View className='flex-row gap-2'>
                        {getSearchData?.data?.product?.map((item,index) => <View key={index} className='bg-[#212121] rounded-lg overflow-hidden ' style={{ width: 150 }}>
                            <Image source={require("../../../assets/e-icon/exctmatch.png")} style={{ width: "100%", height: 160 }} />
                            <View className='p-2 '>
                                <Text className='text-white mt-1 font-instrumentSansSemiBold'>{item.productName}</Text>
                                <Text className='text-[#9CA3AF] mb-1 font-instrumentRegular'>Fashion Brand</Text>
                                <View className='flex-row justify-between'>
                                    <Text className='text-[#60A5FA] font-instrumentRegular'>${item.price}</Text>
                                    <Text className='text-[#4ADE80] font-instrumentRegular'>{item.inStock && "In Stock"}</Text>
                                </View>
                            </View>
                        </View>)}
                    </View>
                    </ScrollView>

                    <Text className='text-white text-xl mt-2 mb-2 font-instrumentSansSemiBold'>Similar Items Online</Text>

                    

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default SearchPage