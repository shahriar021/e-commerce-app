import { Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useGetNotificationQuery } from "src/redux/features/notification/notificationApi";

// Configure notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationIcon = ({
  handleNotificationPress,
}: {
  handleNotificationPress: any;
}) => {
  const { data: notificationData } = useGetNotificationQuery(undefined);

  return (
    <TouchableOpacity onPress={handleNotificationPress} className="relative ">
      <Text className="text-[black]">
        <FontAwesome5 name="bell" size={30} />
      </Text>
      {notificationData?.total !== 0 && (
        <Text className="absolute left-4 top-1.5 bg-violet-200 rounded-full text-red-500 font-bold -mt-1 text-[10px] px-0.5">
          {notificationData?.total}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default NotificationIcon;
