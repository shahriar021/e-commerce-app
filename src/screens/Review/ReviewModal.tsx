import { View, Text, Modal, useWindowDimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import InputSelectPicker from 'src/components/shared/InputSelectPicker'
import CreateModalSelecPicker from 'src/components/ui/feed/CreateModalSelecPicker'
import { Rating } from 'react-native-ratings'

const ReviewModal = ({ visible, onClose }: any) => {

    const { width, height } = useWindowDimensions()

    return (
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View className='justify-end flex-1 bg-black-50 '>
                <View className='bg-black rounded-t-[32] overflow-hidden ' style={{ height: height * 0.6 }}>
                    <View className='mt-5 p-3 flex-row justify-between items-center mx-2'>
                        <Text className='font-prostoOne text-white text-lg'>Write a Review</Text>
                        <TouchableOpacity className='bg-[#2C2C2C] p-1 rounded-full' onPress={onClose}>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 100 }}>
                        <View className="w-full p-2 bg-black">
                            <Rating
                                type="custom"
                                ratingColor="#FFBA49"
                                ratingBackgroundColor="#333"
                                tintColor="black"

                                imageSize={scale(50)}
                                startingValue={3}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </View>
                        <TouchableOpacity style={{ width: scale(300), height: verticalScale(194) }} className='items-center justify-center border border-dashed border-white  rounded-xl mt-5 bg-[#2C2C2C]'>
                            <Image source={require("../../../assets/e-icon/Frame (1).png")} style={{ width: scale(30), height: verticalScale(30) }} />
                            <Text className='mt-2 text-white' style={{ fontFamily: 'prosto-One' }}>Tap to upload image or video (15-60s)</Text>
                        </TouchableOpacity>


                        <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 ' placeholderTextColor={"#ADAEBC"} placeholder='Amazing quality and style! The fabric feels premium andthe fit is perfect. Definitely worth the price...' style={{ color: "#ADAEBC" }} multiline />

                        <TouchableOpacity className='bg-[#5E6673] w-full p-4 items-center rounded-xl mt-5 mb-4'>
                            <Text className='text-[#CACACA] font-prostoOne text-xl'>Post</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default ReviewModal