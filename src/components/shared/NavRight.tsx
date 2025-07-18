import React from "react";
import { View} from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useAppDispatch } from "src/redux/hooks";
// import { clearCredentials, logout } from "src/redux/features/auth/authSlice";
// import { useLogoutMutation } from "src/redux/features/auth/authApi";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import NotificationIcon from "./NotificationIcon";
// import { changeNotificationCount } from "src/redux/features/notification/notificationSlice";
// import { baseApi } from "src/redux/createdApi/baseApi";

type RootStackParamList = {
  Notification: any;
};
type NavigationProps = BottomTabScreenProps<RootStackParamList>;

type TProps = {
  routeName?: any;
};

const NavRight = ({ routeName }: TProps) => {
  const navigation = useNavigation<NavigationProps["navigation"]>();
  // const dispatch = useAppDispatch();
  // const [userLogout] = useLogoutMutation();

  // const handleLogout = async () => {
  //   const result = await userLogout(undefined).unwrap();
  //   if (result?.message === "Logout successful") {
  //     dispatch(changeNotificationCount(0));
  //     dispatch(clearCredentials());
  //     dispatch(logout());
  //     dispatch(baseApi.util.invalidateTags(["attendance"]));
  //   }
  // };

  const handleNotificationPress = () => {
    navigation.navigate("Notification");
  };

  return (
    <View className="flex-row items-center gap-5 mr-4 ">
      {routeName !== "Notification" && (
        <NotificationIcon handleNotificationPress={handleNotificationPress} />
      )}
      {/* <TouchableOpacity onPress={handleLogout}>
        <View className="text-white flex-row items-center justify-center gap-1 rounded-lg">
          <Text className="text-center text-pink-400">
            <FontAwesome5 name="power-off" size={23} />
          </Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default NavRight;
