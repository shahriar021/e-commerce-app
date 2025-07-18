import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { alterOverlay } from "src/redux/features/picker/pickerSlice";

type TProps = {
  data: any;
  required?: boolean;
  selectedState: any;
  title: string;
  setSelectedState: (item: any) => void;
  disabled?: boolean; // New prop to enable/disable the field
  showSelected: {};
};

const InputSelectPickerUser = ({
  showSelected,
  data,
  required,
  selectedState,
  setSelectedState,
  disabled = false, // Default is false (enabled)
  title,
}: TProps) => {
  const [inputBoxHeight, setInputBoxHeight] = useState<number>(0);
  const dispatch = useAppDispatch();
  const pickerId = useId(); // Generate unique ID for each picker instance

  const openPickerId = useAppSelector((state) => state.picker.openPickerId);
  const isOverlayOpen = openPickerId === pickerId;

  const handlePress = () => {
    if (disabled) return; // Prevent interaction if disabled
    if (!data || data.length === 0) {
      Alert.alert("No data to show!");
      return;
    }
    dispatch(alterOverlay(isOverlayOpen ? null : pickerId));
  };

  const handleItemPick = (item: any) => {
    if (disabled) return; // Prevent selection if disabled
    setSelectedState(item);
    dispatch(alterOverlay(null));
  };
  return (
    <View className="w-full relative">
      <Pressable onPress={handlePress} disabled={disabled}>
        {/* Disable the Pressable */}
        <View
          className=" mt-2 border px-3 border-gray-300 rounded-md mb-5 relative h-[55px] justify-center"
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setInputBoxHeight(Math.ceil(height + 7));
          }}
        >
          <Text className="font-bold text-2xl absolute left-3 -top-4 bg-white">
            {title}
          </Text>
          <Text className="text-gray-500">
            {selectedState?.name || showSelected?.name}
          </Text>
        </View>
      </Pressable>
      {isOverlayOpen && !disabled && (
        <View
          className="bg-white absolute max-h-[200px] px-2 w-full rounded-md border border-gray-300 z-10"
          style={{ top: inputBoxHeight }}
        >
          <ScrollView>
            {data?.map((item: any) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => handleItemPick(item)}
                >
                  <Text className="p-2 border-b border-gray-200 rounded-md">
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default InputSelectPickerUser;
