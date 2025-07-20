import { AntDesign, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useLayoutEffect, useState } from "react"
import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native"

const SignUpUser =()=>{
    
    const navigatgion =useNavigation()

    const [isShowPassword,setIsShowPassword]=useState(false)

    useLayoutEffect(()=>{
       navigatgion.setOptions({
         headerStyle:{
            backgroundColor:"#121212"
        },
        headerTintColor: "#FFFFFF",
    headerTitle: '', // hides title in header center
    headerBackTitleVisible: false, // hides back label
    headerBackTitle: '', // extra safety for iOS
       })
    },[navigatgion])

    return (
        <View className="flex-1 bg-[#121212] p-3">
            <View className="px-3">
                <Text className="text-[#FFFFFF] text-2xl font-playFairDisplay mb-2" style={{ fontFamily: 'playFairDisplay' }}>Create Your Account</Text>
                <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-playFairDisplay"  style={{ fontFamily: 'playFairDisplay' }}>It is quick and easy to create you account</Text>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter First Name" placeholderTextColor={"#ADAEBC"}/>
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter Last Name" placeholderTextColor={"#ADAEBC"}/>
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter Your E-Mail Address" placeholderTextColor={"#ADAEBC"}/>
                </View>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1 text-[#ADAEBC]" placeholder="Enter Your Password" placeholderTextColor={"#ADAEBC"} secureTextEntry={isShowPassword}/>
                    <TouchableOpacity className="flex-row items-center" onPress={()=>setIsShowPassword(!isShowPassword)}>
                      {isShowPassword?<Feather name="eye" size={24} color="gray" />
                      :<Feather name="eye-off" size={24} color="gray" />}
                    </TouchableOpacity>
                </View>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1 text-[#ADAEBC]" placeholder="Confirmed Password" placeholderTextColor={"#ADAEBC"} secureTextEntry={isShowPassword}/>
                    <TouchableOpacity className="flex-row items-center" onPress={()=>setIsShowPassword(!isShowPassword)}>
                      {isShowPassword?<Feather name="eye" size={24} color="gray" />
                      :<Feather name="eye-off" size={24} color="gray" />}
                    </TouchableOpacity>
                </View>

               
                 
                <TouchableOpacity className="mt-1 mb-3 items-center bg-[#4A4A4A] rounded-lg overflow-hidden">
                  <LinearGradient
                                colors={["#9DC7E9", "#E6F6FF"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="w-full rounded-lg  overflow-hidden"
                                style={{width:"100%",alignItems:"center",padding:10}}
                              >
                    <Text className="text-[#979797] text-xl font-prostoOne" style={{fontFamily:'prosto-One'}}>Create Account</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpUser