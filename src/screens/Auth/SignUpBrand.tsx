import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useLayoutEffect, useState } from "react"
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import * as ImagePicker from 'expo-image-picker';
import { useSignUpBrandMutation } from "src/redux/features/auth/authApi"
import { launchCameraAndHandlePermissions } from "src/components/shared/ShareCamera"
export const selectedCountry = {
  flag: require('../../../assets/e-icon/bdFlag.jpg'),
  dialCode: '+880',
};

const SignUpBrand = () => {

  const navigation = useNavigation()
  const [selectedImage, setSelectedImage] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [postBody] = useSignUpBrandMutation()
  const [brandName, setBrandName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [theme, setTheme] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212"
      },
      headerTintColor: "#FFFFFF",
      headerTitle: '',
      headerBackTitleVisible: false,
      headerBackTitle: '',
      headerLeft: () => (
        <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
          <View className='flex-col'>
            <Text className='font-instrumentSansBold text-white text-xl'>ARKIVE</Text>
          </View>
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

  const handleSignUpBrand = async () => {
    const formData = new FormData();
    if (!email || !password || !phoneNumber) {
      Alert.alert("Please fill up the fields!")
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password doesn't match")
      return;
    }
    const userData = {
      brandName: brandName,
      theme: theme,
      email: email,
      password: password,
      confirmedPassword: confirmPassword,
      role: "Brand",
      mobile: phoneNumber,
      countryCode: "+880",
    };



    if (selectedImage) {

      const imageFile = {
        uri: selectedImage?.uri,
        name: selectedImage?.fileName,
        type: selectedImage?.mimeType
      }
      formData.append("brandLogo", imageFile)
    }


    formData.append("data", JSON.stringify(userData));

    console.log(formData,"form data...")

    try {
      const res = await postBody(formData).unwrap();

      Alert.alert(res.message);
    } catch (err: any) {
      console.log(err)
      const errorMessage = err?.data?.message || err?.message || "An unknown error occurred";
      Alert.alert("Error", errorMessage);
    }

  };

  return (
    <ScrollView className="flex-1 bg-[#121212] p-3" contentContainerStyle={{ paddingBottom: 150 }}>
      <View className="px-3">
        <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2">Create Your Account</Text>
        <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-instrumentSansSemiBold">It is quick and easy to create you account</Text>

        <View className="bg-[#2C2C2C] mt-1 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1" placeholder="Enter Brand Name" placeholderTextColor={"#ADAEBC"} style={{ color: "#ADAEBC" }} onChangeText={setBrandName} />
        </View>

        <Text className="mt-1 mb-2 text-[#FFFFFF] text-xl font-instrumentSansSemiBold">Theme</Text>

        <View className="bg-[#2C2C2C] mt-1 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1" placeholder="Enter Theme" placeholderTextColor={"#ADAEBC"} style={{ color: "#ADAEBC" }} onChangeText={setTheme} />
        </View>

        <Text className='font-instrumentSansSemiBold text-xl text-[#fff]  w-full'>Brand Logo</Text>
        <TouchableOpacity style={{ height: verticalScale(194) }} className='w-full items-center justify-center border border-dashed border-white  rounded-xl mt-3 bg-[#2C2C2C] mb-4 overflow-hidden' onPress={openCamera}>
          {selectedImage ?
            <Image
              source={{ uri: selectedImage.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />

            : <Image source={require("../../../assets/e-icon/Frame (1).png")} style={{ width: scale(30), height: verticalScale(30) }} />
          }
        </TouchableOpacity>

        <View className="bg-[#2C2C2C] rounded-lg mt-2" style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, marginBottom: 5 }}>

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
            onChangeText={setPhoneNumber}
          />
        </View>
        <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1" placeholder="Enter Your E-Mail Address" placeholderTextColor={"#ADAEBC"} style={{ color: "#ADAEBC" }} onChangeText={setEmail} />
        </View>

        <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1 text-[#ADAEBC]" placeholder="Enter Your Password" placeholderTextColor={"#ADAEBC"} secureTextEntry={isShowPassword} style={{ color: "#ADAEBC" }} onChangeText={setPassword} />
          <TouchableOpacity className="flex-row items-center" onPress={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <Feather name="eye" size={24} color="gray" />
              : <Feather name="eye-off" size={24} color="gray" />}
          </TouchableOpacity>
        </View>

        <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1 text-[#ADAEBC]" placeholder="Confirmed Password" placeholderTextColor={"#ADAEBC"} secureTextEntry={isShowPassword} style={{ color: "#ADAEBC" }} onChangeText={setConfirmPassword} />
          <TouchableOpacity className="flex-row items-center" onPress={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <Feather name="eye" size={24} color="gray" />
              : <Feather name="eye-off" size={24} color="gray" />}
          </TouchableOpacity>
        </View>



        <TouchableOpacity className="mt-1 mb-3 items-center bg-[#4A4A4A] rounded-lg overflow-hidden" onPress={handleSignUpBrand}>
          <LinearGradient
            colors={["#fff", "#fff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-lg  overflow-hidden"
            style={{ width: "100%", alignItems: "center", padding: 10 }}
          >
            <Text className="text-[#121212] text-xl font-instrumentSansBold" >Create a Brand Account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUpBrand