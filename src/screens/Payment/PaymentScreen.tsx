import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { usePostPaymentToStripeMutation } from "src/redux/features/payment/paymentApi";
import { baseApi } from "src/redux/createdApi/baseApi";

export default function PaymentScreen() {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const totalAmount = parseFloat(route.params?.total || 0);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation<any>();
  const token = useAppSelector((state) => state.auth.token);

  const [postStrip] = usePostPaymentToStripeMutation();

  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("Enter your address to continue.");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const isAddressFilled =
    name.trim() !== "" &&
    contact.trim() !== "" &&
    address.trim() !== "";

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
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left-circle" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchPaymentSheetParams = async () => {
    const body = {
      data: {
        amount: totalAmount,
        address: {
          name: name.trim(),
          contact: contact.trim(),
          spotDetails: address.trim(),
        },
      },
    };

    const response = await postStrip({ token, body }).unwrap();

    if (
      response?.data?.paymentIntent &&
      response?.data?.ephemeralKey &&
      response?.data?.customer
    ) {
      return {
        paymentIntent: response.data.paymentIntent,
        ephemeralKey: response.data.ephemeralKey,
        customer: response.data.customer,
      };
    }

    throw new Error("Invalid Stripe response from backend");
  };

  const handlePayNow = async () => {
    if (!isAddressFilled) {
      Alert.alert("Missing Info", "Please fill all address fields.");
      return;
    }

    try {
      setProcessing(true);
      setStatus("Connecting to payment server...");

      // 1️⃣ Fetch Stripe keys
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      setStatus("Initializing payment sheet...");

      // 2️⃣ Initialize PaymentSheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Your App Name",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: name,
        },
        returnURL: "staark://payment-complete",
        customFlow: false,
      });

      if (initError) {
        Alert.alert("Setup Error", initError.message);
        setProcessing(false);
        return;
      }

      setStatus("Opening payment sheet...");

      // 3️⃣ Present PaymentSheet
      // const { error: presentError } = await presentPaymentSheet();

      // if (presentError) {
      //   Alert.alert("Payment Failed", presentError.message);
      //   setProcessing(false);
      //   setStatus("Payment cancelled or failed.");
      //   return;
      // }
      try {
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
          if (presentError.code === 'Canceled') {
            setStatus('Payment cancelled.');
          } else {
            Alert.alert("Payment Failed", presentError.message);
          }
          setProcessing(false);
          setStatus("Payment cancelled or failed.");
          return;
        }
      } catch (e) {
        Alert.alert(
          "Payment Unavailable",
          "Payment is temporarily unavailable on this iOS version. Please try again later or contact support."
        );
        setProcessing(false);
        setStatus("Payment unavailable.");
        return;
      }

      // 4️⃣ Success
      setStatus("Payment successful!");
      dispatch(baseApi.util.invalidateTags(["getCart"]));
      Alert.alert("Success", "Payment completed successfully!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("BottomScreen", { brand: "Brand" }),
        },
      ]);
    } catch (err) {

      Alert.alert("Error", "Something went wrong.");
    }

    setProcessing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.totalText}>
          Total: ${totalAmount.toFixed(2)}
        </Text>

        <Text style={styles.status}>{status}</Text>

        <TextInput
          placeholder="Enter Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Enter Contact"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Enter Address"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity
          style={[
            styles.button,
            !isAddressFilled || processing
              ? { backgroundColor: "#333" }
              : { backgroundColor: "#7E57C2" },
          ]}
          disabled={!isAddressFilled || processing}
          onPress={handlePayNow}
        >
          {processing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    padding: 20,
  },
  totalText: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  status: {
    color: "#aaa",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    color: "white",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});