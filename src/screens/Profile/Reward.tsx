import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'

const Reward = () => {
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState('Pending');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
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
        <View className='flex-1 items-center '>
            <Text className='text-white text-3xl mt-4 font-instrumentSansBold'>15600 pts</Text>
            <Text className='text-[#6d6363] text-xl mt-1 font-instrumentSansSemiBold'>your points worth $15.6</Text>

            <View
                className="border border-white mt-5 rounded-lg overflow-hidden p-1"
                style={{ width: scale(300), height: verticalScale(450) }}
            >
                <View className="flex-row">
                    <TouchableOpacity
                        className="flex-1 items-center border-r border-r-white border-b border-b-white p-3"
                        style={{
                            backgroundColor: activeTab === 'Pending' ? '#fff' : '#1D3725',
                        }}
                        onPress={() => setActiveTab('Pending')}
                    >
                        <Text className='font-instrumentSansSemiBold' style={{ color: activeTab === 'Pending' ? '#000' : '#fff' }}>
                            Pending
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 items-center border-b border-b-white p-3"
                        style={{
                            backgroundColor: activeTab === 'Activity' ? '#fff' : '#1D3725',
                        }}
                        onPress={() => setActiveTab('Activity')}
                    >
                        <Text className='font-instrumentSansSemiBold' style={{ color: activeTab === 'Activity' ? '#000' : '#fff' }}>
                            Activity
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center justify-center">
                    <Text className="text-white font-instrumentSansSemiBold">
                        {activeTab === 'Pending'
                            ? 'no pending activity'
                            : 'no recent activity'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Reward