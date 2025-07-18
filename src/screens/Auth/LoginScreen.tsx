import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { setToken, setUser, setUserType } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import SignUpRider from "./SignUpRider";
import SignUpUser from "./SignUpUser";
import { scale, verticalScale } from "react-native-size-matters";

const LoginScreen = () => {
  const { height, width } = useWindowDimensions();
  const [isSignIn, setIsSignIn] = useState(true)
  const [isUser, setIsUser] = useState("user")
  const [roleOff, setRoleOff] = useState(true)
  const [postLogin] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation()

  const dispatch = useDispatch();

  const handleLogin = async () => {
    // if (email !== "" && password !== "") {
    //   try {
    //     const output = { email, password };
    //     const result = await postLogin(output).unwrap();
    //     if (result?.status) {
    //       const { data } = result;
    //       dispatch(setUser({ user: data, Credential: output }));
    //     }
    //     if (!result?.status) {
    //       Alert.alert(result.message);
    //     }
    //   } catch (err: any) {
    //     Alert.alert("Something went wrong!", err);
    //   }
    // } else {
    //   Alert.alert("Please Enter a valid Email or password.");
    // }
    console.log(email, "email.")
    const normalizedEmail = email.trim().toLowerCase();
    const type = normalizedEmail === "user@gmail.com" ? "user" : "rider";
    console.log(type, "type")
    dispatch(setToken(true))
    dispatch(setUserType(type))
  };
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const handleVerify = () => {
    navigation.navigate("VerifyEmail" as never)
  }


  return (

    <SafeAreaView className="flex-1 bg-[#121212] ">
      <ImageBackground
        source={require("../../../assets/e-icon/logBack.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View className="flex-1 items-center justify-end px-4 mb-5 p-3 ">
          <View className="  items-start mt-1 mb-2  " style={{ width: width, height: verticalScale(54) }}>
            <Image source={require("../../../assets/ARKIVE.png")} style={{ width: "70%", height: "100%", marginLeft: 10 }} resizeMode="contain" />
          </View>
          <View className=" w-full items-start">
            <Text className="text-[#ADAEBC] font-prostoOne text-4xl  ">Define yourself in your unique way.</Text>
          </View>


          <TouchableOpacity className="mt-4 border border-[#FFFFFF] w-full items-center p-3 rounded-lg" onPress={handleLogin}>
            <Text className="text-white text-lg font-prostoOne">Log In</Text>
          </TouchableOpacity>

          <View className="w-full mt-2 rounded-lg overflow-hidden">
            <LinearGradient
              colors={["#9DC7E9", "#E6F6FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full rounded-lg mt-2"
            >
              <TouchableOpacity className="w-full items-center p-3 rounded-lg bg-transparent">
                <Text className="text-black font-semibold font-prostoOne">Create Branch Account</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <TouchableOpacity className="mt-2 border border-[#FFFFFF] w-full items-center p-3 rounded-lg">
            <Text className="text-white font-prostoOne">Sign Up as Us</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>


  );
};

export default LoginScreen;
