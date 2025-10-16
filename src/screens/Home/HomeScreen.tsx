import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { homeInfo, images, images2 } from "./demo";
import { LinearGradient } from "expo-linear-gradient";
import BrandWeek from "src/components/ui/homepage/BrandWeek";
import SearchModal from "./SearchModal";
import { useFeatureBrandsQuery } from "src/redux/features/brand/brandApi";
import { useAppSelector } from "src/redux/hooks";

const { width } = Dimensions.get("screen");

const HomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const scrollRef2 = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const indexRef2 = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [searchModal, setSearchModal] = useState(false)
  const [loadMore, setLoadMore] = useState(3)

  const navigation = useNavigation();
  const token = useAppSelector((state) => state.auth.token);
  const { data } = useFeatureBrandsQuery({ token, limit: loadMore })

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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (indexRef2.current + 1) % images.length;
      scrollRef2.current?.scrollTo({ x: nextIndex * width, animated: true });
      indexRef2.current = nextIndex;
      setCurrentIndex2(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    indexRef.current = index;
    setCurrentIndex(index);
  };

  const handleScroll2 = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    indexRef2.current = index;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images2.length;
      scrollRef2.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSearch = () => {
    setSearchModal(true)
  }


  return (
    <>
      <ScrollView className="bg-[#121212] flex-1" contentContainerStyle={{ paddingBottom: 200 }}>
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
          <TouchableOpacity
            className="absolute right-20 top-16"
            style={{ width: scale(30), height: verticalScale(30) }}
            onPress={handleSearch}
          >
            <FontAwesome name="search" size={scale(34)} color="white" />

          </TouchableOpacity>

          <View className="absolute bottom-0 right-0 left-0 top-0 items-center justify-center ">
            <Text className="text-white font-instrumentSansBold text-3xl max-w-[90%] text-center ">
              One Platform, A Thousand Brands
            </Text>
            <TouchableOpacity className="bg-[#1D3725] w-[90%]  rounded-3xl p-4 items-center mt-3" onPress={() => navigation.navigate("Brand")}>
              <Text className="font-instrumentSansSemiBold text-white">Explore Collections</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Feed")}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              className="w-[90%] rounded-3xl p-4 items-center mt-3 border border-[#fff]"
            >
              <Text className="font-instrumentSansSemiBold text-white">The Movement</Text>
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
          <Text className="font-instrumentSansBold text-3xl text-center text-[#fff] mt-5">Featured Brands</Text>
          <Text className="font-instrumentSansSemiBold text-lg text-center text-[#fff] mt-2 max-w-[90%]">Discover premium collections from top designers</Text>

          {data?.data?.data?.map((item: any) => <TouchableOpacity key={item.name} className="bg-[#212121] flex-row gap-3 items-center justify-between w-full mt-2 mb-2 p-2 px-3 rounded-3xl" style={{ width: "95%", height: verticalScale(120) }} onPress={() => navigation.navigate("Brand Products")}>
            <View className="rounded-3xl overflow-hidden" style={{ width: scale(80), height: verticalScale(80) }}>
              <Image source={{ uri: item.brandLogo[0] }} style={{ width: "100%", height: "100%" }} className="rounded-3xl" />
            </View>
            <View className="flex-1">
              <Text className="text-[#E5E7EB] font-instrumentSansSemiBold text-xl">{item.brandName}</Text>
              <Text className="text-[#E5E7EB] font-instrumentRegular text-base mb-2">{item.theme}</Text>
              <TouchableOpacity className="bg-[#1D3725] p-1 items-center rounded-2xl w-[80%]" >
                <Text className="font-instrumentSansSemiBold text-white">View Collection</Text>
              </TouchableOpacity>
            </View>
            <AntDesign name="right" size={24} color="#9CA3AF" />
          </TouchableOpacity>)}

          <TouchableOpacity className=" items-center border rounded-3xl border-[#fff] p-2 mt-3" style={{ width: "95%" }} onPress={() => setLoadMore(loadMore + 2)}>
            <Text className="font-instrumentSansSemiBold text-white text-xl">View All</Text>
          </TouchableOpacity>

          <BrandWeek />

        </View>


      </ScrollView>
      <SearchModal visible={searchModal} onClose={() => setSearchModal(false)} />
    </>
  );
};

export default HomeScreen;
