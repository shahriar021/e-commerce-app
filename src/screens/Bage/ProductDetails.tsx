import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    useWindowDimensions,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    AntDesign,
    Feather,
    FontAwesome,
    Ionicons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";
import { scale, verticalScale } from "react-native-size-matters";
import { useAppSelector } from "src/redux/hooks";
import { useGetSpecificProductBasedOnIdQuery } from "src/redux/features/product/productApi";
import { useGetALlReviewBasedOnIdQuery } from "src/redux/features/review/reviewApi";
import { getTime } from "src/components/shared/timeHistory";
import { usePostAddToCartMutation } from "src/redux/features/cart/cartApi";
import { usePostFavProductMutation } from "src/redux/features/profile/favourite/favouriteApi";

const ProductDetails = () => {
    const route = useRoute();
    const { ID } = route.params;
    const navigation = useNavigation();
    const token = useAppSelector((state) => state.auth.token);
    const { width, height } = useWindowDimensions();
    const [isHeart, setIsHeart] = useState(false);
    const [isReadMore, setIsReadMore] = useState(true);
    const [isColor, setIsColor] = useState();
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuanity] = useState(1);
    const [limit] = useState(2);

    const { data } = useGetSpecificProductBasedOnIdQuery({ token, id: ID });
    const { data: getReview } = useGetALlReviewBasedOnIdQuery({
        token,
        id: ID,
        limit: limit,
    });
    const [postCart] = usePostAddToCartMutation();
    const [postFavourite] = usePostFavProductMutation();
    console.log(ID,"--=-=")
    console.log(data?.data?.product,"k--")

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity
                className="flex-row gap-2 items-center"
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left-circle" size={24} color="white" />
                <View className="">
                    <Text className="font-instrumentSansBold text-white text-2xl">
                        Product Details
                    </Text>
                </View>
            </TouchableOpacity>
        ),
    });

    const handleQuantity = (type: string) => {
        if (type == "add") {
            setQuanity((prev) => prev + 1);
        } else {
            if (quantity > 1) {
                setQuanity((prev) => prev - 1);
            }
        }
    };

    const handleAddToCart = async () => {
        if (!isColor || !selectedSize || !quantity) {
            Alert.alert("Please select quantity,size and color properly.");
            return;
        }
        const body = {
            data: {
                productId: ID,
                color: isColor,
                size: selectedSize.size,
                quantity: quantity,
            },
        };
        console.log(body,"body..")
        try {
            const res = await postCart({ token, data: body }).unwrap();
            console.log(res,"response")
            if (res.success == true) {
                Alert.alert(res.message);
                navigation.navigate("Cart Page" as never, { id: res.data.cart.id });
                // console.log(res.data.cart.id);
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Something went wrong!");
        }
    };

    const handleFav = async (id: string) => {
        // console.log(id, "favourite...");
        try {
            const res = await postFavourite({ token, id }).unwrap();
            // console.log(res?.data?.success);
            setIsHeart(res?.success);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View className="flex-1 bg-[#121212] p-3">
            <ScrollView
                contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
            >
                <View
                    style={{
                        width: width * 0.9,
                        height: height * 0.7,
                        borderRadius: 20,
                        overflow: "hidden",
                    }}
                    className="relative items-center justify-center"
                >
                    <Image
                        source={{ uri: data?.data?.product[0]?.productImages[0] }}
                        style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            borderRadius: 20,
                        }}
                    />
                    <View className="absolute flex-row justify-between top-2 left-3 right-3 items-center ">
                        <TouchableOpacity className="bg-[#252525] p-3 rounded-full">
                            <Ionicons name="chevron-back-sharp" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-[#252525] p-3 rounded-full"
                            onPress={() => handleFav(data?.data?.product[0]?._id)}
                        >
                            {isHeart ? (
                                <Ionicons name="heart" size={24} color="red" />
                            ) : (
                                <Ionicons name="heart" size={24} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="w-full mt-4 mb-3 p-3 flex-row justify-between items-center">
                    <View className="flex-col">
                        <Text className="text-white font-instrumentSansBold">
                            {data?.data?.product[0]?.productName}
                        </Text>
                        <Text className="text-white font-instrumentSansSemiBold">
                            ${data?.data?.product[0]?.price}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                            className="bg-[#252525] p-1 rounded-full"
                            onPress={() => handleQuantity("minus")}
                        >
                            <AntDesign name="minus" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white">{quantity}</Text>
                        <TouchableOpacity
                            className="bg-[#252525] p-1 rounded-full"
                            onPress={() => handleQuantity("add")}
                        >
                            <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="p-3 w-full">
                    <Text
                        numberOfLines={isReadMore ? 2 : undefined}
                        className="font-instrumentRegular text-white"
                    >
                        {data?.data?.product[0]?.shortDescription}
                    </Text>
                    <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                        <Text className="text-[#0EB1FE]">
                            {isReadMore ? "Read More. . ." : "Read Less. . ."}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="w-full p-3 ">
                    <Text className="text-[#ADAEBC] font-instrumentSansSemiBold mb-2">
                        Color
                    </Text>
                    <View className="flex-row gap-2 mt-1 mb-1">
                        {data?.data?.product[0]?.colors.map((item: any) => (
                            <TouchableOpacity
                                onPress={() => setIsColor(item)}
                                className={`rounded-full ${isColor == item ? "border-white" : "border-transparent"
                                    } border-2`}
                            >
                                <FontAwesome name="circle" size={24} color={item} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text className="text-[#ADAEBC] font-instrumentSansSemiBold mt-2">
                        Custome Size
                    </Text>
                    <View className="flex-row gap-2 mt-2">
                        {data?.data?.product[0]?.measurement.map(
                            (item: any, index: any) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedSize(item)}
                                    className={`w-[26px] h-[26px] rounded-full items-center justify-center border-2 ${selectedSize === item ? "bg-white" : "bg-[#252525]"
                                        } ${selectedSize === item
                                            ? "border-[#252525]"
                                            : "border-transparent"
                                        }`}
                                >
                                    <Text
                                        className={`text-xs font-bold ${selectedSize === item ? "text-black" : "text-white"
                                            }`}
                                    >
                                        {item.size}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>

                    <View className="mt-2 flex-row justify-between mb-5">
                        <Text className="font-instrumentSansSemiBold text-white mt-4">
                            Review({getReview?.data?.meta?.total})
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Review" as never, { id: ID })}
                        >
                            <Text className="font-instrumentSansSemiBold text-[#ADAEBC]">
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* review */}
                    <View className="flex-row justify-between mt-2 mb-1">
                        <View className="flex-row gap-2 items-center">
                            <View style={{ width: scale(30), height: scale(30) }}>
                                <Image
                                    source={{
                                        uri: getReview?.data?.data[0]?.userInfo?.profile[0],
                                    }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </View>
                            <View className="flex-col gap-2">
                                <View className="flex-row gap-2 items-center">
                                    <Text className="text-white font-instrumentSansSemiBold">
                                        {getReview?.data?.data[0]?.userInfo?.userName}
                                    </Text>
                                    <View className="bg-transparent">
                                        <Rating
                                            type="custom"
                                            ratingColor="#FFBA49"
                                            ratingBackgroundColor="#333"
                                            tintColor="#1A1A1A"
                                            imageSize={24}
                                            startingValue={getReview?.data?.data[0]?.ratings}
                                            style={{ backgroundColor: "transparent" }}
                                        />
                                    </View>
                                </View>
                                <Text className="text-[#ADAEBC] font-instrumentRegular">
                                    {getTime(getReview?.data?.data[0]?.createdAt)}
                                </Text>
                            </View>
                        </View>

                        {/* <SimpleLineIcons name="options-vertical" size={24} color="white" /> */}
                    </View>
                    <Text className="font-instrumentRegular text-[#fff] mt-2">
                        {getReview?.data?.data[0]?.comments}
                    </Text>
                    <View
                        className="mt-2 rounded-xl overflow-hidden"
                        style={{ width: scale(111), height: verticalScale(111) }}
                    >
                        <Image
                            source={{ uri: getReview?.data?.data[0]?.attachment[0] }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>

                    <TouchableOpacity
                        className="bg-[#1D3725] flex-row items-center justify-center gap-2 mt-3 p-3 rounded-xl"
                        onPress={handleAddToCart}
                    >
                        <Image source={require("../../../assets/e-icon/Main Icon.png")} />
                        <Text className="text-[#DCF3FF] font-instrumentSansBold">
                            Add to Cart | $80 $110
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductDetails;
