import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useOtpVerifyMutation } from 'src/redux/features/auth/authApi';

const OTPScreen = () => {
  const route = useRoute()
  const { Otp, Email } = route.params
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [otpVerify] = useOtpVerifyMutation()

  const [otpNumbers, setOtpNumbers] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: any, index: any) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otpNumbers];
      newOtp[index] = text;
      setOtpNumbers(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === 'Backspace' && otpNumbers[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otpNumbers.join('');

    const info = {
      data: {
        email: Email,
        otp: Otp
      }
    }
    if (code === Otp) {
      const res = await otpVerify(info).unwrap()
      Alert.alert(res.message)
      navigation.navigate("Reset Password", { atoken: res.data.accessToken })
    } else {
      Alert.alert("OTP doesn't match"!)
    }
  };

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

  return (
    <View className="flex-1 bg-[#121212] p-3">
      <View className="px-3">
        <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2" >OTP Verification</Text>
        <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-instrumentSansBold" >Enter 6-digit Code</Text>
        <Text className='text-[#FFFFFF] font-instrumentRegular'>Your code was sent to shahriarc19@gmail.com</Text>


        <View className='flex-row gap-2 mt-3 mb-2 justify-center px-3'>
          {otpNumbers.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType='numeric'
              className='border-b p-1 rounded-lg border-b-[#E6E6E8] text-2xl text-blue-600 text-center font-bold'
              style={{ width: width * 0.15, height: height * 0.06 }}
            />
          ))}
        </View>
        <Text className='text-[#989898] mt-2 mb-3 font-instrumentRegular'>Resend code 59s</Text>
        <TouchableOpacity className="mt-2 mb-3 p-3 items-center bg-[#4A4A4A] rounded-lg overflow-hidden" onPress={handleVerify}>
          <Text className="text-[#979797] text-xl font-instrumentSansBold" >Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;




