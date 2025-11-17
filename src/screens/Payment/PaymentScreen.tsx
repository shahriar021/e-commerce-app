// import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';
// import { useAppSelector } from 'src/redux/hooks';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Feather } from '@expo/vector-icons';
// import { usePostPaymentToStripeMutation } from 'src/redux/features/payment/paymentApi';

// export default function PaymentScreen() {
//   const route = useRoute();
//   const { total, shiping } = route.params;

//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   // 'loading' means setup is complete and the button can be pressed to present the sheet
//   const [loading, setLoading] = useState(false);
//   // 'setupInProgress' tracks if we are currently talking to the server/Stripe SDK
//   const [setupInProgress, setSetupInProgress] = useState(false);
//   const [status, setStatus] = useState('Enter your address details to pay.');
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [address, setAddress] = useState('');

//   const token = useAppSelector((state) => state.auth.token);
//   console.log(token)
//   const navigation = useNavigation();
//   const [postStrip] = usePostPaymentToStripeMutation();

//   // Check if all address fields are filled
//   const isAddressFilled = name.trim() !== '' && contact.trim() !== '' && address.trim() !== '';

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerStyle: {
//         backgroundColor: "#121212",
//         elevation: 0,
//         shadowOpacity: 0,
//         borderBottomWidth: 0,
//       },
//       headerTitle: () => null,
//       headerLeft: () => (
//         <TouchableOpacity
//           className="flex-row gap-2 items-center mx-2"
//           onPress={() => navigation.goBack()}
//         >
//           <Feather name="arrow-left-circle" size={24} color="white" />
//           <Text className="font-instrumentSansBold text-white text-2xl">
//             Checkout
//           </Text>
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   // Fetch Payment Sheet Params from server
//   const fetchPaymentSheetParams = useCallback(async () => {
//     try {
//       console.log('🔵 [1/3] Fetching payment sheet params...');
//       setStatus('Connecting to server...');
      
//       // Ensure we have current, trimmed data for the request
//       const requestName = name.trim();
//       const requestContact = contact.trim();
//       const requestAddress = address.trim();

//       const body = {
//         data: {
//           // IMPORTANT: Check that your backend expects the total amount in the correct format (e.g., cents/smallest unit)
//           amount: total, 
//           address: {
//             name: requestName,
//             contact: requestContact,
//             spotDetails: requestAddress
//           }
//         }
//       };
      
//       console.log('--- Request Payload:', body.data);

//       const response = await postStrip({ token, body }).unwrap();

//       console.log('✅ [1/3] Server Response Received.', response);
//       setStatus('Payment data received from server');

//       // Check the structure of the data returned from your server (via RTK Query unwrap)
//       if (response && response.data) {
//         if (!response.data.paymentIntent || !response.data.ephemeralKey || !response.data.customer) {
//             console.error('❌ Missing required Stripe keys in server response.');
//             throw new Error("Server did not return all required Stripe keys.");
//         }
//         return {
//           paymentIntent: response.data.paymentIntent,
//           ephemeralKey: response.data.ephemeralKey,
//           customer: response.data.customer,
//         };
//       }
//       throw new Error("Invalid or empty response structure from server.");

//     } catch (error) {
//       console.error('❌ [1/3] FETCH ERROR:', error);
//       setStatus(`Connection failed. Check console for details.`);
//       // Re-throw the error so it can be caught by initializePaymentSheet
//       throw error; 
//     }
//   }, [total, name, contact, address, token, postStrip]); 

//   // Initialize the Payment Sheet
//   const initializePaymentSheet = useCallback(async () => {
//     setLoading(false); // Disable button during setup
//     setSetupInProgress(true);
//     setStatus('Setting up payment...');

//     try {
//       // 1. Fetch keys from server
//       const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//       // 2. Initialize Stripe Payment Sheet
//       console.log('🔵 [2/3] Initializing payment sheet...');
//       setStatus('Preparing payment sheet...');

//       const { error } = await initPaymentSheet({
//         merchantDisplayName: "Your App Name",
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: paymentIntent,
//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: name,
//         },
//         style: 'alwaysDark',
//         returnURL: 'staark://payment-complete',
//       });

//       if (error) {
//         console.error('❌ [2/3] Stripe Init Error:', error);
//         setStatus(`Setup failed: ${error.message}`);
//         Alert.alert('Setup Error', error.message);
//         setSetupInProgress(false);
//         setLoading(false); // Reset to ensure the button is disabled/shows error state
//         return false; // Setup failed
//       } else {
//         console.log('✅ [3/3] Payment sheet ready');
//         setStatus('Ready to pay! 🎉');
//         setLoading(true); // Enable the pay button
//         setSetupInProgress(false);
//         return true; // Setup successful
//       }
//     } catch (error) {
//       // Catches errors from fetchPaymentSheetParams
//       console.error('❌ SETUP FAILURE. See above network error.');
//       setSetupInProgress(false);
//       setLoading(false);
//       return false; // Setup failed
//     }
//   }, [fetchPaymentSheetParams, initPaymentSheet, name]);

//   // Handle the 'Pay Now' button press
//   const handlePayNow = async () => {
//     if (!isAddressFilled) {
//         Alert.alert('Missing Details', 'Please fill in your name, contact, and address before proceeding.');
//         return;
//     }
    
//     // Check if we are already loaded. If so, skip setup and present immediately.
//     if (loading) {
//         // If we are already loaded, just open the sheet.
//         console.log('🔵 Opening already initialized payment sheet...');
//         await openPaymentSheet();
//         return;
//     }
    
//     // If not loaded, start the setup process
//     const setupSuccessful = await initializePaymentSheet();

//     if (setupSuccessful) {
//         // If setup is successful, open the payment sheet immediately
//         await openPaymentSheet();
//     }
//     // If setup failed, state is already handled in initializePaymentSheet
//   };

//   // Open the Payment Sheet for processing payment
//   const openPaymentSheet = async () => {
//     console.log('🔵 Opening payment sheet...');
//     setStatus('Processing payment...');

//     const { error,paymentIntent, paymentMethod } = await presentPaymentSheet();

//     if (error) {
//       console.error('❌ Payment error:', error);
//       setStatus('Ready to pay! 🎉'); 
//       Alert.alert(`Payment Failed`, error.message);
//       setLoading(true); // Re-enable for retry
//     }
//   //    else {
//   //     if (paymentIntent && paymentMethod) {
//   //   console.log('✅ Payment successful!');
//   //   console.log('Payment Intent:', paymentIntent);
//   //   console.log('Payment Method:', paymentMethod);
    
//   //   setStatus('Payment successful! ✅');
//   // } 
//   // else {
//   //   console.warn('❓ Payment successful, but missing paymentIntent or paymentMethod.');
//   //   Alert.alert('Payment Successful, but missing details', 'We were unable to retrieve all payment details.');
//   // }
//       console.log('✅ Payment successful!',paymentIntent,paymentMethod);
//       setStatus('Payment successful! ✅');
//       Alert.alert(
//           'Payment Successful!',
//           'Thank you for your purchase.',
//           [{ text: 'OK', onPress: () => navigation.navigate("BottomScreen", { brand: "Brand" })}] 
//       );
//       setLoading(false); // Disable after success
    
//   }


//   return (
//     <View className='bg-[#121212] flex-1 items-center w-full p-3'>
//       {/* Summary Views */}
//       <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
//         <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Subtotal</Text>
//         <Text className=" mx-2 text-sm text-white font-instrumentRegular">${total}</Text>
//       </View>
//       <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
//         <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Shipping</Text>
//         <Text className=" mx-2 text-sm text-white font-instrumentRegular">${shiping}</Text>
//       </View>
//       <View
//         className="border border-dashed border-[#E2E2E2] mx-2 w-full"
//         style={{ borderWidth: 1 }}
//       />
//       <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
//         <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
//           Total
//         </Text>
//         <Text className=" mx-2 text-sm text-white font-instrumentRegular">
//           ${total}
//         </Text>
//       </View>
//       {/* --- */}

//       <View className='w-full'>
//         {/* Status indicator */}
//         <View className='my-2'>
//           <Text className='text-[#ADAEBC] font-instrumentRegular'>{status}</Text>
//         </View>

//         <Text className='p-2 m-2 text-white font-interBold text-2xl'>Address</Text>
//         <View className='p-2 m-2'>
//           <TextInput
//             placeholder='Enter your name'
//             placeholderTextColor={"#ADAEBC"}
//             className='border border-white py-2 m-2 rounded-lg'
//             style={{ color: "white", padding: 10 }}
//             onChangeText={setName}
//             value={name}
//           />
//           <TextInput
//             placeholder='Enter your number'
//             placeholderTextColor={"#ADAEBC"}
//             className='border border-white py-2 m-2 rounded-lg'
//             style={{ color: "white", padding: 10 }}
//             onChangeText={setContact}
//             value={contact}
//             keyboardType='phone-pad'
//           />
//           <TextInput
//             placeholder='Enter your address'
//             placeholderTextColor={"#ADAEBC"}
//             className='border border-white py-2 m-2 rounded-lg'
//             style={{ color: "white", padding: 10 }}
//             onChangeText={setAddress}
//             value={address}
//           />
//         </View>

//         {/* Pay Now button */}
//         <TouchableOpacity
//           className={`m-2 w-full px-2 rounded-lg ${!isAddressFilled || setupInProgress ? 'bg-[#333333]' : 'bg-[#7E57C2]'}`}
//           // Disable button if address is not filled OR if setup is currently running
//           disabled={!isAddressFilled || setupInProgress}
//           onPress={handlePayNow} 
//         >
//           <Text className="text-xl text-white font-instrumentSansBold text-center p-3 ">
//             {!isAddressFilled 
//               ? 'Enter Address' 
//               : setupInProgress 
//                 ? 'Setting up...' 
//                 : 'Pay Now'}
//           </Text>
//         </TouchableOpacity>

//         {/* Retry button - Explicitly force a setup refresh */}
//         <TouchableOpacity
//           className='mt-4'
//           onPress={initializePaymentSheet}
//           disabled={setupInProgress} // Disable if a setup is already running
//         >
//           <Text className={`text-center font-instrumentRegular ${setupInProgress ? 'text-[#ADAEBC]' : 'text-[#7E57C2]'}`}>
//             {setupInProgress ? 'Setup Running...' : 'Force Retry Setup'}
//           </Text>
//         </TouchableOpacity>


//       </View>
//     </View>
//   );
// }



// ---------------








// import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';
// import { useAppSelector } from 'src/redux/hooks';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Feather } from '@expo/vector-icons';
// import { usePostPaymentToStripeMutation } from 'src/redux/features/payment/paymentApi';

// // Define the nameStatus object used for status display if needed elsewhere
// // const nameStatus = { /* ... your status mapping here ... */ }; 

// export default function PaymentScreen() {
//   const route = useRoute();
//   // Ensure we parse amounts to numbers for safe calculation
//   const totalAmount = parseFloat(route.params.total || 0);
//   const shippingFee = parseFloat(route.params.shiping || 0);
//   const finalTotal = (totalAmount + shippingFee).toFixed(2);

//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   // 'loading' tracks if the button is ENABLED (Stripe setup complete)
//   const [loading, setLoading] = useState(false);
//   // 'setupInProgress' tracks if network fetch or initPaymentSheet is running
//   const [setupInProgress, setSetupInProgress] = useState(false);
//   const [status, setStatus] = useState('Enter your address details to pay.');
  
//   // Address State
//   const [name, setName] = useState('John Doe'); // Initial dummy data for testing
//   const [contact, setContact] = useState('5551234567');
//   const [address, setAddress] = useState('123 Main St, Apt 4B');

//   const token = useAppSelector((state) => state.auth.token);
//   const navigation = useNavigation();
//   const [postStrip] = usePostPaymentToStripeMutation();

//   // Check if all address fields are filled
//   const isAddressFilled = name.trim() !== '' && contact.trim() !== '' && address.trim() !== '';


//   // --- HEADER SETUP ---
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerStyle: { backgroundColor: "#121212", elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
//       headerTitle: () => null,
//       headerLeft: () => (
//         <TouchableOpacity className="flex-row gap-2 items-center mx-2" onPress={() => navigation.goBack()}>
//           <Feather name="arrow-left-circle" size={24} color="white" />
//           <Text className="font-instrumentSansBold text-white text-2xl">Checkout</Text>
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   // --- 1. FETCH PAYMENT SHEET PARAMS FROM SERVER ---
//   const fetchPaymentSheetParams = useCallback(async () => {
//     try {
//       setStatus('Connecting to server...');
      
//       const body = {
//         data: {
//           amount: finalTotal, // Sending the total including shipping
//           address: {
//             name: name.trim(),
//             contact: contact.trim(),
//             spotDetails: address.trim()
//           }
//         }
//       };
      
//       const response = await postStrip({ token, body }).unwrap();

//       setStatus('Payment data received from server');

//       if (response?.data?.paymentIntent && response.data.ephemeralKey && response.data.customer) {
//         return {
//           paymentIntent: response.data.paymentIntent,
//           ephemeralKey: response.data.ephemeralKey,
//           customer: response.data.customer,
//         };
//       }
//       throw new Error("Server did not return all required Stripe keys.");

//     } catch (error) {
//       console.error('❌ FETCH ERROR:', error);
//       setStatus(`Connection failed.`);
//       throw error; 
//     }
//   }, [finalTotal, name, contact, address, token, postStrip]); 

//   // --- 2. INITIALIZE PAYMENT SHEET ---
//   const initializePaymentSheet = useCallback(async () => {
//     if (!isAddressFilled || setupInProgress) return false;

//     setLoading(false); 
//     setSetupInProgress(true);
//     setStatus('Setting up payment...');

//     try {
//       const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//       setStatus('Preparing payment sheet...');

//       const { error } = await initPaymentSheet({
//         merchantDisplayName: "Your App Name",
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: paymentIntent,
//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: name,
//         },
//         style: 'alwaysDark',
//         returnURL: 'staark://payment-complete',
//         // 💥 CRASH FIX: Required for native module initialization
//         customFlow: false, 
//       });

//       setSetupInProgress(false);
      
//       if (error) {
//         console.error('❌ Stripe Init Error:', error);
//         setStatus(`Setup failed: ${error.message}`);
//         Alert.alert('Setup Error', error.message);
//         return false; 
//       } else {
//         setStatus('Ready to pay! 🎉');
//         setLoading(true); // Enable the pay button
//         return true; 
//       }
//     } catch (error) {
//       setSetupInProgress(false);
//       setLoading(false);
//       return false;
//     }
//   }, [fetchPaymentSheetParams, initPaymentSheet, name, isAddressFilled, setupInProgress]);

//   // --- 3. OPEN PAYMENT SHEET ---
//   const openPaymentSheet = async () => {
//     setLoading(false); 
//     setStatus('Processing payment...');

//     // 🔑 FIX: Destructure the expected return values (error, paymentIntent, paymentMethod)
//     const { error, paymentIntent, paymentMethod } = await presentPaymentSheet(); 

//     if (error) {
//       console.error('❌ Payment error:', error);
//       setStatus('Ready to pay! 🎉'); 
//       Alert.alert(`Payment Failed`, error.message);
//       setLoading(true); // Re-enable for retry
//     } else {
//       // This block executes if the payment was successful (or user completed the flow)
//       console.log('✅ Payment successful!', paymentIntent, paymentMethod);
//       setStatus('Payment successful! ✅');
      
//       // Navigate inside the Alert's onPress handler to ensure the navigation 
//       // is executed cleanly after the user acknowledges the success.
//       Alert.alert(
//           'Payment Successful!',
//           'Thank you for your purchase.',
//           [{ text: 'OK', onPress: () => navigation.navigate("BottomScreen", { brand: "Brand" })}] 
//       );
      
//       setLoading(false); 
//     }
// }

//   // --- AUTOMATIC SETUP TRIGGER (FIXING THE BUTTON ENABLE ISSUE) ---
//   useEffect(() => {
//     // Start setup if the address is filled AND we haven't successfully loaded it yet.
//     if (isAddressFilled && !loading && !setupInProgress) {
//         console.log('--- Address filled: Triggering setup automatically ---');
//         initializePaymentSheet();
//     }
//   }, [isAddressFilled, loading, setupInProgress, initializePaymentSheet]);


//   // --- HANDLE PAY NOW BUTTON PRESS ---
//   const handlePayNow = async () => {
//     if (!isAddressFilled) {
//         Alert.alert('Missing Details', 'Please fill in your name, contact, and address before proceeding.');
//         return;
//     }
    
//     // If setup is complete, proceed to pay
//     if (loading) {
//         await openPaymentSheet();
//     } 
//     // If setup is not complete, attempt to start it (this is a fallback, useEffect should handle this)
//     else if (!setupInProgress) {
//         const setupSuccessful = await initializePaymentSheet();
//         if (setupSuccessful) {
//             await openPaymentSheet();
//         }
//     }
//     // If setup is in progress, do nothing
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
        
//         {/* Summary Views */}
//         <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
//           <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Subtotal</Text>
//           <Text className=" mx-2 text-sm text-white font-instrumentRegular">${totalAmount.toFixed(2)}</Text>
//         </View>
//         <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
//           <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Shipping</Text>
//           <Text className=" mx-2 text-sm text-white font-instrumentRegular">${shippingFee.toFixed(2)}</Text>
//         </View>
//         <View className="border border-dashed border-[#E2E2E2] mx-2 w-full" style={styles.divider} />
//         <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
//           <Text className=" text-lg text-white font-instrumentSansBold">Total</Text>
//           <Text className=" mx-2 text-lg text-white font-instrumentSansBold">${finalTotal}</Text>
//         </View>

//         {/* Status indicator */}
//         <View className='my-2 w-full'>
//           <Text className='text-[#ADAEBC] font-instrumentRegular'>{status}</Text>
//         </View>

//         {/* Address Inputs */}
//         <Text className='p-2 m-2 text-white font-interBold text-2xl w-full'>Address</Text>
//         <View className='p-2 m-2 w-full'>
//           <TextInput
//             placeholder='Enter your name'
//             placeholderTextColor={"#ADAEBC"}
//             className='border border-white py-2 m-2 rounded-lg'
//             style={styles.textInput}
//             onChangeText={setName}
//             value={name}
//           />
//           <TextInput
//             placeholder='Enter your number'
//             placeholderTextColor={"#ADAEBC"}
//             className='border border-white py-2 m-2 rounded-lg'
//             style={styles.textInput}
//             onChangeText={setContact}
//             value={contact}
//             keyboardType='phone-pad'
//           />
//           <TextInput
//             placeholder='Enter your address'
//             placeholderTextColor={"#ADAEBC"}
//             className='border border-white py-2 m-2 rounded-lg'
//             style={styles.textInput}
//             onChangeText={setAddress}
//             value={address}
//           />
//         </View>

//         {/* Pay Now button */}
//         <TouchableOpacity
//           className={`m-2 w-full px-2 rounded-lg 
//             ${isAddressFilled && loading 
//               ? 'bg-[#7E57C2]' 
//               : 'bg-[#333333]'}`
//           }
//           disabled={!isAddressFilled || setupInProgress || !loading}
//           onPress={handlePayNow} 
//         >
//           <Text className="text-xl text-white font-instrumentSansBold text-center p-3 ">
//             {!isAddressFilled 
//               ? 'Enter Address' 
//               : setupInProgress 
//                 ? <ActivityIndicator size="small" color="#fff" />
//                 : 'Pay Now'}
//           </Text>
//         </TouchableOpacity>

//         {/* Retry button */}
//         <TouchableOpacity
//           className='mt-4'
//           onPress={initializePaymentSheet}
//           disabled={setupInProgress}
//         >
//           <Text className={`text-center font-instrumentRegular ${setupInProgress ? 'text-[#ADAEBC]' : 'text-[#7E57C2]'}`}>
//             {setupInProgress ? 'Setup Running...' : 'Retry Payment Setup'}
//           </Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//     },
//     scrollContent: {
//         padding: 12,
//         alignItems: 'center',
//     },
//     divider: {
//         borderWidth: 0.5,
//         borderColor: '#E2E2E2',
//     },
//     textInput: {
//         color: "white", 
//         padding: 10,
//         backgroundColor: '#121212', // Ensure background matches view if needed
//     }
// });


// -----------


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
  const shippingFee = parseFloat(route.params.shiping || 0);
  const finalTotal = (totalAmount + shippingFee).toFixed(2);

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
          amount: finalTotal, 
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
  }, [finalTotal, name, contact, address, token, postStrip]); 

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
        <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
          <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">Shipping</Text>
          <Text className=" mx-2 text-sm text-white font-instrumentRegular">${shippingFee.toFixed(2)}</Text>
        </View>
        <View className="border border-dashed border-[#E2E2E2] mx-2 w-full" style={styles.divider} />
        <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2 w-full">
          <Text className=" text-lg text-white font-instrumentSansBold">Total</Text>
          <Text className=" mx-2 text-lg text-white font-instrumentSansBold">${finalTotal}</Text>
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