import { View, Text, Image } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'

const Posts = () => {

    return (
        <View className='flex-1 bg-[#121212] w-full p-3'>
            <View className='flex-1 items-center bg-[#252525] p-2 rounded-3xl mt-1 mb-2'>
                <View className='flex-row gap-2 items-center  w-full p-1 m-2'>
                    <View style={{ width: scale(30), height: scale(30) }}>
                        <Image source={require("../../../assets/e-icon/Ellipse 1.png")} style={{ width: "100%", height: "100%" }} />
                    </View>
                    <View className='flex-col  gap-2'>

                        <Text className='text-white font-instrumentSansBold'>Jack Robo</Text>

                        <Text className='text-[#ADAEBC] font-instrumentRegular'>15 min ago</Text>
                    </View>

                </View>
                <Image source={require("../../../assets/e-icon/postphoto.png")} style={{ width: '92%', height: verticalScale(250), borderRadius: 24 }} />
                <Text className='text-white mt-3 mx-2 font-instrumentRegular' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            </View>


        </View>
    )
}

export default Posts