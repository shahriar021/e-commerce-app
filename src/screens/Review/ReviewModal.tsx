import { View, Text, Modal, useWindowDimensions, TouchableOpacity, ScrollView, Image, TextInput, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import { Rating } from 'react-native-ratings'
import { usePostReviewBasedOnIdMutation } from 'src/redux/features/review/reviewApi'
import { useAppSelector } from 'src/redux/hooks'
import * as ImagePicker from 'expo-image-picker';

const ReviewModal = ({ visible, onClose, ID }: any) => {
    const token = useAppSelector((state) => state.auth.token)
    const { width, height } = useWindowDimensions()
    const [postReview] = usePostReviewBasedOnIdMutation()
    const [comments, setComments] = useState('')
    const [rating, setRatings] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePost = async () => {
        const formData = new FormData()
        const data = {
            ratings: rating,
            comments: comments
        }

        if (selectedImage) {
            const imageFile = {
                uri: selectedImage.uri,
                name: selectedImage.fileName,
                type: selectedImage.mimeType
            }
            formData.append("attachment", imageFile)
        }
        formData.append("data", JSON.stringify(data))
        try {
            const res = await postReview({ token, id: ID, formData }).unwrap()
        } catch (err) {
            console.log(err)
        }

    }

    const ratingCompleted = (number: number) => {
        setRatings(number)
    }

    const openCamera = async () => {
        // 1. Check current status, which gives us both status and canAskAgain
        const permissionResult = await ImagePicker.getCameraPermissionsAsync();
        let status = permissionResult.status;
        let canAskAgain = permissionResult.canAskAgain;

        // 2. Request if not granted AND we can still ask
        if (status !== 'granted' && canAskAgain) {
            const requestResult = await ImagePicker.requestCameraPermissionsAsync();
            status = requestResult.status;
            canAskAgain = requestResult.canAskAgain;
        }

        // 3. Final Check: Handle Denied and Permanently Denied
        if (status !== 'granted') {
            if (!canAskAgain) {
                // Permission is permanently denied: Direct user to Settings
                Alert.alert(
                    "Camera Permission Required",
                    "It looks like you permanently denied camera access. Please go to your device settings to enable the camera for this app.",
                    [
                        { text: "Cancel", style: "cancel" },
                        // Use Linking to open the app settings page
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
            } else {
                // Permission denied but can be asked again (less common, usually caught in step 2)
                alert("Permission to access camera is required!");
            }
            return; // Exit the function if permission is not granted
        }

        // 4. Launch camera only if permission is granted
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0]);
        }
    };

    return (
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View className='justify-end flex-1 bg-black-50 '>
                <View className='bg-black rounded-t-[32] overflow-hidden ' style={{ height: height * 0.6 }}>
                    <View className='mt-5 p-3 flex-row justify-between items-center mx-2'>
                        <Text className='font-instrumentSansBold text-white text-lg'>Write a Review</Text>
                        <TouchableOpacity className='bg-[#2C2C2C] p-1 rounded-full' onPress={onClose}>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 100 }}>
                        <View className="w-full p-2 bg-black">
                            <Rating
                                type="custom"
                                ratingColor="#FFBA49"
                                ratingBackgroundColor="#333"
                                tintColor="black"

                                imageSize={scale(50)}
                                startingValue={0}
                                style={{ backgroundColor: 'transparent' }}
                                onFinishRating={ratingCompleted}
                            />
                        </View>
                        <TouchableOpacity style={{ width: scale(300), height: verticalScale(194) }} className='items-center justify-center border border-dashed border-white  rounded-xl mt-5 bg-[#2C2C2C]' onPress={openCamera}>
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage.uri }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            ) : (
                                <>
                                    <Image
                                        // 🏆 FIX: Only one closing brace after the require() call
                                        source={require("../../../assets/e-icon/Frame (1).png")}
                                        style={{ width: scale(30), height: verticalScale(30) }}
                                    />
                                    <Text className='mt-2 text-white' style={{ fontFamily: 'prosto-One' }}>Tap to upload image or video (15-60s)</Text>
                                </>
                            )}

                        </TouchableOpacity>


                        <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 ' placeholderTextColor={"#ADAEBC"} placeholder='Amazing quality and style! The fabric feels premium andthe fit is perfect. Definitely worth the price...' style={{ color: "#ADAEBC" }} multiline onChangeText={setComments} />

                        <TouchableOpacity className='bg-[#1D3725] w-full p-4 items-center rounded-xl mt-5 mb-4' onPress={handlePost}>
                            <Text className='text-[#CACACA] font-instrumentSansBold text-xl'>Post</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default ReviewModal