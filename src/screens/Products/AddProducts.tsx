import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    AntDesign,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import CreateProductSelecPicker from "src/components/ui/products/CreateProductSelecPicker";
import { womenSizeRangesCM } from "./demo";
import { useUploadProductMutation } from "src/redux/features/product/productApi";
import { useAppSelector } from "src/redux/hooks";
import { launchCameraAndHandlePermissions } from "src/components/shared/ShareCamera";
import ColorsModal from "./ColorsModal";
import { Toast } from "toastify-react-native";
import AddProductsUI from "src/components/ui/products/AddProductsUI";
import { handleSave } from "src/utils/addProducts/handleSave";

const AddProducts = () => {
    const navigation = useNavigation();
    const token = useAppSelector((state) => state.auth.token);
    const [selectedImage, setSelectedImage] = useState([]);
    const [isAvailble, setIsAvailable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [slectedProductName, setProductName] = useState("");
    const [shortDescription, setShorDesc] = useState("");
    const [category, setCategory] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [totalQuantity, setTotalQnt] = useState("");
    const [price, setPrice] = useState("");
    const [dusPrice, setDisPrice] = useState("");
    const [shippingPrice, setShippingPrice] = useState("");
    const [selectChestSize, setSelectChestSize] = useState("");
    const [selectWSize, setSelectWSize] = useState("");
    const [selectHpSize, setSelectHpSize] = useState("");
    const [selectHGSize, setSelectHGSize] = useState("");
    const [selectChestSize2, setSelectChestSize2] = useState("");
    const [selectWSize2, setSelectWSize2] = useState("");
    const [selectHpSize2, setSelectHpSize2] = useState("");
    const [selectHGSize2, setSelectHGSize2] = useState("");
    const [selectChestSize3, setSelectChestSize3] = useState("");
    const [selectWSize3, setSelectWSize3] = useState("");
    const [selectHpSize3, setSelectHpSize3] = useState("");
    const [selectHGSize3, setSelectHGSize3] = useState("");

    const [postProduct] = useUploadProductMutation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "Add Products",
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

    const handleColorModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <ScrollView
                className="flex-1 bg-[#121212] p-5"
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className="text-[#A0A0A0] font-instrumentSansSemiBold mt-2 mb-2">
                    Product Images
                </Text>

                <View className=" flex-row gap-2">
                    <TouchableOpacity
                        className="bg-[#252525] p-2 rounded-xl items-center justify-center border-dashed border-white border-2"
                        style={{ width: scale(90), height: verticalScale(90) }}
                        onPress={openCamera}
                    >
                        <Image
                            source={require("../../../assets/e-icon/cameraWhite.png")}
                            style={{ width: scale(30), height: scale(30) }}
                        />
                    </TouchableOpacity>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2">
                            {selectedImage.map((img, index) => (
                                <View
                                    key={index}
                                    className="rounded-xl overflow-hidden bg-[#252525] items-center justify-center"
                                    style={{ width: scale(90), height: verticalScale(90) }}
                                >
                                    <Image source={{ uri: img.uri }}
                                        style={{ width: "100%", height: "100%" }} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                {/* ---------- */}
                <AddProductsUI
                    setProductName={setProductName} setShorDesc={setShorDesc} setCategory={setCategory} handleColorModal={handleColorModal}
                    selectedColors={selectedColors} womenSizeRangesCM={womenSizeRangesCM} setSelectChestSize={setSelectChestSize}
                    selectChestSize={selectChestSize} setSelectWSize={setSelectWSize} selectWSize={selectWSize} setSelectHpSize={setSelectHpSize}
                    selectHpSize={selectHpSize} setSelectHGSize={setSelectHGSize} selectHGSize={selectHGSize} setSelectChestSize2={setSelectChestSize2}
                    selectChestSize2={selectChestSize2} setSelectWSize2={setSelectWSize2} selectWSize2={selectWSize2} setSelectHpSize2={setSelectHpSize2}
                    selectHpSize2={selectHpSize2} setSelectHGSize2={setSelectHGSize2} selectHGSize2={selectHGSize2} setShippingPrice={setShippingPrice}
                    setIsAvailable={setIsAvailable} isAvailble={isAvailble} setDisPrice={setDisPrice} setPrice={setPrice} setTotalQnt={setTotalQnt}
                    selectHGSize3={selectHGSize3} setSelectHGSize3={setSelectHGSize3} selectHpSize3={selectHpSize3} setSelectHpSize3={setSelectHpSize3}
                    selectWSize3={selectWSize3} setSelectWSize3={setSelectWSize3} selectChestSize3={selectChestSize3} setSelectChestSize3={setSelectChestSize3}
                />
                <TouchableOpacity
                    className="bg-[#1D3725] mt-3 mb-2 items-center p-3 rounded-lg"
                    onPress={() => handleSave({
                        selectedImage, slectedProductName, shortDescription, selectedColors, category, selectChestSize, selectChestSize2, selectChestSize3,
                        selectWSize, selectHpSize, selectHGSize, selectWSize2, selectHpSize2, selectHGSize2, selectWSize3, selectHpSize3, selectHGSize3, totalQuantity, price, dusPrice, isAvailble,
                        shippingPrice, postProduct, token
                    })}
                >
                    <Text className="text-white font-instrumentSansBold">
                        Save & Publish
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <ColorsModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                selectedColor={selectedColors}
                setSelectedColor={setSelectedColors}
            />
        </>
    );
};

export default AddProducts;