import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { allProducts } from './demoBage';

const SeeAllProducts = () => {

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
                
                    <Text className='font-prostoOne text-white text-xl'>All Products</Text>
               
            </TouchableOpacity>
        )
    });


    return (
        <View className='flex-1 bg-[#121212] p-3'>

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

export default SeeAllProducts