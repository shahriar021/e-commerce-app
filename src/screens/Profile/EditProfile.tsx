import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Feather, Octicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { scale, verticalScale } from 'react-native-size-matters'
import { useUpdateProfileMutation } from 'src/redux/features/profile/profile/profileApi'
import { useAppSelector } from 'src/redux/hooks'
export const selectedCountry = {
    flag: require('../../../assets/e-icon/bdFlag.jpg'),
    dialCode: '+880',
};


const EditProfile = () => {
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation()
    const token=useAppSelector((state)=>state.auth.token)
    const [updateProfile]=useUpdateProfileMutation()
    const [userNmae,setUserNmae]=useState("")
    const [gmail,setGmail]=useState("")
    const [phone,setPhone]=useState("")
    const [about,setAbout]=useState("");
    const [homeTown,setHomeTown]=useState("")
    const [favStyle,setFavStyle]=useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Edit Profile",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
                
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle:"instrumentSans-Bold",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const handleUpdate=async()=>{
        const formData = new FormData()

        const data={
            userName:"Shahriar Chowdhury"
        }

        formData.append("data",JSON.stringify(data))

       try{
         const res = await updateProfile({token,formData}).unwrap()
         console.log(res,"update")
       }catch(err){
        console.log(err)
       }
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", padding: 12 }}>
            <View style={{ width: width * 0.3, height: height * 0.15 }} className='rounded-full  mt-4 relative bg-green-700'>
                <Image source={require("../../../assets/e-icon/img (1).png")} style={{ width: "100%", height: "100%" }} resizeMode='cover' className='rounded-full' />
                <TouchableOpacity className="absolute z-10 bg-[#2A2A2A] p-1 rounded-full" style={{
                    width: scale(24), height: scale(24), bottom: verticalScale(12), left: '50%',
                    transform: [{ translateX: scale(60) / 2 }]
                }}>
                    <Image source={require("../../../assets/e-icon/Button.png")} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
            </View>


            <Text className='font-instrumentSansSemiBold text-xl text-[#fff]  w-full'>Full Name</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder='Enter Your First Name' onChangeText={setUserNmae}/>

            <Text className='font-instrumentSansSemiBold text-xl text-[#fff]  w-full'>Enter Mail</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder='Enter E-Mail' onChangeText={setGmail}/>

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
                    onChangeText={setPhone}
                />
            </View>


            <View className='w-full'>
                <View className='bg-[#252525] p-2 rounded-xl'>
                    <Text className='text-white mb-3 font-instrumentSansSemiBold' >About</Text>
                   <TextInput onChangeText={setAbout}/>
                </View>

                <View className='bg-[#252525] p-2 rounded-xl mt-3'>
                    <Text className='text-white mb-3 font-instrumentSansSemiBold' >HomeTown</Text>
                    <TextInput onChangeText={setHomeTown}/>
                </View>

                <View className='bg-[#252525] p-2 rounded-xl mt-3'>
                    <Text className='text-white mb-3 font-instrumentSansSemiBold' >Favorite Style</Text>
                    <TextInput onChangeText={setFavStyle}/>
                </View>
            </View>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden bg-[#1D3725]" style={{ width: width * 0.9 }} onPress={handleUpdate}>

                    <Text className="text-white p-3 font-instrumentSansBold">Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditProfile