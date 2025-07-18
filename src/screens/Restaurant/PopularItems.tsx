import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const PopularItems = () => {

    const [numbers] = useState(Array.from({ length: 30 }))
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Popular Items",
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
        <View className='flex-1  p-2'>
            <View className="border flex-row items-center rounded-full p-2 border-gray-200 bg-[#F2F2F2] gap-2 mb-3 mt-2">
                <AntDesign name="search1" size={34} color="lightgray" />
                <TextInput className="flex-1" placeholder="Seach for nearby restaurants" placeholderTextColor="#7F7F7F" />
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row", paddingBottom: 100, justifyContent: "space-between", }} showsVerticalScrollIndicator={false}>
                {numbers.map((item, index) =>
                    <TouchableOpacity
                        key={index} // add key
                        className="border border-gray-200 rounded-lg overflow-hidden bg-red-500"
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            width: '48%',
                            marginTop: 5,
                        }}
                        onPress={()=>navigation.navigate("Popular Items Details")}
                    >
                        <Image
                            source={require("../../../assets/restroIcon/popularImg.png")}
                            style={{ width: "100%", height: 140, resizeMode: "cover" }}
                            className="rounded-t-lg relative"
                        />
                        <View className="flex-row justify-between items-center absolute  w-full">
                            <View className=" flex-row items-center border border-red-700 rounded-full bg-white  top-2 left-2">
                                <Text className="text-red-700 font-semibold mx-2">$</Text>
                                <Text className="text-black font-semibold">10.35</Text>
                                <View className="bg-red-100 rounded-full p-1"><Text className="text-red-800">-9%</Text></View>
                            </View>

                            <View className=" right-2 top-2 bg-[#C21A1E] rounded-full p-1">
                                <Image source={require("../../../assets/restroIcon/Basket.png")} style={{ width: 30, height: 30 }} />
                            </View>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 12,
                                flexShrink: 1,
                            }}
                        >
                            <Text
                                className="font-bold text-xl"
                                style={{ flexWrap: "wrap" }}
                                numberOfLines={2} // limit lines to avoid overflow if needed
                            >
                                Classic CheeseBurger
                            </Text>

                            <Text>
                                Beef patty with cheddar chicken.
                            </Text>
                        </View>
                    </TouchableOpacity>

                )}
            </ScrollView>
        </View>
    )
}

export default PopularItems