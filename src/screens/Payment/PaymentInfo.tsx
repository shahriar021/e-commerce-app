import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentInfo = () => {
    const { width, height } = useWindowDimensions();

    const navigation = useNavigation()

    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 items-center justify-between '>

                <View>
                    <Text className='font-robotoRegular text-xl text-[#626262]'>Payment Details</Text>
                </View>
                <View className='relative border p-3 border-gray-200 rounded-3xl shadow-slate-50 items-center justify-center' style={{ width: width * 0.8 }}>
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
                            position: "absolute",

                            top: -30,
                            alignSelf: 'center'
                        }}
                    >
                        <AntDesign name="check" size={24} color="white" />
                    </LinearGradient>
                    <Text className='text-[#9FA2AB] mt-10'>Payment Total</Text>
                    <Text className='text-[#33363F] text-xl font-robotoBold mb-5'>$89.35</Text>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Date</Text>
                        <Text className='text-[#33363F]'>31 Dec 2024</Text>
                    </View>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Details</Text>
                        <Text className='text-[#33363F]'>Residential</Text>
                    </View>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Reference num</Text>
                        <Text className='text-[#33363F]'>A253151sdfd</Text>
                    </View>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Account</Text>
                        <Text className='text-[#33363F]'>Shahriar</Text>
                    </View>
                    
                    <View className='border border-[#33363F] w-full border-dashed mb-2 ' style={{
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderColor: 'rgba(51, 54, 63, 0.3)',
                    }} />
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Total Payment</Text>
                        <Text className='text-[#33363F]'>$89.36</Text>
                    </View>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#33363F]'>Total</Text>
                        <Text className='text-[#33363F]'>$89.32</Text>
                    </View>
                </View>
                <View className="items-center mt-3 mb-5" >
                    <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden border border-[#C21A1E] flex-row  justify-center" style={{ width: width * 0.9 }} onPress={() => navigation.navigate("BottomScreen")}>

                        <Feather name="arrow-left" size={24} color={"#C21A1E"} />
                        <Text className="text-[#C21A1E] p-3 ">Back to Homepage</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentInfo