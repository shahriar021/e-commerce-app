import { View, Text, Modal, TouchableOpacity, Platform, TextInput, useWindowDimensions } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const AddAddressModal = ({ visible, onClose }: any) => {
    const { width } = useWindowDimensions()
    return (
        <Modal visible={visible} onRequestClose={onClose}>
            <View className='flex-1 p-1' style={{ paddingTop: Platform.OS === 'android' ? 25 : 50 }}>
                <View className='items-center relative justify-center mt-2' >
                    <TouchableOpacity className='p-1 absolute left-2' onPress={onClose}>
                        <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full' >
                            <Entypo name="chevron-small-left" size={24} color="red" />
                        </View>
                    </TouchableOpacity>
                    <Text className='text-center text-lg font-robotoBold'>Add Address</Text>
                </View>

                <View className='mt-4' style={{ alignItems: 'flex-start', width: width * 0.9, alignSelf: 'center' }}>
                    <Text className='mb-2 text-gray-600'>Full Name</Text>
                    <TextInput
                        className='border rounded-xl p-3 border-gray-400'
                        style={{ width: '100%' }}
                    />
                </View>

                <View className='mt-4' style={{ alignItems: 'flex-start', width: width * 0.9, alignSelf: 'center' }}>
                    <Text className='mb-2 text-gray-600'>Phone Number</Text>
                    <TextInput
                        className='border rounded-xl p-3 border-gray-400'
                        style={{ width: '100%' }}
                    />
                </View>

                <View className='mt-4' style={{ alignItems: 'flex-start', width: width * 0.9, alignSelf: 'center' }}>
                    <Text className='mb-2 text-gray-600'>Street Address</Text>
                    <TextInput
                        className='border rounded-xl p-3 border-gray-400'
                        style={{ width: '100%' }}
                    />
                </View>

                <View className='mt-4' style={{ alignItems: 'flex-start', width: width * 0.9, alignSelf: 'center' }}>
                    <Text className='mb-2 text-gray-600'>Town/City</Text>
                    <TextInput
                        className='border rounded-xl p-3 border-gray-400'
                        style={{ width: '100%' }}
                    />
                </View>

                <View className="items-center">
                    <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={onClose}>
                        <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                            <Text className="text-white p-3 ">Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AddAddressModal