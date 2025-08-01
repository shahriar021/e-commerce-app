import { View, Text } from 'react-native'
import React from 'react'

const Details = () => {
  return (
    <View className='flex-1 p-3'>
      <View className='bg-[#252525] p-2 rounded-xl'>
        <Text className='text-white mb-3 font-instrumentSansSemiBold'>About</Text>
      <Text className='text-white font-instrumentRegular'  >
        Passionate about urban fashion, curating looks since2020. I believe style is a form of self-expression that transcends boundaries. Always on the hunt for unique pieces that tell a story.
      </Text>
      </View>

      <View className='bg-[#252525] p-2 rounded-xl mt-3'>
        <Text className='text-white mb-3 font-instrumentSansSemiBold'  >HomeTown</Text>
      <Text className='text-white font-instrumentRegular'  >
        Latos,Nigeria
      </Text>
      </View>

      <View className='bg-[#252525] p-2 rounded-xl mt-3'>
        <Text className='text-white mb-3 font-instrumentSansSemiBold' >Favorite Style</Text>
            <View className='flex-row justify-between items-center'>
                <Text className='bg-[#374151] text-white p-2 rounded-full font-instrumentRegular'>#StreetWare</Text>
                <Text className='bg-[#374151] text-white p-2 rounded-full font-instrumentRegular'>#Heritage</Text>
                <Text className='bg-[#374151] text-white p-2 rounded-full font-instrumentRegular'>#Minimalists</Text>
            </View>
      </View>
    </View>
  )
}

export default Details