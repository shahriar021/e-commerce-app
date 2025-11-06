import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useAppSelector } from 'src/redux/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { usePostPaymentToStripeMutation } from 'src/redux/features/payment/paymentApi';

export default function PaymentScreen() {
  const route = useRoute();
  const { total, shiping } = route.params;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // 'loading' means setup is complete and the button can be pressed to present the sheet
  const [loading, setLoading] = useState(false);
  // 'setupInProgress' tracks if we are currently talking to the server/Stripe SDK
  const [setupInProgress, setSetupInProgress] = useState(false);
  const [status, setStatus] = useState('Enter your address details to pay.');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const token = useAppSelector((state) => state.auth.token);
  console.log(token)
  const navigation = useNavigation();
  const [postStrip] = usePostPaymentToStripeMutation();

  // Check if all address fields are filled
  const isAddressFilled = name.trim() !== '' && contact.trim() !== '' && address.trim() !== '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row gap-2 items-center mx-2"
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left-circle" size={24} color="white" />
          <Text className="font-instrumentSansBold text-white text-2xl">
            Checkout
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Fetch Payment Sheet Params from server
  const fetchPaymentSheetParams = useCallback(async () => {
    try {
      console.log('🔵 [1/3] Fetching payment sheet params...');
      setStatus('Connecting to server...');
      
      // Ensure we have current, trimmed data for the request
      const requestName = name.trim();
      const requestContact = contact.trim();
      const requestAddress = address.trim();

      const body = {
        data: {
          // IMPORTANT: Check that your backend expects the total amount in the correct format (e.g., cents/smallest unit)
          amount: total, 
          address: {
            name: requestName,
            contact: requestContact,
            spotDetails: requestAddress
          }
        }
      };
      
      console.log('--- Request Payload:', body.data);

      const response = await postStrip({ token, body }).unwrap();

      console.log('✅ [1/3] Server Response Received.', response);
      setStatus('Payment data received from server');

      // Check the structure of the data returned from your server (via RTK Query unwrap)
      if (response && response.data) {
        if (!response.data.paymentIntent || !response.data.ephemeralKey || !response.data.customer) {
            console.error('❌ Missing required Stripe keys in server response.');
            throw new Error("Server did not return all required Stripe keys.");
        }
        return {
          paymentIntent: response.data.paymentIntent,
          ephemeralKey: response.data.ephemeralKey,
          customer: response.data.customer,
        };
      }
      throw new Error("Invalid or empty response structure from server.");

    } catch (error) {
      console.error('❌ [1/3] FETCH ERROR:', error);
      setStatus(`Connection failed. Check console for details.`);
      // Re-throw the error so it can be caught by initializePaymentSheet
      throw error; 
    }
  }, [total, name, contact, address, token, postStrip]); 

  // Initialize the Payment Sheet
  const initializePaymentSheet = useCallback(async () => {
    setLoading(false); // Disable button during setup
    setSetupInProgress(true);
    setStatus('Setting up payment...');

    try {
      // 1. Fetch keys from server
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      // 2. Initialize Stripe Payment Sheet
      console.log('🔵 [2/3] Initializing payment sheet...');
      setStatus('Preparing payment sheet...');

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Your App Name",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: name,
        },
        style: 'alwaysDark',
        returnURL: 'com.sta.ark://',
      });

      if (error) {
        console.error('❌ [2/3] Stripe Init Error:', error);
        setStatus(`Setup failed: ${error.message}`);
        Alert.alert('Setup Error', error.message);
        setSetupInProgress(false);
        setLoading(false); // Reset to ensure the button is disabled/shows error state
        return false; // Setup failed
      } else {
        console.log('✅ [3/3] Payment sheet ready');
        setStatus('Ready to pay! 🎉');
        setLoading(true); // Enable the pay button
        setSetupInProgress(false);
        return true; // Setup successful
      }
    } catch (error) {
      // Catches errors from fetchPaymentSheetParams
      console.error('❌ SETUP FAILURE. See above network error.');
      setSetupInProgress(false);
      setLoading(false);
      return false; // Setup failed
    }
  }, [fetchPaymentSheetParams, initPaymentSheet, name]);

  // Handle the 'Pay Now' button press
  const handlePayNow = async () => {
    if (!isAddressFilled) {
        Alert.alert('Missing Details', 'Please fill in your name, contact, and address before proceeding.');
        return;
    }
    
    // Check if we are already loaded. If so, skip setup and present immediately.
    if (loading) {
        // If we are already loaded, just open the sheet.
        console.log('🔵 Opening already initialized payment sheet...');
        await openPaymentSheet();
        return;
    }
    
    // If not loaded, start the setup process
    const setupSuccessful = await initializePaymentSheet();

    if (setupSuccessful) {
        // If setup is successful, open the payment sheet immediately
        await openPaymentSheet();
    }
    // If setup failed, state is already handled in initializePaymentSheet
  };

  // Open the Payment Sheet for processing payment
  const openPaymentSheet = async () => {
    console.log('🔵 Opening payment sheet...');
    setStatus('Processing payment...');

    const { error,paymentIntent, paymentMethod } = await presentPaymentSheet();

    if (error) {
      console.error('❌ Payment error:', error);
      setStatus('Ready to pay! 🎉'); 
      Alert.alert(`Payment Failed`, error.message);
      setLoading(true); // Re-enable for retry
    } else {
      if (paymentIntent && paymentMethod) {
    console.log('✅ Payment successful!');
    console.log('Payment Intent:', paymentIntent);
    console.log('Payment Method:', paymentMethod);
    
    setStatus('Payment successful! ✅');
  } else {
    console.warn('❓ Payment successful, but missing paymentIntent or paymentMethod.');
    Alert.alert('Payment Successful, but missing details', 'We were unable to retrieve all payment details.');
  }
      // console.log('✅ Payment successful!',paymentIntent,paymentMethod);
      // setStatus('Payment successful! ✅');
      // Alert.alert(
      //     'Payment Successful!',
      //     'Thank you for your purchase.',
      //     [{ text: 'OK', onPress: () => navigation.navigate("BottomScreen", { brand: "Brand" })}] 
      // );
      // setLoading(false); // Disable after success
    }
  }


  return (
    <View className='bg-[#121212] flex-1 items-center w-full p-3'>
      {/* Summary Views */}
      <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
        <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Subtotal</Text>
        <Text className=" mx-2 text-sm text-white font-instrumentRegular">${total}</Text>
      </View>
      <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
        <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Shipping</Text>
        <Text className=" mx-2 text-sm text-white font-instrumentRegular">${shiping}</Text>
      </View>
      <View
        className="border border-dashed border-[#E2E2E2] mx-2 w-full"
        style={{ borderWidth: 1 }}
      />
      <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
        <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
          Total
        </Text>
        <Text className=" mx-2 text-sm text-white font-instrumentRegular">
          ${total}
        </Text>
      </View>
      {/* --- */}

      <View className='w-full'>
        {/* Status indicator */}
        <View className='my-2'>
          <Text className='text-[#ADAEBC] font-instrumentRegular'>{status}</Text>
        </View>

        <Text className='p-2 m-2 text-white font-interBold text-2xl'>Address</Text>
        <View className='p-2 m-2'>
          <TextInput
            placeholder='Enter your name'
            placeholderTextColor={"#ADAEBC"}
            className='border border-white py-2 m-2 rounded-lg'
            style={{ color: "white", padding: 10 }}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder='Enter your number'
            placeholderTextColor={"#ADAEBC"}
            className='border border-white py-2 m-2 rounded-lg'
            style={{ color: "white", padding: 10 }}
            onChangeText={setContact}
            value={contact}
            keyboardType='phone-pad'
          />
          <TextInput
            placeholder='Enter your address'
            placeholderTextColor={"#ADAEBC"}
            className='border border-white py-2 m-2 rounded-lg'
            style={{ color: "white", padding: 10 }}
            onChangeText={setAddress}
            value={address}
          />
        </View>

        {/* Pay Now button */}
        <TouchableOpacity
          className={`m-2 w-full px-2 rounded-lg ${!isAddressFilled || setupInProgress ? 'bg-[#333333]' : 'bg-[#7E57C2]'}`}
          // Disable button if address is not filled OR if setup is currently running
          disabled={!isAddressFilled || setupInProgress}
          onPress={handlePayNow} 
        >
          <Text className="text-xl text-white font-instrumentSansBold text-center p-3 ">
            {!isAddressFilled 
              ? 'Enter Address' 
              : setupInProgress 
                ? 'Setting up...' 
                : 'Pay Now'}
          </Text>
        </TouchableOpacity>

        {/* Retry button - Explicitly force a setup refresh */}
        <TouchableOpacity
          className='mt-4'
          onPress={initializePaymentSheet}
          disabled={setupInProgress} // Disable if a setup is already running
        >
          <Text className={`text-center font-instrumentRegular ${setupInProgress ? 'text-[#ADAEBC]' : 'text-[#7E57C2]'}`}>
            {setupInProgress ? 'Setup Running...' : 'Force Retry Setup'}
          </Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}