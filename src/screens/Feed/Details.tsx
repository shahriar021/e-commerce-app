import { View, Text } from 'react-native'
import React from 'react'

const Details = () => {
  return (
    <View className='flex-1 p-3'>
      <View className='bg-[#252525] p-2 rounded-xl'>
        <Text className='text-white mb-3'>About</Text>
      <Text className='text-white'  >
        Passionate about urban fashion, curating looks since2020. I believe style is a form of self-expression that transcends boundaries. Always on the hunt for unique pieces that tell a story.
      </Text>
      </View>

      <View className='bg-[#252525] p-2 rounded-xl mt-3'>
        <Text className='text-white mb-3'  >HomeTown</Text>
      <Text className='text-white'  >
        Latos,Nigeria
      </Text>
      </View>

      <View className='bg-[#252525] p-2 rounded-xl mt-3'>
        <Text className='text-white mb-3' >Favorite Style</Text>
            <View className='flex-row justify-between items-center'>
                <Text className='bg-[#374151] text-white p-2 rounded-full'>#StreetWare</Text>
                <Text className='bg-[#374151] text-white p-2 rounded-full'>#Heritage</Text>
                <Text className='bg-[#374151] text-white p-2 rounded-full'>#Minimalists</Text>
            </View>
      </View>
    </View>
  )
}

export default Details