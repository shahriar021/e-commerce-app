import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, Octicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const EditProfile = () => {
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Edit Profile Details",
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
        <View className='flex-1 items-center p-3'>
            <View style={{ width: width * 0.3, height: height * 0.15 }} className='rounded-full  mt-4 relative bg-green-700'>
                <Image source={require("../../../assets/restroIcon/tikaImg.jpg")} style={{ width: "100%", height: "100%" }} resizeMode='cover' className='rounded-full' />
                <View style={{ bottom: 0, right: 3 }} className='absolute z-10 bg-[#C21A1E] p-2 rounded-full'>
                    <Octicons name="pencil" size={24} color="white" />
                </View>
            </View>


            <Text className='font-robotoBold text-xl text-[#33363F]'>Current Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1 p-2' />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F]'>New Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1 p-2' />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F]'>Confirm New Password</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1 p-2' />
            </View>

            <View className='flex-row gap-3 items-center mt-3 mb-3'>
                <Image source={require("../../../assets/restroIcon/location-03.png")} />
                <Text className='text-[#000000] font-robotoBold text-xl'>Downtown Los Angeles, CA</Text>
            </View>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} >
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Save Changes</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile