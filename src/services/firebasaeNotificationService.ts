import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';

const requestPermissionAndGetToken = async () => {
  try {
    // Request permission for notifications (iOS)
    await messaging().requestPermission();
    console.log('Notification permission granted');

    // Get the FCM token
    const fcToken = await messaging().getToken();
    console.log('FCM Token:', fcToken);

    return fcToken; // Return the token
  } catch (error) {
    console.log('Notification permission denied:', error);
    return null;
  }
};

const sendFCMTokenToBackend = async (fcToken: string) => {
  if (fcToken) {
    const payload = {
      data: {
        token: fcToken,
        device: 'Device info', // Optional: Add any device information you need to send
      },
    };

    console.log('Payload for Backend:', payload);

    try {
      // Example API call to sync the token with the backend
      const res = await postNotiRegis({ token: fcToken, body: payload }).unwrap();
      // console.log('FCM Token synced with backend', res);
    } catch (err) {
      // console.error('Failed to sync FCM token', err);
    }
  }
};

const handleForegroundNotifications = () => {
  return messaging().onMessage(async (remoteMessage) => {
    // console.log('Foreground message:', remoteMessage);

    // Display the notification using expo-notifications
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Trigger the notification immediately
    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      },
      trigger: { seconds: 1 }, // Show immediately
    });
  });
};

const handleBackgroundNotifications = () => {
  return messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Background message:', remoteMessage);
    // Optionally handle background notifications here
  });
};

const handleNotificationResponse = () => {
  Notifications.addNotificationResponseReceivedListener((response) => {
    // console.log('User tapped the notification:', response);
    // You can navigate or perform any action when the user taps the notification
  });
};

export const FirebaseNotificationService = {
  requestPermissionAndGetToken,
  sendFCMTokenToBackend,
  handleForegroundNotifications,
  handleBackgroundNotifications,
  handleNotificationResponse,
};
