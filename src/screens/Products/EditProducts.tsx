import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    ActivityIndicator,
    Platform,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import {
    useGetSpecificProductBasedOnIdQuery,
    useUpdateProductMutation,
} from "src/redux/features/product/productApi";
import { useAppSelector } from "src/redux/hooks";
import { launchCameraAndHandlePermissions } from "src/components/shared/ShareCamera";

interface Measurement {
    size: string;
    chest: string;
    waist: string;
    hips: string;
    heightRange: string;
}

const EditProducts = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };
    const token = useAppSelector((state) => state.auth.token);
    // State for basic info
     const [selectedImage, setSelectedImage] = useState([]);
    const [productName, setProductName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [category, setCategory] = useState("");
    const [totalQuantity, setTotalQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [saleTag, setSaleTag] = useState(false);
    const [shippingNote, setShippingNote] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "Edit Products",
            headerTitleAlign: "start",
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "instrumentSans-Bold",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // Measurement state
    const [measurements, setMeasurements] = useState<Measurement[]>([
        { size: "s", chest: "", waist: "", hips: "", heightRange: "" },
        { size: "m", chest: "", waist: "", hips: "", heightRange: "" },
        { size: "l", chest: "", waist: "", hips: "", heightRange: "" },
    ]);

    const { data, isFetching } = useGetSpecificProductBasedOnIdQuery({ token, id });
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const openCamera = async () => {
            const asset = await launchCameraAndHandlePermissions();
            if (asset) {
                setSelectedImage((prev: any) => {
    
                    if (asset && asset.uri) {
                        return [...prev, asset];
                    }
                    return prev;
                })
            }
        };

    // Load data into state when fetched
    useEffect(() => {
        if (data?.data?.product?.[0]) {
            const product = data.data.product[0];
            setProductName(product.productName || "");
            setShortDescription(product.shortDescription || "");
            setCategory(product.category || "");
            setTotalQuantity(product.totalQuantity?.toString() || "");
            setPrice(product.price?.toString() || "");
            setDiscountPrice(product.discountPrice?.toString() || "");
            setSaleTag(Boolean(product.saleTag));
            setShippingNote(product.shippingNote || "");

            setMeasurements(
                product.measurement?.map((m: any) => ({
                    size: m.size,
                    chest: m.chest || "",
                    waist: m.waist || "",
                    hips: m.hips || "",
                    heightRange: m.heightRange || "",
                })) || []
            );
        }
    }, [data]);

    // Handle measurement changes
    const handleMeasurementChange = (index: number, key: keyof Measurement, value: string) => {
        const updated = [...measurements];
        updated[index][key] = value;
        setMeasurements(updated);
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();

            // Wrap the JSON body as a string inside 'data'
            const body = {
                productName,
                shortDescription,
                category,
                price: parseFloat(price),
                discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
                totalQuantity: parseInt(totalQuantity),
                saleTag,
                shippingNote,
                measurement: measurements
            };
            if (Array.isArray(selectedImage) && selectedImage.length > 0) {
            
                        selectedImage.forEach((img, index) => {
            
                            let fileUri = img.uri;
            
                            // FIX: Add the Android-specific URI prefixing check
                            if (Platform.OS === 'android' && fileUri && !fileUri.startsWith('file://')) {
                                fileUri = `file://${fileUri}`;
                            }
            
                            const imageFile = {
                                // Use the potentially adjusted fileUri
                                uri: fileUri,
                                name: img.fileName || `product_image_${index}.jpg`,
                                type: img.mimeType || 'image/jpeg'
                            };
            
                            formData.append("productImages", imageFile as any);
                        });
            
                    }

            formData.append("data", JSON.stringify(body));
            const res = await updateProduct({ token, id, body: formData }).unwrap();
            navigation.navigate("All Products");
        } catch (err) {
            console.error(err);
        }
    };


    if (isFetching) {
        return (
            <View className="flex-1 items-center justify-center bg-[#121212]">
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-[#121212] p-5"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <Text className="text-[#A0A0A0] font-instrumentSansSemiBold  mb-2">
                Product Images
            </Text>

            <View className=" flex-row gap-2">
                <TouchableOpacity onPress={openCamera}
                    className="bg-[#252525] p-2 rounded-xl items-center justify-center border-dashed border-white border-2"
                    style={{ width: scale(90), height: verticalScale(90) }}
                >
                    {selectedImage?<Image
                        source={{uri:selectedImage[0]?.uri}}
                        style={{ width: "100%", height: "100%" }}
                    />
                        :<Image
                        source={require("../../../assets/e-icon/cameraWhite.png")}
                        style={{ width: scale(30), height: scale(30) }}
                    />}
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2 relative">
                        {data?.data?.product[0]?.productImages?.map((img) => (
                            <View
                                key={img.id}
                                className="rounded-xl overflow-hidden bg-[#252525] items-center justify-center"
                                style={{ width: scale(90), height: verticalScale(90) }}
                            >
                                <Image
                                    source={{ uri: img }}
                                    resizeMode="contain"
                                    style={{ width: "100%", height: "100%" }}
                                />
                                <TouchableOpacity className="absolute z-10 bg-white rounded-full right-0 top-0">
                                    <AntDesign name="minus" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            {/* Basic Inputs */}
            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Product Name*</Text>
            <TextInput
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                value={productName}
                onChangeText={setProductName}
                placeholder="e.g., Embroidered Red Kurti"
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Short Description</Text>
            <TextInput
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                value={shortDescription}
                onChangeText={setShortDescription}
                placeholder="Describe fabric, fit, style..."
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Category*</Text>
            <TextInput
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                value={category}
                onChangeText={setCategory}
                placeholder="Category"
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            {/* Measurements */}
            {measurements.map((item, idx) => (
                <View key={idx} className="mt-4">
                    <Text className="text-[#fff] font-instrumentSansSemiBold">
                        Size Group for {item.size.toUpperCase()}*
                    </Text>
                    {["chest", "waist", "hips", "heightRange"].map((field) => (
                        <View key={field} className="flex-row items-center mt-2 gap-4 border rounded-xl bg-[#2C2C2C] px-1">
                            <TextInput
                                value={item[field as keyof Measurement]}
                                onChangeText={(value) => handleMeasurementChange(idx, field as keyof Measurement, value)}
                                placeholder={`Enter ${field}`}
                                placeholderTextColor="#ADAEBC"
                                style={{ color: "#ADAEBC", flex: 1, padding: 10 }}
                            />
                        </View>
                    ))}
                </View>
            ))}

            {/* Total quantity, price */}
            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Total Quantity*</Text>
            <TextInput
                value={totalQuantity}
                onChangeText={setTotalQuantity}
                keyboardType="numeric"
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                placeholder="Total Quantity"
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Price (৳)*</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                placeholder="Price"
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Discount Price (Optional)</Text>
            <TextInput
                value={discountPrice}
                onChangeText={setDiscountPrice}
                keyboardType="numeric"
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                placeholder="Discount Price"
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            {/* Sale Tag */}
            <View className="flex-row items-center justify-between mt-2 mb-2">
                <Text className="text-white font-instrumentSansSemiBold">Sale Tag</Text>
                <TouchableOpacity onPress={() => setSaleTag(!saleTag)}>
                    <MaterialCommunityIcons
                        name={saleTag ? "toggle-switch" : "toggle-switch-off"}
                        size={54}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <Text className="text-[#fff] font-instrumentSansSemiBold mt-2 mb-2">Shipping Note</Text>
            <TextInput
                value={shippingNote}
                onChangeText={setShippingNote}
                className="mt-2 mb-2 bg-[#2C2C2C] p-3 rounded-lg"
                placeholder="Shipping Note"
                placeholderTextColor="#ADAEBC"
                style={{ color: "#ADAEBC" }}
            />

            <TouchableOpacity
                className="bg-[#1D3725] mt-3 mb-2 items-center p-3 rounded-lg"
                onPress={handleEdit}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white font-instrumentSansBold">Update</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditProducts;

