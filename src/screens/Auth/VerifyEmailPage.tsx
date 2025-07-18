import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react'
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const VerifyEmailPage = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Verify your email",
      headerStyle: {
        backgroundColor: "white",
        elevation: 0, // for Android
        shadowOpacity: 0, // for iOS
        borderBottomWidth: 0, // for iOS
      },
      headerTintColor: "black",
      headerTitleAlign: "center",


      headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
            <Entypo name="chevron-small-left" size={24} color="red" />
          </View>
        </TouchableOpacity>
      )

    });
  }, [navigation]);
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const handleVerify = () => {
    navigation.navigate("OTP Screen" as never)
  }

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center'>
        <View style={{ width: width * 0.2, height: height * 0.1 }} className='bg-red-50 rounded-full'>
          <Image source={require("../../../assets/restroIcon/Message_open_duotone.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
        </View>
        <Text className='font-robotoBold text-xl'>There’s a letter waiting for you</Text>
        <Text className='text-center text-gray-500'>{"Not all letters change lives. But this one might. \n Check your inbox to continue"}</Text>

        <View className="items-center">
          <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={handleVerify}>
            <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
              <Text className="text-white p-3 ">Confirm Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default VerifyEmailPage