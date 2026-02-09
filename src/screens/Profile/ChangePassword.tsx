import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useUpdatePasswordMutation } from "src/redux/features/auth/authApi";
import { useAppSelector } from "src/redux/hooks";
import { Toast } from "toastify-react-native";

const ChangePassword = () => {
  const { width } = useWindowDimensions();
  const token = useAppSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewmPassword] = useState("");
  const [isVisilbe, setIsVisible] = useState(true);
  const [updatePass] = useUpdatePasswordMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Change Password",
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0, 
        shadowOpacity: 0, 
        borderBottomWidth: 0, 
      },
      headerTintColor: "white",
      headerTitleAlign: "start",
      headerTitleStyle: "instrumentSans-Bold",
      headerLeft: () => (
        <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleUpdate = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Fill all the necessary");
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.warn("Password doesnt match!");
      return;
    }

    const info = {
      data: {
        oldPassword: password,
        newPassword: confirmPassword,
      },
    };

    try {
      const res = await updatePass({ token, body: info }).unwrap();
      Alert.alert(res?.message);
    } catch (err) {
      Alert.alert("something went wrong!");
    }
  };

  return (
    <View className="p-4 items-center">
      <View className=" " style={{ width: scale(116), height: scale(116) }}>
        <Image
          source={require("../../../assets/e-icon/cnhPass.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <Text className="font-instrumentSansSemiBold text-xl text-[#fff]  w-full">
        Password
      </Text>
      <View className="flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1 bg-[#252525]">
        <TextInput
          className=" flex-1"
          placeholderTextColor={"#75838D"}
          style={{ color: "#75838D" }}
          onChangeText={setPassword}
          secureTextEntry={isVisilbe}
        />
        <TouchableOpacity onPress={() => setIsVisible(!isVisilbe)}>
          {isVisilbe ? (
            <Feather name="eye-off" size={24} color="gray" />
          ) : (
            <Feather name="eye" size={24} color="gray" />
          )}
        </TouchableOpacity>
      </View>

      <Text className="font-instrumentSansSemiBold text-xl text-[#fff] w-full">
        New Password
      </Text>
      <View className="flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1 bg-[#252525]">
        <TextInput
          className=" flex-1 "
          placeholderTextColor={"#75838D"}
          style={{ color: "#75838D" }}
          onChangeText={setNewmPassword}
          secureTextEntry={isVisilbe}
        />
        <TouchableOpacity onPress={() => setIsVisible(!isVisilbe)}>
          {isVisilbe ? (
            <Feather name="eye-off" size={24} color="gray" />
          ) : (
            <Feather name="eye" size={24} color="gray" />
          )}
        </TouchableOpacity>
      </View>

      <Text className="font-instrumentSansSemiBold text-xl text-[#fff] w-full">
        Confirm Password
      </Text>
      <View className="flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1 bg-[#252525]">
        <TextInput
          className=" flex-1 "
          placeholderTextColor={"#75838D"}
          style={{ color: "#75838D" }}
          onChangeText={setConfirmPassword}
          secureTextEntry={isVisilbe}
        />
        <TouchableOpacity onPress={() => setIsVisible(!isVisilbe)}>
          {isVisilbe ? (
            <Feather name="eye-off" size={24} color="gray" />
          ) : (
            <Feather name="eye" size={24} color="gray" />
          )}
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <TouchableOpacity
          className=" items-center mt-3 rounded-xl  overflow-hidden bg-[#1D3725]"
          style={{ width: width * 0.92 }}
          onPress={handleUpdate}
        >
          <Text className="text-white p-3 font-instrumentSansBold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
