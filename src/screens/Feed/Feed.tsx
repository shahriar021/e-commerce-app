import { View, Text, TouchableOpacity, ScrollView, Image, ScrollViewBase, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters';
import { Rating } from 'react-native-ratings';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import CreatePostModal from './CreatePostModal';
import { useAppSelector } from 'src/redux/hooks';
import { useGetAllPostQuery, usePostCommentBasedOnIdMutation, usePostLikeMutation, usePostSaveMutation } from 'src/redux/features/feedApi/feedApi';
import { getTime } from 'src/components/shared/timeHistory';
import { Toast } from 'toastify-react-native';
const categories = [
    { label: 'Trending', value: 'ALL' },
    { label: 'New', value: 'T-Shirts' },
    { label: 'Style', value: 'Jeans' },
    { label: 'Vintage', value: 'Vintage' },
    { label: 'Formal', value: 'Formal' },
    { label: 'Casual', value: 'Casual' },
    { label: 'Party', value: 'Party' },
    { label: 'Oversized', value: 'Oversized' },
    { label: 'User Posts', value: 'User Posts' },
    { label: 'Brand Posts', value: 'Brand Posts' },
];

const Feed = () => {

    const token = useAppSelector((state) => state.auth.token)
    console.log(token)
    const navigation = useNavigation();
    const [isClothType, setIsClothType] = useState("ALL")
    const [selectedItem, setSelectedItem] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loadMore, setLoadMore] = useState(20)
    const [comment, setComments] = useState('');
    const [loading,setLoading]=useState(false);
    const userType = useAppSelector(store => store.auth.userType)
    const { data: getPostData, isLoading, error } = useGetAllPostQuery({ token, limit: loadMore })
    const [postComment] = usePostCommentBasedOnIdMutation()
    const [postLike]=usePostLikeMutation()
    const [postSave]=usePostSaveMutation()

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
                fontFamily: 'instrumentSans-Bold',
                fontSize: 20
            }
        })
    }, [navigation])

    const handleModal = () => {
        setIsModalOpen(true)
    }

    const handleComment = async (id: any) => {
        if(!comment){
            Alert.alert("put some comment..");
            return;
        }
        setLoading(true)
        const info = {
            data: {
                comments: comment
            }
        }
        try {
           
            const res = await postComment({ token, pId: id, info }).unwrap()
             setLoading(false)
            setComments('')
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleLike=async(id:string)=>{
        try{
            const res =await postLike({token,id}).unwrap()
        }catch(err){
            if(err){
                Toast.error("Something went wrong!")
            }
        }
    }

    const handleSave=async(id:string)=>{
         try{
            const res =await postSave({token,id}).unwrap()
            console.log(res)
            if(res.success){
                Toast.success("saved.")
            }
        }catch(err){
            if(err){
                Toast.error("Something went wrong!")
            }
        }
    }

    return (
        <View className='flex-1 bg-[#121212] p-5 relative'>
            <TouchableOpacity className='absolute right-10 bottom-4 z-10 bg-[#1D3725] p-3 rounded-full' onPress={handleModal}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            <View className="mt-1 mb-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} style={{ height: 40 }}>
                    {categories.map(item => <TouchableOpacity key={item.label}
                        className={`${selectedItem == item.label ? "bg-[#DCF3FF]" : "bg-[#1D3725]"} rounded-full items-center justify-center px-4 mr-2`}
                        onPress={() => setSelectedItem(item.label)}
                    >
                        <Text className={`font-instrumentSansSemiBold ${selectedItem == item.label ? "text-[#121212]" : "text-white"}`}>{item.label}</Text>
                    </TouchableOpacity>)}
                </ScrollView>
            </View>
            {error && <Text className='text-center m-5 text-white'>Something went wrong,Please Try again sometimes later.</Text>}
            {isLoading && <ActivityIndicator size={"large"} color={"blue"} />}

            <ScrollView showsVerticalScrollIndicator={false}>
                {getPostData?.data?.data?.map((item, index) =>
                    <View key={index}>
                        <View className='flex-row justify-between mt-4 mb-1 '>
                            <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.navigate("Other/brand profile", { upID: item.uploaderId })}>
                                <View style={{ width: scale(30), height: scale(30) }}>
                                   {item.uploaderType=="Brand" ?<Image source={{ uri: item.brandLogo[0] }} style={{ width: "100%", height: "100%" }} /> :<Image source={{ uri: item.profile[0] }} style={{ width: "100%", height: "100%" }} />}
                                </View>
                                <View className='flex-col  gap-2'>

                                    <Text className='text-white font-instrumentSansSemiBold'>{item.brandName}</Text>

                                    <Text className='text-[#ADAEBC] font-instrumentRegular'>{getTime(item.createdAt)}</Text>
                                </View>

                            </TouchableOpacity>

                            {/* <SimpleLineIcons name="options-vertical" size={24} color="white" /> */}
                            {item.uploaderType=="Brand" &&<View className='bg-[#54EF8D] p-1 items-center rounded-2xl justify-center' style={{ backgroundColor: 'rgba(78, 242, 138, 0.32)', borderColor: '#4ADE80' }}><Text className='text-[#54EF8D]'>Brand</Text></View>}
                        </View>

                        <Text className='font-instrumentSansBold text-white mt-2'>{item.caption}✨</Text>

                        <View className='flex-row gap-2 mt-3 '>
                            {item.tags.map(item => <Text className='bg-[#E5E7EB] text-white p-1 rounded-full text-center font-instrumentRegular' style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>#{item}</Text>)}
                        </View>

                        <View className='relative mt-4 rounded-xl overflow-hidden' style={{ width: scale(320), height: verticalScale(300) }}>
                            <Image source={{ uri: item.attachment[0] }} style={{ width: "100%", height: "100%" }} />
                            <View className='absolute right-3 top-2  items-center'>
                                <TouchableOpacity className=' p-4 rounded-full ' style={{ width: scale(57), height: verticalScale(57), backgroundColor: 'rgba(255, 255, 255, 0.7)' }} onPress={()=>handleSave(item._id)}>
                                    <Image source={require("../../../assets/e-icon/gb.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                                </TouchableOpacity>

                                <Image source={require("../../../assets/e-icon/Vector.png")} style={{ width: 18, height: 18 }} className='mt-10' />
                                <Image source={require("../../../assets/e-icon/Vector (1).png")} style={{ width: 18, height: 18 }} className='mt-4' />
                                <Text className='text-white font-instrumentRegular mt-2'>{item.totalComments}</Text>
                                <TouchableOpacity className={`${item.isReacted==true?"bg-[#FF4B4B]":""} mt-5 p-1 items-center rounded-xl`} onPress={()=>handleLike(item._id)}>
                                    <Ionicons name="heart" size={24} color="white" />
                                    <Text className='text-white font-instrumentRegular'>{item.totalReacts}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View className='bg-[#313030] flex-row justify-between items-center p-2 mt-4 rounded-lg'>
                            {loading && <ActivityIndicator size={"small"} color={"blue"}/>}
                            <View className='flex-row gap-2 items-center flex-1'>
                                <Image
                                    source={require("../../../assets/e-icon/Rectangle 41869.png")}
                                    style={{ width: scale(27), height: verticalScale(26) }}
                                />
                                <TextInput
                                    placeholder='Add a comment'
                                    className=' text-white flex-1 font-instrumentRegular'
                                    placeholderTextColor="white"
                                    value={comment}
                                    onChangeText={setComments}
                                />
                            </View>

                            <TouchableOpacity className='bg-emerald-800 p-2 rounded-md items-center justify-center' onPress={() => handleComment(item._id)}><Text className='text-white font-instrumentRegular font-bold '>Comment</Text></TouchableOpacity>
                        </View>
                    </View>)
                }
                
                <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden w-full' onPress={() => setLoadMore(loadMore + 2)}>
                    <Text className='text-white font-instrumentSansBold text-xl'>Load More</Text>
                </TouchableOpacity>

            </ScrollView>
            <CreatePostModal visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </View>
    )
}

export default Feed