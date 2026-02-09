import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import AddAddressModal from './AddAddressModal';

const Address = () => {

    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)
    const { width, height } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add Address",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full' >
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='items-center flex-1'>
            <TouchableOpacity className='flex-row items-center mt-2 mb-2 border border-red-700 rounded-xl p-3 justify-center gap-2' style={{ width: width * .7, height: height * 0.1 }} onPress={() => setShowModal(true)}>
                <Entypo name="plus" size={24} color="black" />
                <Text className='font-semibold text-[#626262] text-xl'>Add Address</Text>
            </TouchableOpacity>

            <View className='flex-col items-center mt-2 mb-2 border border-gray-200 rounded-xl p-3 justify-center gap-2' style={{ width: width * .9 }}>
                <View className='flex-row items-center gap-1'>
                    <Image source={require("../../../assets/e-icon/addressLocation.png")} />
                    <Text>123 Main Street, Berlin, Germany, 10115</Text>
                    <Image source={require("../../../assets/e-icon/editIcon.png")} />
                </View>
                <View className='border border-[#2E8DD6] p-2 px-9 rounded-full'><Text className='text-[#2E8DD6]'>Default</Text></View>
            </View>
            <AddAddressModal visible={showModal} onClose={() => setShowModal(false)} />
        </View>
    )
}

export default Address