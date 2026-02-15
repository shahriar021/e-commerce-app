import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Modal, Linking, Alert, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { useAppSelector } from "src/redux/hooks";
import {
    useInitialPostWithdrawMutation,
    useGetWithdrawOnboardingStatusQuery,
    usePostWithdrawMutation,
} from "src/redux/features/payment/paymentApi";
import { useGetEarningStatsQuery } from "src/redux/features/earning/earningApi";
import { WithdrawInitResponse } from "src/types/withdraw";

const Withdraw = () => {
    const navigation = useNavigation<any>();
    const token = useAppSelector((state) => state.auth.token);
    const { data: getEarningStats } = useGetEarningStatsQuery(token);
    const [postWithdraw, { isLoading: withdrawLoading }] = usePostWithdrawMutation()
    const [triggerWithdraw, { data, isLoading: initLoading }] =
        useInitialPostWithdrawMutation();

    const initData = data as WithdrawInitResponse | undefined;

    const onboardingUrl = initData?.data?.onboarding_url ?? "";
    const stripeAccountId = initData?.data?.stripe_account_id ?? "";

    const [amount, setAmount] = useState<string>("");
    const [webVisible, setWebVisible] = useState(false);
    const [pollingEnabled, setPollingEnabled] = useState(false);

    const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

    const {
        data: statusData,
        isFetching: statusFetching,
        refetch: refetchStatus,
    } = useGetWithdrawOnboardingStatusQuery(
        { token, stripe_account_id: stripeAccountId },
        { skip: !token || !stripeAccountId || !pollingEnabled }
    );

    const onboardingCompleted = useMemo(() => {
        return Boolean((statusData as any)?.data?.onboarding_completed);
    }, [statusData]);

    const withdrawReady = Boolean((statusData as any)?.data?.onboarding_completed);

    useEffect(() => {
        if (token) {
            triggerWithdraw(token)
                .unwrap()
                .catch((err: any) => {
                    console.error("Mutation Error:", err);
                    Alert.alert("Error", "Failed to start withdraw onboarding.");
                });
        }
    }, [token, triggerWithdraw]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitle: "Withdraw",
            headerTitleAlign: "start",
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "instrumentSans-Bold",
                fontSize: 20,
                color: "white",
            },
            headerLeft: () => (
                <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (!pollingEnabled) return;

        // immediate first fetch
        refetchStatus();

        pollTimerRef.current = setInterval(() => {
            refetchStatus();
        }, 3000);

        return () => {
            if (pollTimerRef.current) clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
        };
    }, [pollingEnabled, refetchStatus]);

    useEffect(() => {
        if (pollingEnabled && onboardingCompleted) {
            setPollingEnabled(false);
            setWebVisible(false);
            Alert.alert("Success", "Onboarding completed!");
        }
    }, [pollingEnabled, onboardingCompleted]);

    const openOnboarding = async () => {
        if (!onboardingUrl) {
            Alert.alert("Missing URL", "Onboarding URL not found yet.");
            return;
        }

        // Prefer in-app webview
        setWebVisible(true);
        setPollingEnabled(true);
    };

    const closeWeb = () => {
        setPollingEnabled(false);
        setWebVisible(false);
    };

    const openExternally = async () => {
        if (!onboardingUrl) return;
        const canOpen = await Linking.canOpenURL(onboardingUrl);
        if (!canOpen) {
            Alert.alert("Can't open link", "This URL cannot be opened on your device.");
            return;
        }
        Linking.openURL(onboardingUrl);
    };

    if (!token) {
        return (
            <View className="flex-1 items-center justify-center bg-[#121212]">
                <Text className="text-white">Loading Token...</Text>
            </View>
        );
    }

    const handleWithdraw = async () => {

        if (!withdrawReady) {
            Alert.alert("Not ready", "Complete onboarding first");
            return;
        }

        if (!amount) {
            Alert.alert("Error", "Enter amount");
            return;
        }

        try {

            const response = await postWithdraw({
                token,
                body: {
                    "data": {
                        "amount": Number(amount)
                    }
                }
            }).unwrap();

            Alert.alert("Success", response?.message || "Withdraw successful");

        } catch (error: any) {

            Alert.alert(
                "Error",
                error?.data?.message || "Withdraw failed"
            );

        }
    };
    console.log(getEarningStats?.data,"--")

    return (
        <>
            {/* ✅ WebView Modal */}
            <Modal visible={webVisible} animationType="slide" onRequestClose={closeWeb}>
                <View style={{ flex: 1, backgroundColor: "#121212" }}>
                    <View
                        style={{
                            height: 56,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottomWidth: 1,
                            borderBottomColor: "#2C2C2C",
                        }}
                    >
                        <TouchableOpacity onPress={closeWeb} style={{ padding: 6 }}>
                            <Feather name="x" size={24} color="white" />
                        </TouchableOpacity>

                        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                            Stripe Onboarding
                        </Text>

                        <View style={{ width: 30 }} />
                    </View>

                    {/* polling status indicator */}
                    <View
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#2C2C2C",
                        }}
                    >
                        {statusFetching ? (
                            <ActivityIndicator size="small" color="#4ADE80" />
                        ) : (
                            <View
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 999,
                                    backgroundColor: "#4ADE80",
                                }}
                            />
                        )}
                        <Text style={{ color: "#DCF3FF" }}>
                            Checking onboarding status...
                        </Text>
                    </View>

                    <WebView
                        source={{ uri: onboardingUrl }}
                        startInLoadingState
                        renderLoading={() => (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <ActivityIndicator size="large" color="#4ADE80" />
                                <Text style={{ color: "white", marginTop: 10 }}>
                                    Loading onboarding...
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </Modal>

            {/* ✅ Main Screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 items-center p-3 bg-[#121212]">
                        <View className="rounded-lg overflow-hidden w-full">
                            <LinearGradient
                                colors={["#212121", "#212121"]}
                                style={{ padding: 10 }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View className="flex-row justify-between items-center">
                                    <Image source={require("../../../assets/e-icon/Wallet.png")} />
                                    <Text className="text-[#4ADE80] font-instrumentRegular">
                                        Available
                                    </Text>
                                </View>
                                <Text className="text-white text-xl mt-2 font-instrumentSansSemiBold">
                                    ৳{getEarningStats?.data?.available}
                                </Text>
                                <Text className="text-[#DCF3FF] font-instrumentRegular">
                                    For Withdrawal
                                </Text>
                            </LinearGradient>
                        </View>

                        {/* ✅ Clickable onboarding section (shows when url exists) */}
                        {!!onboardingUrl && (
                            <View className="w-full mt-3 rounded-lg overflow-hidden">
                                <LinearGradient
                                    colors={["#1D3725", "#0F2417"]}
                                    style={{ padding: 12 }}
                                >
                                    <Text className="text-white font-instrumentSansSemiBold">
                                        Withdraw Setup Required
                                    </Text>

                                    <Text className="text-[#DCF3FF] mt-1">
                                        Tap below to complete Stripe onboarding.
                                    </Text>

                                    <TouchableOpacity
                                        onPress={openOnboarding}
                                        style={{
                                            marginTop: 10,
                                            backgroundColor: "#4ADE80",
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            alignItems: "center",
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={{ color: "#0B1410", fontWeight: "700" }}>
                                            Open Onboarding
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Optional: open in external browser */}
                                    <TouchableOpacity onPress={openExternally} activeOpacity={0.8}>
                                        <Text
                                            style={{
                                                color: "#9AE6B4",
                                                marginTop: 10,
                                                textDecorationLine: "underline",
                                            }}
                                            numberOfLines={1}
                                        >
                                            {onboardingUrl}
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )}

                        <View className="w-full mt-3 mb-2">
                            <Text className="text-[#fff] font-instrumentSansSemiBold">Amounts</Text>
                            <TextInput
                                className="mt-1 bg-[#2C2C2C] p-3 rounded-lg"
                                placeholder="$1"
                                style={{ color: "#ADAEBC" }}
                                placeholderTextColor={"#fff"}
                                onChangeText={setAmount}
                                value={amount}
                                keyboardType="numeric"
                            />
                        </View>



                        <TouchableOpacity
                            className="bg-[#1D3725] p-2 items-center rounded-lg mt-4 w-full"
                            activeOpacity={0.85}
                            onPress={handleWithdraw}
                            disabled={!withdrawReady || withdrawLoading}
                            style={{
                                opacity: (!withdrawReady || withdrawLoading) ? 0.5 : 1
                            }}
                        >
                            {withdrawLoading ? (
                                <ActivityIndicator size="small" color="#4ADE80" />
                            ) : (
                                <Text className="text-white font-instrumentSansSemiBold text-center text-xl">
                                    Withdraw
                                </Text>
                            )}
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default Withdraw;
