import { View, Text, TouchableOpacity,  TextInput, ScrollView, RefreshControl } from 'react-native'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { useAppSelector } from 'src/redux/hooks';
import { useProductListBrandIdWiseQuery } from 'src/redux/features/product/productApi';
import { Product } from 'src/types/products';
import { Image } from "expo-image";

const AllProducts = () => {
    const id = useAppSelector((state) => state.auth.id)
    const navigation = useNavigation<any>();
    const token = useAppSelector((state) => state.auth.token)
    const [loadMore, setLoadMore] = useState(10)
    const [searchTerm, setSearchTerm] = useState('');
    const { data: getBrands, refetch, isFetching } = useProductListBrandIdWiseQuery({ token, id, limit: loadMore })
    const products: Product[] = getBrands?.data?.product ?? [];

    const filteredProducts = useMemo(() => {
        return products.filter((item) =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, products]);

    const onRefresh = React.useCallback(() => {
        refetch();
    }, [refetch]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'All Products',
            headerTitleAlign: 'start',
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "instruementSans-Bold",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])


    return (
        <View className='flex-1 bg-[#121212] p-5'>
            <View className='border p-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3'>
                <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
                <TextInput
                    className='flex-1 font-instrumentSansSemiBold text-white'
                    placeholder='Search Brands...'
                    placeholderTextColor={"#ADAEBC"}
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                <Image source={require("../../../assets/e-icon/proicons_filter.png")} style={{ width: 24, height: 24 }} />
            </View>

            <View className='flex-1 bg-[#121212] '>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        tintColor="#86EFAC" // For iOS
                        colors={["#86EFAC"]} // For Android
                    />
                }>
                    {/* 4. Map over filteredProducts instead of products */}
                    {products?.length > 0 ? (
                        filteredProducts.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                className='bg-[#212121] p-2 rounded-xl mt-1 mb-2 flex-row justify-between items-center gap-2'
                                onPress={() => navigation.navigate("Details Product", { id: item.id })}
                            >
                                <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                                    <Image source={{ uri: item.productImages[0] }} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col flex-1 justify-center gap-1'>
                                    <Text className='text-white font-instrumentSansSemiBold text-xl'>{item.productName}</Text>
                                    <Text className='text-white font-instrumentRegular text-xl'>{item.price}{" "}$</Text>
                                </View>
                                {item.inStock && (
                                    <Text className='text-[#86EFAC] p-2 rounded-2xl bg-[#14532D] font-instrumentRegular'>In Stock</Text>
                                )}
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View className="flex-1 justify-center items-center mt-20">
                            <Feather name="package" size={50} color="#333" />
                            <Text className='text-[#ADAEBC] text-xl text-center mt-4 font-instrumentRegular'>
                                No products found
                            </Text>
                        </View>
                    )}
                    {/* Search fallback: If products exist but search doesn't match */}
                    {products.length > 0 && filteredProducts.length === 0 && (
                        <Text className='text-[#ADAEBC] text-center mt-10 font-instrumentRegular'>
                            No results for "{searchTerm}"
                        </Text>
                    )}
                </ScrollView>
                <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden w-full' onPress={() => setLoadMore(loadMore + 10)}>
                    <Text className='text-white font-instrumentSansBold text-xl'>Load More</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default AllProducts