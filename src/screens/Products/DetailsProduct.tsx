import { View, Text, ScrollView, TouchableOpacity, Image, useWindowDimensions, Animated, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { scale, verticalScale } from 'react-native-size-matters';
import { useGetSpecificProductBasedOnIdQuery } from 'src/redux/features/product/productApi';
import { useAppSelector } from 'src/redux/hooks';

const DetailsProduct = () => {

    const navigation = useNavigation()
    const { width, height } = useWindowDimensions()
    const [isHeart, setIsHeart] = useState(false)
    const [isReadMore, setIsReadMore] = useState(true)
    const [isColor, setIsColor] = useState("#787676")
    const [isClothSize] = useState(["S", "L", "X", "XL"])
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const opacity = new Animated.Value(1);
    const token=useAppSelector((state)=>state.auth.token)
    const route=useRoute()
    const {id}=route.params
    
    const { data } = useGetSpecificProductBasedOnIdQuery({ token, id: id })


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
                <AntDesign name="arrowleft" size={24} color="white" />
                <View className=''>
                    <Text className='font-instrumentSansBold text-white text-2xl'>Product Details</Text>
                </View>
            </TouchableOpacity>
        )
    });

    const handleDelete = () => {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Yes, Delete",
                        style: "destructive",
                        onPress: () => {
                            // Your actual delete logic here
                            setDeleted(true);
                        }
                    }
                ]
            );
    };


    return (
        <View className='flex-1 bg-[#121212] p-3'>
            <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}>
                <View style={{ width: width * 0.90, height: height * 0.7, borderRadius: 20, overflow: "hidden", }} className='relative items-center justify-center'>
                    <Image source={{uri:data?.data?.product[0]?.productImages[0]}} style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 20 }} />
                    <View className='absolute flex-row justify-between  top-2 left-3 right-3 items-center '>
                        <TouchableOpacity className='bg-[#252525] p-3 rounded-full'>
                            <Ionicons name="chevron-back-sharp" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className='text-[#86EFAC] p-2 rounded-2xl bg-[#14532D]' >{data?.data?.product[0]?.inStock?"In Stock":""}</Text>
                    </View>
                </View>
                <View className='w-full  mt-4 mb-3 p-3 flex-row justify-between items-center'>
                    <View className='flex-col'><Text className='text-white font-instrumentSansSemiBold'>{data?.data?.product[0]?.productName}</Text><Text className='text-white font-helvetica'>${data?.data?.product[0]?.price}</Text></View>
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

                <View className='w-full p-3'>
                    <Text numberOfLines={isReadMore ? 2 : undefined} className='font-instrumentRegular text-white'>
                        {data?.data?.product[0]?.shortDescription}

                    </Text>
                    <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}><Text className='text-[#0EB1FE]'>{isReadMore ? "Read More. . ." : "Read Less. . ."}</Text></TouchableOpacity>

                </View>
                <View className='w-full p-3 '>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold mb-2'>Color</Text>
                    <View className='flex-row gap-2 mt-1 mb-1'>
                        {data?.data?.product[0]?.colors.map((item:any)=><TouchableOpacity onPress={() => setIsColor(item)} className={`rounded-full ${isColor == item ? "border-white" : "border-transparent"} border-2`}>
                            <FontAwesome name="circle" size={24} color={item} />
                        </TouchableOpacity>)}
                        
                    </View>
                    <Text className='text-[#ADAEBC] font-instrumentSansSemiBold mt-2'>Custome Size</Text>
                    <View className="flex-row gap-2 mt-2">
                        {data?.data?.product[0]?.measurement.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedSize(item.size)}
                                className={`w-[26px] h-[26px] rounded-full items-center justify-center border-2 ${selectedSize === item.size ? "bg-white" : "bg-[#252525]"
                                    } ${selectedSize === item.size ? "border-[#252525]" : "border-transparent"}`}
                            >
                                <Text
                                    className={`text-xs font-bold ${selectedSize === item ? "text-black" : "text-white"
                                        }`}
                                >
                                    {item.size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                    <View className='flex-row justify-start gap-2 w-full mt-4'>
                        <TouchableOpacity className='bg-[#60A5FA] p-2 rounded-lg flex-1 items-center justify-center' onPress={() => navigation.navigate("Edit Products")}>
                            <Text className='text-white font-instrumentSansSemiBold'>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleDelete}
                            style={{
                                backgroundColor: deleted ? "#22c55e" : "#EF4444",
                                padding: 12,
                                borderRadius: 8,
                                alignItems: "center",
                            }}
                            className='flex-1'
                        >
                            <Animated.Text
                                style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "600",
                                    opacity,
                                }}
                            >
                                {deleted ? "Deleted" : "Delete"}
                            </Animated.Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        </View>

    )
}

export default DetailsProduct