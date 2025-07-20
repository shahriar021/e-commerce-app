import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

const LoginScreen =()=>{
    
    const navigatgion =useNavigation()

    useLayoutEffect(()=>{
       navigatgion.setOptions({
         headerStyle:{
            backgroundColor:"#121212"
        },
        headerTintColor:"#FFFFFF",
        headerTitle:()=>null
       })
    },[navigatgion])

    return (
        <View className="flex-1 bg-[#121212] p-3">
            <View className="px-3">
                <Text className="text-[#FFFFFF] text-2xl font-playFairDisplay mb-2" style={{ fontFamily: 'playFairDisplay' }}>Login to Your Account</Text>
                <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-playFairDisplay"  style={{ fontFamily: 'playFairDisplay' }}>It is quick and easy to log in. Enter your email and password below.</Text>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="user" placeholderTextColor={"#ADAEBC"}/>
                    <AntDesign name="downcircle" size={24} color="#626870" />
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter your email address" placeholderTextColor={"#ADAEBC"}/>
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter Password" placeholderTextColor={"#ADAEBC"}/>
                </View>

                <TouchableOpacity className="mt-1 mb-3" onPress={()=>navigatgion.navigate("Forget Password")}>
                    <Text className="text-[#1E80DD]">Forgot Password?</Text>
                </TouchableOpacity>

                 <TouchableOpacity className="mt-1 mb-3 items-center">
                    <Text className="text-[#979797] text-xl">I don’t have an account</Text>
                </TouchableOpacity>

                <TouchableOpacity className="mt-1 mb-3 items-center bg-[#4A4A4A] p-3 rounded-lg ">
                    <Text className="text-[#979797] text-xl font-prostoOne" style={{fontFamily:'prosto-One'}}>login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen