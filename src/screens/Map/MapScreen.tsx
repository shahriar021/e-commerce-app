import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapScreen = () => {

  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const navigation = useNavigation();

  const pickupLocation = {
    latitude: 23.7805733,
    longitude: 90.4195402,
  };

  const deliveryLocation = {
    latitude: 23.8748575,
    longitude: 90.3984187,
  };

  return (
    <View className="flex-1 ">
      {/* Top text overlay */}


      {/* Map itself */}
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 23.825,
          longitude: 90.41,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={pickupLocation} title="Pickup" description="Gulshan" />
        <Marker coordinate={deliveryLocation} title="Delivery" description="Uttara" />
        <Polyline
          coordinates={[pickupLocation, deliveryLocation]}
          strokeColor="#0E7AFE"
          strokeWidth={3}
        />
      </MapView>
      <View className="absolute top-14 left-0 right-0 items-center z-10 w-full  px-3">
        {!isOrderPlaced ? <Text className="text-lg font-interBold text-[#BA2720] bg-white px-4 py-2 rounded w-full m-5 text-center relative">Step 1: Go to Pickup</Text>
          : <Text className="text-lg font-interBold text-[#BA2720] bg-white px-4 py-2 rounded w-full m-5 text-center relative">Step 3: Deliver to Customer</Text>}
        <TouchableOpacity className='absolute right-0' onPress={() => navigation.goBack()}>
          <Image source={require("../../../assets/restroIcon/mapClose.png")} />
        </TouchableOpacity>
      </View>

      <View className='absolute bg-white w-[95%] bottom-24 mx-auto  left-0 right-0 px-3 flex-col gap-3 py-2 rounded-xl'
        style={{ left: '50%', transform: [{ translateX: -0.5 * (Dimensions.get('window').width * 0.95) }] }}

      >
        <Text className='font-robotoBold text-2xl'>Red n hot pizza</Text>
        <View className='flex-row gap-2'>
          <Image source={require("../../../assets/restroIcon/call-done.png")} style={{ width: 20, height: 20 }} />
          <Text className='font-robotoRegular'>+234 701 234 5678</Text>
        </View>
        <View className='flex-row gap-2'>
          <Image source={require("../../../assets/restroIcon/location-05.png")} style={{ width: 20, height: 20 }} />
          <Text className='font-robotoRegular'>32 Samwell Sq, Chevron</Text>
        </View>
      </View>

      <TouchableOpacity className="absolute bottom-2 left-0 right-0 items-center z-10 m-5 rounded-full overflow-hidden " onPress={() => setIsOrderPlaced(true)}>
        <LinearGradient colors={["#DD0F14", "#C21A1E"]} className="px-10 py-3 rounded-full w-4/5" style={{ width: "100%", padding: 10 }}>
          {!isOrderPlaced ? <Text className="text-lg font-bold text-white  rounded w-full  text-center relative">Order Placed</Text>
            : <Text className="text-lg font-bold text-white  rounded w-full  text-center relative">Mark as Delivered</Text>}
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
};

export default MapScreen;
