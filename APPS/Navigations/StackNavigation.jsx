import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation'; // Import the TabNavigation component

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
