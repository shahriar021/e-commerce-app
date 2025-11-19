import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { bageData } from './demoBage'
import { scale, verticalScale } from 'react-native-size-matters'
import { useAppSelector } from 'src/redux/hooks'
import { useFeatureBrandsQuery, useGetBrandWithIdQuery } from 'src/redux/features/brand/brandApi'

const BrandDetails = () => {
    const route=useRoute();
    const {id}=route.params
    const navigation = useNavigation()
    const [loadMore, setLoadMore] = useState(20)
      const token = useAppSelector((state) => state.auth.token);
      const { data } = useFeatureBrandsQuery({ token, limit: loadMore })
      const {data:getData}=useGetBrandWithIdQuery({token,id:id})

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.goBack()}>
                <Feather name="arrow-left-circle" size={24} color="white" />
                <View className='flex-col'>
                    <Text className='font-instrumentSansBold text-white text-xl'>ARKIVE</Text>
                    <Text className='font-instrumentSansSemiBold text-white'>Brand Details</Text>
                </View>
            </TouchableOpacity>
        )
    });


    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <Text className='font-instrumentSansBold text-white text-5xl mt-5 mb-3'>{getData?.data?.brand[0]?.brandName}</Text>
            <Text className='font-instrumentRegular text-white mt-1 mb-3'>{getData?.data?.brand[0]?.brandStory}</Text>

            <TouchableOpacity className='bg-[#1D3725] p-2 rounded-lg w-[40%]' onPress={() => navigation.navigate("Brand Products" as never,{ID:getData?.data?.brand[0]?.id})}>
                <Text className='text-white text-center font-instrumentSansSemiBold'>Visit Our Shop</Text>
            </TouchableOpacity>

            <View className='flex-row justify-between items-center mt-2 mb-2'>
                <Text className='font-instrumentSansBold text-2xl text-white'>Similar Brands</Text>
                <TouchableOpacity className='flex-row gap-3 items-center' onPress={() => navigation.navigate("See all brands" as never)}>
                    <Text className='font-instrumentSansBold text-white'>See All</Text>
                    <AntDesign name="arrowright" size={24} color="#AD7720" />
                </TouchableOpacity>
            </View>


            <ScrollView className='flex-1 ' horizontal>

                {data?.data?.data?.map((item, index) =>
              
                    <TouchableOpacity key={index} className='relative gap-3 rounded-xl overflow-hidden mt-1 mb-1 mr-3' style={{ width: scale(150), height: verticalScale(150) }}>
                        <Image source={{uri:item.brandLogo[0]}} style={{ width: "100%", height: "100%" }} />
                        <Text className='absolute  bottom-3 left-0 right-0 text-xl font-instrumentSansSemiBold text-white text-center'>{item.brandName}</Text>
                    </TouchableOpacity>
                
                )}

                    <TouchableOpacity className='items-center justify-center p-20' style={{ width: scale(150), height: verticalScale(150) }} onPress={()=>setLoadMore(loadMore+3)}>
                        <Ionicons name="reload-sharp" size={24} color="white" />
                    </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default BrandDetails