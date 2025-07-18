import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

const TrackOrder = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Track Order",
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
        <ScrollView className='p-2  flex-1' contentContainerStyle={{alignItems:"center"}}>
            <View
                className='mt-3 mb-1 border border-gray-300 rounded-2xl p-2 mx-2 flex-row gap-2 bg-white'
                style={{
                    width: '100%',
                    height: verticalScale(100), 
                    
                }}
            >
                {/* Image */}
                <View
                    className='rounded-xl overflow-hidden'
                    style={{
                        width: scale(80),
                        height: '100%', // ✅ Fill card height
                        borderRadius: 12,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={require('../../../assets/restroIcon/nearbyRes.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='cover'
                    />
                </View>

                {/* Info */}
                <View className='flex-1 justify-between py-1'>
                    <View className='flex-row items-start justify-between'>
                        <View>
                            <Text className='font-bold text-black text-base'>The Burger Spot</Text>
                            <Text className='text-sm text-black'>Order ID: 2sf56sdfs6</Text>
                        </View>
                        <Text className='text-[#FE724C] border border-[#FE724C] rounded-full px-3 py-1 text-xs font-medium bg-[#FE724C]/10'>
                            Out for Delivery
                        </Text>
                    </View>

                    <View>
                        <Text className='text-sm text-black'>Estimated Arrival</Text>
                        <Text className='text-xl font-semibold text-black'>
                            25 <Text className='text-[#9796A1]'>min</Text>
                        </Text>
                    </View>
                </View>
            </View>

            <View className=' w-full mt-3 mx-2' style={{ alignItems: "flex-start" }}>
                <Text className='font-robotoBold text-2xl'>Order Progress Tracker</Text>

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
                <Image source={require("../../../assets/restroIcon/orderLocation.png")} style={{width:18,height:18}}/>
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
        </ScrollView>
    )
}

export default TrackOrder
