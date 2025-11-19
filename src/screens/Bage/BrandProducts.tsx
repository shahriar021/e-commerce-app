import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { allProducts } from './demoBage';
import { useGetCategoryListQuery, useProductListBrandIdWiseQuery } from 'src/redux/features/product/productApi';
import { useAppSelector } from 'src/redux/hooks';

const BrandProducts = () => {
    const [loadMore, setLoadMore] = useState(20)
    const route = useRoute();
    const { ID } = route.params
    const token = useAppSelector((state) => state.auth.token)
    const navigation = useNavigation()
    const [isClothType, setIsClothType] = useState("ALL")
    const { data } = useProductListBrandIdWiseQuery({ token, id: ID, limit: loadMore })
    const { data: getCat } = useGetCategoryListQuery({ token, id: ID })

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
                    <Text className='font-instrumentSansSemiBold text-white'>All Products</Text>
                </View>
            </TouchableOpacity>
        )
    });

    const catArr = getCat?.data ? getCat.data.map(item => item) : [];
    if (catArr) {
        catArr.unshift("ALL");
    }

    return (
        <View className='flex-1 bg-[#121212] p-3'>

            <View className='border p-2 mt-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3 items-center'>
                <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
                <TextInput className='flex-1 font-instrumentSansSemiBold' placeholder='Search Brands...' placeholderTextColor={"#ADAEBC"} />
            </View>

            <View className='flex-row gap-3 mt-1 mb-2'>
                {catArr?.map(item => <TouchableOpacity className={`${isClothType == item ? "bg-[#DCF3FF]" : "bg-[#1D3725]"} rounded-md items-center p-1 `} onPress={() => setIsClothType(item)}>
                    <Text className={`font-instrumentSansBold ${isClothType == item ? "text-[#121212]" : "text-white"}`}>{item}</Text>
                </TouchableOpacity>)}
            </View>

            <View className='flex-row justify-between items-center mt-2 mb-2'>
                <Text className='font-instrumentSansBold text-2xl text-white'>All Products</Text>
                <TouchableOpacity className='flex-row gap-3 items-center' onPress={() => navigation.navigate("See all products", { id: ID })}>
                    <Text className='font-instrumentSansBold text-white'>See All</Text>
                    <AntDesign name="arrowright" size={24} color="#AD7720" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                <View className='flex-row flex-wrap  justify-between gap-2'>
                    {isClothType == "ALL" ? (data?.data?.product?.map((item, index) =>
                        <TouchableOpacity key={index} style={{ width: "48%" }} className='bg-[#1D3725] items-center rounded-lg relative  ' onPress={() => navigation.navigate("Product Details", { ID: item.id })}>
                            <Image source={{ uri: item.productImages[0] }} style={{ width: "100%", height: 160, borderRadius: 8 }} />
                            <View className='bg-[#000000] border-[#1D3725] border-8 absolute p-1 bottom-14 rounded-full items-center justify-center' style={{ width: 50, height: 50 }}>
                                <Image source={require("../../../assets/e-icon/bag-2.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <Text className='font-instrumentSansBold text-white mt-8 mb-1'>{item.productName}</Text>
                            <Text className='font-instrumentSansSemiBold text-white mb-2'>{item.price}</Text>
                        </TouchableOpacity>
                    )) : (data?.data?.product?.filter((item) => item.category == isClothType)?.map((item, index) =>
                        <TouchableOpacity key={index} style={{ width: "48%" }} className='bg-[#1D3725] items-center rounded-lg relative  ' onPress={() => navigation.navigate("Product Details", { ID: item.id })}>
                            <Image source={{ uri: item.productImages[0] }} style={{ width: "100%", height: 160, borderRadius: 8 }} />
                            <View className='bg-[#000000] border-[#1D3725] border-8 absolute p-1 bottom-14 rounded-full items-center justify-center' style={{ width: 50, height: 50 }}>
                                <Image source={require("../../../assets/e-icon/bag-2.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <Text className='font-instrumentSansBold text-white mt-8 mb-1'>{item.productName}</Text>
                            <Text className='font-instrumentSansSemiBold text-white mb-2'>{item.price}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity className=" items-center border rounded-3xl border-[#fff] p-2 mt-3" style={{ width: "95%" }} onPress={() => setLoadMore(loadMore + 20)}>
                        <Text className="font-instrumentSansSemiBold text-white text-xl">View All</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    )
}

export default BrandProducts