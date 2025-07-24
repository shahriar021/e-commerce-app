import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { demo } from '../Search/demo';
import CreateProductSelecPicker from 'src/components/ui/products/CreateProductSelecPicker';

const AddProducts = () => {

    const navigation = useNavigation();
    const [isAvailble, setIsAvailable] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'Add Products',
            headerTitleAlign: 'start',
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "prosto-One",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <ScrollView className='flex-1 bg-[#121212] p-5' contentContainerStyle={{paddingBottom:100}}>
            <Text className='text-[#A0A0A0] font-prostoOne mt-2 mb-2'>Product Images</Text>

            <View className=' flex-row gap-2'>
                <TouchableOpacity className='bg-[#252525]  p-2 rounded-xl items-center justify-center border-dashed border-white border-2' style={{ width: scale(90), height: verticalScale(90) }} >
                    <Image source={require("../../../assets/e-icon/cameraWhite.png")} style={{ width: scale(30), height: scale(30) }} />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2">
                        {demo.map((img) => (
                            <View
                                key={img.id}
                                className="rounded-xl overflow-hidden bg-[#252525] items-center justify-center"
                                style={{ width: scale(90), height: verticalScale(90) }}
                            >
                                <AntDesign name="plus" size={24} color="#9CA3AF" />

                            </View>
                        ))}
                    </View>
                </ScrollView>

            </View>

            <TouchableOpacity className='bg-[#5E6673] mt-3 mb-2 items-center p-3 rounded-lg'>
                <Text className='text-white font-prostoOne'>Upload Images</Text>
            </TouchableOpacity>
            <Text className='text-[#A0A0A0] font-prostoOne mt-2 mb-2'>Basic Information</Text>
            {/* now all input starts */}
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Product Name*</Text>
            <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Short Description</Text>
            <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='Describe fabric, fit, style...' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
             <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Category*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Size Group for Small*</Text> 
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Bust/Chest*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>  
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Waist*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Hips*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Height Range*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Size Group for Medium*</Text> 
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Bust/Chest*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Waist*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Hips*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Height Range*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Size Group for Large*</Text> 
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Bust/Chest*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Waist*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Hips*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Height Range*</Text>               
            <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
                <CreateProductSelecPicker />
                <AntDesign name="down" size={24} color="white" />
            </View>

            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Total Quantity*</Text>
            <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Price (৳)*</Text>
            <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Discount Price (Optional)</Text>
            <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
            
            <View className='flex-row items-center justify-between'>
                <Text className='text-white font-prostoOne mt-2 mb-2'>Sale Tag</Text>
                <View className="flex-row items-center">

                        {isAvailble ? <TouchableOpacity onPress={() => setIsAvailable(false)}><MaterialCommunityIcons name="toggle-switch" size={54} color="white" /></TouchableOpacity>
                            : <TouchableOpacity onPress={() => setIsAvailable(true)}><MaterialCommunityIcons name="toggle-switch-off" size={54} color="white" /></TouchableOpacity>}
                    </View>
            </View>
            
            <Text className='text-[#fff] font-prostoOne mt-2 mb-2'>Shipping Note</Text>
            <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
                        
                        <TouchableOpacity className='bg-[#5E6673] mt-3 mb-2 items-center p-3 rounded-lg'>
                <Text className='text-white font-prostoOne'>Save & Publish</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddProducts