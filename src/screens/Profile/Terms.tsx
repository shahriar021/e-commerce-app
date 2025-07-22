import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo } from '@expo/vector-icons';

const Terms = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Terms And Conditions",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                   <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='flex-1 p-3 bg-[#121212]'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className='font-bold text-xl text-[#FDFDFD]'>Terms & Conditions</Text>
                <Text className='mt-2 mb-2 text-[#FDFDFD] font-opansans'>Lorem ipsum dolor sit amet consectetur. Ultrices id feugiat venenatis habitant mattis viverra elementum purus volutpat. Lacus eu molestie pulvinar rhoncus integer proin elementum. Pretium sit fringilla massa tristique aenean commodo leo. Aliquet viverra amet sit porta elementum et pellentesque posuere. Ullamcorper viverra tortor lobortis viverra auctor egestas. Nulla condimentum ac metus quam turpis gravida ut velit. Porta justo lacus consequat sed platea. Ut dui massa quam elit faucibus consectetur sapien aenean auctor. Felis ipsum amet justo in. Netus amet in egestas sed auctor lorem. Justo ullamcorper velit habitasse lorem eu arcu. Non enim a elit urna eget nibh quisque donec condimentum. Elit ut pellentesque neque in quis at viverra. Nisl etiam tristique odio eget convallis.</Text>
                <Text className='mt-2 mb-2 text-[#FDFDFD] font-opansans'>Lorem ipsum dolor sit amet consectetur. Ultrices id feugiat venenatis habitant mattis viverra elementum purus volutpat. Lacus eu molestie pulvinar rhoncus integer proin elementum. Pretium sit fringilla massa tristique aenean commodo leo. Aliquet viverra amet sit porta elementum et pellentesque posuere. Ullamcorper viverra tortor lobortis viverra auctor egestas. Nulla condimentum ac metus quam turpis gravida ut velit. Porta justo lacus consequat sed platea. Ut dui massa quam elit faucibus consectetur sapien aenean auctor. Felis ipsum amet justo in. Netus amet in egestas sed auctor lorem. Justo ullamcorper velit habitasse lorem eu arcu. Non enim a elit urna eget nibh quisque donec condimentum. Elit ut pellentesque neque in quis at viverra. Nisl etiam tristique odio eget convallis.</Text>
            </ScrollView>
        </View>
    )
}

export default Terms