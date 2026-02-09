import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';

const accountDetails = [
  { label: 'Account Number', value: '1234567890' },
  { label: 'Routing Number', value: '021000021' },
  { label: 'Bank Name', value: 'Atlantic Federal Bank' },
  { label: 'Bankholder Name', value: 'John D. Harper' },
  { label: 'Bank Address', value: '101 Main Street, New York, NY 10001, USA' }
];

const Bank = () => {
    const [bankItems]=useState(Array.from({length:5},(_,i)=>i+1))

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation:0,
                shadowOpacity:0,
                borderBottomWidth:0
            },
            headerTitle:"Bank Details",
            headerTintColor: "#626262",
            headerLeft: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            },
            headerRight: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.navigate("Bank Edit")}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full overflow-hidden p-2'>
                        <Image source={require("../../../assets/e-icon/Rectangle 1.png")} style={{width:"100%",height:"100%"}} resizeMode='contain'/>
                    </View>
                </TouchableOpacity>
            }
        })
    }, [navigation])

    return (
       <View className="flex-1 p-3">
      {accountDetails.map((item, index) => (
        <View 
          key={index} 
          className="border border-[#00000033] rounded-lg p-3 mt-2 mb-2 flex-col gap-3"
        >
          <Text className="text-[#626262] font-robotoRegular">{item.label}</Text>
          <Text className="text-[#252525] font-robotoBold">{item.value}</Text>
        </View>
      ))}
    </View>
    )
}

export default Bank