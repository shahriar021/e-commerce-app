import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import { bageData } from './demoBage'

const Bage = () => {

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitle: () => (
        <View className='flex-col'><Text className='text-[#ffffff] justify-center text-xl font-helvetica'>ARKIVE</Text><Text className='text-[#ffffff] font-helvetica'>A-Z Brands</Text></View>
      )
    });
  }, [navigation]);

  return (
    <View className='flex-1 bg bg-[#121212] p-4 items-center'>
      <View className='border p-2 mt-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3'>
        <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
        <TextInput className='flex-1 font-helvetica' placeholder='Search Brands...' placeholderTextColor={"#ADAEBC"} />
      </View>

      <ScrollView className='flex-1'>
        <View className='flex-wrap flex-row gap-2 justify-between '>
          {bageData?.map(item => <TouchableOpacity key={item.image} className='relative rounded-xl overflow-hidden mt-1 mb-1 ' style={{ width: "48%", aspectRatio: 1 }} onPress={() => navigation.navigate("Brand Details")}>
            <Image source={item.image} style={{ width: "100%", height: "100%" }} />
            <Text className='absolute  bottom-3 left-0 right-0 text-xl font-helvetica text-white text-center'>{item.title}</Text>
          </TouchableOpacity>)}
        </View>
        <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden'>
          <Text className='text-white font-helvetica text-xl'>Load More</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Bage