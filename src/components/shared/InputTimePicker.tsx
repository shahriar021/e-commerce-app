import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFormattedTime } from "src/utils/getFormattedTIme";

type TProps = {
  title: string;
  selectedTime: Date | null;
  setSelectedTime: (str: any) => void;
  required?: boolean;
};

const InputTimePicker = ({
  title,
  selectedTime,
  setSelectedTime,
  required,
}: TProps) => {
  const [showToPicker, setShowToPicker] = useState(false);

  const handleToDateChange = (event: any, selectedDate: any) => {
    setShowToPicker(false);
    if (selectedDate) setSelectedTime(selectedDate);
  };

  return (
    <View className="w-full p-4 border border-gray-300 rounded-lg relative mb-5 h-[55px] justify-center">
      <View className="absolute -top-3 left-2 text-center bg-white px-2 flex-row items-center">
        <Text className="text-sm text-gray-500">
          {title} {""}
        </Text>
        {required && <Text className="text-red-500">*</Text>}
      </View>
      <TouchableOpacity onPress={() => setShowToPicker(true)}>
        <Text className="text-gray-500">
          {selectedTime ? getFormattedTime(selectedTime) : "Select"}
        </Text>
      </TouchableOpacity>
      {showToPicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={handleToDateChange}
        />
      )}
    </View>
  );
};

export default InputTimePicker;
