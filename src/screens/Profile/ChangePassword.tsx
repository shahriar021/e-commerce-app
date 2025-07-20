import { Entypo, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useLayoutEffect } from 'react'
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'

const ChangePassword = () => {
    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Change Password",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "#626262",
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
        <View className='p-4'>
            <Text className='font-robotoBold text-xl text-[#33363F]'>Current Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1' />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F]'>New Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1' />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F]'>Confirm New Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1' />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <TouchableOpacity>
                <Text className='text-[#EB0000] font-robotoBold'>Forgot the password?</Text>
            </TouchableOpacity>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} >
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Update Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} >
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Update Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePassword