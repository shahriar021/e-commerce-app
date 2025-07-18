import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native'

const ResetPassword = () => {
    const { width, height } = useWindowDimensions();

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Reset Password",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    const handleVerify = () => {
    };

    return (
        <View className='flex-1 items-center bg-white'>
            <Text className='text-center mt-2 text-xl text-red-700 font-robotoBold mb-3'>Set Your New Password</Text>
            <Text className='text-center text-gray-700'>
                Create a new password to secure your account.</Text>

            <View className=' ' style={{ width: width * 0.9 }}>
                <Text className='mb-2 mt-3 text-gray-700'>Enter new password</Text>
                <View className=' w-full flex-row border border-gray-500 p-2 rounded-xl'>
                    <TextInput className='flex-1' />
                    <Text><Feather name="eye-off" size={24} color="gray" /></Text>
                </View>
                <Text className='mb-2 mt-3 text-gray-700'>Confirm password</Text>
                <View className=' w-full flex-row border border-gray-500 p-2 rounded-xl'>
                    <TextInput className='flex-1' />
                    <Text><Feather name="eye-off" size={24} color="gray" /></Text>
                </View>
            </View>
            <View className="items-center mb-2">
                <TouchableOpacity
                    className="items-center mt-3 rounded-full overflow-hidden"
                    style={{ width: width * 0.9 }}
                    onPress={handleVerify}
                >
                    <LinearGradient
                        colors={["#DD0F14", "#C21A1E"]}
                        style={{ width, borderRadius: 999, alignItems: "center" }}
                    >
                        <Text className="text-white p-3">Update Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ResetPassword;