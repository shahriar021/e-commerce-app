import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppSelector } from 'src/redux/hooks';
import { useInitialPostWithdrawMutation } from 'src/redux/features/payment/paymentApi';

const Withdraw = () => {
    const [triggerWithdraw, { isLoading, data, isError }] = useInitialPostWithdrawMutation();
    const token = useAppSelector((state) => state.auth.token);
    const navigation = useNavigation();
    const [amount, setAmount] = useState<string>("")
    const [country, setCountry] = useState<string>("")
    const [currency, setCurrency] = useState<string>("")
    const [AccHoldNmae, setAccHoldNmae] = useState<string>("")
    const [AccHoldType, setAccHoldType] = useState<string>("")
    const [routingNumbr, setRoutingNumbr] = useState<string>("")
    const [AccNmbr, setAccNmbr] = useState<string>("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (token) {
            triggerWithdraw(token).unwrap().catch(err => {
                console.error("Mutation Error:", err);
            });
        }
    }, [token, triggerWithdraw]);

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

    if (!token) {
        return <Text>Loading Token...</Text>;
    }

    console.log(data, "withdraw data from server");

        return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
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
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='$1' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setAmount} />
                    </View>
                    <View className='w-full mt-2 mb-2'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>Country</Text>
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='US' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setCountry} />
                    </View>
                    <View className='w-full mt-2 mb-2'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>Currency</Text>
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='USD' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setCurrency} />
                    </View>
                    <View className='w-full mt-2 mb-2'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>Account Holder Name</Text>
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='sr chowdhury' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setAccHoldNmae} />
                    </View>
                    <View className='w-full mt-2 mb-2'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>Account Holder Type</Text>
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='individual' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setAccHoldType} />
                    </View>
                    <View className='w-full mt-2 mb-2'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>Routing Number</Text>
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='110000000' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setRoutingNumbr} />
                    </View>
                    <View className='w-full mt-2 mb-2'>
                        <Text className='text-[#fff] font-instrumentSansSemiBold'>Account Number</Text>
                        <TextInput className='mt-1 bg-[#2C2C2C] p-3 rounded-lg' placeholder='000123456789' style={{ color: "#ADAEBC" }} placeholderTextColor={"#fff"} onChangeText={setAccNmbr} />
                    </View>
                    <TouchableOpacity className='bg-[#1D3725] p-2 items-center rounded-lg mt-4 w-full'>
                        <Text className='text-white font-instrumentSansSemiBold text-center text-xl'>{loading ? <ActivityIndicator size={"small"} color={"blue"} /> : "Withdraw"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default Withdraw