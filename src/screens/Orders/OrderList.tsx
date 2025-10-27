import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from 'src/redux/hooks'
import { useGetBrandOrderListQuery } from 'src/redux/features/orders/orderApi'

const OrderList = () => {
    const [orderHist] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
    const navigation = useNavigation()
    const [loadMore, setLoadMore] = useState(10)
    const token=useAppSelector((state)=>state.auth.token)
        console.log(token)
        const {data:getOrdersBrand}=useGetBrandOrderListQuery({token,limit:4})
        console.log(getOrdersBrand?.data?.data,"brand order")
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTintColor:"white",
            headerTitleStyle:'instrumentSans-Bold',
            headerLeft: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            }
        })
    }, [navigation])
    return (
        <View className='flex-1 p-3'>
            <ScrollView showsVerticalScrollIndicator={false}>
                {getOrdersBrand?.data?.data?.map((item:any) => <View key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' >
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[#fff] font-instrumentSansBold'>#{(item.orderId).slice(-5)}</Text>
                        <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentSansBold' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>{item.remindStatus}</Text>
                    </View>
                    <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                        <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                            <Image source={{uri:item.productImages[0]}} style={{ width: "100%", height: "100%" }} />
                        </View>
                        <View className='flex-row justify-between flex-1 items-center'>
                            <View className='flex-col'>
                                <Text className='font-instrumentSansBold text-white'>Black Formal Dress</Text>
                                <Text className='font-instrumentRegular text-[#9CA3AF]'>Qty: {item.quntity} | Size: {item.size}</Text>
                            </View>
                            <View><Text className='font-instrumentSansSemiBold text-white'>{item.price}{" "}$</Text></View>
                        </View>
                    </View>
                    <View className=''>
                        <Text className='font-instrumentRegular text-[#9CA3AF]'>Placed:  {new Date(item?.createdAt).toLocaleDateString()}</Text>

                    </View>

                    <View className='flex-1 items-center  mt-2 mb-1'>
                        <TouchableOpacity className='w-full flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1'>
                            <AntDesign name="check" size={24} color="white" />
                            <Text className='text-white font-instrumentSansBold'>Mark Ready</Text>
                        </TouchableOpacity>

                    </View>

                </View>)}
            </ScrollView>
            <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden w-full' onPress={() => setLoadMore(loadMore + 10)}>
                                <Text className='text-white font-instrumentSansBold text-xl'>Load More</Text>
                            </TouchableOpacity>
        </View>
    )
}

export default OrderList