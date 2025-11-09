import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { demo } from './demo';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import SearchModal from './SearchModal';
import { useGetScanImageMutation } from 'src/redux/features/scan/scabApi';
import { useAppSelector } from 'src/redux/hooks';
import { Toast } from 'toastify-react-native';

const Search = () => {
    const token = useAppSelector((state) => state.auth.token)
    const [selectedImage, setSelectedImage] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [data, setData] = useState()
    const [res,setRes]=useState(null)
    const [searchImg,setSearchImg]=useState()
    const [loading,setLoading]=useState(false)
    const [postImageforScan] = useGetScanImageMutation()
    const navigation = useNavigation();
    if(res){
        Toast.success(res.message)
    }

    useEffect(() => {
        if (res?.success) {
            setIsOpenModal(true);
        }
    }, [selectedImage]);

    console.log(loading)


    useLayoutEffect(() => { 
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'Find The Style',
            headerTitleAlign: "start",
            headerTitleStyle: {
                color: "white",
                fontFamily: 'instrumentSans-Bold',
                fontSize: 20
            }
        })
    }, [navigation])

    const openCamera = async () => {
        setLoading(true)
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets);
        }

        if (selectedImage) {
            const formData = new FormData()
            const imageFile = {
                uri: selectedImage[0].uri,
                name: selectedImage[0].fileName,
                type: selectedImage[0].mimeType
            }
            formData.append("scan", imageFile)
            try {
                console.log("result")
                setLoading(false)
                const res = await postImageforScan({ token, body: formData }).unwrap()
                console.log(res)
                setRes(res)
                setData(res)
            } catch (err) {
                setLoading(false)
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
    };

    const openImageLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };



    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", padding: 12, backgroundColor: '#121212' }}>
            <Text className='text-white mt-2 mb-3 font-instrumentRegular' >
                Upload a photo and we’ll find the exact match
            </Text>

            <View
                style={{ width: scale(308), height: verticalScale(294) }}
                className='bg-[#2C2C2C] rounded-xl relative overflow-hidden'
            >
                {/* Top-left corner */}
                <View className='absolute top-0 left-0 w-7 h-0.5 bg-white rounded-full  border-white border-4 z-10' />
                <View className='absolute top-0 left-0 w-2 h-9 bg-white rounded-full' />

                {/* Top-right corner */}
                <View className='absolute top-0 right-0 w-7 h-0.5 bg-white rounded-full border-white border-4' />
                <View className='absolute top-0 right-0 w-2 h-9 bg-white rounded-full' />

                {/* Bottom-left corner */}
                <View className='absolute bottom-0 left-0 w-7 h-0.5 bg-white rounded-full border-white border-4' />
                <View className='absolute bottom-0 left-0 w-2 h-9 bg-white rounded-full' />

                {/* Bottom-right corner */}
                <View className='absolute bottom-0 right-0 w-7 h-0.5 bg-white rounded-full border-white border-4' />
                <View className='absolute bottom-0 right-0 w-2 h-9 bg-white rounded-full' />
                {/* this is the view where the camera will open */}
                {/* You can place your image/content here */}
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage[0]?.uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                )}
            </View>

            {/* click here to open camera and phoito */}
            <TouchableOpacity className='mt-3 mb-3 bg-[#252525] p-8 rounded-full' onPress={openCamera} style={{ width: scale(80), height: scale(80) }}>
                {loading?<ActivityIndicator size={"large"} color={"blue"}/>:<Image source={require("../../../assets/e-icon/Icon.png")} style={{ width: "100%", height: "100%" }} />}
            </TouchableOpacity>

            <View className='flex-1 bg-white rounded-xl' style={{ width: scale(308) }}>
                <View className='bg-black mt-2 rounded-xl flex-1 p-3' >
                    <View className='flex-row gap-2 mt-3 '>
                        <AntDesign name="caretup" size={24} color="white" />
                        <Text className='text-white font-instrumentRegular' >Upload from Album</Text>
                    </View>
                    <View className=' flex-row gap-2'>
                        <TouchableOpacity className='bg-[#252525]  p-2 rounded-xl items-center justify-center ' style={{ width: scale(90), height: verticalScale(90) }} >
                            <Entypo name="circle-with-plus" size={24} color="white" />
                        </TouchableOpacity>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View className="flex-row gap-2">
                                {demo.map((img, index) => (
                                    <View
                                        key={index}
                                        className="rounded-xl overflow-hidden"
                                        style={{ width: scale(90), height: verticalScale(90) }}
                                    >
                                        <Image
                                            source={img.url}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                    </View>
                </View>

            </View>
            <SearchModal visible={isOpenModal} onClose={() => setIsOpenModal(false)} data={data} srcImg={selectedImage[0]?.uri}/>
        </ScrollView>

    )
}

export default Search