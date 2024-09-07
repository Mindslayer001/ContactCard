import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./../Screens/HomeScreen";
import ProfileScreen from "./../Screens/ProfileScreen";
import Scanner from "../Screens/Scanner";
import Colors from "../Utils/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";  // Consolidated import

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,  // Active tint color for selected tab
        tabBarInactiveTintColor: Colors.GRAY,  // Inactive tint color for unselected tabs
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />  // Dynamic size
          ),
          tabBarLabel: 'Home',  // Simplified label
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="qr-code-scanner" size={size} color={color} />  // Dynamic size
          ),
          tabBarLabel: 'QR Scanner',  // Simplified label
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />  // Dynamic size
          ),
          tabBarLabel: 'My Profile',  // Simplified label
        }}
      />
    </Tab.Navigator>
  );
}
