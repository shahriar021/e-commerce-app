import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { homeInfo } from "./demo";

const { width } = Dimensions.get("screen");

const images = [
  require("../../../assets/e-icon/homeSwipe.png"),
  require("../../../assets/e-icon/homeSwipe.png"),
  require("../../../assets/e-icon/homeSwipe.png"),
];

const HomeScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
      },
    });
  }, [navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (indexRef.current + 1) % images.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      indexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    indexRef.current = index;
    setCurrentIndex(index);
  };

  return (
    <ScrollView className="bg-[#121212] flex-1">
      {/* Image Slider Wrapper */}
      <View style={{ position: "relative" }} >
        {/* Image ScrollView */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="bg-red-300"
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{ width, height: verticalScale(550) }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View
          className="absolute right-5 top-16"
          style={{ width: scale(30), height: verticalScale(30) }}
        >
          <Image
            source={require("../../../assets/e-icon/Frame.png")}
            style={{ width: "100%", height: "100%" }}
          />
          <View
            className="absolute bg-[#0CB24C] rounded-full items-center justify-center"
            style={{
              top: -2,
              right: -3,
              width: 15,
              height: 15,
            }}
          >
            <Text className="text-white text-[10px] font-bold">3</Text>
          </View>
        </View>

        <View className="absolute bottom-0 right-0 left-0 top-0 items-center justify-center ">
          <Text className="text-white font-playFairDisplay text-3xl max-w-[90%] text-center">
            One Platform, A Thousand Brands
          </Text>
          <TouchableOpacity className="bg-[#fff] w-[90%]  rounded-3xl p-4 items-center mt-3">
            <Text className="font-playFairDisplay text-[#111827]">Explore Collections</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            className="w-[90%] rounded-3xl p-4 items-center mt-3 border border-[#fff]"
          >
            <Text className="font-playFairDisplay text-white">Explore Collections</Text>
          </TouchableOpacity>

        </View>

        {/* Dot Indicator - Absolute over image */}
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor:
                  index === currentIndex ? "#FFFFFF" : "#888888",
              }}
            />
          ))}
        </View>
      </View>

      <View className=" items-center p-3 ">
        <Text className="font-prostoOne text-3xl text-center text-[#fff] mt-5">Featured Brands</Text>
        <Text className="font-prostoOne text-lg text-center text-[#fff] mt-2 max-w-[90%]">Discover premium collections from top designers</Text>

        {homeInfo?.map(item => <View key={item.name} className="bg-[#212121] flex-row gap-3 items-center justify-between w-full mt-2 mb-2 p-2 px-3 rounded-3xl" style={{ width: "95%", height: verticalScale(120) }}>
          <View className="rounded-3xl overflow-hidden" style={{ width: scale(80), height: verticalScale(80) }}>
            <Image source={item.image} style={{ width: "100%", height: "100%" }} className="rounded-3xl" />
          </View>
          <View className="flex-1">
            <Text className="text-[#E5E7EB] font-prostoOne text-xl">{item.name}</Text>
            <Text className="text-[#E5E7EB] font-prostoOne text-base mb-2">{item.info}</Text>
            <TouchableOpacity className="bg-[#DCF3FF] p-1 items-center rounded-2xl w-[80%]">
              <Text className="font-playFairDisplay">View Collection</Text>
            </TouchableOpacity>
          </View>
          <AntDesign name="right" size={24} color="#9CA3AF" />
        </View>)}

        <TouchableOpacity className=" items-center border rounded-3xl border-[#fff] p-2 mt-3" style={{ width: "95%" }}>
          <Text className="font-prostoOne text-white text-xl">View All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
