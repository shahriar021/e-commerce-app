import { View, Text, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const BankEdit = () => {

    const navigation = useNavigation();
    const {width}=useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle:"Edit Bank Details",
            headerTintColor: "#626262",
            headerLeft: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            },

        })
    }, [navigation])

    return (
        <View className='flex-1 p-3'>
            <View>
                <Text className='text-[#626262] mb-1'>Account Number</Text>
                <TextInput className='border p-3 border-[#00000033] rounded-xl mt-1 mb-2' />
            </View>
            <View>
                <Text className='text-[#626262] mb-1'>Routing Number</Text>
                <TextInput className='border p-3 border-[#00000033] rounded-xl mt-1 mb-2' />
            </View>
            <View>
                <Text className='text-[#626262] mb-1'>Bank Name</Text>
                <TextInput className='border p-3 border-[#00000033] rounded-xl mt-1 mb-2' />
            </View>
            <View>
                <Text className='text-[#626262] mb-1'>Bankholder Name</Text>
                <TextInput className='border p-3 border-[#00000033] rounded-xl mt-1 mb-2' />
            </View>
            <View>
                <Text className='text-[#626262] mb-1'>Bank Adress</Text>
                <TextInput className='border p-3 border-[#00000033] rounded-xl mt-1 mb-2' />
            </View>

             <View className="items-center ">
                    <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} >
                      <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Save</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
        </View>
    )
}

export default BankEdit