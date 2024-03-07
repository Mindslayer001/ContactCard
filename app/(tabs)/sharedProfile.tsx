import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profiles from '../(modals)/Profiles';
import { ProfileInterface } from '../../constants/profile';
import jsonData from '@/data/shared_details';

const Stack = createStackNavigator();

const TabOneScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profiles" component={ProfileListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ProfileListScreen = () => {
  return (
    <View style={styles.container}>
      {jsonData.map((profile, index) => (
        <Profiles key={index} profile={profile} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabOneScreen;
