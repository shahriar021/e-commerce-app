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
        <Modal transparent visible={visible} onRequestClose={onClose}>
            <SafeAreaView className='flex-1 items-center justify-center relative'>
                <Animatable.View
                    animation="bounceInUp"
                    duration={3000}
                    easing="ease-in-quad"
                >
                    <View className='' style={{ width: scale(300), height: verticalScale(250), borderRadius: 20, overflow: "hidden" }} >
                        <Image source={require("../../../assets/e-icon/paymentSuccess.png")} style={{ width: "100%", height: "100%" }} />

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