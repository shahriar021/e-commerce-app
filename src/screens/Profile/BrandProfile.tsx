import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Dimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters';
export const selectedCountry = {
    flag: require('../../../assets/e-icon/bdFlag.jpg'),
    dialCode: '+880',
};

const BrandProfile = () => {
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Edit Brand",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", padding: 12,paddingBottom:100 }}>
            <View style={{ width: width * 0.3, height: height * 0.15 }} className='rounded-full  mt-4 relative bg-green-700'>
                <Image source={require("../../../assets/e-icon/brandLogo.png")} style={{ width: "100%", height: "100%" }} resizeMode='cover' className='rounded-full' />
                <TouchableOpacity className="absolute z-10 bg-[#2A2A2A] p-1 rounded-full" style={{
                    width: scale(24), height: scale(24), bottom: verticalScale(12), left: '50%',
                    transform: [{ translateX: scale(60) / 2 }]
                }}>
                    <Image source={require("../../../assets/e-icon/Button.png")} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
            </View>


            <Text className='font-helvetica  text-[#fff]  w-full'>Full Name</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder='Enter Your First Name' />

            <Text className='font-helvetica  text-[#fff]  w-full'>Enter Mail</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder='Enter E-Mail' />

            <Text className='font-helvetica  text-[#fff]  w-full'>Phone Number</Text>
            

            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 }}>

                {/* Dynamic Flag */}
                <Image
                    source={selectedCountry.flag}
                    style={{ width: 24, height: 16, marginRight: 8 }}
                    resizeMode="contain"
                />

                {/* Dynamic Country Code */}
                <Text style={{ fontSize: 16, color: 'white', marginRight: 8 }}>
                    {selectedCountry.dialCode}
                </Text>

                {/* Phone Input */}
                <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    style={{ flex: 1, fontSize: 16, color: 'white' }}
                />
            </View>


            <View className=''>
                <Text className='text-white mb-3 font-helvetica' >Brand Story</Text>
                <View className='bg-[#252525] p-2 rounded-xl'>
                    
                    <Text className='text-white' style={{ fontFamily: 'prosto-One' }}>
                        Born from late-night sketch sessions and city grit, COID Supply started in a cramped apartment in Brooklyn with just a screen printer and a dream. Tired of watered-down fashion, we built a brand that reps raw energy, underground culture, and the hustle mentality. Our first drop? Sold out of backpacks at a pop-up on Flatbush Ave. Today, COID is more than a label—it’s a movement for the unheard, the unseen, and the unfazed. We don’t follow trends. We set ‘em.
                    </Text>
                </View>

               
            </View>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden bg-[#FFF]" style={{ width: width * 0.9 }} >

                    <Text className="text-[#121212] p-3 font-helvetica">Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default BrandProfile