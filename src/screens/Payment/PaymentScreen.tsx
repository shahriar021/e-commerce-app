import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useStripe, CardField } from '@stripe/stripe-react-native'; // Import CardField to capture card details
import { useAppSelector } from 'src/redux/hooks';

const API_URL = process.env.BASE_URL; // Android emulator

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Initializing...');
  const [cardDetails, setCardDetails] = useState(null);  // For storing card details input
  const token=useAppSelector((state)=>state.auth.token)

  // Fetch Payment Sheet Params from server
  const fetchPaymentSheetParams = async () => {
    try {
      console.log('🔵 Fetching payment sheet params...');
      setStatus('Connecting to server...');
      
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response,"payment")

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Got server response',data);
      setStatus('Payment data received');

      console.log(data,"---")
      
      if (data && data.data) {
      return {
        paymentIntent: data.data.paymentIntent,
        ephemeralKey: data.data.ephemeralKey,
        customer: data.data.customer,
      };
    }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setStatus(`Connection error: ${error.message}`);
      throw error;
    }
  };

  // Initialize the Payment Sheet
  const initializePaymentSheet = async () => {
    try {
      setStatus('Setting up payment...');
      
      const { paymentIntent, ephemeralKey, customer } = 
        await fetchPaymentSheetParams();

        console.log(paymentIntent, ephemeralKey, customer,"these are coming from fetchpayment ")

      console.log('🔵 Initializing payment sheet...');
      setStatus('Preparing payment sheet...');

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Your App Name",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Customer Name',
        },
        style: 'alwaysDark', // or 'alwaysLight'
        returnURL: 'com.sta.ark://',
      });
      
      if (error) {
        console.error('❌ Payment sheet init error:', error);
        setStatus(`Setup failed: ${error.message}`);
        Alert.alert('Setup Error', error.message);
      } else {
        console.log('✅ Payment sheet ready');
        setStatus('Ready to pay! 🎉');
        setLoading(true); // Enable the pay button
      }
    } catch (error) {
      console.error('❌ Initialize error:', error);
      setStatus(`Setup failed: ${error.message}`);
      Alert.alert('Payment Setup Failed', error.message);
    }
  };

  // Open the Payment Sheet for processing payment
  const openPaymentSheet = async () => {
    console.log('🔵 Opening payment sheet...');
    setStatus('Processing payment...');
    
    const { error } = await presentPaymentSheet();

    if (error) {
      console.error('❌ Payment error:', error);
      setStatus('Ready to pay! 🎉');
      Alert.alert(`Payment Failed`, error.message);
    } else {
      console.log('✅ Payment successful!');
      setStatus('Payment successful! ✅');
      Alert.alert(
        'Payment Successful!', 
        'Thank you for your purchase. You will receive a confirmation email shortly.',
        [{ text: 'OK', onPress: () => setStatus('Ready for next payment! 🎉') }]
      );
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Secure Checkout</Text>
        <Text style={styles.amount}>$10.99</Text>
        <Text style={styles.description}>Premium Subscription</Text>
        
        {/* Status indicator */}
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{status}</Text>
        </View>
        
        {/* CardField Input for card details */}
        <CardField
          postalCodeEnabled={false}
          placeholder={{ number: '4242 4242 4242 4242' }}
          cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
          style={{ height: 50, marginVertical: 20 }}
          onCardChange={(details) => setCardDetails(details)}
        />

        {/* Pay Now button */}
        <TouchableOpacity
          style={[styles.button, !loading && styles.disabled]}
          disabled={!loading}
          onPress={openPaymentSheet}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Pay Now' : 'Setting up...'}
          </Text>
        </TouchableOpacity>

        {/* Retry button for debugging */}
        <TouchableOpacity
          style={styles.retryButton}
          onPress={initializePaymentSheet}
        >
          <Text style={styles.retryButtonText}>Retry Setup</Text>
        </TouchableOpacity>

        {/* Test Card Info */}
        <View style={styles.testCard}>
          <Text style={styles.testTitle}>Test Card (Development)</Text>
          <Text style={styles.testText}>4242 4242 4242 4242</Text>
          <Text style={styles.testText}>Use any future expiry date and CVC</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  amount: {
    fontSize: 36,
    fontWeight: '600',
    color: '#5469d4',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  statusContainer: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  status: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#5469d4',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 16,
    minWidth: 200,
    shadowColor: '#5469d4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabled: {
    backgroundColor: '#bbb',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 32,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  testCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  testTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  testText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});


