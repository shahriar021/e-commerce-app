import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { Entypo, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const PopularItemDetails = () => {

    const { width } = useWindowDimensions();
    const navigation = useNavigation()

    return (
        <View className='flex-1 relative'>
            <Image source={require("../../../assets/restroIcon/popularDetails.jpg")} style={{ width: "100%", height: 222 }} />
             <TouchableOpacity className='left-7 top-10 absolute bg-white rounded-full overflow-hidden' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full '>
            <Entypo name="chevron-small-left" size={24} color="red" />
          </View>
        </TouchableOpacity>
            <View className='p-3  flex-1'>
                <Text className='font-robotoBold text-xl'>Classic Cheeseburger</Text>
                <Text className='text-[#363636] font-robotoRegular'>Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh  chopped. Spices – chili powder, cumin, onion powder.</Text>
                <View className='flex-row justify-between items-center mt-3  '>
                    <View className=" flex-row items-center border border-red-500 rounded-full bg-white  ">
                        <Text className="text-red-700 font-semibold mx-2">$</Text>
                        <Text className="text-black font-semibold">10.35</Text>
                        <View className="bg-red-100 rounded-full p-1"><Text className="text-red-800">-9%</Text></View>
                    </View>
                    <View className=" flex-row items-center rounded-full bg-white   mx-2 gap-3 px-1 py-1">
                        <TouchableOpacity>
                            <EvilIcons name="minus" size={24} color="red" />
                        </TouchableOpacity>
                        <Text className="text-black font-semibold w-8">02</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="plus-circle" size={24} color={"#BC2824"} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="items-center mt-3">
                    <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={()=>navigation.navigate("Payment Animation")}>
                        <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                            <Text className="text-white p-3 ">Add To Cart</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PopularItemDetails