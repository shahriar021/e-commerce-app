import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useDimensionsChange } from 'react-native-responsive-dimensions'

const { width, height } = Dimensions.get("screen");

const PopularItemsList = () => {

    const [numbers]=useState(Array.from({length:20}))

  return (
    <ScrollView style={{flex:1}} contentContainerStyle={{ flexWrap:"wrap",flexDirection:"row", paddingBottom:100,justifyContent:"space-between", }}  showsVerticalScrollIndicator={false}>
              {numbers.map((item,index) =>
                
                <View
                  key={index} // add key
                  className="border border-gray-200 rounded-lg overflow-hidden bg-red-500"
                  style={{
                    backgroundColor: "white",
    
                    borderRadius: 10, 

                    width: '48%',
                    marginTop: 5, 
                    

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
  )
}

export default PopularItemsList