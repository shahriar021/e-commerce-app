import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

const EarningListView = () => {

    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Earning Deatails",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "#626262",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View className='flex-1 p-3'>
            {/* first view */}
            <View style={{ width: width * .95, height: verticalScale(150) }} className=' rounded-lg overflow-hidden flex-row gap-2 items-center '>
                <View style={{ width: scale(120) }} >
                    <Image source={require("../../../assets/restroIcon/Room photo.png")} style={{ width: "100%", height: "100%", borderRadius: 8 }} />
                </View>
                <View className=' flex-1 items-center justify-center py-3 px-3'>
                    <View className='flex-row flex-1 justify-between  w-full'>
                        <Text className='text-[#47586E] font-robotoRegular'>Full Name:</Text>
                        <Text className='text-[#47586E] font-robotoBold'>Jon wick</Text>
                    </View>
                    <View className='flex-row flex-1 justify-between w-full'>
                        <Text className='text-[#47586E] font-robotoRegular'>Email:</Text>
                        <Text className='text-[#47586E] font-robotoBold'>Jon@gmail.com</Text>
                    </View>
                    <View className='flex-row flex-1 justify-between w-full' >
                        <Text className='text-[#47586E] font-robotoRegular'>Phone Number:</Text>
                        <Text className='text-[#47586E] font-robotoBold'>(315) 555-1235</Text>
                    </View>

                </View>

            </View>
            {/* second view */}
            <View className='mt-4'>
                <Text className='text-[#090B0E] font-robotoBold text-2xl'>Transaction details :</Text>
                <View className='flex-row mt-1 mb-1 justify-between'>
                    <Text className='text-[#47586E] text-xl'>Transaction ID : </Text>
                    <Text className='text-[#47586E] text-xl'>12345678</Text>
                </View>
                <View className='flex-row mt-1 mb-1 justify-between'>
                    <Text className='text-[#47586E] text-xl'>A/C holder name : </Text>
                    <Text className='text-[#47586E] text-xl'>Wade Warren</Text>
                </View>
                <View className='flex-row mt-1 mb-1 justify-between'>
                    <Text className='text-[#47586E] text-xl'>A/C number: </Text>
                    <Text className='text-[#47586E] text-xl'>**** **** *456</Text>
                </View>
                <View className='flex-row mt-1 mb-1 justify-between'>
                    <Text className='text-[#47586E] text-xl'>Received amount: </Text>
                    <Text className='text-[#47586E] text-xl'>$ 500</Text>
                </View>
                <View className='flex-row mt-1 mb-1 justify-between'>
                    <Text className='text-[#47586E] text-xl'>Detect Percentage:</Text>
                    <Text className='text-[#47586E] text-xl'>$100</Text>
                </View>
                <View className='flex-row mt-1 mb-1 justify-between'>
                    <Text className='text-[#47586E] text-xl'>Final Amount:</Text>
                    <Text className='text-[#47586E] text-xl'>$400</Text>
                </View>
                
            </View>
        </View>
    )
}

export default EarningListView