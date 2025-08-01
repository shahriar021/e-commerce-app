import { View, Text, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { scale, verticalScale } from 'react-native-size-matters';

const ProductDetails = () => {

    const navigation = useNavigation()
    const { width, height } = useWindowDimensions()
    const [isHeart, setIsHeart] = useState(false)
    const [isReadMore, setIsReadMore] = useState(true)
    const [isColor, setIsColor] = useState("#787676")
    const [isClothSize] = useState(["S", "L", "X", "XL"])
    const [selectedSize, setSelectedSize] = useState(null);

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.goBack()}>
                <Feather name="arrow-left-circle" size={24} color="white" />
                <View className=''>
                    <Text className='font-instrumentSansBold text-white text-2xl'>Product Details</Text>
                </View>
            </TouchableOpacity>
        )
    });


    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}>
                <View style={{ width: width * 0.90, height: height * 0.7, borderRadius: 20, overflow: "hidden", }} className='relative items-center justify-center'>
                    <Image source={require("../../../assets/e-icon/productDetails.png")} style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 20 }} />
                    <View className='absolute flex-row justify-between  top-2 left-3 right-3 items-center '>
                        <TouchableOpacity className='bg-[#252525] p-3 rounded-full'>
                            <Ionicons name="chevron-back-sharp" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-[#252525] p-3 rounded-full' onPress={() => setIsHeart(!isHeart)}>
                            {isHeart ? <Ionicons name="heart" size={24} color="red" /> : <Ionicons name="heart" size={24} color="white" />}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='w-full  mt-4 mb-3 p-3 flex-row justify-between items-center'>
                    <View className='flex-col'><Text className='text-white font-instrumentSansBold'>Super Basic Black Tee</Text><Text className='text-white font-instrumentSansSemiBold'>$70</Text></View>
                    <View className='flex-row items-center gap-2'>
                        <TouchableOpacity className='bg-[#252525] p-1 rounded-full' >
                            <AntDesign name="minus" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className='text-white'>1</Text>
                        <TouchableOpacity className='bg-[#252525] p-1 rounded-full' >
                            <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='p-3'>
                    <Text numberOfLines={isReadMore ? 2 : undefined} className='font-instrumentRegular text-white'>
                        Its simple and elegant shape makes it perfect for those of you who like you who want minimalist clothes

                    </Text>
                    <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}><Text className='text-[#0EB1FE]'>{isReadMore ? "Read More. . ." : "Read Less. . ."}</Text></TouchableOpacity>

                </View>
                <View className='w-full p-3 '>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold mb-2'>Color</Text>
                    <View className='flex-row gap-2 mt-1 mb-1'>
                        <TouchableOpacity onPress={() => setIsColor("#787676")} className={`rounded-full ${isColor == "#787676" ? "border-white" : "border-transparent"} border-2`}>
                            <FontAwesome name="circle" size={24} color="#787676" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsColor("#433F40")} className={`rounded-full ${isColor == "#433F40" ? "border-white" : "border-transparent"} border-2`}>
                            <FontAwesome name="circle" size={24} color="#433F40" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold mt-2'>Custome Size</Text>
                    <View className="flex-row gap-2 mt-2">
                        {isClothSize.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedSize(item)}
                                className={`w-[26px] h-[26px] rounded-full items-center justify-center border-2 ${selectedSize === item ? "bg-white" : "bg-[#252525]"
                                    } ${selectedSize === item ? "border-[#252525]" : "border-transparent"}`}
                            >
                                <Text
                                    className={`text-xs font-bold ${selectedSize === item ? "text-black" : "text-white"
                                        }`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className='mt-2 flex-row justify-between mb-5'>
                        <Text className='font-instrumentSansSemiBold text-white'>Review(86)</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Review")}><Text className='font-instrumentSansSemiBold text-[#ADAEBC]'>See All</Text></TouchableOpacity>
                    </View>
                    {/* review */}
                    <View className='flex-row justify-between mt-2 mb-1'>
                        <View className='flex-row gap-2 items-center'>
                            <View style={{ width: scale(30), height: scale(30) }}>
                                <Image source={require("../../../assets/e-icon/Ellipse 1.png")} style={{ width: "100%", height: "100%" }} />
                            </View>
                            <View className='flex-col  gap-2'>
                                <View className='flex-row gap-2 items-center'>
                                    <Text className='text-white font-instrumentSansSemiBold'>Jack Robo</Text>
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
                                <Text className='text-[#ADAEBC] font-instrumentRegular'>15 min ago</Text>
                            </View>

                        </View>

                        <SimpleLineIcons name="options-vertical" size={24} color="white" />
                    </View>
                    <Text className='font-instrumentRegular text-[#fff] mt-2'>I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.</Text>
                    <View className='mt-2 rounded-xl overflow-hidden' style={{ width: scale(111), height: verticalScale(111) }}>
                        <Image source={require("../../../assets/e-icon/review1.png")} style={{ width: "100%", height: "100%" }} />
                    </View>

                    <TouchableOpacity className='bg-[#1D3725] flex-row items-center justify-center gap-2 mt-3 p-3 rounded-xl' onPress={() => navigation.navigate("Cart Page")}>
                        <Image source={require("../../../assets/e-icon/Main Icon.png")} />
                        <Text className='text-[#DCF3FF] font-instrumentSansBold'>Add to Cart | $80 $110</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    )
}

export default ProductDetails