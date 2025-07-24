import { View, Text, TouchableOpacity, useWindowDimensions, Image, ScrollView, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';


const Withdraw = () => {

    const navigation = useNavigation();
    const { width } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'Withdraw',
            headerTitleAlign: 'start',
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "prosto-One",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='flex-1 items-center p-3 bg-[#121212]'>
            <View className='rounded-lg overflow-hidden w-full' >
                <LinearGradient colors={["#212121", "#212121"]} style={{ padding: 10 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View className='flex-row justify-between items-center'>
                        <Image source={require("../../../assets/e-icon/Wallet.png")} />
                        <Text className={"text-[#4ADE80]"}>"Availebe"</Text>
                    </View>
                    <Text className='text-white text-xl mt-2'>৳120,000</Text>
                    <Text className='text-[#DCF3FF]'>For Withdrawal</Text>
                </LinearGradient>
            </View>
            <View className='w-full mt-2 mb-2'>
                <Text className='text-[#fff] font-prostoOne'>Amounts</Text>
                <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='$100' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} />
            </View>
            <View className='w-full mt-2 mb-2'>
                <Text className='text-[#fff] font-prostoOne'>Card Holde Name</Text>
                <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='Tan' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} />
            </View>
            <View className='w-full mt-2 mb-2'>
                <Text className='text-[#fff] font-prostoOne'>Card Number</Text>
                <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='3536 3532 1235 0987' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} />
            </View>
            <TouchableOpacity className='bg-[#DCF3FF] p-2 items-center rounded-lg mt-4 w-full' >
                <Text className='text-black font-prostoOne text-center text-xl'>Withdraw</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Withdraw