import { View, Text, Modal, useWindowDimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import InputSelectPicker from 'src/components/shared/InputSelectPicker'
import CreateModalSelecPicker from 'src/components/ui/feed/CreateModalSelecPicker'

const CardInfoModal = ({ visible, onClose }: any) => {

    const { width,height } = useWindowDimensions()

    return (
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View className='justify-end flex-1 bg-black-50 '>
                <View className='bg-black rounded-t-[32] overflow-hidden ' style={{ height: height * 0.6 }}>
                    <View className='mt-5 p-3 flex-row justify-between items-center mx-2'>
                        <Text className='font-helvetica text-white text-lg'>Payment Card Info</Text>
                        <TouchableOpacity className='bg-[#2C2C2C] p-1 rounded-full' onPress={onClose}>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{alignItems:"center",paddingHorizontal:20,paddingBottom:100}}>
                       
                        
                            <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 ' placeholderTextColor={"#ADAEBC"} placeholder='card_holder_name' style={{color:"#ADAEBC"}}/>

                             <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 mb-2' placeholderTextColor={"#ADAEBC"} placeholder='card_number' style={{color:"#ADAEBC"}}/>
                             <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 mb-2' placeholderTextColor={"#ADAEBC"} placeholder='exp_month' style={{color:"#ADAEBC"}}/>
                             <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 mb-2' placeholderTextColor={"#ADAEBC"} placeholder='exp_year' style={{color:"#ADAEBC"}}/>
                             <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 mb-2' placeholderTextColor={"#ADAEBC"} placeholder='cvv' style={{color:"#ADAEBC"}}/>
                                <TouchableOpacity className='bg-[#1D3725] w-full p-4 items-center rounded-xl mt-5 mb-4'>
                                    <Text className='text-[#CACACA] font-helvetica text-xl'>Save</Text>
                                </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default CardInfoModal