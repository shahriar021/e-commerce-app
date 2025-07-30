import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { bageData } from './demoBage'
import { scale, verticalScale } from 'react-native-size-matters'

const BrandDetails = () => {
    const navigation = useNavigation()

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
                    <Text className='font-helvetica text-white text-xl'>ARKIVE</Text>
                    <Text className='font-helvetica text-white'>Brand Details</Text>
                </View>
            </TouchableOpacity>
        )
    });


    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <Text className='font-helvetica text-white text-5xl mt-5 mb-3'>Coid Supply</Text>
            <Text className='font-helvetica text-white mt-1 mb-3'>Born from late-night sketch sessions and city grit, COID Supply started in a cramped apartment in Brooklyn with just a screen printer and a dream. Tired of watered-down fashion, we built a brand that reps raw energy, underground culture, and the hustle mentality. Our first drop? Sold out of backpacks at a pop-up on Flatbush Ave. Today, COID is more than a label—it’s a movement for the unheard, the unseen, and the unfazed. We don’t follow trends. We set ‘em.</Text>

            <TouchableOpacity className='bg-[#1F2937] p-2 rounded-lg w-[40%]' onPress={()=>navigation.navigate("Brand Products")}>
                <Text className='text-white text-center font-helvetica'>visit our shop</Text>
            </TouchableOpacity>

            <View className='flex-row justify-between items-center mt-2 mb-2'>
                <Text className='font-helvetica text-2xl text-white'>Similar Brands</Text>
                <TouchableOpacity className='flex-row gap-3 items-center' onPress={()=>navigation.navigate("See all brands")}>
                    <Text className='font-helvetica text-white'>See All</Text>
                    <AntDesign name="arrowright" size={24} color="#AD7720" />
                </TouchableOpacity>
            </View>


            <ScrollView className='flex-1' horizontal>

                {bageData?.map((item,index) =>
                    <TouchableOpacity key={index}  className='relative gap-3 rounded-xl overflow-hidden mt-1 mb-1 mr-3' style={{ width: scale(150), height: verticalScale(150) }}>
                        <Image source={item.image} style={{ width: "100%", height: "100%" }} />
                        <Text className='absolute  bottom-3 left-0 right-0 text-xl font-helvetica text-white text-center'>{item.title}</Text>
                    </TouchableOpacity>)}


            </ScrollView>
        </View>
    )
}

export default BrandDetails