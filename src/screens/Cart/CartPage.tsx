import { View, Text, Image, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const CartPage = () => {
    const { width, height } = useWindowDimensions()

    const navigation = useNavigation()
    const [cartList] = useState(Array.from({ length: 2 }, (_, c) => c + 1))

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity className='flex-row gap-2 items-center mx-2' onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
                <View className=''>
                    <Text className='font-prostoOne text-white text-2xl'>Cart</Text>
                </View>
            </TouchableOpacity>
        )
    });


    return (
        <ScrollView className='flex-1 bg-[#121212] p-2 ' contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            {cartList.map(x =>
            (<View key={x} className='mt-2 mb-2 relative flex-row p-2 bg-[#2C2C2C]  shadow-slate-400 rounded-2xl   mx-3' >

                <View style={{ width: width * 0.22, height: height * 0.11 }} className=' rounded-2xl overflow-hidden '>
                    <Image source={require("../../../assets/e-icon/Rectangle 98.png")} style={{ width: "100%", height: "100%" }} />
                </View>
                <View className='p-2  flex-1'>
                    <View>
                        <Text className='text-xl text-white' style={{ fontFamily: 'prosto-One' }}>Bomber Jackets</Text>
                        <Text className=' text-md text-white mt-1' style={{ fontFamily: 'prosto-One' }}>$49.99</Text>
                    </View>
                    <View className='flex-row flex-1 items-center justify-between'>

                        <View className='flex-row items-center mx-2 gap-2'>
                            <TouchableOpacity>
                                <AntDesign name="minuscircleo" size={24} color="white" />
                            </TouchableOpacity>
                            <Text className='text-white'>02</Text>
                            <TouchableOpacity>
                                <AntDesign name="pluscircleo" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <AntDesign name="delete" size={24} color="red" />
                    </View>
                </View>

            </View>))}

            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className=' text-sm text-[#ADAEBC]' style={{ fontFamily: 'prosto-One' }}>Subtotal</Text>
                <Text className=' mx-2 text-sm text-white' style={{ fontFamily: 'prosto-One' }}>$27.36</Text>
            </View>
            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className=' text-sm text-[#ADAEBC]' style={{ fontFamily: 'prosto-One' }}>Shipping</Text>
                <Text className=' mx-2 text-sm text-white' style={{ fontFamily: 'prosto-One' }}>$27.36</Text>
            </View>

            <View
                className="border border-dashed border-[#E2E2E2] mx-2"
                style={{ borderWidth: 1 }}
            />

            <View className='flex-row justify-between p-2 mx-2 mt-2 mb-2'>
                <Text className=' text-sm text-[#ADAEBC]' style={{ fontFamily: 'prosto-One' }}>Total</Text>
                <Text className=' mx-2 text-sm text-white' style={{ fontFamily: 'prosto-One' }}>$27.36</Text>
            </View>


            <View className="items-center mt-3">
                <TouchableOpacity className=" items-center mt-3 rounded-lg  overflow-hidden bg-[#121212] border border-[#DCF3FF]" style={{ width: width * 0.9 }} onPress={() => navigation.navigate("Payment Options")}>

                    <Text className="text-[#DCF3FF] p-3 " style={{ fontFamily: 'prosto-One' }}>Checkout</Text>

                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default CartPage