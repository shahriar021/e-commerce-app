
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  'Login Screen': undefined;  // No params
  'Sign Up as Rider':undefined;
  'Sign Up as Brand':undefined;
  'Sign Up as User':undefined;
  'OTP Screen':{Otp:string,Email:string};
  'Reset Password':{atoken:string}
//   'Home Screen': { userId: string };  // User ID required
//   'Profile Screen': { userId: string; editable: boolean };  // Multiple params
  // Add other screens here...
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
