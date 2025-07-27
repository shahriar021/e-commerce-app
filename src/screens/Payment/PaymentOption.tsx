import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import { LinearGradient } from 'expo-linear-gradient'
import PaymentAnimation from './PaymentAnimation'

const PaymentOption = () => {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const [showModal,setShowModal]=useState(false)

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
                    <Text className='font-prostoOne text-white text-2xl'>Checkout</Text>
                </View>
            </TouchableOpacity>
        )
    });

    const handleModal=()=>{
        setShowModal(true)
    }

    return (
        <View className='bg-[#121212] justify-between p-2'>

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

            {/* card */}
            <View className='m-2'>
                <Text className=' text-xl text-[#ADAEBC]' style={{ fontFamily: 'prosto-One' }}>Payment</Text>
                
                <View className='flex-row mt-2 items-center justify-between border  border-[#375DF8] rounded-lg p-4 bg-[#2C2C2C]'>
                    <View className='flex-row gap-2'>
                        <Image source={require("../../../assets/restroIcon/logos_visa.png")} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        
                    </View>
                    <Text className='font-robotoRegular text-white'> **** 5897</Text>
                </View>

                <View className='flex-row mt-2 items-center justify-between border  border-gray-200 rounded-lg p-4 bg-[#2C2C2C]'>
                    <View className='flex-row gap-2'>
                        <Image source={require("../../../assets/restroIcon/logos_visa.png")} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        
                    </View>
                    <Text className='font-robotoRegular text-white'> **** 5897</Text>
                </View>


                <View className="items-center mt-3">
                    <TouchableOpacity className=" items-center mt-3 rounded-lg  overflow-hidden bg-[#121212] border border-[#DCF3FF] w-full"  onPress={handleModal}>

                        <Text className="text-[#DCF3FF] p-3 " style={{ fontFamily: 'prosto-One' }}>Checkout</Text>

                    </TouchableOpacity>
                </View>
            </View>

            <PaymentAnimation visible={showModal} onClose={()=>setShowModal(false)}/>
        </View>
    )
}

export default PaymentOption