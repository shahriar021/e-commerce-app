import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { allProducts } from './demoBage';
import { useAppSelector } from 'src/redux/hooks';
import { useProductListBrandIdWiseQuery } from 'src/redux/features/product/productApi';

const SeeAllProducts = () => {
    const route = useRoute();
    const { id } = route.params
    const { width, height } = useWindowDimensions()
    const [loadMore, setLoadMore] = useState(10)
    const navigation = useNavigation()
    const [isClothType, setIsClothType] = useState("ALL")
    const token = useAppSelector((state) => state.auth.token)

    const { data } = useProductListBrandIdWiseQuery({ token, id: id,limit:loadMore })

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
                <Text className='font-helvetica text-white text-xl'>All Products</Text>
            </TouchableOpacity>
        )
    });


    return (
        <View className='flex-1 bg-[#121212] p-3'>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                <View className='flex-row flex-wrap  justify-between gap-2'>
                    {data?.data?.product?.map((item, index) =>
                        <TouchableOpacity key={index} style={{ width: "48%" }} className='bg-[#1D3725] items-center rounded-lg relative  ' onPress={() => navigation.navigate("Product Details")}>
                            <Image source={{ uri: item.productImages[0] }} style={{ width: "100%", height: 160, borderRadius: 8 }} />
                            <View className='bg-[#000000] border-[#1F2937] border-8 absolute p-1 bottom-14 rounded-full items-center justify-center' style={{ width: 50, height: 50 }}>
                                <Image source={require("../../../assets/e-icon/bag-2.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <Text className='font-instrumentSansSemiBold text-white mt-8 mb-1'>{item.productName}</Text>
                            <Text className='font-instrumentSansSemiBold text-white mb-2'>{item.price}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity className=" items-center border rounded-3xl border-[#fff] p-2 mt-3" style={{ width: "95%" }} onPress={() => setLoadMore(loadMore + 2)}>
                    <Text className="font-instrumentSansSemiBold text-white text-xl">View All</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

export default SeeAllProducts