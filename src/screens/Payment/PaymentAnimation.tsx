import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters'

const PaymentAnimation = ({ visible, onClose }: any) => {

    const navigation = useNavigation()



    return (
        <Modal  visible={visible} onRequestClose={onClose} >
            <SafeAreaView className='flex-1 items-center justify-center relative'>
                <Animatable.View
                    animation="bounceInUp"
                    duration={3000}
                    easing="ease-in-quad"
                >
                    <View className='bg-[#1D3725] items-center justify-center' style={{ width: scale(300), height: verticalScale(250), borderRadius: 20, overflow: "hidden" }} >
                        <AntDesign name="checkcircle" size={scale(100)} color="white" />
                        <Text className='mt-3 text-xl text-white font-instrumentSansBold'>Payment Done Successfully.</Text>
                    </View>

                    <TouchableOpacity className='absolute right-0 top-0' onPress={onClose}>
                    <Entypo name="circle-with-cross" size={34} color="white" />
                </TouchableOpacity>
                </Animatable.View>
                

            </SafeAreaView>
        </Modal>
    )
}

export default PaymentAnimation