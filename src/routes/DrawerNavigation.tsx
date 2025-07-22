import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, Profile } from "../screens"; // make sure this exists
import { Feather } from "@expo/vector-icons";
import { View, Text } from 'react-native';
import { CustomDrawerContent } from './CustomeDrawerNavigation';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#252525', // drawer background
                },
                drawerActiveTintColor: '#1A5EED', // active item color
                drawerInactiveTintColor: '#333',  // inactive item color
            }}
        >

            <Drawer.Screen
                name="Profile screen"
                component={Profile}
                options={{
                    headerShown: true,

                    drawerIcon: ({ color }) => (
                        <Feather name="home" size={16} color={color} />
                    ),

                }}
            />
            
        </Drawer.Navigator>
    );
};
