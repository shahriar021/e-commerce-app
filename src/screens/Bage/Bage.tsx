import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import { bageData } from './demoBage'
import { useAppSelector } from 'src/redux/hooks'
import { useFeatureBrandsQuery } from 'src/redux/features/brand/brandApi'

const Bage = () => {

  const navigation = useNavigation()
  const [loadMore,setLoadMore]=useState(6)
  const token = useAppSelector((state) => state.auth.token);
  const { data } = useFeatureBrandsQuery({token,limit:loadMore})
  console.log(data, "in brand")
  console.log(loadMore,"load more.")
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitle: () => (
        <View className='flex-col'><Text className='text-[#ffffff] justify-center text-xl font-instrumentSansBold'>ARKIVE</Text><Text className='text-[#ffffff] font-instrumentSansSemiBold'>A-Z Brands</Text></View>
      )
    });
  }, [navigation]);

  return (
    <View className='flex-1 bg bg-[#121212] p-4 items-center'>
      <View className='border p-2 mt-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3'>
        <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
        <TextInput className='flex-1 font-instrumentSansSemiBold' placeholder='Search Brands...' placeholderTextColor={"#ADAEBC"} />
      </View>

      <ScrollView className='flex-1 0 w-full'>
        <View className='  flex-wrap flex-row gap-2 justify-between '>
          {data?.data?.data?.map((item: any) => <TouchableOpacity key={item._id} className='relative rounded-xl overflow-hidden mt-1 mb-1 ' style={{ width: "48%", aspectRatio: 1 }} onPress={() => navigation.navigate("Brand Details",{id:item._id})}>
            <Image source={{ uri: item.brandLogo[0] }} style={{ width: "100%", height: "100%" }} />
            <Text className='absolute  bottom-3 left-0 right-0 text-xl font-instrumentSansBold text-white text-center'>{item?.brandName}</Text>
          </TouchableOpacity>)}
        </View>
        <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden w-full' onPress={()=>setLoadMore(loadMore+2)}>
          <Text className='text-white font-instrumentSansBold text-xl'>Load More</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Bage