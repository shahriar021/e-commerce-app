import { View, Text } from 'react-native'
import React from 'react'

const Details = ({data}) => {
  return (
    <View className='flex-1 p-3  w-full'>
      <View className='bg-[#252525] p-2 rounded-xl'>
        <Text className='text-white mb-3 font-instrumentSansSemiBold'>About</Text>
      <Text className='text-white font-instrumentRegular'  >
        {data?.about}
      </Text>
      </View>

      <View className='bg-[#252525] p-2 rounded-xl mt-3'>
        <Text className='text-white mb-3 font-instrumentSansSemiBold'  >HomeTown</Text>
      <Text className='text-white font-instrumentRegular'  >
       {data?.hometown}
      </Text>
      </View>

      <View className='bg-[#252525] p-2 rounded-xl mt-3'>
        <Text className='text-white mb-3 font-instrumentSansSemiBold' >Favorite Style</Text>
            <View className='flex-row flex-wrap gap-2  items-center'>
                {data?.favouriteStyles?.map(item=><Text className='bg-[#374151] text-white p-2 rounded-full font-instrumentRegular'>#{item}</Text>)}
            </View>
      </View>
    </View>
  )
}

export default Details