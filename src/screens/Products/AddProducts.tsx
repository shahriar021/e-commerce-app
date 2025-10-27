// import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
// import React, { useLayoutEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import { AntDesign, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// import { scale, verticalScale } from 'react-native-size-matters';
// import { demo } from '../Search/demo';
// import CreateProductSelecPicker from 'src/components/ui/products/CreateProductSelecPicker';
// import { womenSizeRangesCM } from './demo';

// const AddProducts = () => {

//     const navigation = useNavigation();
//     const [isAvailble, setIsAvailable] = useState(false)
//     const [selectChestSize,setSelectChestSize]=useState("")
//     const [selectWSize,setSelectWSize]=useState("")
//     const [selectHpSize,setSelectHpSize]=useState("")
//     const [selectHGSize,setSelectHGSize]=useState("")

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerStyle: {
//                 backgroundColor: "#121212",
//                 elevation: 0,
//                 shadowOpacity: 0,
//                 borderBottomWidth: 0
//             },
//             headerTitle: 'Add Products',
//             headerTitleAlign: 'start',
//             headerTintColor: "white",
//             headerTitleStyle: {
//                 fontFamily: "instrumentSans-Bold",
//                 fontSize: 20,
//                 color: "white",
//             },
//             headerLeft: () => (
//                 <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
//                     <Feather name="arrow-left-circle" size={24} color="white" />
//                 </TouchableOpacity>
//             )
//         })
//     }, [navigation])
//     return (
//         <ScrollView className='flex-1 bg-[#121212] p-5' contentContainerStyle={{paddingBottom:100}}>
//             <Text className='text-[#A0A0A0] font-instrumentSansSemiBold mt-2 mb-2'>Product Images</Text>

//             <View className=' flex-row gap-2'>
//                 <TouchableOpacity className='bg-[#252525]  p-2 rounded-xl items-center justify-center border-dashed border-white border-2' style={{ width: scale(90), height: verticalScale(90) }} >
//                     <Image source={require("../../../assets/e-icon/cameraWhite.png")} style={{ width: scale(30), height: scale(30) }} />
//                 </TouchableOpacity>

//                 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     <View className="flex-row gap-2">
//                         {demo.map((img) => (
//                             <View
//                                 key={img.id}
//                                 className="rounded-xl overflow-hidden bg-[#252525] items-center justify-center"
//                                 style={{ width: scale(90), height: verticalScale(90) }}
//                             >
//                                 <AntDesign name="plus" size={24} color="#9CA3AF" />

//                             </View>
//                         ))}
//                     </View>
//                 </ScrollView>

//             </View>

//             <TouchableOpacity className='bg-[#1D3725] mt-3 mb-2 items-center p-3 rounded-lg'>
//                 <Text className='text-white font-instrumentSansBold'>Upload Images</Text>
//             </TouchableOpacity>
//             <Text className='text-[#A0A0A0] font-instrumentSansSemiBold mt-2 mb-2'>Basic Information</Text>
//             {/* now all input starts */}
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Product Name*</Text>
//             <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Short Description</Text>
//             <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='Describe fabric, fit, style...' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
//              <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Category*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                  <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='category...' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Size Group for Small*</Text> 
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Bust/Chest*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"bust_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>  
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Waist*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"waist_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Hips*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"hips_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Height Range*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"height_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Size Group for Medium*</Text> 
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Bust/Chest*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"bust_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Waist*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"waist_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Hips*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"hips_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Height Range*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                  <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"height_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Size Group for Large*</Text> 
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Bust/Chest*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"bust_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Waist*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"waist_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Hips*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"hips_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Height Range*</Text>               
//             <View className='flex-row items-center mt-2 gap-4 border   rounded-xl bg-[#2C2C2C] px-1' >
//                 <CreateProductSelecPicker data={womenSizeRangesCM} setSelectedState={setSelectChestSize} selectedState={selectChestSize} displayKey={"height_range_cm"}/>
//                 <AntDesign name="down" size={24} color="white" />
//             </View>

//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Total Quantity*</Text>
//             <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Price (৳)*</Text>
//             <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />
//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Discount Price (Optional)</Text>
//             <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />

//             <View className='flex-row items-center justify-between'>
//                 <Text className='text-white font-instrumentSansSemiBold mt-2 mb-2'>Sale Tag</Text>
//                 <View className="flex-row items-center">

//                         {isAvailble ? <TouchableOpacity onPress={() => setIsAvailable(false)}><MaterialCommunityIcons name="toggle-switch" size={54} color="white" /></TouchableOpacity>
//                             : <TouchableOpacity onPress={() => setIsAvailable(true)}><MaterialCommunityIcons name="toggle-switch-off" size={54} color="white" /></TouchableOpacity>}
//                     </View>
//             </View>

//             <Text className='text-[#fff] font-instrumentSansSemiBold mt-2 mb-2'>Shipping Note</Text>
//             <TextInput className='mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg' placeholder='e.g., Embroidered Red Kurti' style={{ color: "#ADAEBC" }} placeholderTextColor={"#ADAEBC"} />

//                         <TouchableOpacity className='bg-[#1D3725] mt-3 mb-2 items-center p-3 rounded-lg'>
//                 <Text className='text-white font-instrumentSansBold'>Save & Publish</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     )
// }

// export default AddProducts



import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    AntDesign,
    Entypo,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import { demo } from "../Search/demo";
import CreateProductSelecPicker from "src/components/ui/products/CreateProductSelecPicker";
import { womenSizeRangesCM } from "./demo";
import { useUploadProductMutation } from "src/redux/features/product/productApi";
import { useAppSelector } from "src/redux/hooks";

import { launchCameraAndHandlePermissions } from "src/components/shared/ShareCamera";
import ColorsModal from "./ColorsModal";
import { Toast } from "toastify-react-native";

const AddProducts = () => {
    const navigation = useNavigation();
    const token = useAppSelector((state) => state.auth.token);
    const [selectedImage, setSelectedImage] = useState([]);
    const [isAvailble, setIsAvailable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [slectedProductName, setProductName] = useState("");
    const [shortDescription, setShorDesc] = useState("");
    const [category, setCategory] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [totalQuantity, setTotalQnt] = useState("");
    const [price, setPrice] = useState("");
    const [dusPrice, setDisPrice] = useState("");
    const [saleTag, setSaleTag] = useState("");
    const [shippingPrice, setShippingPrice] = useState("");
    const [selectChestSize, setSelectChestSize] = useState("");
    const [selectWSize, setSelectWSize] = useState("");
    const [selectHpSize, setSelectHpSize] = useState("");
    const [selectHGSize, setSelectHGSize] = useState("");

    const [selectChestSize2, setSelectChestSize2] = useState("");
    const [selectWSize2, setSelectWSize2] = useState("");
    const [selectHpSize2, setSelectHpSize2] = useState("");
    const [selectHGSize2, setSelectHGSize2] = useState("");

    const [selectChestSize3, setSelectChestSize3] = useState("");
    const [selectWSize3, setSelectWSize3] = useState("");
    const [selectHpSize3, setSelectHpSize3] = useState("");
    const [selectHGSize3, setSelectHGSize3] = useState("");

    const [postProduct] = useUploadProductMutation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "Add Products",
            headerTitleAlign: "start",
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "instrumentSans-Bold",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const openCamera = async () => {
        const asset = await launchCameraAndHandlePermissions();
        if (asset) {
            setSelectedImage((prev: any) => {

                if (asset && asset.uri) {
                    return [...prev, asset];
                }
                return prev;
            })
        }
    };

    const handleSave = async () => {
        if(!selectedImage || !slectedProductName || !shortDescription){
            Toast.warn("Fill up all the data.");
            return;
        }
        const formData = new FormData();
        const info = {
            productName: slectedProductName,
            shortDescription: shortDescription,
            colors: selectedColors.map((item: any) => item.code),
            category: category.toLowerCase(),
            measurement: [
                ...(selectChestSize && [
                    {
                        size: "s",
                        chest: selectChestSize?.bust_range_cm,
                        waist: selectWSize?.waist_range_cm,
                        hips: selectHpSize?.hips_range_cm,
                        heightRange: selectHGSize?.height_range_cm,
                    },
                ]),
                ...(selectChestSize2 && [
                    {
                        size: "m",
                        chest: selectChestSize2?.bust_range_cm,
                        waist: selectWSize2?.waist_range_cm,
                        hips: selectHpSize2.hips_range_cm,
                        heightRange: selectHGSize2?.height_range_cm,
                    },
                ]),
                ...(selectChestSize3 && [
                    {
                        size: "l",
                        chest: selectChestSize3?.bust_range_cm,
                        waist: selectWSize3?.waist_range_cm,
                        hips: selectHpSize3.hips_range_cm,
                        heightRange: selectHGSize3?.height_range_cm,
                    },
                ]),
            ],
            totalQuantity: Number(totalQuantity),
            price: Number(price),
            discountPrice: Number(dusPrice),
            saleTag: isAvailble,
            shippingNote: shippingPrice,
        };

        formData.append("data", JSON.stringify(info));

        if (Array.isArray(selectedImage) && selectedImage.length > 0) {

            selectedImage.forEach((img, index) => {

                let fileUri = img.uri;

                // FIX: Add the Android-specific URI prefixing check
                if (Platform.OS === 'android' && fileUri && !fileUri.startsWith('file://')) {
                    fileUri = `file://${fileUri}`;
                }

                const imageFile = {
                    // Use the potentially adjusted fileUri
                    uri: fileUri,
                    name: img.fileName || `product_image_${index}.jpg`,
                    type: img.mimeType || 'image/jpeg'
                };

                formData.append("productImages", imageFile as any);
            });

        }

        // console.log(info, "in info");
        try {
            const res = await postProduct({ token, formData }).unwrap();
            console.log(res, "response");
            if (res.success) {
                Toast.success(res.message)
            }
        } catch (err) {
            console.log(err);
            if (err) {
                Toast.error("Something went wrong!")
            }
        }
    };

    const handleColorModal = () => {
        setShowModal(true);
    };

    // console.log(selectedImage,"image..")

    return (
        <>
            <ScrollView
                className="flex-1 bg-[#121212] p-5"
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className="text-[#A0A0A0] font-instrumentSansSemiBold mt-2 mb-2">
                    Product Images
                </Text>

                <View className=" flex-row gap-2">
                    <TouchableOpacity
                        className="bg-[#252525] p-2 rounded-xl items-center justify-center border-dashed border-white border-2"
                        style={{ width: scale(90), height: verticalScale(90) }}
                        onPress={openCamera}
                    >
                        <Image
                            source={require("../../../assets/e-icon/cameraWhite.png")}
                            style={{ width: scale(30), height: scale(30) }}
                        />
                    </TouchableOpacity>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2">
                            {selectedImage.map((img, index) => (
                                <View
                                    key={index}
                                    className="rounded-xl overflow-hidden bg-[#252525] items-center justify-center"
                                    style={{ width: scale(90), height: verticalScale(90) }}
                                >
                                    <Image source={{ uri: img.uri }}
                                        style={{ width: "100%", height: "100%" }} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>


                <Text className="text-[#A0A0A0] font-instrumentSansSemiBold mt-2 mb-2">
                    Basic Information
                </Text>
                {/* now all input starts */}
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Product Name*
                </Text>
                <TextInput
                    className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                    placeholder="e.g., Embroidered Red Kurti"
                    style={{ color: "#ADAEBC" }}
                    placeholderTextColor={"#ADAEBC"}
                    onChangeText={setProductName}
                />
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Short Description
                </Text>
                <TextInput
                    className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                    placeholder="Describe fabric, fit, style..."
                    style={{ color: "#ADAEBC" }}
                    placeholderTextColor={"#ADAEBC"}
                    onChangeText={setShorDesc}
                />
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Category*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <TextInput
                        className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                        placeholder="category..."
                        style={{ color: "#ADAEBC" }}
                        placeholderTextColor={"#ADAEBC"}
                        onChangeText={setCategory}
                    />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Colors*
                </Text>
                <TouchableOpacity
                    className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1 "
                    onPress={handleColorModal}
                >
                    <View className="flex-1 gap-2 mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg ">
                        <Text className="text-white ">
                            {selectedColors.map((item: any) => item.name).join(", ")}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Size Group for Small*
                </Text>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Bust/Chest*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectChestSize}
                        selectedState={selectChestSize}
                        displayKey={"bust_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Waist*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectWSize}
                        selectedState={selectWSize}
                        displayKey={"waist_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Hips*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectHpSize}
                        selectedState={selectHpSize}
                        displayKey={"hips_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Height Range*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectHGSize}
                        selectedState={selectHGSize}
                        displayKey={"height_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Size Group for Medium*
                </Text>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Bust/Chest*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectChestSize2}
                        selectedState={selectChestSize2}
                        displayKey={"bust_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Waist*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectWSize2}
                        selectedState={selectWSize2}
                        displayKey={"waist_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Hips*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectHpSize2}
                        selectedState={selectHpSize2}
                        displayKey={"hips_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Height Range*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectHGSize2}
                        selectedState={selectHGSize2}
                        displayKey={"height_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Size Group for Large*
                </Text>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Bust/Chest*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectChestSize3}
                        selectedState={selectChestSize3}
                        displayKey={"bust_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Waist*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectWSize3}
                        selectedState={selectWSize3}
                        displayKey={"waist_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Hips*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectHpSize3}
                        selectedState={selectHpSize3}
                        displayKey={"hips_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Height Range*
                </Text>
                <View className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                    <CreateProductSelecPicker
                        data={womenSizeRangesCM}
                        setSelectedState={setSelectHGSize3}
                        selectedState={selectHGSize3}
                        displayKey={"height_range_cm"}
                    />
                    <AntDesign name="down" size={24} color="white" />
                </View>

                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Total Quantity*
                </Text>
                <TextInput
                    className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                    placeholder="e.g., Embroidered Red Kurti"
                    style={{ color: "#ADAEBC" }}
                    placeholderTextColor={"#ADAEBC"}
                    onChangeText={setTotalQnt}
                />
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Price (৳)*
                </Text>
                <TextInput
                    className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                    placeholder="e.g., Embroidered Red Kurti"
                    style={{ color: "#ADAEBC" }}
                    placeholderTextColor={"#ADAEBC"}
                    onChangeText={setPrice}
                />
                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Discount Price (Optional)
                </Text>
                <TextInput
                    className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                    placeholder="e.g., Embroidered Red Kurti"
                    style={{ color: "#ADAEBC" }}
                    placeholderTextColor={"#ADAEBC"}
                    onChangeText={setDisPrice}
                />

                <View className="flex-row items-center justify-between">
                    <Text className="text-white font-instrumentSansSemiBold mt-2 mb-2">
                        Sale Tag
                    </Text>
                    <View className="flex-row items-center">
                        {isAvailble ? (
                            <TouchableOpacity onPress={() => setIsAvailable(false)}>
                                <MaterialCommunityIcons
                                    name="toggle-switch"
                                    size={54}
                                    color="white"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setIsAvailable(true)}>
                                <MaterialCommunityIcons
                                    name="toggle-switch-off"
                                    size={54}
                                    color="white"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">
                    Shipping Note
                </Text>
                <TextInput
                    className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                    placeholder="e.g., Embroidered Red Kurti"
                    style={{ color: "#ADAEBC" }}
                    placeholderTextColor={"#ADAEBC"}
                    onChangeText={setShippingPrice}
                />

                <TouchableOpacity
                    className="bg-[#1D3725] mt-3 mb-2 items-center p-3 rounded-lg"
                    onPress={handleSave}
                >
                    <Text className="text-white font-instrumentSansBold">
                        Save & Publish
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <ColorsModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                selectedColor={selectedColors}
                setSelectedColor={setSelectedColors}
            />
        </>
    );
};

export default AddProducts;