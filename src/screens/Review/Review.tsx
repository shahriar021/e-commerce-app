import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { Rating } from 'react-native-ratings'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ReviewModal from './ReviewModal'

const Review = () => {
    const navigation = useNavigation()
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                <AntDesign name="arrowleft" size={24} color="white" />
                <View className=''>
                    <Text className='font-helvetica text-white text-2xl'>Reviews</Text>
                </View>
            </TouchableOpacity>
        )
    });

    const handleModal = () => {
        setIsModalOpen(true)
    }

    return (
        <View className='relative flex-1'>
            <TouchableOpacity className='absolute right-10 bottom-10 z-10 bg-[#1B5FEE] p-3 rounded-full' onPress={handleModal}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView >

                <View className='flex-1 bg-[#121212] p-4 '>
                    <View className='bg-[#2C2C2C] rounded-lg overflow-hidden p-2 mt-2 mb-3'>
                        <View className='flex-row justify-between mt-2 mb-1'>
                            <View className='flex-row gap-2 items-center'>
                                <View style={{ width: scale(30), height: scale(30) }}>
                                    <Image source={require("../../../assets/e-icon/Ellipse 1.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col  gap-2'>
                                    <View className='flex-row gap-2 items-center'>
                                        <Text className='text-white'>Jack Robo</Text>
                                        <View className="bg-transparent">
                                            <Rating
                                                type="custom"
                                                ratingColor="#FFBA49"
                                                ratingBackgroundColor="#333"
                                                tintColor="#1A1A1A"

                                                imageSize={24}
                                                startingValue={4}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        </View>
                                    </View>
                                    <Text className='text-[#ADAEBC] font-helvetica'>15 min ago</Text>
                                </View>

                            </View>

                            <SimpleLineIcons name="options-vertical" size={24} color="white" />
                        </View>
                        <Text className='font-helvetica text-[#fff] mt-2'>I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.</Text>
                        <View className='mt-2 rounded-xl overflow-hidden' style={{ width: scale(111), height: verticalScale(111) }}>
                            <Image source={require("../../../assets/e-icon/review1.png")} style={{ width: "100%", height: "100%" }} />
                        </View>
                    </View>

                    {/* two */}

                    <View className='bg-[#2C2C2C] rounded-lg overflow-hidden p-2  mt-2 mb-3'>
                        <View className='flex-row justify-between mt-2 mb-1'>
                            <View className='flex-row gap-2 items-center'>
                                <View style={{ width: scale(30), height: scale(30) }}>
                                    <Image source={require("../../../assets/e-icon/Ellipse 1.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col  gap-2'>
                                    <View className='flex-row gap-2 items-center'>
                                        <Text className='text-white'>Jack Robo</Text>
                                        <View className="bg-transparent">
                                            <Rating
                                                type="custom"
                                                ratingColor="#FFBA49"
                                                ratingBackgroundColor="#333"
                                                tintColor="#1A1A1A"

                                                imageSize={24}
                                                startingValue={4}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        </View>
                                    </View>
                                    <Text className='text-[#ADAEBC] font-helvetica'>15 min ago</Text>
                                </View>

                            </View>

                            <SimpleLineIcons name="options-vertical" size={24} color="white" />
                        </View>
                        <Text className='font-helvetica text-[#fff] mt-2'>I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.</Text>

                    </View>


                    {/*  */}

                    <View className='bg-[#2C2C2C] rounded-lg overflow-hidden p-2  mt-2 mb-3'>
                        <View className='flex-row justify-between mt-2 mb-1'>
                            <View className='flex-row gap-2 items-center'>
                                <View style={{ width: scale(30), height: scale(30) }}>
                                    <Image source={require("../../../assets/e-icon/Ellipse 1.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col  gap-2'>
                                    <View className='flex-row gap-2 items-center'>
                                        <Text className='text-white'>Jack Robo</Text>
                                        <View className="bg-transparent">
                                            <Rating
                                                type="custom"
                                                ratingColor="#FFBA49"
                                                ratingBackgroundColor="#333"
                                                tintColor="#1A1A1A"

                                                imageSize={24}
                                                startingValue={4}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        </View>
                                    </View>
                                    <Text className='text-[#ADAEBC] font-helvetica'>15 min ago</Text>
                                </View>

                            </View>

                            <SimpleLineIcons name="options-vertical" size={24} color="white" />
                        </View>
                        <Text className='font-helvetica text-[#fff] mt-2'>I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.</Text>

                    </View>
                </View>
            </ScrollView>
            <ReviewModal visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </View>
    )
}

export default Review