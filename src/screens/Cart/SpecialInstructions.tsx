import { View, Text, TextInput, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons'

const SpecialInstructions = () => {
    const { indicator } = useRoute().params
    const navigation = useNavigation()
    const [text, setText] = useState('');
    console.log(indicator, "in page")
    const { width, height } = useWindowDimensions()

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor:"whtie",
                elevation:0,
                shadowOpacity:0,
                borderBottomWidth:0
            },
            headerTitleAlign:"center",
            headerTintColor:"#626262",
            headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
            <Entypo name="chevron-small-left" size={24} color="red" />
          </View>
        </TouchableOpacity>
      )
        })
    },[navigation])

    return (
        <View className='flex-1 p-3'>
            <Text className='text-[#626262] font-robotoRegular text-xl mb-3'>Specail Instructions</Text>
            <TextInput
                style={styles.textArea}
                value={text}
                onChangeText={setText}
                placeholder={
                    indicator === "restaurant"
                        ? "Any special instructions for the restaurant?"
                        : "Any special instructions for the rider?"
                }
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
            />
            <View className="items-center mt-3">
                <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} >
                    <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
                        <Text className="text-white p-3 ">Done</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        height: 120,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
})

export default SpecialInstructions