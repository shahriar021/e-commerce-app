import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Modal, View, Text } from "react-native";
const { height } = Dimensions.get("screen");

type TProps = {
  propYear: number;
  propMonth: number;
  visible: boolean;
  onClose: any;
  onSelect: any;
};

const InputYearPicker = ({
  visible,
  onClose,
  onSelect,
  propYear,
}: TProps) => {
  const [selectedYear, setSelectedYear] = useState(propYear || 2025);
  const [years, setYears] = useState<number[] | any>(null);

  const handleSet = () => {
    onSelect(selectedYear);
    onClose();
  };

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const generatedYears = Array.from(
      { length: 11 },
      (_, i) => currentYear - 5 + i
    );
    setYears(generatedYears);
  }, []);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
    >
      {/* modal body */}
      <View className="flex-1 justify-end bg-black-50 m-4 ">
        <View
          className={`bg-white border border-violet-100 h-${
            height * 0.4
          } p-4 rounded-3xl shadow-lg shadow-black/30`}
        >
          <View className="flex-row justify-between p-2">
            
            <TouchableOpacity onPress={onClose}>
              <Text>
                <AntDesign name="closecircle" size={24} />
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-3 bg-[#b4b8cd] rounded-3xl border border-violet-100">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {years?.map((item: any) => (
                <TouchableOpacity
                  key={item}
                  className={`flex-1 ${
                    selectedYear === item ? "bg-[#1b174d]" : "bg-white"
                  }  p-3 m-3 rounded-md border-gray-300`}
                  onPress={() => setSelectedYear(item)}
                >
                  <Text
                    className={`text-center font-medium ${
                      selectedYear == item ? "text-white" : "text-black"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          <TouchableOpacity
            onPress={handleSet}
            className="flex items-center w-full bg-[#3a4557] p-4 rounded-3xl mt-4"
          >
            <Text className="font-semibold text-white text-center text-lg">
              Set
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InputYearPicker;
