import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("screen");

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [numbers] = useState(Array.from({length:30},(_,i)=>i+1))

  useEffect(() => {
    Font.loadAsync({
      "Nunito-Bold": require("../../../assets/fonts/Nunito-Bold.ttf"),
      // ... other fonts
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="p-3">
        <View className="flex-row justify-between items-center">
          <View className=" rounded-full overflow-hidden " style={{ width: width * 0.15, height: width * 0.15, }}>
            <Image source={require("../../../assets/restroIcon/tikaImg.jpg")} style={{ width: "100%", height: "100%", resizeMode: "stretch" }} />
          </View>
          <View className="flex-row items-center">
            <Image source={require("../../../assets/restroIcon/location-05.png")} style={{ width: 20, height: 20, marginRight: 6 }} />
            <Text className="text-[#FE724C]">4102 Pretty View Lane</Text>
          </View>
        </View>
        <Text className="  mt-3 mb-3 text-[#BA1414] text-3xl font-nunitoBold">What would like to order</Text>
        <View className="border flex-row items-center rounded-full p-2 border-gray-200 bg-[#F2F2F2] gap-2">
          <AntDesign name="search1" size={24} color="gray" />
          <TextInput className="flex-1" placeholder="Seach for restaurants or dishes..." />
        </View>
       <ScrollView contentContainerStyle={{paddingBottom:200}} showsVerticalScrollIndicator={false}>
         <View className="flex-row justify-between items-center mt-2 mb-2">
          <Text className="text-2xl font-bold">Nearby Restaurants</Text>
          <TouchableOpacity className="flex-row items-center " onPress={()=>navigation.navigate("Nearby Restaurants List")}>
            <Text className="text-red-700">View All</Text>
            <Entypo name="chevron-small-right" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: 10, }} horizontal showsHorizontalScrollIndicator={false}>
          {numbers.map(item =>
            
            <View
              key={item} // add key
              className="border border-gray-200 rounded-lg overflow-hidden"
              style={{
                width: width * 0.7,  // slightly wider for better content space
                backgroundColor: "white",

                borderRadius: 10,
                overflow: "hidden", 
                marginRight: 12,
              }}
            >
              <Image
                source={require("../../../assets/restroIcon/nearbyRes.png")}
                style={{ width: "100%", height: 140, resizeMode: "cover" }}
                className="rounded-t-lg"
              />
              <Text className="absolute text-xl font-semibold bg-white p-1 left-3 top-3 rounded-full text-[#19CC49]">
                Open Now
              </Text>

              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  flexShrink: 1,
                }}
              >
                <Text
                  className="font-bold text-xl"
                  style={{ flexWrap: "wrap" }}
                  numberOfLines={2} // limit lines to avoid overflow if needed
                >
                  Urban Palate
                </Text>

                <View
                  className="flex-row justify-between"
                  style={{ marginTop: 8 }}
                >
                  <View className="flex-row items-center gap-2" style={{ flexShrink: 1 }}>
                    <SimpleLineIcons name="clock" size={20} color="black" />
                    <Text numberOfLines={1} style={{ flexShrink: 1 }}>
                      9am - 11 pm
                    </Text>
                  </View>
                  <Text>1.2 km away</Text>
                </View>
              </View>
            </View>

          )}
        </ScrollView>
        {/*  */}
        <View className="flex-row justify-between items-center mt-2 mb-2">
          <Text className="text-2xl font-bold">Popular Items</Text>
          <TouchableOpacity className="flex-row items-center " onPress={()=>navigation.navigate("Popular Items")}>
            <Text className="text-red-700">View All</Text>
            <Entypo name="chevron-small-right" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: 10, }} horizontal showsHorizontalScrollIndicator={false}>
          {numbers.map(item =>
            
            <View
              key={item} // add key
              className="border border-gray-200 rounded-lg overflow-hidden"
              style={{
                width: width * 0.5,  // slightly wider for better content space
                backgroundColor: "white",

                borderRadius: 10,
                overflow: "hidden", 
                marginRight: 12,
              }}
            >
              <Image
                source={require("../../../assets/restroIcon/popularImg.png")}
                style={{ width: "100%", height: 140, resizeMode: "cover" }}
                className="rounded-t-lg relative"
              />
             <View className="flex-row justify-between items-center absolute  w-full">
               <View className=" flex-row items-center border border-red-700 rounded-full bg-white  top-2 left-2">
                <Text className="text-red-700 font-semibold mx-2">$</Text>
                <Text className="text-black font-semibold">10.35</Text>
                <View className="bg-red-100 rounded-full p-1"><Text className="text-red-800">-9%</Text></View>
              </View>

              <View className=" right-2 top-2 bg-[#C21A1E] rounded-full p-1">
                <Image source={require("../../../assets/restroIcon/Basket.png")} style={{width:30,height:30}}/>
              </View>
             </View>
              

              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  flexShrink: 1,
                }}
              >
                <Text
                  className="font-bold text-xl"
                  style={{ flexWrap: "wrap" }}
                  numberOfLines={2} // limit lines to avoid overflow if needed
                >
                  Classic CheeseBurger
                </Text>

                <Text>
                  Beef patty with cheddar chicken.
                </Text>
              </View>
            </View>

          )}
        </ScrollView>
       </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
