import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import { useUpdateProfileMutation } from 'src/redux/features/profile/profile/profileApi'
import { useAppSelector } from 'src/redux/hooks'
import * as ImagePicker from 'expo-image-picker';
import { launchCameraAndHandlePermissions } from 'src/components/shared/ShareCamera'
import { Toast } from 'toastify-react-native'
export const selectedCountry = {
    flag: require('../../../assets/e-icon/bdFlag.jpg'),
    dialCode: '+880',
};


const EditProfile = () => {
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation()
    const token = useAppSelector((state) => state.auth.token)
    const [updateProfile] = useUpdateProfileMutation()
    const [userNmae, setUserNmae] = useState("")
    const [gmail, setGmail] = useState("")
    const [phone, setPhone] = useState("")
    const [about, setAbout] = useState("");
    const [homeTown, setHomeTown] = useState("")
    const [favStyle, setFavStyle] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false)

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
            headerTitleStyle: "instrumentSans-Bold",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const openCamera = async () => {
        const asset = await launchCameraAndHandlePermissions();
        if (asset) {
            setSelectedImage(asset);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        const formData = new FormData()

        const data = {
            ...(userNmae && { userName: userNmae }),
            ...(gmail && { email: gmail }),
            ...(phone && { mobile: phone }),
            ...(about && { about: about }),
            ...(homeTown && { hometown: homeTown }),
            ...(favStyle && { favouriteStyles: favStyle }),
        }

        formData.append("data", JSON.stringify(data))

        if (selectedImage) {

            const imageFile = {
                uri: selectedImage?.uri,
                name: selectedImage?.fileName,
                type: selectedImage?.mimeType
            }
            formData.append("profile", imageFile)
        }


        try {
            console.log(formData, "form data.")
            const res = await updateProfile({ token, formData }).unwrap()
            if (res.success) {
                Toast.success("updated..")
            }
            console.log(res, "update")
        } catch (err) {
            Toast.error("something went wrong!please try again later.")
        }finally{
            setLoading(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", padding: 12 }}>
            <View style={{ width: width * 0.3, height: height * 0.15 }} className='rounded-full  mt-4 relative bg-green-700'>
                <Image source={{ uri: selectedImage?.uri }} style={{ width: "100%", height: "100%" }} resizeMode='cover' className='rounded-full' />
                <TouchableOpacity className="absolute z-10 bg-[#2A2A2A] p-1 rounded-full" style={{
                    width: scale(24), height: scale(24), bottom: verticalScale(12), left: '50%',
                    transform: [{ translateX: scale(60) / 2 }]

                }} onPress={openCamera}>
                    <Image source={require("../../../assets/e-icon/Button.png")} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
            </View>

            <Text className='font-instrumentSansSemiBold text-xl text-[#fff]  w-full'>Full Name</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder='Enter Your First Name' onChangeText={setUserNmae} />

            <Text className='font-instrumentSansSemiBold text-xl text-[#fff]  w-full'>Enter Mail</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder='You cant edit your email' onChangeText={setGmail} editable={false} />

            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 }}>

                <Image
                    source={selectedCountry.flag}
                    style={{ width: 24, height: 16, marginRight: 8 }}
                    resizeMode="contain"
                />

                <Text style={{ fontSize: 16, color: 'white', marginRight: 8 }}>
                    {selectedCountry.dialCode}
                </Text>

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
                    <TextInput onChangeText={setAbout} style={{ flex: 1, fontSize: 16, color: 'white' }} placeholder='enter something about your' placeholderTextColor="#aaa" />
                </View>

                <View className='bg-[#252525] p-2 rounded-xl mt-3'>
                    <Text className='text-white mb-3 font-instrumentSansSemiBold' >HomeTown</Text>
                    <TextInput onChangeText={setHomeTown} style={{ flex: 1, fontSize: 16, color: 'white' }} placeholder='enter your hometown' placeholderTextColor="#aaa" />
                </View>

                <View className='bg-[#252525] p-2 rounded-xl mt-3'>
                    <Text className='text-white mb-3 font-instrumentSansSemiBold' >Favorite Style</Text>
                    <TextInput onChangeText={setFavStyle} style={{ flex: 1, fontSize: 16, color: 'white' }} placeholder='enter your favourite style' placeholderTextColor="#aaa" />
                </View>
            </View>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden bg-[#1D3725]" style={{ width: width * 0.9 }} onPress={handleUpdate}>
                    <Text className="text-white p-3 font-instrumentSansBold">{loading?<ActivityIndicator size={"small"} color={"blue"}/>:"Save Changes"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditProfile