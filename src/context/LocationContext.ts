// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import * as Location from 'expo-location';
// import * as TaskManager from 'expo-task-manager';

// const LOCATION_TASK_NAME = 'background-location-task';

// // ✅ Define TypeScript interface for the context
// interface LocationContextType {
//   tracking: boolean;
//   startTracking: () => Promise<void>;
//   stopTracking: () => Promise<void>;
// }

// // ✅ Fix: Ensure context is properly typed
// export const LocationContext = createContext<LocationContextType | null>(null);

// // ✅ Define the background location tracking task
// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error('Background location error:', error);
//     return;
//   }

//   if (data && 'locations' in data) {
//     const { locations } = data as { locations: Location.LocationObject[] };
//     console.log('📍 Background location:', locations);
//   }
// });

// // ✅ Define LocationProvider with correct TypeScript types
// export const LocationPro    vider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [tracking, setTracking] = useState<boolean>(false);

//   const startTracking = async (): Promise<void> => {
//     const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
//     if (fgStatus !== 'granted') {
//       console.error('Foreground location permission denied');
//       return;
//     }

//     const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
//     if (bgStatus !== 'granted') {
//       console.error('Background location permission denied');
//       return;
//     }

//     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//       accuracy: Location.Accuracy.High,
//       timeInterval: 5000, // Update every 5 seconds
//       distanceInterval: 0, // Every movement
//       showsBackgroundLocationIndicator: true,
//     });

//     setTracking(true);
//     console.log('🚀 Background location tracking started!');
//   };

//   const stopTracking = async (): Promise<void> => {
//     await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
//     setTracking(false);
//     console.log('🛑 Background location tracking stopped!');
//   };

//   return (
//     <LocationContext.Provider value={{ tracking, startTracking, stopTracking }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// // ✅ Fix: Ensure `useLocation()` does null-check for TypeScript safety
// export const useLocation = (): LocationContextType => {
//   const context = useContext(LocationContext);
//   if (!context) {
//     throw new Error('useLocation must be used within a LocationProvider');
//   }
//   return context;
// };
