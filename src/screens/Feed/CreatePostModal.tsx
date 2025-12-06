import { View, Text, Modal, useWindowDimensions, TouchableOpacity, ScrollView, Image, TextInput, Alert, Linking, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import CreateModalSelecPicker from 'src/components/ui/feed/CreateModalSelecPicker'
import { usePostFeedPostMutation } from 'src/redux/features/feedApi/feedApi'
import * as ImagePicker from 'expo-image-picker';
import { useAppSelector } from 'src/redux/hooks'
import { useFeatureBrandsQuery } from 'src/redux/features/brand/brandApi'
import ToastManager, { Toast } from 'toastify-react-native'

const CreatePostModal = ({ visible, onClose }: any) => {

    const { width, height } = useWindowDimensions()
    const token = useAppSelector((state) => state.auth.token);
    const [loadMore, setLoadMore] = useState(100)
    const { data } = useFeatureBrandsQuery({ token, limit: loadMore })
    const [loading,setLoading]=useState(false)
    const [postFeed] = usePostFeedPostMutation()
    const [hashtag, setHashtag] = useState<string[]>([])
    const [comment, setComments] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState("");

    const handleHashTag = (text: string) => {
        const hashTagArray = text.split(" ").filter(Boolean);
        setHashtag([...new Set(hashTagArray)]);
    }
    const handlePost = async () => {
        if(!selectedImage || !hashtag || !comment ||!selectedBrand){
            Alert.alert("Fill all the fields to post!")
            return ;
        }
        setLoading(true);
        const formData = new FormData()

        const data = {
            tags: hashtag, caption: comment, brandName: selectedBrand?.brandName, brandId: selectedBrand?._id
        }
        if (selectedImage) {
            const imageFile = {
                uri: selectedImage?.uri,
                name: selectedImage?.fileName,
                type: selectedImage?.mimeType
            }
            formData.append("attachment", imageFile)
        }
        formData.append("data", JSON.stringify(data))
        try {
            
            const res = await postFeed({ token, formData }).unwrap()
            if(res.success){
                setComments("")
                setHashtag([''])
                Toast.success('Posted')
                onClose()
            }else{
                Toast.warn('Something went wrong!!')
                onClose()
            }
        } catch (err) {
            Toast.error("Something went wrong!!")
            setLoading(false)
            // console.log(err)
        }finally{
            setLoading(false)
        }
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
                        <Text className='font-instrumentSansBold text-white text-lg'>Create Post</Text>
                        <TouchableOpacity className='bg-[#2C2C2C] p-1 rounded-full' onPress={onClose}>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 100 }}>
                        <TouchableOpacity style={{ width: scale(300), height: verticalScale(194) }} className='items-center justify-center border border-dashed border-white  rounded-xl mt-5 bg-[#2C2C2C]' onPress={openCamera}>
                            {/* <Image source={require("../../../assets/e-icon/Frame (1).png")} style={{width:scale(30),height:verticalScale(30)}}/> */}
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


                        <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 ' placeholderTextColor={"#ADAEBC"} placeholder='write a hastag (otional)' style={{ color: "#ADAEBC" }} onChangeText={handleHashTag} />

                        <TextInput className='bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 mb-2' placeholderTextColor={"#ADAEBC"} placeholder='Add comments..' style={{ color: "#ADAEBC" }} onChangeText={setComments} />

                        <Text className='font-instrumentSansSemiBold text-white w-full mt-2'>Select Brand</Text>

                        <View className='flex-row items-center mt-4 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                            <CreateModalSelecPicker data={data?.data} selectedState={selectedBrand} setSelectedState={setSelectedBrand} />
                            <AntDesign name="down" size={24} color="white" />
                        </View>

                        <TouchableOpacity className='bg-[#1D3725] w-full p-4 items-center rounded-xl mt-5 mb-4' onPress={handlePost}>
                            <Text className='text-[#CACACA] font-instrumentSansBold text-xl'>{loading?<ActivityIndicator size={"small"} color={"blue"}/>:"Post"}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default CreatePostModal