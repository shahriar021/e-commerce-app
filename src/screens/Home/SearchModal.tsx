import { View, Text, Modal, useWindowDimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import InputSelectPicker from 'src/components/shared/InputSelectPicker'
import CreateModalSelecPicker from 'src/components/ui/feed/CreateModalSelecPicker'
import { useNavigation } from '@react-navigation/native'

const SearchModal = ({ visible, onClose }: any) => {

    const { width, height } = useWindowDimensions()
    const navigation=useNavigation()
    const [srcTxt,setSrcTxt]=useState("")
       
    const handleSearch=()=>{
        onClose()
        navigation.navigate("Search Page",{search:srcTxt})
    }

    return (
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View className='justify-end flex-1 bg-black-50 '>
                <View className='bg-black rounded-[32] overflow-hidden m-4' style={{ height: height * 0.3 }}>
                    <View className='mt-5 p-3 flex-row justify-between items-center mx-2'>
                        <Text className='font-instrumentSansBold text-white text-lg'>Search</Text>
                        <TouchableOpacity className='bg-[#2C2C2C] p-1 rounded-full' onPress={onClose}>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 100 }}>

                        <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 ' placeholderTextColor={"#ADAEBC"} placeholder='Search here...' style={{ color: "#ADAEBC" }} onChangeText={setSrcTxt}/>

                        <View className='flex-row w-full gap-3'>
                            <TouchableOpacity className='bg-[#EF4444] flex-1  p-4 items-center rounded-xl mt-5 mb-4' onPress={onClose}>
                                <Text className='text-[#CACACA] font-instrumentSansBold text-xl'>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-[#1D3725] flex-1  p-4 items-center rounded-xl mt-5 mb-4' onPress={handleSearch}>
                                <Text className='text-[#CACACA] font-instrumentSansBold text-xl'>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default SearchModal