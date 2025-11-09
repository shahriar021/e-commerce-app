import { View, Text, TouchableOpacity, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createToken } from '@stripe/stripe-react-native';
import { useAppSelector } from 'src/redux/hooks';

const Withdraw = () => {
    const token=useAppSelector((state)=>state.auth.token)
    const navigation = useNavigation();
    console.log(token)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'Withdraw',
            headerTitleAlign: 'start',
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "instrumentSans-Bold",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const handleWithdraw = async () => {
        const bankData = {
            country: 'US',
            currency: 'usd',
            account_holder_name: 'John Doe',
            account_holder_type: 'individual',
            routing_number: '110000000', // ✅ Stripe test routing number
            account_number: '000123456789', // ✅ Stripe test account number
        };


        try {
            const { token, error } = await createToken({
                type: 'BankAccount',
                bankAccount: bankData, // ✅ must be inside `bankAccount`
            });

            if (error) {
                console.log('Stripe bank token error:', error);
            } else {
                console.log('✅ Bank token created:', token.id);
                // Now send token.id to your backend to link or withdraw
            }
        } catch (err) {
            console.error('Error creating bank token:', err);
        }
    };

    return (
        <View className='flex-1 items-center p-3 bg-[#121212]'>
            <View className='rounded-lg overflow-hidden w-full' >
                <LinearGradient colors={["#212121", "#212121"]} style={{ padding: 10 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View className='flex-row justify-between items-center'>
                        <Image source={require("../../../assets/e-icon/Wallet.png")} />
                        <Text className="text-[#4ADE80] font-instrumentRegular">Available</Text>
                    </View>
                    <Text className='text-white text-xl mt-2 font-instrumentSansSemiBold'>৳120,000</Text>
                    <Text className='text-[#DCF3FF] font-instrumentRegular'>For Withdrawal</Text>
                </LinearGradient>
            </View>
            <View className='w-full mt-2 mb-2'>
                <Text className='text-[#fff] font-instrumentSansSemiBold'>Amounts</Text>
                <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='$100' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} />
            </View>
            <View className='w-full mt-2 mb-2'>
                <Text className='text-[#fff] font-instrumentSansSemiBold'>Card Holde Name</Text>
                <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='Tan' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} />
            </View>
            <View className='w-full mt-2 mb-2'>
                <Text className='text-[#fff] font-instrumentSansSemiBold'>Card Number</Text>
                <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='3536 3532 1235 0987' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} />
            </View>
            <TouchableOpacity className='bg-[#1D3725] p-2 items-center rounded-lg mt-4 w-full' onPress={handleWithdraw}>
                <Text className='text-white font-instrumentSansSemiBold text-center text-xl'>Withdraw</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Withdraw