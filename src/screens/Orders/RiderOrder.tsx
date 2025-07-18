import { View, Text, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { tableData } from './demoData'

const RiderOrder = () => {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTintColor: "#33363F",
            headerTitleAlign: "start"
        })
    }, [navigation])

    return (
        <View className='flex-1 bg-white p-2'>
            <View className="border flex-row items-center rounded-full p-2 border-gray-200 bg-[#F2F2F2] gap-2">
                <AntDesign name="search1" size={24} color="gray" />
                <TextInput className="flex-1" placeholder="Search" />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ScrollView contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
                    <View className="border border-[#B5B5B5] mt-5 rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <View className="flex-row bg-red-100 items-center">
                            <View style={{ width: 120 }} className="items-center border-r border-r-[#B5B5B5] p-2">
                                <Text className="text-[#BB2823]">Date</Text>
                            </View>
                            <View style={{ width: 160 }} className="items-center border-r border-r-[#B5B5B5] p-2">
                                <Text className="text-[#BB2823]">Restaurant</Text>
                            </View>
                            <View style={{ width: 100 }} className="items-center border-r border-r-[#B5B5B5] p-2">
                                <Text className="text-[#BB2823]">Earnings</Text>
                            </View>
                            <View style={{ width: 100 }} className="items-center p-2">
                                <Text className="text-[#BB2823]">Status</Text>
                            </View>
                        </View>

                        {/* Table Rows */}
                        {tableData?.map((item, index) => (
                            <View key={index} className="flex-row bg-white items-center">
                                <View style={{ width: 120 }} className="items-center border-r border-r-[#B5B5B5] border-b border-b-[#B5B5B5] p-2">
                                    <Text className='text-[#1D242D]'>{item.date}</Text>
                                </View>
                                <View style={{ width: 160 }} className="items-center border-r border-r-[#B5B5B5] border-b border-b-[#B5B5B5] p-2">
                                    <Text className='text-[#1D242D]'>{item.restaurant}</Text>
                                </View>
                                <View style={{ width: 100 }} className="items-center border-r border-r-[#B5B5B5] border-b border-b-[#B5B5B5] p-2">
                                    <Text className='text-[#1D242D]'>{item.earnings}</Text>
                                </View>
                                <View style={{ width: 100 }} className="items-center border-b border-b-[#B5B5B5] p-2">
                                    <Text className='text-[#4BB54B]'>{item.status}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>

        </View>
    )
}

export default RiderOrder