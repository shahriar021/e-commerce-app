import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { useAppSelector } from 'src/redux/hooks'
import { useGetPrivacyQuery } from 'src/redux/features/profile/privacy/privacyApi'

const Privacy = () => {
    const navigation = useNavigation()
    const token = useAppSelector((state) => state.auth.token)
    const { data: getPrivacy } = useGetPrivacyQuery({ token, type: "privacy_policy" })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Privacy and Policy",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle: "instrumentSans-Bold",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='flex-1 p-3 bg-[#121212]'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className='font-bold text-xl text-[#FDFDFD] font-instrumentSansBold'>Privacy Policy</Text>
                <Text className='mt-2 mb-2 text-[#FDFDFD] font-instrumentRegular' >{getPrivacy?.data?.setting[0]?.content}</Text>
            </ScrollView>
        </View>
    )
}

export default Privacy