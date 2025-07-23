import { View, Text, TouchableOpacity, ScrollView, Image, ScrollViewBase, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters';
import { Rating } from 'react-native-ratings';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import CreatePostModal from './CreatePostModal';
const categories = [
    { label: 'Trending', value: 'ALL' },
    { label: 'New', value: 'T-Shirts' },
    { label: 'Style', value: 'Jeans' },
    { label: 'Vintage', value: 'Vintage' },
    { label: 'Formal', value: 'Formal' },
    { label: 'Casual', value: 'Casual' },
    { label: 'Party', value: 'Party' },
    { label: 'Oversized', value: 'Oversized' },
];

const Feed = () => {

    const navigation = useNavigation();
    const [isClothType, setIsClothType] = useState("ALL")
    const [selectedItem, setSelectedItem] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'StyleFeed',
            headerTitleAlign: "start",
            headerTitleStyle: {
                color: "white",
                fontFamily: 'Prosto One',
                fontSize: 20
            }
        })
    }, [navigation])

    const handleModal = () => {
        setIsModalOpen(true)
    }

    return (
        <View className='flex-1 bg-[#121212] p-5 relative'>
            <TouchableOpacity className='absolute right-10 bottom-4 z-10 bg-[#1B5FEE] p-3 rounded-full' onPress={handleModal}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            <View className="mt-1 mb-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} style={{ height: 40 }}>
                    {categories.map(item => <TouchableOpacity key={item.label}
                        className={`${selectedItem == item.label ? "bg-[#DCF3FF]" : "bg-[#1F2937]"} rounded-full items-center justify-center px-4 mr-2`}
                        onPress={() => setSelectedItem(item.label)}
                    >
                        <Text className={`font-prostoOne ${selectedItem == item.label ? "text-[#121212]" : "text-white"}`}>{item.label}</Text>
                    </TouchableOpacity>)}
                </ScrollView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-row justify-between mt-4 mb-1 '>
                    <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.navigate("Other/brand profile",{type:"user"})}>
                        <View style={{ width: scale(30), height: scale(30) }}>
                            <Image source={require("../../../assets/e-icon/Ellipse 1.png")} style={{ width: "100%", height: "100%" }} />
                        </View>
                        <View className='flex-col  gap-2'>

                            <Text className='text-white'>Jack Robo</Text>

                            <Text className='text-[#ADAEBC] font-prostoOne'>15 min ago</Text>
                        </View>

                    </TouchableOpacity>

                    <SimpleLineIcons name="options-vertical" size={24} color="white" />
                </View>

                <Text className='font-prostoOne text-white mt-2'>Perfect autumn vibes with this cozy yet chic look ✨</Text>

                <View className='flex-row gap-2 mt-3'>
                    <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#autum</Text>
                    <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#cozy</Text>
                    <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#zara</Text>
                </View>

                <View className='relative mt-4 rounded-xl overflow-hidden' style={{ width: scale(320), height: verticalScale(300) }}>
                    <Image source={require("../../../assets/e-icon/img (1).png")} style={{ width: "100%", height: "100%" }} />
                    <View className='absolute right-3 top-2  items-center'>
                        <View className='bg-[#212121] p-4 rounded-full ' style={{ width: scale(57), height: verticalScale(57), backgroundColor: 'rgba(33,33,33,0.10)' }}>
                            <Image source={require("../../../assets/e-icon/gb.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                        </View>

                        <Image source={require("../../../assets/e-icon/Vector.png")} style={{ width: 18, height: 18 }} className='mt-10' />
                        <Image source={require("../../../assets/e-icon/Vector (1).png")} style={{ width: 18, height: 18 }} className='mt-4' />
                        <Text className='text-white font-prostoOne mt-2'>273</Text>
                        <View className='bg-[#FF4B4B] mt-5 p-1 items-center rounded-xl'>
                            <Ionicons name="heart" size={24} color="white" />
                            <Text className='text-white'>4.3k</Text>
                        </View>
                    </View>
                </View>


                <View className='bg-[#313030] flex-row justify-between items-center p-2 mt-4 rounded-lg'>
                    <View className='flex-row gap-2 items-center flex-1'>
                        <Image
                            source={require("../../../assets/e-icon/Rectangle 41869.png")}
                            style={{ width: scale(27), height: verticalScale(26) }}
                        />
                        <TextInput
                            placeholder='Add a comment'
                            className='font-prostoOne text-white flex-1'
                            placeholderTextColor="white"
                        />
                    </View>

                    <Text className='text-white font-prostoOne ml-2'>(273 comments)</Text>
                </View>

                {/* brand */}

                <View className='flex-row justify-between mt-4 mb-1 items-center'>
                    <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.navigate("Other/brand profile",{type:"brand"})}>
                        <View style={{ width: scale(30), height: scale(30) }}>
                            <Image source={require("../../../assets/e-icon/brandLogo.png")} style={{ width: "100%", height: "100%" }} />
                        </View>
                        <View className='flex-col  gap-2'>

                            <Text className='text-white'>Brand Name</Text>

                            <Text className='text-[#ADAEBC] font-prostoOne'>15 min ago</Text>
                        </View>

                    </TouchableOpacity>


                    <View className='bg-[#54EF8D] p-1 items-center rounded-2xl' style={{ backgroundColor: 'rgba(78, 242, 138, 0.32)', borderColor: '#4ADE80' }}><Text className='text-[#54EF8D]'>Brand</Text></View>
                </View>

                <View className='flex-row  items-center justify-between w-full'>
                    <Text className='font-prostoOne text-white mt-2 flex-1'>Perfect autumn vibes with this cozy yet chic look ✨</Text>
                    <SimpleLineIcons name="options-vertical" size={24} color="white" />
                </View>

                <View className='flex-row gap-2 mt-3'>
                    <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#autum</Text>
                    <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#cozy</Text>
                    <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#zara</Text>
                </View>

                <View className='relative mt-4 rounded-xl overflow-hidden' style={{ width: scale(320), height: verticalScale(300) }}>
                    <Image source={require("../../../assets/e-icon/brand.jpg")} style={{ width: "100%", height: "100%" }} />
                    <View className='absolute right-3 top-2  items-center'>
                        <View className='bg-[#212121] p-4 rounded-full ' style={{ width: scale(57), height: verticalScale(57), backgroundColor: 'rgba(33,33,33,0.10)' }}>
                            <Image source={require("../../../assets/e-icon/gb.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                        </View>

                        <Image source={require("../../../assets/e-icon/Vector.png")} style={{ width: 18, height: 18 }} className='mt-10' />
                        <Image source={require("../../../assets/e-icon/Vector (1).png")} style={{ width: 18, height: 18 }} className='mt-4' />
                        <Text className='text-white font-prostoOne mt-2'>273</Text>
                        <View className='bg-[#FF4B4B] mt-5 p-1 items-center rounded-xl'>
                            <Ionicons name="heart" size={24} color="white" />
                            <Text className='text-white'>4.3k</Text>
                        </View>
                    </View>
                </View>


                <View className='bg-[#313030] flex-row justify-between items-center p-2 mt-4 rounded-lg'>
                    <View className='flex-row gap-2 items-center flex-1'>
                        <Image
                            source={require("../../../assets/e-icon/Rectangle 41869.png")}
                            style={{ width: scale(27), height: verticalScale(26) }}
                        />
                        <TextInput
                            placeholder='Add a comment'
                            className='font-prostoOne text-white flex-1'
                            placeholderTextColor="white"
                        />
                    </View>

                    <Text className='text-white font-prostoOne ml-2'>(273 comments)</Text>
                </View>

            </ScrollView>
            <CreatePostModal visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </View>
    )
}

export default Feed