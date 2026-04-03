import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import SearchModal from "./SearchModal";
import { useGetScanImageMutation } from "src/redux/features/scan/scabApi";
import { useAppSelector } from "src/redux/hooks";
import { Toast } from "toastify-react-native";
import { ImageObject, ProductsResponse } from "src/types/search";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { demo } from "./demo";

const Search = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [selectedImage, setSelectedImage] = useState<ImageObject[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState();
  const [res, setRes] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const camLoading = useAppSelector((state)=>state.auth.loading)
  console.log(camLoading, "camLoading");

  const [postImageforScan] = useGetScanImageMutation();

  // ✅ Handle image returned from Vision Camera
  useEffect(() => {
    if (route.params?.capturedImage) {
      const uri = route.params.capturedImage;
      const assets = [{ uri, fileName: "scan.jpg", mimeType: "image/jpeg" }];
      setSelectedImage(assets);
      handleScan(assets);

      // ✅ Clear the param so it doesn't re-run
      navigation.setParams({ capturedImage: undefined });
    }
  }, [route.params?.capturedImage]);

  useEffect(() => {
    if (res?.success) {
      Toast.success(res.message);
      setIsOpenModal(true);
    }
  }, [res]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#121212" },
      headerTitle: "Search",
      headerTitleStyle: { color: "white", fontSize: 20 },
    });
  }, []);

  const handleScan = async (assets: any) => {
    const formData = new FormData();
    setLoading(true)
    // Create the file object correctly
    const fileToUpload = {
      uri: assets[0].uri,
      type: "image/jpeg",
      name: "upload.jpg",
    };

    // @ts-ignore - FormData in RN is different from Web
    formData.append("scan", fileToUpload);

    try {
      const response = await postImageforScan({ token, formData }).unwrap();
      console.log(response);
      setRes(response);
      setData(response);
      // ...
    } catch (err) {
      console.error("API Error:", err); // CHECK THIS IN YOUR TERMINAL
    }finally{
      setLoading(false)
    }
  };

  // 🔥 Vision Camera navigation
  const openCamera = () => {
    navigation.navigate("CameraScreen",);
  };

  // ✅ Keep ImagePicker ONLY for gallery
  const openImageLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.2,
    });

    if (!result.canceled && result.assets) {
      const assets = result.assets as ImageObject[];

      setSelectedImage(assets);

      setTimeout(() => {
        handleScan(assets);
      }, 500);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        padding: 12,
        backgroundColor: "#121212",
        minHeight: "100%",
      }}
    >
      <Text style={{ color: "white", marginBottom: 10 }}>Upload a photo and we’ll find the exact match</Text>
      <View style={{ width: scale(308), height: verticalScale(294) }} className="bg-[#2C2C2C] rounded-xl relative overflow-hidden">
        <View className="absolute top-0 left-0 w-7 h-0.5 bg-white rounded-full border-white border-4 z-10" />
        <View className="absolute top-0 left-0 w-2 h-9 bg-white rounded-full" />

        <View className="absolute top-0 right-0 w-7 h-0.5 bg-white rounded-full border-white border-4" />
        <View className="absolute top-0 right-0 w-2 h-9 bg-white rounded-full" />

        <View className="absolute bottom-0 left-0 w-7 h-0.5 bg-white rounded-full border-white border-4" />
        <View className="absolute bottom-0 left-0 w-2 h-9 bg-white rounded-full" />

        <View className="absolute bottom-0 right-0 w-7 h-0.5 bg-white rounded-full border-white border-4" />
        <View className="absolute bottom-0 right-0 w-2 h-9 bg-white rounded-full" />

        {selectedImage && <Image source={{ uri: selectedImage[0]?.uri }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}
      </View>
      
      <TouchableOpacity
        className="mt-3 mb-3 bg-[#252525] p-8 rounded-full"
        onPress={openCamera}
        style={{ width: scale(80), height: scale(80) }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"blue"} />
        ) : (
          <Image source={require("../../../assets/e-icon/Icon.png")} style={{ width: "100%", height: "100%" }} />
        )}
       
      </TouchableOpacity>
      <View className="flex-1 bg-white rounded-xl mt-3" style={{ width: scale(308) }}>
        <View className="bg-black mt-2 rounded-xl flex-1 p-3">
          <View className="flex-row gap-2 mt-3 ">
            <AntDesign name="caretup" size={24} color="white" />
            <Text className="text-white font-instrumentRegular">Upload from Album</Text>
          </View>
          <View className=" flex-row gap-2">
            <TouchableOpacity
              className="bg-[#252525]  p-2 rounded-xl items-center justify-center "
              style={{ width: scale(90), height: verticalScale(90) }}
              onPress={openImageLibrary}
            >
              <Entypo name="circle-with-plus" size={24} color="white" />
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {demo.map((img, index) => (
                  <View key={index} className="rounded-xl overflow-hidden" style={{ width: scale(90), height: verticalScale(90) }}>
                    <Image source={img.url} style={{ width: "100%", height: "100%" }} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <SearchModal visible={isOpenModal} onClose={() => setIsOpenModal(false)} data={data} srcImg={selectedImage[0]?.uri} />
    </ScrollView>
  );
};

export default Search;
