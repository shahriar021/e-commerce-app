import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const NearbyRestaurantList = () => {
    const [nearbyList] = useState(Array.from({ length: 10 }, (_i, i) => i + 1))

    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Nearby Restaurants",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
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
        <View className='px-6 py-2'>
            <View className="border flex-row items-center rounded-full p-2 border-gray-200 bg-[#F2F2F2] gap-2 mb-3 mt-3">
                <AntDesign name="search1" size={34} color="lightgray" />
                <TextInput className="flex-1" placeholder="Seach for nearby restaurants" placeholderTextColor="#7F7F7F" />
            </View>
            <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10, paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
                {nearbyList?.map(n => <TouchableOpacity key={n} className='border border-gray-200 rounded-2xl overflow-hidden mt-3 mb-5 relative' style={{ width: width * 0.9 }} onPress={()=>navigation.navigate("Restaurant Profile")}>
                    <Image source={require("../../../assets/restroIcon/nearbyRes.png")} style={{ width: "100%", height: 181 }} className='rounded-xl' />
                    <Text className="absolute text-xl font-semibold bg-white p-1 left-3 top-3 rounded-full text-[#19CC49]">
                                    Open Now
                                  </Text>
                    <Text className='mt-2 p-2 font-robotoBold text-xl'>Urban Palate</Text>
                    <View className='flex-row items-center justify-between mt-2 p-2'>
                        <View className='flex-row items-center gap-2'>
                            <SimpleLineIcons name="clock" size={20} color="black" />
                            <Text numberOfLines={1} style={{ flexShrink: 1 }} className='text-lg text-[#000000]'>
                                9am - 11 pm
                            </Text>
                        </View>
                        <Text className='text-[#141B34BF] text-lg'>1.2 km away</Text>
                    </View>
                </TouchableOpacity>)}
            </ScrollView>
        </View>
    )
}

export default NearbyRestaurantList;