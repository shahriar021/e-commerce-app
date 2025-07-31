import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

const AllProducts = () => {

    const navigation = useNavigation();
    const [orderHist] = useState(Array.from({ length: 10 }, (_, i) => i + 1))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'All Products',
            headerTitleAlign: 'start',
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "HelveticaNeue-Black",
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

    return (
        <View className='flex-1 bg-[#121212] p-5'>
            <View className='border p-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3'>
                <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
                <TextInput className='flex-1 font-helvetica' placeholder='Search Brands...' placeholderTextColor={"#ADAEBC"} />
                <Image source={require("../../../assets/e-icon/proicons_filter.png")} style={{ width: 24, height: 24 }} />
            </View>

            <View className='flex-1 bg-[#121212] '>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
                    {orderHist?.map(item =>
                         <TouchableOpacity key={item} className='bg-[#212121] p-2 rounded-xl mt-1 mb-2 flex-row justify-between items-center gap-2' onPress={() => navigation.navigate("Details Product")}>
                        <View style={{ width: scale(52), height: scale(52) }} className='rounded-xl overflow-hidden'>
                                <Image source={require("../../../assets/e-icon/orderHist.png")} style={{ width: "100%", height: "100%" }} />
                            </View>

                            <View className='flex-col flex-1 justify-center gap-1'>
                                <Text className='text-white font-helvetica text-xl'>Black Formal Dress</Text>
                                <Text className='text-white font-helvetica text-xl'>৳4,400</Text>
                               
                            </View>
                             <Text className='text-[#86EFAC] p-2 rounded-2xl bg-[#14532D]' >In Stock</Text>

                    </TouchableOpacity>)}
                </ScrollView>

            </View>
        </View>
    )
}

export default AllProducts