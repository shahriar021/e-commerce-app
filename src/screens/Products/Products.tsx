import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from 'src/redux/hooks'
import { useGetBrandOrderListQuery } from 'src/redux/features/orders/orderApi'
import OrderListBrand from 'src/components/shared/OrderListBrand'
import Notification from 'src/components/ui/homepage/Notification'

const Products = () => {

    const navigation = useNavigation<any>()
    const token = useAppSelector((state) => state.auth.token)
    const { data: getOrdersBrand, isLoading: orderBrandLoading,refetch: refetchOrders, isFetching: ordersFetching } = useGetBrandOrderListQuery({ token, limit: 4 })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
            },
            headerTitle: '',

        })
    }, [navigation])

    const onRefresh = React.useCallback(() => {
        refetchOrders();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", padding: 10 }}>

            <ScrollView className='py-3 flex-1' refreshControl={
                    <RefreshControl
                        refreshing={false} 
                        onRefresh={onRefresh}
                        tintColor="#86EFAC"
                        colors={["#86EFAC"]}
                    />
                }>
                <View className="flex-row justify-between items-center mb-2  p-2">
                    <View className='flex-1'>
                        <Text className=" text-white font-instrumentSansBold text-xl" >
                            Manage Your Products
                        </Text>
                        <Text className='font-instrumentRegular text-[#9CA3AF] w-[70%]'>Easily add new items or view your product catalog</Text>
                    </View>
                    <Notification/>
                </View>

                <View className='flex-row gap-2 mt-2 mb-2'>
                    <TouchableOpacity className='bg-[#212121] p-2 items-center justify-center flex-col gap-2 rounded-lg flex-1' onPress={() => navigation.navigate("Add Products")}>
                        <Image source={require("../../../assets/e-icon/add-circle.png")} style={{ width: scale(32), height: scale(32) }} />
                        <Text className='text-white font-instrumentSansSemiBold text-xl'>Upload Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-[#212121] p-2 items-center justify-center flex-col gap-2 rounded-lg flex-1' onPress={() => navigation.navigate("All Products")}>
                        <Image source={require("../../../assets/e-icon/list.png")} style={{ width: scale(32), height: scale(32) }} />
                        <Text className='text-white font-instrumentSansSemiBold text-xl'>Product List</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex-row justify-between items-center mt-2 mb-2 py-1'>
                    <Text className='text-white font-instrumentSansSemiBold'>Order List</Text>

                    <TouchableOpacity className='flex-row items-center gap-2' onPress={() => navigation.navigate("Order List")}>
                        <Text className='text-white font-instrumentSansSemiBold'>See All</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <OrderListBrand orderBrandListData={getOrdersBrand} loading={orderBrandLoading} token={token} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Products









