import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    SomeScreen: undefined; 
    AnotherScreen: { param: string }; 
    "table Order": { info: any }; 
  };

export type Navigation = {
  navigation: NavigationProp<RootStackParamList>;
};