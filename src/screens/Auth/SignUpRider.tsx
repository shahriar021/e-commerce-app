import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { takePhotoAsync } from 'src/utils/takePhotoAsync'
import { useNavigation } from '@react-navigation/native'

const SignUpRider = ({ setIsSignIn, handleVerify, setRoleOff }: any) => {
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions();
  const [photo, setPhoto] = useState(null);
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  const handleTakePhoto = async () => {
    const image = await takePhotoAsync();
    if (image) {
      setPhoto(image);
    }
  };

  handleVerify = () => {
    navigation.navigate("Verification Page")
  }


  return (
    <ScrollView className="mt-4 flex-1 w-full " showsVerticalScrollIndicator={false}>
      <Text className="font-robotoBold text-2xl text-left mb-2">Create New Account Rider</Text>
      <Text className="mb-2">Please fill your detail information</Text>

      <Text className="mt-1 mb-1">Name</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
      <Text className="mt-1 mb-1">Email</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
      <Text className="mt-1 mb-1">Mobile Number</Text>
      <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />




      <View>
        <Text className="mt-1 mb-1">Upload Valid ID</Text>
        <TouchableOpacity onPress={handleTakePhoto} className='border border-gray-200 border-dashed mt-3 items-center p-3 rounded-md'>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={{ width: width * 0.9, height: 180 }}
              className='rounded-xl' />
          ) : (
            <Image source={require("../../../assets/restroIcon/Download_light.png")} style={{ width: 62, height: 62 }} />
          )}
        </TouchableOpacity>


        <Text className="mt-1 mb-1">Upload Driving license <Text className='text-[#848484]'>(Optional)</Text></Text>
        <TouchableOpacity onPress={handleTakePhoto} className='border border-gray-200 border-dashed mt-3 items-center p-3 rounded-md'>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={{ width: "100%", height: 200 }} className='rounded-xl' />
          ) : (
            <Image source={require("../../../assets/restroIcon/Download_light.png")} style={{ width: 62, height: 62 }} />
          )}
        </TouchableOpacity>

        <Text className="mt-1 mb-1">Upload Profile Photo</Text>
        <TouchableOpacity onPress={handleTakePhoto} className='border border-gray-200 border-dashed mt-3 items-center p-3 rounded-md'>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={{ width: "100%", height: 200 }} className='rounded-xl' />
          ) : (
            <Image source={require("../../../assets/restroIcon/Download_light.png")} style={{ width: 62, height: 62 }} />
          )}
        </TouchableOpacity>

        <Text className="mt-1 mb-1">Upload Proof of Address / Residence</Text>
        <TouchableOpacity onPress={handleTakePhoto} className='border border-gray-200 border-dashed mt-3 items-center p-3 rounded-md'>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={{ width: "100%", height: 200 }} className='rounded-xl' />
          ) : (
            <Image source={require("../../../assets/restroIcon/Download_light.png")} style={{ width: 62, height: 62 }} />
          )}
        </TouchableOpacity>

        <Text className="mt-1 mb-1">Upload Certificate of Civil Liability Insurance</Text>
        <TouchableOpacity onPress={handleTakePhoto} className='border border-gray-200 border-dashed mt-3 items-center p-3 rounded-md'>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={{ width: "100%", height: 200 }} className='rounded-xl' />
          ) : (
            <Image source={require("../../../assets/restroIcon/Download_light.png")} style={{ width: 62, height: 62 }} />
          )}
        </TouchableOpacity>

        <Text className="mt-1 mb-1">Password</Text>
        <View className="flex-row border border-gray-300 rounded-xl items-center px-3">
          <TextInput className="flex-1 py-3" value={password} onChangeText={setPassword} secureTextEntry={!isVisible} />
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Feather name="eye-off" size={24} color="gray" /> : <Feather name="eye" size={24} color="gray" />}
          </TouchableOpacity>
        </View>

      </View>
      <View className='mt-1 mb-1 flex-row items-center gap-2'>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          {isChecked ? (
            <Image
              source={require("../../../assets/restroIcon/Checkboxes.png")}
              style={{ width: 36, height: 36, resizeMode: 'contain' }}
            />
          ) : (
            <Image
              source={require("../../../assets/restroIcon/checkbox-image-icon-10.jpg")}
              style={{ width: 36, height: 36, resizeMode: 'contain' }}
            />
          )}
        </TouchableOpacity>

        <Text className='text-[#5C5C5C]'>
          I agree to the <Text className='underline'>Terms & Conditions</Text> and{" "}
          <Text className='underline'>Privacy Policy</Text>
        </Text>
      </View>



      <View className="items-center">
        <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={handleVerify}>
          <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
            <Text className="text-white p-3 ">Verify Email</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mt-4 gap-2 justify-center"><Text className="text-center ">Already have an account?</Text>

        <TouchableOpacity onPress={() => setIsSignIn(true)}><Text className="text-[#B42315]">Log In</Text>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUpRider