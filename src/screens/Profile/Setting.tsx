import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { settingItems } from 'src/constants/settingItems'
import { RootStackParamList } from 'src/types/screens'
import { StackNavigationProp } from '@react-navigation/stack'

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Setting">;

const Setting = () => {

    const navigation = useNavigation<SettingsScreenNavigationProp>()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Settings",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0, 
                borderBottomWidth: 0, 
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full' >
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const handleDelete = () => {

    }

    const SettingsItem = ({ icon, label, onPress }: any) => {
        return (<TouchableOpacity onPress={onPress} className="flex-row justify-between border p-2 m-2 rounded-xl border-gray-300 w-full" >
            <View className='flex-row items-center justify-between p-2 w-full'>
                <View className='flex-row items-center gap-2'>
                    <Image source={icon} style={{ width: 24, height: 24 }} />
                    <Text className='text-[#626262] text-xl font-robotoBold '>{label}</Text>
                </View>
                <View>
                    <View className='p-1' >
                        <View className='w-[35px] h-[35px] border border-gray-200 items-center justify-center rounded-full' >
                            <Entypo name="chevron-small-right" size={24} color="black" />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }

    return (
        <View className='flex-1 p-2 items-center'>
            {settingItems.map((item, index) => (
                <SettingsItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    onPress={() => navigation.navigate(item?.route)}
                />
            ))}
            <TouchableOpacity onPress={handleDelete} className="flex-row justify-between border p-2 m-2 rounded-xl border-gray-300 w-full" >
                <View className='flex-row items-center justify-between p-2 w-full'>
                    <View className='flex-row items-center gap-2'>
                        <Image source={require("../../../assets/e-icon/Delete.png")} style={{ width: 24, height: 24 }} />
                        <Text className='text-[#B20000] text-xl font-robotoBold'>Delete Account</Text>
                    </View>
                    <View>
                        <View className='p-1' >
                            <View className='w-[35px] h-[35px] border border-gray-200 items-center justify-center rounded-full' >
                                <Entypo name="chevron-small-right" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Setting