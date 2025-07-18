import { View, Text, useWindowDimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpUser = ({setIsSignIn,handleVerify,setRoleOff}:any) => {
    const { height, width } = useWindowDimensions();
  return (
    <ScrollView className="mt-4 flex-1 w-full ">
            <Text className="font-robotoBold text-2xl text-left mb-2">Create New Account</Text>
            <Text className="mb-2">Please fill your detail information</Text>

            <Text className="mt-1 mb-1">Name</Text>
            <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
            <Text className="mt-1 mb-1">Email</Text>
            <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />
            <Text className="mt-1 mb-1">Mobile Number</Text>
            <TextInput className="border rounded-xl mt-1 border-gray-300 mb-1 p-3" />

            <Text className="mt-1 mb-1">Password</Text>
            <View className="flex-row border border-gray-300 rounded-xl items-center px-3">
              <TextInput className="flex-1 py-3" /><Feather name="eye-off" size={24} color="gray" />
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <TouchableOpacity>
                  <Text>
                    <Entypo name="circle" size={24} color="gray" />
                  </Text>
                </TouchableOpacity>
                <Text>Remember Me</Text>
              </View>
              <Text className="text-red-700">Forget Password?</Text>
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

export default SignUpUser