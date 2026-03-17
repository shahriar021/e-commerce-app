import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { getTime } from 'src/components/shared/timeHistory'
import { useAppSelector } from 'src/redux/hooks'
import { useGetIndividualPostQuery } from 'src/redux/features/profile/profile/profileApi'
import { useFocusEffect } from '@react-navigation/native'

const Posts = ({ data}:any) => {
    const token = useAppSelector((state) => state.auth.token)
    const [postLoadlimit, setPostLoadlimit] = useState(10);
    const { data: getPostData,refetch } = useGetIndividualPostQuery({ token, uid: data, limit: postLoadlimit })

     useFocusEffect(
        useCallback(() => {
            if (data) refetch();
        }, [data, refetch])
    );

    return (
        <View className='flex-1 bg-[#121212] w-full p-3'>
            {getPostData?.data?.data?.map((item:any,index:any) => <View  key={index} className='flex-1 items-center bg-[#252525] p-2 rounded-3xl mt-1 mb-2'>
                <View className='flex-row gap-2 items-center  w-full p-1 m-2'>
                    <View style={{ width: scale(30), height: scale(30) }}>
                        <Image source={{ uri: item.profile[0] }} style={{ width: "100%", height: "100%" }} />
                    </View>
                    <View className='flex-col  gap-2'>

                        <Text className='text-white font-instrumentSansBold'>{item.userName}</Text>

                        <Text className='text-[#ADAEBC] font-instrumentRegular'>{getTime(item.createdAt)}</Text>
                    </View>

                </View>
                <Image source={{ uri: item.attachment[0] }} style={{ width: '92%', height: verticalScale(250), borderRadius: 24 }} />
                <View className='w-full m-4'><Text className='text-white mt-3 mx-2 font-instrumentRegular' >{item.caption} </Text></View>
            </View>)}

            <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden w-full' onPress={() => setPostLoadlimit(postLoadlimit + 10)}>
                <Text className='text-white font-instrumentSansBold text-xl'>Load More</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Posts