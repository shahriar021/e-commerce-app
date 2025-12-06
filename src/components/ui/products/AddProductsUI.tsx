import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CreateProductSelecPicker from './CreateProductSelecPicker'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

const AddProductsUI = ({setProductName,setShorDesc,setCategory,handleColorModal,selectedColors,womenSizeRangesCM,setSelectChestSize,selectChestSize,
    setSelectWSize,selectWSize,setSelectHpSize,selectHpSize,setSelectHGSize,selectHGSize,setSelectChestSize2,selectChestSize2,setSelectWSize2,
    selectWSize2,setSelectHpSize2,selectHpSize2,setSelectHGSize2,selectHGSize2,setShippingPrice,setIsAvailable,isAvailble,setDisPrice,setPrice,
    setTotalQnt,selectHGSize3,setSelectHGSize3,selectHpSize3,setSelectHpSize3,selectWSize3,setSelectWSize3,selectChestSize3,setSelectChestSize3}:any) => {
    return (
        <View>
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
                Short Description*
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
        </View>
    )
}

export default AddProductsUI

