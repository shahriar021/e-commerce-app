declare module 'expo-barcode-generator' {
    import { FC } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface BarcodeOptions {
      format?: string;
      background?: string;
      width?: number;
      // Add other props here based on the full options structure
    }
  
    interface BarcodeProps {
      value: string;
      options?: BarcodeOptions;
      rotation?: number;
      style?: ViewStyle;
    }
  
    export const Barcode: FC<BarcodeProps>; // <-- change to named export
  }
  