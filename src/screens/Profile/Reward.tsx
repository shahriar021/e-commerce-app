import { View, Text, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'
import { useAppSelector } from 'src/redux/hooks'
import { useGetRewardBalanceQuery, useGetRewardHistoryQuery, useGetRewardOnboardingStatusQuery, useInitialPostRewardMutation, usePostRewardMutation } from 'src/redux/features/payment/paymentApi'
import { WithdrawInitResponse } from 'src/types/withdraw'
import { LinearGradient } from 'expo-linear-gradient'
import RewardHistoryRedeem from 'src/components/ui/reward/HistoryAndRedeem'
import StripeOnboardingModal from 'src/components/ui/reward/StripeOnboardingModal'
import { useStripeOnboardingFlow } from 'src/hooks/useStripeOnboardingFlow'

const Reward = () => {
    const token = useAppSelector(state => state.auth.token)
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState('Pending');
    const [postReward, { isLoading: redeemLoading }] = usePostRewardMutation()
    const { data: getRewardBalance } = useGetRewardBalanceQuery(token)
    const { data: getRewarHistory } = useGetRewardHistoryQuery(token)

    const [triggerWithdraw, { data, isLoading: initLoading }] =
        useInitialPostRewardMutation();

    const initData = data as WithdrawInitResponse | undefined;

    const onboardingUrl = initData?.data?.onboarding_url ?? "";
    const stripeAccountId = initData?.data?.stripe_account_id ?? "";
    const [webVisible, setWebVisible] = useState(false);
    const [pollingEnabled, setPollingEnabled] = useState(false);
    const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

    const {
        data: statusData,
        isFetching: statusFetching,
        refetch: refetchStatus,
    } = useGetRewardOnboardingStatusQuery(
        { token, stripe_account_id: stripeAccountId },
        { skip: !token || !stripeAccountId || !pollingEnabled }
    );

    const onboardingCompleted = useMemo(() => {
        return Boolean((statusData as any)?.data?.onboarding_completed);
    }, [statusData]);

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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle: 'instrumentSans-Bold',
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const handleRedeem = async () => {
        if (!token) {
            Alert.alert("Error", "Token missing");
            return;
        }

        try {
            const res = await postReward(token).unwrap();
            Alert.alert("Success", res?.message ?? "Redeem successful");
        } catch (err: any) {
            Alert.alert("Failed", err?.data?.message ?? "Redeem failed");
        }
    };

    if (!token) {
        return (
            <View className="flex-1 items-center justify-center bg-[#121212]">
                <Text className="text-white">Loading Token...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#121212", padding: 12 }}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <StripeOnboardingModal
                visible={webVisible}
                onClose={closeWeb}
                onboardingUrl={onboardingUrl}
                statusFetching={statusFetching}
            />

            {!!onboardingUrl && (
                <View className="w-full mt-3 rounded-lg overflow-hidden">
                    <LinearGradient
                        colors={["#1D3725", "#0F2417"]}
                        style={{ padding: 12 }}
                    >
                        <Text className="text-white font-instrumentSansSemiBold">
                            Reward Setup Required
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

            <Text className='text-white text-3xl mt-4 font-instrumentSansBold'>{getRewardBalance?.data?.availableRewards || 0} pts</Text>
            <Text className='text-white text-3xl mt-4 font-instrumentSansBold'>{getRewardBalance?.data?.redeemableAmount || 0} $</Text>
            <Text className='text-[#6d6363] text-xl mt-1 font-instrumentSansSemiBold'>{getRewardBalance?.data?.conversionRate}</Text>

            <View
                className="border border-white mt-5 rounded-lg overflow-hidden p-1"
                style={{ width: scale(300), height: verticalScale(450) }}
            >
                <View className="flex-row">
                    <TouchableOpacity
                        className="flex-1 items-center border-r border-r-white border-b border-b-white p-3"
                        style={{
                            backgroundColor: activeTab === 'Pending' ? '#fff' : '#1D3725',
                        }}
                        onPress={() => setActiveTab('Pending')}
                    >
                        <Text className='font-instrumentSansSemiBold' style={{ color: activeTab === 'Pending' ? '#000' : '#fff' }}>
                            History
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 items-center border-b border-b-white p-3"
                        style={{
                            backgroundColor: activeTab === 'Activity' ? '#fff' : '#1D3725',
                        }}
                        onPress={() => setActiveTab('Activity')}
                    >
                        <Text className='font-instrumentSansSemiBold' style={{ color: activeTab === 'Activity' ? '#000' : '#fff' }}>
                            Activity
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* this section is for history and redeem */}
                <RewardHistoryRedeem
                    activeTab={activeTab as "Pending" | "Activity"}
                    redemptions={getRewarHistory?.data?.redemptions ?? []}
                    redeemLoading={redeemLoading}
                    onRedeem={handleRedeem}
                />
            </View>
        </ScrollView>
    )
}

export default Reward