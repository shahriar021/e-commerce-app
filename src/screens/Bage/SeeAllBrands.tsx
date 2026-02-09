import { Text, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import {  Feather } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import { useAppSelector } from 'src/redux/hooks';
import { useFeatureBrandsQuery } from 'src/redux/features/brand/brandApi';
import { RootStackParamList } from 'src/types/screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { BrandItem } from 'src/types/brand';

type Props={
  navigation:StackNavigationProp<RootStackParamList,"Brand Details">
}

const SeeAllBrands = ({navigation}:Props) => {
    const token = useAppSelector((state) => state.auth.token);
    const [loadMore, setLoadMore] = useState(20)
    const { data } = useFeatureBrandsQuery({ token, limit: loadMore })

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
            {data?.data?.data?.map((item:BrandItem, index:number) => (
                <TouchableOpacity
                    key={index}
                    className="relative gap-3 rounded-xl overflow-hidden mt-1 mb-1"
                    style={{ width: "48%", height: verticalScale(150) }}
                    onPress={() => navigation.navigate("Brand Details",{id:item._id})}
                >
                    <Image source={{uri:item.brandLogo[0]}} style={{ width: "100%", height: "100%" }} />
                    <Text className="absolute bottom-3 left-0 right-0 text-xl font-instrumentSansBold text-white text-center">
                        {item.brandName}
                    </Text>
                </TouchableOpacity>
            ))}
             <TouchableOpacity className=" items-center border rounded-3xl border-[#fff] p-2 mt-3" style={{ width: "95%" }} onPress={() => setLoadMore(loadMore + 2)}>
                        <Text className="font-instrumentSansSemiBold text-white text-xl">View All</Text>
                      </TouchableOpacity>
        </ScrollView>

    )
}

export default SeeAllBrands