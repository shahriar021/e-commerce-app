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
  data: any[]; 
  required?: boolean;
  selectedState: any;
  setSelectedState: (item: any) => void;
  disabled?: boolean;
  displayKey: string; 
};

const CreateProductSelecPicker = ({
  data,
  selectedState,
  setSelectedState,
  disabled = false,
  displayKey // Using the generic key prop
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
    setSelectedState(item);
    dispatch(alterOverlay(null));
  };

  const getDisplayValue = (item: any) => {
    if (item && item[displayKey]) {
        return item[displayKey];
    }
    if (item?.label) {
        return item.label;
    }
    if (item?.size) {
        return item.size;
    }
    return 'Invalid Item';
  };


  return (
    <View className="flex-1 relative">
      <Pressable onPress={handlePress} disabled={disabled}>
        <View
          className=" px-3  rounded-md  relative h-[55px] justify-center"
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setInputBoxHeight(Math.ceil(height + 7));
          }}
        >
          <Text className="text-[#fff] font-helvetica">
            {selectedState ? getDisplayValue(selectedState) : "Select...."}
          </Text>
        </View>
      </Pressable>
      {isOverlayOpen && !disabled && (
        <View
          className="bg-white absolute max-h-[200px] px-2 w-full rounded-md border border-gray-300 z-10"
          style={{ top: inputBoxHeight }}
        >
          <ScrollView>
            {data?.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  key={item?.size || item?.value || index} 
                  onPress={() => handleItemPick(item)}
                >
                  <Text className="p-2 border-b border-gray-200 rounded-md">
                    {getDisplayValue(item)}
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

export default CreateProductSelecPicker;