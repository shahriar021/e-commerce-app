import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { scale, verticalScale } from 'react-native-size-matters'

const PaymentAnimation = () => {

    const navigation = useNavigation()

    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.navigate("Payment Options")
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <SafeAreaView className='flex-1 items-center justify-center'>
            <Animatable.View
                animation="bounceInUp"
                duration={3000}
                easing="ease-in-quad"
            >
                <View style={{width:scale(300),height:verticalScale(250),borderRadius:20,overflow:"hidden"}} >
               <Image source={require("../../../assets/e-icon/paymentSuccess.png")} style={{width:"100%",height:"100%"}}/>
               </View>
            </Animatable.View>

        </SafeAreaView>
    )
}

export default PaymentAnimation