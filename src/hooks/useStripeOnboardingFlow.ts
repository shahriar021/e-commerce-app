import { useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";

type UseStripeOnboardingFlowParams = {
  token?: string;
  onboardingUrl?: string;
  stripeAccountId?: string;
  // RTK
  refetchStatus: () => void;
  statusData: any;
};

export function useStripeOnboardingFlow({
  token,
  onboardingUrl,
  stripeAccountId,
  refetchStatus,
  statusData,
}: UseStripeOnboardingFlowParams) {
  const [webVisible, setWebVisible] = useState(false);
  const [pollingEnabled, setPollingEnabled] = useState(false);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const onboardingCompleted = useMemo(() => {
    return Boolean(statusData?.data?.onboarding_completed);
  }, [statusData]);

  // polling
  useEffect(() => {
    if (!pollingEnabled) return;
    if (!token || !stripeAccountId) return;

    refetchStatus();

    pollTimerRef.current = setInterval(() => {
      refetchStatus();
    }, 3000);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    };
  }, [pollingEnabled, token, stripeAccountId, refetchStatus]);

  // auto close when completed
  useEffect(() => {
    if (pollingEnabled && onboardingCompleted) {
      setPollingEnabled(false);
      setWebVisible(false);
      Alert.alert("Success", "Onboarding completed!");
    }
  }, [pollingEnabled, onboardingCompleted]);

  const openOnboarding = () => {
    if (!onboardingUrl) {
      Alert.alert("Missing URL", "Onboarding URL not found yet.");
      return;
    }
    setWebVisible(true);
    setPollingEnabled(true);
  };

  const closeWeb = () => {
    setPollingEnabled(false);
    setWebVisible(false);
  };

  return {
    webVisible,
    pollingEnabled,
    onboardingCompleted,
    openOnboarding,
    closeWeb,
  };
}
