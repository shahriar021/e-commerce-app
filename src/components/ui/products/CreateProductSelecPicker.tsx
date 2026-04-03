import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
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
  <View className="flex-1">
    <Pressable onPress={handlePress} disabled={disabled}>
      <View className="px-3 rounded-md h-[55px] justify-center">
        <Text className="text-[#fff]">
          {selectedState ? getDisplayValue(selectedState) : "Select...."}
        </Text>
      </View>
    </Pressable>

    {isOverlayOpen && (
      <Modal visible={true} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => dispatch(alterOverlay(null))}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
            {/* You would need to calculate the position or just show a centered picker */}
            <View className="bg-white m-10 mt-[200px] max-h-[300px] rounded-lg shadow-xl">
               <ScrollView>
                 {data?.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleItemPick(item)} className="p-4 border-b border-gray-100">
                      <Text>{getDisplayValue(item)}</Text>
                    </TouchableOpacity>
                 ))}
               </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )}
  </View>
);
};

export default CreateProductSelecPicker;