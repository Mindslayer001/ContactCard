import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './APPS/Navigations/TabNavigation';
import { useFonts } from 'expo-font';
import { getData, storeData } from './APPS/Constants/StorageHelper';
import { DataProvider } from './APPS/Utils/DataContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-med': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

useEffect(() =>{
  const fetchData = async () => {
    const data = await getData("id");
    if(data === null){
      storeData("id",JSON.stringify(1));
    }
    else{
      console.log(data)
    }
  }
  fetchData();
})
  if (!fontsLoaded) {
    // Display a loading spinner until the fonts are loaded
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <DataProvider>
    <NavigationContainer>
      <TabNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
