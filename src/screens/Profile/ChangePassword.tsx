import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useLayoutEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { scale } from 'react-native-size-matters'

const ChangePassword = () => {
    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change Password",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='p-4 items-center'>
            <View className=' ' style={{ width: scale(116), height: scale(116) }}>
                <Image source={require("../../../assets/e-icon/cnhPass.png")} style={{ width: "100%", height: "100%" }} />
            </View>

            <Text className='font-helvetica text-xl text-[#fff]  w-full'>Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1 bg-[#252525]'>
                <TextInput className=' flex-1' placeholderTextColor={"#75838D"} style={{ color: "#75838D" }} />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <Text className='font-helvetica text-xl text-[#fff] w-full'>Confirm Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1 bg-[#252525]'>
                <TextInput className=' flex-1 ' placeholderTextColor={"#75838D"} style={{ color: "#75838D" }} />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-xl  overflow-hidden bg-[#1D3725]" style={{ width: width * 0.92 }} >
                    <Text className="text-white p-3 font-helvetica">Save Changes</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default ChangePassword