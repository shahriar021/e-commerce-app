import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { allProducts } from '../Bage/demoBage'

const MyFavourite = () => {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()
    const [isClothType, setIsClothType] = useState("ALL")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Favourite",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='flex-1 bg-[#121212] p-3'>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                <View className='flex-row flex-wrap  justify-between gap-2'>
                    {allProducts?.map((item,index) =>
                        <TouchableOpacity key={index} style={{ width: "48%" }} className='bg-[#1D3725] items-center rounded-lg relative  ' onPress={() => navigation.navigate("Product Details")}>
                            <Image source={item.image} style={{ width: "100%", height: 160, borderRadius: 8 }} />
                            <View className='bg-[#000000] border-[#1F2937] border-8 absolute p-1 bottom-14 rounded-full items-center justify-center' style={{ width: 50, height: 50 }}>
                                <Image source={require("../../../assets/e-icon/bag-2.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <View className='bg-white p-2 rounded-full absolute top-2 right-2' >
                                <Ionicons name="heart" size={14} color="red" />
                            </View>
                            <Text className='font-helvetica text-white mt-8 mb-1'>Regular Fit Slogan</Text>
                            <Text className='font-helvetica text-white mb-2'>$ 8900</Text>
                        </TouchableOpacity>
                    )}
                </View>



            </ScrollView>
        </View>
    )
}

export default MyFavourite