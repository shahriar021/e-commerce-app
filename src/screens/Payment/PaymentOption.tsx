// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     useWindowDimensions,
//     ActivityIndicator,
// } from "react-native";
// import React, { useEffect, useLayoutEffect, useState } from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
// import PaymentAnimation from "./PaymentAnimation";
// import CardInfoModal from "./CardInfoModal";
// import {
//     useGetSetupIntentQuery,
//     usePostPaymentMutation,
// } from "src/redux/features/payment/paymentApi";
// import { CardField, useStripe } from "@stripe/stripe-react-native";
// import { useAppSelector } from "src/redux/hooks";

// const PaymentOption = () => {
//     const token = useAppSelector((state) => state.auth.token);
//     const route = useRoute();
//     const { total, shiping } = route.params;
//     const navigation = useNavigation();
//     const { width } = useWindowDimensions();
//     const [showModal, setShowModal] = useState(false);
//     const [showModal2, setShowModal2] = useState(false);
//     const [postPayment] = usePostPaymentMutation();
//     const { confirmSetupIntent } = useStripe();
//     const [cardDetails, setCardDetails] = useState(null);
//     const {
//         data: setupIntentData,
//         isLoading,
//         error,
//     } = useGetSetupIntentQuery(token);
//     const [loadings, setLoadings] = useState(false);

//     // 1️⃣ Handle saving the card once we have the SetupIntent
//     const handleSaveCard = async () => {
//         console.log("pressed.")
//         if (!setupIntentData?.clientSecret) return;

//         setLoadings(true);
//         const { setupIntent, error } = await confirmSetupIntent(
//             setupIntentData.clientSecret,
//             { paymentMethodType: "Card" }
//         );
//         setLoadings(false);

//         if (error) {
//             console.error(error);
//             alert("Failed to save card: " + error.message);
//         } else {
//             console.log("Card saved successfully!", setupIntent);
//             alert("Card saved!");
//             // optional: refetch saved cards list from backend here
//         }
//     };

//     console.log(cardDetails, "--");

//     if (isLoading) return <ActivityIndicator size="large" />;

//     if (error) return <Text>Error fetching SetupIntent</Text>;

//     navigation.setOptions({
//         headerStyle: {
//             backgroundColor: "#121212",
//             elevation: 0,
//             shadowOpacity: 0,
//             borderBottomWidth: 0,
//         },
//         headerTitle: () => null,
//         headerLeft: () => (
//             <TouchableOpacity
//                 className="flex-row gap-2 items-center mx-2"
//                 onPress={() => navigation.goBack()}
//             >
//                 <Feather name="arrow-left-circle" size={24} color="white" />
//                 <View className="">
//                     <Text className="font-instrumentSansBold text-white text-2xl">
//                         Checkout
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         ),
//     });

//     const body = {
//         data: {
//             amount: 692.819,
//             address: {
//                 name: "Siam",
//                 contact: "01682130692",
//                 spotDetails: "nothing road, no house, ketiko, Venus",
//             },
//         },
//     };
//     // const handlePayment = async () => {
//     //     console.log(body);
//     //     try {
//     //         const res = await postPayment({ token, body }).unwrap();
//     //         console.log(res);
//     //     } catch (err) {
//     //         console.log("Error:", err);
//     //     }
//     // };

//     return (
//         <View className="bg-[#121212] justify-between p-2 ">
//             <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
//                 <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
//                     Subtotal
//                 </Text>
//                 <Text className=" mx-2 text-sm text-white font-instrumentRegular">
//                     ${total}
//                 </Text>
//             </View>
//             <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
//                 <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
//                     Shipping
//                 </Text>
//                 <Text className=" mx-2 text-sm text-white font-instrumentRegular">
//                     ${shiping}
//                 </Text>
//             </View>

//             <View
//                 className="border border-dashed border-[#E2E2E2] mx-2"
//                 style={{ borderWidth: 1 }}
//             />

//             <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
//                 <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
//                     Total
//                 </Text>
//                 <Text className=" mx-2 text-sm text-white font-instrumentRegular">
//                     ${total}
//                 </Text>
//             </View>
//             <CardField
//                 postalCodeEnabled={false}
//                 placeholder={{ number: "4242 4242 4242 4242" }}
//                 cardStyle={{ backgroundColor: "#FFFFFF", textColor: "#000000" }}
//                 style={{ height: 50, marginVertical: 20 }}
//                 onCardChange={(details) => setCardDetails(details)}
//             />
//             <TouchableOpacity className="m-2 w-full items-end px-2" onPress={handleSaveCard}>
//                 <Text className=" text-xl text-[#ADAEBC] font-instrumentSansBold text-center bg-red-500 p-2 w-[100px] ">
//                     Add Card
//                 </Text>

//             </TouchableOpacity>


//             <View className="p-6 bg-white rounded-xl shadow-xl w-full">
//             <Text className="text-2xl text-gray-900 font-extrabold mb-6">
//                 Mobile Payment Setup
//             </Text>

//             {/* FLEX ROW CONTAINER: Card Input (Flex) and Button (Fixed Width) */}
//             <View className="flex flex-row items-center space-x-3 h-14">

//                 {/* CARD INPUT FIELD (Mocked RN Component) */}
//                 <CardFieldWrapper
//                     onCardChange={(details) => setCardDetails(details)}
//                 />

//                 {/* DEDICATED SAVE BUTTON (TouchableOpacity) */}
//                 <TouchableOpacity 
//                     onPress={handleSaveCard}
//                     disabled={isSaveButtonDisabled}
//                     className={`flex-shrink-0 w-28 h-full rounded-xl transition duration-200 
//                         ${isSaveButtonDisabled 
//                             ? 'bg-gray-300 text-gray-500' 
//                             : 'bg-red-500 hover:bg-red-600 shadow-md'}`}
//                 >
//                     {isSaving ? (
//                         <ActivityIndicator color="#fff" />
//                     ) : isIntentLoading ? (
//                          <Text className="text-white font-semibold text-xs">Loading...</Text>
//                     ) : (
//                         <Text className="font-semibold text-base text-white">
//                             Add Card
//                         </Text>
//                     )}
//                 </TouchableOpacity>
//             </View>

//             {/* Alert and Error messages */}
//             {(intentError || alert.message) && (
//                  <View className={`mt-4 p-3 border rounded-lg text-sm ${alertClasses}`}>
//                     <Text className="text-white text-center font-medium">
//                         {intentError?.message || alert.message}
//                     </Text>
//                 </View>
//             )}
//         </View>

//             {/* card */}
//             <View className="m-2">
//                 <Text className=" text-xl text-[#ADAEBC] font-instrumentSansBold">
//                     Payment
//                 </Text>

//                 <View className="flex-row mt-2 items-center justify-between border border-[#375DF8] rounded-lg p-4 bg-[#2C2C2C]">
//                     <View className="flex-row gap-2">
//                         <Image
//                             source={require("../../../assets/e-icon/logos_visa.png")}
//                             style={{ width: 20, height: 20 }}
//                             resizeMode="contain"
//                         />
//                     </View>
//                     <Text className="font-robotoRegular text-white"> **** 5897</Text>
//                 </View>

//                 <View className="flex-row mt-2 items-center justify-between border border-gray-200 rounded-lg p-4 bg-[#2C2C2C]">
//                     <View className="flex-row gap-2">
//                         <Image
//                             source={require("../../../assets/e-icon/logos_visa.png")}
//                             style={{ width: 20, height: 20 }}
//                             resizeMode="contain"
//                         />
//                     </View>
//                     <Text className="font-robotoRegular text-white"> **** 5897</Text>
//                 </View>

//                 <View className="items-center mt-3">
//                     <TouchableOpacity
//                         className=" items-center mt-3 rounded-lg overflow-hidden bg-[#1D3725] border border-[#DCF3FF] w-full"
//                     // onPress={handlePayment}
//                     >
//                         <Text className="text-[#DCF3FF] p-3 font-instrumentSansBold">
//                             Checkout
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <PaymentAnimation
//                 visible={showModal}
//                 onClose={() => setShowModal(false)}
//             />
//             <CardInfoModal
//                 visible={showModal2}
//                 onClose={() => setShowModal2(false)}
//             />
//         </View>
//     );
// };

// export default PaymentOption;







import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppSelector } from "src/redux/hooks";
import PaymentAnimation from "./PaymentAnimation";
import CardInfoModal from "./CardInfoModal";
import { useGetSetupIntentQuery, usePostPaymentMutation } from "src/redux/features/payment/paymentApi";

const PaymentOption = () => {
    const token = useAppSelector((state) => state.auth.token);
    const route = useRoute();
    const { total, shiping } = route.params;
    const navigation = useNavigation();
    const { confirmSetupIntent } = useStripe();
    const [cardDetails, setCardDetails] = useState(null);
    const [loadings, setLoadings] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const {
        data: setupIntentData,
        isLoading,
        error,
    } = useGetSetupIntentQuery(token);

    console.log(setupIntentData)

    // Handle Save Card
    // const handleSaveCard = async () => {
    //     if (!setupIntentData.data.setupintent_client_secret) {
    //         Alert.alert("Error", "Client Secret is not available.");
    //         return;
    //     }

    //     const clientSecret = setupIntentData.data.setupintent_client_secret;
    // console.log("Client Secret:", clientSecret);
    //     setLoadings(true);

    //     try {
    //         // Confirm the setup intent with the card details
    //         const { setupIntent, error } = await confirmSetupIntent(
    //             clientSecret,
    //             {
    //                 paymentMethodType: "Card",
    //                 paymentMethodData: {
    //                     card: cardDetails,
    //                 },
    //             }
    //         );

    //         setLoadings(false);

    //         if (error) {
    //             // Log error for debugging
    //             console.error("Stripe Error:", error);
    //             Alert.alert("Error", `Failed to save card: ${error.message}`);
    //         } else {
    //             console.log("Card saved successfully!", setupIntent);
    //             Alert.alert("Success", "Card saved successfully!");
    //         }
    //     } catch (err) {
    //         setLoadings(false);
    //         console.error("Unexpected Error:", err);
    //         Alert.alert("Error", "An error occurred while processing the payment.");
    //     }
    // };

    const handleSaveCard = async () => {
        if (!setupIntentData?.data?.setupintent_client_secret) {
            Alert.alert("Error", "Client Secret is not available.");
            return;
        }

        const clientSecret = setupIntentData.data.setupintent_client_secret;
        console.log("Using Client Secret:", clientSecret);  // Log to verify client secret

        setLoadings(true);

        const MAX_RETRIES = 3; // Number of retry attempts
        let attempts = 0;

        const confirmPayment = async () => {
            try {
                // Attempt to confirm the setup intent with the card details
                const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
                    paymentMethodType: "Card",
                    paymentMethodData: {
                        card: cardDetails,
                    },
                });

                setLoadings(false);

                if (error) {
                    // Log error for debugging
                    console.error("Stripe Error:", error);
                    Alert.alert("Error", `Failed to save card: ${error.message}`);
                } else {
                    console.log("Card saved successfully!", setupIntent);
                    Alert.alert("Success", "Card saved successfully!");
                }
            } catch (err) {
                setLoadings(false);
                console.error("Unexpected Error:", err);
                if (attempts < MAX_RETRIES) {
                    attempts += 1;
                    console.log(`Retrying... Attempt ${attempts}`);
                    confirmPayment();  // Retry the payment confirmation
                } else {
                    Alert.alert("Error", "An error occurred while processing the payment.");
                }
            }
        };

        confirmPayment(); // Start the first attempt
    };





    // Handle navigation options
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

    // Loading and error handling
    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Error fetching SetupIntent</Text>;

    return (
        <View className="bg-[#121212] justify-between p-2 ">
            <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
                <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
                    Subtotal
                </Text>
                <Text className=" mx-2 text-sm text-white font-instrumentRegular">
                    ${total}
                </Text>
            </View>

            <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
                <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
                    Shipping
                </Text>
                <Text className=" mx-2 text-sm text-white font-instrumentRegular">
                    ${shiping}
                </Text>
            </View>

            <View
                className="border border-dashed border-[#E2E2E2] mx-2"
                style={{ borderWidth: 1 }}
            />

            <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
                <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
                    Total
                </Text>
                <Text className=" mx-2 text-sm text-white font-instrumentRegular">
                    ${total}
                </Text>
            </View>

            {/* CardField Input */}
            <CardField
                postalCodeEnabled={false}
                placeholder={{ number: "4242 4242 4242 4242" }}
                cardStyle={{ backgroundColor: "#FFFFFF", textColor: "#000000" }}
                style={{ height: 50, marginVertical: 20 }}
                onCardChange={(details) => {
                    console.log("Card Details:", details);
                    setCardDetails(details);
                }}
            />

            {/* Add Card Button */}
            <TouchableOpacity
                className="m-2 w-full items-end px-2"
                onPress={handleSaveCard}
            >
                <Text className="text-xl text-[#ADAEBC] font-instrumentSansBold text-center bg-red-500 p-2 w-[100px]">
                    {loadings ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        "Add Card"
                    )}
                </Text>
            </TouchableOpacity>

            {/* Payment Animation and Modal */}
            <PaymentAnimation visible={showModal} onClose={() => setShowModal(false)} />
            <CardInfoModal visible={showModal2} onClose={() => setShowModal2(false)} />
        </View>
    );
};

export default PaymentOption;

// ----------------


// import React, { useState } from "react";
// import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
// import { useStripe } from "@stripe/stripe-react-native";

// export default function PaymentScreen() {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);

//   // This function gets the clientSecret from your backend
//   const fetchPaymentIntentClientSecret = async () => {
//     // Fetch the clientSecret from your backend (adjust for your actual endpoint)
//     const response = await fetch('https://your-backend-url/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: 2000 }) // Amount in cents (e.g., $20.00)
//     });
//     const { clientSecret } = await response.json();
//     return clientSecret;
//   };

//   const setup = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch the clientSecret from the backend
//       const clientSecret = await fetchPaymentIntentClientSecret();

//       // Initialize the Payment Sheet
//       const { error } = await initPaymentSheet({
//         paymentIntentClientSecret: clientSecret, 
//       });

//       if (error) {
//         Alert.alert("Error", error.message);
//         setLoading(false);
//         return;
//       }

//       // Present the Payment Sheet
//       const { error: presentError } = await presentPaymentSheet();
//       if (presentError) {
//         Alert.alert("Error", presentError.message);
//       } else {
//         Alert.alert("Success", "Payment completed successfully!");
//       }
      
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "An error occurred during payment setup.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Stripe Payment Sheet</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Pay Now" onPress={setup} />
//       )}
//     </View>
//   );
// }




