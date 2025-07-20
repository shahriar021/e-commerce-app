import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const OTPScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [otpNumbers, setOtpNumbers] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: any, index: any) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otpNumbers];
      newOtp[index] = text;
      setOtpNumbers(newOtp);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  console.log(otpNumbers.join(""))

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === 'Backspace' && otpNumbers[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otpNumbers.join('');
    navigation.navigate("OTP Screen" as never);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212"
      },
      headerTintColor: "#FFFFFF",
      headerTitle: '', // hides title in header center
      headerBackTitleVisible: false, // hides back label
      headerBackTitle: '', // extra safety for iOS
    })
  }, [navigation])

  return (
    <View className="flex-1 bg-[#121212] p-3">
      <View className="px-3">
        <Text className="text-[#FFFFFF] text-2xl font-playFairDisplay mb-2" style={{ fontFamily: 'playFairDisplay' }}>OTP Verification</Text>
        <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-playFairDisplay" style={{ fontFamily: 'playFairDisplay' }}>Enter 6-digit Code</Text>
        <Text className='text-[#FFFFFF]'>Your code was sent to +1111499350</Text>


        <View className='flex-row gap-5 mt-3 mb-2 justify-center'>
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
        <Text className='text-[#989898] mt-2 mb-3'>Resend code 59s</Text>
        <TouchableOpacity className="mt-2 mb-3 p-3 items-center bg-[#4A4A4A] rounded-lg overflow-hidden" onPress={() => navigation.navigate("Success page")}>
            <Text className="text-[#979797] text-xl font-prostoOne" style={{ fontFamily: 'prosto-One' }}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;




