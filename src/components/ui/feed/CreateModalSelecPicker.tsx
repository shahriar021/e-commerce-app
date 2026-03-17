import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import React, { useId, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { alterOverlay } from "src/redux/features/picker/pickerSlice";

type TProps = {
  data: any;
  required?: boolean;
  selectedState: any;
  setSelectedState: (item: any) => void;
  disabled?: boolean;
};

const CreateModalSelecPicker = ({
  data,
  selectedState,
  setSelectedState,
  disabled = false,
}: TProps) => {
  const dispatch = useAppDispatch();
  const pickerId = useId();
  const openPickerId = useAppSelector((state) => state.picker.openPickerId);
  const isOverlayOpen = openPickerId === pickerId;

  const brandId = useAppSelector((state) => state.auth.id);
  const userType = useAppSelector((state) => state.auth.userType);

  const isBrand = userType === "Brand";

  // if Brand → only show their own brand, auto-select it, disable picker
  const filteredList = useMemo(() => {
    if (!data?.data) return [];
    if (isBrand) {
      return data.data.filter((item: any) => item._id === brandId);
    }
    return data.data;
  }, [data, isBrand, brandId]);

  // auto select for brand user
  React.useEffect(() => {
    if (isBrand && filteredList.length > 0 && !selectedState) {
      setSelectedState(filteredList[0]);
    }
  }, [filteredList, isBrand]);

  const handlePress = () => {
    if (disabled || isBrand) return; // brand can't open picker
    if (!filteredList || filteredList.length === 0) {
      Alert.alert("No data to show!");
      return;
    }
    dispatch(alterOverlay(isOverlayOpen ? null : pickerId));
  };

  const handleItemPick = (item: any) => {
    if (disabled || isBrand) return;
    setSelectedState(item);
    dispatch(alterOverlay(null));
  };

  return (
    <View className="flex-1">
      <Pressable onPress={handlePress} disabled={disabled || isBrand}>
        <View className="px-3 rounded-md h-[55px] justify-center">
          <Text className="text-[#fff] font-helvetica">
            {selectedState?.brandName || "Choose a brand"}
          </Text>
        </View>
      </Pressable>

      <Modal
        transparent
        visible={isOverlayOpen && !isBrand}
        animationType="slide"
        onRequestClose={() => dispatch(alterOverlay(null))}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          activeOpacity={1}
          onPress={() => dispatch(alterOverlay(null))}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: 300,
              padding: 16,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
              Choose a brand
            </Text>
            <ScrollView>
              {filteredList.map((item: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleItemPick(item)}
                  style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" }}
                >
                  <Text>{item?.brandName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CreateModalSelecPicker;