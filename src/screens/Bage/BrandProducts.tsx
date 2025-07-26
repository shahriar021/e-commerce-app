import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { allProducts } from './demoBage';

const BrandProducts = () => {

    const {width, height } = useWindowDimensions()
    const navigation = useNavigation()
    const [isClothType, setIsClothType] = useState("ALL")

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity className='flex-row gap-2 items-center' onPress={()=>navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
                <View className='flex-col'>
                    <Text className='font-podKova text-white text-xl'>ARKIVE</Text>
                    <Text className='font-prostoOne text-white'>All Products</Text>
                </View>
            </TouchableOpacity>
        )
    });


    return (
        <View className='flex-1 bg-[#121212] p-3'>

            <View className='border p-2 mt-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3 items-center'>
                <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
                <TextInput className='flex-1 font-prostoOne' placeholder='Search Brands...' placeholderTextColor={"#ADAEBC"} />
            </View>

            <View className='flex-row gap-3 mt-1 mb-2'>
                <TouchableOpacity className={`${isClothType == "ALL" ? "bg-[#DCF3FF]" : "bg-[#1F2937]"} rounded-md items-center p-1 `} onPress={() => setIsClothType("ALL")}>
                    <Text className={`font-prostoOne ${isClothType == "ALL" ? "text-[#121212]" : "text-white"}`}>ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${isClothType == "T-Shirts" ? "bg-[#DCF3FF]" : "bg-[#1F2937]"} rounded-md items-center p-1`} onPress={() => setIsClothType("T-Shirts")}>
                    <Text className={`font-prostoOne ${isClothType == "T-Shirts" ? "text-[#121212]" : "text-white"}`}>T-Shirts</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${isClothType == "Jeans" ? "bg-[#DCF3FF]" : "bg-[#1F2937]"} rounded-md items-center p-1`} onPress={() => setIsClothType("Jeans")}>
                    <Text className={`font-prostoOne ${isClothType == "Jeans" ? "text-[#121212]" : "text-white"}`}>Jeans</Text>
                </TouchableOpacity>
            </View>

            <View className='flex-row justify-between items-center mt-2 mb-2'>
                <Text className='font-playFairDisplay text-2xl text-white'>All Products</Text>
                <View className='flex-row gap-3 items-center'>
                    <Text className='font-prostoOne text-white'>See All</Text>
                    <AntDesign name="arrowright" size={24} color="#AD7720" />
                </View>
            </View>

            <ScrollView contentContainerStyle={{paddingBottom:100 }} showsVerticalScrollIndicator={false}>

                <View className='flex-row flex-wrap  justify-between gap-2'>
                    {allProducts?.map((item,index) =>
                        <TouchableOpacity key={index} style={{ width: "48%" }} className='bg-[#1F2937] items-center rounded-lg relative  ' onPress={()=>navigation.navigate("Product Details")}>
                            <Image source={item.image} style={{ width: "100%", height: 160, borderRadius: 8 }} />
                            <View className='bg-[#000000] border-[#1F2937] border-8 absolute p-1 bottom-14 rounded-full items-center justify-center' style={{ width: 50, height: 50 }}>
                                <Image source={require("../../../assets/e-icon/bag-2.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <Text className='font-prostoOne text-white mt-8 mb-1'>Regular Fit Slogan</Text>
                            <Text className='font-prostoOne text-white mb-2'>$ 8900</Text>
                        </TouchableOpacity>
                    )}
                </View>



            </ScrollView>
        </View>
    )
}

export default BrandProducts