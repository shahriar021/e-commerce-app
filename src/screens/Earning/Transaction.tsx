import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useAppSelector } from 'src/redux/hooks';
import { useGetTransactionQuery } from 'src/redux/features/earning/earningApi';
import { useNavigation } from '@react-navigation/native';

export default function Transaction() {
    const navigation=useNavigation()
     useLayoutEffect(() => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: "#121212",
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontFamily: "instrumentSans-BOld",
                    fontSize: 20,
                    color: "white",
                },
                headerTitle: "Transactions",
                headerTintColor: "#33363F",
                headerTitleAlign: "start",
            });
        }, [navigation]);
     const token = useAppSelector((state) => state.auth.token);
    const { data: getTransaction } = useGetTransactionQuery(token);
  return (
    <View className='flex-1 p-2'>
      {getTransaction?.data?.data?.map((item) => (
                <View className="bg-[#121212] p-1 rounded-md mt-2 border border-gray-700">
                  <View className="flex-row justify-between p-1">
                    <Text className="text-white text-lg font-instrumentSansSemiBold">
                      Order #{item?.cartProductId?.slice(-4)}
                    </Text>
                    <Text className="text-[#4ADE80] font-instrumentRegular">
                      {item?.earning}
                    </Text>
                  </View>
                  <View className="flex-row justify-between p-1 mt-1">
                    <Text className="text-[#9CA3AF] text-base font-instrumentRegular">
                      {new Date(item?.createdAt)?.toLocaleDateString()}
                    </Text>
                    <Text
                      className={`${
                        item?.earningStatus == "paid"
                          ? "text-[#4ADE80]"
                          : "text-[#FB923C]"
                      }  font-instrumentRegular`}
                    >
                      {item?.earningStatus}
                    </Text>
                  </View>
                </View>
              ))}
    </View>
  )
}