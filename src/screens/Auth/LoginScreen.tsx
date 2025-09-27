import { AntDesign, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect, useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { setToken, setUserType } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi"

const LoginScreen = () => {

    const navigation = useNavigation()
    const [isType, setIsType] = useState(false);
    const [userTypes, setUserTypes] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginData] = useLoginMutation()

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
            },
            headerTintColor: "#FFFFFF",
            headerTitle: () => null,
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

    const validateEmail = (email: any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        if (!userTypes) {
            Alert.alert("Error", "Please select a user type");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        if (!password.trim()) {
            Alert.alert("Error", "Please enter your password");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return;
        }
        const ldata = {
            data: {
                email: email,
                password: password
            }

        }
        try {
            const res = await loginData(ldata).unwrap(); // Send form-data instead of JSON
            Alert.alert(res.message)
            dispatch(setToken(res.data.accessToken));
            dispatch(setUserType(userTypes));
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "An unknown error occurred";
            Alert.alert("Error", errorMessage);
        }
        console.log(ldata, "login ")

    };

    return (
        <View className="flex-1 bg-[#121212] p-3">
            <View className="px-3 relative">
                <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2" >Login to Your Account</Text>
                <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-semibold" >It is quick and easy to log in. Enter your email and password below.</Text>

                <View className=" bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder={userTypes ? userTypes : "Select Types"} placeholderTextColor={"#ADAEBC"} style={{ color: "#ADAEBC" }} />
                    <TouchableOpacity onPress={() => setIsType(true)}>

                        <AntDesign name="downcircle" size={24} color="#626870" />
                    </TouchableOpacity>

                </View>

                {isType && <View className="absolute bg-[#121212] top-44 z-10 right-3 rounded-lg p-2 gap-2 border border-white">
                    <TouchableOpacity className="bg-[#2C2C2C] p-2 rounded-lg" onPress={() => {
                        setUserTypes("user")
                        setIsType(false)
                    }}>
                        <Text className="font-instrumentRegular text-white">User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#2C2C2C] p-2 rounded-lg" onPress={() => {
                        setUserTypes("provider")
                        setIsType(false)
                    }}>
                        <Text className="font-instrumentRegular text-white">Service Provider</Text>
                    </TouchableOpacity>

                </View>}
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter your email address" onChangeText={setEmail} placeholderTextColor={"#ADAEBC"} style={{ color: "#ADAEBC" }} />
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" placeholder="Enter Password" onChangeText={setPassword} placeholderTextColor={"#ADAEBC"} style={{ color: "#ADAEBC" }} />
                </View>

                <TouchableOpacity className="mt-1 mb-3" onPress={() => navigation.navigate("Forget Password")}>
                    <Text className="text-[#1E80DD] font-instrumentSansBold">Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity className="mt-1 mb-3 items-center" onPress={() => navigation.navigate("Sign Up as User")}>
                    <Text className="text-[#979797] text-xl font-instrumentSansBold">I don’t have an account</Text>
                </TouchableOpacity>

                <TouchableOpacity className="mt-1 mb-3 items-center bg-[#fff] p-3 rounded-lg " onPress={handleLogin}>
                    <Text className="text-[#000] text-xl font-instrumentSansBold" >login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen