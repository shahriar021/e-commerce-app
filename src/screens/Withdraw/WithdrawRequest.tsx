import { View, Text, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const WithdrawRequest = () => {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0
            },
            headerTintColor: "#626262",
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
        <View className='flex-1 p-3 '>
            <Text className='text-[#998888]'>Amount</Text>
            <TextInput className='border mt-1 mb-2 p-2 border-[#CACACA] rounded-lg' placeholder='Your Amount' />
            <Text className='text-[#626262]'>Region</Text>
            <TextInput className='border mt-1 mb-2 p-2 border-[#CACACA] rounded-lg' placeholder='Your Region' />

            <View className="items-center justify-center  flex-1">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} >
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WithdrawRequest