import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { useGetTermsQuery } from 'src/redux/features/profile/terms/termsApi';
import { useAppSelector } from 'src/redux/hooks';

const Terms = () => {

    const navigation = useNavigation();
    const token=useAppSelector((state)=>state.auth.token)
    const {data:getTerms}=useGetTermsQuery({token,type:"terms_and_conditions"})

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Terms And Conditions",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, 
                shadowOpacity: 0, 
                borderBottomWidth: 0,
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle:'instrumentSans-Bold',
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
                <Text className='font-bold text-xl text-[#FDFDFD] font-instrumentSansBold'>Terms & Conditions</Text>
                <Text className='mt-2 mb-2 text-[#FDFDFD] font-instrumentRegular'>{getTerms?.data?.setting[0]?.content}</Text>
                
            </ScrollView>
        </View>
    )
}

export default Terms