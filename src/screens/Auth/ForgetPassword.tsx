import { AntDesign, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useLayoutEffect, useState } from "react"
import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native"

const ForgetPassword = () => {

  const navigatgion = useNavigation()

  const [isShowPassword, setIsShowPassword] = useState(false)

  useLayoutEffect(() => {
    navigatgion.setOptions({
      headerStyle: {
        backgroundColor: "#121212"
      },
      headerTintColor: "#FFFFFF",
      headerTitle: '', // hides title in header center
      headerBackTitleVisible: false, // hides back label
      headerBackTitle: '', // extra safety for iOS
    })
  }, [navigatgion])

  return (
    <View className="flex-1 bg-[#121212] p-3">
      <View className="px-3">
        <Text className="text-[#FFFFFF] text-2xl font-playFairDisplay mb-2" style={{ fontFamily: 'playFairDisplay' }}>Forget Password</Text>
        <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-playFairDisplay" style={{ fontFamily: 'playFairDisplay' }}>We’ll send a verification code to your mail </Text>

        <View className="bg-[#2C2C2C] mt-3 mb-5 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1" placeholder="Enter E-Mail Address" placeholderTextColor={"#ADAEBC"} />
        </View>
        <TouchableOpacity className="mt-2 mb-3 items-center  rounded-lg overflow-hidden" onPress={() => navigatgion.navigate("OTP Screen")}>
          <LinearGradient
            colors={["#9DC7E9", "#E6F6FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-lg overflow-hidden "
            style={{ width: "100%", alignItems: "center", padding: 10 }}
          >
            <Text className="text-[#979797] text-xl font-prostoOne" style={{ fontFamily: 'prosto-One' }}>Send Email</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForgetPassword