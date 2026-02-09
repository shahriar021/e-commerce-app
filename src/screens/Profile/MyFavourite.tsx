import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useGetFavProductQuery } from 'src/redux/features/profile/favourite/favouriteApi'
import { useAppSelector } from 'src/redux/hooks'
import { MyFav } from 'src/types/profile'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'src/types/screens'

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Product Details">
}

const MyFavourite = ({ navigation }: Props) => {
    const token = useAppSelector((state) => state.auth.token)
    const { data: getFavData, isLoading } = useGetFavProductQuery(token)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Favourite",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: "white",
            headerTitleAlign: "left",
            headerTitleStyle: {
                fontFamily: 'instrumentSans-Bold',
            },
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    if (isLoading) {
        return <View><ActivityIndicator size={"large"} color={"white"} /></View>
    }

    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View className='flex-row flex-wrap  justify-between gap-2'>
                    {getFavData?.data?.data?.length > 0 ? getFavData?.data?.data?.map((item: MyFav, index: number) =>
                        <TouchableOpacity key={index} style={{ width: "48%" }} className='bg-[#1D3725] items-center rounded-lg relative  ' onPress={() => navigation.navigate("Product Details")}>
                            <Image source={{ uri: item.product.productImages[0] }} style={{ width: "100%", height: 160, borderRadius: 8 }} />
                            <View className='bg-[#000000] border-[#1F2937] border-8 absolute p-1 bottom-14 rounded-full items-center justify-center' style={{ width: 50, height: 50 }}>
                                <Image source={require("../../../assets/e-icon/bag-2.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <View className='bg-white p-2 rounded-full absolute top-2 right-2' >
                                <Ionicons name="heart" size={14} color="red" />
                            </View>
                            <Text className='font-instrumentSansBold text-white mt-8 mb-1'>{item.product.productName}</Text>
                            <Text className='font-instrumentSansSemiBold text-white mb-2'>$ {item.product.price}</Text>
                        </TouchableOpacity>
                    ) : <Text className='text-white text-xl text-center'>No Favourites!</Text>}
                </View>
            </ScrollView>
        </View>
    )
}

export default MyFavourite