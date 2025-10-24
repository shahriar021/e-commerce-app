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
import { AntDesign } from '@expo/vector-icons'; // Added AntDesign for icon if needed

type TProps = {
  data: any[]; // Array of objects
  required?: boolean;
  selectedState: any;
  setSelectedState: (item: any) => void;
  disabled?: boolean;
  // FIX: Renamed 'chest' to 'displayKey' for generic use
  displayKey: string; // The property name (e.g., 'bust_range_cm' or 'label') to display
};

const CreateProductSelecPicker = ({
  data,
  required,
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

  // Helper to safely get the value to display
  const getDisplayValue = (item: any) => {
    // 1. Try to use the dynamic displayKey (e.g., 'bust_range_cm')
    if (item && item[displayKey]) {
        return item[displayKey];
    }
    // 2. Fallback to a common property like 'label' or 'size'
    if (item?.label) {
        return item.label;
    }
    if (item?.size) {
        return item.size;
    }
    // 3. Fallback if the object is malformed
    return 'Invalid Item';
  };

  // console.log(data,"in picker."); // Keep this for debugging if necessary

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
          {/* FIX 1: Use the value derived from the dynamic displayKey */}
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
                  // FIX 2: Use a combination of 'size' or 'value' and index for a unique key
                  key={item?.size || item?.value || index} 
                  onPress={() => handleItemPick(item)}
                >
                  <Text className="p-2 border-b border-gray-200 rounded-md">
                    {/* FIX 3: Display the correct value from the dynamic displayKey */}
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