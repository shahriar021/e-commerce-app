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
  title: string;
  required?: boolean;
  selectedState: any;
  setSelectedState: (item: any) => void;
};

const InputSelectPickerReverse = ({
  data,
  title,
  required,
  selectedState,
  setSelectedState,
}: TProps) => {
  const [inputBoxHeight, setInputBoxHeight] = useState<number>(0);
  const dispatch = useAppDispatch();
  const pickerId = useId(); // Generate unique ID for each picker instance

  const openPickerId = useAppSelector((state) => state.picker.openPickerId);
  const isOverlayOpen = openPickerId === pickerId;

  const handlePress = () => {
    if (!data || data.length === 0) {
      Alert.alert("No data to show!");
      return;
    }
    dispatch(alterOverlay(isOverlayOpen ? null : pickerId));
  };

  const handleItemPick = (item: any) => {
    setSelectedState(item);
    dispatch(alterOverlay(null));
  };

  return (
    <View className="w-full relative">
      <Pressable onPress={handlePress}>
        <View
          className="border px-3 border-gray-300 rounded-md mb-5 relative h-[55px] justify-center"
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setInputBoxHeight(Math.ceil(height));
          }}
        >
          <View className="absolute -top-3 left-2 text-center bg-white px-2 flex-row items-center">
            <Text className="text-sm text-gray-500">
              {title} {""}
            </Text>
            {required && <Text className="text-red-500">*</Text>}
          </View>
          <Text className="text-gray-500">
            {selectedState?.name || "Select"}
          </Text>
        </View>
      </Pressable>

      {isOverlayOpen && (
        <View
          className="bg-white absolute max-h-[200px] px-2 w-full rounded-md border border-gray-300 z-10"
          style={{ bottom: inputBoxHeight + 28 }}
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

export default InputSelectPickerReverse;
