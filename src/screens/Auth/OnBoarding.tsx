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
import React, { useLayoutEffect, useState } from "react";
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

const OnBoarding = () => {
  const { height, width } = useWindowDimensions();
  const [isSignIn, setIsSignIn] = useState(true)
  const [isUser, setIsUser] = useState("user")
  const [roleOff, setRoleOff] = useState(true)
  const [postLogin] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation()

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '', // or any title you want
    });
  }, [navigation]);


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
        source={require("../../../assets/e-icon/ON.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View className="flex-1 items-center justify-end px-4 mb-5 p-3 ">
          <View className="w-full">
            <View style={{width:scale(250),height:verticalScale(50)}} >
              <Image source={require("../../../assets/e-icon/ark.png")} style={{ width: "100%", height: "100%" }} />
            </View>
          </View>
          <View className=" w-full items-start mt-5">
            <Text className="text-[#fff] font-helvetica text-4xl  ">Define yourself in your unique way.</Text>
          </View>


          <TouchableOpacity className="mt-20 mb-2 border border-[#FFFFFF] w-full items-center p-3 rounded-lg" onPress={() => navigation.navigate("Login Screen")}>
            <Text className="text-white text-lg font-helvetica">Log In</Text>
          </TouchableOpacity>

          <View className="w-full mt-2 rounded-lg overflow-hidden mb-2">
            <LinearGradient
              colors={["#fff", "#fff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full rounded-lg mt-2 overflow-hidden"
            >
              <TouchableOpacity className="w-full items-center p-3 rounded-lg bg-transparent overflow-hidden" onPress={() => navigation.navigate("Sign Up as Rider")}>
                <Text className="text-black font-semibold font-helvetica">Create Brand Account</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <TouchableOpacity className="mt-2 mb-2 border border-[#FFFFFF] w-full items-center p-3 rounded-lg" onPress={() => navigation.navigate("Sign Up as User")}>
            <Text className="text-white font-helvetica">Sign Up as User</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>


  );
};

export default OnBoarding;
