import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { allProducts, bageData } from './demoBage';
import { scale, verticalScale } from 'react-native-size-matters';

const SeeAllBrands = () => {

    const { width, height } = useWindowDimensions()
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
            <TouchableOpacity className='flex-row gap-2 items-center ' onPress={() => navigation.goBack()}>
                <Feather name="arrow-left-circle" size={24} color="white" />

                <Text className='font-instrumentSansBold text-white text-xl'>All Brands</Text>

            </TouchableOpacity>
        )
    });


    return (
        <ScrollView
            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: 100, padding: 10 }}
            showsVerticalScrollIndicator={false}

        >
            {bageData?.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    className="relative gap-3 rounded-xl overflow-hidden mt-1 mb-1"
                    style={{ width: "48%", height: verticalScale(150) }}
                >
                    <Image source={item.image} style={{ width: "100%", height: "100%" }} />
                    <Text className="absolute bottom-3 left-0 right-0 text-xl font-instrumentSansBold text-white text-center">
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>

    )
}

export default SeeAllBrands