import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useAppSelector } from 'src/redux/hooks'
import { useGetBrandOrderDetailsQuery } from 'src/redux/features/orders/orderApi'

const ViewDetails = () => {
    const route=useRoute()
    const {id}=route.params
    const navigation = useNavigation()
    const token=useAppSelector((state)=>state.auth.token)
    const {data:details}=useGetBrandOrderDetailsQuery({token,id})
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Order Details",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTintColor:"#626262",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='p-2'>
            {/* card */}
            <View style={{ width: "100%", height: verticalScale(100) }} className='border border-gray-300 rounded-2xl overflow-hidden p-1 flex-row gap-2'>
                <View style={{ width: scale(80), height: "100%" }}>
                    <Image source={require("../../../assets/e-icon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} className='rounded-2xl' />
                </View>
                <View className='flex-1 '>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-robotoBold text-xl'>Red n hot pizza</Text>
                        <Text className='text-[#19CC49] border border-[#19CC49] rounded-full p-2 text-center'>Deliverd</Text>
                    </View>
                    <Text className='text-[#222222]'>Order ID:1fd21rg</Text>
                    <View className='flex-1 flex-row items-center  gap-3'>
                        <View className='flex-row items-center gap-2'><Image source={require("../../../assets/e-icon/calendar-03.png")} />
                            <Text>May 10</Text>
                        </View>
                        <View className='flex-row items-center gap-2 '>
                            <Image source={require("../../../assets/e-icon/clock-01.png")} />
                            <Text>08:00 pm</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* card */}
             <View className=' w-full mt-3 mx-2' style={{ alignItems: "flex-start" }}>
                <Text className='font-robotoBold text-2xl mb-2'>Order Progress Tracker</Text>

                <View className='items-start mb-2'>
                    <View className='flex-row items-center gap-3'>
                        <FontAwesome name="circle" size={24} color="#5555554D" />
                        <Text>Delivered</Text>

                    </View>
                    <View className='ml-1 mt-2'>
                        <FontAwesome name="circle" size={14} color="#5555554D" />
                    </View>
                    {/* ---- */}
                    <View className='flex-row items-center gap-3 mt-1'>
                        <FontAwesome name="circle" size={24} color="#BA1414" />
                        <Text>Out for Delivery</Text>

                    </View>
                    <View className='ml-1 mt-2'>
                        <FontAwesome name="circle" size={14} color="#BA1414" />
                    </View>
                    {/* ------ */}
                    <View className='flex-row items-center gap-3 mt-1'>
                        <FontAwesome name="circle" size={24} color="#BA1414" />
                        <Text>Preparing Order</Text>

                    </View>
                    <View className='ml-1 mt-2'>
                        <FontAwesome name="circle" size={14} color="#BA1414" />
                    </View>
                    {/* ----- */}
                    <View className='flex-row items-center gap-3 mt-1'>
                        <FontAwesome name="circle" size={24} color="#BA1414" />
                        <Text>Order Placed</Text>

                    </View>
                    <View className='ml-1 mt-2'>
                        <FontAwesome name="circle" size={14} color="#BA1414" />
                    </View>
                </View>
               
            </View>
             <View className='border border-gray-100 w-full mx-2 mb-2' />
            <View className='border border-gray-100 w-full mx-3 mb-1' />

            <View className='flex-row gap-2 w-full' style={{alignItems:"flex-start"}}>
                <Image source={require("../../../assets/e-icon/orderLocation.png")} style={{width:18,height:18}}/>
                <Text className='text-[#BA2720] font-robotoRegular'>Delivery Location</Text>
                
            </View>
           <View className='w-full mt-2'>
             <Text className='font-robotoBold'>21b, Karimu Kotun Street, Victoria Island</Text>
             <Text className='font-robotoBold mt-1'>Order Details</Text>
             <Text>2x Chicken Burger</Text>
             <Text>1x Fries</Text>
             <Text>1x Coke</Text>
             
           </View>
           <View className='border border-gray-100 w-full mx-3 mb-1' />
           <View className='flex-row justify-between w-full'>
            <Text className='font-robotoBold'>Subtotal</Text>
            <Text className='font-robotoBold'>$33.56 <Text className='text-[#9796A1] font-robotoBold'>USD</Text></Text>
           </View>
        </View>
    )
}

export default ViewDetails