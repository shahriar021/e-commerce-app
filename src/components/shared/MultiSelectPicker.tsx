import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { alterOverlay } from "src/redux/features/picker/pickerSlice";

type TProps = {
  data: any[];
  required?: boolean;
  selectedState: any[];
  setSelectedState: (items: any[]) => void;
  disabled?: boolean;
};

const MultiSelectPicker = ({
  data,
  required,
  selectedState,
  setSelectedState,
  disabled = false,
}: TProps) => {
  const [inputBoxHeight, setInputBoxHeight] = useState<number>(0);
  const dispatch = useAppDispatch();
  const pickerId = useId();
  const openPickerId = useAppSelector((state) => state.picker.openPickerId);
  const isOverlayOpen = openPickerId === pickerId;

  const handlePress = () => {
    if (disabled) return;
    if (!data || data.length === 0) {
      Alert.alert("No data to show!");
      return;
    }
    dispatch(alterOverlay(isOverlayOpen ? null : pickerId));
  };

  const handleItemPick = (item: any) => {
    if (disabled) return;
    const isSelected = selectedState.some(
      (selected) => selected.id === item.id
    );
    if (isSelected) {
      setSelectedState(
        selectedState.filter((selected) => selected.id !== item.id)
      );
    } else {
      setSelectedState([...selectedState, item]);
    }
  };

  return (
    <View className="w-full relative">
      <Pressable onPress={handlePress} disabled={disabled}>
        <View
          className="border px-3 border-gray-300 rounded-md mb-5 relative h-[55px] justify-center"
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setInputBoxHeight(Math.ceil(height + 7));
          }}
        >
          <Text className="text-gray-500">
            {selectedState.length > 0
              ? selectedState.map((item) => item.name).join(", ")
              : "Select"}
          </Text>
        </View>
      </Pressable>

      {isOverlayOpen && !disabled && (
        <View
          className="bg-white absolute max-h-[200px] px-2 w-full rounded-md border border-gray-300 z-10"
          style={{ top: inputBoxHeight }}
        >
          <ScrollView>
            {data?.map((item) => {
              const isSelected = selectedState.some(
                (selected) => selected.id === item.id
              );
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleItemPick(item)}
                  className={`p-2 border-b border-gray-200 rounded-md ${
                    isSelected ? "bg-cyan-500" : ""
                  }`}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default MultiSelectPicker;
