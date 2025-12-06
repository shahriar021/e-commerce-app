import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { Rating } from 'react-native-ratings'
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import ReviewModal from './ReviewModal'
import { useGetALlReviewBasedOnIdQuery } from 'src/redux/features/review/reviewApi'
import { useAppSelector } from 'src/redux/hooks'
import { getTime } from 'src/components/shared/timeHistory'

const Review = () => {
    const route = useRoute()
    const { id } = route.params
    const navigation = useNavigation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const token = useAppSelector((state) => state.auth.token)
    const [limit, setLimit] = useState(20)
    const [userId]=useState(id)
    const [loadMore,setLoadMore]=useState(10)
    const { data: getReview ,isLoading} = useGetALlReviewBasedOnIdQuery({ token, id: id, limit: loadMore })

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity className='flex-row gap-2 items-center mr-4' onPress={() => navigation.goBack()}>
                <Feather name="arrow-left-circle" size={24} color="white" />
                <View className=''>
                    <Text className='font-helvetica text-white text-2xl'>Reviews</Text>
                </View>
            </TouchableOpacity>
        )
    });

    const handleModal = () => {
        setIsModalOpen(true)
    }

    if(isLoading){
        <ActivityIndicator size={"small"} color={"white"}/>
    }

    return (
        <View className='relative flex-1'>
            <TouchableOpacity className='absolute right-10 bottom-10 z-10 bg-[#1D3725] p-3 rounded-full' onPress={handleModal}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{alignItems:"center",paddingBottom:100}}>

                <View className='flex-1 bg-[#121212] p-4 '>
                    {isLoading&&<ActivityIndicator size={"large"}/>}

                    {getReview?.data?.data?.map((item: any) => <View className='bg-[#2C2C2C] rounded-lg overflow-hidden p-2 mt-2 mb-3'>
                        <View className='flex-row justify-between mt-2 mb-1'>
                            <View className='flex-row gap-2 items-center'>
                                <View style={{ width: scale(30), height: scale(30) }}>
                                    <Image source={{ uri: item.userInfo?.profile[0] }} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col  gap-2'>
                                    <View className='flex-row gap-2 items-center'>
                                        <Text className='text-white font-instrumentSansSemiBold'>{item?.userInfo?.userName}</Text>
                                        <View className="bg-transparent">
                                            <Rating
                                                type="custom"
                                                ratingColor="#FFBA49"
                                                ratingBackgroundColor="#333"
                                                tintColor="#1A1A1A"

                                                imageSize={24}
                                                startingValue={item.ratings}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        </View>
                                    </View>
                                    <Text className='text-[#ADAEBC] font-instrumentRegular'>{getTime(item.createdAt)}</Text>
                                </View>

                            </View>

                            <SimpleLineIcons name="options-vertical" size={24} color="white" />
                        </View>
                        <Text className='font-instrumentRegular text-[#fff] mt-2'>{item?.comments}</Text>
                        <View className='mt-2 rounded-xl overflow-hidden' style={{ width: scale(111), height: verticalScale(111) }}>

                           
                            {item.attachment.map((imageUrl: string, index: number) => (
                                <Image
                                    key={index}
                                    source={{ uri: imageUrl }}
                                    style={{ width: 100, height: 100 }}
                                />
                            ))}
                        </View>
                    </View>).sort()}


                </View>
                <TouchableOpacity className=" items-center border rounded-3xl border-[#fff] p-2 mt-3" style={{ width: "95%" }} onPress={() => setLoadMore(loadMore + 2)}>
                                    <Text className="font-instrumentSansSemiBold text-white text-xl">View All</Text>
                                </TouchableOpacity>
            </ScrollView>
            <ReviewModal visible={isModalOpen} ID={userId}
                onClose={() => setIsModalOpen(false)}
            />
        </View>
    )
}

export default Review