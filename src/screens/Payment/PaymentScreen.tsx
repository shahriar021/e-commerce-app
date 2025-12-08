import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useAppSelector } from 'src/redux/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { usePostPaymentToStripeMutation } from 'src/redux/features/payment/paymentApi';

export default function PaymentScreen() {
  const route = useRoute();
  const totalAmount = parseFloat(route.params.total || 0);
  console.log(totalAmount,"in payment screen")

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false); // true when Stripe setup is COMPLETE
  const [setupInProgress, setSetupInProgress] = useState(false); // true when fetching/initializing
  const [status, setStatus] = useState('Enter your address details to pay.');
  
  // Address State (using placeholder data)
  const [name, setName] = useState('John Doe'); 
  const [contact, setContact] = useState('5551234567');
  const [address, setAddress] = useState('123 Main St, Apt 4B');

  const token = useAppSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const [postStrip] = usePostPaymentToStripeMutation();

  const isAddressFilled = name.trim() !== '' && contact.trim() !== '' && address.trim() !== '';

  // --- HEADER SETUP ---
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#121212", elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity className="flex-row gap-2 items-center mx-2" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
          <Text className="font-instrumentSansBold text-white text-2xl">Checkout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // --- 1. FETCH PAYMENT SHEET PARAMS FROM SERVER ---
  const fetchPaymentSheetParams = useCallback(async () => {
    try {
      setStatus('Connecting to server...');
      
      const body = {
        data: {
          amount: totalAmount, 
          address: {
            name: name.trim(),
            contact: contact.trim(),
            spotDetails: address.trim()
          }
        }
      };
      
      const response = await postStrip({ token, body }).unwrap();
      setStatus('Payment data received from server');

      if (response?.data?.paymentIntent && response.data.ephemeralKey && response.data.customer) {
        return {
          paymentIntent: response.data.paymentIntent,
          ephemeralKey: response.data.ephemeralKey,
          customer: response.data.customer,
        };
      }
      throw new Error("Server did not return all required Stripe keys.");

    } catch (error) {
      console.error('❌ FETCH ERROR:', error);
      setStatus(`Connection failed.`);
      throw error; 
    }
  }, [ name, contact, address, token, postStrip]); 

  // --- 2. INITIALIZE PAYMENT SHEET ---
  const initializePaymentSheet = useCallback(async () => {
    // Optimization: Use separate state for fields to reduce redundant re-runs of this heavy callback
    // We already check isAddressFilled outside, but keep it here for safety.
    if (!isAddressFilled || setupInProgress) return false;

    setLoading(false); 
    setSetupInProgress(true);
    setStatus('Setting up payment...');

    try {
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
      console.log(paymentIntent, ephemeralKey, customer,"init...")

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
        returnURL: 'staark://payment-complete',
        customFlow: false, // CRASH FIX
      });

      setSetupInProgress(false);
      
      if (error) {
        console.error('❌ Stripe Init Error:', error);
        setStatus(`Setup failed: ${error.message}`);
        Alert.alert('Setup Error', error.message);
        return false; 
      } else {
        setStatus('Ready to pay! 🎉');
        setLoading(true); // Enable the pay button
        return true; 
      }
    } catch (error) {
      setSetupInProgress(false);
      setLoading(false);
      return false;
    }
    // Added token to dependencies for completeness, although token shouldn't change
  }, [fetchPaymentSheetParams, initPaymentSheet, name, isAddressFilled, setupInProgress, token]); 

  // --- 3. OPEN PAYMENT SHEET ---
  const openPaymentSheet = async () => {
    setLoading(false); 
    setStatus('Processing payment...');

    // 🔑 FIX: Destructure the expected return values
    const { error, paymentIntent, paymentMethod } = await presentPaymentSheet(); 
    console.log(paymentIntent, paymentMethod,"info....")

    if (error) {
      console.error('❌ Payment error:', error);
      setStatus('Ready to pay! 🎉'); 
      Alert.alert(`Payment Failed`, error.message);
      setLoading(true); // Re-enable for retry
    } else {
      // SUCCESS BLOCK
      console.log('✅ Payment successful!', paymentIntent, paymentMethod);
      setStatus('Payment successful! ✅');
      
      Alert.alert(
          'Payment Successful!',
          'Thank you for your purchase.',
          [{ text: 'OK', onPress: () => navigation.navigate("BottomScreen", { brand: "Brand" })}] 
      );
      
      setLoading(false); // Disable button after success
    }
}

  // --- AUTOMATIC SETUP TRIGGER (STABILIZED) ---
  useEffect(() => {
    // Ensure we only run when necessary
    if (isAddressFilled && !loading && !setupInProgress) {
        console.log('--- Address filled: Triggering setup automatically ---');
        initializePaymentSheet();
    }
    // Dependency array should include all state and functions used inside.
    // NOTE: This will still log twice if you are using React 18's StrictMode, 
    // but the actual Stripe call will be blocked by `setupInProgress`.
  }, [isAddressFilled, loading, setupInProgress, initializePaymentSheet]);


  // --- HANDLE PAY NOW BUTTON PRESS ---
  const handlePayNow = async () => {
    if (!isAddressFilled) {
        Alert.alert('Missing Details', 'Please fill in your name, contact, and address before proceeding.');
        return;
    }
    
    if (loading) {
        await openPaymentSheet();
    } 
    else if (!setupInProgress) {
        const setupSuccessful = await initializePaymentSheet();
        if (setupSuccessful) {
            await openPaymentSheet();
        }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Summary Views */}
        <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
          <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Subtotal</Text>
          <Text className=" mx-2 text-sm text-white font-instrumentRegular">${totalAmount.toFixed(2)}</Text>
        </View>
        {/* <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
          <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Shipping</Text>
          <Text className=" mx-2 text-sm text-white font-instrumentRegular">${shippingFee.toFixed(2)}</Text>
        </View> */}
        <View className="border border-dashed border-[#E2E2E2] mx-2 w-full" style={styles.divider} />
        <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
          <Text className=" text-lg text-white font-instrumentSansBold">Total</Text>
          <Text className=" mx-2 text-lg text-white font-instrumentSansBold">${totalAmount.toFixed(2)}</Text>
        </View>

        {/* Status indicator */}
        <View className='my-2 w-full'>
          <Text className='text-[#ADAEBC] font-instrumentRegular'>{status}</Text>
        </View>

        {/* Address Inputs */}
        <Text className='p-2 m-2 text-white font-interBold text-2xl w-full'>Address</Text>
        <View className='p-2 m-2 w-full'>
          <TextInput
            placeholder='Enter your name'
            placeholderTextColor={"#ADAEBC"}
            className='border border-white py-2 m-2 rounded-lg'
            style={styles.textInput}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder='Enter your number'
            placeholderTextColor={"#ADAEBC"}
            className='border border-white py-2 m-2 rounded-lg'
            style={styles.textInput}
            onChangeText={setContact}
            value={contact}
            keyboardType='phone-pad'
          />
          <TextInput
            placeholder='Enter your address'
            placeholderTextColor={"#ADAEBC"}
            className='border border-white py-2 m-2 rounded-lg'
            style={styles.textInput}
            onChangeText={setAddress}
            value={address}
          />
        </View>

        {/* Pay Now button */}
        <TouchableOpacity
          className={`m-2 w-full px-2 rounded-lg 
            ${isAddressFilled && loading 
              ? 'bg-[#7E57C2]' 
              : 'bg-[#333333]'}`
          }
          disabled={!isAddressFilled || setupInProgress || !loading}
          onPress={handlePayNow} 
        >
          <Text className="text-xl text-white font-instrumentSansBold text-center p-3 ">
            {!isAddressFilled 
              ? 'Enter Address' 
              : setupInProgress 
                ? <ActivityIndicator size="small" color="#fff" />
                : 'Pay Now'}
          </Text>
        </TouchableOpacity>

        {/* Retry button */}
        <TouchableOpacity
          className='mt-4'
          onPress={initializePaymentSheet}
          disabled={setupInProgress}
        >
          <Text className={`text-center font-instrumentRegular ${setupInProgress ? 'text-[#ADAEBC]' : 'text-[#7E57C2]'}`}>
            {setupInProgress ? 'Setup Running...' : 'Retry Payment Setup'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        padding: 12,
        alignItems: 'center',
    },
    divider: {
        borderWidth: 0.5,
        borderColor: '#E2E2E2',
    },
    textInput: {
        color: "white", 
        padding: 10,
        backgroundColor: '#121212', 
    }
});