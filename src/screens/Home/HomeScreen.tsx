import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { images, images2 } from "./demo";
import BrandWeek from "src/components/ui/homepage/BrandWeek";
import SearchModal from "./SearchModal";
import { useFeatureBrandsQuery } from "src/redux/features/brand/brandApi";
import { useAppSelector } from "src/redux/hooks";
import { useGetAddToCartQuery } from "src/redux/features/cart/cartApi";
import { RootStackParamList } from "src/types/screens";
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get("screen");

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Brand Details">>();
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchModal, setSearchModal] = useState(false)
  const [loadMore, setLoadMore] = useState(5)
  const token = useAppSelector((state) => state.auth.token);
  const { data } = useFeatureBrandsQuery({ token, limit: loadMore })
  const { data: getCart } = useGetAddToCartQuery(token);

  console.log("yooo.")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
      },
    });
  }, [navigation]);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);


  // Auto scroll carousel 1 (ONE interval)
  useFocusEffect(
    useCallback(() => {
      // screen focused -> start interval
      const id = setInterval(() => {
        const next = (indexRef.current + 1) % images.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        setCurrentIndex(next);
      }, 3000);

      return () => {
        // screen unfocused -> clear interval
        clearInterval(id);
      };
    }, [images.length])
  );



  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  }, []);

  const handleSearch = () => {
    setSearchModal(true)
  }


  return (
    <>
      <ScrollView className="bg-[#121212] flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
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

          <TouchableOpacity
            className="absolute right-5 top-16"
            style={{ width: scale(30), height: verticalScale(30) }}
            onPress={() => navigation.navigate("Cart Page")}
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
              <Text className="text-white text-[10px] font-bold">{getCart?.data?.products?.reduce((acc: any, curr: any) => acc + 1, 0)}</Text>
            </View>
          </TouchableOpacity>
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

          {data?.data?.data?.map((item: any) => <TouchableOpacity key={item.name} className="bg-[#212121] flex-row gap-3 items-center justify-between w-full mt-2 mb-2 p-2 px-3 rounded-3xl" style={{ width: "95%", height: verticalScale(120) }} onPress={() => navigation.navigate("Brand Details", { id: item._id })}>
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
          <BrandWeek navigation={navigation} />
        </View>
      </ScrollView>
      <SearchModal visible={searchModal} onClose={() => setSearchModal(false)} />
    </>
  );
};

export default HomeScreen;
