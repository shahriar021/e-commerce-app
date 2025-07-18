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

const InputMonthYearPicker = ({
  visible,
  onClose,
  onSelect,
  propYear,
  propMonth,
}: TProps) => {
  const [selectedYear, setSelectedYear] = useState(propYear || 2025);
  const [selectedMonth, setSelectedMonth] = useState(propMonth || 2);
  const [years, setYears] = useState<number[] | any>(null);

  const months = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Feb" },
    { id: 3, name: "Mar" },
    { id: 4, name: "Apr" },
    { id: 5, name: "May" },
    { id: 6, name: "Jun" },
    { id: 7, name: "Jul" },
    { id: 8, name: "Aug" },
    { id: 9, name: "Sep" },
    { id: 10, name: "Oct" },
    { id: 11, name: "Nov" },
    { id: 12, name: "Dec" },
  ];
  const handleSet = () => {
    onSelect(selectedYear, selectedMonth);
    onClose();
  };
  const month = months.find((item) => item.id == selectedMonth);

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
            <Text className="font-bold">
              {month?.name} {selectedYear}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text>
                <AntDesign name="closecircle" size={24} />
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-3 bg-[#FFEDE6] rounded-3xl border border-violet-100">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {years?.map((item: any) => (
                <TouchableOpacity
                  key={item}
                  className={`flex-1 ${
                    selectedYear === item ? "bg-[#FE7743]" : "bg-white"
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
          <View className="mt-2 flex-row justify-center  flex-wrap bg-[#FFEDE6] rounded-3xl mb-2 border border-violet-100">
            {months.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                className={`p-4 m-4 border border-gray-300 rounded-3xl ${
                  selectedMonth === item.id ? "bg-[#FE7743]" : "bg-white"
                }`}
                onPress={() => setSelectedMonth(item.id)}
              >
                <Text
                  className={`text-center font-medium ${
                    selectedMonth === item.id
                      ? "text-white font-bold"
                      : "text-black"
                  }`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={handleSet}
            className="flex items-center w-full bg-[#FE7743] p-4 rounded-3xl"
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

export default InputMonthYearPicker;
