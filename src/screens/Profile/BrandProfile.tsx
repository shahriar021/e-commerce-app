import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters';
import { useUpdateBrandProfileMutation } from 'src/redux/features/profile/profile/profileApi';
import { launchCameraAndHandlePermissions } from 'src/components/shared/ShareCamera';
import { CountryPicker } from "react-native-country-codes-picker";
import { Toast } from 'toastify-react-native';
import { useAppSelector } from 'src/redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BrandProfile = () => {
    const token = useAppSelector((state) => state.auth.token)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+93');
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation()
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [loading, setLoading] = useState(false)
    const [updateProfile] = useUpdateBrandProfileMutation()
    const [brandName, setBrandName] = useState("")
    const [mobile, setPhone] = useState("")
    const [theme, setTheme] = useState("");
    const [brandStory, setbrandStory] = useState("")
    const [profile, setProfile] = useState(null);

    useEffect(() => {
    const loadProfile = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user_profile');
        if (jsonValue != null) {
          setProfile(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load profile from AsyncStorage", e);
      }
    };

    loadProfile();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user_profile');
          if (jsonValue != null) {
            setProfile(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error("Failed to load profile from AsyncStorage", e);
        }
      };
      loadProfile();
      return () => {
      };

    }, [])
  );


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

      const openCamera2 = async () => {
        const asset = await launchCameraAndHandlePermissions();
        if (asset) {
            setSelectedImage2(asset);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        const formData = new FormData()

        const data = {
            ...(brandName && { brandName: brandName }),
            ...(mobile && { mobile: mobile }),
            ...(brandStory && { brandStory: brandStory }),
            ...(theme && { theme: theme }),
            ...(countryCode && { countryCode: countryCode }),
        }

        formData.append("data", JSON.stringify(data))

        if (selectedImage) {

            const imageFile = {
                uri: selectedImage?.uri,
                name: selectedImage?.fileName,
                type: selectedImage?.mimeType
            }
            formData.append("brandLogo", imageFile)
        }

        if (selectedImage2) {

            const imageFile = {
                uri: selectedImage2?.uri,
                name: selectedImage2?.fileName,
                type: selectedImage2?.mimeType
            }
            formData.append("coverPhoto", imageFile)
        }


        try {
            const res = await updateProfile({ token, formData }).unwrap()
            if (res.success) {
                Toast.success("updated..")
            }
        } catch (err) {
            Toast.error("something went wrong!please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", padding: 12, paddingBottom: 100 }}>
            <View style={{ width: width * 0.3, height: height * 0.15 }} className='rounded-full  mt-4 relative '>
                {selectedImage ? <Image source={{ uri: selectedImage?.uri }} style={{ width: '100%', height: '100%', borderRadius: 100 }} /> : <Image source={{uri:profile?.data?.brandLogo[0]}} style={{ width: '100%', height: '100%',borderRadius: 100  }} />}
                <TouchableOpacity className="absolute z-10 bg-[#2A2A2A] p-1 rounded-full" style={{
                    width: scale(24), height: scale(24), bottom: verticalScale(12), left: '50%',
                    transform: [{ translateX: scale(60) / 2 }]
                }} onPress={openCamera}>
                    <Image source={require("../../../assets/e-icon/Button.png")} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
            </View>


            <Text className='font-instrumentSansSemiBold  text-[#fff]  w-full'>Brand Name</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder={profile?.data?.brandName} onChangeText={setBrandName} />

            <Text className='font-instrumentSansSemiBold  text-[#fff]  w-full'>Enter Theme</Text>
            <TextInput className=' p-3 text-white w-full rounded-md bg-[#252525] mt-1 mb-3' style={{ color: "#fff" }} placeholderTextColor={"#fff"} placeholder={profile?.data?.theme} onChangeText={setTheme} />

            <Text className='font-instrumentSansSemiBold  text-[#fff]  w-full'>Phone Number</Text>


            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 }}>

                {/* Dynamic Flag */}
                <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{
                        width: '20%',
                        height: 60,
                        backgroundColor: 'black',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 20
                    }}>
                        {countryCode}
                    </Text>
                </TouchableOpacity>

                <CountryPicker
                    show={show}
                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                />



                {/* Phone Input */}
                <TextInput
                    placeholder={profile?.data?.mobile}
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    style={{ flex: 1, fontSize: 16, color: 'white' }}
                    onChangeText={setPhone}
                />
            </View>


            <TouchableOpacity className='w-full' >
                <Text className='text-white mb-3 font-instrumentSansSemiBold' >Brand Story</Text>
                <View className='bg-[#252525] p-2 rounded-xl'>

                    <TextInput className='text-white font-instrumentRegular w-full'
                        style={{ color: "white", height: 150, textAlignVertical: "top" }}
                        placeholderTextColor={"white"}
                        placeholder={profile?.data?.brandStory}
                        onChangeText={setbrandStory}
                        multiline={true}
                    />

                </View>


            </TouchableOpacity>

            <TouchableOpacity onPress={openCamera2} className='bg-[#252525] w-full m-2 p-2 rounded-lg'>
                <Text className='text-white'>{selectedImage2?selectedImage2?.fileName:"Change your cover photo"}</Text>
            </TouchableOpacity>

            <View className="items-center">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden bg-[#FFF]" style={{ width: width * 0.9 }} onPress={handleUpdate}>

                    <Text className="text-[#121212] p-3 font-instrumentSansBold">{loading?<ActivityIndicator size={"small"} color={"white"}/>:"Save Changes"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default BrandProfile