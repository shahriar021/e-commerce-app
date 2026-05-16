// useRequireAuth.ts
import { setGuestMode } from "src/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/redux/hooks";
import { Alert } from "react-native";

export const useRequireAuth = () => {
  const token = useAppSelector((state) => state.auth.token);
  const isGuest = useAppSelector((state) => state.auth.isGuest);
  const dispatch = useDispatch();

  const requireAuth = (action: () => void) => {
    if (!token && isGuest) {
      Alert.alert(
        "Login Required",
        "Please login to continue",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Login", 
            onPress: () => dispatch(setGuestMode(false)) 
          }
        ]
      );
    } else {
      action();
    }
  };

  return requireAuth;
};