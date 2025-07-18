import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

const PaymentAnimation = () => {

    const navigation = useNavigation()

    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.navigate("Payment Info")
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <SafeAreaView className='flex-1 items-center justify-center'>
            <Animatable.View
                animation="bounceInUp"
                duration={2000}
                easing="ease-out"
            >
                <LinearGradient
                    colors={['#3BE824', '#29BE15']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <AntDesign name="check" size={24} color="white" />
                </LinearGradient>
            </Animatable.View>

            <Text className='text-[#33363F] font-robotoBold mt-3'>Payment Successfully</Text>
        </SafeAreaView>
    )
}

export default PaymentAnimation