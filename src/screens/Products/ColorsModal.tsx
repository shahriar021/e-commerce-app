import { AntDesign, FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import {
 Modal,
 StyleSheet,
 Text,
 TouchableOpacity,
 useWindowDimensions,
 View,
} from "react-native";
import { colors } from "src/constants/productColors";

const ColorsModal = ({
 visible,
 onClose,
 selectedColor,
 setSelectedColor,
}: any) => {
 const { height } = useWindowDimensions();

 const handleSaveColor = (item: any) => {
 setSelectedColor((prev: any) => {
 const exists = prev.some((c: any) => c.name === item.name);
 return exists ? prev : [...prev, item];
 });
 };

 return (
 <Modal
 visible={visible}
 onRequestClose={onClose}
 transparent
 animationType="slide"
 >
 <View className="flex-1 bg-black/50 justify-end m-4">
 <View
 style={{
 borderColor:
 selectedColor.length > 0 ? selectedColor[0]?.code : "white",
 }}
 className={`bg-white h-${
 height * 0.8
 } p-3 border-4 rounded-xl mb-4`}
 >
 <View className="flex-row justify-between items-center">
 <Text className="font-interBold text-lg">Colors</Text>
 <TouchableOpacity onPress={onClose}>
 <Fontisto name="close" size={24} color="black" />
 </TouchableOpacity>
 </View>
 <View className="flex-row flex-wrap mt-4 mb-2 gap-2 justify-center">
 {colors.map((item: any) => {
 const isSelected = selectedColor.some(
 (c: any) => c.name === item.name
 );
 return (
 <TouchableOpacity
 onPress={() => handleSaveColor(item)}
 className={`${
 isSelected
 ? "border-4 rounded-full border-violet-400 p-0.5"
 : ""
 }`}
 >
 <FontAwesome name="circle" size={34} color={item.code} />
 </TouchableOpacity>
 );
 })}
 </View>
 </View>
 </View>
 </Modal>
 );
};

export default ColorsModal;