import { View, Text, Image, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const CartPage = () => {
    const { width, height } = useWindowDimensions()

    const navigation = useNavigation()
    const [cartList] = useState(Array.from({ length: 2 }, (_, c) => c + 1))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleAlign:"center"
        })
    }, [navigation])

    const handleInstuction=(text:string)=>{
        navigation.navigate("Special Instructions",{indicator:text})
    }

    return (
        <ScrollView className='flex-1 bg-white p-3 ' contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            {cartList.map(x =>
            (<View key={x} className='mt-2 mb-2 relative flex-row p-2 bg-white border border-gray-200 shadow-slate-400 rounded-3xl   mx-3' >
                <TouchableOpacity className='absolute -right-3 -top-3'><AntDesign name="closecircle" size={24} color={"#E20000"} /></TouchableOpacity>
                <View style={{ width: width * 0.22, height: height * 0.11 }} className='border rounded-3xl overflow-hidden border-white'>
                    <Image source={require("../../../assets/restroIcon/cartImg.png")} style={{ width: "100%", height: "100%" }} />
                </View>
                <View className='p-2  flex-1'>
                    <View>
                        <Text className='text-xl font-robotoBold'>Red And Hot Pizza</Text>
                        <Text className='font-robotoBold text-md text-[#8C8A9D] mt-1'>The Burger Spot</Text>
                    </View>
                    <View className='flex-row flex-1 items-center justify-between'>
                        <Text className='text-[#C21A1E] font-robotoRegular text-md'>$89.26</Text>
                        <View className='flex-row items-center mx-2 gap-2'>
                            <TouchableOpacity>
                                <AntDesign name="minuscircleo" size={24} color={"#C21A1E"} />
                            </TouchableOpacity>
                            <Text>02</Text>
                            <TouchableOpacity>
                                <AntDesign name="pluscircleo" size={24} color={"#C21A1E"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>))}

            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className='font-robotoRegular text-sm'>Subtotal</Text>
                <Text className='font-robotoRegular mx-2 text-sm'>$27.36<Text className='font-robotoRegular text-[#9796A1]'>{" "}USD</Text></Text>
            </View>
            <View className='border border-[#F1F2F3] mx-2' />
            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className='font-robotoRegular text-sm'>Tax amd Fees</Text>
                <Text className='font-robotoRegular mx-2 text-sm'>$27.36<Text className='font-robotoRegular text-[#9796A1]'>{" "}USD</Text></Text>
            </View>
            <View className='border border-[#F1F2F3] mx-2' />
            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className='font-robotoRegular text-sm'>Delivery</Text>
                <Text className='font-robotoRegular mx-2 text-sm'>$27.36<Text className='font-robotoRegular text-[#9796A1]'>{" "}USD</Text></Text>
            </View>
            <View className='border border-[#F1F2F3] mx-2' />
            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className='font-robotoBold text-sm'>Total</Text>
                <Text className='font-robotoRegular mx-2 text-sm'>$27.36<Text className='font-robotoRegular text-[#9796A1]'>{" "}USD</Text></Text>
            </View>
            <Text className='mt-2 text-[#626262] font-robotoRegular mx-2'>Special Instructions (Optional)</Text>
            <View className='mt-2 p-2 border rounded-xl border-gray-300 bg-[#E2E2E2]'>
                <TouchableOpacity className='flex-row justify-between mb-1' onPress={()=>handleInstuction("restaurant")}>
                    <Text className='text-[#626262] font-robotoRegular'>Special Instructions for the restaurant </Text>
                    <AntDesign name="right" size={24} color={"#626262"} />
                </TouchableOpacity>
                <View className='border border-gray-300 mx-2 mb-1' />
                <TouchableOpacity className='flex-row justify-between mt-1' onPress={()=>handleInstuction("rider")}>
                    <Text className='text-[#626262] font-robotoRegular'>Special Instructions for the rider </Text>
                    <AntDesign name="right" size={24} color={"#626262"} />
                </TouchableOpacity>


            </View>

            <View className="items-center mt-3">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={()=>navigation.navigate("Payment Options")}>
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Checkout</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default CartPage