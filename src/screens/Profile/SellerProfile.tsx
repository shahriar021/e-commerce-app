import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import { useGetBrandOrderListQuery } from "src/redux/features/orders/orderApi";
import { useAppSelector } from "src/redux/hooks";
import { colorStatus, nameStatus } from "src/constants/productInfos";
export const selectedCountry = {
  flag: require("../../../assets/e-icon/bdFlag.jpg"),
  dialCode: "+880",
};

const SellerProfile = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const token = useAppSelector((state) => state.auth.token);
  const { data: getOrdersBrand } = useGetBrandOrderListQuery({
    token,
    limit: 4,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Seller Profile",
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0, // for Android
        shadowOpacity: 0, // for iOS
        borderBottomWidth: 0, // for iOS
      },
      headerTintColor: "white",
      headerTitleAlign: "start",
      headerTitleStyle: "instrumentSans-Bold",
      headerLeft: () => (
        <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        padding: 12,
        paddingBottom: 100,
        flex: 1,
      }}
    >
      <View className="flex-1 w-full">
        {getOrdersBrand?.data?.data?.map((item: any) => (
          <View key={item} className="bg-[#212121] p-2 rounded-xl mt-1 mb-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-[#fff] font-instrumentSansSemiBold">
                #{item?.orderId?.slice(-5)}
              </Text>
              <Text
                className="text-[#FB923C] p-2 rounded-2xl font-instrumentRegular"
                style={{ backgroundColor: "rgba(249, 115, 22, 0.20)" }}
              >
                {item?.remindStatus}
              </Text>
            </View>
            <View className="flex-row b items-center gap-2 mt-2 mb-1">
              <View
                style={{ width: scale(52), height: scale(52) }}
                className="rounded-xl overflow-hidden"
              >
                <Image
                  source={{ uri: item?.productImages?.[0] }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View className="flex-row justify-between flex-1 items-center">
                <View className="flex-col">
                  <Text className="font-instrumentSansSemiBold text-white">
                    {item?.productName}
                  </Text>
                  <Text className="font-instrumentRegular text-[#9CA3AF]">
                    Qty: {item?.quntity} | Size: {item?.size}
                  </Text>
                </View>
                <View>
                  <Text className="font-instrumentSansSemiBold text-white">
                    {item?.price} $
                  </Text>
                </View>
              </View>
            </View>
            <View className="">
              <Text className="font-instrumentSansSemiBold text-[#9CA3AF]">
                Placed: {new Date(item?.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex-row items-center gap-2 mt-2 mb-1">
              <View
                className="flex-row items-center justify-center gap-2 bg-[#16A34A] p-2 rounded-md flex-1"
                style={{
                  backgroundColor:
                    colorStatus[item?.sellerStatus as keyof typeof colorStatus],
                }}
                //   onPress={() =>
                //       handleStatus(item?.cartProductId, item?.sellerStatus)
                //   }
              >
                <AntDesign name="check" size={24} color="white" />
                <Text className="text-white font-instrumentSansBold">
                  {nameStatus[item?.sellerStatus as keyof typeof nameStatus]}
                </Text>
              </View>
              {/* <TouchableOpacity className='items-center bg-[#121212] p-2 rounded-md' onPress={() => navigation.navigate("Order Details",{id:item?.cartProductId})}>
                                              <AntDesign name="eye" size={24} color="white" />
                                          </TouchableOpacity> */}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SellerProfile;