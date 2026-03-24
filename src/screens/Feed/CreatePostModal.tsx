import {
  View,
  Text,
  Modal,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {  Entypo } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import CreateModalSelecPicker from "src/components/ui/feed/CreateModalSelecPicker";
import { usePostFeedPostMutation } from "src/redux/features/feedApi/feedApi";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "src/redux/hooks";
import { useFeatureBrandsQuery } from "src/redux/features/brand/brandApi";
import { Toast } from "toastify-react-native";
import { ImageObject } from "src/types/search";
import { SelectedBrand } from "src/types/feed";
import { useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const CreatePostModal = ({ visible, onClose, onPostSuccess }: any) => {
  const { height } = useWindowDimensions();
  const token = useAppSelector((state) => state.auth.token);
  const [loadMore] = useState(100);
  const { data } = useFeatureBrandsQuery({ token, limit: loadMore });
  const [loading, setLoading] = useState(false);
  const [postFeed] = usePostFeedPostMutation();
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [comment, setComments] = useState("");
  const [selectedImage, setSelectedImage] = useState<ImageObject | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<SelectedBrand | null>(null);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const navigation = useNavigation()

  const userType = useAppSelector((state) => state.auth.userType);
  console.log(selectedImage,"0-00");

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== "granted") Alert.alert("Camera permission is required");
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleHashTag = (text: string) => {
    const hashTagArray = text.split(" ").filter(Boolean);
    setHashtag([...new Set(hashTagArray)]);
  };
  const handlePost = async () => {
    if (!selectedImage || !comment || !selectedBrand) {
      Alert.alert("Fill all the fields to post!");
      return;
    }
    setLoading(true);
    const formData = new FormData();

    const data = {
      tags: hashtag,
      caption: comment,
      brandName: selectedBrand?.brandName,
      brandId: selectedBrand?._id,
    };
    if (selectedImage) {
      const imageFile: any = {
        uri: selectedImage?.uri,
        name: selectedImage?.uri.split("/").pop() || "photo.jpg",
        type: "image/jpeg",
      };
      formData.append("attachment", imageFile);
    }
    formData.append("data", JSON.stringify(data));
    try {
      const res = await postFeed({ token, formData });
      console.log(res,"90909");
      if (res.data?.success) {
        setComments("");
        setHashtag([""]);
        Toast.success("Posted");
        onPostSuccess?.();
        onClose();
      } else {
        Toast.warn("Something went wrong campu!!");
        onClose();
      }
    } catch (err) {
      Toast.error("Something went wrong cecampu!!");
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // const openCamera = () => {
  //   setIsCameraOpen(true);
  // };
  // const takePhoto = async () => {
  //   if (!camera.current) return;
  //   try {
  //     const photo = await camera.current.takeSnapshot({ quality: 80 });
  //     const path = Platform.OS === "android" ? `file://${photo.path}` : photo.path;
  //     setSelectedImage({ uri: path });
  //     setIsCameraOpen(false); 
  //   } catch (e) {
  //     Alert.alert("Capture Error", "Try again");
  //   }
  // };

  
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View className="justify-end flex-1 bg-black-50 ">
        <View className="bg-black rounded-t-[32] overflow-hidden " style={{ height: height * 0.6 }}>
          <View className="mt-5 p-3 flex-row justify-between items-center mx-2">
            <Text className="font-instrumentSansBold text-white text-lg">Create Post</Text>
            <TouchableOpacity className="bg-[#2C2C2C] p-1 rounded-full" onPress={onClose}>
              <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 100 }}>
            {/* <TouchableOpacity
              style={{ width: scale(300), height: verticalScale(194) }}
              className="items-center justify-center border border-dashed border-white  rounded-xl mt-5 bg-[#2C2C2C]"
              onPress={openCamera}
            >
             
              {selectedImage ? (
                <Image source={{ uri: selectedImage.uri }} style={{ width: "100%", height: "100%" }} />
              ) : (
                <>
                  <Image
                    
                    source={require("../../../assets/e-icon/Frame (1).png")}
                    style={{ width: scale(30), height: verticalScale(30) }}
                  />
                  <Text className="mt-2 text-white" style={{ fontFamily: "prosto-One" }}>
                    Tap to upload image or video (15-60s)
                  </Text>
                </>
              )}
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ width: scale(300), height: verticalScale(194) }}
              className="items-center justify-center border border-dashed border-white rounded-xl mt-5 bg-[#2C2C2C]"
              onPress={() =>
                navigation.navigate("CameraScreenFeed", {
                  onCapture: (imagePath: string) => setSelectedImage({ uri: imagePath }),
                })
              }
            >
              {selectedImage ? (
                <Image source={{ uri: selectedImage.uri }} style={{ width: "100%", height: "100%" }} />
              ) : (
                <>
                  <Image source={require("../../../assets/e-icon/Frame (1).png")} style={{ width: scale(30), height: verticalScale(30) }} />
                  <Text className="mt-2 text-white" style={{ fontFamily: "prosto-One" }}>
                    Tap to capture image
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <TextInput
              className="bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 "
              placeholderTextColor={"#ADAEBC"}
              placeholder="write a hastag (otional)"
              style={{ color: "#ADAEBC" }}
              onChangeText={handleHashTag}
            />

            <TextInput
              className="bg-[#2C2C2C] flex-1 border w-full p-5 rounded-lg mt-4 mb-2"
              placeholderTextColor={"#ADAEBC"}
              placeholder="Add comments.."
              style={{ color: "#ADAEBC" }}
              onChangeText={setComments}
            />

            <Text className="font-instrumentSansSemiBold text-white w-full mt-2">
              {userType === "Brand" ? "Posting as your Brand" : "Select Brand"}
            </Text>

            <View className="flex-row items-center mt-4 gap-4 border   rounded-xl bg-[#2C2C2C] px-1">
              <CreateModalSelecPicker data={data?.data} selectedState={selectedBrand} setSelectedState={setSelectedBrand} />
            </View>

            <TouchableOpacity className="bg-[#1D3725] w-full p-4 items-center rounded-xl mt-5 mb-4" onPress={handlePost}>
              <Text className="text-[#CACACA] font-instrumentSansBold text-xl">
                {loading ? <ActivityIndicator size={"small"} color={"blue"} /> : "Post"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};;

export default CreatePostModal;