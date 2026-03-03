import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colorStatus, nameStatus } from 'src/constants/productInfos'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'toastify-react-native'
import { usePostStatusOrderBrandMutation } from 'src/redux/features/orders/orderApi'
import { scale } from 'react-native-size-matters'

const OrderListBrand = ({ orderBrandListData, loading, token }: any) => {
    const navigation = useNavigation<any>()
    const [orderStatusLoading, setOrderStatusLoading] = useState(false)
    const [postStatus] = usePostStatusOrderBrandMutation()
    const handleStatus = async (id: any, status: any) => {
        setOrderStatusLoading(true)
        try {
            const info = {
                data: {
                    sellerStatus: status,
                    cartProductId: id,
                },
            };
            const res = await postStatus({ token, body: info }).unwrap()
        } catch (err) {
            Toast.warn(err?.data?.message)
        } finally {
            setOrderStatusLoading(false)
        }
    }
    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <ScrollView showsVerticalScrollIndicator={false}>
                {loading ? <ActivityIndicator size={"small"} color={"blue"} /> : orderBrandListData?.data?.data?.map((item: any,index:any) => <View key={index} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2' >
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>#{(item?.orderId)?.slice(-5)}</Text>
                        <Text className='text-[#FB923C] p-2 rounded-2xl font-instrumentRegular' style={{ backgroundColor: 'rgba(249, 115, 22, 0.20)' }}>{item?.remindStatus}</Text>
                    </View>
                    <View className='flex-row b items-center gap-2 mt-2 mb-1'>
                        <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                            <Image source={{ uri: item?.productImages?.[0] }} style={{ width: "100%", height: "100%" }} />
                        </View>
                        <View className='flex-row justify-between flex-1 items-center '>
                            <View className='flex-1  pt-2'>
                                <Text className='font-instrumentSansSemiBold text-white' numberOfLines={1} ellipsizeMode='tail' >{item?.productName}</Text>
                                <Text className='font-instrumentRegular text-[#9CA3AF]'>Qty: {item?.quntity} | Size: {item?.size}</Text>
                            </View>
                            <View className='ml-2'><Text className='font-instrumentSansSemiBold text-white'>{item?.price}{" "}$</Text></View>
                        </View>
                    </View>
                    <View className=''>
                        <Text className='font-instrumentSansSemiBold text-[#9CA3AF]'>Placed: {new Date(item?.createdAt).toLocaleDateString()}</Text>

                    </View>

                    <View className='flex-row items-center gap-2 mt-2 mb-1'>
                        <TouchableOpacity className='flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1' style={{
                            backgroundColor:
                                colorStatus[
                                item?.sellerStatus as keyof typeof colorStatus
                                ],
                        }} disabled={item?.sellerStatus == "delivered" ? true : false}
                            onPress={() =>
                                handleStatus(item?.cartProductId, item?.sellerStatus)
                            }>
                            {orderStatusLoading ? <ActivityIndicator size={"small"} color={"blue"} /> : <><AntDesign name="check" size={24} color="white" />
                                <Text className='text-white font-instrumentSansBold'>{nameStatus[item?.sellerStatus as keyof typeof nameStatus]}</Text></>}
                        </TouchableOpacity>
                        <TouchableOpacity className='items-center bg-[#121212] p-2 rounded-md' onPress={() => navigation.navigate("Order Details", { id: item?.cartProductId })}>
                            <AntDesign name="eye" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>)}
            </ScrollView>
        </View>
    )
}

export default OrderListBrand