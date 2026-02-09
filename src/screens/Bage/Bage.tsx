import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppSelector } from 'src/redux/hooks'
import { useFeatureBrandsQuery } from 'src/redux/features/brand/brandApi'
import { RootStackParamList } from 'src/types/screens'
import { StackNavigationProp } from '@react-navigation/stack'

type Props={
  navigation:StackNavigationProp<RootStackParamList,"Cart Page">
}

const Bage = ({navigation}:Props) => {
  const [loadMore, setLoadMore] = useState(20)
  const token = useAppSelector((state) => state.auth.token);
  const { data, isLoading: isQueryLoading } = useFeatureBrandsQuery({ token, limit: loadMore }) 
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (data?.data?.data) {
        if (!search) {
            setFilteredData(data.data.data);
        }
        if (search) {
             setFilteredData(data.data.data.filter((item: any) => item?.brandName?.toLowerCase().includes(search?.toLowerCase())));
        }
    }
  }, [data, search]); 


  const handleSearch = async (text: string) => {
    setLoading(true)
    setSearch(text)
    
    setTimeout(() => {
      const rawData = data?.data?.data || [];
      if (text) {
        setFilteredData(rawData.filter((item: any) => 
          item?.brandName?.toLowerCase().includes(text?.toLowerCase())
        ));
      } else {
        setFilteredData(rawData);
      }
      setLoading(false)
    }, 300)
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitle: () => (
        <View className='flex-col'><Text className='text-[#ffffff] justify-center text-xl font-instrumentSansBold'>ARKIVE</Text><Text className='text-[#ffffff] font-instrumentSansSemiBold'>A-Z Brands</Text></View>
      )
    });
  }, [navigation]);

  return (
    <View className='flex-1 bg bg-[#121212] p-4 items-center'>
      <View className='border p-2 mt-2 mb-2 rounded-xl bg-[#252525] flex-row gap-3'>
        <Image source={require("../../../assets/e-icon/search-normal.png")} style={{ width: 24, height: 24 }} />
        <TextInput className='flex-1 font-instrumentSansSemiBold' placeholder='Search Brands...' placeholderTextColor={"#ADAEBC"} onChangeText={handleSearch} value={search} style={{ color: "white" }} />
      </View>

      {/* Show loading state if searching OR if the initial query is loading */}
      {loading || isQueryLoading ? (
        <ActivityIndicator size={"large"} color={"#4ADE80"} /> 
      ) : (
        <ScrollView className='flex-1 0 w-full'>
          <View className='  flex-wrap flex-row gap-2 justify-between '>
            {/* Conditional rendering for no results */}
            {filteredData.length === 0 ? (
                <Text className='text-white text-center w-full font-robotoBold'>No Items found!</Text>
            ) : (
                [...filteredData].sort((a:any,b:any)=>{
                  const nameA=a.brandName?a.brandName.toUpperCase():'';
                  const nameB=b.brandName?b.brandName.toUpperCase():'';
                  if(nameA<nameB){
                    return -1;
                  }
                  if(nameA>nameB){
                    return 1;
                  }
                  return 0;
                }).map((item: any) => (
                    <TouchableOpacity 
                        key={item._id} 
                        className='relative rounded-xl overflow-hidden mt-1 mb-1 ' 
                        style={{ width: "48%", aspectRatio: 1 }} 
                        onPress={() => navigation.navigate("Brand Details", { id: item._id })}
                    >
                        <Image source={{ uri: item.brandLogo[0] }} style={{ width: "100%", height: "100%" }} />
                        <Text className='absolute  bottom-3 left-0 right-0 text-xl font-instrumentSansBold text-white text-center'>{item?.brandName}</Text>
                    </TouchableOpacity>
                ))
            )}
          </View>
          {/* Only show Load More if there are more results expected or no search is active */}
          
            <TouchableOpacity className='bg-[#1D3725] p-2 items-center mt-4 mb-4 rounded-xl overflow-hidden w-full' onPress={() => setLoadMore(loadMore + 10)}>
              <Text className='text-white font-instrumentSansBold text-xl'>Load More</Text>
            </TouchableOpacity>
          
        </ScrollView>
      )}
    </View>
  )
}

export default Bage